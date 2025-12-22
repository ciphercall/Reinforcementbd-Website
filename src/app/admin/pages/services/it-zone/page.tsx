'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ImagePicker } from '@/components/admin/ImagePicker'
import { coercePageContent } from '@/lib/utils/pageContent'
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from 'lucide-react'

type Stat = { value: string; label: string }

type ImageItem = { src: string; alt: string }

type ServiceCard = {
  title: string
  description: string
  icon: string
  image: string
  features: string[]
}

type Benefit = { title: string; desc: string }

type HeroContent = {
  badgeText: string
  title: string
  description: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  heroImages: ImageItem[]
}

type WhyContent = {
  title: string
  description: string
  benefits: Benefit[]
  showcaseImages: ImageItem[]
}

type ITZonePageContent = {
  hero: HeroContent
  stats: Stat[]
  servicesHeader: { title: string; subtitle: string }
  services: ServiceCard[]
  why: WhyContent
}

const PAGE_KEY = 'services-it-zone'
const SECTION_KEY = 'page'

const defaultContent: ITZonePageContent = {
  hero: {
    badgeText: 'IT Zone Division',
    title: 'Complete IT Solutions',
    description:
      'From network infrastructure to custom software development, we provide end-to-end IT solutions that empower your business with technology. Our expert team ensures your IT systems run efficiently and securely.',
    primaryCtaText: 'Get Started',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Our Services',
    secondaryCtaLink: '#services',
    heroImages: [
      { src: '/images/it/I1-removebg-preview.png', alt: 'IT Service 1' },
      { src: '/images/it/I2-removebg-preview.png', alt: 'IT Service 2' },
      { src: '/images/it/I3-removebg-preview.png', alt: 'IT Service 3' },
      { src: '/images/it/I4-removebg-preview.png', alt: 'IT Service 4' },
    ],
  },
  stats: [
    { value: '200+', label: 'IT Projects' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '30+', label: 'Enterprise Clients' },
    { value: '24/7', label: 'Technical Support' },
  ],
  servicesHeader: {
    title: 'Our IT Services',
    subtitle: 'Comprehensive technology solutions for modern businesses',
  },
  services: [
    {
      title: 'Network Infrastructure',
      description: 'Design, implementation, and management of enterprise network infrastructure.',
      icon: 'Network',
      image: '/images/it/I1-removebg-preview.png',
      features: ['LAN/WAN Setup', 'Network Security', 'VPN Configuration', 'Bandwidth Management', 'Network Monitoring'],
    },
    {
      title: 'Software Development',
      description: 'Custom software solutions tailored to your business requirements.',
      icon: 'Code',
      image: '/images/it/I2-removebg-preview.png',
      features: ['Web Applications', 'Mobile Apps', 'Enterprise Software', 'API Development', 'System Integration'],
    },
    {
      title: 'Cloud Services',
      description: 'Cloud migration, management, and optimization for scalable operations.',
      icon: 'Cloud',
      image: '/images/it/I3-removebg-preview.png',
      features: ['Cloud Migration', 'AWS/Azure/GCP', 'Cloud Security', 'Cost Optimization', 'Hybrid Solutions'],
    },
    {
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets.',
      icon: 'Shield',
      image: '/images/it/I4-removebg-preview.png',
      features: ['Security Audits', 'Firewall Setup', 'Threat Detection', 'Incident Response', 'Compliance'],
    },
    {
      title: 'Database Management',
      description: 'Database design, optimization, and administration services.',
      icon: 'Database',
      image: '/images/it/I5-removebg-preview.png',
      features: ['Database Design', 'Performance Tuning', 'Backup & Recovery', 'Data Migration', 'SQL/NoSQL'],
    },
    {
      title: 'Server Management',
      description: 'Server installation, configuration, and 24/7 monitoring services.',
      icon: 'Server',
      image: '/images/it/I6.png',
      features: ['Server Setup', 'Virtualization', 'Load Balancing', 'Disaster Recovery', '24/7 Monitoring'],
    },
    {
      title: 'IT Support & Helpdesk',
      description: 'Reliable IT support services for seamless business operations.',
      icon: 'Monitor',
      image: '/images/it/I7.png',
      features: ['Remote Support', 'On-site Support', 'Helpdesk Services', 'System Maintenance', 'User Training'],
    },
    {
      title: 'Wireless Solutions',
      description: 'Enterprise wireless network design and implementation.',
      icon: 'Wifi',
      image: '/images/it/I8-removebg-preview.png',
      features: ['WiFi Design', 'Access Points', 'Site Surveys', 'Guest Networks', 'WiFi Security'],
    },
  ],
  why: {
    title: 'Why Choose Our IT Division?',
    description:
      'We combine technical expertise with industry knowledge to deliver IT solutions that drive real business value. Our certified team stays current with the latest technologies to keep you ahead.',
    benefits: [
      { title: 'Certified Professionals', desc: 'Microsoft, Cisco, AWS certified team' },
      { title: 'Proactive Monitoring', desc: '24/7 system monitoring & alerts' },
      { title: 'Scalable Solutions', desc: 'Solutions that grow with your business' },
      { title: 'Local Support', desc: 'On-site support across Bangladesh' },
    ],
    showcaseImages: [
      { src: '/images/it/I9-removebg-preview.png', alt: 'IT showcase 1' },
      { src: '/images/it/I10-removebg-preview.png', alt: 'IT showcase 2' },
      { src: '/images/it/I11-removebg-preview.png', alt: 'IT showcase 3' },
      { src: '/images/it/I12-removebg-preview.png', alt: 'IT showcase 4' },
      { src: '/images/it/I13-removebg-preview.png', alt: 'IT showcase 5' },
      { src: '/images/it/I14-removebg-preview.png', alt: 'IT showcase 6' },
    ],
  },
}

