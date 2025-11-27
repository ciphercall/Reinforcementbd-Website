import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import prisma from '@/lib/db/prisma'
import { Plus, Edit, Trash2, Star } from 'lucide-react'

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch {
    return []
  }
}

export default async function AdminTestimonialsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/admin/login')
  }

  const testimonials = await getTestimonials()

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
            <p className="text-gray-600">Manage client testimonials</p>
          </div>
          <Link href="/admin/testimonials/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </Link>
        </div>

        {/* Testimonials List */}
        <div className="space-y-4">
          {testimonials.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                No testimonials found. Add your first testimonial to get started.
              </CardContent>
            </Card>
          ) : (
            testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{testimonial.clientName}</h3>
                        <span className="text-gray-400">|</span>
                        <span className="text-sm text-gray-600">{testimonial.company}</span>
                      </div>
                      {testimonial.service && (
                        <p className="text-sm text-blue-600 mb-2">{testimonial.service}</p>
                      )}
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < testimonial.rating 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        testimonial.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {testimonial.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-4 pt-4 border-t space-x-2">
                    <Link href={`/admin/testimonials/${testimonial.id}`}>
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
