'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Linkedin, Mail } from 'lucide-react'

const team = [
  {
    name: 'Masunul Haque Chowdhury',
    position: 'Managing Director',
    bio: 'Seasoned entrepreneur and Managing Director with a proven track record in leading both private and publicly listed companies. Brings extensive experience in taking businesses to IPO, as well as managing operations and HR across RMG and manufacturing sectors.',
    image: '/images/profile/7.jpg',
    linkedin: '#',
    email: 'md@marshgroupbd.com'
  },
  {
    name: 'Kazi Hamiduzzaman',
    position: 'Chief Operating Officer',
    bio: 'Experienced HR & Administration leader with a strong track record of more than 17 years across Tech, Manufacturing, and Group Companies. Specializes in HR strategy, organizational development, talent acquisition & management, and performance optimization.',
    image: '/images/profile/9.jpg',
    linkedin: '#',
    email: 'coo@marshgroupbd.com'
  }
]

export function TeamSection() {
  return (
    <Section background="gray" id="team">
      <SectionHeader
        title="Meet Our Team"
        subtitle="The Team Behind Your Success"
      />

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Social Links */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <a 
                    href={member.linkedin}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a 
                    href={`mailto:${member.email}`}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/about#team">
          <Button variant="outline" size="lg">
            View Full Team
          </Button>
        </Link>
      </div>
    </Section>
  )
}
