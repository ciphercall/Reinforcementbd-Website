'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'

interface HeroContent {
  headline: string
  subheadline: string
  tagline: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  backgroundImage: string
  stats: { label: string; value: string }[]
}

const defaultContent: HeroContent = {
  headline: 'Welcome to Reinforcement Group',
  subheadline: 'Automation | Architecture | IT Solutions',
  tagline:
    'Your Vision, Our Expertise. We specialize in Electrical & Automation, Architectural Design, and IT Solutions including Web, Mobile, AI/ML, and Cloud Services.',
  primaryButtonText: 'Schedule a Discovery Call',
  primaryButtonLink: '/contact',
  secondaryButtonText: 'Explore Our Services',
  secondaryButtonLink: '/services',
  backgroundImage: '/images/automation/1.png',
  stats: [
    { label: 'Years Experience', value: '6+' },
    { label: 'Projects Done', value: '100+' },
    { label: 'Happy Clients', value: '50+' }
  ]
}

export function HeroSection({ content }: { content?: unknown }) {
  const c = coercePageContent<HeroContent>(content, defaultContent)
  const heroImage = c.backgroundImage || defaultContent.backgroundImage

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse" />
              {c.subheadline}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {c.headline}
            </h1>

            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
              {c.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={c.primaryButtonLink || '/contact'}>
                <Button variant="primary" size="xl" className="group">
                  {c.primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href={c.secondaryButtonLink || '/services'}>
                <Button variant="outline" size="xl">
                  {c.secondaryButtonText}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200">
              {c.stats.slice(0, 4).map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl transform rotate-3" />
              <Image
                src={heroImage}
                alt="Automation Solutions"
                fill
                className="object-cover rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                priority
              />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Trusted Partner</div>
                  <div className="text-sm text-gray-500">For Leading Brands</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
