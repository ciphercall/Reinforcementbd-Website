import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db/prisma'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
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

// POST upload a media file
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const alt = formData.get('alt')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    }

    const bytes = Buffer.from(await file.arrayBuffer())
    const safeOriginalName = (file.name || 'upload')
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    const ext = path.extname(safeOriginalName) || ''
    const base = path.basename(safeOriginalName, ext) || 'upload'
    const filename = `${base}-${Date.now()}-${crypto.randomUUID()}${ext}`

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    const filePathOnDisk = path.join(uploadsDir, filename)
    await writeFile(filePathOnDisk, bytes)

    const publicPath = `/uploads/${filename}`

    const media = await prisma.media.create({
      data: {
        filename,
        path: publicPath,
        mimeType: file.type || 'application/octet-stream',
        size: bytes.length,
        alt: typeof alt === 'string' && alt.trim() ? alt.trim() : null,
      }
    })

    return NextResponse.json(media)
  } catch (error) {
    console.error('Error uploading media:', error)
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 })
  }
}
