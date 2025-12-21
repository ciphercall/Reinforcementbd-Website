import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        service: service || null,
        message
      }
    })

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, isRead } = body

    if (!id || typeof isRead !== 'boolean') {
      return NextResponse.json(
        { error: 'ID and isRead status required' },
        { status: 400 }
      )
    }

    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { isRead }
    })

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await prisma.contactSubmission.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting submission:', error)
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    )
  }
}