function normalize(input: ITZonePageContent): ITZonePageContent {
  return {
    hero: {
      ...defaultContent.hero,
      ...(input.hero ?? {}),
      heroImages: Array.isArray(input.hero?.heroImages) ? input.hero.heroImages : defaultContent.hero.heroImages,
    },
    stats: Array.isArray(input.stats) ? input.stats : defaultContent.stats,
    servicesHeader: {
      ...defaultContent.servicesHeader,
      ...(input.servicesHeader ?? {}),
    },
    services: Array.isArray(input.services) ? input.services : defaultContent.services,
    why: {
      ...defaultContent.why,
      ...(input.why ?? {}),
      benefits: Array.isArray(input.why?.benefits) ? input.why.benefits : defaultContent.why.benefits,
      showcaseImages: Array.isArray(input.why?.showcaseImages) ? input.why.showcaseImages : defaultContent.why.showcaseImages,
    },
  }
}

export default function ITZoneDivisionEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<ITZonePageContent>(defaultContent)

  useEffect(() => {
    if (status === 'authenticated') void fetchContent()
    if (status === 'unauthenticated') router.push('/admin/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/page-content?page=${encodeURIComponent(PAGE_KEY)}&section=${encodeURIComponent(SECTION_KEY)}`)
      if (res.ok) {
        const data = await res.json()
        const coerced = coercePageContent<ITZonePageContent>(data.content, defaultContent)
        setContent(normalize(coerced))
      }
    } catch {
      // keep defaults
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
        body: JSON.stringify({ page: PAGE_KEY, section: SECTION_KEY, content }),
      })

      if (res.ok) alert('IT Zone page saved successfully!')
      else alert('Failed to save content')
    } catch {
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const heroImages = useMemo(() => content.hero.heroImages ?? [], [content.hero.heroImages])
  const showcaseImages = useMemo(() => content.why.showcaseImages ?? [], [content.why.showcaseImages])

  if (status === 'loading' || loading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminSidebar>
    )
  }

  if (status !== 'authenticated' || !session) return null

  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/admin/pages/services')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">IT Zone Division Page</h1>
              <p className="text-gray-600">Edits the visitor page at /services/it-zone</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                <Input value={content.hero.badgeText} onChange={(e) => setContent((p) => ({ ...p, hero: { ...p.hero, badgeText: e.target.value } }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input value={content.hero.title} onChange={(e) => setContent((p) => ({ ...p, hero: { ...p.hero, title: e.target.value } }))} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea rows={4} value={content.hero.description} onChange={(e) => setContent((p) => ({ ...p, hero: { ...p.hero, description: e.target.value } }))} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 space-y-3">
                <div className="font-semibold text-gray-900">Primary CTA</div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Text</label>
                  <Input value={content.hero.primaryCtaText} onChange={(e) => setContent((p) => ({ ...p, hero: { ...p.hero, primaryCtaText: e.target.value } }))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Link</label>
                  <Input value={content.hero.primaryCtaLink} onChange={(e) => setContent((p) => ({ ...p, hero: { ...p.hero, primaryCtaLink: e.target.value } }))} />
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <div className="font-semibold text-gray-900">Secondary CTA</div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Text</label>
                  <Input value={content.hero.secondaryCtaText} onChange={(e) => setContent((p) => ({ ...p, hero: { ...p.hero, secondaryCtaText: e.target.value } }))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Link</label>
                  <Input value={content.hero.secondaryCtaLink} onChange={(e) => setContent((p) => ({ ...p, hero: { ...p.hero, secondaryCtaLink: e.target.value } }))} />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Hero Image Grid</label>
                <Button type="button" variant="outline" size="sm" onClick={() => setContent((p) => ({ ...p, hero: { ...p.hero, heroImages: [...p.hero.heroImages, { src: '', alt: '' }] } }))}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-3">
                {heroImages.map((img, index) => {
                  const key = `hero-${index}`
                  return (
                    <div key={key} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <ImagePicker
                            label="Image"
                            value={img.src}
                            onChange={(path) => setContent((p) => {
                              const next = [...p.hero.heroImages]
                              next[index] = { ...next[index], src: path }
                              return { ...p, hero: { ...p.hero, heroImages: next } }
                            })}
                            placeholder="Select hero image..."
                          />
                        </div>
                        <Button type="button" variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setContent((p) => ({ ...p, hero: { ...p.hero, heroImages: p.hero.heroImages.filter((_, i) => i !== index) } }))}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input value={img.alt} onChange={(e) => setContent((p) => {
                        const next = [...p.hero.heroImages]
                        next[index] = { ...next[index], alt: e.target.value }
                        return { ...p, hero: { ...p.hero, heroImages: next } }
                      })} placeholder="Alt text" />
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Stats</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => setContent((p) => ({ ...p, stats: [...p.stats, { value: '', label: '' }] }))}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {content.stats.map((stat, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Value</label>
                      <Input value={stat.value} onChange={(e) => setContent((p) => {
                        const stats = [...p.stats]
                        stats[index] = { ...stats[index], value: e.target.value }
                        return { ...p, stats }
                      })} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                      <Input value={stat.label} onChange={(e) => setContent((p) => {
                        const stats = [...p.stats]
                        stats[index] = { ...stats[index], label: e.target.value }
                        return { ...p, stats }
                      })} />
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button type="button" variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setContent((p) => ({ ...p, stats: p.stats.filter((_, i) => i !== index) }))}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services Section Header</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <Input value={content.servicesHeader.title} onChange={(e) => setContent((p) => ({ ...p, servicesHeader: { ...p.servicesHeader, title: e.target.value } }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <Input value={content.servicesHeader.subtitle} onChange={(e) => setContent((p) => ({ ...p, servicesHeader: { ...p.servicesHeader, subtitle: e.target.value } }))} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Service Cards</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => setContent((p) => ({
                ...p,
                services: [...p.services, { title: 'New Service', description: '', icon: 'Monitor', image: '', features: [] }],
              }))}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {content.services.map((service, index) => {
                const uploadId = `it-service-upload-${index}`
                const key = `service-image-${index}`
                return (
                  <div key={`${service.title}-${index}`} className="border rounded-lg p-4 bg-gray-50 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <Input value={service.title} onChange={(e) => setContent((p) => {
                              const services = [...p.services]
                              services[index] = { ...services[index], title: e.target.value }
                              return { ...p, services }
                            })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Icon Name</label>
                            <Input value={service.icon} onChange={(e) => setContent((p) => {
                              const services = [...p.services]
                              services[index] = { ...services[index], icon: e.target.value }
                              return { ...p, services }
                            })} placeholder="Network, Code, Cloud, Shield..." />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <Textarea rows={3} value={service.description} onChange={(e) => setContent((p) => {
                            const services = [...p.services]
                            services[index] = { ...services[index], description: e.target.value }
                            return { ...p, services }
                          })} />
                        </div>

                        <div className="border rounded-lg p-3 bg-white">
                          <ImagePicker
                            label="Service Image"
                            value={service.image}
                            onChange={(path) => setContent((p) => {
                              const services = [...p.services]
                              services[index] = { ...services[index], image: path }
                              return { ...p, services }
                            })}
                            placeholder="Select service image..."
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">Features</label>
                            <Button type="button" variant="outline" size="sm" onClick={() => setContent((p) => {
                              const services = [...p.services]
                              const features = [...(services[index].features ?? []), '']
                              services[index] = { ...services[index], features }
                              return { ...p, services }
                            })}>
                              <Plus className="w-4 h-4 mr-1" /> Add
                            </Button>
                          </div>

                          <div className="space-y-2">
                            {(service.features ?? []).map((feature, fi) => (
                              <div key={`${index}-${fi}`} className="flex gap-2">
                                <Input value={feature} onChange={(e) => setContent((p) => {
                                  const services = [...p.services]
                                  const features = [...(services[index].features ?? [])]
                                  features[fi] = e.target.value
                                  services[index] = { ...services[index], features }
                                  return { ...p, services }
                                })} placeholder={`Feature ${fi + 1}`} />
                                <Button type="button" variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setContent((p) => {
                                  const services = [...p.services]
                                  const features = (services[index].features ?? []).filter((_, i) => i !== fi)
                                  services[index] = { ...services[index], features }
                                  return { ...p, services }
                                })}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button type="button" variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setContent((p) => ({ ...p, services: p.services.filter((_, i) => i !== index) }))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Choose Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <Input value={content.why.title} onChange={(e) => setContent((p) => ({ ...p, why: { ...p.why, title: e.target.value } }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea rows={4} value={content.why.description} onChange={(e) => setContent((p) => ({ ...p, why: { ...p.why, description: e.target.value } }))} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Benefits</label>
                <Button type="button" variant="outline" size="sm" onClick={() => setContent((p) => ({ ...p, why: { ...p.why, benefits: [...p.why.benefits, { title: '', desc: '' }] } }))}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              <div className="space-y-3">
                {content.why.benefits.map((b, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                        <Input value={b.title} onChange={(e) => setContent((p) => {
                          const benefits = [...p.why.benefits]
                          benefits[index] = { ...benefits[index], title: e.target.value }
                          return { ...p, why: { ...p.why, benefits } }
                        })} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                        <Input value={b.desc} onChange={(e) => setContent((p) => {
                          const benefits = [...p.why.benefits]
                          benefits[index] = { ...benefits[index], desc: e.target.value }
                          return { ...p, why: { ...p.why, benefits } }
                        })} />
                      </div>
                    </div>
                    <div className="flex justify-end mt-3">
                      <Button type="button" variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setContent((p) => ({ ...p, why: { ...p.why, benefits: p.why.benefits.filter((_, i) => i !== index) } }))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Showcase Images</label>
                <Button type="button" variant="outline" size="sm" onClick={() => setContent((p) => ({ ...p, why: { ...p.why, showcaseImages: [...p.why.showcaseImages, { src: '', alt: '' }] } }))}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-3">
                {showcaseImages.map((img, index) => {
                  const key = `showcase-${index}`
                  return (
                    <div key={key} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <ImagePicker
                            label="Image"
                            value={img.src}
                            onChange={(path) => setContent((p) => {
                              const next = [...p.why.showcaseImages]
                              next[index] = { ...next[index], src: path }
                              return { ...p, why: { ...p.why, showcaseImages: next } }
                            })}
                            placeholder="Select showcase image..."
                          />
                        </div>
                        <Button type="button" variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setContent((p) => ({ ...p, why: { ...p.why, showcaseImages: p.why.showcaseImages.filter((_, i) => i !== index) } }))}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input value={img.alt} onChange={(e) => setContent((p) => {
                        const next = [...p.why.showcaseImages]
                        next[index] = { ...next[index], alt: e.target.value }
                        return { ...p, why: { ...p.why, showcaseImages: next } }
                      })} placeholder="Alt text" />
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
