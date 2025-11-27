import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  Layout,
  Handshake,
  ChevronRight
} from 'lucide-react'

const sections = [
  { 
    name: 'Page Header', 
    href: '/admin/pages/partners/header', 
    icon: Layout,
    description: 'Hero section with title and introduction'
  },
  { 
    name: 'Partners List', 
    href: '/admin/partners', 
    icon: Handshake,
    description: 'Manage partner organizations (redirects to Partners Manager)'
  },
]

export default async function PartnersPageAdmin() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners Page Sections</h1>
          <p className="text-gray-600">Manage all sections of your Partners page</p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {sections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="h-full hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                        <section.icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {section.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
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
