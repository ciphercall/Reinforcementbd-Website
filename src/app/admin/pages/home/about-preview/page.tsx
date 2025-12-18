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
import { ArrowLeft, Eye, Save } from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'

interface AboutPreviewContent {
  eyebrow: string
  title: string
  description: string
  image: string
  yearsExperience: string
  missionTitle: string
  missionDescription: string
  visionTitle: string
  visionDescription: string
  buttonText: string
  buttonLink: string
}

const defaultContent: AboutPreviewContent = {
  eyebrow: 'About Us',
  title: 'Your Trusted Partner for Industrial Excellence',
  description:
    'Reinforcement Group started its journey in 2018 as "Reinforcement Automation" and has grown to become a diversified company with three specialized divisions: Automation, Architect View, and IT Zone. We empower businesses with innovative solutions in electrical & automation, architectural design, and technology services.',
  image: '/images/automation/2.png',
  yearsExperience: '6+',
  missionTitle: 'Our Mission',
  missionDescription:
    'To provide innovative and reliable electrical, automation, architectural, and IT solutions that exceed client expectations with highest quality.',
  visionTitle: 'Our Vision',
  visionDescription:
    'To be the leading integrated solutions provider in Bangladesh, recognized for excellence, innovation, and customer satisfaction.',
  buttonText: 'Learn More About Us',
  buttonLink: '/about'
}

export default function AboutPreviewEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<AboutPreviewContent>(defaultContent)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') fetchContent()
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=about-preview&page=home')
      if (response.ok) {
        const data = await response.json()
        if (data.content) {
          setContent(coercePageContent<AboutPreviewContent>(data.content, defaultContent))
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

  const handleChange = (field: keyof AboutPreviewContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }))
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
          section: 'about-preview',
          page: 'home',
          content
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('About preview saved successfully!')
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
              <h1 className="text-2xl font-bold text-gray-900">About Preview</h1>
              <p className="text-gray-600">Edit the homepage about section</p>
            </div>
          </div>
          <Link href="/#about" target="_blank">
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
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Main Content</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eyebrow</label>
                <Input value={content.eyebrow} onChange={(e) => handleChange('eyebrow', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input value={content.title} onChange={(e) => handleChange('title', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={content.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Image & Badge</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <Input value={content.image} onChange={(e) => handleChange('image', e.target.value)} placeholder="/images/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
                  <Input value={content.yearsExperience} onChange={(e) => handleChange('yearsExperience', e.target.value)} placeholder="6+" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Mission & Vision</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mission Title</label>
                    <Input
                      value={content.missionTitle}
                      onChange={(e) => handleChange('missionTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mission Description</label>
                    <Textarea
                      value={content.missionDescription}
                      onChange={(e) => handleChange('missionDescription', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vision Title</label>
                    <Input
                      value={content.visionTitle}
                      onChange={(e) => handleChange('visionTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vision Description</label>
                    <Textarea
                      value={content.visionDescription}
                      onChange={(e) => handleChange('visionDescription', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Button</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                  <Input value={content.buttonText} onChange={(e) => handleChange('buttonText', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <Input value={content.buttonLink} onChange={(e) => handleChange('buttonLink', e.target.value)} />
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
