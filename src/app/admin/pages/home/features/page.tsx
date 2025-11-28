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
import { ArrowLeft, Save, Eye, Plus, Trash2, GripVertical } from 'lucide-react'

interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

interface FeaturesContent {
  sectionTitle: string
  sectionSubtitle: string
  features: Feature[]
}

const iconOptions = [
  'Shield', 'Users', 'Zap', 'Target', 'Award', 'TrendingUp', 
  'Clock', 'CheckCircle', 'Star', 'Heart', 'Globe', 'Briefcase',
  'Settings', 'BarChart', 'PieChart', 'Headphones', 'Mail', 'Phone'
]

const defaultContent: FeaturesContent = {
  sectionTitle: 'Why Choose Reinforcement Group?',
  sectionSubtitle: 'We deliver exceptional value through our comprehensive service offerings',
  features: [
    { id: '1', title: 'Expert Team', description: 'Highly skilled professionals with years of industry experience', icon: 'Users' },
    { id: '2', title: 'Quality Service', description: 'Committed to delivering excellence in every project', icon: 'Award' },
    { id: '3', title: 'Fast Delivery', description: 'Quick turnaround times without compromising quality', icon: 'Zap' },
    { id: '4', title: 'Cost Effective', description: 'Competitive pricing with maximum value for your investment', icon: 'TrendingUp' },
  ]
}

export default function FeaturesSectionEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<FeaturesContent>(defaultContent)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchContent()
    }
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=features&page=home')
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

  const handleChange = (field: keyof FeaturesContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }))
    setSuccess('')
  }

  const handleFeatureChange = (id: string, field: keyof Feature, value: string) => {
    setContent(prev => ({
      ...prev,
      features: prev.features.map(f => 
        f.id === id ? { ...f, [field]: value } : f
      )
    }))
    setSuccess('')
  }

  const addFeature = () => {
    setContent(prev => ({
      ...prev,
      features: [...prev.features, { 
        id: Date.now().toString(), 
        title: 'New Feature', 
        description: 'Feature description',
        icon: 'Star'
      }]
    }))
  }

  const removeFeature = (id: string) => {
    setContent(prev => ({
      ...prev,
      features: prev.features.filter(f => f.id !== id)
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
          section: 'features',
          page: 'home',
          content: JSON.stringify(content)
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('Features section saved successfully!')
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
              <h1 className="text-2xl font-bold text-gray-900">Features Section</h1>
              <p className="text-gray-600">Edit the features showcase on homepage</p>
            </div>
          </div>
          <Link href="/#features" target="_blank">
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
                  placeholder="Brief description of this section"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Features List */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-900">Features</h2>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </Button>
              </div>
              
              <div className="space-y-4">
                {content.features.map((feature, index) => (
                  <div key={feature.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start space-x-4">
                      <div className="text-gray-400 cursor-move pt-2">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Feature Title</label>
                            <Input
                              value={feature.title}
                              onChange={(e) => handleFeatureChange(feature.id, 'title', e.target.value)}
                              placeholder="Feature title"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Icon</label>
                            <select
                              value={feature.icon}
                              onChange={(e) => handleFeatureChange(feature.id, 'icon', e.target.value)}
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
                            value={feature.description}
                            onChange={(e) => handleFeatureChange(feature.id, 'description', e.target.value)}
                            placeholder="Feature description"
                            rows={2}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeature(feature.id)}
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
