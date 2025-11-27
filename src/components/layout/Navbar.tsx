'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/Button'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Services', 
    href: '/services',
    children: [
      { name: 'Managed Staffing', href: '/services/managed-staffing' },
      { name: 'Sales Force Outsourcing', href: '/services/sales-force' },
      { name: 'HR Outsourcing', href: '/services/hr-outsourcing' },
      { name: 'IT Services', href: '/services/it-services' },
      { name: 'Corporate Training', href: '/services/corporate-training' },
      { name: 'Payroll Services', href: '/services/payroll' },
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logos/rg blue and gray full logo.jpg"
              alt="MARSH Services"
              width={180}
              height={50}
              className="h-12 w-auto rounded"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
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
                    scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-800 hover:text-blue-600'
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
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
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

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Schedule a Call
              </Button>
            </Link>
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
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-t shadow-xl">
            <div className="py-4 px-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 font-medium hover:text-blue-600"
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
                          className="block py-1.5 text-sm text-gray-500 hover:text-blue-600"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full">
                    Schedule a Call
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
