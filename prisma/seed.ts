import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ragrpbd.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@ragrpbd.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create site settings
  const settings = [
    { key: 'site_name', value: 'Reinforcement Group' },
    { key: 'site_tagline', value: 'Your Vision, Our Expertise' },
    { key: 'site_description', value: 'Professional Electrical & Automation, Architectural Design, and IT Solutions provider since 2018' },
    { key: 'contact_email', value: 'info@ragrpbd.com' },
    { key: 'contact_phone', value: '+88 013 26 24 95 85' },
    { key: 'contact_address', value: '5th floor, ka-81/4B, Kha-Para, Khilkhet, Dhaka-1229, Bangladesh' },
    { key: 'facebook_url', value: 'https://facebook.com/reinforcementbd' },
    { key: 'linkedin_url', value: 'https://linkedin.com/company/reinforcementbd' },
    { key: 'twitter_url', value: 'https://twitter.com/reinforcementbd' },
    { key: 'working_hours', value: 'Sat - Thu: 9:00 AM - 6:00 PM' },
    { key: 'website_url', value: 'https://www.ragrpbd.com' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('✅ Site settings created');

  // Create services - Organized by divisions
  const services = [
    // Reinforcement Automation Division
    {
      title: 'Electrical & Automation Equipment Supply',
      slug: 'electrical-automation-supply',
      description: 'Complete supply of electrical and automation equipment for industrial and commercial projects. Industrial automation components, electrical switchgear and panels, PLC and SCADA systems, sensors and instrumentation, motor drives and controllers.',
      details: `<p>We provide comprehensive electrical and automation equipment supply services including:</p>
      <ul>
        <li>Industrial automation components</li>
        <li>Electrical switchgear and panels</li>
        <li>PLC and SCADA systems</li>
        <li>Sensors and instrumentation</li>
        <li>Motor drives and controllers</li>
      </ul>
      <p>Our extensive network of international suppliers ensures quality products at competitive prices.</p>`,
      icon: 'Zap',
      image: '/images/automation/1.png',
      order: 1,
    },
    {
      title: 'Electrical Erection & Commissioning',
      slug: 'electrical-erection-commissioning',
      description: 'Professional installation and commissioning of electrical systems and equipment. High and low voltage installations, substation setup, cable laying and termination.',
      details: `<p>Our expert team provides complete electrical erection and commissioning services:</p>
      <ul>
        <li>High and low voltage installations</li>
        <li>Substation setup and commissioning</li>
        <li>Cable laying and termination</li>
        <li>Panel installation and wiring</li>
        <li>Testing and quality assurance</li>
      </ul>`,
      icon: 'Settings',
      image: '/images/automation/2.png',
      order: 2,
    },
    {
      title: 'Electronics Devices Repair',
      slug: 'electronics-repair',
      description: 'Expert repair services for industrial electronics and automation devices including drives, inverters, PLC modules, and HMI panels.',
      details: `<p>We offer professional repair services for:</p>
      <ul>
        <li>Industrial drives and inverters</li>
        <li>PLC modules and controllers</li>
        <li>HMI and touch panels</li>
        <li>Power supplies and UPS</li>
        <li>Circuit boards and electronic components</li>
      </ul>`,
      icon: 'Wrench',
      image: '/images/automation/3.png',
      order: 3,
    },
    {
      title: 'Factory Automation',
      slug: 'factory-automation',
      description: 'Complete factory automation solutions for improved productivity and efficiency including production line automation and robotic integration.',
      details: `<p>Transform your manufacturing with our automation solutions:</p>
      <ul>
        <li>Production line automation</li>
        <li>Robotic integration</li>
        <li>Process control systems</li>
        <li>Quality control automation</li>
        <li>Data acquisition and monitoring</li>
      </ul>`,
      icon: 'Factory',
      image: '/images/automation/4.png',
      order: 4,
    },
    {
      title: 'Energy Management',
      slug: 'energy-management',
      description: 'Smart energy solutions for cost reduction and sustainability including energy audit, power factor correction, and solar integration.',
      details: `<p>Our energy management services include:</p>
      <ul>
        <li>Energy audit and analysis</li>
        <li>Power factor correction</li>
        <li>Load management systems</li>
        <li>Solar and renewable integration</li>
        <li>Energy monitoring dashboards</li>
      </ul>`,
      icon: 'Battery',
      image: '/images/automation/5.png',
      order: 5,
    },
    {
      title: 'Machine Maintenance',
      slug: 'machine-maintenance',
      description: 'Preventive and corrective maintenance for industrial machinery including breakdown support and annual maintenance contracts.',
      details: `<p>Keep your equipment running with our maintenance services:</p>
      <ul>
        <li>Preventive maintenance programs</li>
        <li>Breakdown support and repair</li>
        <li>Condition monitoring</li>
        <li>Spare parts management</li>
        <li>Annual maintenance contracts</li>
      </ul>`,
      icon: 'Tool',
      image: '/images/automation/6.png',
      order: 6,
    },
    {
      title: 'Professional Training',
      slug: 'professional-training',
      description: 'Technical training programs for automation and electrical professionals including PLC programming and safety training.',
      details: `<p>Develop your workforce with our training programs:</p>
      <ul>
        <li>PLC programming courses</li>
        <li>Electrical safety training</li>
        <li>Automation technology workshops</li>
        <li>Industrial maintenance training</li>
        <li>Customized corporate training</li>
      </ul>`,
      icon: 'GraduationCap',
      image: '/images/automation/7.png',
      order: 7,
    },
    {
      title: 'Engineering & Consultancy',
      slug: 'engineering-consultancy',
      description: 'Expert engineering consultancy for industrial projects including feasibility studies and system design.',
      details: `<p>Our consultancy services cover:</p>
      <ul>
        <li>Feasibility studies</li>
        <li>System design and engineering</li>
        <li>Project management</li>
        <li>Technical specifications</li>
        <li>Vendor evaluation</li>
      </ul>`,
      icon: 'FileCheck',
      image: '/images/automation/8.png',
      order: 8,
    },
    {
      title: 'R&D Lab',
      slug: 'rd-lab',
      description: 'Research and development for innovative automation solutions including product development and prototype creation.',
      details: `<p>Our R&D lab focuses on:</p>
      <ul>
        <li>Product development</li>
        <li>Prototype creation</li>
        <li>Technology research</li>
        <li>Custom solution development</li>
        <li>Testing and validation</li>
      </ul>`,
      icon: 'Microscope',
      image: '/images/automation/9.png',
      order: 9,
    },

    // Reinforcement Architect View Division
    {
      title: 'Architectural Design',
      slug: 'architectural-design',
      description: 'Creative and functional architectural designs for residential, commercial, and industrial buildings with innovative aesthetics.',
      details: `<p>Our architectural design services include:</p>
      <ul>
        <li>Residential building design</li>
        <li>Commercial complex design</li>
        <li>Industrial facility design</li>
        <li>Interior design</li>
        <li>Landscape design</li>
      </ul>`,
      icon: 'Building2',
      image: '/images/services/architect.jpg',
      order: 10,
    },
    {
      title: 'Electrical Design',
      slug: 'electrical-design',
      description: 'Complete electrical system design for buildings and facilities including power distribution and smart building integration.',
      details: `<p>Our electrical design expertise covers:</p>
      <ul>
        <li>Power distribution design</li>
        <li>Lighting design</li>
        <li>Grounding and protection systems</li>
        <li>Emergency power systems</li>
        <li>Smart building integration</li>
      </ul>`,
      icon: 'Lightbulb',
      image: '/images/services/electrical-design.jpg',
      order: 11,
    },
    {
      title: 'Plumbing & Sanitary',
      slug: 'plumbing-sanitary',
      description: 'Professional plumbing and sanitary system design and installation including water supply and drainage systems.',
      details: `<p>Complete plumbing solutions including:</p>
      <ul>
        <li>Water supply system design</li>
        <li>Drainage and sewerage</li>
        <li>Rainwater harvesting</li>
        <li>Water treatment systems</li>
        <li>Sanitary fixture installation</li>
      </ul>`,
      icon: 'Droplet',
      image: '/images/services/plumbing.jpg',
      order: 12,
    },
    {
      title: 'Fire Fighting System',
      slug: 'fire-fighting-system',
      description: 'Comprehensive fire protection and safety system design including detection, sprinkler, and alarm systems.',
      details: `<p>Fire safety solutions including:</p>
      <ul>
        <li>Fire detection systems</li>
        <li>Sprinkler system design</li>
        <li>Fire hydrant systems</li>
        <li>Fire alarm integration</li>
        <li>Emergency evacuation planning</li>
      </ul>`,
      icon: 'Flame',
      image: '/images/services/fire-fighting.jpg',
      order: 13,
    },
    {
      title: '3D Modeling & Visualization',
      slug: '3d-modeling',
      description: 'Realistic 3D models and visualizations for architectural projects including photorealistic rendering and virtual walkthroughs.',
      details: `<p>Our 3D services include:</p>
      <ul>
        <li>3D architectural modeling</li>
        <li>Photorealistic rendering</li>
        <li>Virtual walkthroughs</li>
        <li>BIM modeling</li>
        <li>Animation and presentation</li>
      </ul>`,
      icon: 'Box',
      image: '/images/services/3d-modeling.jpg',
      order: 14,
    },

    // Reinforcement IT Zone Division
    {
      title: 'Web Development',
      slug: 'web-development',
      description: 'Modern, responsive websites and web applications including corporate sites, e-commerce, and content management systems.',
      details: `<p>Our web development services include:</p>
      <ul>
        <li>Corporate websites</li>
        <li>E-commerce platforms</li>
        <li>Web applications</li>
        <li>Content management systems</li>
        <li>Progressive web apps</li>
      </ul>`,
      icon: 'Globe',
      image: '/images/it/I33.jfif',
      order: 15,
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      description: 'Native and cross-platform mobile applications for iOS, Android, and enterprise solutions.',
      details: `<p>Mobile solutions for:</p>
      <ul>
        <li>iOS applications</li>
        <li>Android applications</li>
        <li>Cross-platform apps</li>
        <li>Enterprise mobile solutions</li>
        <li>App maintenance and support</li>
      </ul>`,
      icon: 'Smartphone',
      image: '/images/it/I37.jfif',
      order: 16,
    },
    {
      title: 'Cloud Services',
      slug: 'cloud-services',
      description: 'Scalable cloud infrastructure and hosting solutions including migration, IaaS, and disaster recovery.',
      details: `<p>Cloud services including:</p>
      <ul>
        <li>Cloud migration</li>
        <li>Infrastructure as a Service</li>
        <li>Cloud hosting</li>
        <li>Backup and disaster recovery</li>
        <li>Cloud optimization</li>
      </ul>`,
      icon: 'Cloud',
      image: '/images/it/I39.jfif',
      order: 17,
    },
    {
      title: 'Software Development',
      slug: 'software-development',
      description: 'Custom software solutions for business automation including ERP, CRM, and API development.',
      details: `<p>Software development services:</p>
      <ul>
        <li>Enterprise applications</li>
        <li>ERP and CRM systems</li>
        <li>Business process automation</li>
        <li>API development</li>
        <li>Legacy system modernization</li>
      </ul>`,
      icon: 'Code',
      image: '/images/it/I41.jfif',
      order: 18,
    },
    {
      title: 'Cyber Security',
      slug: 'cyber-security',
      description: 'Comprehensive security solutions to protect your digital assets including assessment, testing, and monitoring.',
      details: `<p>Security services including:</p>
      <ul>
        <li>Security assessment</li>
        <li>Penetration testing</li>
        <li>Security monitoring</li>
        <li>Incident response</li>
        <li>Security training</li>
      </ul>`,
      icon: 'Shield',
      image: '/images/services/security.jpg',
      order: 19,
    },
    {
      title: 'AI & Machine Learning',
      slug: 'ai-ml',
      description: 'Intelligent solutions powered by artificial intelligence including predictive analytics and computer vision.',
      details: `<p>AI/ML solutions for:</p>
      <ul>
        <li>Predictive analytics</li>
        <li>Computer vision</li>
        <li>Natural language processing</li>
        <li>Recommendation systems</li>
        <li>Process automation with AI</li>
      </ul>`,
      icon: 'Brain',
      image: '/images/services/ai.jpg',
      order: 20,
    },
    {
      title: 'Blockchain Solutions',
      slug: 'blockchain',
      description: 'Decentralized applications and blockchain integration including smart contracts and DApp development.',
      details: `<p>Blockchain services including:</p>
      <ul>
        <li>Smart contract development</li>
        <li>DApp development</li>
        <li>Blockchain consulting</li>
        <li>Token development</li>
        <li>Supply chain blockchain</li>
      </ul>`,
      icon: 'Link',
      image: '/images/services/blockchain.jpg',
      order: 21,
    },
    {
      title: 'IoT Solutions',
      slug: 'iot-solutions',
      description: 'Connected devices and Internet of Things implementations including industrial IoT and smart automation.',
      details: `<p>IoT solutions for:</p>
      <ul>
        <li>Industrial IoT</li>
        <li>Smart home automation</li>
        <li>Asset tracking</li>
        <li>Remote monitoring</li>
        <li>IoT platform development</li>
      </ul>`,
      icon: 'Wifi',
      image: '/images/services/iot.jpg',
      order: 22,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log('✅ Services created');

  // Create team members
  const teamMembers = [
    {
      name: 'Engr. Md. Shariful Islam',
      position: 'Director',
      bio: 'Founder and Director of Reinforcement Group with extensive experience in electrical engineering and automation. Leading the company vision since 2018.',
      image: '/images/team/shariful-islam.jpg',
      email: 'shariful@ragrpbd.com',
      linkedin: 'https://linkedin.com/in/shariful-islam',
      order: 1,
    },
    {
      name: 'Engr. Gazi Monir-Uz-Zaman',
      position: 'Director',
      bio: 'Co-Director bringing strategic leadership and technical expertise to drive company growth and innovation.',
      image: '/images/team/gazi-monir.jpg',
      email: 'gazi@ragrpbd.com',
      linkedin: 'https://linkedin.com/in/gazi-monir',
      order: 2,
    },
    {
      name: 'Ar. Miss. Sultana',
      position: 'Head of Design',
      bio: 'Leading the Reinforcement Architect View division with creative architectural designs and innovative solutions.',
      image: '/images/team/sultana.jpg',
      email: 'sultana@ragrpbd.com',
      linkedin: 'https://linkedin.com/in/miss-sultana',
      order: 3,
    },
    {
      name: 'Engr. Md. Sarful Hasan',
      position: 'Chief Advisor',
      bio: 'Providing strategic guidance and technical advisory services with years of industry experience.',
      image: '/images/team/sarful-hasan.jpg',
      email: 'sarful@ragrpbd.com',
      linkedin: 'https://linkedin.com/in/sarful-hasan',
      order: 4,
    },
    {
      name: 'Engr. Md. Selim Reza',
      position: 'Senior Engineer',
      bio: 'Expert in automation and electrical systems with hands-on project execution experience.',
      image: '/images/team/selim-reza.jpg',
      email: 'selim@ragrpbd.com',
      linkedin: 'https://linkedin.com/in/selim-reza',
      order: 5,
    },
    {
      name: 'Pulok Kumar',
      position: 'IT Specialist',
      bio: 'Leading IT solutions development with expertise in web and software development.',
      image: '/images/team/pulok-kumar.jpg',
      email: 'pulok@ragrpbd.com',
      linkedin: 'https://linkedin.com/in/pulok-kumar',
      order: 6,
    },
    {
      name: 'Sarowar Hossain',
      position: 'Technical Engineer',
      bio: 'Specialized in technical implementations and project coordination.',
      image: '/images/team/sarowar-hossain.jpg',
      email: 'sarowar@ragrpbd.com',
      linkedin: 'https://linkedin.com/in/sarowar-hossain',
      order: 7,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.create({
      data: member,
    });
  }
  console.log('✅ Team members created');

  // Create industries
  const industries = [
    { name: 'Manufacturing', icon: 'Factory', order: 1 },
    { name: 'Textile & Garments', icon: 'Shirt', order: 2 },
    { name: 'Pharmaceuticals', icon: 'Pill', order: 3 },
    { name: 'Food & Beverage', icon: 'UtensilsCrossed', order: 4 },
    { name: 'Real Estate', icon: 'Building', order: 5 },
    { name: 'Healthcare', icon: 'Heart', order: 6 },
    { name: 'Education', icon: 'GraduationCap', order: 7 },
    { name: 'Retail', icon: 'ShoppingCart', order: 8 },
  ];

  for (const industry of industries) {
    await prisma.industry.create({
      data: industry,
    });
  }
  console.log('✅ Industries created');

  // Create page content
  const pageContents = [
    // Homepage
    {
      page: 'home',
      section: 'hero',
      content: JSON.stringify({
        title: 'Your Vision, Our Expertise',
        subtitle: 'Reinforcement Group',
        description: 'Professional Electrical & Automation, Architectural Design, and IT Solutions provider transforming businesses since 2018.',
        primaryButton: { text: 'Explore Services', link: '/services' },
        secondaryButton: { text: 'Contact Us', link: '/contact' },
        backgroundImage: '/images/hero/hero-bg.jpg',
        slides: [
          { image: '/images/automation/1.png', title: 'Automation Excellence' },
          { image: '/images/automation/2.png', title: 'Industrial Solutions' },
          { image: '/images/automation/3.png', title: 'IT Innovation' },
        ]
      }),
    },
    {
      page: 'home',
      section: 'about',
      content: JSON.stringify({
        title: 'About Reinforcement Group',
        subtitle: 'Building Tomorrow Today',
        description: 'Reinforcement Group started its journey in 2018 as "Reinforcement Automation" and has grown to become a diversified company with three specialized divisions serving clients across Bangladesh and beyond.',
        features: [
          'Established in 2018',
          'Three specialized divisions',
          'Expert team of engineers',
          'Client-focused approach',
        ],
        image: '/images/about/about-main.jpg',
      }),
    },
    {
      page: 'home',
      section: 'divisions',
      content: JSON.stringify({
        title: 'Our Divisions',
        subtitle: 'Three Pillars of Excellence',
        divisions: [
          {
            name: 'Reinforcement Automation',
            description: 'Electrical & Automation equipment supply, installation, and maintenance services.',
            icon: 'Zap',
            image: '/images/automation/1.png',
            link: '/services#automation',
          },
          {
            name: 'Reinforcement Architect View',
            description: 'Architectural design, electrical design, and 3D visualization services.',
            icon: 'Building2',
            image: '/images/services/architect.jpg',
            link: '/services#architect',
          },
          {
            name: 'Reinforcement IT Zone',
            description: 'Web, mobile, cloud, AI/ML, and software development services.',
            icon: 'Code',
            image: '/images/it/I33.jfif',
            link: '/services#it',
          },
        ]
      }),
    },
    {
      page: 'home',
      section: 'stats',
      content: JSON.stringify({
        title: 'Our Achievements',
        subtitle: 'Numbers That Speak',
        stats: [
          { value: '100+', label: 'Projects Completed' },
          { value: '50+', label: 'Happy Clients' },
          { value: '20+', label: 'Team Members' },
          { value: '6+', label: 'Years Experience' },
        ]
      }),
    },
    {
      page: 'home',
      section: 'cta',
      content: JSON.stringify({
        title: 'Ready to Start Your Project?',
        subtitle: 'Let\'s Build Something Great Together',
        description: 'Contact us today to discuss your project requirements and discover how we can help transform your vision into reality.',
        button: { text: 'Get Started', link: '/contact' },
        backgroundImage: '/images/cta/cta-bg.jpg',
      }),
    },

    // About page
    {
      page: 'about',
      section: 'hero',
      content: JSON.stringify({
        title: 'About Us',
        subtitle: 'Our Story',
        description: 'Learn about our journey, values, and commitment to excellence.',
        backgroundImage: '/images/hero/about-hero.jpg',
      }),
    },
    {
      page: 'about',
      section: 'story',
      content: JSON.stringify({
        title: 'Our Journey',
        subtitle: 'From 2018 to Today',
        description: 'Reinforcement Group started its journey in 2018 as "Reinforcement Automation", focusing on electrical and automation solutions. In 2021, we expanded to include architectural services under "Reinforcement Architect View" and IT services under "Reinforcement IT Zone".',
        milestones: [
          { year: '2018', event: 'Founded as Reinforcement Automation' },
          { year: '2019', event: 'Expanded automation services' },
          { year: '2020', event: 'Grew client base nationwide' },
          { year: '2021', event: 'Launched Architect View & IT Zone divisions' },
          { year: '2022', event: 'Major project completions' },
          { year: '2023', event: 'Continued growth and innovation' },
          { year: '2024', event: 'Strengthening market position' },
        ],
        image: '/images/about/journey.jpg',
      }),
    },
    {
      page: 'about',
      section: 'mission',
      content: JSON.stringify({
        title: 'Our Mission & Vision',
        subtitle: 'What Drives Us',
        mission: 'To provide innovative and reliable electrical, automation, architectural, and IT solutions that exceed client expectations while maintaining the highest standards of quality and safety.',
        vision: 'To be the leading integrated solutions provider in Bangladesh, recognized for excellence, innovation, and customer satisfaction.',
        values: [
          { title: 'Excellence', description: 'Striving for the highest quality in everything we do.' },
          { title: 'Innovation', description: 'Embracing new technologies and creative solutions.' },
          { title: 'Integrity', description: 'Operating with honesty and transparency.' },
          { title: 'Customer Focus', description: 'Putting our clients first in every decision.' },
        ],
      }),
    },

    // Services page
    {
      page: 'services',
      section: 'hero',
      content: JSON.stringify({
        title: 'Our Services',
        subtitle: 'Comprehensive Solutions',
        description: 'Explore our wide range of services across automation, architecture, and IT.',
        backgroundImage: '/images/hero/services-hero.jpg',
      }),
    },

    // Contact page
    {
      page: 'contact',
      section: 'hero',
      content: JSON.stringify({
        title: 'Contact Us',
        subtitle: 'Get In Touch',
        description: 'We\'d love to hear from you. Reach out to discuss your project.',
        backgroundImage: '/images/hero/contact-hero.jpg',
      }),
    },
    {
      page: 'contact',
      section: 'info',
      content: JSON.stringify({
        title: 'Contact Information',
        subtitle: 'Reach Out To Us',
        phone: '+88 013 26 24 95 85',
        email: 'info@ragrpbd.com',
        address: '5th floor, ka-81/4B, Kha-Para, Khilkhet, Dhaka-1229, Bangladesh',
        website: 'www.ragrpbd.com',
        workingHours: 'Saturday - Thursday: 9:00 AM - 6:00 PM',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1234567890!2d90.4234567890!3d23.8234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzI0LjQiTiA5MMKwMjUnMjQuNCJF!5e0!3m2!1sen!2sbd!4v1234567890',
      }),
    },

    // Industries page
    {
      page: 'industries',
      section: 'hero',
      content: JSON.stringify({
        title: 'Industries We Serve',
        subtitle: 'Sector Expertise',
        description: 'We provide tailored solutions for various industries.',
        backgroundImage: '/images/hero/industries-hero.jpg',
      }),
    },

    // Partners page
    {
      page: 'partners',
      section: 'hero',
      content: JSON.stringify({
        title: 'Our Partners',
        subtitle: 'Trusted Collaborations',
        description: 'We work with leading brands and companies.',
        backgroundImage: '/images/hero/partners-hero.jpg',
      }),
    },
  ];

  for (const content of pageContents) {
    await prisma.pageContent.upsert({
      where: { page_section: { page: content.page, section: content.section } },
      update: content,
      create: content,
    });
  }
  console.log('✅ Page content created');

  // Create partners
  const partners = [
    { name: 'Partner 1', description: 'Technology partner for automation solutions.', partnership: 'Strategic technology partnership for industrial automation.', logo: '/images/partners/partner1.png', website: '#', order: 1 },
    { name: 'Partner 2', description: 'Software development partner.', partnership: 'Collaboration on enterprise software solutions.', logo: '/images/partners/partner2.png', website: '#', order: 2 },
    { name: 'Partner 3', description: 'Engineering partner for architectural projects.', partnership: 'Joint ventures in building design and construction.', logo: '/images/partners/partner3.png', website: '#', order: 3 },
    { name: 'Partner 4', description: 'Cloud infrastructure partner.', partnership: 'Cloud hosting and infrastructure management.', logo: '/images/partners/partner4.png', website: '#', order: 4 },
  ];

  for (const partner of partners) {
    await prisma.partner.create({
      data: partner,
    });
  }
  console.log('✅ Partners created');

  // Create testimonials
  const testimonials = [
    {
      clientName: 'Ahmed Rahman',
      company: 'ABC Manufacturing Ltd.',
      position: 'Factory Manager',
      content: 'Reinforcement Group provided excellent automation solutions for our factory. Their team was professional and delivered on time.',
      rating: 5,
      image: '/images/testimonials/client1.jpg',
    },
    {
      clientName: 'Fatima Khatun',
      company: 'XYZ Real Estate',
      position: 'Project Director',
      content: 'The architectural designs from Reinforcement Architect View exceeded our expectations. Highly recommend their services.',
      rating: 5,
      image: '/images/testimonials/client2.jpg',
    },
    {
      clientName: 'Kamal Hossain',
      company: 'Tech Solutions Ltd.',
      position: 'IT Manager',
      content: 'Their IT team developed a custom software solution that streamlined our operations. Great experience working with them.',
      rating: 5,
      image: '/images/testimonials/client3.jpg',
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }
  console.log('✅ Testimonials created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
