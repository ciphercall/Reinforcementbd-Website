import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(team)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, position, bio, image, linkedin, email, order } = body

    if (!name || !position) {
      return NextResponse.json(
        { error: 'Name and position are required' },
        { status: 400 }
      )
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        position,
        bio: bio || null,
        image: image || null,
        linkedin: linkedin || null,
        email: email || null,
        order: order || 0
      }
    })

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}
