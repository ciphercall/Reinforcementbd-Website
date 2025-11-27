// Database seeding script for MARSH Services Website
// Run with: npx ts-node prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@marshgroupbd.com' },
    update: {},
    create: {
      email: 'admin@marshgroupbd.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin'
    }
  })
  console.log('✅ Admin user created:', admin.email)

  // Create services
  const services = [
    {
      title: 'Managed Staffing Service',
      slug: 'managed-staffing',
      description: 'Expert, Professional, and Maestro Level staffing with on-demand support and 24/7 help desk.',
      details: 'People Outsourcing (Expert, Professional, Maestro Level), On-Demand Support, Help Desk Service, Laptop & Desktop Support, IT Asset Management, Network Support',
      icon: 'Users',
      order: 1
    },
    {
      title: 'Sales Force Outsourcing',
      slug: 'sales-force',
      description: 'End-to-end sales management including lead generation, market expansion, and CRM management.',
      details: 'Sales & Market Expansion, Cost Efficiency, Expertise & Specialization, Customer Relationship Management, Scalability & Flexibility, Data Analytics & Reporting',
      icon: 'TrendingUp',
      order: 2
    },
    {
      title: 'HR Outsourcing Service',
      slug: 'hr-outsourcing',
      description: 'Complete HR solutions from talent acquisition to payroll management and corporate training.',
      details: 'Executive Search, Talent Acquisition, Head Hunting, Payroll Services, HRIS, Corporate Trainings',
      icon: 'Briefcase',
      order: 3
    },
    {
      title: 'Corporate Training',
      slug: 'corporate-training',
      description: 'Comprehensive training programs to enhance employee skills and productivity.',
      details: 'Technical Training, Soft Skills Training, Leadership & Management Training, Sales & Customer Service Training, Basic Communication Training',
      icon: 'GraduationCap',
      order: 4
    },
    {
      title: 'IT Services & Procurement',
      slug: 'it-services',
      description: 'IT support, procurement, and managed services for your technology needs.',
      details: 'Laptop & Desktop Support, IT Asset Management, Network Support, Vendor Management, IT Procurement',
      icon: 'Laptop',
      order: 5
    },
    {
      title: 'Managed Payroll Service',
      slug: 'payroll',
      description: 'Precision payroll management with compliance and cost optimization.',
      details: 'Complete Payroll Processing, Tax Compliance, Benefits Administration, Expense Management',
      icon: 'Calculator',
      order: 6
    }
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    })
  }
  console.log('✅ Services created:', services.length)

  // Create team members
  const teamMembers = [
    {
      name: 'Masunul Haque Chowdhury',
      position: 'Managing Director',
      bio: 'Seasoned entrepreneur and Managing Director with a proven track record in leading both private and publicly listed companies. Brings extensive experience in taking businesses to IPO, as well as managing operations and HR across RMG and manufacturing sectors.',
      image: '/images/profile/7.jpg',
      order: 1
    },
    {
      name: 'Kazi Hamiduzzaman',
      position: 'Chief Operating Officer',
      bio: 'Experienced HR & Administration leader with a strong track record of more than 17 years across Tech, Manufacturing, and Group Companies. Specializes in HR strategy, organizational development, talent acquisition & management, and performance optimization.',
      image: '/images/profile/9.jpg',
      order: 2
    }
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.create({
      data: member
    })
  }
  console.log('✅ Team members created:', teamMembers.length)

  // Create testimonials
  const testimonials = [
    {
      clientName: 'Healthport Bangladesh Ltd',
      company: 'Healthport Bangladesh Ltd',
      content: 'We booked MARSH for a few training sessions, and the results were great. Our team is now more confident and better equipped for day-to-day tasks.',
      service: 'For Corporate Training',
      rating: 5
    },
    {
      clientName: 'Newline Clothings PLC',
      company: 'Newline Clothings PLC',
      content: 'MARSH helped us hire the right people quickly without the usual hassle. Their team understood exactly what we needed and delivered beyond our expectations.',
      service: 'For Staffing & Recruitment',
      rating: 5
    },
    {
      clientName: 'A.K. Oxygen Ltd.',
      company: 'A.K. Oxygen Ltd.',
      content: 'Outsourcing our sales team to MARSH was a smart move. They helped us expand into new markets fast and with real results.',
      service: 'For Sales Force Outsourcing',
      rating: 5
    }
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial
    })
  }
  console.log('✅ Testimonials created:', testimonials.length)

  // Create industries
  const industries = [
    { name: 'Banks & Financial Institutions', icon: 'Building2', order: 1 },
    { name: 'Foreign Aid Projects', icon: 'Plane', order: 2 },
    { name: 'Hospitality', icon: 'Hotel', order: 3 },
    { name: 'RMG & Textiles', icon: 'Factory', order: 4 },
    { name: "FMCG's", icon: 'ShoppingBag', order: 5 },
    { name: 'ICT', icon: 'Laptop', order: 6 },
    { name: 'Non-Governmental Organizations', icon: 'Heart', order: 7 },
    { name: 'Pharmaceuticals', icon: 'Pill', order: 8 },
    { name: "SME's & Startups", icon: 'Rocket', order: 9 },
    { name: 'Foreign Affairs & Affiliated Offices', icon: 'Globe', order: 10 },
    { name: 'Hospitals', icon: 'Heart', order: 11 },
    { name: 'Education', icon: 'GraduationCap', order: 12 }
  ]

  for (const industry of industries) {
    await prisma.industry.create({
      data: industry
    })
  }
  console.log('✅ Industries created:', industries.length)

  // Create partners
  const partners = [
    {
      name: 'Next Global',
      description: 'Next Global is an international recruitment, relocation, and advisory agency based in Perth. They specialize in sourcing global talent for Australian businesses, managing visa and migration support, and delivering end-to-end relocation services.',
      partnership: 'MARSH Services is partnering with Next Global to expand our reach in global talent acquisition and relocation support.',
      location: 'Perth, Australia',
      order: 1
    },
    {
      name: 'KI Training & Assessing',
      description: 'Based in Belmont, Perth, KI Training & Assessing (RTO 52593) delivers nationally accredited, high-risk work training and vocational certifications tailored for the mining, civil, and industrial sectors.',
      partnership: 'MARSH Services is teaming up with KI to offer clients a powerful blend of corporate training and vocational certification.',
      location: 'Belmont, Perth, Australia',
      order: 2
    }
  ]

  for (const partner of partners) {
    await prisma.partner.create({
      data: partner
    })
  }
  console.log('✅ Partners created:', partners.length)

  // Create site settings
  const settings = [
    { key: 'company_name', value: 'MARSH Services & Outsourcing', description: 'Company name' },
    { key: 'company_tagline', value: 'HR | BPO | IT | Managed Services', description: 'Company tagline' },
    { key: 'address', value: 'House 30, Road 20, Block K, Banani, Dhaka 1213', description: 'Office address' },
    { key: 'phone', value: '+880 1310 88 66 00', description: 'Contact phone number' },
    { key: 'email', value: 'info@marshgroupbd.com', description: 'Contact email' },
    { key: 'website', value: 'www.marshgroupbd.com', description: 'Website URL' }
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting
    })
  }
  console.log('✅ Site settings created:', settings.length)

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
