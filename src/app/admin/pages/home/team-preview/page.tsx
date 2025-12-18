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
import { ArrowLeft, Eye, Plus, Save, Trash2 } from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'

interface TeamMemberPreview {
  id: string
  name: string
  position: string
  bio: string
  image: string
  linkedin: string
  email: string
}

interface TeamPreviewContent {
  sectionTitle: string
  sectionSubtitle: string
  members: TeamMemberPreview[]
  bottomButtonText: string
  bottomButtonLink: string
}

const defaultContent: TeamPreviewContent = {
  sectionTitle: 'Meet Our Team',
  sectionSubtitle: 'Expert Engineers Driving Excellence',
  members: [
    {
      id: '1',
      name: 'Engr. Md. Shariful Islam',
      position: 'Director',
      bio: 'Founder and Director of Reinforcement Group with extensive experience in electrical engineering and automation. Leading the company vision since 2018.',
      image: '/images/team/shariful.jpg',
      linkedin: '#',
      email: 'shariful@ragrpbd.com'
    },
    {
      id: '2',
      name: 'Engr. Gazi Monir-Uz-Zaman',
      position: 'Director',
      bio: 'Co-Director bringing strategic leadership and technical expertise to drive company growth and innovation in all three divisions.',
      image: '/images/team/monir.jpg',
      linkedin: '#',
      email: 'gazi@ragrpbd.com'
    },
    {
      id: '3',
      name: 'Ar. Miss. Sultana',
      position: 'Head of Design',
      bio: 'Leading the Reinforcement Architect View division with creative architectural designs and innovative visualization solutions.',
      image: '/images/team/sultana.jpg',
      linkedin: '#',
      email: 'sultana@ragrpbd.com'
    },
    {
      id: '4',
      name: 'Engr. Md. Sarful Hasan',
      position: 'Chief Advisor',
      bio: 'Providing strategic guidance and technical advisory services with years of industry experience in automation and electrical systems.',
      image: '/images/team/sarful.jpg',
      linkedin: '#',
      email: 'sarful@ragrpbd.com'
    }
  ],
  bottomButtonText: 'View Full Team',
  bottomButtonLink: '/about#team'
}

export default function TeamPreviewEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<TeamPreviewContent>(defaultContent)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') fetchContent()
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=team-preview&page=home')
      if (response.ok) {
        const data = await response.json()
        if (data.content) {
          setContent(coercePageContent<TeamPreviewContent>(data.content, defaultContent))
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

  const handleChange = (field: keyof TeamPreviewContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }))
    setSuccess('')
  }

  const handleMemberChange = (id: string, field: keyof TeamMemberPreview, value: string) => {
    setContent((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    }))
    setSuccess('')
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
          linkedin: '#',
          email: ''
        }
      ]
    }))
  }

  const removeMember = (id: string) => {
    setContent((prev) => ({ ...prev, members: prev.members.filter((m) => m.id !== id) }))
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
          section: 'team-preview',
          page: 'home',
          content
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('Team preview saved successfully!')
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
              <h1 className="text-2xl font-bold text-gray-900">Team Preview</h1>
              <p className="text-gray-600">Edit the team showcase on homepage</p>
            </div>
          </div>
          <Link href="/#team" target="_blank">
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
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Section Header</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input value={content.sectionTitle} onChange={(e) => handleChange('sectionTitle', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Textarea
                  value={content.sectionSubtitle}
                  onChange={(e) => handleChange('sectionSubtitle', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                <Button type="button" variant="outline" size="sm" onClick={addMember}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>

              <div className="space-y-4">
                {content.members.map((m) => (
                  <div key={m.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Name</label>
                            <Input value={m.name} onChange={(e) => handleMemberChange(m.id, 'name', e.target.value)} />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Position</label>
                            <Input value={m.position} onChange={(e) => handleMemberChange(m.id, 'position', e.target.value)} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Bio</label>
                          <Textarea value={m.bio} onChange={(e) => handleMemberChange(m.id, 'bio', e.target.value)} rows={3} />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Image</label>
                            <Input value={m.image} onChange={(e) => handleMemberChange(m.id, 'image', e.target.value)} placeholder="/images/team/..." />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">LinkedIn URL</label>
                            <Input value={m.linkedin} onChange={(e) => handleMemberChange(m.id, 'linkedin', e.target.value)} placeholder="#" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Email</label>
                            <Input value={m.email} onChange={(e) => handleMemberChange(m.id, 'email', e.target.value)} placeholder="name@domain.com" />
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

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Bottom Button</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                  <Input value={content.bottomButtonText} onChange={(e) => handleChange('bottomButtonText', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <Input value={content.bottomButtonLink} onChange={(e) => handleChange('bottomButtonLink', e.target.value)} />
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
