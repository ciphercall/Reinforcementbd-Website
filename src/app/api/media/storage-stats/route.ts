import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { list } from '@vercel/blob'

// GET storage statistics
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // List all blobs to calculate total size
    const { blobs } = await list()
    
    // Calculate total used space
    const totalUsedBytes = blobs.reduce((sum, blob) => sum + blob.size, 0)
    
    // Vercel Blob free tier: 500 MB (524,288,000 bytes)
    const freeQuotaBytes = 524288000 // 500 MB
    const remainingBytes = Math.max(0, freeQuotaBytes - totalUsedBytes)
    const usedPercentage = Math.min(100, (totalUsedBytes / freeQuotaBytes) * 100)
    
    // Helper function to format bytes
    const formatBytes = (bytes: number) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return NextResponse.json({
      totalFiles: blobs.length,
      usedBytes: totalUsedBytes,
      usedFormatted: formatBytes(totalUsedBytes),
      remainingBytes: remainingBytes,
      remainingFormatted: formatBytes(remainingBytes),
      quotaBytes: freeQuotaBytes,
      quotaFormatted: formatBytes(freeQuotaBytes),
      usedPercentage: parseFloat(usedPercentage.toFixed(2)),
      isNearLimit: usedPercentage >= 80,
      isOverLimit: usedPercentage >= 100
    })
  } catch (error) {
    console.error('Error fetching storage stats:', error)
    return NextResponse.json({ error: 'Failed to fetch storage statistics' }, { status: 500 })
  }
}
