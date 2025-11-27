'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { MapPin, Phone, Mail, Clock, Send, Calendar } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Sheltech Barnali, House 30, Road 20,', 'Block K, Banani, Dhaka 1213']
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+880 1310 88 66 00']
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@marshgroupbd.com']
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Sunday - Thursday: 9:00 AM - 6:00 PM']
  }
]

const services = [
  'Managed Staffing Service',
  'Sales Force Outsourcing',
  'HR Outsourcing Service',
  'Corporate Training',
  'IT Services & Procurement',
  'Managed Payroll Service',
  'Other'
]

export default function ContactPage() {
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

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Let's Work Together
            </h1>
            <p className="text-xl text-gray-600">
              Ready to build your dream team or optimize your operations? 
              Let's explore how MARSH can bring lasting value to your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <Card key={info.title}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-gray-600">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <Section background="gray">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            {submitted ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll be in touch soon.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Your Name *"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+880 1XXX-XXX-XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <Input
                    label="Company Name"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service You're Interested In
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
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Schedule Call Card */}
          <div className="space-y-8">
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/profile/5.jpg"
                  alt="Schedule a call"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="text-xl font-semibold">Schedule a Discovery Call</h3>
                  <p className="text-sm text-white/80">Let's discuss your needs</p>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600">
                  Prefer to talk? Schedule a 30-minute discovery call with our team 
                  to discuss your requirements and how we can help.
                </p>
                <a href="tel:+8801310886600">
                  <Button variant="primary" size="lg" className="w-full">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book a Call
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="overflow-hidden">
              <div className="relative h-64 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5751968750894!2d90.40095731498209!3d23.79454768457068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7002c2c5c73%3A0x9e8a3a7e5f5e2b95!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1637834234765!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">
                  <MapPin className="w-4 h-4 inline mr-1 text-blue-600" />
                  Sheltech Barnali, House 30, Road 20, Block K, Banani, Dhaka 1213
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
