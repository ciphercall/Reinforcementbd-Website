'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Search,
  Grid,
  List,
  Copy,
  Check,
  X,
  FolderOpen
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

export default function MediaLibraryPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [media, setMedia] = useState<MediaFile[]>([])
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [copiedPath, setCopiedPath] = useState<string | null>(null)
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
    } catch {
      // Handle error
    } finally {
      setLoading(false)
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
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        fetchMedia()
      }
    } catch {
      // Handle error
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMedia(prev => prev.filter(m => m.id !== id))
        if (selectedFile?.id === id) {
          setSelectedFile(null)
        }
      }
    } catch {
      // Handle error
    }
  }

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path)
    setCopiedPath(path)
    setTimeout(() => setCopiedPath(null), 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredMedia = media.filter(m => 
    m.filename.toLowerCase().includes(search.toLowerCase())
  )

  // Sample media for demo (since we don't have real upload yet)
  const sampleMedia: MediaFile[] = [
    { id: '1', filename: '7.jpg', path: '/images/profile/7.jpg', mimeType: 'image/jpeg', size: 45000, createdAt: new Date().toISOString() },
    { id: '2', filename: '9.jpg', path: '/images/profile/9.jpg', mimeType: 'image/jpeg', size: 52000, createdAt: new Date().toISOString() },
    { id: '3', filename: 'rg blue and gray full logo.jpg', path: '/images/logos/rg blue and gray full logo.jpg', mimeType: 'image/jpeg', size: 120000, createdAt: new Date().toISOString() },
  ]

  const displayMedia = media.length > 0 ? filteredMedia : sampleMedia

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-600">Manage your images and files</p>
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
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
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

        <div className="flex gap-6">
          {/* Media Grid/List */}
          <div className="flex-1">
            {displayMedia.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FolderOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
                  <p className="text-gray-500 mb-4">Upload your first file to get started</p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                </CardContent>
              </Card>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayMedia.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedFile?.id === file.id 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {file.mimeType.startsWith('image/') ? (
                        <img 
                          src={file.path} 
                          alt={file.alt || file.filename}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-gray-300" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); copyPath(file.path); }}
                        className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                      >
                        {copiedPath === file.path ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }}
                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-2 bg-white">
                      <p className="text-xs text-gray-600 truncate">{file.filename}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <div className="divide-y">
                  {displayMedia.map((file) => (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedFile?.id === file.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mr-4">
                        {file.mimeType.startsWith('image/') ? (
                          <img 
                            src={file.path} 
                            alt={file.alt || file.filename}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{file.filename}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); copyPath(file.path); }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        >
                          {copiedPath === file.path ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* File Details Sidebar */}
          {selectedFile && (
            <Card className="w-80 shrink-0 h-fit sticky top-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">File Details</h3>
                  <button 
                    onClick={() => setSelectedFile(null)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {selectedFile.mimeType.startsWith('image/') ? (
                    <img 
                      src={selectedFile.path} 
                      alt={selectedFile.alt || selectedFile.filename}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="w-16 h-16 text-gray-300" />
                  )}
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Filename</p>
                    <p className="font-medium text-gray-900 break-all">{selectedFile.filename}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Path</p>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 text-xs bg-gray-100 p-2 rounded break-all">{selectedFile.path}</code>
                      <button
                        onClick={() => copyPath(selectedFile.path)}
                        className="p-2 hover:bg-gray-100 rounded shrink-0"
                      >
                        {copiedPath === selectedFile.path ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Size</p>
                    <p className="font-medium text-gray-900">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium text-gray-900">{selectedFile.mimeType}</p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-4 text-red-600 hover:bg-red-50 hover:border-red-300"
                  onClick={() => handleDelete(selectedFile.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete File
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminSidebar>
  )
}
