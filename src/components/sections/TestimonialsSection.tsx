'use client'

import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    content: "We booked MARSH for a few training sessions, and the results were great. Our team is now more confident and better equipped for day-to-day tasks.",
    client: "Healthport Bangladesh Ltd",
    service: "For Corporate Training",
    rating: 5
  },
  {
    content: "MARSH helped us hire the right people quickly without the usual hassle. Their team understood exactly what we needed and delivered beyond our expectations.",
    client: "Newline Clothings PLC",
    service: "For Staffing & Recruitment",
    rating: 5
  },
  {
    content: "Outsourcing our sales team to MARSH was a smart move. They helped us expand into new markets fast and with real results.",
    client: "A.K. Oxygen Ltd.",
    service: "For Sales Force Outsourcing",
    rating: 5
  }
]

export function TestimonialsSection() {
  return (
    <Section background="gray" id="testimonials">
      <SectionHeader
        title="What Our Clients Say"
        subtitle="Trusted by Businesses Across Industries"
      />

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-8 space-y-6">
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-blue-600" />
                </div>

                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-600 leading-relaxed italic">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Client Info */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="font-semibold text-gray-900">
                    {testimonial.client}
                  </div>
                  <div className="text-sm text-blue-600">
                    {testimonial.service}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
