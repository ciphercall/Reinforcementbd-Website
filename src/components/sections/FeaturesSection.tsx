'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Star } from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'
import { resolveLucideIcon } from '@/lib/utils/lucideIcon'

interface FeatureItem {
  id: string
  title: string
  description?: string
  icon?: string
}

interface FeaturesContent {
  sectionTitle: string
  sectionSubtitle: string
  features: FeatureItem[]
}

const defaultContent: FeaturesContent = {
  sectionTitle: 'Reinforcement Group Capabilities',
  sectionSubtitle: 'Comprehensive solutions across automation, architecture, and technology',
  features: [
    { id: '1', title: 'Electrical & Automation Excellence', description: 'Reliable industrial and commercial automation solutions.', icon: 'Zap' },
    { id: '2', title: 'Complete Factory Automation Solutions', description: 'End-to-end automation for production efficiency.', icon: 'Factory' },
    { id: '3', title: 'Innovative Architectural Designs', description: 'Modern designs tailored to your space and needs.', icon: 'Building2' },
    { id: '4', title: '3D Modeling & Visualization', description: 'High-quality visualization for better decisions.', icon: 'Star' },
    { id: '5', title: 'Modern Web & Mobile Development', description: 'Web and mobile solutions that scale with you.', icon: 'Globe' },
    { id: '6', title: 'AI & Machine Learning Solutions', description: 'Data-driven automation and intelligence for growth.', icon: 'Star' },
    { id: '7', title: 'Expert Engineering Team', description: 'Experienced professionals across all divisions.', icon: 'Users' },
    { id: '8', title: 'Quality Assurance Guaranteed', description: 'Best practices and quality control throughout.', icon: 'Shield' },
    { id: '9', title: 'Maintenance & Support Services', description: 'Ongoing support to keep operations running.', icon: 'Settings' },
    { id: '10', title: 'End-to-End Project Delivery', description: 'From planning to delivery and optimization.', icon: 'CheckCircle' },
    { id: '11', title: 'Industry Leading Expertise', description: 'Proven results across multiple industries.', icon: 'Award' },
    { id: '12', title: 'Custom Software Development', description: 'Tailored software solutions for your workflows.', icon: 'Code' }
  ]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function FeaturesSection({ content }: { content?: unknown }) {
  const c = coercePageContent<FeaturesContent>(content, defaultContent)

  return (
    <Section background="gradient" id="features">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {c.sectionTitle}
        </h2>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          {c.sectionSubtitle}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {c.features.map((feature) => {
          const Icon = resolveLucideIcon(feature.icon, Star)

          return (
          <motion.div
            key={feature.id}
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-white leading-tight">
                {feature.title}
              </h3>
              {feature.description && (
                <p className="text-xs text-blue-100/90 leading-relaxed line-clamp-2">
                  {feature.description}
                </p>
              )}
            </div>
          </motion.div>
        )})}
      </motion.div>
    </Section>
  )
}
