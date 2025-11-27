import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import prisma from '@/lib/db/prisma'
import { Globe, MapPin, ExternalLink } from 'lucide-react'

async function getPartners() {
  try {
    return await prisma.partner.findMany({
      orderBy: { order: 'asc' }
    })
  } catch {
    return []
  }
}

export default async function AdminPartnersPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  const partners = await getPartners()

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Partners</h1>
            <p className="text-gray-600">Manage strategic partners</p>
          </div>
          <Button>
            Add Partner
          </Button>
        </div>

        {/* Partners List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {partners.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-8 text-center text-gray-500">
                No partners found. Add your first partner to get started.
              </CardContent>
            </Card>
          ) : (
            partners.map((partner) => (
              <Card key={partner.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{partner.name}</h3>
                        {partner.location && (
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {partner.location}
                          </p>
                        )}
                      </div>
                    </div>
                    {partner.website && (
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  
                  {partner.description && (
                    <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                  )}
                  
                  {partner.partnership && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">{partner.partnership}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminSidebar>
  )
}
