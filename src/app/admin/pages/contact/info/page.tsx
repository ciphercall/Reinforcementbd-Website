'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

interface ContactInfoContent {
  address: {
    line1: string
    line2: string
    city: string
    country: string
  }
  phone: {
    primary: string
    secondary: string
  }
  email: {
    primary: string
    support: string
  }
  map: {
    embedUrl: string
    latitude: string
    longitude: string
  }
  social: {
    facebook: string
    linkedin: string
    twitter: string
  }
}

export default function ContactInfoEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<ContactInfoContent>({
    address: {
      line1: 'House 123, Road 12',
      line2: 'Block C, Banani',
      city: 'Dhaka 1213',
      country: 'Bangladesh'
    },
    phone: {
      primary: '+880 1XXX-XXXXXX',
      secondary: '+880 2-XXXXXXX'
    },
    email: {
      primary: 'info@marshgroupbd.com',
      support: 'support@marshgroupbd.com'
    },
    map: {
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3...',
      latitude: '23.7934',
      longitude: '90.4043'
    },
    social: {
      facebook: 'https://facebook.com/marshgroupbd',
      linkedin: 'https://linkedin.com/company/marshgroupbd',
      twitter: 'https://twitter.com/marshgroupbd'
    }
  })

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=contact&section=info')
      if (res.ok) {
        const data = await res.json()
        if (data.content) {
          setContent(data.content)
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'contact',
          section: 'info',
          content
        })
      })
      
      if (res.ok) {
        alert('Contact info saved successfully!')
      } else {
        alert('Failed to save content')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminSidebar>
    )
  }

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/admin/pages/contact')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Information</h1>
              <p className="text-gray-600">Edit address, phone, email, and location</p>
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

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Office Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 1
                </label>
                <input
                  type="text"
                  value={content.address.line1}
                  onChange={(e) => setContent({ 
                    ...content, 
                    address: { ...content.address, line1: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={content.address.line2}
                  onChange={(e) => setContent({ 
                    ...content, 
                    address: { ...content.address, line2: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City & ZIP
                </label>
                <input
                  type="text"
                  value={content.address.city}
                  onChange={(e) => setContent({ 
                    ...content, 
                    address: { ...content.address, city: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={content.address.country}
                  onChange={(e) => setContent({ 
                    ...content, 
                    address: { ...content.address, country: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phone & Email */}
        <Card>
          <CardHeader>
            <CardTitle>Phone & Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Phone
                </label>
                <input
                  type="text"
                  value={content.phone.primary}
                  onChange={(e) => setContent({ 
                    ...content, 
                    phone: { ...content.phone, primary: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Phone
                </label>
                <input
                  type="text"
                  value={content.phone.secondary}
                  onChange={(e) => setContent({ 
                    ...content, 
                    phone: { ...content.phone, secondary: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Email
                </label>
                <input
                  type="email"
                  value={content.email.primary}
                  onChange={(e) => setContent({ 
                    ...content, 
                    email: { ...content.email, primary: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={content.email.support}
                  onChange={(e) => setContent({ 
                    ...content, 
                    email: { ...content.email, support: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card>
          <CardHeader>
            <CardTitle>Map Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps Embed URL
              </label>
              <input
                type="text"
                value={content.map.embedUrl}
                onChange={(e) => setContent({ 
                  ...content, 
                  map: { ...content.map, embedUrl: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Get embed URL from Google Maps: Share → Embed a map → Copy HTML → Extract src URL
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="text"
                  value={content.map.latitude}
                  onChange={(e) => setContent({ 
                    ...content, 
                    map: { ...content.map, latitude: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="text"
                  value={content.map.longitude}
                  onChange={(e) => setContent({ 
                    ...content, 
                    map: { ...content.map, longitude: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={content.social.facebook}
                  onChange={(e) => setContent({ 
                    ...content, 
                    social: { ...content.social, facebook: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={content.social.linkedin}
                  onChange={(e) => setContent({ 
                    ...content, 
                    social: { ...content.social, linkedin: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  value={content.social.twitter}
                  onChange={(e) => setContent({ 
                    ...content, 
                    social: { ...content.social, twitter: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
