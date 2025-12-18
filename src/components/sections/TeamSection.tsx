'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Linkedin, Mail } from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'

interface TeamMemberPreview {
  id: string
  name: string
  position: string
  bio: string
  image: string
  showImage?: boolean
  linkedin: string
  email: string
}

interface TeamPreviewContent {
  sectionTitle: string
  sectionSubtitle: string
  visibleCount?: number
  members: TeamMemberPreview[]
  bottomButtonText: string
  bottomButtonLink: string
}

const defaultContent: TeamPreviewContent = {
  sectionTitle: 'Meet Our Team',
  sectionSubtitle: 'Expert Engineers Driving Excellence',
  visibleCount: 4,
  members: [
    {
      id: '1',
      name: 'Engr. Md. Shariful Islam',
      position: 'Director',
      bio: 'Founder and Director of Reinforcement Group with extensive experience in electrical engineering and automation. Leading the company vision since 2018.',
      image: '/images/team/shariful.jpg',
      showImage: true,
      linkedin: '#',
      email: 'shariful@ragrpbd.com'
    },
    {
      id: '2',
      name: 'Engr. Gazi Monir-Uz-Zaman',
      position: 'Director',
      bio: 'Co-Director bringing strategic leadership and technical expertise to drive company growth and innovation in all three divisions.',
      image: '/images/team/monir.jpg',
      showImage: true,
      linkedin: '#',
      email: 'gazi@ragrpbd.com'
    },
    {
      id: '3',
      name: 'Ar. Miss. Sultana',
      position: 'Head of Design',
      bio: 'Leading the Reinforcement Architect View division with creative architectural designs and innovative visualization solutions.',
      image: '/images/team/sultana.jpg',
      showImage: true,
      linkedin: '#',
      email: 'sultana@ragrpbd.com'
    },
    {
      id: '4',
      name: 'Engr. Md. Sarful Hasan',
      position: 'Chief Advisor',
      bio: 'Providing strategic guidance and technical advisory services with years of industry experience in automation and electrical systems.',
      image: '/images/team/sarful.jpg',
      showImage: true,
      linkedin: '#',
      email: 'sarful@ragrpbd.com'
    }
  ],
  bottomButtonText: 'View Full Team',
  bottomButtonLink: '/about#team'
}

export function TeamSection({ content }: { content?: unknown }) {
  const c = coercePageContent<TeamPreviewContent>(content, defaultContent)
  const visibleCount = Math.max(
    0,
    Math.min(
      Number.isFinite(c.visibleCount as number) ? (c.visibleCount as number) : defaultContent.visibleCount ?? 4,
      c.members?.length ?? 0
    )
  )

  const members = (c.members ?? []).map((m) => ({
    ...m,
    showImage: m.showImage !== false,
  }))
  const shownMembers = visibleCount ? members.slice(0, visibleCount) : members

  return (
    <Section background="gray" id="team">
      <SectionHeader
        title={c.sectionTitle}
        subtitle={c.sectionSubtitle}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shownMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden group">
              <div className="relative aspect-square">
                {member.showImage && member.image ? (
                  <>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                )}

                {/* Social Links */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={member.linkedin}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4 text-white" />
                  </a>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className={`text-lg font-bold ${member.showImage && member.image ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className={`${member.showImage && member.image ? 'text-blue-300' : 'text-blue-600'} text-sm font-medium`}>
                    {member.position}
                  </p>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href={c.bottomButtonLink || '/about#team'}>
          <Button variant="outline" size="lg">
            {c.bottomButtonText}
          </Button>
        </Link>
      </div>
    </Section>
  )
}
