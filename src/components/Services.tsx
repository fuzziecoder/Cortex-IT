"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import {
  Smartphone,
  Monitor,
  PenTool,
  MessageSquareText,
  Search,
  Cloud,
  Code2,
  PhoneCall
} from "lucide-react";

const services = [
  { id: 1, title: "App development", desc: "Native and cross-platform mobile experiences.", icon: Smartphone },
  { id: 2, title: "Web development", desc: "High-performance web applications and sites.", icon: Monitor },
  { id: 3, title: "UI/UX design", desc: "User-centric interfaces and flow architectures.", icon: PenTool },
  { id: 4, title: "Chatbot building", desc: "Intelligent conversational agents and support bots.", icon: MessageSquareText },
  { id: 5, title: "SEO optimization", desc: "Technical and content optimization for visibility.", icon: Search },
  { id: 6, title: "Cloud & DevOps", desc: "Scalable infrastructure and deployment pipelines.", icon: Cloud },
  { id: 7, title: "API & Integrations", desc: "Seamless connections between complex systems.", icon: Code2 },
  { id: 8, title: "Maintenance", desc: "Ongoing product support and feature iterations.", icon: PhoneCall },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[var(--color-bg-main)]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <ScrollReveal>
            <div className="inline-block text-[var(--color-accent-secondary)] font-heading font-bold text-xs tracking-widest uppercase mb-6">
              Services
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--color-text-primary)] mb-8 tracking-tight">
              What we build.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-[var(--color-text-muted)] text-lg md:text-xl leading-relaxed">
              End-to-end technical execution across every layer of the modern digital stack.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div 
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: -2,
                    boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)",
                    y: -10
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative group rounded-xl bg-[#0a0a0a] border border-white/5 h-full cursor-pointer overflow-hidden transition-colors duration-500 hover:bg-white"
                >
                  <div className="p-8 md:p-10 h-full flex flex-col justify-between">
                    <div>
                      {/* Icon */}
                      <div className="mb-6 text-gray-400 group-hover:text-black transition-colors duration-500">
                        <Icon size={32} strokeWidth={1} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-heading font-light text-2xl text-white mb-4 group-hover:text-black transition-colors duration-500">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-500 font-light leading-relaxed mb-8 group-hover:text-gray-600 transition-colors duration-500">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
