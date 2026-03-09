'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { coercePageContent } from '@/lib/utils/pageContent'

interface ServicePreviewItem {
  id: string
  title: string
  description: string
  image: string
  services: string[]
  href: string
  icon?: string
  color?: string
}

interface ServicesPreviewContent {
  sectionTitle: string
  sectionSubtitle: string
  items: ServicePreviewItem[]
  bottomButtonText: string
  bottomButtonLink: string
}

const defaultContent: ServicesPreviewContent = {
  sectionTitle: 'Our Divisions',
  sectionSubtitle: 'Three pillars of excellence delivering comprehensive solutions',
  items: [
    {
      id: '1',
      title: 'Reinforcement Automation',
      description: 'Complete electrical and automation solutions for industrial and commercial projects.',
      image: '/images/automation/1.png',
      services: [
        'Electrical & Automation Equipment Supply',
        'Electrical Erection & Commissioning',
        'Factory Automation',
        'Energy Management'
      ],
      href: '/services#automation',
      icon: 'Zap',
      color: 'blue'
    },
    {
      id: '2',
      title: 'Reinforcement Architect View',
      description: 'Creative architectural designs and professional engineering services.',
      image: '/images/automation/2.png',
      services: [
        'Architectural Design',
        'Electrical Design',
        'Plumbing & Sanitary',
        '3D Modeling & Visualization'
      ],
      href: '/services#architect',
      icon: 'Building2',
      color: 'emerald'
    },
    {
      id: '3',
      title: 'Reinforcement IT Zone',
      description: 'Cutting-edge technology solutions for digital transformation.',
      image: '/images/it/I33.jfif',
      services: ['Web Development', 'Mobile App Development', 'AI & Machine Learning', 'Cloud Services'],
      href: '/services#it',
      icon: 'Code',
      color: 'purple'
    }
  ],
  bottomButtonText: 'View All Services',
  bottomButtonLink: '/services'
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

function normalizeImageSrc(input: unknown): string | null {
  if (typeof input !== 'string') return null

  const trimmed = input.trim()
  if (!trimmed) return null

  const prefixed =
    trimmed.startsWith('/') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
      ? trimmed
      : `/${trimmed}`

  try {
    return encodeURI(prefixed)
  } catch {
    return null
  }
}

export function ServicesSection({ content }: { content?: unknown }) {
  const c = coercePageContent<ServicesPreviewContent>(content, defaultContent)

  return (
    <Section background="gray" id="services">
      <SectionHeader
        title={c.sectionTitle}
        subtitle={c.sectionSubtitle}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        {c.items.map((division) => {
          const imageSrc = normalizeImageSrc((division as unknown as { image?: unknown }).image)

          return (
          <motion.div key={division.id} variants={itemVariants}>
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={division.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : null}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {division.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {division.description}
                </p>
                
                {/* Services List */}
                <ul className="space-y-2 mb-6">
                  {division.services.map((service) => (
                    <li key={service} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      {service}
                    </li>
                  ))}
                </ul>

                <Link href={division.href || '/services'}>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )})}
      </motion.div>

      {/* View All Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12"
      >
        <Link href={c.bottomButtonLink || '/services'}>
          <Button variant="primary" size="lg">
            {c.bottomButtonText}
          </Button>
        </Link>
      </motion.div>
    </Section>
  )
}
