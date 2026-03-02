import { getPageContent } from '@/lib/pageContent'
import { coercePageContent } from '@/lib/utils/pageContent'
import {
  defaultSharedClientsCarouselContent,
  normalizeSharedClientsCarouselContent,
  SharedClientsCarouselContent,
} from '@/lib/defaults/sharedClientsCarousel'
import { PartnerLogosCarousel } from '@/components/sections/PartnerLogosCarousel'

const PAGE_KEY = 'shared-clients-carousel'
const SECTION_KEY = 'carousel'

export async function SharedClientsCarouselSection({ className = '' }: { className?: string }) {
  const cms = await getPageContent(PAGE_KEY, SECTION_KEY)
  const coerced = coercePageContent<SharedClientsCarouselContent>(cms, defaultSharedClientsCarouselContent)
  const content = normalizeSharedClientsCarouselContent(coerced)

  return (
    <PartnerLogosCarousel
      title={content.title}
      subtitle={content.subtitle}
      logos={content.logos}
      speed={content.speed}
      className={className}
    />
  )
}