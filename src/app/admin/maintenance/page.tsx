'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  AlertTriangle,
  Power,
  Clock,
  MessageSquare,
  Eye
} from 'lucide-react'

interface MaintenanceSettings {
  enabled: boolean
  title: string
  message: string
  expectedEndTime: string
  showCountdown: boolean
  allowAdminAccess: boolean
  backgroundImage: string
}

const defaultSettings: MaintenanceSettings = {
  enabled: false,
  title: 'We\'ll Be Right Back!',
  message: 'We\'re currently performing scheduled maintenance to improve your experience. Please check back soon.',
  expectedEndTime: '',
  showCountdown: true,
  allowAdminAccess: true,
  backgroundImage: '/images/maintenance-bg.jpg'
}

export default function MaintenanceModePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<MaintenanceSettings>(defaultSettings)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSettings()
    }
  }, [status])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings?key=maintenance')
      if (res.ok) {
        const data = await res.json()
        if (data.value) {
          setSettings(data.value)
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'maintenance',
          value: settings
        })
      })
      if (res.ok) {
        setSuccess('Maintenance settings saved successfully!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to save settings')
      }
    } catch (err) {
      setError('An error occurred while saving')
    } finally {
      setSaving(false)
    }
  }

  const toggleMaintenance = async () => {
    const newSettings = { ...settings, enabled: !settings.enabled }
    setSettings(newSettings)
    
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'maintenance',
          value: newSettings
        })
      })
      if (res.ok) {
        setSuccess(`Maintenance mode ${newSettings.enabled ? 'enabled' : 'disabled'}!`)
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError('Failed to toggle maintenance mode')
      setSettings(settings) // Revert
    } finally {
      setSaving(false)
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

  if (status === 'unauthenticated') {
    router.push('/admin/login')
    return null
  }

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/admin/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Maintenance Mode</h1>
              <p className="text-gray-600">Control website maintenance status</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Settings
          </Button>
        </div>

        {/* Alerts */}
        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Toggle */}
          <Card className={settings.enabled ? 'border-2 border-red-500' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Power className={`w-5 h-5 ${settings.enabled ? 'text-red-500' : 'text-gray-400'}`} />
                Maintenance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`p-6 rounded-xl text-center ${
                settings.enabled 
                  ? 'bg-red-50 border-2 border-red-200' 
                  : 'bg-green-50 border-2 border-green-200'
              }`}>
                <div className={`text-4xl font-bold mb-2 ${
                  settings.enabled ? 'text-red-600' : 'text-green-600'
                }`}>
                  {settings.enabled ? 'MAINTENANCE ON' : 'SITE LIVE'}
                </div>
                <p className={`text-sm ${
                  settings.enabled ? 'text-red-500' : 'text-green-500'
                }`}>
                  {settings.enabled 
                    ? 'Website is showing maintenance page to visitors' 
                    : 'Website is accessible to all visitors'}
                </p>
              </div>

              <Button
                onClick={toggleMaintenance}
                disabled={saving}
                size="lg"
                className={`w-full ${
                  settings.enabled 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Power className="w-5 h-5 mr-2" />
                )}
                {settings.enabled ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
              </Button>

              {settings.enabled && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-700 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <strong>Warning:</strong> Your website is currently in maintenance mode. 
                    Only admins can access it.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Page Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title
                </label>
                <Input
                  value={settings.title}
                  onChange={(e) => setSettings(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="We'll Be Right Back!"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  value={settings.message}
                  onChange={(e) => setSettings(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="We're currently performing scheduled maintenance..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Expected End Time
                </label>
                <Input
                  type="datetime-local"
                  value={settings.expectedEndTime}
                  onChange={(e) => setSettings(prev => ({ ...prev, expectedEndTime: e.target.value }))}
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showCountdown}
                    onChange={(e) => setSettings(prev => ({ ...prev, showCountdown: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Show countdown timer</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowAdminAccess}
                    onChange={(e) => setSettings(prev => ({ ...prev, allowAdminAccess: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Allow admin access during maintenance</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-500" />
              Page Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white text-center">
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-10 h-10 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold">{settings.title || "We'll Be Right Back!"}</h2>
                <p className="text-gray-300">
                  {settings.message || 'We\'re currently performing scheduled maintenance.'}
                </p>
                {settings.expectedEndTime && settings.showCountdown && (
                  <div className="bg-white/10 rounded-lg p-4 inline-block">
                    <p className="text-sm text-gray-400 mb-1">Expected to be back by</p>
                    <p className="text-xl font-semibold">
                      {new Date(settings.expectedEndTime).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
