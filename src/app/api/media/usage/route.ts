import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db/prisma'

interface UsageLocation {
  type: string
  id: string
  title?: string
  name?: string
  field?: string
}

// GET usage information for a media file
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')

    if (!path) {
      return NextResponse.json({ error: 'Path parameter required' }, { status: 400 })
    }

    const usageLocations: UsageLocation[] = []

    // Check Services
    const services = await prisma.service.findMany({
      where: {
        OR: [
          { image: { contains: path } },
          { icon: { contains: path } }
        ]
      },
      select: { id: true, title: true, image: true, icon: true }
    })

    services.forEach(service => {
      if (service.image?.includes(path)) {
        usageLocations.push({
          type: 'Service',
          id: service.id,
          title: service.title,
          field: 'image'
        })
      }
      if (service.icon?.includes(path)) {
        usageLocations.push({
          type: 'Service',
          id: service.id,
          title: service.title,
          field: 'icon'
        })
      }
    })

    // Check Team Members
    const teamMembers = await prisma.teamMember.findMany({
      where: { image: { contains: path } },
      select: { id: true, name: true }
    })

    teamMembers.forEach(member => {
      usageLocations.push({
        type: 'Team Member',
        id: member.id,
        name: member.name,
        field: 'image'
      })
    })

    // Check Testimonials
    const testimonials = await prisma.testimonial.findMany({
      where: { image: { contains: path } },
      select: { id: true, clientName: true }
    })

    testimonials.forEach(testimonial => {
      usageLocations.push({
        type: 'Testimonial',
        id: testimonial.id,
        name: testimonial.clientName,
        field: 'image'
      })
    })

    // Check Partners
    const partners = await prisma.partner.findMany({
      where: {
        OR: [
          { logo: { contains: path } },
          { backgroundImage: { contains: path } }
        ]
      },
      select: { id: true, name: true, logo: true, backgroundImage: true }
    })

    partners.forEach(partner => {
      if (partner.logo?.includes(path)) {
        usageLocations.push({
          type: 'Partner',
          id: partner.id,
          name: partner.name,
          field: 'logo'
        })
      }
      if (partner.backgroundImage?.includes(path)) {
        usageLocations.push({
          type: 'Partner',
          id: partner.id,
          name: partner.name,
          field: 'backgroundImage'
        })
      }
    })

    // Check Client Logos
    const clientLogos = await prisma.clientLogo.findMany({
      where: { logo: { contains: path } },
      select: { id: true, name: true }
    })

    clientLogos.forEach(client => {
      usageLocations.push({
        type: 'Client Logo',
        id: client.id,
        name: client.name,
        field: 'logo'
      })
    })

    // Check Page Content (search in JSON content)
    const pageContents = await prisma.pageContent.findMany({
      select: { id: true, page: true, section: true, content: true }
    })

    pageContents.forEach(pc => {
      if (pc.content.includes(path)) {
        usageLocations.push({
          type: 'Page Content',
          id: pc.id,
          title: `${pc.page} - ${pc.section}`,
          field: 'content'
        })
      }
    })

    return NextResponse.json({
      path,
      usageCount: usageLocations.length,
      locations: usageLocations
    })
  } catch (error) {
    console.error('Error checking media usage:', error)
    return NextResponse.json({ error: 'Failed to check usage' }, { status: 500 })
  }
}
