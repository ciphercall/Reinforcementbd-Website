import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db/prisma'
import { put } from '@vercel/blob'
import crypto from 'node:crypto'

export const runtime = 'nodejs'

// GET all media files
export async function GET() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(media)
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

// POST upload media file(s) - supports multiple files
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const files = formData.getAll('files')
    const file = formData.get('file')

    // Support both single 'file' and multiple 'files'
    const filesToProcess = files.length > 0 ? files : (file ? [file] : [])

    if (filesToProcess.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploadedMedia = []

    for (const fileItem of filesToProcess) {
      if (!(fileItem instanceof File)) continue

      // Generate safe filename
      const safeOriginalName = (fileItem.name || 'upload')
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

      const ext = safeOriginalName.split('.').pop() || ''
      const base = safeOriginalName.replace(`.${ext}`, '') || 'upload'
      const filename = `${base}-${Date.now()}-${crypto.randomUUID().substring(0, 8)}.${ext}`

      // Upload to Vercel Blob
      const blob = await put(filename, fileItem, {
        access: 'public',
        addRandomSuffix: false,
      })

      const media = await prisma.media.create({
        data: {
          filename,
          path: blob.url,
          mimeType: fileItem.type || 'application/octet-stream',
          size: fileItem.size,
          alt: null,
        }
      })

      uploadedMedia.push(media)
    }

    // Return single object if one file, array if multiple
    return NextResponse.json(uploadedMedia.length === 1 ? uploadedMedia[0] : uploadedMedia)
  } catch (error) {
    console.error('Error uploading media:', error)
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 })
  }
}
