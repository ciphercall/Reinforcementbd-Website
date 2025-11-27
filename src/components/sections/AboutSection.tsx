'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Target, Eye, ArrowRight } from 'lucide-react'

export function AboutSection() {
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
              src="/images/profile/3.jpg"
              alt="About MARSH Services"
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
            <div className="text-4xl font-bold">12+</div>
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
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Your Trusted Partner for Strategic Growth
            </h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            MARSH Services and Outsourcing is a global talent and business solutions 
            provider specializing in recruitment, managed services, payroll, IT services 
            and remote staffing. We empower businesses to scale efficiently by delivering 
            tailored support, expert talent, and seamless operational execution.
          </p>

          {/* Mission & Vision */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600">
                To empower our clients through exceptional managed support, driven by 
                the expertise, dedication, and innovation of our world-class team.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-sm text-gray-600">
                To build a seamless, nationwide business ecosystem that fuels growth, 
                sparks innovation, and delivers transformative impact across every industry.
              </p>
            </div>
          </div>

          <Link href="/about">
            <Button variant="primary" size="lg" className="group">
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  )
}
