'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { 
  Zap, 
  Building2, 
  Code,
  Settings,
  Cpu,
  Factory,
  Lightbulb,
  Shield,
  Award,
  Users,
  Globe,
  Wrench
} from 'lucide-react'

const features = [
  {
    title: 'Electrical & Automation Excellence',
    icon: Zap
  },
  {
    title: 'Complete Factory Automation Solutions',
    icon: Factory
  },
  {
    title: 'Innovative Architectural Designs',
    icon: Building2
  },
  {
    title: '3D Modeling & Visualization',
    icon: Lightbulb
  },
  {
    title: 'Modern Web & Mobile Development',
    icon: Globe
  },
  {
    title: 'AI & Machine Learning Solutions',
    icon: Cpu
  },
  {
    title: 'Expert Engineering Team',
    icon: Users
  },
  {
    title: 'Quality Assurance Guaranteed',
    icon: Shield
  },
  {
    title: 'Maintenance & Support Services',
    icon: Wrench
  },
  {
    title: 'End-to-End Project Delivery',
    icon: Settings
  },
  {
    title: 'Industry Leading Expertise',
    icon: Award
  },
  {
    title: 'Custom Software Development',
    icon: Code
  }
]

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

export function FeaturesSection() {
  return (
    <Section background="gradient" id="features">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Reinforcement Group Capabilities
        </h2>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Comprehensive solutions across automation, architecture, and technology
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-white leading-tight">
                {feature.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
