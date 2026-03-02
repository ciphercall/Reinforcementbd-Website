'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ImagePicker } from '@/components/admin/ImagePicker'
import { coercePageContent } from '@/lib/utils/pageContent'
import {
  defaultSharedClientsCarouselContent,
  normalizeSharedClientsCarouselContent,
  SharedClientsCarouselContent,
} from '@/lib/defaults/sharedClientsCarousel'
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from 'lucide-react'

const PAGE_KEY = 'shared-clients-carousel'
const SECTION_KEY = 'carousel'

export default function SharedClientsCarouselEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<SharedClientsCarouselContent>(defaultSharedClientsCarouselContent)

  useEffect(() => {
    if (status === 'authenticated') void fetchContent()
    if (status === 'unauthenticated') router.push('/admin/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/page-content?page=${encodeURIComponent(PAGE_KEY)}&section=${encodeURIComponent(SECTION_KEY)}`)
      if (res.ok) {
        const data = await res.json()
        const coerced = coercePageContent<SharedClientsCarouselContent>(data.content, defaultSharedClientsCarouselContent)
        setContent(normalizeSharedClientsCarouselContent(coerced))
      }
    } catch {
      setContent(defaultSharedClientsCarouselContent)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const normalized = normalizeSharedClientsCarouselContent(content)
      const res = await fetch('/api/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: PAGE_KEY, section: SECTION_KEY, content: normalized }),
      })

      if (res.ok) alert('Trusted clients carousel saved successfully!')
      else alert('Failed to save carousel content')
    } catch {
      alert('Error saving carousel content')
    } finally {
      setSaving(false)
    }
  }

  const logos = useMemo(() => content.logos ?? [], [content.logos])

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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/admin/pages/services')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trusted Clients Carousel</h1>
              <p className="text-gray-600">Shared section for home and all service pages</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Section Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input
                  value={content.title}
                  onChange={(e) => setContent((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Speed (10-80)</label>
                <Input
                  type="number"
                  min={10}
                  max={80}
                  value={content.speed}
                  onChange={(e) => setContent((prev) => ({ ...prev, speed: Number(e.target.value) || 30 }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <Textarea
                rows={2}
                value={content.subtitle}
                onChange={(e) => setContent((prev) => ({ ...prev, subtitle: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Client Logos</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setContent((prev) => ({
                  ...prev,
                  logos: [...(prev.logos ?? []), { src: '', alt: '' }],
                }))}
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {logos.map((logo, index) => (
                <div key={`${logo.src}-${index}`} className="border rounded-lg p-4 bg-gray-50 space-y-3">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <ImagePicker
                        label="Logo Image"
                        value={logo.src}
                        onChange={(path) => setContent((prev) => {
                          const next = [...(prev.logos ?? [])]
                          next[index] = { ...next[index], src: path }
                          return { ...prev, logos: next }
                        })}
                        placeholder="/images/... or /uploads/..."
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => setContent((prev) => ({
                        ...prev,
                        logos: (prev.logos ?? []).filter((_, i) => i !== index),
                      }))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <Input
                    value={logo.alt}
                    onChange={(e) => setContent((prev) => {
                      const next = [...(prev.logos ?? [])]
                      next[index] = { ...next[index], alt: e.target.value }
                      return { ...prev, logos: next }
                    })}
                    placeholder="Alt text"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}