import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArchitectPartnersCarousel } from '@/components/sections/PartnerLogosCarousel'
import { CTASection } from '@/components/sections/CTASection'
import { 
  Building2,
  Palette,
  Home,
  Ruler,
  PenTool,
  Layers,
  Eye,
  Lightbulb,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Architect View Division | Reinforcement Group',
  description: 'Professional architectural services including building design, interior design, 3D visualization, landscape design, and construction consulting.',
  keywords: 'architecture, interior design, building design, 3D visualization, landscape design, Bangladesh',
}

const services = [
  {
    title: 'Architectural Design',
    description: 'Complete architectural design services for residential, commercial, and industrial projects.',
    icon: Building2,
    features: ['Conceptual Design', 'Design Development', 'Construction Documents', 'Building Permits', 'Site Planning']
  },
  {
    title: 'Interior Design',
    description: 'Creative interior design solutions that blend aesthetics with functionality.',
    icon: Palette,
    features: ['Space Planning', 'Material Selection', 'Furniture Design', 'Lighting Design', 'Color Schemes']
  },
  {
    title: 'Residential Design',
    description: 'Custom home designs that reflect your lifestyle and preferences.',
    icon: Home,
    features: ['Single Family Homes', 'Apartments', 'Villas', 'Renovations', 'Extensions']
  },
  {
    title: '3D Visualization',
    description: 'Photorealistic 3D renderings to visualize your project before construction.',
    icon: Eye,
    features: ['3D Modeling', 'Photorealistic Renders', 'Virtual Tours', 'Animations', 'VR Presentations']
  },
  {
    title: 'Technical Drawings',
    description: 'Detailed technical drawings and blueprints for construction.',
    icon: Ruler,
    features: ['Floor Plans', 'Elevations', 'Sections', 'Details', 'As-Built Drawings']
  },
  {
    title: 'Landscape Design',
    description: 'Outdoor space design that enhances the beauty and functionality of your property.',
    icon: Layers,
    features: ['Garden Design', 'Hardscape Design', 'Planting Plans', 'Irrigation Systems', 'Outdoor Lighting']
  },
  {
    title: 'Concept Development',
    description: 'Initial concept development and feasibility studies for your projects.',
    icon: Lightbulb,
    features: ['Site Analysis', 'Feasibility Studies', 'Concept Sketches', 'Design Options', 'Budget Estimates']
  },
  {
    title: 'Construction Support',
    description: 'On-site supervision and support during the construction phase.',
    icon: PenTool,
    features: ['Site Supervision', 'Quality Control', 'Contractor Coordination', 'Change Orders', 'Final Inspection']
  }
]

const stats = [
  { value: '100+', label: 'Projects Designed' },
  { value: '50+', label: 'Happy Clients' },
  { value: '15+', label: 'Awards Won' },
  { value: '5+', label: 'Years Experience' }
]

const portfolioImages = [
  { src: '/images/profile/1.jpg', alt: 'Architecture Project 1' },
  { src: '/images/profile/2.jpg', alt: 'Architecture Project 2' },
  { src: '/images/profile/3.jpg', alt: 'Architecture Project 3' },
  { src: '/images/profile/4.jpeg', alt: 'Architecture Project 4' },
  { src: '/images/profile/5.jpg', alt: 'Architecture Project 5' },
  { src: '/images/profile/6.jpeg', alt: 'Architecture Project 6' },
]

export default function ArchitectViewPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium">
                <Building2 className="w-4 h-4 mr-2" />
                Architect View Division
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Architectural Excellence
              </h1>
              <p className="text-xl text-emerald-100 leading-relaxed">
                Transform your vision into stunning architectural reality. Our team of 
                experienced architects and designers creates spaces that inspire, 
                combining aesthetics with functionality for exceptional results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                  <Link href="/contact" className="flex items-center">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {portfolioImages.slice(0, 4).map((img, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-2 shadow-xl overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={250}
                      height={200}
                      className="rounded-lg object-cover w-full h-36"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600">{stat.value}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Section background="gray" id="services">
        <SectionHeader
          title="Our Architectural Services"
          subtitle="Comprehensive design services for every type of project"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                  <service.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Portfolio Gallery */}
      <Section background="white">
        <SectionHeader
          title="Our Portfolio"
          subtitle="A glimpse of our architectural projects"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...portfolioImages, 
            { src: '/images/profile/7.jpg', alt: 'Architecture Project 7' },
            { src: '/images/profile/8.webp', alt: 'Architecture Project 8' },
            { src: '/images/profile/9.jpg', alt: 'Architecture Project 9' }
          ].map((img, i) => (
            <div key={i} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-medium">{img.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section background="gray">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Our Architecture Division?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our architects combine creative vision with technical expertise to deliver 
              projects that exceed expectations. We focus on sustainable design practices 
              and innovative solutions that stand the test of time.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Creative Excellence', desc: 'Award-winning design concepts' },
                { title: 'Sustainable Design', desc: 'Eco-friendly and energy-efficient' },
                { title: 'Client-Focused', desc: 'Your vision, our expertise' },
                { title: 'End-to-End Service', desc: 'From concept to completion' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[10, 11, 12, 13].map((num) => (
              <div key={num} className="rounded-xl overflow-hidden shadow-md">
                <Image
                  src={`/images/profile/${num}.jpeg`}
                  alt={`Architecture showcase ${num}`}
                  width={300}
                  height={250}
                  className="object-cover w-full h-48"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Partners Carousel */}
      <ArchitectPartnersCarousel />

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
