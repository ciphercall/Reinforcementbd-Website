import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db/prisma'

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(partners)
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { name, description, partnership, logo, backgroundImage, website, location, order, isActive } = body

    if (!name || !description || !partnership) {
      return NextResponse.json(
        { error: 'Name, description and partnership are required' },
        { status: 400 }
      )
    }

    const created = await prisma.partner.create({
      data: {
        name,
        description,
        partnership,
        logo: logo || null,
        backgroundImage: backgroundImage || null,
        website: website || null,
        location: location || null,
        order: typeof order === 'number' ? order : 0,
        isActive: typeof isActive === 'boolean' ? isActive : true,
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating partner:', error)
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 })
  }
}
