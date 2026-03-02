'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { coercePageContent } from '@/lib/utils/pageContent'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

interface FormContent {
  formTitle: string
  formSubtitle: string
  successTitle: string
  successMessage: string
  submitButtonText: string
  namePlaceholder: string
  emailPlaceholder: string
  phonePlaceholder: string
  companyPlaceholder: string
  messagePlaceholder: string
}

const defaultContent: FormContent = {
  formTitle: 'Send Us a Message',
  formSubtitle: 'Fill out the form below and we\'ll get back to you within 24 hours.',
  successTitle: 'Message Sent!',
  successMessage: 'Thank you for reaching out. We\'ll be in touch soon.',
  submitButtonText: 'Send Message',
  namePlaceholder: 'John Doe',
  emailPlaceholder: 'john@company.com',
  phonePlaceholder: '+880 1XXX-XXX-XXX',
  companyPlaceholder: 'Your Company',
  messagePlaceholder: 'Tell us about your requirements...',
}

export default function ContactFormEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<FormContent>(defaultContent)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/page-content?page=contact&section=form')
      if (res.ok) {
        const data = await res.json()
        setContent(coercePageContent<FormContent>(data.content, defaultContent))
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
          section: 'form',
          content
        })
      })
      
      if (res.ok) {
        alert('Form settings saved successfully!')
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
              <h1 className="text-2xl font-bold text-gray-900">Form Settings</h1>
              <p className="text-gray-600">Customize contact form text and messages</p>
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

        {/* Form Header */}
        <Card>
          <CardHeader>
            <CardTitle>Form Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Title
              </label>
              <Input
                value={content.formTitle}
                onChange={(e) => setContent({ ...content, formTitle: e.target.value })}
                placeholder="Send Us a Message"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Subtitle
              </label>
              <Textarea
                value={content.formSubtitle}
                onChange={(e) => setContent({ ...content, formSubtitle: e.target.value })}
                rows={2}
                placeholder="Fill out the form below..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        <Card>
          <CardHeader>
            <CardTitle>Success Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Success Title
              </label>
              <Input
                value={content.successTitle}
                onChange={(e) => setContent({ ...content, successTitle: e.target.value })}
                placeholder="Message Sent!"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Success Message
              </label>
              <Textarea
                value={content.successMessage}
                onChange={(e) => setContent({ ...content, successMessage: e.target.value })}
                rows={2}
                placeholder="Thank you for reaching out..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Fields */}
        <Card>
          <CardHeader>
            <CardTitle>Field Placeholders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name Field Placeholder
                </label>
                <Input
                  value={content.namePlaceholder}
                  onChange={(e) => setContent({ ...content, namePlaceholder: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Field Placeholder
                </label>
                <Input
                  value={content.emailPlaceholder}
                  onChange={(e) => setContent({ ...content, emailPlaceholder: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Field Placeholder
                </label>
                <Input
                  value={content.phonePlaceholder}
                  onChange={(e) => setContent({ ...content, phonePlaceholder: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Field Placeholder
                </label>
                <Input
                  value={content.companyPlaceholder}
                  onChange={(e) => setContent({ ...content, companyPlaceholder: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Field Placeholder
              </label>
              <Input
                value={content.messagePlaceholder}
                onChange={(e) => setContent({ ...content, messagePlaceholder: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Button */}
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Submit Button Text
              </label>
              <Input
                value={content.submitButtonText}
                onChange={(e) => setContent({ ...content, submitButtonText: e.target.value })}
                placeholder="Send Message"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
