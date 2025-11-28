import { Metadata } from 'next'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { CTASection } from '@/components/sections/CTASection'
import { Globe, Award, Handshake, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Partners',
  description: 'Explore Reinforcement Group strategic partnerships with technology and industry leaders.',
}

const partners = [
  {
    name: 'Siemens Bangladesh',
    location: 'Dhaka, Bangladesh',
    logo: '/images/partners/siemens.png',
    description: 'Siemens is a global technology powerhouse that has stood for engineering excellence, innovation, quality, reliability and internationality. Siemens provides automation solutions, drives, motors, and industrial software for various industries.',
    partnership: 'Reinforcement Group partners with Siemens Bangladesh to provide cutting-edge PLC programming, SCADA systems, and industrial automation solutions. Through this collaboration, we deliver Siemens S7 series programming expertise and integrate their automation products into comprehensive solutions for manufacturing and industrial clients.',
    website: '#'
  },
  {
    name: 'Schneider Electric',
    location: 'Dhaka, Bangladesh',
    logo: '/images/partners/schneider.png',
    description: 'Schneider Electric is the global specialist in energy management and automation. With operations in more than 100 countries, Schneider offers integrated solutions across multiple market segments including energy, infrastructure, industrial processes, building automation and data centers.',
    partnership: 'Reinforcement Group collaborates with Schneider Electric to implement advanced building automation systems, energy management solutions, and industrial control systems. We leverage Schneider\'s Modicon PLC series and EcoStruxure platform to deliver smart building and industrial automation projects.',
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
