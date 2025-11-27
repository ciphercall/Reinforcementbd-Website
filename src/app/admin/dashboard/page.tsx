import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  Mail, 
  TrendingUp,
  Eye
} from 'lucide-react'
import prisma from '@/lib/db/prisma'

async function getStats() {
  try {
    const [services, team, testimonials, messages] = await Promise.all([
      prisma.service.count({ where: { isActive: true } }),
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.testimonial.count({ where: { isActive: true } }),
      prisma.contactSubmission.count({ where: { isRead: false } })
    ])
    return { services, team, testimonials, messages }
  } catch {
    return { services: 0, team: 0, testimonials: 0, messages: 0 }
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  const stats = await getStats()

  const statCards = [
    { title: 'Active Services', value: stats.services, icon: Briefcase, color: 'blue' },
    { title: 'Team Members', value: stats.team, icon: Users, color: 'green' },
    { title: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'purple' },
    { title: 'Unread Messages', value: stats.messages, icon: Mail, color: 'red' },
  ]

  return (
    <AdminSidebar>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your website.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Add New Service', href: '/admin/services/new', icon: Briefcase },
              { title: 'Add Team Member', href: '/admin/team/new', icon: Users },
              { title: 'View Messages', href: '/admin/messages', icon: Mail },
            ].map((action) => (
              <a
                key={action.title}
                href={action.href}
                className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">{action.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Welcome to the MARSH Services admin panel. From here you can:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>Manage your services and their descriptions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>Update team members and their profiles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>Add and manage client testimonials</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>View and respond to contact form submissions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span>Upload and manage media files</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSidebar>
  )
}
