import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import prisma from '@/lib/db/prisma'
import { Mail, Clock, Building, Briefcase, CheckCircle, Circle } from 'lucide-react'

async function getMessages() {
  try {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch {
    return []
  }
}

export default async function AdminMessagesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  const messages = await getMessages()

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600">View and manage form submissions</p>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                No messages yet. Contact form submissions will appear here.
              </CardContent>
            </Card>
          ) : (
            messages.map((message) => (
              <Card key={message.id} className={message.isRead ? 'opacity-75' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        message.isRead ? 'bg-gray-100' : 'bg-blue-100'
                      }`}>
                        <Mail className={`w-5 h-5 ${message.isRead ? 'text-gray-500' : 'text-blue-600'}`} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{message.name}</h3>
                          {!message.isRead && (
                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{message.email}</p>
                        {message.company && (
                          <p className="text-sm text-gray-500 flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            {message.company}
                          </p>
                        )}
                        {message.service && (
                          <p className="text-sm text-gray-500 flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {message.service}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <a 
                      href={`mailto:${message.email}`}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Reply via Email
                    </a>
                    {message.phone && (
                      <a 
                        href={`tel:${message.phone}`}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Call {message.phone}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminSidebar>
  )
}
