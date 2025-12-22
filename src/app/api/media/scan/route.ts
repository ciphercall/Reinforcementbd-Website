import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db/prisma'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

// Simple mime type lookup based on file extension
function getMimeType(filename: string): string {
  const ext = filename.toLowerCase().split('.').pop()
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
  }
  return mimeTypes[ext || ''] || 'application/octet-stream'
}

// GET scan uploads folder and sync with database
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    
    let files: string[] = []
    try {
      files = await readdir(uploadsDir)
    } catch (error) {
      // uploads folder doesn't exist yet
      return NextResponse.json({ 
        files: [], 
        synced: 0,
        message: 'Uploads folder is empty or does not exist' 
      })
    }

    // Get existing media records
    const existingMedia = await prisma.media.findMany({
      select: { filename: true, path: true }
    })

    const existingFilenames = new Set(existingMedia.map(m => m.filename))
    const newFiles: typeof files = []

    // Find files not in database
    for (const filename of files) {
      if (!existingFilenames.has(filename)) {
        newFiles.push(filename)
      }
    }

    // Add new files to database
    const syncedFiles = []
    for (const filename of newFiles) {
      try {
        const filePath = path.join(uploadsDir, filename)
        const stats = await stat(filePath)
        const mimeType = getMimeType(filename)

        const media = await prisma.media.create({
          data: {
            filename,
            path: `/uploads/${filename}`,
            mimeType,
            size: stats.size,
          }
        })

        syncedFiles.push(media)
      } catch (error) {
        console.error(`Error syncing file ${filename}:`, error)
      }
    }

    return NextResponse.json({
      totalFiles: files.length,
      existingInDb: existingMedia.length,
      newlySynced: syncedFiles.length,
      syncedFiles
    })
  } catch (error) {
    console.error('Error scanning uploads folder:', error)
    return NextResponse.json({ error: 'Failed to scan folder' }, { status: 500 })
  }
}
