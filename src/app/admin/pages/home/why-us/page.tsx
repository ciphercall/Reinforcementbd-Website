'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Save, Eye, Plus, Trash2 } from 'lucide-react'

interface WhyUsItem {
  id: string
  title: string
  description: string
  icon: string
}

interface WhyUsContent {
  sectionTitle: string
  sectionSubtitle: string
  items: WhyUsItem[]
}

const iconOptions = [
  'Shield', 'Users', 'Zap', 'Target', 'Award', 'TrendingUp', 
  'Clock', 'CheckCircle', 'Star', 'Heart', 'Globe', 'Briefcase',
  'Settings', 'BarChart', 'Headphones', 'ThumbsUp', 'Layers', 'Lock'
]

const defaultContent: WhyUsContent = {
  sectionTitle: 'Why Choose Reinforcement Group?',
  sectionSubtitle: 'We bring expertise, reliability, and innovation to every project',
  items: [
    { id: '1', title: 'Technical Excellence', description: 'Expert team with deep knowledge in automation, IT, and architecture', icon: 'Award' },
    { id: '2', title: 'Tailored Solutions', description: 'Customized strategies that fit your unique business needs', icon: 'Target' },
    { id: '3', title: 'Proven Results', description: 'Track record of delivering measurable outcomes across industries', icon: 'TrendingUp' },
    { id: '4', title: 'Dedicated Support', description: 'Ongoing support and maintenance for all our solutions', icon: 'Headphones' },
    { id: '5', title: 'Cost Effective', description: 'Competitive pricing without compromising quality', icon: 'ThumbsUp' },
  ]
}

export default function WhyUsSectionEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<WhyUsContent>(defaultContent)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchContent()
    }
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=why-us&page=home')
      if (response.ok) {
        const data = await response.json()
        if (data.content) {
          setContent(JSON.parse(data.content))
        }
      }
    } catch {
      // Use default
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminSidebar>
    )
  }

  if (!session) {
    router.push('/admin/login')
    return null
  }

  const handleChange = (field: keyof WhyUsContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }))
    setSuccess('')
  }

  const handleItemChange = (id: string, field: keyof WhyUsItem, value: string) => {
    setContent(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
    setSuccess('')
  }

  const addItem = () => {
    setContent(prev => ({
      ...prev,
      items: [...prev.items, { 
        id: Date.now().toString(), 
        title: 'New Reason', 
        description: 'Description of why clients choose us',
        icon: 'Star'
      }]
    }))
  }

  const removeItem = (id: string) => {
    setContent(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
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
          section: 'why-us',
          page: 'home',
          content: JSON.stringify(content)
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('Section saved successfully!')
    } catch {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminSidebar>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/pages/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Why Choose Us</h1>
              <p className="text-gray-600">Edit the value propositions section</p>
            </div>
          </div>
          <Link href="/#why-us" target="_blank">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
              {success}
            </div>
          )}

          {/* Section Header */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Section Header</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <Input
                  value={content.sectionTitle}
                  onChange={(e) => handleChange('sectionTitle', e.target.value)}
                  placeholder="Why Choose Reinforcement Group?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subtitle
                </label>
                <Textarea
                  value={content.sectionSubtitle}
                  onChange={(e) => handleChange('sectionSubtitle', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-900">Value Propositions</h2>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
              
              <div className="space-y-4">
                {content.items.map((item) => (
                  <div key={item.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Title</label>
                            <Input
                              value={item.title}
                              onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                              placeholder="Industry Expertise"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Icon</label>
                            <select
                              value={item.icon}
                              onChange={(e) => handleItemChange(item.id, 'icon', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {iconOptions.map(icon => (
                                <option key={icon} value={icon}>{icon}</option>
                              ))}
                            </select>
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
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <Link href="/admin/pages/home">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
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
