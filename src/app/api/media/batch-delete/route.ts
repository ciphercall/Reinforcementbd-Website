import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db/prisma'
import { unlink } from 'node:fs/promises'
import path from 'node:path'

// POST batch delete media files
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { ids } = body

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Invalid IDs array' }, { status: 400 })
    }

    // Find all media files
    const mediaFiles = await prisma.media.findMany({
      where: { id: { in: ids } }
    })

    // Delete physical files
    const deletionPromises = mediaFiles.map(async (media) => {
      try {
        const filePath = path.join(process.cwd(), 'public', media.path)
        await unlink(filePath)
      } catch (error) {
        console.error(`Error deleting file ${media.path}:`, error)
        // Continue even if file doesn't exist
      }
    })

    await Promise.all(deletionPromises)

    // Delete from database
    const result = await prisma.media.deleteMany({
      where: { id: { in: ids } }
    })

    return NextResponse.json({ 
      success: true, 
      deletedCount: result.count 
    })
  } catch (error) {
    console.error('Error batch deleting media:', error)
    return NextResponse.json({ error: 'Failed to batch delete media' }, { status: 500 })
  }
}
