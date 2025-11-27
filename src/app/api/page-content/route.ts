import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db/prisma'

// GET page content by section
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')
    const page = searchParams.get('page') || 'home'

    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 })
    }

    const pageContent = await prisma.pageContent.findUnique({
      where: {
        page_section: { page, section }
      }
    })

    if (pageContent) {
      // Parse the JSON string content
      try {
        const parsedContent = JSON.parse(pageContent.content)
        return NextResponse.json({ content: parsedContent })
      } catch {
        return NextResponse.json({ content: pageContent.content })
      }
    }

    return NextResponse.json({ content: null })
  } catch (error) {
    console.error('Error fetching page content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

// POST/Update page content
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { section, page = 'home', content } = body

    if (!section || !content) {
      return NextResponse.json({ error: 'Section and content are required' }, { status: 400 })
    }

    // Convert content to JSON string for storage
    const contentString = typeof content === 'string' ? content : JSON.stringify(content)

    const pageContent = await prisma.pageContent.upsert({
      where: {
        page_section: { page, section }
      },
      update: { content: contentString },
      create: { page, section, content: contentString }
    })

    return NextResponse.json(pageContent)
  } catch (error) {
    console.error('Error saving page content:', error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}
