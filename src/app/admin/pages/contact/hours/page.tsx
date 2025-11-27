'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react'

interface HoursContent {
  title: string
  subtitle: string
  regularHours: { day: string; hours: string }[]
  specialNotes: string
  timezone: string
}

export default function ContactHoursEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<HoursContent>({
    title: 'Office Hours',
    subtitle: 'We\'re here to help during business hours',
    regularHours: [
      { day: 'Sunday - Thursday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Friday', hours: 'Closed' },
      { day: 'Saturday', hours: '10:00 AM - 4:00 PM' }
    ],
    specialNotes: 'We observe all public holidays in Bangladesh. Response times may be longer during holidays.',
    timezone: 'Bangladesh Standard Time (BST/UTC+6)'
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=contact&section=hours')
      if (res.ok) {
        const data = await res.json()
        if (data.content) {
          setContent(data.content)
        }
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
          page: 'contact',
          section: 'hours',
          content
        })
      })
      
      if (res.ok) {
        alert('Office hours saved successfully!')
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

  const addHours = () => {
    setContent({
      ...content,
      regularHours: [...content.regularHours, { day: '', hours: '' }]
    })
  }

  const updateHours = (index: number, field: 'day' | 'hours', value: string) => {
    const updated = [...content.regularHours]
    updated[index] = { ...updated[index], [field]: value }
    setContent({ ...content, regularHours: updated })
  }

  const removeHours = (index: number) => {
    setContent({
      ...content,
      regularHours: content.regularHours.filter((_, i) => i !== index)
    })
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
              onClick={() => router.push('/admin/pages/contact')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Office Hours</h1>
              <p className="text-gray-600">Edit business hours and availability</p>
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

        {/* Section Header */}
        <Card>
          <CardHeader>
            <CardTitle>Section Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
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
                Subtitle
              </label>
              <input
                type="text"
                value={content.subtitle}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Hours */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Business Hours</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addHours}>
                <Plus className="w-4 h-4 mr-1" /> Add Row
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {content.regularHours.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.day}
                      onChange={(e) => updateHours(index, 'day', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Day(s)"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.hours}
                      onChange={(e) => updateHours(index, 'hours', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Hours or 'Closed'"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeHours(index)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <input
                type="text"
                value={content.timezone}
                onChange={(e) => setContent({ ...content, timezone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Notes
              </label>
              <textarea
                value={content.specialNotes}
                onChange={(e) => setContent({ ...content, specialNotes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="E.g., holiday closures, response time notes, etc."
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{content.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{content.subtitle}</p>
              <div className="space-y-2">
                {content.regularHours.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{item.day}</span>
                    <span className={item.hours.toLowerCase() === 'closed' ? 'text-red-600' : 'text-gray-600'}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">{content.timezone}</p>
              {content.specialNotes && (
                <p className="text-xs text-gray-500 mt-2 italic">{content.specialNotes}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
