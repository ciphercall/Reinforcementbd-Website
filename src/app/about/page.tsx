import { Metadata } from 'next'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Target, Eye, Award, Zap, Linkedin, Mail } from 'lucide-react'
import { CTASection } from '@/components/sections/CTASection'
import { getPageContents } from '@/lib/pageContent'
import { coercePageContent } from '@/lib/utils/pageContent'
import { resolveLucideIcon } from '@/lib/utils/lucideIcon'

/* eslint-disable react-hooks/static-components */

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Reinforcement Group - Your trusted partner for Electrical & Automation, Architectural Design, and IT Solutions since 2018.',
}

export const dynamic = 'force-dynamic'

const ABOUT_SECTIONS = ['header', 'story', 'journey', 'mission', 'values', 'team', 'divisions'] as const

interface HeaderContent {
  title: string
  subtitle: string
  breadcrumbLabel: string
  backgroundImage: string
}

interface StoryContent {
  title: string
  description: string
  paragraphs: string[]
  image: string
  imageAlt: string
  stats: { label: string; value: string }[]
}

interface JourneyContent {
  sectionTitle: string
  sectionSubtitle: string
  milestones: { year: string; event: string }[]
}

interface MissionContent {
  missionTitle: string
  missionText: string
  missionIcon: string
  visionTitle: string
  visionText: string
  visionIcon: string
  goals: { title: string; description: string }[]
}

interface ValuesContent {
  sectionTitle: string
  sectionSubtitle: string
  values: { title: string; description: string; icon: string }[]
}

interface AboutTeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  showImage?: boolean
  linkedin: string
  email: string
}

interface AboutTeamContent {
  sectionTitle: string
  sectionSubtitle: string
  visibleCount?: number
  members: AboutTeamMember[]
}

interface DivisionsContent {
  sectionTitle: string
  sectionSubtitle: string
  divisions: { title: string; description: string }[]
}

const defaultHeader: HeaderContent = {
  title: 'Your Vision, Our Expertise',
  subtitle:
    'Reinforcement Group started its journey in 2018 as "Reinforcement Automation" and has grown to become a diversified company with three specialized divisions.',
  breadcrumbLabel: 'About Us',
  backgroundImage: '/images/automation/1.png',
}

const defaultStory: StoryContent = {
  title: 'Our Story',
  description:
    'We provide comprehensive solutions in Electrical & Automation, Architectural Design, and IT Services. Our expert team of engineers and designers work together to deliver innovative solutions that transform businesses.',
  paragraphs: [
    'Founded with a vision to provide comprehensive automation, IT, and architectural solutions, Reinforcement Group has grown to become a leading provider of integrated business solutions.',
  ],
  image: '/images/about-story.jpg',
  imageAlt: 'Reinforcement Group office and team',
  stats: [
    { value: '6+', label: 'Years of Experience' },
    { value: '100+', label: 'Projects Completed' },
    { value: '50+', label: 'Happy Clients' },
    { value: '3', label: 'Specialized Divisions' },
  ],
}

const defaultJourney: JourneyContent = {
  sectionTitle: 'Our Journey',
  sectionSubtitle: 'From 2018 to Today',
  milestones: [
    { year: '2018', event: 'Founded as Reinforcement Automation' },
    { year: '2019', event: 'Expanded automation services' },
    { year: '2020', event: 'Grew client base nationwide' },
    { year: '2021', event: 'Launched Architect View & IT Zone divisions' },
    { year: '2022', event: 'Major project completions' },
    { year: '2023', event: 'Continued growth and innovation' },
    { year: '2024', event: 'Strengthening market position' },
  ],
}

const defaultMission: MissionContent = {
  missionTitle: 'Our Mission',
  missionText:
    'To provide innovative and reliable electrical, automation, architectural, and IT solutions that exceed client expectations while maintaining the highest standards of quality and safety.',
  missionIcon: 'Target',
  visionTitle: 'Our Vision',
  visionText:
    'To be the leading integrated solutions provider in Bangladesh, recognized for excellence, innovation, and customer satisfaction across all our service areas.',
  visionIcon: 'Eye',
  goals: [],
}

