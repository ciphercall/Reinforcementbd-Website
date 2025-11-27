import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import prisma from '@/lib/db/prisma'
import { 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Briefcase, 
  GraduationCap, 
  Laptop, 
  Calculator 
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Laptop,
  Calculator
}

async function getService(slug: string) {
  try {
    return await prisma.service.findUnique({
      where: { slug }
    })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  
  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: service.title,
    description: service.description
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  const Icon = iconMap[service.icon || 'Briefcase'] || Briefcase
  const detailsList = service.details?.split(',').map(d => d.trim()) || []

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white pt-24 pb-16">
        <div className="max-w-4xl">
          <Link 
            href="/services"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Services
          </Link>
          
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 bg-blue-700/50 rounded-xl flex items-center justify-center shrink-0">
              <Icon className="w-8 h-8 text-blue-200" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl text-blue-100">{service.description}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Details Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <div className="space-y-4">
              {detailsList.map((detail, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Let us help you transform your business with our {service.title.toLowerCase()}. 
                Our team of experts is ready to create a tailored solution for your needs.
              </p>
              <Link href="/contact">
                <Button size="lg" className="w-full">
                  Request a Consultation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gray-50">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need More Information?
          </h2>
          <p className="text-gray-600 mb-8">
            Our team is here to answer any questions and discuss how we can help your business succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Contact Us Today</Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">View All Services</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
