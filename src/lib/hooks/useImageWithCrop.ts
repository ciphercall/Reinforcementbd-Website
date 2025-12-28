'use client'

import { useState, useCallback } from 'react'
import { CroppedImageData } from '@/components/admin/ImagePicker'

export interface ImageWithCrop {
  url: string // The original URL that gets saved to the database
  displayUrl: string // The cropped version for display (data URL)
  cropData?: CroppedImageData['cropData']
}

/**
 * Hook to manage image state with crop data
 * This allows pages to show the cropped preview while saving the original URL
 */
export function useImageWithCrop(initialUrl: string = '') {
  const [imageState, setImageState] = useState<ImageWithCrop>({
    url: initialUrl,
    displayUrl: initialUrl,
  })

  const handleImageChange = useCallback((path: string, croppedData?: CroppedImageData) => {
    if (croppedData) {
      setImageState({
        url: croppedData.originalUrl,
        displayUrl: croppedData.displayUrl,
        cropData: croppedData.cropData,
      })
    } else {
      setImageState({
        url: path,
        displayUrl: path,
        cropData: undefined,
      })
    }
  }, [])

  const clearImage = useCallback(() => {
    setImageState({
      url: '',
      displayUrl: '',
      cropData: undefined,
    })
  }, [])

  const setUrl = useCallback((url: string) => {
    setImageState({
      url,
      displayUrl: url,
      cropData: undefined,
    })
  }, [])

  return {
    imageState,
    handleImageChange,
    clearImage,
    setUrl,
    // Convenience getters
    url: imageState.url,
    displayUrl: imageState.displayUrl,
    hasCrop: !!imageState.cropData,
  }
}

/**
 * Hook to manage multiple images with crop data
 */
export function useImagesWithCrop(initialImages: Array<{ src: string; alt: string }> = []) {
  const [images, setImages] = useState<Array<{ 
    src: string
    alt: string
    displaySrc: string
    cropData?: CroppedImageData['cropData']
  }>>(
    initialImages.map(img => ({
      ...img,
      displaySrc: img.src,
    }))
  )

  const handleImageChange = useCallback((index: number, path: string, croppedData?: CroppedImageData) => {
    setImages(prev => {
      const next = [...prev]
      if (croppedData) {
        next[index] = {
          ...next[index],
          src: croppedData.originalUrl,
          displaySrc: croppedData.displayUrl,
          cropData: croppedData.cropData,
        }
      } else {
        next[index] = {
          ...next[index],
          src: path,
          displaySrc: path,
          cropData: undefined,
        }
      }
      return next
    })
  }, [])

  const handleAltChange = useCallback((index: number, alt: string) => {
    setImages(prev => {
      const next = [...prev]
      next[index] = { ...next[index], alt }
      return next
    })
  }, [])

  const addImage = useCallback((image: { src: string; alt: string } = { src: '', alt: '' }) => {
    setImages(prev => [...prev, { ...image, displaySrc: image.src }])
  }, [])

  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }, [])

  const setAllImages = useCallback((newImages: Array<{ src: string; alt: string }>) => {
    setImages(newImages.map(img => ({
      ...img,
      displaySrc: img.src,
    })))
  }, [])

  // Get the URLs for saving (without crop data)
  const getUrlsForSave = useCallback(() => {
    return images.map(({ src, alt }) => ({ src, alt }))
  }, [images])

  return {
    images,
    handleImageChange,
    handleAltChange,
    addImage,
    removeImage,
    setAllImages,
    getUrlsForSave,
  }
}
