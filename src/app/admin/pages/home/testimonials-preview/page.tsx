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

interface TestimonialItem {
  id: string
  content: string
  client: string
  service: string
  rating: number
}

interface TestimonialsPreviewContent {
  sectionTitle: string
  sectionSubtitle: string
  testimonials: TestimonialItem[]
}

const defaultContent: TestimonialsPreviewContent = {
  sectionTitle: 'What Our Clients Say',
  sectionSubtitle: 'Trusted by Businesses Across Industries',
  testimonials: [
    {
      id: '1',
      content:
        'We engaged Reinforcement Group for industrial automation, and the results exceeded expectations. Our production efficiency improved dramatically with their PLC solutions.',
      client: 'Bengal Plastics Ltd',
      service: 'For Industrial Automation',
      rating: 5
    },
    {
      id: '2',
      content:
        'Reinforcement Group delivered exceptional IT solutions for our network infrastructure. Their team understood exactly what we needed and delivered beyond our expectations.',
      client: 'Dhaka IT Solutions',
      service: 'For IT Infrastructure',
      rating: 5
    },
    {
      id: '3',
      content:
        "The architectural designs from Reinforcement's Architect View division transformed our office space. Their attention to detail and modern approach was impressive.",
      client: 'Greenland Properties Ltd.',
      service: 'For Architecture Services',
      rating: 5
    }
  ]
}

export default function TestimonialsPreviewEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<TestimonialsPreviewContent>(defaultContent)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') fetchContent()
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=testimonials-preview&page=home')
      if (response.ok) {
        const data = await response.json()
        if (data.content) {
          setContent(coercePageContent<TestimonialsPreviewContent>(data.content, defaultContent))
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

  const handleChange = (field: keyof TestimonialsPreviewContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }))
    setSuccess('')
  }

  const handleTestimonialChange = (id: string, field: keyof TestimonialItem, value: string) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) =>
        t.id === id ? { ...t, [field]: field === 'rating' ? Number(value) : value } : t
      )
    }))
    setSuccess('')
  }

  const addTestimonial = () => {
    setContent((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        {
          id: Date.now().toString(),
          content: 'Testimonial text',
          client: 'Client Name',
          service: 'Service',
          rating: 5
        }
      ]
    }))
  }

  const removeTestimonial = (id: string) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id)
    }))
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
          section: 'testimonials-preview',
          page: 'home',
          content
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('Testimonials preview saved successfully!')
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
              <h1 className="text-2xl font-bold text-gray-900">Testimonials Preview</h1>
              <p className="text-gray-600">Edit testimonials shown on the homepage</p>
            </div>
          </div>
          <Link href="/#testimonials" target="_blank">
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
                <h2 className="text-lg font-semibold text-gray-900">Testimonials</h2>
                <Button type="button" variant="outline" size="sm" onClick={addTestimonial}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </div>

              <div className="space-y-4">
                {content.testimonials.map((t) => (
                  <div key={t.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Content</label>
                          <Textarea
                            value={t.content}
                            onChange={(e) => handleTestimonialChange(t.id, 'content', e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Client</label>
                            <Input value={t.client} onChange={(e) => handleTestimonialChange(t.id, 'client', e.target.value)} />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Service</label>
                            <Input value={t.service} onChange={(e) => handleTestimonialChange(t.id, 'service', e.target.value)} />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Rating (1-5)</label>
                            <Input
                              value={String(t.rating)}
                              onChange={(e) => handleTestimonialChange(t.id, 'rating', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTestimonial(t.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                        aria-label="Remove testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
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
