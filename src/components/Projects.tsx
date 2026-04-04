"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    id: 1,
    slug: "sgs-laser",
    name: "Sri Guru Sai Laser",
    desc: "Precision-engineered digital presence for Bengaluru's premier CNC laser cutting and custom fabrication studio.",
    tags: ["Manufacturing", "Web Development", "SEO"],
  },
  {
    id: 2,
    slug: "buc-india",
    name: "BUC India",
    desc: "A heavy-duty full-stack platform built to manage, connect, and inspire India's largest motorcycle riding community.",
    tags: ["Community", "Full-Stack", "MERN"],
  },
  {
    id: 3,
    slug: "humanity-calls",
    name: "Humanity Calls",
    desc: "A compassion-driven community platform connecting volunteers, donors, and NGOs for global humanitarian impact.",
    tags: ["Community", "Social Impact", "Web App"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-[var(--color-bg-alt)]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="inline-block text-[var(--color-accent-secondary)] font-heading font-bold text-xs tracking-widest uppercase mb-6">
                Work
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--color-text-primary)] tracking-tight">
                Featured Projects
              </h2>
            </ScrollReveal>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={(index % 3) * 0.1}>
              <Link href={`/case-study/${project.slug}`} className="block h-full">
                {/* Sleek, minimal card wrapper */}
                <div className="relative group rounded-2xl p-[1px] bg-white/5 hover:bg-gradient-to-br hover:from-white/40 hover:via-white/5 hover:to-transparent transition-all duration-700 h-full cursor-pointer flex flex-col">
                  <div className="bg-[#0a0a0a] rounded-2xl h-full w-full p-8 md:p-10 flex flex-col justify-between group-hover:bg-black transition-colors duration-700">
                    
                    <div>
                      <h3 className="font-heading font-light text-2xl md:text-3xl text-white mb-4">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 font-light text-base md:text-lg mb-8 leading-relaxed">
                        {project.desc}
                      </p>
                    </div>
                    
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="px-3 py-1 rounded-full border border-white/10 text-gray-300 text-[10px] sm:text-xs font-sans tracking-widest uppercase bg-transparent whitespace-nowrap overflow-hidden text-ellipsis">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-white/40 group-hover:text-white font-sans font-bold text-xs tracking-widest uppercase mt-4 transition-colors duration-300">
                        View Case Study
                        <svg className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
