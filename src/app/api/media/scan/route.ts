import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { list } from '@vercel/blob'
import prisma from '@/lib/db/prisma'

// GET sync Vercel Blob storage with database
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // List all blobs from Vercel Blob storage
    const { blobs } = await list()
    
    // Get existing media records
    const existingMedia = await prisma.media.findMany({
      select: { path: true }
    })

    const existingPaths = new Set(existingMedia.map(m => m.path))
    const newBlobs = blobs.filter(blob => !existingPaths.has(blob.url))

    // Add new blobs to database
    const syncedFiles = []
    for (const blob of newBlobs) {
      try {
        const filename = blob.pathname.split('/').pop() || blob.pathname
        
        const media = await prisma.media.create({
          data: {
            filename,
            path: blob.url,
            mimeType: 'application/octet-stream',
            size: blob.size,
          }
        })

        syncedFiles.push(media)
      } catch (error) {
        console.error(`Error syncing blob ${blob.pathname}:`, error)
      }
    }

    return NextResponse.json({
      totalBlobs: blobs.length,
      existingInDb: existingMedia.length,
      newlySynced: syncedFiles.length,
      syncedFiles
    })
  } catch (error) {
    console.error('Error scanning blob storage:', error)
    return NextResponse.json({ error: 'Failed to scan storage' }, { status: 500 })
  }
}
