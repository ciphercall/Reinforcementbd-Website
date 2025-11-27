'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Save, Eye, Plus, Trash2, Image as ImageIcon } from 'lucide-react'

interface Client {
  id: string
  name: string
  logo: string
  category: 'enterprise' | 'sme'
}

interface ClientsContent {
  sectionTitle: string
  sectionSubtitle: string
  enterpriseTitle: string
  smeTitle: string
  clients: Client[]
}

const defaultContent: ClientsContent = {
  sectionTitle: 'Our Valued Clients',
  sectionSubtitle: 'Trusted by leading organizations across industries',
  enterpriseTitle: 'Enterprise Clients',
  smeTitle: 'SME Partners',
  clients: [
    { id: '1', name: 'Healthport Bangladesh Ltd', logo: '/images/clients/healthport.png', category: 'enterprise' },
    { id: '2', name: 'Newline Clothings PLC', logo: '/images/clients/newline.png', category: 'enterprise' },
    { id: '3', name: 'A.K. Oxygen Ltd', logo: '/images/clients/ak-oxygen.png', category: 'sme' },
  ]
}

export default function ClientsSectionEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<ClientsContent>(defaultContent)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchContent()
    }
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=clients&page=home')
      if (response.ok) {
        const data = await response.json()
        if (data.content) {
          setContent(JSON.parse(data.content))
        }
      }
    } catch {
      // Use default
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminSidebar>
    )
  }

  if (!session) {
    router.push('/admin/login')
    return null
  }

  const handleChange = (field: keyof ClientsContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }))
    setSuccess('')
  }

  const handleClientChange = (id: string, field: keyof Client, value: string) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      )
    }))
    setSuccess('')
  }

  const addClient = (category: 'enterprise' | 'sme') => {
    setContent(prev => ({
      ...prev,
      clients: [...prev.clients, { 
        id: Date.now().toString(), 
        name: 'New Client',
        logo: '',
        category
      }]
    }))
  }

  const removeClient = (id: string) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.filter(c => c.id !== id)
    }))
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
          section: 'clients',
          page: 'home',
          content: JSON.stringify(content)
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('Clients section saved successfully!')
    } catch {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const enterpriseClients = content.clients.filter(c => c.category === 'enterprise')
  const smeClients = content.clients.filter(c => c.category === 'sme')

  return (
    <AdminSidebar>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/pages/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Clients Section</h1>
              <p className="text-gray-600">Manage client logos and information</p>
            </div>
          </div>
          <Link href="/#clients" target="_blank">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
              {success}
            </div>
          )}

          {/* Section Header */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Section Header</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <Input
                  value={content.sectionTitle}
                  onChange={(e) => handleChange('sectionTitle', e.target.value)}
                  placeholder="Our Valued Clients"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subtitle
                </label>
                <Textarea
                  value={content.sectionSubtitle}
                  onChange={(e) => handleChange('sectionSubtitle', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enterprise Section Title
                  </label>
                  <Input
                    value={content.enterpriseTitle}
                    onChange={(e) => handleChange('enterpriseTitle', e.target.value)}
                    placeholder="Enterprise Clients"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SME Section Title
                  </label>
                  <Input
                    value={content.smeTitle}
                    onChange={(e) => handleChange('smeTitle', e.target.value)}
                    placeholder="SME Partners"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Clients */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-900">Enterprise Clients</h2>
                <Button type="button" variant="outline" size="sm" onClick={() => addClient('enterprise')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {enterpriseClients.map((client) => (
                  <div key={client.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-white rounded-lg border flex items-center justify-center overflow-hidden">
                        {client.logo ? (
                          <img src={client.logo} alt={client.name} className="w-full h-full object-contain" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={client.name}
                          onChange={(e) => handleClientChange(client.id, 'name', e.target.value)}
                          placeholder="Client name"
                        />
                        <Input
                          value={client.logo}
                          onChange={(e) => handleClientChange(client.id, 'logo', e.target.value)}
                          placeholder="/images/clients/logo.png"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeClient(client.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SME Clients */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-900">SME Partners</h2>
                <Button type="button" variant="outline" size="sm" onClick={() => addClient('sme')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {smeClients.map((client) => (
                  <div key={client.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-white rounded-lg border flex items-center justify-center overflow-hidden">
                        {client.logo ? (
                          <img src={client.logo} alt={client.name} className="w-full h-full object-contain" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={client.name}
                          onChange={(e) => handleClientChange(client.id, 'name', e.target.value)}
                          placeholder="Client name"
                        />
                        <Input
                          value={client.logo}
                          onChange={(e) => handleClientChange(client.id, 'logo', e.target.value)}
                          placeholder="/images/clients/logo.png"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeClient(client.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <Link href="/admin/pages/home">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
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
