'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Eye, Plus, Save, Trash2 } from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'

interface ServicePreviewItem {
  id: string
  title: string
  description: string
  image: string
  href: string
  icon: 'Zap' | 'Building2' | 'Code'
  color: 'blue' | 'emerald' | 'purple'
  services: string[]
}

interface ServicesPreviewContent {
  sectionTitle: string
  sectionSubtitle: string
  items: ServicePreviewItem[]
  bottomButtonText: string
  bottomButtonLink: string
}

const defaultContent: ServicesPreviewContent = {
  sectionTitle: 'Our Divisions',
  sectionSubtitle: 'Three pillars of excellence delivering comprehensive solutions',
  items: [
    {
      id: '1',
      title: 'Reinforcement Automation',
      description: 'Complete electrical and automation solutions for industrial and commercial projects.',
      image: '/images/automation/1.png',
      href: '/services#automation',
      icon: 'Zap',
      color: 'blue',
      services: [
        'Electrical & Automation Equipment Supply',
        'Electrical Erection & Commissioning',
        'Factory Automation',
        'Energy Management'
      ]
    },
    {
      id: '2',
      title: 'Reinforcement Architect View',
      description: 'Creative architectural designs and professional engineering services.',
      image: '/images/automation/2.png',
      href: '/services#architect',
      icon: 'Building2',
      color: 'emerald',
      services: [
        'Architectural Design',
        'Electrical Design',
        'Plumbing & Sanitary',
        '3D Modeling & Visualization'
      ]
    },
    {
      id: '3',
      title: 'Reinforcement IT Zone',
      description: 'Cutting-edge technology solutions for digital transformation.',
      image: '/images/it/I33.jfif',
      href: '/services#it',
      icon: 'Code',
      color: 'purple',
      services: [
        'Web Development',
        'Mobile App Development',
        'AI & Machine Learning',
        'Cloud Services'
      ]
    }
  ],
  bottomButtonText: 'View All Services',
  bottomButtonLink: '/services'
}

const iconOptions: Array<ServicePreviewItem['icon']> = ['Zap', 'Building2', 'Code']
const colorOptions: Array<ServicePreviewItem['color']> = ['blue', 'emerald', 'purple']

export default function ServicesPreviewEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<ServicesPreviewContent>(defaultContent)
  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

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

  const handleDivisionImageUpload = async (itemId: string, file?: File | null) => {
    if (!file) return
    setUploadingItemId(itemId)
    setError('')
    setSuccess('')

    try {
      const uploadedPath = await uploadImage(file)
      setContent((prev) => ({
        ...prev,
        items: prev.items.map((it) => (it.id === itemId ? { ...it, image: uploadedPath } : it)),
      }))
      setSuccess('Image uploaded')
    } catch {
      setError('Failed to upload image')
    } finally {
      setUploadingItemId(null)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') fetchContent()
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=services-preview&page=home')
      if (response.ok) {
        const data = await response.json()
        if (data.content) {
          setContent(coercePageContent<ServicesPreviewContent>(data.content, defaultContent))
        }
      }
    } catch {
      // default
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      </AdminSidebar>
    )
  }

  if (!session) {
    router.push('/admin/login')
    return null
  }

  const handleChange = (field: keyof ServicesPreviewContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }))
    setSuccess('')
  }

  const handleItemChange = (id: string, field: keyof ServicePreviewItem, value: string) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    }))
    setSuccess('')
  }

  const handleServiceLineChange = (id: string, index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id
          ? {
              ...item,
              services: item.services.map((s, i) => (i === index ? value : s))
            }
          : item
      )
    }))
    setSuccess('')
  }

  const addServiceLine = (id: string) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, services: [...item.services, 'New service'] } : item
      )
    }))
    setSuccess('')
  }

  const removeServiceLine = (id: string, index: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id
          ? { ...item, services: item.services.filter((_, i) => i !== index) }
          : item
      )
    }))
    setSuccess('')
  }

  const addItem = () => {
    setContent((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now().toString(),
          title: 'New Division',
          description: 'Division description',
          image: '',
          href: '/services',
          icon: 'Zap',
          color: 'blue',
          services: ['Service 1']
        }
      ]
    }))
  }

  const removeItem = (id: string) => {
    setContent((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== id) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'services-preview',
          page: 'home',
          content
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('Services preview saved successfully!')
    } catch {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminSidebar>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/pages/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Services Preview</h1>
              <p className="text-gray-600">Edit the divisions/services cards on homepage</p>
            </div>
          </div>
          <Link href="/#services" target="_blank">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">{error}</div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">{success}</div>
          )}

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Section Header</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input value={content.sectionTitle} onChange={(e) => handleChange('sectionTitle', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Textarea
                  value={content.sectionSubtitle}
                  onChange={(e) => handleChange('sectionSubtitle', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-900">Divisions</h2>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Division
                </Button>
              </div>

              <div className="space-y-4">
                {content.items.map((item) => (
                  <div key={item.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Title</label>
                            <Input value={item.title} onChange={(e) => handleItemChange(item.id, 'title', e.target.value)} />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Link</label>
                            <Input value={item.href} onChange={(e) => handleItemChange(item.id, 'href', e.target.value)} />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Description</label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Image</label>
                            <div className="space-y-2">
                              <Input value={item.image} onChange={(e) => handleItemChange(item.id, 'image', e.target.value)} placeholder="/images/... or /uploads/..." />
                              <div className="flex gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  id={`services-preview-image-upload-${item.id}`}
                                  onChange={(e) => handleDivisionImageUpload(item.id, e.target.files?.[0])}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  disabled={uploadingItemId === item.id}
                                  onClick={() => {
                                    const input = document.getElementById(`services-preview-image-upload-${item.id}`) as HTMLInputElement | null
                                    input?.click()
                                  }}
                                >
                                  {uploadingItemId === item.id ? 'Uploading...' : 'Upload'}
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Icon</label>
                            <select
                              value={item.icon}
                              onChange={(e) => handleItemChange(item.id, 'icon', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {iconOptions.map((icon) => (
                                <option key={icon} value={icon}>
                                  {icon}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Color</label>
                            <select
                              value={item.color}
                              onChange={(e) => handleItemChange(item.id, 'color', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {colorOptions.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">Services List</label>
                            <Button type="button" variant="outline" size="sm" onClick={() => addServiceLine(item.id)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Line
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {item.services.map((service, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input
                                  value={service}
                                  onChange={(e) => handleServiceLineChange(item.id, index, e.target.value)}
                                  placeholder="Service"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeServiceLine(item.id, index)}
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                        aria-label="Remove division"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Bottom Button</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                  <Input
                    value={content.bottomButtonText}
                    onChange={(e) => handleChange('bottomButtonText', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <Input
                    value={content.bottomButtonLink}
                    onChange={(e) => handleChange('bottomButtonLink', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4 pt-4">
            <Link href="/admin/pages/home">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminSidebar>
  )
}
