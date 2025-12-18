'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { coercePageContent } from '@/lib/utils/pageContent'
import { ArrowLeft, Loader2, Save } from 'lucide-react'

interface Division {
  title: string
  description: string
}

interface DivisionsContent {
  sectionTitle: string
  sectionSubtitle: string
  divisions: [Division, Division, Division]
}

const defaultContent: DivisionsContent = {
  sectionTitle: 'Our Three Divisions',
  sectionSubtitle: 'Comprehensive solutions under one roof',
  divisions: [
    {
      title: 'Reinforcement Automation',
      description:
        'Electrical & Automation equipment supply, installation, commissioning, and maintenance services for industrial clients.',
    },
    {
      title: 'Reinforcement Architect View',
      description:
        'Architectural design, electrical design, 3D modeling, and professional engineering services for buildings.',
    },
    {
      title: 'Reinforcement IT Zone',
      description:
        'Web development, mobile apps, cloud services, AI/ML solutions, and custom software development.',
    },
  ],
}

export default function AboutDivisionsEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<DivisionsContent>(defaultContent)

  useEffect(() => {
    if (status === 'authenticated') fetchContent()
    if (status === 'unauthenticated') router.push('/admin/login')
  }, [status, router])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=about&section=divisions')
      if (res.ok) {
        const data = await res.json()
        setContent(coercePageContent<DivisionsContent>(data.content, defaultContent))
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
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminSidebar>
    )
  }

  if (!session) return null

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'about',
          section: 'divisions',
          content,
        }),
      })

      if (res.ok) {
        alert('Divisions section saved successfully!')
      } else {
        alert('Failed to save content')
      }
    } catch {
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const updateDivision = (index: 0 | 1 | 2, field: keyof Division, value: string) => {
    setContent((prev) => {
      const divisions = [...prev.divisions] as DivisionsContent['divisions']
      divisions[index] = { ...divisions[index], [field]: value }
      return { ...prev, divisions }
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/admin/pages/about')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Divisions</h1>
              <p className="text-gray-600">Edit the three divisions section on the About page</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Section Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={content.sectionTitle}
                onChange={(e) => setContent({ ...content, sectionTitle: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={content.sectionSubtitle}
                onChange={(e) => setContent({ ...content, sectionSubtitle: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Division Cards (3)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {content.divisions.map((d, i) => (
              <div key={i} className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={d.title}
                    onChange={(e) => updateDivision(i as 0 | 1 | 2, 'title', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={d.description}
                    onChange={(e) => updateDivision(i as 0 | 1 | 2, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-500">
              The card icons/colors are part of the site design and are not editable here.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
