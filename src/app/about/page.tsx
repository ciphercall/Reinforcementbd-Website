import { Metadata } from 'next'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Target, Eye, Award, Users, Clock, CheckCircle, Linkedin, Mail } from 'lucide-react'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about MARSH Services & Outsourcing - Your trusted partner for strategic growth with 12+ years of experience across diverse industries.',
}

const stats = [
  { value: '12+', label: 'Years of Experience' },
  { value: '90%', label: 'Client Retention' },
  { value: '20+', label: 'Industries Served' },
  { value: '500+', label: 'Clients Served' },
]

const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in every service we deliver, ensuring the highest quality standards.',
    icon: Award
  },
  {
    title: 'Reliability',
    description: 'Our clients trust us because we consistently deliver on our promises and commitments.',
    icon: CheckCircle
  },
  {
    title: 'Innovation',
    description: 'We embrace innovation and forward-thinking approaches to solve complex business challenges.',
    icon: Target
  },
  {
    title: 'Partnership',
    description: 'We build lasting partnerships with our clients, understanding their unique needs and goals.',
    icon: Users
  },
]

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

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Your Trusted Partner for Strategic Growth
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                MARSH Services and Outsourcing is a global talent and business solutions 
                provider specializing in recruitment, managed services, payroll, IT services 
                and remote staffing.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We empower businesses to scale efficiently by delivering tailored support, 
                expert talent, and seamless operational execution—enabling our clients to 
                focus on growth, innovation, and strategic priorities.
              </p>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/profile/2.jpg"
                  alt="About MARSH Services"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">12+</div>
                <div className="text-blue-100">Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
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

      {/* Mission & Vision */}
      <Section background="gray">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-4">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To empower our clients through exceptional managed support, driven by 
                the expertise, dedication, and innovation of our world-class team.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-8 space-y-4">
              <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To build a seamless, nationwide business ecosystem that fuels growth, 
                sparks innovation, and delivers transformative impact across every industry.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Our Values */}
      <Section background="white">
        <SectionHeader
          title="Our Core Values"
          subtitle="The principles that guide everything we do"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <value.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section background="gray" id="team">
        <SectionHeader
          title="Meet Our Leadership"
          subtitle="The team behind your success"
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* What Sets Us Apart */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Sets Us Apart
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            What sets us apart? It's our people. Our team blends seasoned experts with 
            fresh, forward-thinking talent, combining deep industry knowledge with 
            innovative strategies. This synergy allows us to deliver customized, 
            high-impact solutions that address your current needs while preparing 
            your business for tomorrow.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            From agile startups to local conglomerates, companies trust MARSH Services 
            for our reliability, adaptability, and results-driven approach.
          </p>
          <p className="text-xl font-semibold text-blue-600">
            Let us be the partner that helps write your next success story.
          </p>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
