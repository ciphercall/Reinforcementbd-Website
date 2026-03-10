'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Services', 
    href: '/services',
    children: [
      { name: 'Automation', href: '/services/automation' },
      { name: 'Architect View', href: '/services/architect-view' },
      { name: 'IT Zone', href: '/services/it-zone' },
    ]
  },
  { name: 'Industries', href: '/industries' },
  { name: 'Partners', href: '/partners' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [menuVisibility, setMenuVisibility] = useState<Record<string, boolean>>({
    home: true,
    about: true,
    services: true,
    industries: true,
    partners: true,
    contact: true
  })
  const pathname = usePathname()

  // Helper function to check if a menu item is active
  const isActive = (href: string, children?: Array<{ href: string }>) => {
    if (pathname === href) return true
    if (children) {
      return children.some(child => pathname === child.href || pathname.startsWith(child.href + '/'))
    }
    // For parent items, check if current path starts with the href (but not for home page)
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Fetch menu visibility settings
    const fetchMenuVisibility = async () => {
      try {
        const response = await fetch('/api/settings/menu-visibility')
        if (response.ok) {
          const data = await response.json()
          setMenuVisibility(data.visibility)
        }
      } catch (error) {
        console.error('Failed to fetch menu visibility:', error)
      }
    }
    fetchMenuVisibility()
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white/80 backdrop-blur-lg shadow-sm'
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logos/rg blue and gray full logo.jpg"
              alt="Reinforcement Group"
              width={180}
              height={50}
              className="h-12 w-auto rounded"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation
              .filter(item => {
                const key = item.name.toLowerCase()
                return menuVisibility[key] !== false
              })
              .map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1 text-sm font-medium transition-colors',
                    isActive(item.href, item.children)
                      ? 'text-blue-600 font-semibold'
                      : scrolled 
                        ? 'text-gray-700 hover:text-blue-600' 
                        : 'text-gray-800 hover:text-blue-600'
                  )}
                >
                  <span>{item.name}</span>
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 w-56">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            'block px-4 py-2 text-sm transition-colors',
                            pathname === child.href || pathname.startsWith(child.href + '/')
                              ? 'bg-blue-50 text-blue-600 font-semibold'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={cn('h-6 w-6', scrolled ? 'text-gray-700' : 'text-gray-800')} />
            ) : (
              <Menu className={cn('h-6 w-6', scrolled ? 'text-gray-700' : 'text-gray-800')} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bg-white border-t shadow-xl z-50 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="py-4 px-4 space-y-2">
              {navigation
                .filter(item => {
                  const key = item.name.toLowerCase()
                  return menuVisibility[key] !== false
                })
                .map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block py-2 font-medium transition-colors',
                      isActive(item.href, item.children)
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-700 hover:text-blue-600'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            'block py-1.5 text-sm transition-colors',
                            pathname === child.href || pathname.startsWith(child.href + '/')
                              ? 'text-blue-600 font-semibold'
                              : 'text-gray-500 hover:text-blue-600'
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
