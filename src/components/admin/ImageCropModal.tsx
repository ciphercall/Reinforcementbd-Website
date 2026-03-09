'use client'

import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Cropper from 'react-easy-crop'
import type { Area, Point } from 'react-easy-crop'
import { Button } from '@/components/ui/Button'
import { X, ZoomIn, ZoomOut, RotateCw, Check } from 'lucide-react'

interface ImageCropModalProps {
  isOpen: boolean
  imageSrc: string
  onClose: () => void
  onConfirm: (croppedImageUrl: string, cropData: CropData) => void
  aspectRatio?: number
}

export interface CropData {
  originalImage: string
  crop: Point
  zoom: number
  rotation: number
  croppedArea: Area
  croppedAreaPixels: Area
}

function formatAspectRatio(aspectRatio: number) {
  if (aspectRatio === 16 / 9) return '16:9'
  if (aspectRatio === 4 / 3) return '4:3'
  if (aspectRatio === 1) return '1:1'
  return aspectRatio.toFixed(2)
}

// Create an image element from a URL
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.crossOrigin = 'anonymous'
    image.src = url
  })

// Get radians from degrees
function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

// Calculate the rotated bounding box
function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

// Get the cropped image as a data URL
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const rotRad = getRadianAngle(rotation)

  // Calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  )

  // Set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // Translate canvas context to center of canvas
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  // Draw the rotated image
  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')
  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    throw new Error('No 2d context')
  }

  // Set the canvas size to the crop size
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  // Draw the cropped image
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // Return as data URL
  return croppedCanvas.toDataURL('image/jpeg', 0.9)
}

export function ImageCropModal({
  isOpen,
  imageSrc,
  onClose,
  onConfirm,
  aspectRatio = 16 / 9,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [croppedArea, setCroppedArea] = useState<Area | null>(null)
  const [processing, setProcessing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedArea)
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const handleConfirm = async () => {
    if (!croppedAreaPixels || !croppedArea) return

    setProcessing(true)
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
      
      const cropData: CropData = {
        originalImage: imageSrc,
        crop,
        zoom,
        rotation,
        croppedArea,
        croppedAreaPixels,
      }
      
      onConfirm(croppedImage, cropData)
    } catch (error) {
      console.error('Error cropping image:', error)
    } finally {
      setProcessing(false)
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 1))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const resetCrop = () => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
  }

  if (!isOpen) return null
  if (!mounted) return null

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/70 p-3 sm:items-center sm:p-4"
      style={{ pointerEvents: 'auto' }}
      onClick={(e) => {
        // Only close if clicking the backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div 
        className="my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:max-h-[92dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Crop Image</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative min-h-[260px] flex-1 bg-gray-900 sm:min-h-[340px] lg:min-h-[420px]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            cropShape="rect"
            objectFit="contain"
          />
        </div>

        {/* Controls */}
        <div className="max-h-[32dvh] overflow-y-auto border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
          {/* Zoom Slider */}
          <div className="mb-4 flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-4">
            <label className="w-16 text-sm font-medium text-gray-700">Zoom</label>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={zoom <= 1}
            >
              <ZoomOut className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="h-2 min-w-[180px] flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
            />
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={zoom >= 3}
            >
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-500 w-16 text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Rotation Slider */}
          <div className="mb-4 flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-4">
            <label className="w-16 text-sm font-medium text-gray-700">Rotation</label>
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RotateCw className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="range"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="h-2 min-w-[180px] flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
            />
            <span className="text-sm text-gray-500 w-16 text-right">{rotation}°</span>
          </div>

          {/* Aspect Ratio Info */}
          <p className="text-xs text-gray-500 mb-4">
            Aspect ratio: {formatAspectRatio(aspectRatio)}
            {' • '}Drag to reposition, scroll to zoom
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Button
            type="button"
            variant="ghost"
            onClick={resetCrop}
            className="text-gray-600"
          >
            Reset
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Apply Crop
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
