'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils/cn'
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare,
  Building2,
  Handshake,
  Settings,
  Mail,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Team Members', href: '/admin/team', icon: Users },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Industries', href: '/admin/industries', icon: Building2 },
  { name: 'Partners', href: '/admin/partners', icon: Handshake },
  { name: 'Contact Messages', href: '/admin/messages', icon: Mail },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

interface AdminSidebarProps {
  children: React.ReactNode
}

export function AdminSidebar({ children }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-200 lg:transform-none',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <Link href="/admin/dashboard" className="flex items-center space-x-3">
              <Image
                src="/images/logos/rg blue and gray full logo.jpg"
                alt="MARSH Admin"
                width={150}
                height={40}
                className="h-10 w-auto rounded"
              />
            </Link>
            <button 
              className="lg:hidden absolute top-6 right-4"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center space-x-3 w-full px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b h-16 flex items-center px-6 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 -ml-2 mr-4"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1" />
          <Link 
            href="/"
            target="_blank"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            View Website →
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
