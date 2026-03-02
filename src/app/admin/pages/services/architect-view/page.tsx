'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { coercePageContent } from '@/lib/utils/pageContent'
import { ImagePicker } from '@/components/admin/ImagePicker'
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from 'lucide-react'

type Stat = { value: string; label: string }

type ImageItem = { src: string; alt: string }

type ServiceCard = {
  title: string
  description: string
  icon: string
  features: string[]
}

type Benefit = { title: string; desc: string }

type HeroContent = {
  logo: string
  title: string
  description: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  heroImages: ImageItem[]
}

type PortfolioContent = {
  title: string
  subtitle: string
  images: ImageItem[]
}

type WhyContent = {
  title: string
  description: string
  benefits: Benefit[]
  showcaseImages: ImageItem[]
}

type ArchitectViewPageContent = {
  hero: HeroContent
  stats: Stat[]
  servicesHeader: { title: string; subtitle: string }
  services: ServiceCard[]
  portfolio: PortfolioContent
  why: WhyContent
}

const PAGE_KEY = 'services-architect-view'
const SECTION_KEY = 'page'

const defaultContent: ArchitectViewPageContent = {
  hero: {
    logo: '/images/logos/rein-archi.jpg',
    title: 'Architectural Excellence',
    description:
      'Transform your vision into stunning architectural reality. Our team of experienced architects and designers creates spaces that inspire, combining aesthetics with functionality for exceptional results.',
    primaryCtaText: 'Start Your Project',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Our Services',
    secondaryCtaLink: '#services',
    heroImages: [
      { src: '/images/profile/1.jpg', alt: 'Architecture Project 1' },
      { src: '/images/profile/2.jpg', alt: 'Architecture Project 2' },
      { src: '/images/profile/3.jpg', alt: 'Architecture Project 3' },
      { src: '/images/profile/4.jpeg', alt: 'Architecture Project 4' },
    ],
  },
  stats: [
    { value: '100+', label: 'Projects Designed' },
    { value: '50+', label: 'Happy Clients' },
    { value: '15+', label: 'Awards Won' },
    { value: '5+', label: 'Years Experience' },
  ],
  servicesHeader: {
    title: 'Our Architectural Services',
    subtitle: 'Comprehensive design services for every type of project',
  },
  services: [
    {
      title: 'Architectural Design',
      description: 'Complete architectural design services for residential, commercial, and industrial projects.',
      icon: 'Building2',
      features: ['Conceptual Design', 'Design Development', 'Construction Documents', 'Building Permits', 'Site Planning'],
    },
    {
      title: 'Interior Design',
      description: 'Creative interior design solutions that blend aesthetics with functionality.',
      icon: 'Palette',
      features: ['Space Planning', 'Material Selection', 'Furniture Design', 'Lighting Design', 'Color Schemes'],
    },
    {
      title: 'Residential Design',
      description: 'Custom home designs that reflect your lifestyle and preferences.',
      icon: 'Home',
      features: ['Single Family Homes', 'Apartments', 'Villas', 'Renovations', 'Extensions'],
    },
    {
      title: '3D Visualization',
      description: 'Photorealistic 3D renderings to visualize your project before construction.',
      icon: 'Eye',
      features: ['3D Modeling', 'Photorealistic Renders', 'Virtual Tours', 'Animations', 'VR Presentations'],
    },
    {
      title: 'Technical Drawings',
      description: 'Detailed technical drawings and blueprints for construction.',
      icon: 'Ruler',
      features: ['Floor Plans', 'Elevations', 'Sections', 'Details', 'As-Built Drawings'],
    },
    {
      title: 'Landscape Design',
      description: 'Outdoor space design that enhances the beauty and functionality of your property.',
      icon: 'Layers',
      features: ['Garden Design', 'Hardscape Design', 'Planting Plans', 'Irrigation Systems', 'Outdoor Lighting'],
    },
    {
      title: 'Concept Development',
      description: 'Initial concept development and feasibility studies for your projects.',
      icon: 'Lightbulb',
      features: ['Site Analysis', 'Feasibility Studies', 'Concept Sketches', 'Design Options', 'Budget Estimates'],
    },
    {
      title: 'Construction Support',
      description: 'On-site supervision and support during the construction phase.',
      icon: 'PenTool',
      features: ['Site Supervision', 'Quality Control', 'Contractor Coordination', 'Change Orders', 'Final Inspection'],
    },
  ],
  portfolio: {
    title: 'Our Portfolio',
    subtitle: 'A glimpse of our architectural projects',
    images: [
      { src: '/images/profile/1.jpg', alt: 'Architecture Project 1' },
      { src: '/images/profile/2.jpg', alt: 'Architecture Project 2' },
      { src: '/images/profile/3.jpg', alt: 'Architecture Project 3' },
      { src: '/images/profile/4.jpeg', alt: 'Architecture Project 4' },
      { src: '/images/profile/5.jpg', alt: 'Architecture Project 5' },
      { src: '/images/profile/6.jpeg', alt: 'Architecture Project 6' },
      { src: '/images/profile/7.jpg', alt: 'Architecture Project 7' },
      { src: '/images/profile/8.webp', alt: 'Architecture Project 8' },
      { src: '/images/profile/9.jpg', alt: 'Architecture Project 9' },
    ],
  },
  why: {
    title: 'Why Choose Our Architecture Division?',
    description:
      'Our architects combine creative vision with technical expertise to deliver projects that exceed expectations. We focus on sustainable design practices and innovative solutions that stand the test of time.',
    benefits: [
      { title: 'Creative Excellence', desc: 'Award-winning design concepts' },
      { title: 'Sustainable Design', desc: 'Eco-friendly and energy-efficient' },
      { title: 'Client-Focused', desc: 'Your vision, our expertise' },
      { title: 'End-to-End Service', desc: 'From concept to completion' },
    ],
    showcaseImages: [
      { src: '/images/profile/10.jpeg', alt: 'Architecture showcase 10' },
      { src: '/images/profile/11.jpeg', alt: 'Architecture showcase 11' },
      { src: '/images/profile/12.jpeg', alt: 'Architecture showcase 12' },
      { src: '/images/profile/13.jpeg', alt: 'Architecture showcase 13' },
    ],
  },
}

