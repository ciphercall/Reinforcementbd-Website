'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { coercePageContent } from '@/lib/utils/pageContent'
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from 'lucide-react'

interface Milestone {
  year: string
  event: string
}

interface JourneyContent {
  sectionTitle: string
  sectionSubtitle: string
  milestones: Milestone[]
}

const defaultContent: JourneyContent = {
  sectionTitle: 'Our Journey',
  sectionSubtitle: 'From 2018 to Today',
  milestones: [
    { year: '2018', event: 'Founded as Reinforcement Automation' },
    { year: '2019', event: 'Expanded automation services' },
    { year: '2020', event: 'Grew client base nationwide' },
    { year: '2021', event: 'Launched Architect View & IT Zone divisions' },
    { year: '2022', event: 'Major project completions' },
    { year: '2023', event: 'Continued growth and innovation' },
    { year: '2024', event: 'Strengthening market position' },
  ],
}

export default function AboutJourneyEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<JourneyContent>(defaultContent)

  useEffect(() => {
    if (status === 'authenticated') fetchContent()
    if (status === 'unauthenticated') router.push('/admin/login')
  }, [status, router])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=about&section=journey')
      if (res.ok) {
        const data = await res.json()
        setContent(coercePageContent<JourneyContent>(data.content, defaultContent))
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
          section: 'journey',
          content,
        }),
      })

      if (res.ok) {
        alert('Journey timeline saved successfully!')
      } else {
        alert('Failed to save content')
      }
    } catch {
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const addMilestone = () => {
    setContent((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { year: '', event: '' }],
    }))
  }

  const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
    setContent((prev) => {
      const milestones = [...prev.milestones]
      milestones[index] = { ...milestones[index], [field]: value }
      return { ...prev, milestones }
    })
  }

  const removeMilestone = (index: number) => {
    setContent((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }))
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
              <h1 className="text-2xl font-bold text-gray-900">Journey Timeline</h1>
              <p className="text-gray-600">Edit the timeline milestones on the About page</p>
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
            <div className="flex items-center justify-between">
              <CardTitle>Milestones ({content.milestones.length})</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                <Plus className="w-4 h-4 mr-1" /> Add Milestone
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {content.milestones.map((m, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Year</label>
                      <input
                        type="text"
                        value={m.year}
                        onChange={(e) => updateMilestone(index, 'year', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 2024"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Event</label>
                      <input
                        type="text"
                        value={m.event}
                        onChange={(e) => updateMilestone(index, 'event', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Milestone description"
                      />
                    </div>
                    <div className="md:col-span-3 flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeMilestone(index)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
