const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const caseStudies = [
  {
    slug: "sgs-laser",
    title: "Sri Guru Sai Laser",
    subtitle: "Precision Engineered · High Precision Laser Cutting",
    tags: JSON.stringify(["Manufacturing", "Web Development", "SEO"]),
    overview:
      "Sri Guru Sai Laser is Bengaluru's premier CNC laser cutting and custom fabrication studio. Cortex designed and developed their complete digital presence — a high-performance website showcasing their industrial capabilities, services, and portfolio to clients across Karnataka.",
    challenge:
      "SGS Laser had zero digital footprint. Despite being an industry leader in precision CNC cutting, they relied entirely on word-of-mouth. They needed a professional web presence that could attract B2B clients, showcase their fabrication capabilities, and rank on search engines for local manufacturing queries.",
    solution:
      "Cortex built a fast, SEO-optimized website with a bold industrial design language. We implemented a service showcase with rich imagery, an interactive portfolio gallery, a contact-driven lead funnel, and deep on-page SEO targeting high-intent manufacturing keywords in Bengaluru and Karnataka.",
    features: JSON.stringify([
      "Industrial-grade responsive website design",
      "Service & capability showcase pages",
      "Portfolio gallery with project details",
      "Contact form with lead capture integration",
      "On-page SEO for local manufacturing queries",
      "Google Business Profile optimization",
    ]),
    results: JSON.stringify([
      "300% increase in inbound enquiries within 3 months",
      "Page 1 Google ranking for 'laser cutting Bengaluru'",
      "40% reduction in client onboarding time via digital portfolio",
      "Mobile-first performance score of 95+",
    ]),
    logo: "/sgs-logo.webp",
    websiteUrl: "https://srigurusailaser.com",
  },
  {
    slug: "buc-india",
    title: "Bikers Unity Calls (BUC) India",
    subtitle: "India's Premier Riding Community",
    tags: JSON.stringify(["Community", "Full-Stack", "MERN", "Mobile App"]),
    overview:
      "BUC India is a heavy-duty full-stack web platform built to manage, connect, and inspire the largest motorcycle riding community in India. Cortex engineered the complete MERN stack application — from premium UI to secure backend infrastructure.",
    challenge:
      "BUC India had a rapidly growing community of 50,000+ riders scattered across WhatsApp groups and social media. They needed a centralized platform for ride coordination, member management, event scheduling, and community engagement — without losing the raw, rider-first culture.",
    solution:
      "Cortex architected and delivered a full MERN stack platform with real-time ride tracking, event management, chapter-based member directories, and a custom admin dashboard. The entire system was designed to scale with the community while keeping the biker identity front and center.",
    features: JSON.stringify([
      "Member registration & profile management",
      "Chapter-based community directories",
      "Ride event creation, RSVP & live tracking",
      "Admin dashboard for national & chapter leads",
      "Real-time notifications & announcements",
      "Media gallery for ride documentation",
    ]),
    results: JSON.stringify([
      "50,000+ registered community members onboarded",
      "200+ rides coordinated through the platform",
      "85% reduction in manual coordination overhead",
      "Real-time ride tracking across 15+ Indian states",
    ]),
    logo: "/buc-logo.jpg",
    websiteUrl: "https://bucindia.com",
  },
  {
    slug: "humanity-calls",
    title: "Humanity Calls",
    subtitle: "Compassion-Driven Community Impact",
    tags: JSON.stringify(["Community", "Social Impact", "Web App"]),
    overview:
      "Humanity Calls is a compassion-driven community platform connecting volunteers, donors, and NGOs for global humanitarian impact. Cortex built a modern, accessible web application that simplifies the process of contributing to meaningful social causes.",
    challenge:
      "Humanitarian organizations often struggle with fragmented volunteer databases, opaque donation tracking, and disconnected communication channels. Humanity Calls needed a unified digital platform that could bridge the gap between willing contributors and organizations doing critical work on the ground.",
    solution:
      "Cortex designed and developed a clean, trust-focused web application with intuitive volunteer sign-up flows, transparent donation tracking, NGO partnership directories, and impact dashboards. The platform prioritizes accessibility and simplicity to lower the barrier to social participation.",
    features: JSON.stringify([
      "Volunteer registration & opportunity matching",
      "Transparent donation tracking dashboard",
      "NGO partnership directory & profiles",
      "Impact metrics & reporting",
      "Event coordination for humanitarian drives",
      "Multi-language accessibility support",
    ]),
    results: JSON.stringify([
      "Connected 100+ NGOs on a single platform",
      "Streamlined volunteer onboarding by 60%",
      "Full transparency on donation allocation",
      "Mobile-responsive design for field accessibility",
    ]),
    logo: "/humanitycalls-logo.png",
    websiteUrl: "https://humanitycalls.org",
  },
];

const partners = [
  { name: "SGS", logoUrl: "/sgs-logo.webp", websiteUrl: "https://www.sgslaser.in/" },
  { name: "Bikers Unity Calls", logoUrl: "/buc-logo.jpg", websiteUrl: "https://www.bucindia.com/" },
  { name: "Humanity Calls", logoUrl: "/humanitycalls-logo.png", websiteUrl: "https://www.humanitycalls.org/" },
];

async function main() {
  for (const p of caseStudies) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  for (const p of partners) {
    const existing = await prisma.partner.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.partner.create({ data: p });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
