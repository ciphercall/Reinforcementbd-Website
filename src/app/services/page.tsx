import { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CTASection } from '@/components/sections/CTASection'
import { 
  Users, 
  TrendingUp, 
  Briefcase, 
  GraduationCap, 
  Laptop, 
  Calculator,
  Building,
  Wrench,
  MonitorCheck,
  FileText,
  CreditCard,
  Warehouse,
  Shield,
  Video,
  Headphones,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our comprehensive range of services including Managed Staffing, HR Outsourcing, IT Services, Corporate Training, and more.',
}

const services = [
  {
    title: 'Managed Staffing Service',
    slug: 'managed-staffing',
    description: 'Comprehensive staffing solutions including Expert, Professional, and Maestro Level personnel with 24/7 support.',
    icon: Users,
    details: [
      'People Outsourcing (Expert, Professional, Maestro Level)',
      'On-Demand Support',
      '24/7 Help Desk Service',
      'Laptop & Desktop Support',
      'IT Asset Management',
      'Network Support, LAN & Wi-Fi'
    ]
  },
  {
    title: 'Sales Force Outsourcing',
    slug: 'sales-force',
    description: 'End-to-end sales management including lead generation, market expansion, and CRM management.',
    icon: TrendingUp,
    details: [
      'Sales & Market Expansion',
      'Cost Efficiency & Faster Time-to-Market',
      'Expertise & Specialization',
      'Sales Support & Customer Relationship Management',
      'Scalability & Flexibility',
      'Data Analytics & Reporting'
    ]
  },
  {
    title: 'HR Outsourcing Service',
    slug: 'hr-outsourcing',
    description: 'Complete HR solutions from talent acquisition to payroll management and corporate training.',
    icon: Briefcase,
    details: [
      'Executive Search',
      'Talent Acquisition',
      'Head Hunting',
      'Payroll Services',
      'HRIS',
      'Corporate Trainings'
    ]
  },
  {
    title: 'Executive Support Services',
    slug: 'executive-support',
    description: 'High-level administrative and strategic support for business operations.',
    icon: Building,
    details: [
      'Administrative Service',
      'Technical Services',
      'Development, Analysis, and Execution of Strategic Direction',
      'Accounting Services'
    ]
  },
  {
    title: 'Programmer & Development Team',
    slug: 'development',
    description: 'Expert software development and IT support services for your business needs.',
    icon: Laptop,
    details: [
      'Internal Management Systems',
      'Mobile Apps',
      'PWAs',
      'Support and Maintenance',
      'Business Analysis',
      'Project Management',
      'Software Testing'
    ]
  },
  {
    title: 'Corporate Training',
    slug: 'corporate-training',
    description: 'Comprehensive training programs to enhance employee skills and productivity.',
    icon: GraduationCap,
    details: [
      'Technical Training',
      'Soft Skills Training',
      'Leadership & Management Training',
      'Sales & Customer Service Training',
      'Basic Communication Training',
      'Office Norms & Etiquette Training'
    ]
  },
  {
    title: 'IT Procurement Service',
    slug: 'it-procurement',
    description: 'Strategic IT procurement solutions for efficient technology acquisition.',
    icon: MonitorCheck,
    details: [
      'IT Product Acquisition',
      'Vendor Management',
      'Cost Optimization',
      'Technology Assessment'
    ]
  },
  {
    title: 'Managed Payroll Service',
    slug: 'payroll',
    description: 'Precision payroll management with compliance and cost optimization.',
    icon: Calculator,
    details: [
      'Complete Payroll Processing',
      'Tax Compliance',
      'Benefits Administration',
      'Expense Management'
    ]
  },
  {
    title: 'CCTV Maintenance & Support',
    slug: 'cctv-maintenance',
    description: 'Comprehensive surveillance maintenance for reliable security systems.',
    icon: Video,
    details: [
      'Regular Inspection & Maintenance',
      'Cleaning & Upkeep',
      'Functionality Checks',
      'Software Updates & Configuration',
      'Minor Repairs & Component Replacement',
      'Technical Support & Troubleshooting'
    ]
  },
  {
    title: 'IT & Accounts Audit',
    slug: 'it-audit',
    description: 'Professional audit services for IT systems and financial accounts.',
    icon: Shield,
    details: [
      'IT Infrastructure Audit',
      'Security Assessment',
      'Compliance Review',
      'Financial Audit Support'
    ]
  },
  {
    title: 'Virtual Office Solution',
    slug: 'virtual-office',
    description: 'Professional business presence without physical infrastructure.',
    icon: Warehouse,
    details: [
      'Professional Business Address',
      'Centralized Services',
      'Flexibility & Credibility',
      'Operational Efficiency'
    ]
  },
  {
    title: 'Managed ERP Solution',
    slug: 'erp',
    description: 'Integrated ERP systems for seamless business process management.',
    icon: FileText,
    details: [
      'Business Process Integration',
      'Seamless Data Flow',
      'Centralized Transaction Data',
      'Data Integrity Management'
    ]
  },
  {
    title: 'Credit Control Service',
    slug: 'credit-control',
    description: 'Expert credit management for healthy cash flow.',
    icon: CreditCard,
    details: [
      'Variable Payment Management',
      'Cost Effective Solutions',
      'Consistent Recruiters',
      'Technology-Driven Approach'
    ]
  },
  {
    title: 'General Procurement Service',
    slug: 'general-procurement',
    description: 'Complete procurement solutions for daily business operations.',
    icon: Wrench,
    details: [
      'Goods Acquisition',
      'Services Procurement',
      'Vendor Relations',
      'Operational Support'
    ]
  },
  {
    title: 'Technology Training',
    slug: 'technology-training',
    description: 'Technical training programs for professional development.',
    icon: Headphones,
    details: [
      'Application Training',
      'Product Implementation',
      'Service Maintenance',
      'Technical Certification'
    ]
  },
  {
    title: 'Workshop',
    slug: 'workshop',
    description: 'Engaging workshops with expert facilitators in technology-driven environments.',
    icon: Building,
    details: [
      'Expert-Led Sessions',
      'Technology-Driven Environment',
      'Flexible Duration',
      'Interactive Learning'
    ]
  }
]

export default function ServicesPage() {
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
              Our Core Services
            </h1>
            <p className="text-xl text-blue-100">
              Comprehensive business solutions tailored to meet your unique needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Section background="gray">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.slug} className="h-full group">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  {service.description}
                </p>
                <ul className="text-xs text-gray-500 space-y-1 mb-4">
                  {service.details.slice(0, 3).map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                  {service.details.length > 3 && (
                    <li className="text-blue-600">+{service.details.length - 3} more</li>
                  )}
                </ul>
                <Link href={`/services/${service.slug}`}>
                  <Button variant="ghost" size="sm" className="w-full group/btn">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Sales Force Outsourcing Detail Section */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Sales Force Outsourcing (SFO)"
            subtitle="Strategic and cost-effective alternative to in-house sales teams"
          />
          <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
            <p className="text-gray-600 leading-relaxed">
              MARSH offers specialized Sales Force Outsourcing (SFO) solutions for both financial 
              and non-financial organizations, providing a strategic and cost-effective alternative 
              to building and managing an in-house sales team. Our services are designed to streamline 
              your sales operations, enhance market reach, and accelerate revenue growth.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Sales Execution & Deal Closure',
                'Seamless Market Expansion',
                'Significant Cost Savings',
                'Industry-Specific Expertise',
                'Rapid Team Deployment',
                'Customer Engagement & CRM',
                'Scalable & Flexible Models',
                'Comprehensive Analytics'
              ].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
