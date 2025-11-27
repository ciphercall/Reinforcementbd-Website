import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import prisma from '@/lib/db/prisma'
import { Plus, Edit, Trash2 } from 'lucide-react'

async function getTeamMembers() {
  try {
    return await prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    })
  } catch {
    return []
  }
}

export default async function AdminTeamPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  const teamMembers = await getTeamMembers()

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
            <p className="text-gray-600">Manage your team members</p>
          </div>
          <Link href="/admin/team/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </Link>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-8 text-center text-gray-500">
                No team members found. Add your first team member to get started.
              </CardContent>
            </Card>
          ) : (
            teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl text-gray-500">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-blue-600">{member.position}</p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{member.bio}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-4 pt-4 border-t space-x-2">
                    <Link href={`/admin/team/${member.id}`}>
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
