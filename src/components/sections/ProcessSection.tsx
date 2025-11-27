'use client'

import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/Section'
import { 
  Search, 
  FileText, 
  Cog, 
  TrendingUp,
  ArrowRight
} from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Discovery & Needs Analysis',
    description: 'We begin by understanding your unique needs, goals, and challenges through in-depth consultation and data-driven analysis.',
    icon: Search
  },
  {
    number: '02',
    title: 'Strategic Planning & Solution Design',
    description: 'Based on insights, we design tailored strategies to align with your business objectives and deliver measurable results.',
    icon: FileText
  },
  {
    number: '03',
    title: 'Implementation & Support',
    description: 'Our experts work alongside your team to implement solutions seamlessly, ensuring smooth transitions and sustainable growth.',
    icon: Cog
  },
  {
    number: '04',
    title: 'Continuous Optimization',
    description: 'We monitor progress, analyze outcomes, and make necessary adjustments to maximize long-term success.',
    icon: TrendingUp
  }
]

export function ProcessSection() {
  return (
    <Section background="gray" id="process">
      <SectionHeader
        title="How We Work"
        subtitle="Our Process: Collaborative, Strategic, Impactful"
      />

      <div className="relative">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-blue-200">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 h-full animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{step.number}</span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-24 -right-4 z-20">
                  <ArrowRight className="w-8 h-8 text-blue-400" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
