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

type Partner = {
  id: string
  name: string
  description: string
  partnership: string
  logo: string | null
  backgroundImage: string | null
  website: string | null
  location: string | null
  order: number
  isActive: boolean
}

export default function EditPartnerPage() {
  const routeParams = useParams<{ id?: string }>()
  const partnerId = routeParams?.id
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [partner, setPartner] = useState<Partner | null>(null)

  useEffect(() => {
    if (status === 'authenticated' && partnerId) void fetchPartner(partnerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, partnerId])

  const fetchPartner = async (id: string) => {
    try {
      const res = await fetch(`/api/partners/${id}`, { credentials: 'include' })
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!res.ok) throw new Error('Not found')
      const data = (await res.json()) as Partner
      setPartner(data)
    } catch {
      setPartner(null)
    } finally {
      setLoading(false)
    }
  }

  const save = async () => {
    if (!partner) return
    if (!session) {
      router.push('/admin/login')
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`/api/partners/${partner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...partner,
          order: Number(partner.order) || 0,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      alert('Partner updated')
    } catch {
      alert('Failed to update partner')
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    if (!partner) return
    if (!session) {
      router.push('/admin/login')
      return
    }
    if (!confirm('Delete this partner?')) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/partners/${partner.id}`, { method: 'DELETE', credentials: 'include' })
      if (!res.ok) throw new Error('Failed')
      router.push('/admin/partners')
    } catch {
      alert('Failed to delete partner')
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

  if (!partnerId) {
    return (
      <AdminSidebar>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin/partners">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Missing partner id</h1>
          </div>
        </div>
      </AdminSidebar>
    )
  }

  if (!session) {
    router.push('/admin/login')
    return null
  }

  if (!partner) {
    return (
      <AdminSidebar>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin/partners">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Partner not found</h1>
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
            <Link href="/admin/partners">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Partner</h1>
              <p className="text-gray-600">Update partner details and logo</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <Input value={partner.name} onChange={(e) => setPartner((p) => (p ? { ...p, name: e.target.value } : p))} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input value={partner.location ?? ''} onChange={(e) => setPartner((p) => (p ? { ...p, location: e.target.value } : p))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <Input value={partner.website ?? ''} onChange={(e) => setPartner((p) => (p ? { ...p, website: e.target.value } : p))} placeholder="https://..." />
              </div>
            </div>

            <ImagePicker
              label="Logo"
              value={partner.logo ?? ''}
              onChange={(path) => setPartner((p) => (p ? { ...p, logo: path } : p))}
              placeholder="Select partner logo..."
            />

            <div>
              <ImagePicker
                label="Card Background Image"
                value={partner.backgroundImage ?? ''}
                onChange={(path) => setPartner((p) => (p ? { ...p, backgroundImage: path } : p))}
                placeholder="Select background image..."
              />
              <p className="text-xs text-gray-500 mt-2">
                This image replaces the blue card background on the visitor Partners page.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea rows={4} value={partner.description} onChange={(e) => setPartner((p) => (p ? { ...p, description: e.target.value } : p))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Partnership</label>
              <Textarea rows={4} value={partner.partnership} onChange={(e) => setPartner((p) => (p ? { ...p, partnership: e.target.value } : p))} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <Input value={String(partner.order)} onChange={(e) => setPartner((p) => (p ? { ...p, order: Number(e.target.value) } : p))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Active</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={partner.isActive ? 'true' : 'false'}
                  onChange={(e) => setPartner((p) => (p ? { ...p, isActive: e.target.value === 'true' } : p))}
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