function normalize(input: ArchitectViewPageContent): ArchitectViewPageContent {
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
    portfolio: {
      ...defaultContent.portfolio,
      ...(input.portfolio ?? {}),
      images: Array.isArray(input.portfolio?.images) ? input.portfolio.images : defaultContent.portfolio.images,
    },
    why: {
      ...defaultContent.why,
      ...(input.why ?? {}),
      benefits: Array.isArray(input.why?.benefits) ? input.why.benefits : defaultContent.why.benefits,
      showcaseImages: Array.isArray(input.why?.showcaseImages) ? input.why.showcaseImages : defaultContent.why.showcaseImages,
    },
  }
}

export default function ArchitectViewDivisionEditor() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<ArchitectViewPageContent>(defaultContent)

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
        const coerced = coercePageContent<ArchitectViewPageContent>(data.content, defaultContent)
        setContent(normalize(coerced))
      }
    } catch {
      // defaults
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

      if (res.ok) alert('Architect View page saved successfully!')
      else alert('Failed to save content')
    } catch {
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const heroImages = useMemo(() => content.hero.heroImages ?? [], [content.hero.heroImages])
  const portfolioImages = useMemo(() => content.portfolio.images ?? [], [content.portfolio.images])
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

  if (!session) return null

  return (
    <AdminSidebar>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/admin/pages/services')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Architect View Division Page</h1>
              <p className="text-gray-600">Edits the visitor page at /services/architect-view</p>
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
                <ImagePicker
                  label="Division Logo"
                  value={content.hero.logo}
                  onChange={(path) => setContent((p) => ({ ...p, hero: { ...p.hero, logo: path } }))}
                  placeholder="/images/logos/rein-archi.jpg"
                />
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
                  <Input value={content.hero.primaryCtaLink} onChange={(e) => setContent((p) => ({ ...p, hero: { ...p.hero, primaryCtaLink: e.target.value } }))} placeholder="/contact" />
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
                  <Input value={content.hero.secondaryCtaLink} onChange={(e) => setContent((p) => ({ ...p, hero: { ...p.hero, secondaryCtaLink: e.target.value } }))} placeholder="#services" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Hero Image Grid (4 images)</label>
                <Button type="button" variant="outline" size="sm" onClick={() => setContent((p) => ({ ...p, hero: { ...p.hero, heroImages: [...p.hero.heroImages, { src: '', alt: '' }] } }))}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-3">
                {heroImages.map((img, index) => {
                  const key = `hero-${index}`
                  return (
                    <div key={key} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                      <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <ImagePicker
                          label=""
                          value={img.src}
                          onChange={(path) => {
                            setContent((p) => {
                              const next = [...p.hero.heroImages]
                              next[index] = { ...next[index], src: path }
                              return { ...p, hero: { ...p.hero, heroImages: next } }
                            })
                          }}
                          placeholder="/images/... or /uploads/..."
                        />
                        <Button type="button" variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setContent((p) => ({ ...p, hero: { ...p.hero, heroImages: p.hero.heroImages.filter((_, i) => i !== index) } }))}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        value={img.alt}
                        onChange={(e) => {
                          const alt = e.target.value
                          setContent((p) => {
                            const next = [...p.hero.heroImages]
                            next[index] = { ...next[index], alt }
                            return { ...p, hero: { ...p.hero, heroImages: next } }
                          })
                        }}
                        placeholder="Alt text"
                      />
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
                services: [...p.services, { title: 'New Service', description: '', icon: 'Building2', features: [] }],
              }))}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {content.services.map((service, index) => (
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
                          })} placeholder="Building2, Palette, Home, Eye..." />
                          <p className="text-xs text-gray-500 mt-1">Uses Lucide icon names.</p>
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
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input value={content.portfolio.title} onChange={(e) => setContent((p) => ({ ...p, portfolio: { ...p.portfolio, title: e.target.value } }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Input value={content.portfolio.subtitle} onChange={(e) => setContent((p) => ({ ...p, portfolio: { ...p.portfolio, subtitle: e.target.value } }))} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Portfolio Images</label>
                <Button type="button" variant="outline" size="sm" onClick={() => setContent((p) => ({ ...p, portfolio: { ...p.portfolio, images: [...p.portfolio.images, { src: '', alt: '' }] } }))}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-3">
                {portfolioImages.map((img, index) => {
                  const key = `portfolio-${index}`
                  return (
                    <div key={key} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                      <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <ImagePicker
                          label=""
                          value={img.src}
                          onChange={(path) => setContent((p) => {
                            const next = [...p.portfolio.images]
                            next[index] = { ...next[index], src: path }
                            return { ...p, portfolio: { ...p.portfolio, images: next } }
                          })}
                          placeholder="/images/... or /uploads/..."
                        />
                        <Button type="button" variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setContent((p) => ({ ...p, portfolio: { ...p.portfolio, images: p.portfolio.images.filter((_, i) => i !== index) } }))}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input value={img.alt} onChange={(e) => setContent((p) => {
                        const next = [...p.portfolio.images]
                        next[index] = { ...next[index], alt: e.target.value }
                        return { ...p, portfolio: { ...p.portfolio, images: next } }
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
                <label className="block text-sm font-medium text-gray-700">Showcase Images (2x2)</label>
                <Button type="button" variant="outline" size="sm" onClick={() => setContent((p) => ({ ...p, why: { ...p.why, showcaseImages: [...p.why.showcaseImages, { src: '', alt: '' }] } }))}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-3">
                {showcaseImages.map((img, index) => {
                  const key = `showcase-${index}`
                  return (
                    <div key={key} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                      <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <ImagePicker
                          label=""
                          value={img.src}
                          onChange={(path) => setContent((p) => {
                            const next = [...p.why.showcaseImages]
                            next[index] = { ...next[index], src: path }
                            return { ...p, why: { ...p.why, showcaseImages: next } }
                          })}
                          placeholder="/images/... or /uploads/..."
                        />
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
