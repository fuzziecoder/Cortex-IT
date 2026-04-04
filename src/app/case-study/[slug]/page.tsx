import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const caseStudies: Record<string, {
  title: string;
  subtitle: string;
  tags: string[];
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  results: string[];
}> = {
  "sgs-laser": {
    title: "Sri Guru Sai Laser",
    subtitle: "Precision Engineered · High Precision Laser Cutting",
    tags: ["Manufacturing", "Web Development", "SEO"],
    overview:
      "Sri Guru Sai Laser is Bengaluru's premier CNC laser cutting and custom fabrication studio. Cortex designed and developed their complete digital presence — a high-performance website showcasing their industrial capabilities, services, and portfolio to clients across Karnataka.",
    challenge:
      "SGS Laser had zero digital footprint. Despite being an industry leader in precision CNC cutting, they relied entirely on word-of-mouth. They needed a professional web presence that could attract B2B clients, showcase their fabrication capabilities, and rank on search engines for local manufacturing queries.",
    solution:
      "Cortex built a fast, SEO-optimized website with a bold industrial design language. We implemented a service showcase with rich imagery, an interactive portfolio gallery, a contact-driven lead funnel, and deep on-page SEO targeting high-intent manufacturing keywords in Bengaluru and Karnataka.",
    features: [
      "Industrial-grade responsive website design",
      "Service & capability showcase pages",
      "Portfolio gallery with project details",
      "Contact form with lead capture integration",
      "On-page SEO for local manufacturing queries",
      "Google Business Profile optimization",
    ],
    results: [
      "300% increase in inbound enquiries within 3 months",
      "Page 1 Google ranking for 'laser cutting Bengaluru'",
      "40% reduction in client onboarding time via digital portfolio",
      "Mobile-first performance score of 95+",
    ],
  },
  "buc-india": {
    title: "Bikers Unity Calls (BUC) India",
    subtitle: "India's Premier Riding Community",
    tags: ["Community", "Full-Stack", "MERN", "Mobile App"],
    overview:
      "BUC India is a heavy-duty full-stack web platform built to manage, connect, and inspire the largest motorcycle riding community in India. Cortex engineered the complete MERN stack application — from premium UI to secure backend infrastructure.",
    challenge:
      "BUC India had a rapidly growing community of 50,000+ riders scattered across WhatsApp groups and social media. They needed a centralized platform for ride coordination, member management, event scheduling, and community engagement — without losing the raw, rider-first culture.",
    solution:
      "Cortex architected and delivered a full MERN stack platform with real-time ride tracking, event management, chapter-based member directories, and a custom admin dashboard. The entire system was designed to scale with the community while keeping the biker identity front and center.",
    features: [
      "Member registration & profile management",
      "Chapter-based community directories",
      "Ride event creation, RSVP & live tracking",
      "Admin dashboard for national & chapter leads",
      "Real-time notifications & announcements",
      "Media gallery for ride documentation",
    ],
    results: [
      "50,000+ registered community members onboarded",
      "200+ rides coordinated through the platform",
      "85% reduction in manual coordination overhead",
      "Real-time ride tracking across 15+ Indian states",
    ],
  },
  "humanity-calls": {
    title: "Humanity Calls",
    subtitle: "Compassion-Driven Community Impact",
    tags: ["Community", "Social Impact", "Web App"],
    overview:
      "Humanity Calls is a compassion-driven community platform connecting volunteers, donors, and NGOs for global humanitarian impact. Cortex built a modern, accessible web application that simplifies the process of contributing to meaningful social causes.",
    challenge:
      "Humanitarian organizations often struggle with fragmented volunteer databases, opaque donation tracking, and disconnected communication channels. Humanity Calls needed a unified digital platform that could bridge the gap between willing contributors and organizations doing critical work on the ground.",
    solution:
      "Cortex designed and developed a clean, trust-focused web application with intuitive volunteer sign-up flows, transparent donation tracking, NGO partnership directories, and impact dashboards. The platform prioritizes accessibility and simplicity to lower the barrier to social participation.",
    features: [
      "Volunteer registration & opportunity matching",
      "Transparent donation tracking dashboard",
      "NGO partnership directory & profiles",
      "Impact metrics & reporting",
      "Event coordination for humanitarian drives",
      "Multi-language accessibility support",
    ],
    results: [
      "Connected 100+ NGOs on a single platform",
      "Streamlined volunteer onboarding by 60%",
      "Full transparency on donation allocation",
      "Mobile-responsive design for field accessibility",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return { title: "Case Study — Cortex" };
  return {
    title: `${study.title} — Cortex Case Study`,
    description: study.overview,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-wide"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
          <Link href="/" className="font-heading font-bold text-lg tracking-wide uppercase">
            Cortex
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {study.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full border border-white/10 text-gray-300 text-xs font-sans tracking-widest uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-6">
            {study.title}
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl font-light tracking-wide">
            {study.subtitle}
          </p>

          {/* Divider */}
          <div className="mt-16 h-[1px] bg-white/10" />
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-xs tracking-widest uppercase text-gray-500 mb-6">
            Overview
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
            {study.overview}
          </p>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-heading text-xs tracking-widest uppercase text-gray-500 mb-6">
              The Challenge
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
              {study.challenge}
            </p>
          </div>
          <div>
            <h2 className="font-heading text-xs tracking-widest uppercase text-gray-500 mb-6">
              Our Solution
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
              {study.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto max-w-4xl px-6 md:px-12">
        <div className="h-[1px] bg-white/10" />
      </div>

      {/* Key Features */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-xs tracking-widest uppercase text-gray-500 mb-10">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {study.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-gray-400 text-xs font-heading font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-gray-300 text-base font-light leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto max-w-4xl px-6 md:px-12">
        <div className="h-[1px] bg-white/10" />
      </div>

      {/* Results */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-xs tracking-widest uppercase text-gray-500 mb-10">
            Results & Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {study.results.map((result, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent-secondary)] mt-2.5 shrink-0" />
                <p className="text-white text-lg font-light leading-relaxed">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading font-light text-3xl md:text-4xl text-white mb-8 tracking-tight">
            Ready to build something like this?
          </h2>
          <Link
            href="/#contact"
            className="inline-block px-12 py-4 rounded-full bg-white text-black font-sans font-medium text-lg tracking-wide hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            Start Your Project
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-white/5">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <span className="text-gray-500 text-sm">© {new Date().getFullYear()} Cortex</span>
          <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
