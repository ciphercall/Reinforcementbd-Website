'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical } from 'lucide-react'

interface Value {
  icon: string
  title: string
  description: string
}

interface ValuesContent {
  sectionTitle: string
  sectionSubtitle: string
  values: Value[]
}

export default function AboutValuesEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<ValuesContent>({
    sectionTitle: 'Our Core Values',
    sectionSubtitle: 'The principles that guide everything we do',
    values: [
      { icon: 'Shield', title: 'Integrity', description: 'We maintain the highest ethical standards in all our dealings' },
      { icon: 'Users', title: 'Collaboration', description: 'We work together with clients as true partners' },
      { icon: 'Lightbulb', title: 'Innovation', description: 'We embrace change and continuously seek better solutions' },
      { icon: 'Award', title: 'Excellence', description: 'We strive for excellence in every project we undertake' },
      { icon: 'Heart', title: 'Respect', description: 'We value and respect every individual we work with' },
      { icon: 'TrendingUp', title: 'Growth', description: 'We are committed to continuous learning and improvement' }
    ]
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=about&section=values')
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
          page: 'about',
          section: 'values',
          content
        })
      })
      
      if (res.ok) {
        alert('Values section saved successfully!')
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

  const addValue = () => {
    setContent({
      ...content,
      values: [...content.values, { icon: 'Star', title: '', description: '' }]
    })
  }

  const updateValue = (index: number, field: keyof Value, value: string) => {
    const updated = [...content.values]
    updated[index] = { ...updated[index], [field]: value }
    setContent({ ...content, values: updated })
  }

  const removeValue = (index: number) => {
    setContent({
      ...content,
      values: content.values.filter((_, i) => i !== index)
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
              onClick={() => router.push('/admin/pages/about')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Core Values</h1>
              <p className="text-gray-600">Edit company core values and principles</p>
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
                Section Title
              </label>
              <input
                type="text"
                value={content.sectionTitle}
                onChange={(e) => setContent({ ...content, sectionTitle: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                value={content.sectionSubtitle}
                onChange={(e) => setContent({ ...content, sectionSubtitle: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Values ({content.values.length})</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addValue}>
                <Plus className="w-4 h-4 mr-1" /> Add Value
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {content.values.map((value, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start gap-4">
                    <div className="text-gray-400 cursor-move">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className="flex-1 grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Icon Name
                        </label>
                        <input
                          type="text"
                          value={value.icon}
                          onChange={(e) => updateValue(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Shield, Heart"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Value Title
                        </label>
                        <input
                          type="text"
                          value={value.title}
                          onChange={(e) => updateValue(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Integrity"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={value.description}
                          onChange={(e) => updateValue(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeValue(index)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Use Lucide icon names for icons. Browse available icons at lucide.dev/icons
            </p>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{content.sectionTitle}</h3>
                <p className="text-gray-600">{content.sectionSubtitle}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {content.values.map((value, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xs text-blue-600 font-mono">{value.icon}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{value.title || 'Title'}</h4>
                    <p className="text-xs text-gray-500 mt-1">{value.description || 'Description'}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
