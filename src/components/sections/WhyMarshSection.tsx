'use client'

import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/Section'
import { 
  Clock, 
  DollarSign, 
  Shield, 
  Zap,
  Target
} from 'lucide-react'

const reasons = [
  {
    title: 'Seamless Support, Anytime',
    description: 'Our back-office experts ensure constant availability and operational continuity—so your business stays productive, agile, and always-on without disruptions or downtime.',
    icon: Clock
  },
  {
    title: 'Smarter Payroll and Cost Control',
    description: 'We manage your entire payroll process with precision—helping you reduce administrative burdens, optimize expenses, and keep financial operations smooth and compliant.',
    icon: DollarSign
  },
  {
    title: 'Risk Free Operations, Guaranteed',
    description: 'We proactively handle risk management challenges, giving you peace of mind and allowing you to focus on core business priorities with confidence.',
    icon: Shield
  },
  {
    title: 'Empowered Employees, Better Results',
    description: 'Equip your end-users with robust tools and hands-on support that enhance their productivity, efficiency, and ability to succeed in fast-paced environments.',
    icon: Zap
  },
  {
    title: 'Strategic Focus For In-House Teams',
    description: 'We take care of the operational load so your internal teams can stay focused on strategic growth, innovation, and high-impact projects that move your business forward.',
    icon: Target
  }
]

export function WhyMarshSection() {
  return (
    <Section background="white" id="why-marsh">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
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
            Why MARSH?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            <strong>Customized Strategies for Sustainable Success</strong>
          </p>
          <p className="text-gray-600 leading-relaxed">
            What sets us apart? It's our people. Our team blends seasoned experts with 
            fresh, forward-thinking talent, combining deep industry knowledge with 
            innovative strategies. This synergy allows us to deliver customized, 
            high-impact solutions that address your current needs while preparing 
            your business for tomorrow.
          </p>
        </motion.div>

        {/* Right Side - Reasons */}
        <div className="space-y-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex space-x-5 p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                <reason.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
