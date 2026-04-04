"use client";

import ScrollReveal from "./ScrollReveal";

const audiences = [
  {
    title: "Mid-to-Executive Professionals",
    desc: "Ambitious professionals ready to command their next role, pivot with precision, or secure executive-level compensation and influence."
  },
  {
    title: "Founders and Consultants",
    desc: "Entrepreneurs and consulting leaders seeking elevated brand authority, market credibility, and growth strategy that scales."
  },
  {
    title: "Organizations and Leadership Teams",
    desc: "Companies strengthening their talent architecture, leadership alignment, and AI/cybersecurity governance to scale securely and outpace the market."
  }
];

export default function WhoWeWorkWith() {
  return (
    <section id="who-we-work-with" className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading font-light text-4xl md:text-5xl lg:text-5xl text-white mb-6 tracking-wide">
              Who We Serve
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-gray-400 text-lg md:text-xl font-light">
              We work with the builders of tomorrow—professionals, founders, and organizations committed to architecting futures with clarity and precision.
            </p>
          </ScrollReveal>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {audiences.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              {/* Outer wrapper for top-left green border gradient animation */}
              <div className="relative group rounded-3xl p-[1px] bg-[#1a1a24] hover:bg-gradient-to-br hover:from-green-400 hover:via-green-500/10 hover:to-transparent transition-all duration-700 h-full">
                <div className="bg-[#050505] rounded-3xl p-8 md:p-12 h-full flex flex-col items-center text-center justify-center">
                  <h3 className="font-heading font-light text-2xl md:text-3xl text-white mb-6 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-20">
          <ScrollReveal delay={0.3} distance={20} direction="up">
             <p className="text-gray-500 font-light text-xl md:text-2xl tracking-wide max-w-5xl mx-auto">
               Cortex is where strategy meets identity—and the future is architected, not found.
             </p>
          </ScrollReveal>
        </div>
        
      </div>
    </section>
  );
}
