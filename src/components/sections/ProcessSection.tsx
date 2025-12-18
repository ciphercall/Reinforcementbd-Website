'use client'

import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/Section'
import { 
  MessageSquare, 
  FileSearch, 
  Cog, 
  CheckCircle
} from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'

interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
}

interface ProcessContent {
  sectionTitle: string
  sectionSubtitle: string
  steps: ProcessStep[]
}

const defaultContent: ProcessContent = {
  sectionTitle: 'Our Working Process',
  sectionSubtitle: 'From concept to completion, we deliver excellence',
  steps: [
    {
      id: '1',
      number: '01',
      title: 'Consultation & Analysis',
      description:
        'We begin by understanding your requirements, conducting site visits if needed, and analyzing your project needs.'
    },
    {
      id: '2',
      number: '02',
      title: 'Design & Planning',
      description:
        'Our expert team creates detailed designs, technical specifications, and project plans tailored to your needs.'
    },
    {
      id: '3',
      number: '03',
      title: 'Implementation',
      description:
        'We execute the project with precision, following industry best practices and maintaining quality standards.'
    },
    {
      id: '4',
      number: '04',
      title: 'Delivery & Support',
      description:
        'Project handover with documentation, training, and ongoing maintenance and support services.'
    }
  ]
}

const stepIcons = [MessageSquare, FileSearch, Cog, CheckCircle]

export function ProcessSection({ content }: { content?: unknown }) {
  const c = coercePageContent<ProcessContent>(content, defaultContent)

  return (
    <Section background="gray" id="process">
      <SectionHeader
        title={c.sectionTitle}
        subtitle={c.sectionSubtitle}
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
          {c.steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length]
            return (
            <motion.div
              key={step.id}
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
                  <Icon className="w-8 h-8 text-white" />
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
          )})}
        </motion.div>
      </div>
    </Section>
  )
}
