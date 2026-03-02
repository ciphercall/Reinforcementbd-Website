import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  Layout,
  Grid3X3,
  Building2,
  Monitor,
  Cpu,
  Users,
  ChevronRight
} from 'lucide-react'

const sections = [
  { 
    name: 'Page Header', 
    href: '/admin/pages/services/header', 
    icon: Layout,
    description: 'Hero section with title and introduction'
  },
  {
    name: 'Automation Division Page',
    href: '/admin/pages/services/automation',
    icon: Cpu,
    description: 'Edit the /services/automation visitor page content'
  },
  {
    name: 'Architect View Division Page',
    href: '/admin/pages/services/architect-view',
    icon: Building2,
    description: 'Edit the /services/architect-view visitor page content'
  },
  {
    name: 'IT Zone Division Page',
    href: '/admin/pages/services/it-zone',
    icon: Monitor,
    description: 'Edit the /services/it-zone visitor page content'
  },
  {
    name: 'Trusted Clients Carousel',
    href: '/admin/pages/services/clients-carousel',
    icon: Users,
    description: 'Shared logo carousel shown on home and 3 service detail pages'
  },
  {
    name: 'Services Work Gallery',
    href: '/admin/pages/services/clients-carousel#services-work-gallery',
    icon: Grid3X3,
    description: 'Gallery shown only on the main /services page'
  },
  { 
    name: 'Services List', 
    href: '/admin/services', 
    icon: Grid3X3,
    description: 'Manage individual services (redirects to Services Manager)'
  },
]

export default async function ServicesPageAdmin() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Page Sections</h1>
          <p className="text-gray-600">Manage all sections of your Services page</p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-4">
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

        {/* Info */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Individual services are managed in the Data Management → Services section. 
              The page header can be customized here for the Services listing page.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
