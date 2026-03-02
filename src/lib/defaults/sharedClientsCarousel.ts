export interface SharedClientLogo {
  src: string
  alt: string
}

export interface SharedClientsCarouselContent {
  title: string
  subtitle: string
  speed: number
  logos: SharedClientLogo[]
}

const automationLogos: SharedClientLogo[] = Array.from({ length: 17 }, (_, i) => ({
  src: `/images/automation/${i + 1}.png`,
  alt: `Automation Client ${i + 1}`,
}))

const itLogos: SharedClientLogo[] = [
  { src: '/images/it/I1-removebg-preview.png', alt: 'IT Client 1' },
  { src: '/images/it/I2-removebg-preview.png', alt: 'IT Client 2' },
  { src: '/images/it/I3-removebg-preview.png', alt: 'IT Client 3' },
  { src: '/images/it/I4-removebg-preview.png', alt: 'IT Client 4' },
  { src: '/images/it/I5-removebg-preview.png', alt: 'IT Client 5' },
  { src: '/images/it/I6.png', alt: 'IT Client 6' },
  { src: '/images/it/I7.png', alt: 'IT Client 7' },
  { src: '/images/it/I8-removebg-preview.png', alt: 'IT Client 8' },
  { src: '/images/it/I9-removebg-preview.png', alt: 'IT Client 9' },
  { src: '/images/it/I10-removebg-preview.png', alt: 'IT Client 10' },
  { src: '/images/it/I11-removebg-preview.png', alt: 'IT Client 11' },
  { src: '/images/it/I12-removebg-preview.png', alt: 'IT Client 12' },
  { src: '/images/it/I13-removebg-preview.png', alt: 'IT Client 13' },
  { src: '/images/it/I14-removebg-preview.png', alt: 'IT Client 14' },
  { src: '/images/it/I15-removebg-preview.png', alt: 'IT Client 15' },
  { src: '/images/it/I16-removebg-preview.png', alt: 'Architecture Client 1' },
  { src: '/images/it/I17-removebg-preview.png', alt: 'Architecture Client 2' },
  { src: '/images/it/I19.png', alt: 'Architecture Client 3' },
  { src: '/images/it/I20-removebg-preview.png', alt: 'Architecture Client 4' },
  { src: '/images/it/I21.png', alt: 'Architecture Client 5' },
  { src: '/images/it/I22-removebg-preview.png', alt: 'Architecture Client 6' },
  { src: '/images/it/I23-removebg-preview.png', alt: 'Architecture Client 7' },
  { src: '/images/it/I24-removebg-preview.png', alt: 'Architecture Client 8' },
  { src: '/images/it/I25-removebg-preview.png', alt: 'Architecture Client 9' },
  { src: '/images/it/I26-removebg-preview.png', alt: 'Architecture Client 10' },
]

const dedupeBySrc = (logos: SharedClientLogo[]) => {
  const seen = new Set<string>()
  return logos.filter((logo) => {
    if (!logo.src || seen.has(logo.src)) return false
    seen.add(logo.src)
    return true
  })
}

export const defaultSharedClientsCarouselContent: SharedClientsCarouselContent = {
  title: 'Our trusted Clients',
  subtitle: 'Trusted by leading brands and organizations',
  speed: 30,
  logos: dedupeBySrc([...automationLogos, ...itLogos]),
}

export function normalizeSharedClientsCarouselContent(
  input: SharedClientsCarouselContent
): SharedClientsCarouselContent {
  const merged = {
    ...defaultSharedClientsCarouselContent,
    ...(input ?? {}),
  }

  const speed = Number.isFinite(merged.speed) ? Math.min(80, Math.max(10, merged.speed)) : defaultSharedClientsCarouselContent.speed
  const logos = Array.isArray(merged.logos)
    ? merged.logos.filter((logo) => Boolean(logo?.src)).map((logo, index) => ({
      src: logo.src,
      alt: logo.alt || `Client ${index + 1}`,
    }))
    : defaultSharedClientsCarouselContent.logos

  return {
    title: merged.title || defaultSharedClientsCarouselContent.title,
    subtitle: merged.subtitle || defaultSharedClientsCarouselContent.subtitle,
    speed,
    logos: logos.length > 0 ? logos : defaultSharedClientsCarouselContent.logos,
  }
}