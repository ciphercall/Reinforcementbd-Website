'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Send } from 'lucide-react'

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

interface ContactFormProps {
  services: string[]
  formContent: FormContent
}

export function ContactForm({ services, formContent }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{formContent.successTitle}</h3>
          <p className="text-gray-600 mb-4">
            {formContent.successMessage}
          </p>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Your Name *"
          placeholder={formContent.namePlaceholder}
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder={formContent.emailPlaceholder}
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          type="tel"
          placeholder={formContent.phonePlaceholder}
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        <Input
          label="Company Name"
          placeholder={formContent.companyPlaceholder}
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service You&apos;re Interested In
        </label>
        <select
          className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.service}
          onChange={(e) => setFormData({...formData, service: e.target.value})}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </div>
      <Textarea
        label="Your Message *"
        placeholder={formContent.messagePlaceholder}
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
      />
      <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
        <Send className="w-5 h-5 mr-2" />
        {formContent.submitButtonText}
      </Button>
    </form>
  )
}
