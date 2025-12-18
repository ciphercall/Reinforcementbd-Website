'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Target, Eye, ArrowRight } from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'

interface AboutContent {
  eyebrow: string
  title: string
  description: string
  image: string
  yearsExperience: string
  missionTitle: string
  missionDescription: string
  visionTitle: string
  visionDescription: string
  buttonText: string
  buttonLink: string
}

const defaultContent: AboutContent = {
  eyebrow: 'About Us',
  title: 'Your Trusted Partner for Industrial Excellence',
  description:
    'Reinforcement Group started its journey in 2018 as "Reinforcement Automation" and has grown to become a diversified company with three specialized divisions: Automation, Architect View, and IT Zone. We empower businesses with innovative solutions in electrical & automation, architectural design, and technology services.',
  image: '/images/automation/2.png',
  yearsExperience: '6+',
  missionTitle: 'Our Mission',
  missionDescription:
    'To provide innovative and reliable electrical, automation, architectural, and IT solutions that exceed client expectations with highest quality.',
  visionTitle: 'Our Vision',
  visionDescription:
    'To be the leading integrated solutions provider in Bangladesh, recognized for excellence, innovation, and customer satisfaction.',
  buttonText: 'Learn More About Us',
  buttonLink: '/about'
}

export function AboutSection({ content }: { content?: unknown }) {
  const c = coercePageContent<AboutContent>(content, defaultContent)

  return (
    <Section background="white" id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={c.image}
              alt="About Reinforcement Group"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Experience Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl"
          >
            <div className="text-4xl font-bold">{c.yearsExperience}</div>
            <div className="text-blue-100">Years of Experience</div>
          </motion.div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              {c.eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {c.title}
            </h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {c.description}
          </p>

          {/* Mission & Vision */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{c.missionTitle}</h3>
              <p className="text-sm text-gray-600">
                {c.missionDescription}
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{c.visionTitle}</h3>
              <p className="text-sm text-gray-600">
                {c.visionDescription}
              </p>
            </div>
          </div>

          <Link href={c.buttonLink}>
            <Button variant="primary" size="lg" className="group">
              {c.buttonText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  )
}
