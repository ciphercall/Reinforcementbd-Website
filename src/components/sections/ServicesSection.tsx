'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Zap, 
  Building2, 
  Code,
  Settings,
  Wrench,
  Factory,
  Lightbulb,
  Globe,
  Smartphone,
  Cloud
} from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const divisions = [
  {
    title: 'Reinforcement Automation',
    description: 'Complete electrical and automation solutions for industrial and commercial projects.',
    icon: Zap,
    image: '/images/automation/1.png',
    services: [
      'Electrical & Automation Equipment Supply',
      'Electrical Erection & Commissioning',
      'Factory Automation',
      'Energy Management',
    ],
    href: '/services#automation',
    color: 'from-blue-500 to-blue-700'
  },
  {
    title: 'Reinforcement Architect View',
    description: 'Creative architectural designs and professional engineering services.',
    icon: Building2,
    image: '/images/automation/2.png',
    services: [
      'Architectural Design',
      'Electrical Design',
      'Plumbing & Sanitary',
      '3D Modeling & Visualization',
    ],
    href: '/services#architect',
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    title: 'Reinforcement IT Zone',
    description: 'Cutting-edge technology solutions for digital transformation.',
    icon: Code,
    image: '/images/it/I33.jfif',
    services: [
      'Web Development',
      'Mobile App Development',
      'AI & Machine Learning',
      'Cloud Services',
    ],
    href: '/services#it',
    color: 'from-purple-500 to-purple-700'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

export function ServicesSection() {
  return (
    <Section background="gray" id="services">
      <SectionHeader
        title="Our Divisions"
        subtitle="Three pillars of excellence delivering comprehensive solutions"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        {divisions.map((division) => (
          <motion.div key={division.title} variants={itemVariants}>
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={division.image}
                  alt={division.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${division.color} opacity-60`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <division.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {division.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {division.description}
                </p>
                
                {/* Services List */}
                <ul className="space-y-2 mb-6">
                  {division.services.map((service) => (
                    <li key={service} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      {service}
                    </li>
                  ))}
                </ul>

                <Link href={division.href}>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12"
      >
        <Link href="/services">
          <Button variant="primary" size="lg">
            View All Services
          </Button>
        </Link>
      </motion.div>
    </Section>
  )
}
