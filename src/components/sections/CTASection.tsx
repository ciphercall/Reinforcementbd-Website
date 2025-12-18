'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Calendar, Phone, Mail, MapPin } from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'

interface CTAContent {
  headline: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  backgroundColor: string
}

const defaultContent: CTAContent = {
  headline: "Let's Build Something Great Together",
  description: 'Your Vision, Our Expertise',
  primaryButtonText: 'Get Started Today',
  primaryButtonLink: '/contact',
  secondaryButtonText: 'Call Us Now',
  secondaryButtonLink: 'tel:+8801326249585',
  backgroundColor: 'blue'
}

const bgGradientByColor: Record<string, string> = {
  blue: 'bg-gradient-to-br from-blue-600 to-blue-800 text-white',
  indigo: 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white',
  purple: 'bg-gradient-to-br from-purple-600 to-purple-800 text-white',
  green: 'bg-gradient-to-br from-green-600 to-green-800 text-white',
  gray: 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
}

export function CTASection({ content }: { content?: unknown }) {
  const c = coercePageContent<CTAContent>(content, defaultContent)
  const sectionClass = bgGradientByColor[c.backgroundColor] ?? bgGradientByColor.blue

  return (
    <Section background="gradient" id="cta" className={sectionClass}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {c.headline}
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {c.description}
          </p>

          <p className="text-blue-100 max-w-3xl mx-auto leading-relaxed">
            At Reinforcement Group, we combine electrical engineering excellence, 
            architectural innovation, and cutting-edge IT solutions to transform 
            your business. Partner with us for comprehensive solutions that drive 
            success.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href={c.primaryButtonLink || '/contact'}>
              <Button 
                variant="secondary" 
                size="xl" 
                className="bg-white text-blue-600 hover:bg-blue-50 group"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {c.primaryButtonText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            {c.secondaryButtonLink?.startsWith('tel:') ? (
              <a href={c.secondaryButtonLink}>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {c.secondaryButtonText}
                </Button>
              </a>
            ) : (
              <Link href={c.secondaryButtonLink || '/about'}>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {c.secondaryButtonText}
                </Button>
              </Link>
            )}
          </div>

          {/* Contact Info */}
          <div className="grid sm:grid-cols-3 gap-6 pt-12 border-t border-white/20">
            <div className="flex items-center justify-center space-x-3 text-white">
              <MapPin className="h-5 w-5 text-blue-200" />
              <span className="text-sm">Khilkhet, Dhaka-1229</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Phone className="h-5 w-5 text-blue-200" />
              <span className="text-sm">+88 013 26 24 95 85</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Mail className="h-5 w-5 text-blue-200" />
              <span className="text-sm">info@ragrpbd.com</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
