import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SharedClientsCarouselSection } from '@/components/sections/SharedClientsCarouselSection'
import { CTASection } from '@/components/sections/CTASection'
import { getPageContents } from '@/lib/pageContent'
import { coercePageContent } from '@/lib/utils/pageContent'
import { resolveLucideIcon } from '@/lib/utils/lucideIcon'
import { 
  Monitor,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'IT Zone Division | Reinforcement Group',
  description: 'Complete IT solutions including networking, software development, cloud services, cybersecurity, and IT infrastructure management.',
  keywords: 'IT solutions, networking, software development, cloud computing, cybersecurity, Bangladesh',
}

export const dynamic = 'force-dynamic'

interface Stat {
  value: string
  label: string
}

interface ServiceCard {
  title: string
  description: string
  icon: string
  image: string
  features: string[]
}

interface ImageItem {
  src: string
  alt: string
}

interface Benefit {
  title: string
  desc: string
}

interface HeroContent {
  logo: string
  title: string
  description: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  heroImages: ImageItem[]
}

interface WhyContent {
  title: string
  description: string
  benefits: Benefit[]
  showcaseImages: ImageItem[]
}

interface ITZonePageContent {
  hero: HeroContent
  stats: Stat[]
  servicesHeader: { title: string; subtitle: string }
  services: ServiceCard[]
  why: WhyContent
}
const defaultContent: ITZonePageContent = {
  hero: {
    logo: '/images/logos/rein-it.jpg',
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

export default async function ITZonePage() {
  const cms = await getPageContents('services-it-zone', ['page'])
  const c = coercePageContent<ITZonePageContent>(cms['page'], defaultContent)

  const stats = Array.isArray(c.stats) ? c.stats : defaultContent.stats
  const services = Array.isArray(c.services) ? c.services : defaultContent.services
  const heroImages = Array.isArray(c.hero?.heroImages) ? c.hero.heroImages : defaultContent.hero.heroImages
  const benefits = Array.isArray(c.why?.benefits) ? c.why.benefits : defaultContent.why.benefits
  const showcaseImages = Array.isArray(c.why?.showcaseImages) ? c.why.showcaseImages : defaultContent.why.showcaseImages

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                {c.hero?.title || defaultContent.hero.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {c.hero?.description || defaultContent.hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={c.hero?.primaryCtaLink || defaultContent.hero.primaryCtaLink}>
                  <Button size="lg" className="!bg-blue-600 !text-white hover:!bg-blue-700 flex items-center">
                    {c.hero?.primaryCtaText || defaultContent.hero.primaryCtaText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={c.hero?.secondaryCtaLink || defaultContent.hero.secondaryCtaLink}>
                  <Button size="lg" className="!border-2 !border-blue-600 !text-blue-600 !bg-transparent hover:!bg-blue-50">
                    {c.hero?.secondaryCtaText || defaultContent.hero.secondaryCtaText}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="mb-6 flex justify-start lg:justify-end">
                <Image
                  src={c.hero?.logo || defaultContent.hero.logo}
                  alt="IT Zone Division"
                  width={260}
                  height={80}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {heroImages.slice(0, 4).map((img, i) => (
                  <div key={i} className="bg-white backdrop-blur-sm rounded-xl p-4 shadow-xl">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={200}
                      height={150}
                      className="rounded-lg object-contain w-full h-32"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Section background="gray" id="services">
        <SectionHeader
          title={c.servicesHeader?.title || defaultContent.servicesHeader.title}
          subtitle={c.servicesHeader?.subtitle || defaultContent.servicesHeader.subtitle}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
                {service.image && (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    {(() => {
                      const Icon = resolveLucideIcon(service.icon, Monitor)
                      return <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    })()}
                  </div>
                  <h3 className="font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{service.description}</p>
                <ul className="space-y-1">
                  {(Array.isArray(service.features) ? service.features : []).map((feature, i) => (
                    <li key={i} className="flex items-center text-xs text-gray-600">
                      <CheckCircle className="w-3 h-3 text-blue-500 mr-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-3 gap-3">
            {showcaseImages.slice(0, 6).map((img, i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-3 shadow-sm">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={150}
                  height={100}
                  className="rounded-lg object-contain w-full h-24"
                />
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {c.why?.title || defaultContent.why.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {c.why?.description || defaultContent.why.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Partners Carousel */}
      <SharedClientsCarouselSection />

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
