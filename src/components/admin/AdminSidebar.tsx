'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  ChevronRight,
  ChevronDown,
  Home,
  FileText,
  Phone,
  Globe,
  Award,
  Sparkles,
  Layout,
  Target,
  Zap,
  ListChecks,
  HelpCircle,
  Megaphone,
  UserCircle,
  Building,
  Quote,
  Factory,
  Users2,
  Newspaper
} from 'lucide-react'

// Comprehensive menu structure with page sections
const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin/dashboard', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Homepage', 
    href: '/admin/pages/home', 
    icon: Home,
    children: [
      { name: 'Hero Section', href: '/admin/pages/home/hero', icon: Layout },
      { name: 'Services Preview', href: '/admin/pages/home/services-preview', icon: Briefcase },
      { name: 'About Preview', href: '/admin/pages/home/about-preview', icon: FileText },
      { name: 'Features', href: '/admin/pages/home/features', icon: Zap },
      { name: 'Process Steps', href: '/admin/pages/home/process', icon: ListChecks },
      { name: 'Why Choose Us', href: '/admin/pages/home/why-us', icon: HelpCircle },
      { name: 'Industries Preview', href: '/admin/pages/home/industries-preview', icon: Factory },
      { name: 'Testimonials Preview', href: '/admin/pages/home/testimonials-preview', icon: Quote },
      { name: 'Team Preview', href: '/admin/pages/home/team-preview', icon: Users },
      { name: 'Clients Section', href: '/admin/pages/home/clients', icon: Award },
      { name: 'CTA Section', href: '/admin/pages/home/cta', icon: Megaphone },
    ]
  },
  { 
    name: 'About Page', 
    href: '/admin/pages/about', 
    icon: FileText,
    children: [
      { name: 'Page Header', href: '/admin/pages/about/header', icon: Layout },
      { name: 'Company Story', href: '/admin/pages/about/story', icon: Newspaper },
      { name: 'Mission & Vision', href: '/admin/pages/about/mission', icon: Target },
      { name: 'Core Values', href: '/admin/pages/about/values', icon: Award },
    ]
  },
  { 
    name: 'Services Page', 
    href: '/admin/pages/services', 
    icon: Briefcase,
    children: [
      { name: 'Page Header', href: '/admin/pages/services/header', icon: Layout },
      { name: 'All Services', href: '/admin/services', icon: Briefcase },
    ]
  },
  { 
    name: 'Contact Page', 
    href: '/admin/pages/contact', 
    icon: Phone,
    children: [
      { name: 'Page Header', href: '/admin/pages/contact/header', icon: Layout },
      { name: 'Contact Info', href: '/admin/pages/contact/info', icon: Phone },
      { name: 'Form Settings', href: '/admin/pages/contact/form', icon: FileText },
    ]
  },
  { 
    name: 'Services', 
    href: '/admin/services', 
    icon: Briefcase,
  },
  { 
    name: 'Team Members', 
    href: '/admin/team', 
    icon: Users,
  },
  { 
    name: 'Testimonials', 
    href: '/admin/testimonials', 
    icon: MessageSquare,
  },
  { 
    name: 'Industries', 
    href: '/admin/industries', 
    icon: Building2,
  },
  { 
    name: 'Partners', 
    href: '/admin/partners', 
    icon: Handshake,
  },
  { 
    name: 'Clients', 
    href: '/admin/clients', 
    icon: Award,
  },
  { name: 'Contact Messages', href: '/admin/messages', icon: Mail },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
]

interface AdminSidebarProps {
  children: React.ReactNode
}

export function AdminSidebar({ children }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Homepage'])

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => 
      prev.includes(name) 
        ? prev.filter(m => m !== name)
        : [...prev, name]
    )
  }

  const isMenuActive = (item: typeof navigation[0]) => {
    if (pathname === item.href) return true
    if (pathname.startsWith(item.href + '/')) return true
    if ('children' in item && item.children) {
      return item.children.some(child => pathname === child.href || pathname.startsWith(child.href + '/'))
    }
    return false
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transition-transform duration-200 flex flex-col',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">MARSH Admin</p>
              <p className="text-xs text-slate-400">Content Management</p>
            </div>
          </Link>
          <button 
            className="lg:hidden p-1 hover:bg-slate-800 rounded"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {/* Dashboard */}
          <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Overview
          </p>
          <NavItem 
            item={navigation[0]} 
            pathname={pathname}
            isActive={isMenuActive(navigation[0])}
            expandedMenus={expandedMenus}
            toggleMenu={toggleMenu}
            closeSidebar={() => setIsSidebarOpen(false)}
          />

          {/* Page Sections */}
          <p className="px-3 py-2 mt-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Page Sections
          </p>
          {navigation.slice(1, 5).map((item) => (
            <NavItem 
              key={item.name} 
              item={item} 
              pathname={pathname}
              isActive={isMenuActive(item)}
              expandedMenus={expandedMenus}
              toggleMenu={toggleMenu}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          ))}

          {/* Content Management */}
          <p className="px-3 py-2 mt-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Content
          </p>
          {navigation.slice(5, 11).map((item) => (
            <NavItem 
              key={item.name} 
              item={item} 
              pathname={pathname}
              isActive={isMenuActive(item)}
              expandedMenus={expandedMenus}
              toggleMenu={toggleMenu}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          ))}

          {/* System */}
          <p className="px-3 py-2 mt-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            System
          </p>
          {navigation.slice(11).map((item) => (
            <NavItem 
              key={item.name} 
              item={item} 
              pathname={pathname}
              isActive={isMenuActive(item)}
              expandedMenus={expandedMenus}
              toggleMenu={toggleMenu}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <Globe className="h-5 w-5" />
            <span>View Website</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center space-x-3 w-full px-4 py-3 text-slate-400 hover:bg-red-600/20 hover:text-red-400 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg -ml-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="hidden lg:block">
            <nav className="text-sm text-gray-500">
              {pathname.split('/').filter(Boolean).map((segment, index, arr) => (
                <span key={segment}>
                  {index > 0 && <span className="mx-2">/</span>}
                  <span className={index === arr.length - 1 ? 'text-gray-900 font-medium' : ''}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')}
                  </span>
                </span>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              target="_blank"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">View Live Site</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  )
}

interface NavItemProps {
  item: typeof navigation[0]
  pathname: string
  isActive: boolean
  expandedMenus: string[]
  toggleMenu: (name: string) => void
  closeSidebar: () => void
}

function NavItem({ item, pathname, isActive, expandedMenus, toggleMenu, closeSidebar }: NavItemProps) {
  const hasChildren = 'children' in item && item.children
  const isExpanded = expandedMenus.includes(item.name)

  if (hasChildren && item.children) {
    return (
      <div>
        <button
          onClick={() => toggleMenu(item.name)}
          className={cn(
            'flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors',
            isActive 
              ? 'bg-blue-600/20 text-blue-400' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          )}
        >
          <div className="flex items-center space-x-3">
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </div>
          <ChevronDown className={cn(
            'h-4 w-4 transition-transform duration-200',
            isExpanded && 'rotate-180'
          )} />
        </button>
        
        <div className={cn(
          'overflow-hidden transition-all duration-200',
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="mt-1 ml-4 pl-4 border-l border-slate-700 space-y-1 py-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={closeSidebar}
                className={cn(
                  'flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm transition-colors',
                  pathname === child.href
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )}
              >
                {'icon' in child && child.icon && <child.icon className="h-4 w-4" />}
                <span>{child.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      onClick={closeSidebar}
      className={cn(
        'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      )}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.name}</span>
      {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
    </Link>
  )
}
