'use client'

import { useEffect, useState } from 'react'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Layout,
  Newspaper,
  Target,
  Award,
  Users,
  Layers,
  Clock,
  ChevronRight,
  Eye,
  Save
} from 'lucide-react'

const sections = [
  { 
    name: 'Page Header', 
    href: '/admin/pages/about/header', 
    icon: Layout,
    description: 'Hero section with title and introduction'
  },
  { 
    name: 'Company Story', 
    href: '/admin/pages/about/story', 
    icon: Newspaper,
    description: 'About Reinforcement Group - company history, overview, and intro image'
  },
  {
    name: 'Journey Timeline',
    href: '/admin/pages/about/journey',
    icon: Clock,
    description: 'Timeline milestones from founding to today'
  },
  { 
    name: 'Mission & Vision', 
    href: '/admin/pages/about/mission', 
    icon: Target,
    description: 'Company mission, vision, and goals'
  },
  { 
    name: 'Core Values', 
    href: '/admin/pages/about/values', 
    icon: Award,
    description: 'Company core values and principles'
  },
  {
    name: 'Team',
    href: '/admin/pages/about/team',
    icon: Users,
    description: 'Team members shown on the About page'
  },
  {
    name: 'Divisions',
    href: '/admin/pages/about/divisions',
    icon: Layers,
    description: 'Edit the three divisions section'
  },
]

export default function AboutPageAdmin() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [sectionVisibility, setSectionVisibility] = useState({
    header: true,
    story: true,
    journey: true,
    mission: true,
    values: true,
    team: true,
    divisions: true
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchVisibility()
    }
  }, [status])

  const fetchVisibility = async () => {
    try {
      const response = await fetch('/api/settings/about-visibility')
      if (response.ok) {
        const data = await response.json()
        setSectionVisibility(data.visibility)
      }
    } catch {
      console.error('Failed to load section visibility')
    }
  }

  if (status === 'loading') {
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

  const handleVisibilityToggle = (key: string) => {
    setSectionVisibility(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
    setSuccess('')
  }

  const handleSaveVisibility = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/settings/about-visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility: sectionVisibility })
      })

      if (!response.ok) {
        throw new Error('Failed to save section visibility')
      }

      setSuccess('Section visibility settings saved successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const getSectionKey = (sectionName: string): string => {
    const keyMap: Record<string, string> = {
      'Page Header': 'header',
      'Company Story': 'story',
      'Journey Timeline': 'journey',
      'Mission & Vision': 'mission',
      'Core Values': 'values',
      'Team': 'team',
      'Divisions': 'divisions'
    }
    return keyMap[sectionName] || sectionName.toLowerCase()
  }

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Page Sections</h1>
          <p className="text-gray-600">Manage all sections of your About page</p>
        </div>

        {/* Section Visibility */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Section Visibility
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Control which sections appear on the About page
                </p>
              </div>
            </div>
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 mb-4">
                {success}
              </div>
            )}

            <div className="space-y-3 mb-4">
              {sections.map((section) => {
                const key = getSectionKey(section.name)
                return (
                  <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <section.icon className="w-4 h-4 mr-2 text-gray-500" />
                      {section.name}
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={sectionVisibility[key as keyof typeof sectionVisibility]}
                        onChange={() => handleVisibilityToggle(key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 transition-colors"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                    </div>
                  </label>
                )
              })}
            </div>

            <Button
              type="button"
              onClick={handleSaveVisibility}
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Visibility Settings
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Sections Grid */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Section Content</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sections.map((section) => (
              <Link key={section.href} href={section.href}>
                <Card className="h-full hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <section.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {section.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {section.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminSidebar>
  )
}