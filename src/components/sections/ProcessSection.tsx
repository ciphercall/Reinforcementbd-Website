'use client'

import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/Section'
import { 
  MessageSquare, 
  FileSearch, 
  Cog, 
  CheckCircle
} from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Consultation & Analysis',
    description: 'We begin by understanding your requirements, conducting site visits if needed, and analyzing your project needs.',
    icon: MessageSquare
  },
  {
    number: '02',
    title: 'Design & Planning',
    description: 'Our expert team creates detailed designs, technical specifications, and project plans tailored to your needs.',
    icon: FileSearch
  },
  {
    number: '03',
    title: 'Implementation',
    description: 'We execute the project with precision, following industry best practices and maintaining quality standards.',
    icon: Cog
  },
  {
    number: '04',
    title: 'Delivery & Support',
    description: 'Project handover with documentation, training, and ongoing maintenance and support services.',
    icon: CheckCircle
  }
]

export function ProcessSection() {
  return (
    <Section background="gray" id="process">
      <SectionHeader
        title="Our Working Process"
        subtitle="From concept to completion, we deliver excellence"
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
                <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
