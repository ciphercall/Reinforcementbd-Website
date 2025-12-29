'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'

interface SectionVisibility {
  hero: boolean
  features: boolean
  'about-preview': boolean
  'services-preview': boolean
  process: boolean
  'why-us': boolean
  'industries-preview': boolean
  'testimonials-preview': boolean
  'team-preview': boolean
  clients: boolean
  cta: boolean
}

const defaultVisibility: SectionVisibility = {
  hero: true,
  features: true,
  'about-preview': true,
  'services-preview': true,
  process: true,
  'why-us': true,
  'industries-preview': true,
  'testimonials-preview': false,
  'team-preview': false,
  clients: false,
  cta: true,
}

const sections = [
  { key: 'hero', label: 'Hero Section', description: 'Main banner and call-to-action' },
  { key: 'features', label: 'Features', description: 'Key features showcase' },
  { key: 'about-preview', label: 'About Preview', description: 'Company introduction' },
  { key: 'services-preview', label: 'Services Preview', description: 'Featured services' },
  { key: 'process', label: 'Process Steps', description: 'How we work' },
  { key: 'why-us', label: 'Why Choose Us', description: 'Value propositions' },
  { key: 'industries-preview', label: 'Industries Preview', description: 'Industries we serve' },
  { key: 'testimonials-preview', label: 'Testimonials', description: 'Client testimonials' },
  { key: 'team-preview', label: 'Team Preview', description: 'Team members showcase' },
  { key: 'clients', label: 'Clients Section', description: 'Client logos' },
  { key: 'cta', label: 'CTA Section', description: 'Bottom call-to-action' },
] as const

export default function HomepageVisibilitySettings() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [visibility, setVisibility] = useState<SectionVisibility>(defaultVisibility)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSettings()
    }
  }, [status])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings/homepage-visibility')
      if (response.ok) {
        const data = await response.json()
        if (data.visibility) {
          setVisibility({ ...defaultVisibility, ...data.visibility })
        }
      }
    } catch {
      // Use defaults
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

  const toggleSection = (key: keyof SectionVisibility) => {
    setVisibility(prev => ({ ...prev, [key]: !prev[key] }))
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/settings/homepage-visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('Homepage visibility settings saved successfully!')
    } catch {
      setError('Failed to save settings')
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
              <h1 className="text-2xl font-bold text-gray-900">Homepage Section Visibility</h1>
              <p className="text-gray-600">Control which sections appear on your homepage</p>
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

          {/* Sections List */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">
                Section Visibility Controls
              </h2>
              
              <div className="space-y-3">
                {sections.map((section) => {
                  const isVisible = visibility[section.key as keyof SectionVisibility]
                  return (
                    <div 
                      key={section.key}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{section.label}</h3>
                        <p className="text-sm text-gray-500">{section.description}</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => toggleSection(section.key as keyof SectionVisibility)}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                          isVisible ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className="sr-only">Toggle {section.label}</span>
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            isVisible ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        >
                          {isVisible ? (
                            <Eye className="w-4 h-4 text-blue-600 m-1" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-gray-400 m-1" />
                          )}
                        </span>
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Disabled sections will not appear on your homepage, 
                  but their content and settings are preserved. You can re-enable them anytime.
                </p>
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
