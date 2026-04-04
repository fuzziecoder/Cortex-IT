"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  const words = ["The", "only", "build", "that", "matters"];

  return (
    <section className="relative min-h-screen flex items-center bg-[var(--color-bg-main)] overflow-hidden pt-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col justify-center">
        
        {/* Stacked Heading */}
        <div className="flex flex-col mb-10">
          {words.map((word, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.22, 0.61, 0.36, 1]
              }}
              className="overflow-hidden"
            >
              <h1 className="font-heading font-bold text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tighter uppercase text-[var(--color-text-primary)]">
                {word}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Decorative Divider */}
        <ScrollReveal delay={0.6} duration={0.8} distance={20}>
          <div className="text-[var(--color-text-muted)] font-mono text-sm tracking-[0.3em] mb-10 opacity-60">
            / * * - _ * / _ / - - - * *
          </div>
        </ScrollReveal>

        {/* Subheading & CTAs */}
        <div className="max-w-xl">
          <ScrollReveal delay={0.7} duration={0.8} distance={20}>
            <p className="text-xl md:text-2xl text-[var(--color-text-muted)] mb-10 leading-relaxed">
              Full-stack studio for apps, websites, and AI experiences.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.8} duration={0.8} distance={20}>
            <div className="flex flex-col sm:flex-row gap-6 mt-12 items-center justify-center lg:justify-start">
              <a
                href="#contact"
                className="px-10 py-4 rounded-full bg-white text-black font-sans font-medium text-sm tracking-widest uppercase hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center justify-center min-w-[220px]"
              >
                BEGIN YOUR BLUEPRINT
              </a>
              <a
                href="#projects"
                className="px-10 py-4 rounded-full border border-white/50 bg-transparent text-white font-sans font-medium text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center min-w-[220px]"
              >
                VIEW PROJECTS
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
