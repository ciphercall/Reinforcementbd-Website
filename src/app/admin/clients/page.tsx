import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import prisma from '@/lib/db/prisma'
import { Plus, Edit, Trash2, Building2, ExternalLink } from 'lucide-react'

async function getClients() {
  try {
    return await prisma.clientLogo.findMany({
      orderBy: { order: 'asc' }
    })
  } catch {
    return []
  }
}

export default async function AdminClientsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  const clients = await getClients()

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600">Manage your client list and logos</p>
          </div>
          <Link href="/admin/clients/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </Link>
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-8 text-center text-gray-500">
                <Building2 className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p>No clients found. Add your first client to get started.</p>
              </CardContent>
            </Card>
          ) : (
            clients.map((client) => (
              <Card key={client.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {client.logo ? (
                        <img 
                          src={client.logo} 
                          alt={client.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{client.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{client.category || 'Enterprise'}</p>
                      {client.website && (
                        <a 
                          href={client.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center mt-1"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-4 pt-3 border-t space-x-2">
                    <Link href={`/admin/clients/${client.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
