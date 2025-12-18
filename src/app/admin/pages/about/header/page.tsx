'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { coercePageContent } from '@/lib/utils/pageContent'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

interface HeaderContent {
  title: string
  subtitle: string
  breadcrumbLabel: string
  backgroundImage: string
}

const defaultContent: HeaderContent = {
  title: 'About Reinforcement Group',
  subtitle:
    'Empowering businesses across Bangladesh with comprehensive automation, IT solutions, and architectural services since 2018.',
  breadcrumbLabel: 'About Us',
  backgroundImage: '/images/about-hero.jpg',
}

export default function AboutHeaderEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [content, setContent] = useState<HeaderContent>(defaultContent)

  const uploadImage = async (file: File) => {
    const fd = new FormData()
    fd.append('file', file)

    const res = await fetch('/api/media', {
      method: 'POST',
      body: fd,
    })

    if (!res.ok) throw new Error('Upload failed')
    const media = await res.json()
    return media.path as string
  }

  const handleBackgroundUpload = async (file?: File | null) => {
    if (!file) return
    setUploading(true)

    try {
      const uploadedPath = await uploadImage(file)
      setContent((prev) => ({ ...prev, backgroundImage: uploadedPath }))
    } catch {
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') fetchContent()
    if (status === 'unauthenticated') router.push('/admin/login')
  }, [status, router])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=about&section=header')
      if (res.ok) {
        const data = await res.json()
        setContent(coercePageContent<HeaderContent>(data.content, defaultContent))
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'about',
          section: 'header',
          content
        })
      })
      
      if (res.ok) {
        alert('Header section saved successfully!')
      } else {
        alert('Failed to save content')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminSidebar>
    )
  }

  if (!session) return null

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/admin/pages/about')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Page Header</h1>
              <p className="text-gray-600">Edit the About page hero section</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>

        {/* Content Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Header Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle / Description
              </label>
              <textarea
                value={content.subtitle}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Breadcrumb Label
              </label>
              <input
                type="text"
                value={content.breadcrumbLabel}
                onChange={(e) => setContent({ ...content, breadcrumbLabel: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., About Us"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image URL
              </label>
              <input
                type="text"
                value={content.backgroundImage}
                onChange={(e) => setContent({ ...content, backgroundImage: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="/images/about-hero.jpg"
              />
              <div className="mt-2 flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="about-header-bg-upload"
                  onChange={(e) => handleBackgroundUpload(e.target.files?.[0])}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                  onClick={() => {
                    const input = document.getElementById('about-header-bg-upload') as HTMLInputElement | null
                    input?.click()
                  }}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Upload images in Media Library and use the path here
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-sm opacity-80 mb-2">Home / {content.breadcrumbLabel}</p>
                <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
                <p className="text-blue-100 max-w-2xl">{content.subtitle}</p>
              </div>
              <div className="absolute inset-0 opacity-20">
                {content.backgroundImage && (
                  <div className="w-full h-full bg-cover bg-center" 
                       style={{ backgroundImage: `url(${content.backgroundImage})` }} 
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
