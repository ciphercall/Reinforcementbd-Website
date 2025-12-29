import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'about_visibility' }
    })

    if (!setting) {
      // Return default visibility (all sections visible)
      return NextResponse.json({ 
        visibility: {
          header: true,
          story: true,
          journey: true,
          mission: true,
          values: true,
          team: true,
          divisions: true
        }
      })
    }

    return NextResponse.json({ 
      visibility: typeof setting.value === 'string' 
        ? JSON.parse(setting.value) 
        : setting.value 
    })
  } catch (error) {
    console.error('Failed to fetch about visibility:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { visibility } = await request.json()

    await prisma.siteSetting.upsert({
      where: { key: 'about_visibility' },
      update: {
        value: JSON.stringify(visibility),
        updatedAt: new Date()
      },
      create: {
        key: 'about_visibility',
        value: JSON.stringify(visibility),
        description: 'Controls which sections are visible on the About page'
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to save about visibility:', error)
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    )
  }
}
