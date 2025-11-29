'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface PartnerLogo {
  src: string
  alt: string
}

interface PartnerLogosCarouselProps {
  title?: string
  subtitle?: string
  logos: PartnerLogo[]
  speed?: number // pixels per second
  direction?: 'left' | 'right'
  className?: string
}

export function PartnerLogosCarousel({
  title = 'Our Technology Partners',
  subtitle = 'Trusted by leading brands and organizations',
  logos,
  speed = 30,
  direction = 'left',
  className = ''
}: PartnerLogosCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const startAnimation = useCallback(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    // Wait a bit to ensure all images have their dimensions
    const scrollWidth = scrollElement.scrollWidth / 2

    if (scrollWidth <= 0) {
      // If scrollWidth is 0, try again shortly
      setTimeout(startAnimation, 100)
      return
    }

    const animate = () => {
      if (direction === 'left') {
        positionRef.current -= speed / 60
        if (Math.abs(positionRef.current) >= scrollWidth) {
          positionRef.current = 0
        }
      } else {
        positionRef.current += speed / 60
        if (positionRef.current >= scrollWidth) {
          positionRef.current = 0
        }
      }
      scrollElement.style.transform = `translateX(${positionRef.current}px)`
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [speed, direction])

  useEffect(() => {
    if (!isMounted) return

    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      startAnimation()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isMounted, startAnimation])

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

  if (!isMounted) {
    return null // Don't render on server
  }

  return (
    <section className={`py-16 bg-gray-50 overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

        <div
          ref={scrollRef}
          className="flex items-center gap-12 py-6 whitespace-nowrap"
          style={{ willChange: 'transform' }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex-shrink-0 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pre-configured carousels for each division
export function AutomationPartnersCarousel() {
  const automationLogos: PartnerLogo[] = Array.from({ length: 17 }, (_, i) => ({
    src: `/images/automation/${i + 1}.png`,
    alt: `Automation Partner ${i + 1}`
  }))

  return (
    <PartnerLogosCarousel
      title="Our Automation Partners"
      subtitle="Working with leading automation and industrial technology brands"
      logos={automationLogos}
      speed={25}
    />
  )
}

export function ITPartnersCarousel() {
  const itLogos: PartnerLogo[] = [
    { src: '/images/it/I1-removebg-preview.png', alt: 'IT Partner 1' },
    { src: '/images/it/I2-removebg-preview.png', alt: 'IT Partner 2' },
    { src: '/images/it/I3-removebg-preview.png', alt: 'IT Partner 3' },
    { src: '/images/it/I4-removebg-preview.png', alt: 'IT Partner 4' },
    { src: '/images/it/I5-removebg-preview.png', alt: 'IT Partner 5' },
    { src: '/images/it/I6.png', alt: 'IT Partner 6' },
    { src: '/images/it/I7.png', alt: 'IT Partner 7' },
    { src: '/images/it/I8-removebg-preview.png', alt: 'IT Partner 8' },
    { src: '/images/it/I9-removebg-preview.png', alt: 'IT Partner 9' },
    { src: '/images/it/I10-removebg-preview.png', alt: 'IT Partner 10' },
    { src: '/images/it/I11-removebg-preview.png', alt: 'IT Partner 11' },
    { src: '/images/it/I12-removebg-preview.png', alt: 'IT Partner 12' },
    { src: '/images/it/I13-removebg-preview.png', alt: 'IT Partner 13' },
    { src: '/images/it/I14-removebg-preview.png', alt: 'IT Partner 14' },
    { src: '/images/it/I15-removebg-preview.png', alt: 'IT Partner 15' },
  ]

  return (
    <PartnerLogosCarousel
      title="Our IT Partners"
      subtitle="Partnering with global technology leaders for innovative solutions"
      logos={itLogos}
      speed={30}
    />
  )
}

export function ArchitectPartnersCarousel() {
  // Using a mix of logos for architect partners
  const architectLogos: PartnerLogo[] = [
    { src: '/images/it/I16-removebg-preview.png', alt: 'Architecture Partner 1' },
    { src: '/images/it/I17-removebg-preview.png', alt: 'Architecture Partner 2' },
    { src: '/images/it/I19.png', alt: 'Architecture Partner 3' },
    { src: '/images/it/I20-removebg-preview.png', alt: 'Architecture Partner 4' },
    { src: '/images/it/I21.png', alt: 'Architecture Partner 5' },
    { src: '/images/it/I22-removebg-preview.png', alt: 'Architecture Partner 6' },
    { src: '/images/it/I23-removebg-preview.png', alt: 'Architecture Partner 7' },
    { src: '/images/it/I24-removebg-preview.png', alt: 'Architecture Partner 8' },
    { src: '/images/it/I25-removebg-preview.png', alt: 'Architecture Partner 9' },
    { src: '/images/it/I26-removebg-preview.png', alt: 'Architecture Partner 10' },
  ]

  return (
    <PartnerLogosCarousel
      title="Our Architecture Partners"
      subtitle="Collaborating with premier architectural and design brands"
      logos={architectLogos}
      speed={28}
    />
  )
}

// Combined carousel for homepage showing all partner types
export function AllPartnersCarousel() {
  const allLogos: PartnerLogo[] = [
    // Automation partners
    ...Array.from({ length: 8 }, (_, i) => ({
      src: `/images/automation/${i + 1}.png`,
      alt: `Partner ${i + 1}`
    })),
    // IT partners
    { src: '/images/it/I1-removebg-preview.png', alt: 'IT Partner 1' },
    { src: '/images/it/I2-removebg-preview.png', alt: 'IT Partner 2' },
    { src: '/images/it/I3-removebg-preview.png', alt: 'IT Partner 3' },
    { src: '/images/it/I4-removebg-preview.png', alt: 'IT Partner 4' },
    { src: '/images/it/I5-removebg-preview.png', alt: 'IT Partner 5' },
    { src: '/images/it/I6.png', alt: 'IT Partner 6' },
    { src: '/images/it/I7.png', alt: 'IT Partner 7' },
    { src: '/images/it/I8-removebg-preview.png', alt: 'IT Partner 8' },
  ]

  return (
    <PartnerLogosCarousel
      title="Our Technology Partners"
      subtitle="Trusted by leading brands across Automation, IT, and Architecture"
      logos={allLogos}
      speed={35}
    />
  )
}
