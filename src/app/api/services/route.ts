import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, description, details, icon, image, order } = body

    if (!title || !slug || !description) {
      return NextResponse.json(
        { error: 'Title, slug, and description are required' },
        { status: 400 }
      )
    }

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        description,
        details: details || null,
        icon: icon || null,
        image: image || null,
        order: order || 0
      }
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
