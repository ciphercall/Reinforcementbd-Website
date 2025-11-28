'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Plus, 
  Trash2, 
  GripVertical,
  Image as ImageIcon,
  Eye,
  EyeOff
} from 'lucide-react'

interface CarouselLogo {
  id: string
  src: string
  alt: string
  enabled: boolean
}

interface CarouselSettings {
  title: string
  subtitle: string
  speed: number
  enabled: boolean
  logos: CarouselLogo[]
}

interface CarouselConfig {
  home: CarouselSettings
  automation: CarouselSettings
  itZone: CarouselSettings
  architectView: CarouselSettings
}

const defaultConfig: CarouselConfig = {
  home: {
    title: 'Our Technology Partners',
    subtitle: 'Trusted by leading brands across Automation, IT, and Architecture',
    speed: 35,
    enabled: true,
    logos: Array.from({ length: 8 }, (_, i) => ({
      id: `home-auto-${i + 1}`,
      src: `/images/automation/${i + 1}.png`,
      alt: `Partner ${i + 1}`,
      enabled: true
    }))
  },
  automation: {
    title: 'Our Automation Partners',
    subtitle: 'Working with leading automation and industrial technology brands',
    speed: 25,
    enabled: true,
    logos: Array.from({ length: 17 }, (_, i) => ({
      id: `auto-${i + 1}`,
      src: `/images/automation/${i + 1}.png`,
      alt: `Automation Partner ${i + 1}`,
      enabled: true
    }))
  },
  itZone: {
    title: 'Our IT Partners',
    subtitle: 'Partnering with global technology leaders for innovative solutions',
    speed: 30,
    enabled: true,
    logos: [
      { id: 'it-1', src: '/images/it/I1-removebg-preview.png', alt: 'IT Partner 1', enabled: true },
      { id: 'it-2', src: '/images/it/I2-removebg-preview.png', alt: 'IT Partner 2', enabled: true },
      { id: 'it-3', src: '/images/it/I3-removebg-preview.png', alt: 'IT Partner 3', enabled: true },
      { id: 'it-4', src: '/images/it/I4-removebg-preview.png', alt: 'IT Partner 4', enabled: true },
      { id: 'it-5', src: '/images/it/I5-removebg-preview.png', alt: 'IT Partner 5', enabled: true },
      { id: 'it-6', src: '/images/it/I6.png', alt: 'IT Partner 6', enabled: true },
      { id: 'it-7', src: '/images/it/I7.png', alt: 'IT Partner 7', enabled: true },
      { id: 'it-8', src: '/images/it/I8-removebg-preview.png', alt: 'IT Partner 8', enabled: true },
    ]
  },
  architectView: {
    title: 'Our Architecture Partners',
    subtitle: 'Collaborating with premier architectural and design brands',
    speed: 28,
    enabled: true,
    logos: [
      { id: 'arch-1', src: '/images/it/I16-removebg-preview.png', alt: 'Architecture Partner 1', enabled: true },
      { id: 'arch-2', src: '/images/it/I17-removebg-preview.png', alt: 'Architecture Partner 2', enabled: true },
      { id: 'arch-3', src: '/images/it/I19.png', alt: 'Architecture Partner 3', enabled: true },
      { id: 'arch-4', src: '/images/it/I20-removebg-preview.png', alt: 'Architecture Partner 4', enabled: true },
      { id: 'arch-5', src: '/images/it/I21.png', alt: 'Architecture Partner 5', enabled: true },
    ]
  }
}

type PageKey = keyof CarouselConfig

const pageLabels: Record<PageKey, string> = {
  home: 'Homepage',
  automation: 'Automation Page',
  itZone: 'IT Zone Page',
  architectView: 'Architect View Page'
}

