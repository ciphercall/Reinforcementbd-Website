import { Metadata } from 'next'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Target, Eye, Award, Users, Zap, CheckCircle, Linkedin, Mail } from 'lucide-react'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Reinforcement Group - Your trusted partner for Electrical & Automation, Architectural Design, and IT Solutions since 2018.',
}

const stats = [
  { value: '6+', label: 'Years of Experience' },
  { value: '100+', label: 'Projects Completed' },
  { value: '50+', label: 'Happy Clients' },
  { value: '3', label: 'Specialized Divisions' },
]

const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in every project, ensuring the highest quality standards.',
    icon: Award
  },
  {
    title: 'Innovation',
    description: 'We embrace cutting-edge technologies and innovative approaches to solve challenges.',
    icon: Zap
  },
  {
    title: 'Integrity',
    description: 'We operate with honesty and transparency in all our business dealings.',
    icon: CheckCircle
  },
  {
    title: 'Customer Focus',
    description: 'We put our clients first, understanding their unique needs and delivering solutions.',
    icon: Users
  },
]

const team = [
  {
    name: 'Engr. Md. Shariful Islam',
    position: 'Director',
    bio: 'Founder and Director of Reinforcement Group with extensive experience in electrical engineering and automation. Leading the company vision since 2018.',
    image: '/images/team/shariful.jpg',
    linkedin: '#',
    email: 'shariful@ragrpbd.com'
  },
  {
    name: 'Engr. Gazi Monir-Uz-Zaman',
    position: 'Director',
    bio: 'Co-Director bringing strategic leadership and technical expertise to drive company growth and innovation in all three divisions.',
    image: '/images/team/monir.jpg',
    linkedin: '#',
    email: 'gazi@ragrpbd.com'
  },
  {
    name: 'Ar. Miss. Sultana',
    position: 'Head of Design',
    bio: 'Leading the Reinforcement Architect View division with creative architectural designs and innovative visualization solutions.',
    image: '/images/team/sultana.jpg',
    linkedin: '#',
    email: 'sultana@ragrpbd.com'
  },
  {
    name: 'Engr. Md. Sarful Hasan',
    position: 'Chief Advisor',
    bio: 'Providing strategic guidance and technical advisory services with years of industry experience in automation and electrical systems.',
    image: '/images/team/sarful.jpg',
    linkedin: '#',
    email: 'sarful@ragrpbd.com'
  },
  {
    name: 'Engr. Md. Selim Reza',
    position: 'Senior Engineer',
    bio: 'Expert in automation and electrical systems with hands-on project execution experience.',
    image: '/images/team/selim.jpg',
    linkedin: '#',
    email: 'selim@ragrpbd.com'
  },
  {
    name: 'Pulok Kumar',
    position: 'IT Specialist',
    bio: 'Leading IT solutions development with expertise in web and software development.',
    image: '/images/team/pulok.jpg',
    linkedin: '#',
    email: 'pulok@ragrpbd.com'
  },
  {
    name: 'Sarowar Hossain',
    position: 'Technical Engineer',
    bio: 'Specialized in technical implementations and project coordination.',
    image: '/images/team/sarowar.jpg',
    linkedin: '#',
    email: 'sarowar@ragrpbd.com'
  }
]

const milestones = [
  { year: '2018', event: 'Founded as Reinforcement Automation' },
  { year: '2019', event: 'Expanded automation services' },
  { year: '2020', event: 'Grew client base nationwide' },
  { year: '2021', event: 'Launched Architect View & IT Zone divisions' },
  { year: '2022', event: 'Major project completions' },
  { year: '2023', event: 'Continued growth and innovation' },
  { year: '2024', event: 'Strengthening market position' },
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
                Your Vision, Our Expertise
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Reinforcement Group started its journey in 2018 as "Reinforcement Automation" 
                and has grown to become a diversified company with three specialized divisions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We provide comprehensive solutions in Electrical & Automation, Architectural Design, 
                and IT Services. Our expert team of engineers and designers work together to deliver 
                innovative solutions that transform businesses.
              </p>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/automation/1.png"
                  alt="About Reinforcement Group"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">6+</div>
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

      {/* Our Journey */}
      <Section background="white">
        <SectionHeader
          title="Our Journey"
          subtitle="From 2018 to Today"
        />
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
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
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide innovative and reliable electrical, automation, architectural, 
                and IT solutions that exceed client expectations while maintaining the 
                highest standards of quality and safety.
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
                To be the leading integrated solutions provider in Bangladesh, 
                recognized for excellence, innovation, and customer satisfaction 
                across all our service areas.
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
          title="Meet Our Team"
          subtitle="Expert Engineers Driving Excellence"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-blue-300 text-sm font-medium">{member.position}</p>
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
          title="Our Three Divisions"
          subtitle="Comprehensive solutions under one roof"
        />
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-8 space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Reinforcement Automation</h3>
              <p className="text-gray-600">
                Electrical & Automation equipment supply, installation, commissioning, 
                and maintenance services for industrial clients.
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
              <h3 className="text-xl font-bold text-gray-900">Reinforcement Architect View</h3>
              <p className="text-gray-600">
                Architectural design, electrical design, 3D modeling, and professional 
                engineering services for buildings.
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
              <h3 className="text-xl font-bold text-gray-900">Reinforcement IT Zone</h3>
              <p className="text-gray-600">
                Web development, mobile apps, cloud services, AI/ML solutions, 
                and custom software development.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