const defaultValues: ValuesContent = {
  sectionTitle: 'Our Core Values',
  sectionSubtitle: 'The principles that guide everything we do',
  values: [
    { title: 'Excellence', description: 'We strive for excellence in every project, ensuring the highest quality standards.', icon: 'Award' },
    { title: 'Innovation', description: 'We embrace cutting-edge technologies and innovative approaches to solve challenges.', icon: 'Zap' },
    { title: 'Integrity', description: 'We operate with honesty and transparency in all our business dealings.', icon: 'CheckCircle' },
    { title: 'Customer Focus', description: 'We put our clients first, understanding their unique needs and delivering solutions.', icon: 'Users' },
  ],
}

const defaultTeam: AboutTeamContent = {
  sectionTitle: 'Meet Our Team',
  sectionSubtitle: 'Expert Engineers Driving Excellence',
  visibleCount: 0,
  members: [
    {
      id: '1',
      name: 'Engr. Md. Shariful Islam',
      position: 'Director',
      bio: 'Founder and Director of Reinforcement Group with extensive experience in electrical engineering and automation. Leading the company vision since 2018.',
      image: '/images/team/shariful.jpg',
      showImage: true,
      linkedin: '#',
      email: 'shariful@ragrpbd.com',
    },
    {
      id: '2',
      name: 'Engr. Gazi Monir-Uz-Zaman',
      position: 'Director',
      bio: 'Co-Director bringing strategic leadership and technical expertise to drive company growth and innovation in all three divisions.',
      image: '/images/team/monir.jpg',
      showImage: true,
      linkedin: '#',
      email: 'gazi@ragrpbd.com',
    },
    {
      id: '3',
      name: 'Ar. Miss. Sultana',
      position: 'Head of Design',
      bio: 'Leading the Reinforcement Architect View division with creative architectural designs and innovative visualization solutions.',
      image: '/images/team/sultana.jpg',
      showImage: true,
      linkedin: '#',
      email: 'sultana@ragrpbd.com',
    },
    {
      id: '4',
      name: 'Engr. Md. Sarful Hasan',
      position: 'Chief Advisor',
      bio: 'Providing strategic guidance and technical advisory services with years of industry experience in automation and electrical systems.',
      image: '/images/team/sarful.jpg',
      showImage: true,
      linkedin: '#',
      email: 'sarful@ragrpbd.com',
    },
  ],
}

const defaultDivisions: DivisionsContent = {
  sectionTitle: 'Our Three Divisions',
  sectionSubtitle: 'Comprehensive solutions under one roof',
  divisions: [
    {
      title: 'Reinforcement Automation',
      description:
        'Electrical & Automation equipment supply, installation, commissioning, and maintenance services for industrial clients.',
    },
    {
      title: 'Reinforcement Architect View',
      description:
        'Architectural design, electrical design, 3D modeling, and professional engineering services for buildings.',
    },
    {
      title: 'Reinforcement IT Zone',
      description:
        'Web development, mobile apps, cloud services, AI/ML solutions, and custom software development.',
    },
  ],
}

