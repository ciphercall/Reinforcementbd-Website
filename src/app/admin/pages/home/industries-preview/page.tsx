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

interface IndustryItem {
  id: string
  name: string
  icon: string
}

interface IndustriesPreviewContent {
  sectionTitle: string
  sectionSubtitle: string
  items: IndustryItem[]
  bottomButtonText: string
  bottomButtonLink: string
}

const defaultContent: IndustriesPreviewContent = {
  sectionTitle: 'Industries We Serve',
  sectionSubtitle: 'Our solutions are tailor-made for each industry we serve',
  items: [
    { id: '1', name: 'Banks & Financial Institutions', icon: 'Building2' },
    { id: '2', name: 'Foreign Aid Projects', icon: 'Plane' },
    { id: '3', name: 'Hospitality', icon: 'Hotel' },
    { id: '4', name: 'RMG & Textiles', icon: 'Factory' },
    { id: '5', name: "FMCG's", icon: 'ShoppingBag' },
    { id: '6', name: 'ICT', icon: 'Laptop' },
    { id: '7', name: 'Non-Governmental Organizations', icon: 'Heart' },
    { id: '8', name: 'Pharmaceuticals', icon: 'Pill' },
    { id: '9', name: "SME's & Startups", icon: 'Rocket' },
    { id: '10', name: 'Foreign Affairs & Affiliated Offices', icon: 'Globe' },
    { id: '11', name: 'Hospitals', icon: 'Heart' },
    { id: '12', name: 'Education & More...', icon: 'GraduationCap' }
  ],
  bottomButtonText: 'Explore All Industries',
  bottomButtonLink: '/industries'
}

export default function IndustriesPreviewEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<IndustriesPreviewContent>(defaultContent)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') fetchContent()
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=industries-preview&page=home')
      if (response.ok) {
        const data = await response.json()
        if (data.content) {
          setContent(coercePageContent<IndustriesPreviewContent>(data.content, defaultContent))
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

  const handleChange = (field: keyof IndustriesPreviewContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }))
    setSuccess('')
  }

  const handleItemChange = (id: string, field: keyof IndustryItem, value: string) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    }))
    setSuccess('')
  }

  const addItem = () => {
    setContent((prev) => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), name: 'New Industry', icon: 'Star' }]
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
          section: 'industries-preview',
          page: 'home',
          content
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('Industries preview saved successfully!')
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
              <h1 className="text-2xl font-bold text-gray-900">Industries Preview</h1>
              <p className="text-gray-600">Edit the industries grid on homepage</p>
            </div>
          </div>
          <Link href="/#industries" target="_blank">
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
                <h2 className="text-lg font-semibold text-gray-900">Industries</h2>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Industry
                </Button>
              </div>
              <div className="space-y-3">
                {content.items.map((item) => (
                  <div key={item.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Name</label>
                          <Input value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Icon (Lucide name)</label>
                          <Input value={item.icon} onChange={(e) => handleItemChange(item.id, 'icon', e.target.value)} placeholder="Building2" />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                        aria-label="Remove"
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
                  <Input value={content.bottomButtonText} onChange={(e) => handleChange('bottomButtonText', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <Input value={content.bottomButtonLink} onChange={(e) => handleChange('bottomButtonLink', e.target.value)} />
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
