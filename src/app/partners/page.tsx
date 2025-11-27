import { Metadata } from 'next'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { CTASection } from '@/components/sections/CTASection'
import { Globe, Award, Handshake, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Partners',
  description: 'Explore MARSH Services strategic partnerships with global organizations like Next Global and KI Training & Assessing.',
}

const partners = [
  {
    name: 'Next Global',
    location: 'Perth, Australia',
    logo: '/images/partners/next-global.png',
    description: 'Next Global is an international recruitment, relocation, and advisory agency based in Perth. They specialize in sourcing global talent for Australian businesses, managing visa and migration support, and delivering end-to-end relocation services—from accommodation and transport to banking and cultural orientation.',
    partnership: 'MARSH Services is partnering with Next Global to expand our reach in global talent acquisition and relocation support. Through this collaboration, MARSH provides recruitment expertise and managed services, while Next Global delivers migration, relocation logistics, and advisory capabilities—together offering a seamless international staffing solution for clients across Australia and beyond.',
    website: '#'
  },
  {
    name: 'KI Training & Assessing',
    location: 'Belmont, Perth, Australia',
    logo: '/images/partners/ki-training.png',
    description: 'Based in Belmont, Perth, KI Training & Assessing (RTO 52593) delivers nationally accredited, high-risk work training and vocational certifications tailored for the mining, civil, and industrial sectors. Established in 2013, they provide flexible training—including mobile plant operation, safety licensing, and site-based courses—through experienced trainers and industry-grade facilities.',
    partnership: 'MARSH Services is teaming up with KI to offer clients a powerful blend of corporate training and vocational certification. We bring together our HR outsourcing and managed services expertise with KI\'s industry-recognized technical training. This collaboration ensures end-to-end workforce development—from onboarding to upskilling certified professionals—especially for organizations in mining, civil, and industrial domains.',
    website: '#'
  }
]

export default function PartnersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4">
              <Handshake className="w-4 h-4 mr-2" />
              Strategic Partnerships
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Our Global Partners
            </h1>
            <p className="text-xl text-gray-300">
              Collaborating with industry leaders to deliver exceptional 
              value and expanded capabilities to our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <Section background="gray">
        <div className="space-y-16">
          {partners.map((partner, index) => (
            <Card key={partner.name} className="overflow-hidden">
              <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image/Logo Side */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-12 flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto">
                      <Globe className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold">{partner.name}</h3>
                    <p className="text-blue-100">{partner.location}</p>
                  </div>
                </div>

                {/* Content Side */}
                <CardContent className="p-8 lg:p-12 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">About {partner.name}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <Handshake className="w-5 h-5 mr-2" />
                      Our Partnership
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {partner.partnership}
                    </p>
                  </div>

                  {partner.website !== '#' && (
                    <a 
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Partnership Benefits */}
      <Section background="white">
        <SectionHeader
          title="Benefits of Our Partnerships"
          subtitle="What our strategic alliances mean for you"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Global Reach',
              description: 'Access international talent pools and markets through our extended partner network.',
              icon: Globe
            },
            {
              title: 'Specialized Expertise',
              description: 'Benefit from combined expertise in specialized areas like vocational training and migration.',
              icon: Award
            },
            {
              title: 'Seamless Solutions',
              description: 'Experience integrated services that combine the strengths of multiple organizations.',
              icon: Handshake
            }
          ].map((benefit) => (
            <Card key={benefit.title}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  )
}