export default function CarouselManagement() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [config, setConfig] = useState<CarouselConfig>(defaultConfig)
  const [activePage, setActivePage] = useState<PageKey>('home')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchConfig()
    }
  }, [status])

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/page-content?page=carousel&section=settings')
      if (res.ok) {
        const data = await res.json()
        if (data.content) {
          setConfig(data.content)
        }
      }
    } catch (error) {
      console.error('Error fetching config:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'carousel',
          section: 'settings',
          content: config
        })
      })
      if (res.ok) {
        setSuccess('Carousel settings saved successfully!')
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

  const updatePageSettings = (key: keyof CarouselSettings, value: unknown) => {
    setConfig(prev => ({
      ...prev,
      [activePage]: {
        ...prev[activePage],
        [key]: value
      }
    }))
  }

  const toggleLogo = (logoId: string) => {
    setConfig(prev => ({
      ...prev,
      [activePage]: {
        ...prev[activePage],
        logos: prev[activePage].logos.map(logo =>
          logo.id === logoId ? { ...logo, enabled: !logo.enabled } : logo
        )
      }
    }))
  }

  const updateLogoAlt = (logoId: string, alt: string) => {
    setConfig(prev => ({
      ...prev,
      [activePage]: {
        ...prev[activePage],
        logos: prev[activePage].logos.map(logo =>
          logo.id === logoId ? { ...logo, alt } : logo
        )
      }
    }))
  }

  const removeLogo = (logoId: string) => {
    setConfig(prev => ({
      ...prev,
      [activePage]: {
        ...prev[activePage],
        logos: prev[activePage].logos.filter(logo => logo.id !== logoId)
      }
    }))
  }

  const addLogo = () => {
    const newLogo: CarouselLogo = {
      id: `${activePage}-new-${Date.now()}`,
      src: '/images/placeholder.png',
      alt: 'New Partner',
      enabled: true
    }
    setConfig(prev => ({
      ...prev,
      [activePage]: {
        ...prev[activePage],
        logos: [...prev[activePage].logos, newLogo]
      }
    }))
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

  const currentSettings = config[activePage]

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
              <h1 className="text-2xl font-bold text-gray-900">Partner Logos Carousel</h1>
              <p className="text-gray-600">Manage carousel logos for each page</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>

        {/* Alerts */}
        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg">{success}</div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
        )}

        {/* Page Tabs */}
        <div className="flex flex-wrap gap-2 border-b pb-4">
          {(Object.keys(pageLabels) as PageKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActivePage(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activePage === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {pageLabels[key]}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Carousel Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enable Carousel
                </label>
                <button
                  onClick={() => updatePageSettings('enabled', !currentSettings.enabled)}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    currentSettings.enabled
                      ? 'bg-green-100 text-green-700 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                  }`}
                >
                  {currentSettings.enabled ? (
                    <>
                      <Eye className="w-5 h-5" />
                      Visible
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-5 h-5" />
                      Hidden
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <Input
                  value={currentSettings.title}
                  onChange={(e) => updatePageSettings('title', e.target.value)}
                  placeholder="Our Partners"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <Input
                  value={currentSettings.subtitle}
                  onChange={(e) => updatePageSettings('subtitle', e.target.value)}
                  placeholder="Trusted by leading brands"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scroll Speed (px/sec)
                </label>
                <Input
                  type="number"
                  value={currentSettings.speed}
                  onChange={(e) => updatePageSettings('speed', parseInt(e.target.value) || 30)}
                  min={10}
                  max={100}
                />
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">
                  <strong>{currentSettings.logos.filter(l => l.enabled).length}</strong> of{' '}
                  <strong>{currentSettings.logos.length}</strong> logos enabled
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Logos Grid */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Partner Logos</CardTitle>
              <Button size="sm" onClick={addLogo}>
                <Plus className="w-4 h-4 mr-1" />
                Add Logo
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentSettings.logos.map((logo) => (
                  <div
                    key={logo.id}
                    className={`relative group rounded-lg border-2 p-3 transition-all ${
                      logo.enabled
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="absolute top-1 left-1 cursor-grab opacity-0 group-hover:opacity-100">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="relative w-full h-20 mb-2">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        className="object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.png'
                        }}
                      />
                    </div>

                    <Input
                      value={logo.alt}
                      onChange={(e) => updateLogoAlt(logo.id, e.target.value)}
                      placeholder="Alt text"
                      className="text-xs mb-2"
                    />

                    <div className="flex gap-1">
                      <button
                        onClick={() => toggleLogo(logo.id)}
                        className={`flex-1 py-1 px-2 rounded text-xs font-medium ${
                          logo.enabled
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {logo.enabled ? 'On' : 'Off'}
                      </button>
                      <button
                        onClick={() => removeLogo(logo.id)}
                        className="py-1 px-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminSidebar>
  )
}
