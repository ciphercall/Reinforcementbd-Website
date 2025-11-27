import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  Layout,
  Briefcase,
  FileText,
  Zap,
  ListChecks,
  HelpCircle,
  Factory,
  Quote,
  Users,
  Award,
  Megaphone,
  ChevronRight
} from 'lucide-react'

const sections = [
  { 
    name: 'Hero Section', 
    href: '/admin/pages/home/hero', 
    icon: Layout,
    description: 'Main banner, headline, tagline, and call-to-action buttons'
  },
  { 
    name: 'Services Preview', 
    href: '/admin/pages/home/services-preview', 
    icon: Briefcase,
    description: 'Featured services displayed on homepage'
  },
  { 
    name: 'About Preview', 
    href: '/admin/pages/home/about-preview', 
    icon: FileText,
    description: 'Company introduction section'
  },
  { 
    name: 'Features', 
    href: '/admin/pages/home/features', 
    icon: Zap,
    description: 'Key features and capabilities showcase'
  },
  { 
    name: 'Process Steps', 
    href: '/admin/pages/home/process', 
    icon: ListChecks,
    description: 'How we work - step by step process'
  },
  { 
    name: 'Why Choose Us', 
    href: '/admin/pages/home/why-us', 
    icon: HelpCircle,
    description: 'Value propositions and differentiators'
  },
  { 
    name: 'Industries Preview', 
    href: '/admin/pages/home/industries-preview', 
    icon: Factory,
    description: 'Industries we serve section'
  },
  { 
    name: 'Testimonials Preview', 
    href: '/admin/pages/home/testimonials-preview', 
    icon: Quote,
    description: 'Client testimonials carousel'
  },
  { 
    name: 'Team Preview', 
    href: '/admin/pages/home/team-preview', 
    icon: Users,
    description: 'Team members showcase'
  },
  { 
    name: 'Clients Section', 
    href: '/admin/pages/home/clients', 
    icon: Award,
    description: 'Client logos and partnerships'
  },
  { 
    name: 'CTA Section', 
    href: '/admin/pages/home/cta', 
    icon: Megaphone,
    description: 'Call-to-action banner at bottom'
  },
]

export default async function HomePageAdmin() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage Sections</h1>
          <p className="text-gray-600">Manage all sections of your homepage</p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="h-full hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <section.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {section.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AdminSidebar>
  )
}
