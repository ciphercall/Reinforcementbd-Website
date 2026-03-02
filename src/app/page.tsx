import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { WhyReinforcementSection } from '@/components/sections/WhyReinforcementSection'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { ClientsSection } from '@/components/sections/ClientsSection'
import { SharedClientsCarouselSection } from '@/components/sections/SharedClientsCarouselSection'
import { CTASection } from '@/components/sections/CTASection'
import { getPageContents } from '@/lib/pageContent'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

const HOME_SECTIONS = [
  'hero',
  'features',
  'about-preview',
  'services-preview',
  'process',
  'why-us',
  'industries-preview',
  'testimonials-preview',
  'team-preview',
  'clients',
  'cta'
] as const

async function getVisibilitySettings() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'homepage_visibility' }
    })
    
    if (!setting) {
      return {
        hero: true,
        features: true,
        'about-preview': true,
        'services-preview': true,
        process: true,
        'why-us': true,
        'industries-preview': true,
        'testimonials-preview': false,
        'team-preview': false,
        clients: false,
        cta: true,
      }
    }
    
    const visibility = typeof setting.value === 'string' 
      ? JSON.parse(setting.value) 
      : setting.value
    
    return {
      hero: visibility.hero ?? true,
      features: visibility.features ?? true,
      'about-preview': visibility['about-preview'] ?? true,
      'services-preview': visibility['services-preview'] ?? true,
      process: visibility.process ?? true,
      'why-us': visibility['why-us'] ?? true,
      'industries-preview': visibility['industries-preview'] ?? true,
      'testimonials-preview': visibility['testimonials-preview'] ?? false,
      'team-preview': visibility['team-preview'] ?? false,
      clients: visibility.clients ?? false,
      cta: visibility.cta ?? true,
    }
  } catch {
    return {
      hero: true,
      features: true,
      'about-preview': true,
      'services-preview': true,
      process: true,
      'why-us': true,
      'industries-preview': true,
      'testimonials-preview': false,
      'team-preview': false,
      clients: false,
      cta: true,
    }
  }
}

export default async function HomePage() {
  const cms = await getPageContents('home', [...HOME_SECTIONS])
  const visibility = await getVisibilitySettings()

  return (
    <>
      {visibility.hero && <HeroSection content={cms['hero']} />}
      {visibility.features && <FeaturesSection content={cms['features']} />}
      {visibility['about-preview'] && <AboutSection content={cms['about-preview']} />}
      {visibility['services-preview'] && <ServicesSection content={cms['services-preview']} />}
      {visibility.process && <ProcessSection content={cms['process']} />}
      {visibility['why-us'] && <WhyReinforcementSection content={cms['why-us']} />}
      {visibility['industries-preview'] && <IndustriesSection content={cms['industries-preview']} />}
      {visibility['testimonials-preview'] && <TestimonialsSection content={cms['testimonials-preview']} />}
      {visibility['team-preview'] && <TeamSection content={cms['team-preview']} />}
      {visibility.clients && <ClientsSection content={cms['clients']} />}
      <SharedClientsCarouselSection />
      {visibility.cta && <CTASection content={cms['cta']} />}
    </>
  )
}
