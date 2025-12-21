'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { coercePageContent } from '@/lib/utils/pageContent'
import { ArrowLeft, Loader2, Plus, Save, Trash2, GripVertical } from 'lucide-react'

type ServicesContent = {
  services: string[]
}

const defaultContent: ServicesContent = {
  services: [
    'Electrical & Automation',
    'Factory Automation',
    'Architectural Design',
    '3D Modeling & Visualization',
    'Web Development',
    'Mobile App Development',
    'AI & Machine Learning',
    'Other'
  ]
}

export default function ContactServicesEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<ServicesContent>(defaultContent)

  useEffect(() => {
    void fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=contact&section=services')
      if (res.ok) {
        const data = await res.json()
        setContent(coercePageContent<ServicesContent>(data.content, defaultContent))
      }
    } catch {
      // use defaults
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
        body: JSON.stringify({ page: 'contact', section: 'services', content }),
      })

      if (res.ok) alert('Service options saved successfully!')
      else alert('Failed to save content')
    } catch {
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const addService = () => {
    setContent((p) => ({
      ...p,
      services: [...p.services, 'New Service']
    }))
  }

  const updateService = (index: number, value: string) => {
    const updated = [...content.services]
    updated[index] = value
    setContent({ ...content, services: updated })
  }

  const removeService = (index: number) => {
    setContent((p) => ({
      ...p,
      services: p.services.filter((_, i) => i !== index)
    }))
  }

  const moveService = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= content.services.length) return
    
    const updated = [...content.services]
    const temp = updated[index]
    updated[index] = updated[newIndex]
    updated[newIndex] = temp
    setContent({ ...content, services: updated })
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
            <Button variant="outline" size="sm" onClick={() => router.push('/admin/pages/contact')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Service Options</h1>
              <p className="text-gray-600">Manage the service dropdown options in the contact form</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Services List</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addService}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {content.services.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No services added yet. Click &quot;Add Service&quot; to get started.
              </p>
            ) : (
              content.services.map((service, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => moveService(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <GripVertical className="w-4 h-4 text-gray-400 rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveService(idx, 'down')}
                      disabled={idx === content.services.length - 1}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <GripVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <Input
                    value={service}
                    onChange={(e) => updateService(idx, e.target.value)}
                    placeholder="Service name"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeService(idx)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service You&apos;re Interested In
            </label>
            <select className="w-full px-4 py-2 border rounded-lg bg-white">
              <option value="">Select a service</option>
              {content.services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
