// Type definitions for MARSH Services Website

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  details?: string
  icon?: string
  image?: string
  order: number
  isActive: boolean
}

export interface TeamMember {
  id: string
  name: string
  position: string
  bio?: string
  image?: string
  linkedin?: string
  email?: string
  order: number
  isActive: boolean
}

export interface Testimonial {
  id: string
  clientName: string
  company: string
  position?: string
  content: string
  service?: string
  image?: string
  rating: number
  isActive: boolean
}

export interface Partner {
  id: string
  name: string
  description: string
  partnership: string
  logo?: string
  website?: string
  location?: string
  order: number
  isActive: boolean
}

export interface Industry {
  id: string
  name: string
  icon?: string
  order: number
  isActive: boolean
}

export interface ClientLogo {
  id: string
  name: string
  logo?: string
  category?: string
  website?: string
  order: number
  isActive: boolean
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  description?: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  isRead: boolean
  createdAt: Date
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface Feature {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}
