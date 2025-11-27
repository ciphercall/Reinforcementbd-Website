'use client'

import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/Section'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  Building2, 
  Plane, 
  Hotel, 
  Factory, 
  ShoppingBag, 
  Laptop,
  Heart,
  GraduationCap,
  Briefcase,
  Globe,
  Pill,
  Rocket
} from 'lucide-react'

const industries = [
  { name: 'Banks & Financial Institutions', icon: Building2 },
  { name: 'Foreign Aid Projects', icon: Plane },
  { name: 'Hospitality', icon: Hotel },
  { name: 'RMG & Textiles', icon: Factory },
  { name: "FMCG's", icon: ShoppingBag },
  { name: 'ICT', icon: Laptop },
  { name: 'Non-Governmental Organizations', icon: Heart },
  { name: 'Pharmaceuticals', icon: Pill },
  { name: "SME's & Startups", icon: Rocket },
  { name: 'Foreign Affairs & Affiliated Offices', icon: Globe },
  { name: 'Hospitals', icon: Heart },
  { name: 'Education & More...', icon: GraduationCap }
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

export function IndustriesSection() {
  return (
    <Section background="white" id="industries">
      <SectionHeader
        title="Industries We Serve"
        subtitle="Our solutions are tailor-made for each industry we serve"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
      >
        {industries.map((industry) => (
          <motion.div
            key={industry.name}
            variants={itemVariants}
            className="group"
          >
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-blue-50 hover:shadow-md transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <industry.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {industry.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <Link href="/industries">
          <Button variant="outline" size="lg">
            Explore All Industries
          </Button>
        </Link>
      </div>
    </Section>
  )
}
