'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { 
  Zap, 
  Building2, 
  Code,
  Award,
  Users,
  CheckCircle
} from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'
import { resolveLucideIcon } from '@/lib/utils/lucideIcon'

interface WhyUsItem {
  id: string
  title: string
  description: string
  icon: string
}

interface WhyUsContent {
  sectionTitle: string
  sectionSubtitle: string
  items: WhyUsItem[]
}

const defaultContent: WhyUsContent = {
  sectionTitle: 'Why Reinforcement Group?',
  sectionSubtitle: 'Your Vision, Our Expertise',
  items: [
    {
      id: '1',
      title: 'Three Specialized Divisions',
      description:
        'Reinforcement Automation, Architect View, and IT Zone work together to provide comprehensive solutions for all your business needs under one roof.',
      icon: 'Zap'
    },
    {
      id: '2',
      title: 'Expert Engineering Team',
      description:
        'Our team of qualified engineers brings years of hands-on experience in automation, electrical systems, architecture, and software development.',
      icon: 'Users'
    },
    {
      id: '3',
      title: 'Quality Assurance',
      description:
        'We maintain the highest standards of quality in all our projects, from industrial automation to architectural designs to software solutions.',
      icon: 'Award'
    },
    {
      id: '4',
      title: 'End-to-End Solutions',
      description:
        'From initial consultation to final delivery, we handle every aspect of your project with precision and professionalism.',
      icon: 'Building2'
    },
    {
      id: '5',
      title: 'Innovation Driven',
      description:
        'We embrace cutting-edge technologies including AI, Machine Learning, Blockchain, and IoT to deliver forward-thinking solutions.',
      icon: 'Code'
    }
  ]
}

export function WhyReinforcementSection({ content }: { content?: unknown }) {
  const c = coercePageContent<WhyUsContent>(content, defaultContent)

  return (
    <Section background="white" id="why-us">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left Side - Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-32"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
            {c.sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            <strong>{c.sectionSubtitle}</strong>
          </p>
        </motion.div>

        {/* Right Side - Reasons */}
        <div className="space-y-6">
          {c.items.map((item, index) => {
            const Icon = resolveLucideIcon(item.icon, CheckCircle)
            return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex space-x-5 p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </Section>
  )
}
