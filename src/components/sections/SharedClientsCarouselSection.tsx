import { getPageContent } from '@/lib/pageContent'
import { unstable_noStore as noStore } from 'next/cache'
import Image from 'next/image'
import { coercePageContent } from '@/lib/utils/pageContent'
import {
  defaultSharedClientsCarouselContent,
  normalizeSharedClientsCarouselContent,
  SharedClientsCarouselContent,
} from '@/lib/defaults/sharedClientsCarousel'

const PAGE_KEY = 'shared-clients-carousel'
const SECTION_KEY = 'carousel'

export async function SharedClientsCarouselSection({ className = '' }: { className?: string }) {
  noStore()
  const cms = await getPageContent(PAGE_KEY, SECTION_KEY)
  const coerced = coercePageContent<SharedClientsCarouselContent>(cms, defaultSharedClientsCarouselContent)
  const content = normalizeSharedClientsCarouselContent(coerced)

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {content.logos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="group relative rounded-2xl border border-gray-200 bg-white p-5 md:p-6 h-32 md:h-36 flex items-center justify-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:to-blue-100/50 transition-colors duration-300" />
              <div className="relative w-full h-16 md:h-20">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 40vw, (max-width: 1024px) 28vw, 18vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}