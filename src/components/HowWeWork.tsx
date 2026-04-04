"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const steps = [
  { num: "01", title: "Discover", desc: "Requirements gathering, technical architecture, and roadmap definition." },
  { num: "02", title: "Design", desc: "UI/UX wireframing, high-fidelity prototypes, and design systems." },
  { num: "03", title: "Build", desc: "Agile engineering sprints, continuous integration, and rigid testing." },
  { num: "04", title: "Launch & Grow", desc: "Deployment, monitoring, SEO, and iterative feature enhancements." },
];

export default function HowWeWork() {
  return (
    <section className="py-32 bg-[var(--color-bg-alt)] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <ScrollReveal>
          <div className="inline-block text-[var(--color-accent-secondary)] font-heading font-bold text-xs tracking-widest uppercase mb-16">
            Process
          </div>
        </ScrollReveal>
        
        {/* Horizontal timeline process */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[4%] right-[4%] h-[1px] bg-[var(--color-border-subtle)] z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.15} direction="left" distance={40}>
                <motion.div 
                  className="flex flex-col relative group"
                  whileHover="hover"
                >
                  {/* Step Number Circle */}
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-[var(--color-bg-main)] border border-[var(--color-border-subtle)] flex items-center justify-center mb-8 relative"
                    variants={{
                      hover: { 
                        borderColor: "#6B7280",
                        backgroundColor: "var(--color-chip-bg)" 
                      }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-heading font-bold text-2xl text-[var(--color-text-primary)] group-hover:text-gray-400 transition-colors">
                      {step.num}
                    </span>
                    
                    {/* Active highlight dot */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--color-accent-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  
                  <h3 className="font-heading font-semibold text-2xl text-[var(--color-text-primary)] mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-[var(--color-text-muted)] text-base leading-relaxed lg:max-w-[90%]">
                    {step.desc}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
