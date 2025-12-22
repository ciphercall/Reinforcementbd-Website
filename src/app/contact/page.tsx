import { Metadata } from 'next'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/sections/ContactForm'
import { getPageContents } from '@/lib/pageContent'
import { coercePageContent } from '@/lib/utils/pageContent'
import { MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Reinforcement Group. We\'re here to help with your business needs.',
}

export const dynamic = 'force-dynamic'

interface ContactHeaderContent {
  title: string
  subtitle: string
  breadcrumbLabel: string
  backgroundImage: string
}

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

interface HoursContent {
  title: string
  subtitle: string
  regularHours: { day: string; hours: string }[]
  specialNotes: string
  timezone: string
}

interface ServicesContent {
  services: string[]
}

const defaultHeader: ContactHeaderContent = {
  title: 'Let\'s Work Together',
  subtitle: 'Ready to start your project or have questions about our services? Let\'s explore how Reinforcement Group can help transform your vision into reality.',
  breadcrumbLabel: 'Contact',
  backgroundImage: '/images/contact-hero.jpg',
}

const defaultInfo: ContactInfoContent = {
  address: {
    line1: '5th floor, ka-81/4B, Kha-Para',
    line2: 'Khilkhet',
    city: 'Dhaka-1229',
    country: 'Bangladesh'
  },
  phone: {
    primary: '+88 013 26 24 95 85',
    secondary: ''
  },
  email: {
    primary: 'info@ragrpbd.com',
    support: 'support@ragrpbd.com'
  },
  map: {
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5751968750894!2d90.40095731498209!3d23.79454768457068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7002c2c5c73%3A0x9e8a3a7e5f5e2b95!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1637834234765!5m2!1sen!2sbd',
    latitude: '23.8321',
    longitude: '90.4199'
  },
  social: {
    facebook: '',
    linkedin: '',
    twitter: ''
  }
}

const defaultHours: HoursContent = {
  title: 'Working Hours',
  subtitle: 'We\'re here to help during business hours',
  regularHours: [
    { day: 'Saturday - Thursday', hours: '9:00 AM - 6:00 PM' }
  ],
  specialNotes: '',
  timezone: 'Bangladesh Standard Time (BST/UTC+6)'
}

const defaultServices: ServicesContent = {
  services: [
    'Electrical & Automation',
    'Factory Automation',
    'Architectural Design',
    '3D Modeling & Visualization',
    'Web Development',
    'Mobile App Development',
    'AI & Machine Learning',
    'Other'
  ]
}

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
  callToActionText: string
  callToActionDescription: string
}

const defaultForm: FormContent = {
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
  callToActionText: 'Schedule a Discovery Call',
  callToActionDescription: 'Prefer to talk? Schedule a 30-minute discovery call with our team to discuss your requirements and how we can help.'
}

function normalizeContactInfo(input: unknown): ContactInfoContent {
  const partial = coercePageContent<Partial<ContactInfoContent>>(input, {})

  return {
    ...defaultInfo,
    ...partial,
    address: {
      ...defaultInfo.address,
      ...(partial.address ?? {})
    },
    phone: {
      ...defaultInfo.phone,
      ...(partial.phone ?? {})
    },
    email: {
      ...defaultInfo.email,
      ...(partial.email ?? {})
    },
    map: {
      ...defaultInfo.map,
      ...(partial.map ?? {})
    },
    social: {
      ...defaultInfo.social,
      ...(partial.social ?? {})
    }
  }
}

export default async function ContactPage() {
  const cms = await getPageContents('contact', ['header', 'info', 'hours', 'services', 'form'])
  const header = coercePageContent<ContactHeaderContent>(cms['header'], defaultHeader)
  const info = normalizeContactInfo(cms['info'])
  const hours = coercePageContent<HoursContent>(cms['hours'], defaultHours)
  const servicesContent = coercePageContent<ServicesContent>(cms['services'], defaultServices)
  const formContent = coercePageContent<FormContent>(cms['form'], defaultForm)

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [
        info.address.line1,
        info.address.line2 ? `${info.address.line2}, ${info.address.city}` : info.address.city,
        info.address.country
      ].filter(Boolean)
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [info.phone.primary, info.phone.secondary].filter(Boolean)
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [info.email.primary, info.email.support].filter(Boolean)
    },
    {
      icon: Clock,
      title: hours.title || 'Working Hours',
      details: hours.regularHours.map(h => `${h.day}: ${h.hours}`)
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
        {header.backgroundImage ? (
          <div className="absolute inset-0 opacity-10">
            <Image
              src={header.backgroundImage}
              alt="Contact background"
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : null}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {header.title}
            </h1>
            <p className="text-xl text-gray-600">
              {header.subtitle}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{formContent.formTitle}</h2>
            <p className="text-gray-600 mb-8">
              {formContent.formSubtitle}
            </p>

            <ContactForm services={servicesContent.services} formContent={formContent} />
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
                  <h3 className="text-xl font-semibold">{formContent.callToActionText}</h3>
                  <p className="text-sm text-white/80">Let&apos;s discuss your needs</p>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600">
                  {formContent.callToActionDescription}
                </p>
                <a href={`tel:${info.phone.primary?.replace(/\s/g, '') || ''}`}>
                  <Button variant="primary" size="lg" className="w-full">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book a Call
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Map */}
            {info.map?.embedUrl ? (
              <Card className="overflow-hidden">
                <div className="relative h-64 bg-gray-200">
                  <iframe
                    src={info.map.embedUrl}
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
                    {[info.address.line1, info.address.line2, info.address.city, info.address.country]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  )
}
