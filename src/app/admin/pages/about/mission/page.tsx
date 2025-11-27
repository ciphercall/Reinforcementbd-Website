'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

interface MissionContent {
  missionTitle: string
  missionText: string
  missionIcon: string
  visionTitle: string
  visionText: string
  visionIcon: string
  goals: { title: string; description: string }[]
}

export default function AboutMissionEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<MissionContent>({
    missionTitle: 'Our Mission',
    missionText: 'To provide innovative and reliable business solutions that empower organizations to achieve their goals while maintaining the highest standards of quality and integrity.',
    missionIcon: 'Target',
    visionTitle: 'Our Vision',
    visionText: 'To be the most trusted partner for businesses across Bangladesh, driving growth and transformation through technology and expertise.',
    visionIcon: 'Eye',
    goals: [
      { title: 'Excellence', description: 'Deliver exceptional service quality in every engagement' },
      { title: 'Innovation', description: 'Continuously evolve with cutting-edge solutions' },
      { title: 'Partnership', description: 'Build lasting relationships with our clients' },
      { title: 'Growth', description: 'Enable sustainable business growth for all stakeholders' }
    ]
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=about&section=mission')
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
          section: 'mission',
          content
        })
      })
      
      if (res.ok) {
        alert('Mission section saved successfully!')
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

  const updateGoal = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...content.goals]
    updated[index] = { ...updated[index], [field]: value }
    setContent({ ...content, goals: updated })
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
              <h1 className="text-2xl font-bold text-gray-900">Mission & Vision</h1>
              <p className="text-gray-600">Edit company mission, vision, and goals</p>
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

        {/* Mission */}
        <Card>
          <CardHeader>
            <CardTitle>Mission Statement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.missionTitle}
                onChange={(e) => setContent({ ...content, missionTitle: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Text
              </label>
              <textarea
                value={content.missionText}
                onChange={(e) => setContent({ ...content, missionText: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon Name (Lucide Icon)
              </label>
              <input
                type="text"
                value={content.missionIcon}
                onChange={(e) => setContent({ ...content, missionIcon: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Target, Rocket, Flag"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use Lucide icon names. See: lucide.dev/icons
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card>
          <CardHeader>
            <CardTitle>Vision Statement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.visionTitle}
                onChange={(e) => setContent({ ...content, visionTitle: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vision Text
              </label>
              <textarea
                value={content.visionText}
                onChange={(e) => setContent({ ...content, visionText: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon Name (Lucide Icon)
              </label>
              <input
                type="text"
                value={content.visionIcon}
                onChange={(e) => setContent({ ...content, visionIcon: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Eye, Compass, Star"
              />
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Company Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {content.goals.map((goal, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Goal Title
                    </label>
                    <input
                      type="text"
                      value={goal.title}
                      onChange={(e) => updateGoal(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Description
                    </label>
                    <textarea
                      value={goal.description}
                      onChange={(e) => updateGoal(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
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
