import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AutomationPartnersCarousel } from '@/components/sections/PartnerLogosCarousel'
import { CTASection } from '@/components/sections/CTASection'
import { 
  Cpu,
  Settings,
  Gauge,
  Zap,
  Shield,
  Factory,
  Wrench,
  MonitorPlay,
  CircuitBoard,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Automation Division | Reinforcement Group',
  description: 'Industrial automation solutions including PLC programming, SCADA systems, HMI design, VFD installation, and industrial control systems.',
  keywords: 'PLC programming, SCADA, HMI, VFD, industrial automation, Siemens, Schneider, Bangladesh',
}

const services = [
  {
    title: 'PLC Programming',
    description: 'Expert programming for Siemens S7, Schneider Modicon, Allen Bradley, and other major PLC brands.',
    icon: Cpu,
    image: '/images/automation/1.png',
    features: ['Siemens S7 Series', 'Schneider Modicon', 'Allen Bradley', 'Delta PLC', 'Custom Logic Design']
  },
  {
    title: 'SCADA Systems',
    description: 'Complete SCADA implementation for monitoring and control of industrial processes.',
    icon: MonitorPlay,
    image: '/images/automation/2.png',
    features: ['Real-time Monitoring', 'Data Logging', 'Alarm Management', 'Remote Access', 'Historical Trends']
  },
  {
    title: 'HMI Design & Programming',
    description: 'User-friendly Human Machine Interface design for optimal operator control.',
    icon: Settings,
    image: '/images/automation/3.png',
    features: ['Touchscreen Interfaces', 'Intuitive Design', 'Multi-language Support', 'Custom Graphics', 'Responsive Layouts']
  },
  {
    title: 'VFD Installation',
    description: 'Variable Frequency Drive installation and configuration for motor speed control.',
    icon: Zap,
    image: '/images/automation/4.png',
    features: ['Energy Savings', 'Motor Protection', 'Speed Control', 'Soft Start', 'Parameter Setup']
  },
  {
    title: 'Industrial Control Panels',
    description: 'Custom control panel design, fabrication, and installation for industrial applications.',
    icon: CircuitBoard,
    image: '/images/automation/5.png',
    features: ['Panel Design', 'Wiring & Assembly', 'Testing & Commissioning', 'Documentation', 'Maintenance Support']
  },
  {
    title: 'Process Automation',
    description: 'End-to-end automation of manufacturing and industrial processes.',
    icon: Factory,
    image: '/images/automation/6.png',
    features: ['Production Lines', 'Quality Control', 'Material Handling', 'Packaging Systems', 'Batch Processing']
  },
  {
    title: 'Instrumentation',
    description: 'Industrial instrumentation installation, calibration, and maintenance.',
    icon: Gauge,
    image: '/images/automation/7.png',
    features: ['Sensors & Transmitters', 'Flow Meters', 'Level Sensors', 'Temperature Probes', 'Calibration Services']
  },
  {
    title: 'Maintenance & Support',
    description: 'Ongoing maintenance, troubleshooting, and technical support for automation systems.',
    icon: Wrench,
    image: '/images/automation/8.png',
    features: ['24/7 Support', 'Preventive Maintenance', 'Troubleshooting', 'System Upgrades', 'Training']
  },
  {
    title: 'Safety Systems',
    description: 'Industrial safety systems design and implementation for personnel and equipment protection.',
    icon: Shield,
    image: '/images/automation/9.png',
    features: ['Safety PLCs', 'E-Stop Systems', 'Light Curtains', 'Safety Relays', 'Risk Assessment']
  }
]

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '7+', label: 'Years Experience' },
  { value: '50+', label: 'Industrial Clients' },
  { value: '24/7', label: 'Support Available' }
]

export default function AutomationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-orange-600 to-orange-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium">
                <Cpu className="w-4 h-4 mr-2" />
                Automation Division
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Industrial Automation Solutions
              </h1>
              <p className="text-xl text-orange-100 leading-relaxed">
                From PLC programming to complete SCADA systems, we deliver cutting-edge 
                automation solutions that increase efficiency, reduce costs, and enhance 
                productivity for industries across Bangladesh.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                  <Link href="/contact" className="flex items-center">
                    Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#services">View Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="bg-white/10 backdrop-blur-sm rounded-xl p-2 shadow-xl">
                    <Image
                      src={`/images/automation/${num}.png`}
                      alt={`Automation ${num}`}
                      width={200}
                      height={150}
                      className="rounded-lg object-contain w-full h-32"
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
                <div className="text-3xl md:text-4xl font-bold text-orange-600">{stat.value}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Section background="gray" id="services">
        <SectionHeader
          title="Our Automation Services"
          subtitle="Comprehensive automation solutions for every industrial need"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-50">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                    <service.icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Our Automation Division?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              With years of experience in industrial automation, we bring expertise 
              across all major PLC and SCADA platforms. Our team of certified engineers 
              delivers solutions that meet international standards while understanding 
              local industry requirements.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Certified Engineers', desc: 'Siemens & Schneider certified professionals' },
                { title: 'Multi-brand Expertise', desc: 'Work with all major automation brands' },
                { title: 'Full Lifecycle Support', desc: 'From design to commissioning & maintenance' },
                { title: 'Industry Experience', desc: 'Textile, pharma, food, manufacturing & more' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
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
              <div key={num} className="bg-gray-100 rounded-xl p-4 shadow-sm">
                <Image
                  src={`/images/automation/${num}.png`}
                  alt={`Automation showcase ${num}`}
                  width={250}
                  height={200}
                  className="rounded-lg object-contain w-full h-40"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Partners Carousel */}
      <AutomationPartnersCarousel />

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
