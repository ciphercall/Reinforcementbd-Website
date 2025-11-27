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
import { ArrowLeft, Save, Eye } from 'lucide-react'

interface CTAContent {
  headline: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  backgroundColor: string
}

const defaultContent: CTAContent = {
  headline: 'Ready to Transform Your Business?',
  description: 'Let us help you achieve your goals with our comprehensive business solutions. Get in touch with our team today.',
  primaryButtonText: 'Get Started',
  primaryButtonLink: '/contact',
  secondaryButtonText: 'Learn More',
  secondaryButtonLink: '/about',
  backgroundColor: 'blue'
}

export default function CTASectionEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<CTAContent>(defaultContent)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchContent()
    }
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=cta&page=home')
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

  const handleChange = (field: keyof CTAContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }))
    setSuccess('')
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
          section: 'cta',
          page: 'home',
          content: JSON.stringify(content)
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('CTA section saved successfully!')
    } catch {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-600' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-600' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-600' },
    { value: 'green', label: 'Green', class: 'bg-green-600' },
    { value: 'gray', label: 'Gray', class: 'bg-gray-800' },
  ]

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
              <h1 className="text-2xl font-bold text-gray-900">CTA Section</h1>
              <p className="text-gray-600">Edit the call-to-action banner</p>
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

          {/* Content */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Content</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline
                </label>
                <Input
                  value={content.headline}
                  onChange={(e) => handleChange('headline', e.target.value)}
                  placeholder="Ready to Transform Your Business?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  value={content.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Brief description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Buttons</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Primary Button</h3>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Button Text</label>
                    <Input
                      value={content.primaryButtonText}
                      onChange={(e) => handleChange('primaryButtonText', e.target.value)}
                      placeholder="Get Started"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Button Link</label>
                    <Input
                      value={content.primaryButtonLink}
                      onChange={(e) => handleChange('primaryButtonLink', e.target.value)}
                      placeholder="/contact"
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
                      placeholder="Learn More"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Button Link</label>
                    <Input
                      value={content.secondaryButtonLink}
                      onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                      placeholder="/about"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Style */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Style</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Background Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleChange('backgroundColor', color.value)}
                      className={`w-12 h-12 rounded-lg ${color.class} ${
                        content.backgroundColor === color.value 
                          ? 'ring-4 ring-offset-2 ring-blue-500' 
                          : ''
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
              <div className={`p-8 rounded-lg bg-${content.backgroundColor}-600 text-white text-center`}>
                <h3 className="text-2xl font-bold mb-2">{content.headline}</h3>
                <p className="text-white/80 mb-6 max-w-xl mx-auto">{content.description}</p>
                <div className="flex justify-center gap-4">
                  <span className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium">
                    {content.primaryButtonText}
                  </span>
                  <span className="px-6 py-3 border border-white rounded-lg font-medium">
                    {content.secondaryButtonText}
                  </span>
                </div>
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
