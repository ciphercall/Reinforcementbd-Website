'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { coercePageContent } from '@/lib/utils/pageContent'

interface HeroContent {
  headline: string
  subheadline: string
  tagline: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  backgroundImage: string
  images?: string[]
  displayMode?: 'carousel' | 'video'
  videoUrl?: string
  stats: { label: string; value: string }[]
}

const defaultContent: HeroContent = {
  headline: 'Welcome to Reinforcement Group',
  subheadline: 'Automation | Architecture | IT Solutions',
  tagline:
    'Your Vision, Our Expertise. We specialize in Electrical & Automation, Architectural Design, and IT Solutions including Web, Mobile, AI/ML, and Cloud Services.',
  primaryButtonText: 'Schedule a Discovery Call',
  primaryButtonLink: '/contact',
  secondaryButtonText: 'Explore Our Services',
  secondaryButtonLink: '/services',
  backgroundImage: '/images/automation/1.png',
  images: ['/images/automation/1.png', '/images/automation/2.png', '/images/it/I33.jfif'],
  displayMode: 'carousel',
  videoUrl: '',
  stats: [
    { label: 'Years Experience', value: '6+' },
    { label: 'Projects Done', value: '100+' },
    { label: 'Happy Clients', value: '50+' }
  ]
}

export function HeroSection({ content }: { content?: unknown }) {
  const c = coercePageContent<HeroContent>(content, defaultContent)
  const heroImage = c.backgroundImage || defaultContent.backgroundImage
  const isVideoMode = c.displayMode === 'video' && Boolean(c.videoUrl)

  const images = useMemo(() => {
    const raw = Array.isArray(c.images) ? c.images.filter(Boolean) : []
    const base = raw.length
      ? raw
      : heroImage
        ? [heroImage]
        : [defaultContent.backgroundImage]

    const normalized = base.slice(0, 3)
    while (normalized.length < 3) normalized.push(defaultContent.backgroundImage)
    return normalized
  }, [c.images, heroImage])

  const [activeIndex, setActiveIndex] = useState(0)
  const next = () => setActiveIndex((i) => (i + 1) % images.length)
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length)
  const wheelLockRef = useRef(false)

  const variants = {
    left: {
      x: -190,
      y: 28,
      rotate: -18,
      scale: 0.92,
      opacity: 0.38,
      filter: 'blur(1.5px)',
      zIndex: 1,
    },
    center: {
      x: 0,
      y: 0,
      rotate: -3,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 3,
    },
    right: {
      x: 190,
      y: 36,
      rotate: 14,
      scale: 0.92,
      opacity: 0.38,
      filter: 'blur(1.5px)',
      zIndex: 1,
    },
  } as const

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-24 relative z-10">
        <div
          className={`grid items-center lg:items-stretch ${
            isVideoMode
              ? 'gap-8 lg:items-end lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'
              : 'gap-12 lg:grid-cols-2'
          }`}
        >
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`space-y-8 ${isVideoMode ? 'lg:max-w-[34rem]' : ''}`}
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse" />
              {c.subheadline}
            </div>

            <h1
              className={`font-bold text-gray-900 ${
                isVideoMode
                  ? 'text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] leading-[1.02]'
                  : 'text-4xl md:text-5xl lg:text-6xl leading-tight'
              }`}
            >
              {c.headline}
            </h1>

            <p
              className={`text-gray-600 leading-relaxed ${
                isVideoMode ? 'max-w-lg text-lg xl:text-xl' : 'max-w-xl text-xl'
              }`}
            >
              {c.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={c.primaryButtonLink || '/contact'}>
                <Button variant="primary" size="xl" className="group">
                  {c.primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href={c.secondaryButtonLink || '/services'}>
                <Button variant="outline" size="xl">
                  {c.secondaryButtonText}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            {!isVideoMode && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200">
                {c.stats.slice(0, 4).map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Image Carousel or Video Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative hidden lg:flex ${isVideoMode ? 'items-end justify-end self-end' : 'h-full items-center'}`}
          >
            {isVideoMode ? (
              /* Video Card */
              <div className="relative ml-auto w-full max-w-[52rem] lg:-mr-8 xl:-mr-14">
                <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/30 bg-slate-950/5">
                  <video
                    src={c.videoUrl}
                    poster={heroImage}
                    className="block h-auto w-full"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>
            ) : (
              /* Image Carousel */
              <motion.div
                className="relative aspect-square"
                style={{ perspective: 1200 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) next()
                  if (info.offset.x > 60) prev()
                }}
                onWheel={(e) => {
                  // Allow trackpad/mouse wheel navigation like your screenshot expectation.
                  // Throttle so it doesn't spin too fast.
                  if (wheelLockRef.current) return
                  const primaryDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
                  if (Math.abs(primaryDelta) < 8) return

                  wheelLockRef.current = true
                  if (primaryDelta > 0) next()
                  else prev()

                  window.setTimeout(() => {
                    wheelLockRef.current = false
                  }, 350)
                }}
              >

                {/* 3-card wheel */}
                <div className="absolute inset-0 overflow-visible">
                  {([-1, 0, 1] as const).map((slotOffset) => {
                    const index = (activeIndex + slotOffset + images.length) % images.length
                    const position = slotOffset === 0 ? 'center' : slotOffset === -1 ? 'left' : 'right'
                    const src = images[index]

                    return (
                      <motion.div
                        key={`${position}`}
                        className="absolute inset-0"
                        animate={position}
                        variants={variants}
                        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                        style={{ transformOrigin: 'center center' }}
                        onClick={() => {
                          if (slotOffset === -1) prev()
                          if (slotOffset === 1) next()
                        }}
                      >
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/30 bg-white/10">
                          <Image
                            src={src}
                            alt="Hero showcase"
                            fill
                            className="object-cover rounded-3xl shadow-2xl"
                            priority
                          />
                          {/* subtle glass overlay on side cards */}
                          {position !== 'center' && (
                            <div className="absolute inset-0 bg-white/40" />
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`absolute bg-white p-6 rounded-2xl shadow-xl ${isVideoMode ? 'bottom-6 left-6' : '-bottom-6 -left-6'}`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Trusted Partner</div>
                  <div className="text-sm text-gray-500">For Leading Brands</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {isVideoMode && (
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-200 pt-8 md:grid-cols-4">
            {c.stats.slice(0, 4).map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
