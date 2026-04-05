"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discover", desc: "Requirements gathering, technical architecture, and roadmap definition." },
  { num: "02", title: "Design", desc: "UI/UX wireframing, high-fidelity prototypes, and design systems." },
  { num: "03", title: "Build", desc: "Agile engineering sprints, continuous integration, and rigid testing." },
  { num: "04", title: "Launch & Grow", desc: "Deployment, monitoring, SEO, and iterative feature enhancements." },
];

export default function HowWeWork() {
  return (
    <section id="process" className="process-section py-32 bg-[var(--color-bg-main)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="process-wrapper flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column - Heading */}
          <div className="lg:w-1/3 shrink-0">
            <div className="sticky top-32">
              <span className="inline-block text-[var(--color-accent-secondary)] font-heading font-bold text-xs tracking-widest uppercase mb-6">
                Process
              </span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--color-text-primary)] tracking-tight">
                How we work
              </h2>
            </div>
          </div>

          {/* Right Column - Steps */}
          <div className="lg:w-2/3 process-steps flex flex-col gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="process-step process-step-reveal flex flex-col md:flex-row gap-6 md:gap-10 p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#C8F542]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="process-step-number font-heading font-bold text-4xl md:text-5xl text-white/20 shrink-0 self-start">
                  {step.num}
                </div>
                
                <div>
                  <h3 className="process-step-title font-heading font-semibold text-2xl text-[var(--color-text-primary)] mb-3">
                    {step.title}
                  </h3>
                  <p className="process-step-text text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
