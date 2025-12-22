'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Search, X, Image as ImageIcon } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface MediaFile {
  id: string
  filename: string
  path: string
  mimeType: string
  size: number
  alt?: string
  createdAt: string
}

interface ImagePickerProps {
  value?: string
  onChange: (path: string) => void
  label?: string
  placeholder?: string
  className?: string
}

export function ImagePicker({ value, onChange, label, placeholder, className }: ImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [media, setMedia] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedPath, setSelectedPath] = useState(value || '')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSelectedPath(value || '')
  }, [value])

  useEffect(() => {
    if (isOpen && media.length === 0) {
      fetchMedia()
    }
  }, [isOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/media')
      if (response.ok) {
        const data = await response.json()
        setMedia(data)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMedia = media.filter(m => 
    m.filename.toLowerCase().includes(search.toLowerCase()) ||
    m.path.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (path: string) => {
    setSelectedPath(path)
    onChange(path)
    setIsOpen(false)
    setSearch('')
  }

  const handleClear = () => {
    setSelectedPath('')
    onChange('')
    setSearch('')
  }

  const displayName = selectedPath 
    ? selectedPath.split('/').pop() || selectedPath
    : placeholder || 'Select an image...'

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative" ref={dropdownRef}>
        {/* Selected Image Display / Input */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              type="text"
              value={search || displayName}
              onChange={(e) => {
                setSearch(e.target.value)
                setIsOpen(true)
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder || 'Type to search images...'}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {selectedPath && (
            <>
              {/* Preview Thumbnail */}
              <div className="relative w-12 h-12 rounded border border-gray-300 overflow-hidden bg-gray-50">
                <Image
                  src={selectedPath}
                  alt="Selected"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>

              {/* Clear Button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2">Loading images...</p>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No images found</p>
                <p className="text-sm mt-1">
                  {search ? 'Try a different search term' : 'Upload images in Media Library'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2">
                {filteredMedia.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.path)}
                    className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-blue-500 hover:shadow-md ${
                      selectedPath === item.path ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={item.path}
                      alt={item.alt || item.filename}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                    
                    {/* Filename Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-white truncate">{item.filename}</p>
                    </div>

                    {/* Selected Badge */}
                    {selectedPath === item.path && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Link to Media Library */}
            <div className="border-t border-gray-200 p-3 bg-gray-50">
              <a
                href="/admin/media"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center"
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Open Media Library
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Hidden input for form compatibility */}
      {selectedPath && (
        <input type="hidden" name={label?.toLowerCase().replace(/\s+/g, '_')} value={selectedPath} />
      )}
    </div>
  )
}
