'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { 
  ThumbsUp, 
  Zap, 
  Building2, 
  Brain,
  RefreshCw,
  Puzzle,
  Settings,
  Users,
  Shield,
  Award,
  Clock,
  TrendingUp
} from 'lucide-react'

const features = [
  {
    title: 'Consistently High Client Satisfaction',
    icon: ThumbsUp
  },
  {
    title: 'Tech-Enabled Delivery for Seamless Experience',
    icon: Zap
  },
  {
    title: 'Trusted Across 20+ Diverse Industries',
    icon: Building2
  },
  {
    title: 'Broad Domain Expertise Across Key Functions',
    icon: Brain
  },
  {
    title: '90% Client Retention Through Repeat Engagement',
    icon: RefreshCw
  },
  {
    title: 'End-to-End Staffing & Consulting Solutions',
    icon: Puzzle
  },
  {
    title: 'Optimized Payroll & Expense Management',
    icon: Settings
  },
  {
    title: 'Extensive Active & Passive Talent Database',
    icon: Users
  },
  {
    title: 'Proactive & Effective Risk Mitigation',
    icon: Shield
  },
  {
    title: 'Preferred Talent Partner for Leading Brands',
    icon: Award
  },
  {
    title: 'Free Up Internal Teams for Strategic Initiatives',
    icon: Clock
  },
  {
    title: 'Empowering End-Users with Enhanced Capability',
    icon: TrendingUp
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
          Showcase of MARSH Services & Outsourcing
        </h2>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          What sets us apart in delivering exceptional business solutions
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm font-medium leading-snug">
                {feature.title}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
