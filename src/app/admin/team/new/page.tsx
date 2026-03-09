'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { ImagePicker } from '@/components/admin/ImagePicker'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Loader2, Save } from 'lucide-react'

export default function NewTeamMemberPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '',
    position: '',
    bio: '',
    image: '',
    linkedin: '',
    email: '',
    order: 0,
    isActive: true,
  })

  const save = async () => {
    if (!session) {
      router.push('/admin/login')
      return
    }

    if (!form.name || !form.position) {
      alert('Name and position are required')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...form,
          order: Number(form.order) || 0,
        }),
      })

      if (res.status === 401) {
        router.push('/admin/login')
        return
      }

      if (!res.ok) throw new Error('Failed to create')
      router.push('/admin/team')
    } catch {
      alert('Failed to create team member')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminSidebar>
      {status === 'loading' ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : !session ? (
        <div className="flex items-center justify-center h-64">
          <Button variant="outline" onClick={() => router.push('/admin/login')}>
            Go to login
          </Button>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/team">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add Team Member</h1>
                <p className="text-gray-600">Create a new team member entry</p>
              </div>
            </div>
            <Button onClick={save} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <Input 
                  value={form.name} 
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} 
                  placeholder="Enter team member name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                <Input 
                  value={form.position} 
                  onChange={(e) => setForm((p) => ({ ...p, position: e.target.value }))} 
                  placeholder="e.g., CEO, Developer, Designer"
                />
              </div>

              <ImagePicker
                label="Profile Image"
                value={form.image}
                onChange={(path) => setForm((p) => ({ ...p, image: path }))}
                aspectRatio={1}
                placeholder="Select profile image..."
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <Textarea 
                  rows={4} 
                  value={form.bio} 
                  onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} 
                  placeholder="Brief biography of the team member"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input 
                    type="email"
                    value={form.email} 
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} 
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <Input 
                    value={form.linkedin} 
                    onChange={(e) => setForm((p) => ({ ...p, linkedin: e.target.value }))} 
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                  <Input 
                    type="number"
                    value={String(form.order)} 
                    onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Active</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg"
                    value={form.isActive ? 'true' : 'false'}
                    onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.value === 'true' }))}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </AdminSidebar>
  )
}
