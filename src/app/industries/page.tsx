import { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { CTASection } from '@/components/sections/CTASection'
import { 
  Building2, 
  Plane, 
  Hotel, 
  Factory, 
  ShoppingBag, 
  Laptop,
  Heart,
  GraduationCap,
  Globe,
  Pill,
  Rocket,
  Stethoscope
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'Reinforcement Group provides automation, IT, and architectural solutions across diverse industries including Manufacturing, Textiles, Pharmaceuticals, Real Estate, and more.',
}

const industries = [
  { 
    name: 'Manufacturing & Industrial', 
    icon: Factory,
    description: 'PLC programming, SCADA systems, and industrial automation for manufacturing plants and factories.'
  },
  { 
    name: 'Textiles & RMG', 
    icon: Factory,
    description: 'Automation solutions for garment manufacturing, textile processing, and quality control systems.'
  },
  { 
    name: 'Pharmaceuticals', 
    icon: Pill,
    description: 'Process automation, clean room control systems, and regulatory compliance solutions for pharma industry.'
  },
  { 
    name: 'Real Estate & Construction', 
    icon: Building2,
    description: 'Architectural design, building automation, and smart building solutions for property developers.'
  },
  { 
    name: 'Hotels & Hospitality', 
    icon: Hotel,
    description: 'Building management systems, HVAC automation, and interior design for hotels and resorts.'
  },
  { 
    name: 'Information Technology', 
    icon: Laptop,
    description: 'IT infrastructure, networking solutions, software development, and system integration services.'
  },
  { 
    name: 'Healthcare & Hospitals', 
    icon: Stethoscope,
    description: 'Medical facility automation, hospital management systems, and healthcare IT solutions.'
  },
  { 
    name: 'Education Institutions', 
    icon: GraduationCap,
    description: 'Smart classroom solutions, campus automation, and educational software development.'
  },
  { 
    name: 'Banks & Financial', 
    icon: Building2,
    description: 'IT security solutions, network infrastructure, and automation for banking operations.'
  },
  { 
    name: 'Energy & Power', 
    icon: Rocket,
    description: 'Power plant automation, energy management systems, and renewable energy solutions.'
  },
  { 
    name: 'Food & Beverage', 
    icon: ShoppingBag,
    description: 'Process automation, packaging systems, and quality control for food processing industries.'
  },
  { 
    name: 'Government & Public Sector', 
    icon: Globe,
    description: 'E-governance solutions, IT infrastructure, and public building automation projects.'
  }
]

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Industries We Serve
            </h1>
            <p className="text-xl text-blue-100">
              Our solutions are tailor-made for each industry we serve, ensuring 
              you get the specialized expertise your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <Section background="gray">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Card key={industry.name} className="group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                  <industry.icon className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {industry.name}
                </h3>
                <p className="text-gray-600">
                  {industry.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Industry Expertise Matters */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Industry Expertise Matters
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Every industry has unique challenges, regulations, and requirements. 
            Our team brings deep domain expertise across sectors, ensuring that 
            the solutions we deliver are not just effective, but precisely aligned 
            with your industry's specific needs.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 pt-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
              <p className="text-gray-600">Industries Served</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">7+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <p className="text-gray-600">Projects Completed</p>
            </div>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
