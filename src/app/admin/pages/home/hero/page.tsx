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
import { ArrowLeft, Save, Eye, Image as ImageIcon, Plus, Trash2 } from 'lucide-react'

interface HeroContent {
  headline: string
  subheadline: string
  tagline: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  backgroundImage: string
  stats: { label: string; value: string }[]
}

const defaultContent: HeroContent = {
  headline: 'Empowering Your Business Through Tailored Solutions',
  subheadline: 'HR | BPO | IT | Managed Services',
  tagline: 'MARSH Services & Outsourcing delivers comprehensive business solutions that drive growth, efficiency, and success for enterprises across Bangladesh and beyond.',
  primaryButtonText: 'Explore Our Services',
  primaryButtonLink: '/services',
  secondaryButtonText: 'Contact Us',
  secondaryButtonLink: '/contact',
  backgroundImage: '/images/hero-bg.jpg',
  stats: [
    { label: 'Years Experience', value: '10+' },
    { label: 'Clients Served', value: '500+' },
    { label: 'Team Members', value: '100+' },
    { label: 'Industries', value: '12+' },
  ]
}

export default function HeroSectionEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<HeroContent>(defaultContent)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchContent()
    }
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=hero')
      if (response.ok) {
        const data = await response.json()
        if (data.content) {
          setContent(JSON.parse(data.content))
        }
      }
    } catch {
      // Use default content if fetch fails
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

  const handleChange = (field: keyof HeroContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }))
    setSuccess('')
  }

  const handleStatChange = (index: number, field: 'label' | 'value', value: string) => {
    setContent(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }))
    setSuccess('')
  }

  const addStat = () => {
    setContent(prev => ({
      ...prev,
      stats: [...prev.stats, { label: 'New Stat', value: '0' }]
    }))
  }

  const removeStat = (index: number) => {
    setContent(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
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
          section: 'hero',
          page: 'home',
          content: JSON.stringify(content)
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('Hero section saved successfully!')
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
              <h1 className="text-2xl font-bold text-gray-900">Hero Section</h1>
              <p className="text-gray-600">Edit the main banner of your homepage</p>
            </div>
          </div>
          <Link href="/" target="_blank">
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

          {/* Main Content */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Main Content</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline
                </label>
                <Input
                  value={content.headline}
                  onChange={(e) => handleChange('headline', e.target.value)}
                  placeholder="Main headline text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subheadline / Categories
                </label>
                <Input
                  value={content.subheadline}
                  onChange={(e) => handleChange('subheadline', e.target.value)}
                  placeholder="e.g., HR | BPO | IT | Managed Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description / Tagline
                </label>
                <Textarea
                  value={content.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="Brief description of your company"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Call-to-Action Buttons</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Primary Button</h3>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Button Text</label>
                    <Input
                      value={content.primaryButtonText}
                      onChange={(e) => handleChange('primaryButtonText', e.target.value)}
                      placeholder="Explore Our Services"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Button Link</label>
                    <Input
                      value={content.primaryButtonLink}
                      onChange={(e) => handleChange('primaryButtonLink', e.target.value)}
                      placeholder="/services"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Secondary Button</h3>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Button Text</label>
                    <Input
                      value={content.secondaryButtonText}
                      onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                      placeholder="Contact Us"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Button Link</label>
                    <Input
                      value={content.secondaryButtonLink}
                      onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                      placeholder="/contact"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Background */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Background Image</h2>
              
              <div className="flex items-start space-x-4">
                <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border">
                  {content.backgroundImage ? (
                    <img 
                      src={content.backgroundImage} 
                      alt="Background preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    value={content.backgroundImage}
                    onChange={(e) => handleChange('backgroundImage', e.target.value)}
                    placeholder="/images/hero-bg.jpg"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter image URL or upload via Media Library
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
                <Button type="button" variant="outline" size="sm" onClick={addStat}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stat
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {content.stats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <Input
                        value={stat.value}
                        onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                        placeholder="100+"
                        className="text-center font-bold"
                      />
                      <Input
                        value={stat.label}
                        onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                        placeholder="Label"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeStat(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
