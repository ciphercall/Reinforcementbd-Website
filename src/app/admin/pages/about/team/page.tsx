'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ImagePicker } from '@/components/admin/ImagePicker'
import { coercePageContent } from '@/lib/utils/pageContent'
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  showImage?: boolean
  linkedin: string
  email: string
}

interface TeamContent {
  sectionTitle: string
  sectionSubtitle: string
  visibleCount?: number
  members: TeamMember[]
}

const defaultContent: TeamContent = {
  sectionTitle: 'Meet Our Team',
  sectionSubtitle: 'Expert Engineers Driving Excellence',
  visibleCount: 0,
  members: [
    {
      id: '1',
      name: 'Engr. Md. Shariful Islam',
      position: 'Director',
      bio: 'Founder and Director of Reinforcement Group with extensive experience in electrical engineering and automation. Leading the company vision since 2018.',
      image: '/images/team/shariful.jpg',
      showImage: true,
      linkedin: '#',
      email: 'shariful@ragrpbd.com',
    },
    {
      id: '2',
      name: 'Engr. Gazi Monir-Uz-Zaman',
      position: 'Director',
      bio: 'Co-Director bringing strategic leadership and technical expertise to drive company growth and innovation in all three divisions.',
      image: '/images/team/monir.jpg',
      showImage: true,
      linkedin: '#',
      email: 'gazi@ragrpbd.com',
    },
    {
      id: '3',
      name: 'Ar. Miss. Sultana',
      position: 'Head of Design',
      bio: 'Leading the Reinforcement Architect View division with creative architectural designs and innovative visualization solutions.',
      image: '/images/team/sultana.jpg',
      showImage: true,
      linkedin: '#',
      email: 'sultana@ragrpbd.com',
    },
    {
      id: '4',
      name: 'Engr. Md. Sarful Hasan',
      position: 'Chief Advisor',
      bio: 'Providing strategic guidance and technical advisory services with years of industry experience in automation and electrical systems.',
      image: '/images/team/sarful.jpg',
      showImage: true,
      linkedin: '#',
      email: 'sarful@ragrpbd.com',
    },
  ],
}

export default function AboutTeamEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<TeamContent>(defaultContent)

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/admin/pages/home/team-preview')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') fetchContent()
    if (status === 'unauthenticated') router.push('/admin/login')
  }, [status, router])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=about&section=team')
      if (res.ok) {
        const data = await res.json()
        const coerced = coercePageContent<TeamContent>(data.content, defaultContent)
        setContent({
          ...defaultContent,
          ...coerced,
          visibleCount: coerced.visibleCount ?? defaultContent.visibleCount,
          members: (coerced.members ?? defaultContent.members).map((m) => ({
            ...m,
            showImage: m.showImage ?? true,
          })),
        })
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
          section: 'team',
          content,
        }),
      })

      if (res.ok) {
        alert('Team section saved successfully!')
      } else {
        alert('Failed to save content')
      }
    } catch {
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const addMember = () => {
    setContent((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        {
          id: Date.now().toString(),
          name: 'New Member',
          position: 'Role',
          bio: 'Bio',
          image: '',
          showImage: true,
          linkedin: '#',
          email: '',
        },
      ],
    }))
  }

  const updateMember = (id: string, field: keyof TeamMember, value: string) => {
    setContent((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    }))
  }

  const removeMember = (id: string) => {
    setContent((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id),
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
              <h1 className="text-2xl font-bold text-gray-900">Team</h1>
              <p className="text-gray-600">Edit the team members shown on the About page</p>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How many members to show on About page</label>
              <input
                type="number"
                min={0}
                value={content.visibleCount ?? 0}
                onChange={(e) => {
                  const n = Number.parseInt(e.target.value || '0', 10)
                  setContent((prev) => ({ ...prev, visibleCount: Number.isFinite(n) ? n : 0 }))
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Set to 0 to show all members.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Members ({content.members.length})</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addMember}>
                <Plus className="w-4 h-4 mr-1" /> Add Member
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {content.members.map((m) => (
                <div key={m.id} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm text-gray-600">Show image</label>
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={m.showImage !== false}
                          onChange={(e) => {
                            setContent((prev) => ({
                              ...prev,
                              members: prev.members.map((x) =>
                                x.id === m.id ? { ...x, showImage: e.target.checked } : x
                              ),
                            }))
                          }}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Name</label>
                          <input
                            type="text"
                            value={m.name}
                            onChange={(e) => updateMember(m.id, 'name', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Position</label>
                          <input
                            type="text"
                            value={m.position}
                            onChange={(e) => updateMember(m.id, 'position', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Bio</label>
                        <textarea
                          value={m.bio}
                          onChange={(e) => updateMember(m.id, 'bio', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <ImagePicker
                            label="Image"
                            value={m.image}
                            onChange={(path) => updateMember(m.id, 'image', path)}
                            aspectRatio={1}
                            placeholder="/images/team/... or /uploads/..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">LinkedIn URL</label>
                          <input
                            type="text"
                            value={m.linkedin}
                            onChange={(e) => updateMember(m.id, 'linkedin', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="#"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Email</label>
                          <input
                            type="text"
                            value={m.email}
                            onChange={(e) => updateMember(m.id, 'email', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="name@domain.com"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeMember(m.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                      aria-label="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
