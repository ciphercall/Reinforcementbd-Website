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
            Let's Work Together...
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Unlock Talent. Streamline Operations. Accelerate Growth.
          </p>

          <p className="text-blue-100 max-w-3xl mx-auto leading-relaxed">
            At MARSH Services, we go beyond traditional staffing and managed services. 
            We partner with businesses to deliver talent, drive efficiency, reduce risk, 
            and enable growth—backed by global reach, industry expertise, and personalized support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button 
                variant="secondary" 
                size="xl" 
                className="bg-white text-blue-600 hover:bg-blue-50 group"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Discovery Call
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="tel:+8801310886600">
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
              <span className="text-sm">Banani, Dhaka 1213</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Phone className="h-5 w-5 text-blue-200" />
              <span className="text-sm">+880 1310 88 66 00</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Mail className="h-5 w-5 text-blue-200" />
              <span className="text-sm">info@marshgroupbd.com</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