export default async function AboutPage() {
  const cms = await getPageContents('about', [...ABOUT_SECTIONS])
  const header = coercePageContent<HeaderContent>(cms['header'], defaultHeader)
  const story = coercePageContent<StoryContent>(cms['story'], defaultStory)
  const journey = coercePageContent<JourneyContent>(cms['journey'], defaultJourney)
  const mission = coercePageContent<MissionContent>(cms['mission'], defaultMission)
  const values = coercePageContent<ValuesContent>(cms['values'], defaultValues)
  const aboutTeam = coercePageContent<AboutTeamContent>(cms['team'], defaultTeam)
  const divisions = coercePageContent<DivisionsContent>(cms['divisions'], defaultDivisions)

  const heroBadge = story.stats?.[0] ?? defaultStory.stats[0]
  const MissionIcon = resolveLucideIcon(mission.missionIcon, Target)
  const VisionIcon = resolveLucideIcon(mission.visionIcon, Eye)

  const visibleCount = Math.max(
    0,
    Math.min(
      Number.isFinite(aboutTeam.visibleCount as number) ? (aboutTeam.visibleCount as number) : defaultTeam.visibleCount ?? 0,
      aboutTeam.members?.length ?? 0
    )
  )
  const members = (aboutTeam.members ?? []).map((m) => ({
    ...m,
    showImage: m.showImage !== false,
  }))
  const shownMembers = visibleCount ? members.slice(0, visibleCount) : members

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                {header.breadcrumbLabel || 'About Us'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {header.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {header.subtitle}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {story.description || story.paragraphs?.[0] || defaultStory.description}
              </p>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={header.backgroundImage || defaultHeader.backgroundImage}
                  alt="About Reinforcement Group"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">{heroBadge.value}</div>
                <div className="text-blue-100">{heroBadge.label}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(story.stats ?? defaultStory.stats).map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <Section background="white">
        <SectionHeader
          title={journey.sectionTitle}
          subtitle={journey.sectionSubtitle}
        />
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200" />
            
            <div className="space-y-8">
              {(journey.milestones ?? defaultJourney.milestones).map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                      <div className="text-blue-600 font-bold text-lg">{milestone.year}</div>
                      <div className="text-gray-600">{milestone.event}</div>
                    </div>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow" />
                  </div>
                  <div className="w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section background="gray">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-4">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                <MissionIcon className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{mission.missionTitle}</h2>
              <p className="text-gray-600 leading-relaxed">
                {mission.missionText}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-8 space-y-4">
              <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center">
                <VisionIcon className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{mission.visionTitle}</h2>
              <p className="text-gray-600 leading-relaxed">
                {mission.visionText}
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Our Values */}
      <Section background="white">
        <SectionHeader
          title={values.sectionTitle}
          subtitle={values.sectionSubtitle}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(values.values ?? defaultValues.values).map((value) => {
            const Icon = resolveLucideIcon(value.icon, Award)
            return (
            <Card key={value.title}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          )})}
        </div>
      </Section>

      {/* Team Section */}
      <Section background="gray" id="team">
        <SectionHeader
          title={aboutTeam.sectionTitle}
          subtitle={aboutTeam.sectionSubtitle}
        />
        <div className="grid justify-center gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,280px))]">
          {shownMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                {member.showImage && member.image ? (
                  <>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                )}

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
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className={`text-lg font-bold ${member.showImage && member.image ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className={`${member.showImage && member.image ? 'text-blue-300' : 'text-blue-600'} text-sm font-medium`}>
                    {member.position}
                  </p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Our Divisions */}
      <Section background="white">
        <SectionHeader
          title={divisions.sectionTitle}
          subtitle={divisions.sectionSubtitle}
        />
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-8 space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{divisions.divisions?.[0]?.title || defaultDivisions.divisions[0].title}</h3>
              <p className="text-gray-600">
                {divisions.divisions?.[0]?.description || defaultDivisions.divisions[0].description}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8 space-y-4">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{divisions.divisions?.[1]?.title || defaultDivisions.divisions[1].title}</h3>
              <p className="text-gray-600">
                {divisions.divisions?.[1]?.description || defaultDivisions.divisions[1].description}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-8 space-y-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{divisions.divisions?.[2]?.title || defaultDivisions.divisions[2].title}</h3>
              <p className="text-gray-600">
                {divisions.divisions?.[2]?.description || defaultDivisions.divisions[2].description}
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <CTASection />
    </>
  )
}

/* eslint-enable react-hooks/static-components */
