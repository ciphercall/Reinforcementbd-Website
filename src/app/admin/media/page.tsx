'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Search,
  Grid,
  List,
  Check,
  RefreshCw,
  Info,
  Edit2,
  X,
  CheckCircle
} from 'lucide-react'

interface MediaFile {
  id: string
  filename: string
  path: string
  mimeType: string
  size: number
  alt?: string
  createdAt: string
}

interface UsageInfo {
  usageCount: number
  locations: {
    type: string
    id: string
    title?: string
    name?: string
    field?: string
  }[]
}

export default function MediaLibraryPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [media, setMedia] = useState<MediaFile[]>([])
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [usageData, setUsageData] = useState<Record<string, UsageInfo>>({})
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [syncing, setSyncing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMedia()
    }
  }, [status])

  const fetchMedia = async () => {
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

  const syncUploadsFolder = async () => {
    setSyncing(true)
    try {
      const response = await fetch('/api/media/scan')
      if (response.ok) {
        const data = await response.json()
        alert(`Synced ${data.newlySynced} new files from uploads folder`)
        fetchMedia()
      }
    } catch (error) {
      console.error('Error syncing:', error)
      alert('Failed to sync uploads folder')
    } finally {
      setSyncing(false)
    }
  }

  const fetchUsage = async (path: string) => {
    try {
      const response = await fetch(`/api/media/usage?path=${encodeURIComponent(path)}`)
      if (response.ok) {
        const data = await response.json()
        setUsageData(prev => ({ ...prev, [path]: data }))
      }
    } catch (error) {
      console.error('Error fetching usage:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminSidebar>
    )
  }

  if (!session) {
    router.push('/admin/login')
    return null
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        fetchMedia()
        setSelectedIds(new Set())
      } else {
        alert('Failed to upload files')
      }
    } catch (error) {
      console.error('Error uploading:', error)
      alert('Failed to upload files')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async (id: string) => {
    const item = media.find(m => m.id === id)
    if (!item) return

    // Check usage first
    if (!usageData[item.path]) {
      await fetchUsage(item.path)
    }

    const usage = usageData[item.path]
    if (usage && usage.usageCount > 0) {
      if (!confirm(`This image is used in ${usage.usageCount} location(s). Are you sure you want to delete it?`)) {
        return
      }
    } else {
      if (!confirm('Are you sure you want to delete this file?')) return
    }

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMedia(prev => prev.filter(m => m.id !== id))
        setSelectedIds(prev => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      } else {
        alert('Failed to delete file')
      }
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Failed to delete file')
    }
  }

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) return

    // Check usage for selected files
    const selectedItems = media.filter(m => selectedIds.has(m.id))
    let totalUsageCount = 0
    
    for (const item of selectedItems) {
      if (!usageData[item.path]) {
        await fetchUsage(item.path)
      }
      const usage = usageData[item.path]
      if (usage) {
        totalUsageCount += usage.usageCount
      }
    }

    let confirmMessage = `Are you sure you want to delete ${selectedIds.size} file(s)?`
    if (totalUsageCount > 0) {
      confirmMessage = `Warning: ${totalUsageCount} usage(s) found across selected files. Are you sure you want to delete ${selectedIds.size} file(s)?`
    }

    if (!confirm(confirmMessage)) return

    try {
      const response = await fetch('/api/media/batch-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) })
      })

      if (response.ok) {
        setMedia(prev => prev.filter(m => !selectedIds.has(m.id)))
        setSelectedIds(new Set())
      } else {
        alert('Failed to delete files')
      }
    } catch (error) {
      console.error('Error batch deleting:', error)
      alert('Failed to delete files')
    }
  }

  const handleEditName = async (id: string, newName: string) => {
    if (!newName.trim()) return

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: newName.trim() })
      })

      if (response.ok) {
        const updated = await response.json()
        setMedia(prev => prev.map(m => m.id === id ? updated : m))
        setEditingId(null)
        setEditingName('')
      } else {
        alert('Failed to update filename')
      }
    } catch (error) {
      console.error('Error updating name:', error)
      alert('Failed to update filename')
    }
  }

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const selectAll = () => {
    if (selectedIds.size === filteredMedia.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredMedia.map(m => m.id)))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredMedia = media.filter(m => 
    m.filename.toLowerCase().includes(search.toLowerCase()) ||
    m.path.toLowerCase().includes(search.toLowerCase())
  )

  const handleMouseEnter = (id: string, path: string) => {
    setHoveredId(id)
    if (!usageData[path]) {
      fetchUsage(path)
    }
  }

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-600">Central hub for all your images and files</p>
          </div>
          <div className="flex items-center space-x-3">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <Button 
              onClick={syncUploadsFolder}
              disabled={syncing}
              variant="outline"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              Sync Folder
            </Button>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <Card className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search files..."
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Selection Info */}
              {selectedIds.size > 0 && (
                <div className="flex items-center space-x-2 mr-4">
                  <span className="text-sm text-gray-600">
                    {selectedIds.size} selected
                  </span>
                  <Button 
                    onClick={handleBatchDelete}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Selected
                  </Button>
                </div>
              )}

              {/* Select All */}
              <Button
                onClick={selectAll}
                variant="outline"
                size="sm"
              >
                {selectedIds.size === filteredMedia.length && filteredMedia.length > 0 ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Deselect All
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Select All
                  </>
                )}
              </Button>

              {/* View Mode */}
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>

        {/* Media Grid/List */}
        <Card className="p-6">
          {filteredMedia.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {search ? 'No files found' : 'No files uploaded yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {search 
                  ? 'Try a different search term' 
                  : 'Start by uploading your first image or sync existing uploads'}
              </p>
              {!search && (
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
              )}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group relative"
                  onMouseEnter={() => handleMouseEnter(item.id, item.path)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2 z-10">
                    <button
                      onClick={() => toggleSelection(item.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        selectedIds.has(item.id)
                          ? 'bg-blue-600 border-blue-600'
                          : 'bg-white border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {selectedIds.has(item.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 group-hover:border-blue-500 transition-all">
                    <Image
                      src={item.path}
                      alt={item.alt || item.filename}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />

                    {/* Usage Overlay */}
                    {hoveredId === item.id && usageData[item.path] && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="text-white text-center text-sm">
                          <Info className="w-6 h-6 mx-auto mb-2" />
                          <p className="font-semibold mb-1">
                            {usageData[item.path].usageCount === 0 
                              ? 'Not in use'
                              : `Used in ${usageData[item.path].usageCount} location(s)`}
                          </p>
                          {usageData[item.path].usageCount > 0 && (
                            <div className="mt-2 text-xs space-y-1 max-h-32 overflow-y-auto">
                              {usageData[item.path].locations.map((loc, idx) => (
                                <div key={idx} className="bg-black/50 rounded px-2 py-1">
                                  {loc.type}: {loc.title || loc.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Filename (Editable) */}
                  <div className="mt-2">
                    {editingId === item.id ? (
                      <div className="flex items-center space-x-1">
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleEditName(item.id, editingName)
                            } else if (e.key === 'Escape') {
                              setEditingId(null)
                              setEditingName('')
                            }
                          }}
                          className="text-xs h-7"
                          autoFocus
                        />
                        <button
                          onClick={() => handleEditName(item.id, editingName)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null)
                            setEditingName('')
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(item.id)
                          setEditingName(item.filename)
                        }}
                        className="w-full text-left group/name flex items-center space-x-1 hover:bg-gray-50 rounded px-1 py-0.5"
                      >
                        <p className="text-xs text-gray-700 truncate flex-1">{item.filename}</p>
                        <Edit2 className="w-3 h-3 text-gray-400 opacity-0 group-hover/name:opacity-100 transition-opacity flex-shrink-0" />
                      </button>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5 px-1">
                      {formatFileSize(item.size)}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 border border-gray-200"
                  onMouseEnter={() => handleMouseEnter(item.id, item.path)}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleSelection(item.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedIds.has(item.id)
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {selectedIds.has(item.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </button>

                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.path}
                      alt={item.alt || item.filename}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    {editingId === item.id ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleEditName(item.id, editingName)
                            } else if (e.key === 'Escape') {
                              setEditingId(null)
                              setEditingName('')
                            }
                          }}
                          className="h-8"
                          autoFocus
                        />
                        <button
                          onClick={() => handleEditName(item.id, editingName)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null)
                            setEditingName('')
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(item.id)
                            setEditingName(item.filename)
                          }}
                          className="font-medium text-gray-900 hover:text-blue-600 flex items-center space-x-2 group/name"
                        >
                          <span className="truncate">{item.filename}</span>
                          <Edit2 className="w-3 h-3 text-gray-400 opacity-0 group-hover/name:opacity-100 transition-opacity flex-shrink-0" />
                        </button>
                        <p className="text-sm text-gray-500 truncate">{item.path}</p>
                      </>
                    )}
                  </div>

                  {/* Size */}
                  <div className="text-sm text-gray-500 flex-shrink-0">
                    {formatFileSize(item.size)}
                  </div>

                  {/* Usage Info */}
                  {usageData[item.path] && (
                    <div className="text-sm text-gray-500 flex-shrink-0 min-w-[100px]">
                      {usageData[item.path].usageCount === 0 
                        ? <span className="text-gray-400">Not in use</span>
                        : <span className="text-blue-600 font-medium">
                            {usageData[item.path].usageCount} use{usageData[item.path].usageCount !== 1 ? 's' : ''}
                          </span>
                      }
                    </div>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="text-sm text-gray-600">
          Showing {filteredMedia.length} of {media.length} file(s)
        </div>
      </div>
    </AdminSidebar>
  )
}
