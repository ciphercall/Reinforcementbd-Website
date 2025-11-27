'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Clock,
  Award,
  HeartHandshake,
  Briefcase,
  GraduationCap,
  Laptop,
  Calculator,
  Building,
  Wrench
} from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const services = [
  {
    title: 'Managed Staffing Service',
    description: 'Expert, Professional, and Maestro Level staffing with on-demand support and 24/7 help desk.',
    icon: Users,
    href: '/services/managed-staffing'
  },
  {
    title: 'Sales Force Outsourcing',
    description: 'Sales execution, market expansion, and CRM management with scalable solutions.',
    icon: TrendingUp,
    href: '/services/sales-force'
  },
  {
    title: 'HR Outsourcing Service',
    description: 'Executive search, talent acquisition, payroll services, HRIS, and corporate trainings.',
    icon: Briefcase,
    href: '/services/hr-outsourcing'
  },
  {
    title: 'Corporate Training',
    description: 'Technical, soft skills, leadership, and sales training programs by expert trainers.',
    icon: GraduationCap,
    href: '/services/corporate-training'
  },
  {
    title: 'IT Services & Procurement',
    description: 'Laptop, desktop, network support, IT asset management, and telecom support.',
    icon: Laptop,
    href: '/services/it-services'
  },
  {
    title: 'Managed Payroll Service',
    description: 'Complete payroll management with compliance and cost optimization.',
    icon: Calculator,
    href: '/services/payroll'
  },
  {
    title: 'Executive Support Services',
    description: 'Administrative, technical, strategic direction, and accounting services.',
    icon: Building,
    href: '/services/executive-support'
  },
  {
    title: 'CCTV Maintenance & Support',
    description: 'Regular inspection, maintenance, software updates, and technical support.',
    icon: Wrench,
    href: '/services/cctv-maintenance'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function ServicesSection() {
  return (
    <Section background="gray" id="services">
      <SectionHeader
        title="Our Core Services"
        subtitle="Comprehensive business solutions tailored to your needs"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={itemVariants}>
            <Link href={service.href}>
              <Card className="h-full group cursor-pointer">
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <Link href="/services">
          <Button variant="outline" size="lg">
            View All Services
          </Button>
        </Link>
      </div>
    </Section>
  )
}
