"use client";

import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-black overflow-hidden flex items-center justify-center">
      
      {/* Decorative Background Wireframes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -left-64 top-0 w-[800px] h-[800px] rounded-full border border-white/20" />
        <div className="absolute -right-[10%] -bottom-[20%] w-[1200px] h-[1200px] rounded-full border border-white/10" />
        <div className="absolute left-[20%] -bottom-64 w-[600px] h-[600px] rounded-full border border-white/5" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading font-light text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-wide">
              Who we are.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed">
              Cortex is a specialized digital studio dedicated to engineering high-performance applications, immersive web architectures, and advanced AI integrations. We exist at the intersection of bold design and rigorous technical execution, delivering solutions that refuse to compromise.
            </p>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
