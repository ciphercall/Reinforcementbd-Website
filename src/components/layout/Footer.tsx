import Link from 'next/link'
import Image from 'next/image'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Linkedin, 
  Twitter 
} from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Managed Staffing', href: '/services/managed-staffing' },
    { name: 'Sales Force Outsourcing', href: '/services/sales-force' },
    { name: 'HR Outsourcing', href: '/services/hr-outsourcing' },
    { name: 'IT Services', href: '/services/it-services' },
    { name: 'Corporate Training', href: '/services/corporate-training' },
    { name: 'Payroll Services', href: '/services/payroll' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Industries', href: '/industries' },
    { name: 'Partners', href: '/partners' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ]
}

const contactInfo = {
  address: 'House 30, Road 20, Block K, Banani, Dhaka 1213',
  phone: '+880 1310 88 66 00',
  email: 'info@marshgroupbd.com',
  website: 'www.marshgroupbd.com'
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logos/rg blue and gray full logo.jpg"
                alt="MARSH Services"
                width={160}
                height={45}
                className="h-11 w-auto rounded"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              MARSH Services and Outsourcing is a global talent and business solutions provider, 
              empowering businesses to scale efficiently.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{contactInfo.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © {new Date().getFullYear()} MARSH Services & Outsourcing. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
