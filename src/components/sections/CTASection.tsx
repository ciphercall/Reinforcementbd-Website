'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Calendar, Phone, Mail, MapPin } from 'lucide-react'

export function CTASection() {
  return (
    <Section background="gradient" id="cta">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Let's Build Something Great Together
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your Vision, Our Expertise
          </p>

          <p className="text-blue-100 max-w-3xl mx-auto leading-relaxed">
            At Reinforcement Group, we combine electrical engineering excellence, 
            architectural innovation, and cutting-edge IT solutions to transform 
            your business. Partner with us for comprehensive solutions that drive 
            success.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button 
                variant="secondary" 
                size="xl" 
                className="bg-white text-blue-600 hover:bg-blue-50 group"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="tel:+8801326249585">
              <Button 
                variant="outline" 
                size="xl"
                className="border-white text-white hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
            </a>
          </div>

          {/* Contact Info */}
          <div className="grid sm:grid-cols-3 gap-6 pt-12 border-t border-white/20">
            <div className="flex items-center justify-center space-x-3 text-white">
              <MapPin className="h-5 w-5 text-blue-200" />
              <span className="text-sm">Khilkhet, Dhaka-1229</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Phone className="h-5 w-5 text-blue-200" />
              <span className="text-sm">+88 013 26 24 95 85</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Mail className="h-5 w-5 text-blue-200" />
              <span className="text-sm">info@ragrpbd.com</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
