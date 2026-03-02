export interface ServicesWorkGalleryImage {
  src: string
  alt: string
}

export interface ServicesWorkGalleryContent {
  title: string
  subtitle: string
  images: ServicesWorkGalleryImage[]
}

export const defaultServicesWorkGalleryContent: ServicesWorkGalleryContent = {
  title: 'Our Work',
  subtitle: 'A glimpse of our projects and installations',
  images: Array.from({ length: 8 }, (_, i) => ({
    src: `/images/automation/${i + 1}.png`,
    alt: `Project ${i + 1}`,
  })),
}

export function normalizeServicesWorkGalleryContent(
  input: ServicesWorkGalleryContent
): ServicesWorkGalleryContent {
  const merged = {
    ...defaultServicesWorkGalleryContent,
    ...(input ?? {}),
  }

  const images = Array.isArray(merged.images)
    ? merged.images
      .filter((item) => Boolean(item?.src))
      .map((item, index) => ({
        src: item.src,
        alt: item.alt || `Project ${index + 1}`,
      }))
    : defaultServicesWorkGalleryContent.images

  return {
    title: merged.title || defaultServicesWorkGalleryContent.title,
    subtitle: merged.subtitle || defaultServicesWorkGalleryContent.subtitle,
    images: images.length > 0 ? images : defaultServicesWorkGalleryContent.images,
  }
}
