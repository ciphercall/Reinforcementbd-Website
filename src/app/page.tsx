import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { WhyMarshSection } from '@/components/sections/WhyMarshSection'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { ClientsSection } from '@/components/sections/ClientsSection'
import { CTASection } from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <WhyMarshSection />
      <IndustriesSection />
      <TestimonialsSection />
      <TeamSection />
      <ClientsSection />
      <CTASection />
    </>
  )
}
