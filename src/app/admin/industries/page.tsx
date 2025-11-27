import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import prisma from '@/lib/db/prisma'
import { Plus, Edit, Trash2, Building2 } from 'lucide-react'

async function getIndustries() {
  try {
    return await prisma.industry.findMany({
      orderBy: { order: 'asc' }
    })
  } catch {
    return []
  }
}

export default async function AdminIndustriesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  const industries = await getIndustries()

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Industries</h1>
            <p className="text-gray-600">Manage industries you serve</p>
          </div>
          <Link href="/admin/industries/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Industry
            </Button>
          </Link>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-8 text-center text-gray-500">
                No industries found. Add your first industry to get started.
              </CardContent>
            </Card>
          ) : (
            industries.map((industry) => (
              <Card key={industry.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{industry.name}</h3>
                        <p className="text-sm text-gray-500">Order: {industry.order}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Link href={`/admin/industries/${industry.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
