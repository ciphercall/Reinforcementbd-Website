'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { coercePageContent } from '@/lib/utils/pageContent'
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from 'lucide-react'

type Benefit = {
  title: string
  description: string
  icon: string
}

type BenefitsContent = {
  title: string
  subtitle: string
  benefits: Benefit[]
}

const defaultContent: BenefitsContent = {
  title: 'Benefits of Our Partnerships',
  subtitle: 'What our strategic alliances mean for you',
  benefits: [
    {
      title: 'Global Reach',
      description: 'Access international talent pools and markets through our extended partner network.',
      icon: 'Globe',
    },
    {
      title: 'Specialized Expertise',
      description: 'Benefit from combined expertise in specialized areas like vocational training and migration.',
      icon: 'Award',
    },
    {
      title: 'Seamless Solutions',
      description: 'Experience integrated services that combine the strengths of multiple organizations.',
      icon: 'Handshake',
    },
  ],
}

export default function PartnersBenefitsEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<BenefitsContent>(defaultContent)

  useEffect(() => {
    void fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=partners&section=benefits')
      if (res.ok) {
        const data = await res.json()
        setContent(coercePageContent<BenefitsContent>(data.content, defaultContent))
      }
    } catch {
      // defaults
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
        body: JSON.stringify({ page: 'partners', section: 'benefits', content }),
      })

      if (res.ok) alert('Benefits section saved successfully!')
      else alert('Failed to save content')
    } catch {
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/admin/pages/partners')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Partnership Benefits</h1>
              <p className="text-gray-600">Edit the benefits section shown on the Partners page</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Section Header</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <Input value={content.title} onChange={(e) => setContent((p) => ({ ...p, title: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <Input value={content.subtitle} onChange={(e) => setContent((p) => ({ ...p, subtitle: e.target.value }))} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Benefits</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setContent((p) => ({
                    ...p,
                    benefits: [...p.benefits, { title: 'New Benefit', description: '', icon: 'Globe' }],
                  }))
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Benefit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.benefits.map((b, index) => (
              <div key={`${b.title}-${index}`} className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <Input
                      value={b.title}
                      onChange={(e) =>
                        setContent((p) => {
                          const benefits = [...p.benefits]
                          benefits[index] = { ...benefits[index], title: e.target.value }
                          return { ...p, benefits }
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon Name</label>
                    <Input
                      value={b.icon}
                      onChange={(e) =>
                        setContent((p) => {
                          const benefits = [...p.benefits]
                          benefits[index] = { ...benefits[index], icon: e.target.value }
                          return { ...p, benefits }
                        })
                      }
                      placeholder="Globe, Award, Handshake..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea
                    value={b.description}
                    onChange={(e) =>
                      setContent((p) => {
                        const benefits = [...p.benefits]
                        benefits[index] = { ...benefits[index], description: e.target.value }
                        return { ...p, benefits }
                      })
                    }
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => setContent((p) => ({ ...p, benefits: p.benefits.filter((_, i) => i !== index) }))}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
