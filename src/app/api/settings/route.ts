import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db/prisma'

// GET settings (all or by key)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (key) {
      // Return specific setting
      const setting = await prisma.siteSetting.findUnique({
        where: { key }
      })
      if (!setting) {
        return NextResponse.json({ key, value: null })
      }
      try {
        return NextResponse.json({ key: setting.key, value: JSON.parse(setting.value) })
      } catch {
        return NextResponse.json({ key: setting.key, value: setting.value })
      }
    }

    // Return all settings
    const settings = await prisma.siteSetting.findMany()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// POST create/update single setting
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { key, value } = await request.json()
    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value)
    
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: valueStr },
      create: { key, value: valueStr }
    })

    try {
      return NextResponse.json({ key: setting.key, value: JSON.parse(setting.value) })
    } catch {
      return NextResponse.json({ key: setting.key, value: setting.value })
    }
  } catch (error) {
    console.error('Error saving setting:', error)
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 })
  }
}

// PUT update settings (batch)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Update each setting
    const updates = Object.entries(data).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: value as string },
        create: { key, value: value as string }
      })
    )

    await Promise.all(updates)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
