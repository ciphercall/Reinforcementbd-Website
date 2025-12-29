import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { WhyReinforcementSection } from '@/components/sections/WhyReinforcementSection'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { AllPartnersCarousel } from '@/components/sections/PartnerLogosCarousel'
import { CTASection } from '@/components/sections/CTASection'
import { getPageContents } from '@/lib/pageContent'

export const dynamic = 'force-dynamic'

const HOME_SECTIONS = [
  'hero',
  'features',
  'about-preview',
  'services-preview',
  'process',
  'why-us',
  'industries-preview',
  'cta'
] as const

export default async function HomePage() {
  const cms = await getPageContents('home', [...HOME_SECTIONS])

  return (
    <>
      <HeroSection content={cms['hero']} />
      <FeaturesSection content={cms['features']} />
      <AboutSection content={cms['about-preview']} />
      <ServicesSection content={cms['services-preview']} />
      <ProcessSection content={cms['process']} />
      <WhyReinforcementSection content={cms['why-us']} />
      <IndustriesSection content={cms['industries-preview']} />
      <AllPartnersCarousel />
      <CTASection content={cms['cta']} />
    </>
  )
}
