import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db/prisma'
import { unlink } from 'node:fs/promises'
import path from 'node:path'

// DELETE a media file
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    
    // Find the media file
    const media = await prisma.media.findUnique({
      where: { id }
    })

    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    // Delete physical file
    try {
      const filePath = path.join(process.cwd(), 'public', media.path)
      await unlink(filePath)
    } catch (error) {
      console.error('Error deleting physical file:', error)
      // Continue even if file doesn't exist physically
    }

    // Delete from database
    await prisma.media.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting media:', error)
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 })
  }
}

// PATCH update media metadata (e.g., filename, alt text)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { filename, alt } = body

    const updateData: { filename?: string; alt?: string | null } = {}
    
    if (filename !== undefined) {
      updateData.filename = filename
    }
    if (alt !== undefined) {
      updateData.alt = alt || null
    }

    const media = await prisma.media.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(media)
  } catch (error) {
    console.error('Error updating media:', error)
    return NextResponse.json({ error: 'Failed to update media' }, { status: 500 })
  }
}
