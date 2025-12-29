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
  const [menuVisibility, setMenuVisibility] = useState({
    home: true,
    about: true,
    services: true,
    industries: true,
    partners: true,
    contact: true
  })
  const [savingMenu, setSavingMenu] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSettings()
      fetchMenuVisibility()
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

  const fetchMenuVisibility = async () => {
    try {
      const response = await fetch('/api/settings/menu-visibility')
      if (response.ok) {
        const data = await response.json()
        setMenuVisibility(data.visibility)
      }
    } catch {
      console.error('Failed to load menu visibility settings')
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

  const handleMenuVisibilityToggle = (key: string) => {
    setMenuVisibility(prev => ({ ...prev, [key]: !prev[key] }))
    setSuccess('')
  }

  const handleSaveMenuVisibility = async () => {
    setSavingMenu(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/settings/menu-visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility: menuVisibility })
      })

      if (!response.ok) {
        throw new Error('Failed to save menu visibility')
      }

      setSuccess('Menu visibility settings saved successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSavingMenu(false)
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

          {/* Menu Visibility Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu Visibility</h2>
              <p className="text-sm text-gray-600 mb-4">
                Control which pages appear in the navigation menu
              </p>
              <div className="space-y-3">
                {Object.entries(menuVisibility).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key}
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleMenuVisibilityToggle(key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 transition-colors"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  type="button"
                  onClick={handleSaveMenuVisibility}
                  disabled={savingMenu}
                >
                  {savingMenu ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Menu Visibility
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

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
