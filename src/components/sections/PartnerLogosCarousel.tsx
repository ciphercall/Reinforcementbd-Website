'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef(0)
  const [isMounted, setIsMounted] = useState(false)
  const isPausedRef = useRef(false)
  
  // Drag state
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollStartRef = useRef(0)
  const velocityRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  const getScrollWidth = useCallback(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return 0
    return scrollElement.scrollWidth / 2
  }, [])

  const normalizePosition = useCallback((pos: number) => {
    const scrollWidth = getScrollWidth()
    if (scrollWidth <= 0) return pos
    
    // Keep position within bounds for seamless loop
    while (pos > 0) {
      pos -= scrollWidth
    }
    while (pos < -scrollWidth) {
      pos += scrollWidth
    }
    return pos
  }, [getScrollWidth])

  const updatePosition = useCallback((newPosition: number) => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return
    
    positionRef.current = normalizePosition(newPosition)
    scrollElement.style.transform = `translateX(${positionRef.current}px)`
  }, [normalizePosition])

  const startAnimation = useCallback(function startAnimationImpl() {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const scrollWidth = getScrollWidth()

    if (scrollWidth <= 0) {
      setTimeout(startAnimationImpl, 100)
      return
    }

    const animate = () => {
      if (isPausedRef.current || isDraggingRef.current) {
        stopAnimation()
        return
      }
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
  }, [speed, direction, stopAnimation, getScrollWidth])

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true
    startXRef.current = e.clientX
    scrollStartRef.current = positionRef.current
    lastXRef.current = e.clientX
    lastTimeRef.current = Date.now()
    velocityRef.current = 0
    stopAnimation()
    
    // Change cursor
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing'
    }
  }, [stopAnimation])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    
    e.preventDefault()
    const deltaX = e.clientX - startXRef.current
    const newPosition = scrollStartRef.current + deltaX
    
    // Calculate velocity for momentum
    const now = Date.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      velocityRef.current = (e.clientX - lastXRef.current) / dt
    }
    lastXRef.current = e.clientX
    lastTimeRef.current = now
    
    updatePosition(newPosition)
  }, [updatePosition])

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return
    
    isDraggingRef.current = false
    
    // Reset cursor
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab'
    }
    
    // Apply momentum scrolling
    const velocity = velocityRef.current
    if (Math.abs(velocity) > 0.1) {
      let currentVelocity = velocity * 15 // Scale up for smoother feel
      
      const momentumAnimate = () => {
        if (isPausedRef.current && !isDraggingRef.current) {
          currentVelocity *= 0.95 // Friction
          
          if (Math.abs(currentVelocity) > 0.5) {
            updatePosition(positionRef.current + currentVelocity)
            requestAnimationFrame(momentumAnimate)
          }
        }
      }
      
      requestAnimationFrame(momentumAnimate)
    }
  }, [updatePosition])

  const handleMouseLeave = useCallback(() => {
    if (isDraggingRef.current) {
      handleMouseUp()
    }
    isPausedRef.current = false
    startAnimation()
  }, [handleMouseUp, startAnimation])

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDraggingRef.current = true
    startXRef.current = e.touches[0].clientX
    scrollStartRef.current = positionRef.current
    lastXRef.current = e.touches[0].clientX
    lastTimeRef.current = Date.now()
    velocityRef.current = 0
    stopAnimation()
  }, [stopAnimation])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return
    
    const deltaX = e.touches[0].clientX - startXRef.current
    const newPosition = scrollStartRef.current + deltaX
    
    // Calculate velocity
    const now = Date.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      velocityRef.current = (e.touches[0].clientX - lastXRef.current) / dt
    }
    lastXRef.current = e.touches[0].clientX
    lastTimeRef.current = now
    
    updatePosition(newPosition)
  }, [updatePosition])

  const handleTouchEnd = useCallback(() => {
    handleMouseUp()
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      if (!isDraggingRef.current) {
        isPausedRef.current = false
        startAnimation()
      }
    }, 3000)
  }, [handleMouseUp, startAnimation])

  // Arrow navigation
  const scrollByAmount = useCallback((amount: number) => {
    stopAnimation()
    isPausedRef.current = true
    
    const targetPosition = positionRef.current + amount
    const startPosition = positionRef.current
    const startTime = Date.now()
    const duration = 400 // ms
    
    const animateScroll = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentPosition = startPosition + (targetPosition - startPosition) * easeOut
      updatePosition(currentPosition)
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        // Resume auto-scroll after delay
        setTimeout(() => {
          isPausedRef.current = false
          startAnimation()
        }, 2000)
      }
    }
    
    requestAnimationFrame(animateScroll)
  }, [stopAnimation, updatePosition, startAnimation])

  const scrollLeft = useCallback(() => {
    scrollByAmount(300) // Scroll right (positive = move content right = see left items)
  }, [scrollByAmount])

  const scrollRight = useCallback(() => {
    scrollByAmount(-300) // Scroll left (negative = move content left = see right items)
  }, [scrollByAmount])

  useEffect(() => {
    if (!isMounted) return

    const timeoutId = setTimeout(() => {
      startAnimation()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      stopAnimation()
    }
  }, [isMounted, startAnimation, stopAnimation])

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

  if (!isMounted) {
    return null // Don't render on server
  }

  return (
    <section
      className={`py-16 bg-gray-50 overflow-hidden ${className}`}
      onMouseEnter={() => {
        isPausedRef.current = true
        stopAnimation()
      }}
      onMouseLeave={handleMouseLeave}
    >
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
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-gray-700 hover:text-primary p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-gray-700 hover:text-primary p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          className="cursor-grab select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={scrollRef}
            className="flex items-center gap-8 md:gap-12 py-6 whitespace-nowrap px-12 md:px-16"
            style={{ willChange: 'transform' }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.src}-${index}`}
                className="relative z-0 flex-shrink-0 bg-white rounded-xl shadow-sm p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:scale-110 hover:z-10"
              >
                <div className="relative w-24 h-16 md:w-32 md:h-20 overflow-hidden">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain pointer-events-none"
                    sizes="128px"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
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
