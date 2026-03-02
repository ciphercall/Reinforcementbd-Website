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
  Cpu,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Automation Division | Reinforcement Group',
  description: 'Industrial automation solutions including PLC programming, SCADA systems, HMI design, VFD installation, and industrial control systems.',
  keywords: 'PLC programming, SCADA, HMI, VFD, industrial automation, Siemens, Schneider, Bangladesh',
}

export const dynamic = 'force-dynamic'

interface AutomationStat {
  value: string
  label: string
}

interface AutomationServiceCard {
  title: string
  description: string
  icon: string
  image: string
  features: string[]
}

interface AutomationBenefit {
  title: string
  desc: string
}

interface AutomationHero {
  logo: string
  title: string
  description: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  heroImages: string[]
}

interface AutomationWhy {
  title: string
  description: string
  benefits: AutomationBenefit[]
  showcaseImages: string[]
}

interface AutomationPageContent {
  hero: AutomationHero
  stats: AutomationStat[]
  servicesHeader: { title: string; subtitle: string }
  services: AutomationServiceCard[]
  why: AutomationWhy
}

const defaultContent: AutomationPageContent = {
  hero: {
    logo: '/images/logos/rein-auto.jpg',
    title: 'Industrial Automation Solutions',
    description:
      'From PLC programming to complete SCADA systems, we deliver cutting-edge automation solutions that increase efficiency, reduce costs, and enhance productivity for industries across Bangladesh.',
    primaryCtaText: 'Get a Quote',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'View Services',
    secondaryCtaLink: '#services',
    heroImages: ['/images/automation/1.png', '/images/automation/2.png', '/images/automation/3.png', '/images/automation/4.png'],
  },
  stats: [
    { value: '500+', label: 'Projects Completed' },
    { value: '7+', label: 'Years Experience' },
    { value: '50+', label: 'Industrial Clients' },
    { value: '24/7', label: 'Support Available' },
  ],
  servicesHeader: {
    title: 'Our Automation Services',
    subtitle: 'Comprehensive automation solutions for every industrial need',
  },
  services: [
    {
      title: 'PLC Programming',
      description: 'Expert programming for Siemens S7, Schneider Modicon, Allen Bradley, and other major PLC brands.',
      icon: 'Cpu',
      image: '/images/automation/1.png',
      features: ['Siemens S7 Series', 'Schneider Modicon', 'Allen Bradley', 'Delta PLC', 'Custom Logic Design'],
    },
    {
      title: 'SCADA Systems',
      description: 'Complete SCADA implementation for monitoring and control of industrial processes.',
      icon: 'MonitorPlay',
      image: '/images/automation/2.png',
      features: ['Real-time Monitoring', 'Data Logging', 'Alarm Management', 'Remote Access', 'Historical Trends'],
    },
    {
      title: 'HMI Design & Programming',
      description: 'User-friendly Human Machine Interface design for optimal operator control.',
      icon: 'Settings',
      image: '/images/automation/3.png',
      features: ['Touchscreen Interfaces', 'Intuitive Design', 'Multi-language Support', 'Custom Graphics', 'Responsive Layouts'],
    },
    {
      title: 'VFD Installation',
      description: 'Variable Frequency Drive installation and configuration for motor speed control.',
      icon: 'Zap',
      image: '/images/automation/4.png',
      features: ['Energy Savings', 'Motor Protection', 'Speed Control', 'Soft Start', 'Parameter Setup'],
    },
    {
      title: 'Industrial Control Panels',
      description: 'Custom control panel design, fabrication, and installation for industrial applications.',
      icon: 'CircuitBoard',
      image: '/images/automation/5.png',
      features: ['Panel Design', 'Wiring & Assembly', 'Testing & Commissioning', 'Documentation', 'Maintenance Support'],
    },
    {
      title: 'Process Automation',
      description: 'End-to-end automation of manufacturing and industrial processes.',
      icon: 'Factory',
      image: '/images/automation/6.png',
      features: ['Production Lines', 'Quality Control', 'Material Handling', 'Packaging Systems', 'Batch Processing'],
    },
    {
      title: 'Instrumentation',
      description: 'Industrial instrumentation installation, calibration, and maintenance.',
      icon: 'Gauge',
      image: '/images/automation/7.png',
      features: ['Sensors & Transmitters', 'Flow Meters', 'Level Sensors', 'Temperature Probes', 'Calibration Services'],
    },
    {
      title: 'Maintenance & Support',
      description: 'Ongoing maintenance, troubleshooting, and technical support for automation systems.',
      icon: 'Wrench',
      image: '/images/automation/8.png',
      features: ['24/7 Support', 'Preventive Maintenance', 'Troubleshooting', 'System Upgrades', 'Training'],
    },
    {
      title: 'Safety Systems',
      description: 'Industrial safety systems design and implementation for personnel and equipment protection.',
      icon: 'Shield',
      image: '/images/automation/9.png',
      features: ['Safety PLCs', 'E-Stop Systems', 'Light Curtains', 'Safety Relays', 'Risk Assessment'],
    },
  ],
  why: {
    title: 'Why Choose Our Automation Division?',
    description:
      'With years of experience in industrial automation, we bring expertise across all major PLC and SCADA platforms. Our team of certified engineers delivers solutions that meet international standards while understanding local industry requirements.',
    benefits: [
      { title: 'Certified Engineers', desc: 'Siemens & Schneider certified professionals' },
      { title: 'Multi-brand Expertise', desc: 'Work with all major automation brands' },
      { title: 'Full Lifecycle Support', desc: 'From design to commissioning & maintenance' },
      { title: 'Industry Experience', desc: 'Textile, pharma, food, manufacturing & more' },
    ],
    showcaseImages: ['/images/automation/10.png', '/images/automation/11.png', '/images/automation/12.png', '/images/automation/13.png'],
  },
}

export default async function AutomationPage() {
  const cms = await getPageContents('services-automation', ['page'])
  const c = coercePageContent<AutomationPageContent>(cms['page'], defaultContent)

  const heroImages = Array.isArray(c.hero?.heroImages) ? c.hero.heroImages : defaultContent.hero.heroImages
  const stats = Array.isArray(c.stats) ? c.stats : defaultContent.stats
  const services = Array.isArray(c.services) ? c.services : defaultContent.services
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
                  alt="Automation Division"
                  width={260}
                  height={80}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {heroImages.slice(0, 4).map((src, index) => (
                  <div key={`${src}-${index}`} className="bg-white backdrop-blur-sm rounded-xl p-2 shadow-xl">
                    <Image
                      src={src}
                      alt={`Automation ${index + 1}`}
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-50">
                {service.image && (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    {(() => {
                      const Icon = resolveLucideIcon(service.icon, Cpu)
                      return <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    })()}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
                <ul className="space-y-2">
                  {(Array.isArray(service.features) ? service.features : []).map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
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
          <div className="space-y-6">
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
          <div className="grid grid-cols-2 gap-4">
            {showcaseImages.slice(0, 4).map((src, index) => (
              <div key={`${src}-${index}`} className="bg-gray-100 rounded-xl p-4 shadow-sm">
                <Image
                  src={src}
                  alt={`Automation showcase ${index + 1}`}
                  width={250}
                  height={200}
                  className="rounded-lg object-contain w-full h-40"
                />
              </div>
            ))}
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
