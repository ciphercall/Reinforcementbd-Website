'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Save } from 'lucide-react'

interface Setting {
  id: string
  key: string
  value: string
  description: string | null
}

export default function AdminSettingsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [settings, setSettings] = useState<Setting[]>([])
  const [formData, setFormData] = useState<Record<string, string>>({})

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSettings()
    }
  }, [status])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
        const initialFormData: Record<string, string> = {}
        data.forEach((setting: Setting) => {
          initialFormData[setting.key] = setting.value
        })
        setFormData(initialFormData)
      }
    } catch {
      setError('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!session) {
    router.push('/admin/login')
    return null
  }

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      setSuccess('Settings saved successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const settingsGroups = [
    {
      title: 'Company Information',
      keys: ['company_name', 'company_tagline']
    },
    {
      title: 'Contact Details',
      keys: ['address', 'phone', 'email', 'website']
    }
  ]

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-600">Configure your website settings</p>
        </div>

        {/* Settings Form */}
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

          {settingsGroups.map((group) => (
            <Card key={group.title}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{group.title}</h2>
                <div className="space-y-4">
                  {group.keys.map((key) => {
                    const setting = settings.find(s => s.key === key)
                    return (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {key.replace(/_/g, ' ')}
                        </label>
                        {key === 'address' ? (
                          <Textarea
                            value={formData[key] || ''}
                            onChange={(e) => handleChange(key, e.target.value)}
                            rows={2}
                          />
                        ) : (
                          <Input
                            value={formData[key] || ''}
                            onChange={(e) => handleChange(key, e.target.value)}
                          />
                        )}
                        {setting?.description && (
                          <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminSidebar>
  )
}
