'use client'

import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/Section'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Star } from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'
import { resolveLucideIcon } from '@/lib/utils/lucideIcon'

interface IndustryItem {
  id: string
  name: string
  icon?: string
}

interface IndustriesPreviewContent {
  sectionTitle: string
  sectionSubtitle: string
  items: IndustryItem[]
  bottomButtonText: string
  bottomButtonLink: string
}

const defaultContent: IndustriesPreviewContent = {
  sectionTitle: 'Industries We Serve',
  sectionSubtitle: 'Our solutions are tailor-made for each industry we serve',
  items: [
    { id: '1', name: 'Banks & Financial Institutions', icon: 'Building2' },
    { id: '2', name: 'Foreign Aid Projects', icon: 'Plane' },
    { id: '3', name: 'Hospitality', icon: 'Hotel' },
    { id: '4', name: 'RMG & Textiles', icon: 'Factory' },
    { id: '5', name: "FMCG's", icon: 'ShoppingBag' },
    { id: '6', name: 'ICT', icon: 'Laptop' },
    { id: '7', name: 'Non-Governmental Organizations', icon: 'Heart' },
    { id: '8', name: 'Pharmaceuticals', icon: 'Pill' },
    { id: '9', name: "SME's & Startups", icon: 'Rocket' },
    { id: '10', name: 'Foreign Affairs & Affiliated Offices', icon: 'Globe' },
    { id: '11', name: 'Hospitals', icon: 'Heart' },
    { id: '12', name: 'Education & More...', icon: 'GraduationCap' }
  ],
  bottomButtonText: 'Explore All Industries',
  bottomButtonLink: '/industries'
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

export function IndustriesSection({ content }: { content?: unknown }) {
  const c = coercePageContent<IndustriesPreviewContent>(content, defaultContent)

  return (
    <Section background="white" id="industries">
      <SectionHeader
        title={c.sectionTitle}
        subtitle={c.sectionSubtitle}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
      >
        {c.items.map((industry) => {
          const Icon = resolveLucideIcon(industry.icon, Star)
          return (
          <motion.div
            key={industry.id}
            variants={itemVariants}
            className="group"
          >
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 text-center hover:bg-blue-50 hover:shadow-md transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {industry.name}
              </h3>
            </div>
          </motion.div>
        )})}
      </motion.div>

      <div className="text-center mt-12">
        <Link href={c.bottomButtonLink || '/industries'}>
          <Button variant="outline" size="lg">
            {c.bottomButtonText}
          </Button>
        </Link>
      </div>
    </Section>
  )
}
