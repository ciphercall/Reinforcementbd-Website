import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function GET() {
  try {
    const industries = await prisma.industry.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(industries)
  } catch (error) {
    console.error('Error fetching industries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch industries' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, icon, order } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const industry = await prisma.industry.create({
      data: {
        name,
        icon: icon || null,
        order: order || 0
      }
    })

    return NextResponse.json(industry, { status: 201 })
  } catch (error) {
    console.error('Error creating industry:', error)
    return NextResponse.json(
      { error: 'Failed to create industry' },
      { status: 500 }
    )
  }
}
