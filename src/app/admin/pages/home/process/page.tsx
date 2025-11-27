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
import { ArrowLeft, Save, Eye, Plus, Trash2 } from 'lucide-react'

interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
}

interface ProcessContent {
  sectionTitle: string
  sectionSubtitle: string
  steps: ProcessStep[]
}

const defaultContent: ProcessContent = {
  sectionTitle: 'How We Work',
  sectionSubtitle: 'Our proven process ensures successful outcomes for every project',
  steps: [
    { id: '1', number: '01', title: 'Discovery', description: 'We understand your business needs, challenges, and goals through comprehensive consultation' },
    { id: '2', number: '02', title: 'Planning', description: 'We develop a tailored strategy and roadmap aligned with your objectives' },
    { id: '3', number: '03', title: 'Implementation', description: 'Our expert team executes the plan with precision and attention to detail' },
    { id: '4', number: '04', title: 'Optimization', description: 'We continuously monitor, measure, and improve for maximum results' },
  ]
}

export default function ProcessSectionEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<ProcessContent>(defaultContent)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      fetchContent()
    }
  }, [status])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/page-content?section=process&page=home')
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

  const handleChange = (field: keyof ProcessContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }))
    setSuccess('')
  }

  const handleStepChange = (id: string, field: keyof ProcessStep, value: string) => {
    setContent(prev => ({
      ...prev,
      steps: prev.steps.map(s => 
        s.id === id ? { ...s, [field]: value } : s
      )
    }))
    setSuccess('')
  }

  const addStep = () => {
    const nextNum = (content.steps.length + 1).toString().padStart(2, '0')
    setContent(prev => ({
      ...prev,
      steps: [...prev.steps, { 
        id: Date.now().toString(), 
        number: nextNum,
        title: 'New Step', 
        description: 'Step description'
      }]
    }))
  }

  const removeStep = (id: string) => {
    setContent(prev => ({
      ...prev,
      steps: prev.steps.filter(s => s.id !== id)
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
          section: 'process',
          page: 'home',
          content: JSON.stringify(content)
        })
      })

      if (!response.ok) throw new Error('Failed to save')
      setSuccess('Process section saved successfully!')
    } catch {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Process Steps</h1>
              <p className="text-gray-600">Edit the "How We Work" section</p>
            </div>
          </div>
          <Link href="/#process" target="_blank">
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
                  placeholder="How We Work"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subtitle
                </label>
                <Textarea
                  value={content.sectionSubtitle}
                  onChange={(e) => handleChange('sectionSubtitle', e.target.value)}
                  placeholder="Brief description of this section"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Process Steps */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-900">Process Steps</h2>
                <Button type="button" variant="outline" size="sm" onClick={addStep}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>
              
              <div className="space-y-4">
                {content.steps.map((step) => (
                  <div key={step.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Step Number</label>
                            <Input
                              value={step.number}
                              onChange={(e) => handleStepChange(step.id, 'number', e.target.value)}
                              placeholder="01"
                              className="w-20"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Step Title</label>
                            <Input
                              value={step.title}
                              onChange={(e) => handleStepChange(step.id, 'title', e.target.value)}
                              placeholder="Discovery"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Description</label>
                          <Textarea
                            value={step.description}
                            onChange={(e) => handleStepChange(step.id, 'description', e.target.value)}
                            placeholder="Step description"
                            rows={2}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStep(step.id)}
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
