import { Metadata } from 'next'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { CTASection } from '@/components/sections/CTASection'
import { getPageContents } from '@/lib/pageContent'
import { coercePageContent } from '@/lib/utils/pageContent'
import { resolveLucideIcon } from '@/lib/utils/lucideIcon'
import prisma from '@/lib/db/prisma'
import { Globe, Handshake, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Partners',
  description: 'Explore Reinforcement Group strategic partnerships with technology and industry leaders.',
}

export const dynamic = 'force-dynamic'

interface PartnersHeaderContent {
  title: string
  subtitle: string
  breadcrumbLabel: string
  backgroundImage: string
}

interface PartnerBenefit {
  title: string
  description: string
  icon: string
}

interface PartnersBenefitsContent {
  title: string
  subtitle: string
  benefits: PartnerBenefit[]
}

const defaultHeader: PartnersHeaderContent = {
  title: 'Our Global Partners',
  subtitle: 'Collaborating with industry leaders to deliver exceptional value and expanded capabilities to our clients.',
  breadcrumbLabel: 'Partners',
  backgroundImage: '/images/partners-hero.jpg',
}

const defaultBenefits: PartnersBenefitsContent = {
  title: 'Benefits of Our Partnerships',
  subtitle: 'What our strategic alliances mean for you',
  benefits: [
    {
      title: 'Global Reach',
      description: 'Access international talent pools and markets through our extended partner network.',
      icon: 'Globe',
    },
    {
      title: 'Specialized Expertise',
      description: 'Benefit from combined expertise in specialized areas like vocational training and migration.',
      icon: 'Award',
    },
    {
      title: 'Seamless Solutions',
      description: 'Experience integrated services that combine the strengths of multiple organizations.',
      icon: 'Handshake',
    },
  ],
}

export default async function PartnersPage() {
  const cms = await getPageContents('partners', ['header', 'benefits'])
  const header = coercePageContent<PartnersHeaderContent>(cms['header'], defaultHeader)
  const benefitsContent = coercePageContent<PartnersBenefitsContent>(cms['benefits'], defaultBenefits)

  const partners = await prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-40 pb-20 md:pb-32 bg-gradient-to-br from-blue-950 via-gray-900 to-gray-800 text-white overflow-hidden">
        {header.backgroundImage ? (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={header.backgroundImage}
              alt="Partners background"
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : null}
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNiA2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNnptMCA0YzEuMTA1IDAgMiAuODk1IDIgMnMtLjg5NSAyLTIgMi0yLS44OTUtMi0yIC44OTUtMiAyLTJ6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-4 hover:bg-white/15 transition-all">
              <Handshake className="w-5 h-5 text-blue-300" />
              <span className="text-blue-100">{header.breadcrumbLabel || 'Strategic Partnerships'}</span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
              {header.title || defaultHeader.title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {header.subtitle || defaultHeader.subtitle}
            </p>

            {/* Stats or decorative elements */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{partners.length}+</div>
                <div className="text-sm text-gray-400">Global Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">15+</div>
                <div className="text-sm text-gray-400">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-400">Joint Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 50L60 45C120 40 240 30 360 28.3C480 26.7 600 33.3 720 38.3C840 43.3 960 46.7 1080 45C1200 43.3 1320 36.7 1380 33.3L1440 30V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Partners Section */}
      <Section background="gray">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Building success together with industry-leading organizations worldwide
          </p>
        </div>

        <div className="space-y-12">
          {partners.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-16 text-center">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 font-medium mb-2">No partners yet</p>
                <p className="text-gray-500">Check back soon for our strategic partnerships</p>
              </CardContent>
            </Card>
          ) : (
            partners.map((partner, index) => (
              <div 
                key={partner.id}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
                  <div className={`grid lg:grid-cols-5 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Image/Logo Side - Enhanced */}
                    <div className={`relative lg:col-span-2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-8 sm:p-12 lg:p-16 flex items-center justify-center overflow-hidden ${index % 2 === 1 ? 'lg:col-start-4' : ''}`}>
                      {/* Background Image with parallax effect */}
                      {partner.backgroundImage ? (
                        <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-700">
                          <Image
                            src={partner.backgroundImage}
                            alt={`${partner.name} background`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      
                      {/* Gradient overlay with animation */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 via-blue-700/85 to-purple-700/85 group-hover:from-blue-600/75 group-hover:via-blue-700/75 group-hover:to-purple-700/75 transition-all duration-500" />
                      
                      {/* Decorative elements */}
                      <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                      </div>

                      <div className="relative text-center text-white space-y-6 z-10">
                        {/* Logo with enhanced styling */}
                        <div className="relative mx-auto w-32 h-32 lg:w-40 lg:h-40">
                          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                          <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500 p-4">
                            {partner.logo ? (
                              <Image
                                src={partner.logo}
                                alt={partner.name}
                                width={120}
                                height={120}
                                className="object-contain"
                              />
                            ) : (
                              <Globe className="w-16 h-16 text-blue-600" />
                            )}
                          </div>
                        </div>
                        
                        {/* Partner name and location */}
                        <div className="space-y-2">
                          <h3 className="text-2xl lg:text-3xl font-bold drop-shadow-lg">{partner.name}</h3>
                          {partner.location && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                              <Globe className="w-4 h-4" />
                              <span className="text-sm font-medium">{partner.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content Side - Enhanced */}
                    <CardContent className={`lg:col-span-3 p-8 lg:p-12 space-y-8 bg-white ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      {/* About section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
                          <h3 className="text-2xl font-bold text-gray-900">About {partner.name}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {partner.description}
                        </p>
                      </div>

                      {/* Partnership section with enhanced styling */}
                      <div className="relative group/card">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 lg:p-8 border border-blue-100 group-hover/card:border-blue-200 transition-all duration-300">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                              <Handshake className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-blue-900 mb-2">Our Partnership</h4>
                              <p className="text-gray-700 leading-relaxed">
                                {partner.partnership}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Website link with enhanced styling */}
                      {partner.website && partner.website !== '#' && (
                        <div>
                          <a 
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                          >
                            <span>Visit {partner.name}</span>
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      </Section>

      {/* Partnership Benefits */}
      <Section background="white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {benefitsContent.title || defaultBenefits.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {benefitsContent.subtitle || defaultBenefits.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(Array.isArray(benefitsContent.benefits) ? benefitsContent.benefits : defaultBenefits.benefits).map((benefit, idx) => {
            const Icon = resolveLucideIcon(benefit.icon, Globe)
            return (
              <div
                key={benefit.title}
                className="group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>

                    {/* Decorative line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-3/4 transition-all duration-500 rounded-full" />
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </Section>

      <CTASection />
    </>
  )
}
