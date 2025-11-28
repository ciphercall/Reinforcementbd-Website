import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CTASection } from '@/components/sections/CTASection'
import { 
  Zap,
  Settings,
  Wrench,
  Factory,
  Battery,
  GraduationCap,
  Building2,
  Lightbulb,
  Droplet,
  Flame,
  Box,
  Globe,
  Smartphone,
  Cloud,
  Code,
  Shield,
  Brain,
  Link as LinkIcon,
  Wifi,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our comprehensive range of services in Electrical & Automation, Architectural Design, and IT Solutions.',
}

const automationServices = [
  {
    title: 'Electrical & Automation Equipment Supply',
    description: 'Complete supply of electrical and automation equipment for industrial and commercial projects.',
    icon: Zap,
    details: ['Industrial automation components', 'Electrical switchgear and panels', 'PLC and SCADA systems', 'Sensors and instrumentation']
  },
  {
    title: 'Electrical Erection & Commissioning',
    description: 'Professional installation and commissioning of electrical systems and equipment.',
    icon: Settings,
    details: ['High and low voltage installations', 'Substation setup', 'Cable laying and termination', 'Testing and commissioning']
  },
  {
    title: 'Electronics Devices Repair',
    description: 'Expert repair services for industrial electronics and automation devices.',
    icon: Wrench,
    details: ['Industrial drives and inverters', 'PLC modules and controllers', 'HMI and touch panels', 'Power supplies and UPS']
  },
  {
    title: 'Factory Automation',
    description: 'Complete factory automation solutions for improved productivity and efficiency.',
    icon: Factory,
    details: ['Production line automation', 'Robotic integration', 'Process control systems', 'Quality control automation']
  },
  {
    title: 'Energy Management',
    description: 'Smart energy solutions for cost reduction and sustainability.',
    icon: Battery,
    details: ['Energy audit and analysis', 'Power factor correction', 'Solar integration', 'Energy monitoring dashboards']
  },
  {
    title: 'Professional Training',
    description: 'Technical training programs for automation and electrical professionals.',
    icon: GraduationCap,
    details: ['PLC programming courses', 'Electrical safety training', 'Automation workshops', 'Corporate training']
  },
]

const architectServices = [
  {
    title: 'Architectural Design',
    description: 'Creative and functional architectural designs for all building types.',
    icon: Building2,
    details: ['Residential building design', 'Commercial complex design', 'Industrial facility design', 'Interior design']
  },
  {
    title: 'Electrical Design',
    description: 'Complete electrical system design for buildings and facilities.',
    icon: Lightbulb,
    details: ['Power distribution design', 'Lighting design', 'Grounding systems', 'Smart building integration']
  },
  {
    title: 'Plumbing & Sanitary',
    description: 'Professional plumbing and sanitary system design and installation.',
    icon: Droplet,
    details: ['Water supply system design', 'Drainage and sewerage', 'Rainwater harvesting', 'Water treatment systems']
  },
  {
    title: 'Fire Fighting System',
    description: 'Comprehensive fire protection and safety system design.',
    icon: Flame,
    details: ['Fire detection systems', 'Sprinkler system design', 'Fire hydrant systems', 'Emergency evacuation planning']
  },
  {
    title: '3D Modeling & Visualization',
    description: 'Realistic 3D models and visualizations for architectural projects.',
    icon: Box,
    details: ['3D architectural modeling', 'Photorealistic rendering', 'Virtual walkthroughs', 'BIM modeling']
  },
]

const itServices = [
  {
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications.',
    icon: Globe,
    details: ['Corporate websites', 'E-commerce platforms', 'Web applications', 'Content management systems']
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications.',
    icon: Smartphone,
    details: ['iOS applications', 'Android applications', 'Cross-platform apps', 'Enterprise mobile solutions']
  },
  {
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure and hosting solutions.',
    icon: Cloud,
    details: ['Cloud migration', 'Infrastructure as a Service', 'Cloud hosting', 'Backup and disaster recovery']
  },
  {
    title: 'Software Development',
    description: 'Custom software solutions for business automation.',
    icon: Code,
    details: ['Enterprise applications', 'ERP and CRM systems', 'Business process automation', 'API development']
  },
  {
    title: 'Cyber Security',
    description: 'Comprehensive security solutions to protect your digital assets.',
    icon: Shield,
    details: ['Security assessment', 'Penetration testing', 'Security monitoring', 'Incident response']
  },
  {
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by artificial intelligence.',
    icon: Brain,
    details: ['Predictive analytics', 'Computer vision', 'Natural language processing', 'Recommendation systems']
  },
  {
    title: 'Blockchain Solutions',
    description: 'Decentralized applications and blockchain integration.',
    icon: LinkIcon,
    details: ['Smart contract development', 'DApp development', 'Token development', 'Supply chain blockchain']
  },
  {
    title: 'IoT Solutions',
    description: 'Connected devices and Internet of Things implementations.',
    icon: Wifi,
    details: ['Industrial IoT', 'Smart home automation', 'Asset tracking', 'Remote monitoring']
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Comprehensive Solutions Across Three Divisions
            </h1>
            <p className="text-xl text-gray-600">
              From electrical automation to architectural design to cutting-edge IT solutions,
              we deliver excellence in every project.
            </p>
          </div>
        </div>
      </section>

      {/* Automation Division */}
      <Section background="white" id="automation">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Reinforcement Automation</h2>
            <p className="text-gray-600">Electrical & Automation Solutions</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automationServices.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Architect Division */}
      <Section background="gray" id="architect">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Reinforcement Architect View</h2>
            <p className="text-gray-600">Architectural Design & Engineering</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectServices.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* IT Division */}
      <Section background="white" id="it">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
            <Code className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Reinforcement IT Zone</h2>
            <p className="text-gray-600">Technology & Digital Solutions</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {itServices.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Image Gallery */}
      <Section background="gray">
        <SectionHeader
          title="Our Work"
          subtitle="A glimpse of our projects and installations"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className="relative aspect-square rounded-xl overflow-hidden group">
              <Image
                src={`/images/automation/${num}.png`}
                alt={`Project ${num}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  )
}
