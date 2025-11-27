'use client'

import { cn } from '@/lib/utils/cn'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'white' | 'gray' | 'blue' | 'gradient'
}

export function Section({ 
  children, 
  className, 
  id,
  background = 'white' 
}: SectionProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-600 text-white',
    gradient: 'bg-gradient-to-br from-blue-600 to-blue-800 text-white'
  }

  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24',
        bgClasses[background],
        className
      )}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export function SectionHeader({ 
  title, 
  subtitle, 
  centered = true,
  light = false,
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-12 md:mb-16',
      centered && 'text-center',
      className
    )}>
      <h2 className={cn(
        'text-3xl md:text-4xl font-bold mb-4',
        light ? 'text-white' : 'text-gray-900'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-lg max-w-2xl',
          centered && 'mx-auto',
          light ? 'text-blue-100' : 'text-gray-600'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
