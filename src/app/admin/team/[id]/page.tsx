'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { ImagePicker } from '@/components/admin/ImagePicker'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Loader2, Save, Trash2 } from 'lucide-react'

type TeamMember = {
  id: string
  name: string
  position: string
  bio: string | null
  image: string | null
  linkedin: string | null
  email: string | null
  order: number
  isActive: boolean
}

export default function EditTeamMemberPage() {
  const routeParams = useParams<{ id?: string }>()
  const memberId = routeParams?.id
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [member, setMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    if (status === 'authenticated' && memberId) void fetchMember(memberId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, memberId])

  const fetchMember = async (id: string) => {
    try {
      const res = await fetch(`/api/team/${id}`, { credentials: 'include' })
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!res.ok) throw new Error('Not found')
      const data = (await res.json()) as TeamMember
      setMember(data)
    } catch {
      setMember(null)
    } finally {
      setLoading(false)
    }
  }

  const save = async () => {
    if (!member) return
    if (!session) {
      router.push('/admin/login')
      return
    }

    if (!member.name || !member.position) {
      alert('Name and position are required')
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...member,
          order: Number(member.order) || 0,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      alert('Team member updated')
    } catch {
      alert('Failed to update team member')
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    if (!member) return
    if (!session) {
      router.push('/admin/login')
      return
    }
    if (!confirm('Delete this team member?')) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/team/${member.id}`, { method: 'DELETE', credentials: 'include' })
      if (!res.ok) throw new Error('Failed')
      router.push('/admin/team')
    } catch {
      alert('Failed to delete team member')
    } finally {
      setDeleting(false)
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

  if (!memberId) {
    return (
      <AdminSidebar>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin/team">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Missing team member id</h1>
          </div>
        </div>
      </AdminSidebar>
    )
  }

  if (!session) {
    router.push('/admin/login')
    return null
  }

  if (!member) {
    return (
      <AdminSidebar>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin/team">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Team member not found</h1>
          </div>
        </div>
      </AdminSidebar>
    )
  }

  return (
    <AdminSidebar>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/team">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Team Member</h1>
              <p className="text-gray-600">Update team member details</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-red-600 hover:bg-red-50" onClick={remove} disabled={deleting}>
              {deleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <Input 
                value={member.name} 
                onChange={(e) => setMember((p) => (p ? { ...p, name: e.target.value } : p))} 
                placeholder="Enter team member name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
              <Input 
                value={member.position} 
                onChange={(e) => setMember((p) => (p ? { ...p, position: e.target.value } : p))} 
                placeholder="e.g., CEO, Developer, Designer"
              />
            </div>

            <ImagePicker
              label="Profile Image"
              value={member.image ?? ''}
              onChange={(path) => setMember((p) => (p ? { ...p, image: path } : p))}
              aspectRatio={1}
              placeholder="Select profile image..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <Textarea 
                rows={4} 
                value={member.bio ?? ''} 
                onChange={(e) => setMember((p) => (p ? { ...p, bio: e.target.value } : p))} 
                placeholder="Brief biography of the team member"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input 
                  type="email"
                  value={member.email ?? ''} 
                  onChange={(e) => setMember((p) => (p ? { ...p, email: e.target.value } : p))} 
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <Input 
                  value={member.linkedin ?? ''} 
                  onChange={(e) => setMember((p) => (p ? { ...p, linkedin: e.target.value } : p))} 
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <Input 
                  type="number"
                  value={String(member.order)} 
                  onChange={(e) => setMember((p) => (p ? { ...p, order: Number(e.target.value) } : p))} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Active</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={member.isActive ? 'true' : 'false'}
                  onChange={(e) => setMember((p) => (p ? { ...p, isActive: e.target.value === 'true' } : p))}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
