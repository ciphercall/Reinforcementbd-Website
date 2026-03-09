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

export default function NewPartnerPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '',
    location: '',
    website: '',
    logo: '',
    backgroundImage: '',
    description: '',
    partnership: '',
    order: 0,
    isActive: true,
  })

  const save = async () => {
    if (!session) {
      router.push('/admin/login')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/partners', {
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
      router.push('/admin/partners')
    } catch {
      alert('Failed to create partner')
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
            <Link href="/admin/partners">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add Partner</h1>
              <p className="text-gray-600">Create a new partner entry for the visitor Partners page</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <Input value={form.website} onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))} placeholder="https://..." />
              </div>
            </div>

            <ImagePicker
              label="Logo"
              value={form.logo}
              onChange={(path) => setForm((p) => ({ ...p, logo: path }))}
              enableCrop={false}
              placeholder="Select partner logo..."
            />

            <div>
              <ImagePicker
                label="Card Background Image"
                value={form.backgroundImage}
                onChange={(path) => setForm((p) => ({ ...p, backgroundImage: path }))}
                enableCrop={false}
                placeholder="Select background image..."
              />
              <p className="text-xs text-gray-500 mt-2">
                This image replaces the blue card background on the visitor Partners page.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea rows={4} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Partnership</label>
              <Textarea rows={4} value={form.partnership} onChange={(e) => setForm((p) => ({ ...p, partnership: e.target.value }))} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <Input value={String(form.order)} onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))} />
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
