'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { coercePageContent } from '@/lib/utils/pageContent'
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react'

interface StoryContent {
  title: string
  description: string
  paragraphs: string[]
  image: string
  imageAlt: string
  stats: { label: string; value: string }[]
}

const defaultContent: StoryContent = {
  title: 'Our Story',
  description: 'Reinforcement Group has been a trusted partner for businesses across Bangladesh since 2018.',
  paragraphs: [
    'Founded with a vision to provide comprehensive automation, IT, and architectural solutions, Reinforcement Group has grown to become a leading provider of integrated business solutions.',
    'Our journey began with industrial automation and has expanded to encompass IT solutions and architectural services through our three specialized divisions.',
  ],
  image: '/images/about-story.jpg',
  imageAlt: 'Reinforcement Group office and team',
  stats: [
    { label: 'Years Experience', value: '7+' },
    { label: 'Happy Clients', value: '100+' },
    { label: 'Projects Delivered', value: '200+' },
    { label: 'Team Members', value: '20+' },
  ],
}

export default function AboutStoryEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [content, setContent] = useState<StoryContent>(defaultContent)

  useEffect(() => {
    if (status === 'authenticated') fetchContent()
    if (status === 'unauthenticated') router.push('/admin/login')
  }, [status, router])

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

  const handleStoryImageUpload = async (file?: File | null) => {
    if (!file) return
    setUploading(true)

    try {
      const uploadedPath = await uploadImage(file)
      setContent((prev) => ({ ...prev, image: uploadedPath }))
    } catch {
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=about&section=story')
      if (res.ok) {
        const data = await res.json()
        const coerced = coercePageContent<StoryContent>(data.content, defaultContent)
        setContent({
          ...defaultContent,
          ...coerced,
          paragraphs: Array.isArray(coerced.paragraphs) ? coerced.paragraphs : defaultContent.paragraphs,
          stats: Array.isArray(coerced.stats) ? coerced.stats : defaultContent.stats,
        })
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
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

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'about',
          section: 'story',
          content
        })
      })
      
      if (res.ok) {
        alert('Story section saved successfully!')
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

  const addParagraph = () => {
    setContent({
      ...content,
      paragraphs: [...(content.paragraphs ?? []), '']
    })
  }

  const updateParagraph = (index: number, value: string) => {
    const updated = [...(content.paragraphs ?? [])]
    updated[index] = value
    setContent({ ...content, paragraphs: updated })
  }

  const removeParagraph = (index: number) => {
    setContent({
      ...content,
      paragraphs: (content.paragraphs ?? []).filter((_, i) => i !== index)
    })
  }

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...content.stats]
    updated[index] = { ...updated[index], [field]: value }
    setContent({ ...content, stats: updated })
  }

  if (loading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminSidebar>
    )
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Company Story</h1>
              <p className="text-gray-600">Edit the company history and overview</p>
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

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Story Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
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
                Brief Description
              </label>
              <textarea
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Story Paragraphs
                </label>
                <Button type="button" variant="outline" size="sm" onClick={addParagraph}>
                  <Plus className="w-4 h-4 mr-1" /> Add Paragraph
                </Button>
              </div>
              <div className="space-y-3">
                {content.paragraphs.map((paragraph, index) => (
                  <div key={index} className="flex gap-2">
                    <textarea
                      value={paragraph}
                      onChange={(e) => updateParagraph(index, e.target.value)}
                      rows={3}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Paragraph ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeParagraph(index)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={content.image}
                  onChange={(e) => setContent({ ...content, image: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="mt-2 flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="about-story-image-upload"
                    onChange={(e) => handleStoryImageUpload(e.target.files?.[0])}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                    onClick={() => {
                      const input = document.getElementById('about-story-image-upload') as HTMLInputElement | null
                      input?.click()
                    }}
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  value={content.imageAlt}
                  onChange={(e) => setContent({ ...content, imageAlt: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Company Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {content.stats.map((stat, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateStat(index, 'value', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xl font-bold text-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateStat(index, 'label', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
