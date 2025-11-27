import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clientName, company, position, content, service, image, rating } = body

    if (!clientName || !company || !content) {
      return NextResponse.json(
        { error: 'Client name, company, and content are required' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        company,
        position: position || null,
        content,
        service: service || null,
        image: image || null,
        rating: rating || 5
      }
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
