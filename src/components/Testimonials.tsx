"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    id: 1,
    quote:
      "Cortex built our entire digital platform from scratch. The quality, speed, and attention to detail was world-class. They truly understood our rider community better than we did!",
    name: "Ravi Kumar",
    role: "Founder, BUC India",
    bg: "#0a0a0a",
    textColor: "#ffffff",
    quoteColor: "#ffffff",
    roleColor: "#9CA3AF",
  },
  {
    id: 2,
    quote:
      "Our online enquiries jumped 300% after the website launch. Cortex delivered a design that perfectly represents our precision manufacturing capabilities.",
    name: "Guru Prasad",
    role: "Director, SGS Laser",
    bg: "#C8F542",
    textColor: "#1a1a1a",
    quoteColor: "#1a1a1a",
    roleColor: "#555555",
  },
  {
    id: 3,
    quote:
      "They didn't just build an app — they understood our mission. The volunteer matching and donation tracking features have transformed how we operate.",
    name: "Ananya Sharma",
    role: "Program Lead, Humanity Calls",
    bg: "#8B5CF6",
    textColor: "#ffffff",
    quoteColor: "#ffffff",
    roleColor: "#d4c4fc",
  },
  {
    id: 4,
    quote:
      "Working with Cortex felt like having a senior tech co-founder on the team. They challenged our assumptions and delivered something far beyond the brief.",
    name: "Vikram Desai",
    role: "CTO, NexGen Solutions",
    bg: "#0a0a0a",
    textColor: "#ffffff",
    quoteColor: "#ffffff",
    roleColor: "#9CA3AF",
  },
];

const metrics = [
  { value: 5, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "+", label: "Happy Clients" },
  { value: 4, suffix: "x", label: "Avg. ROI Growth" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-heading font-bold text-5xl md:text-6xl text-white">
      {count}
      <span className="text-[var(--color-accent-secondary)]">{suffix}</span>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Scroll-driven card progression
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !stickyRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = -sectionRect.top;
      const scrollableHeight = sectionRef.current.offsetHeight - window.innerHeight;

      if (sectionTop < 0 || scrollableHeight <= 0) {
        setActive(0);
        return;
      }

      const progress = Math.min(Math.max(sectionTop / scrollableHeight, 0), 1);
      const cardIndex = Math.min(
        Math.floor(progress * testimonials.length),
        testimonials.length - 1
      );
      setActive(cardIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Testimonials with scroll-driven stacked cards */}
      <section
        ref={sectionRef}
        className="relative bg-black"
        style={{ height: `${(testimonials.length + 1) * 100}vh` }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="container mx-auto px-6 md:px-12">

            {/* Header */}
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-block text-[var(--color-accent-secondary)] font-heading font-bold text-xs tracking-widest uppercase mb-6">
                  Testimonials
                </div>
                <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                  Real People, Real<br />Results Feedback
                </h2>
                <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto font-light">
                  See what our clients are truly accomplishing with honest, project-based reviews.
                </p>
              </div>
            </ScrollReveal>

            {/* Stacked Cards */}
            <div className="relative max-w-2xl mx-auto h-[400px] md:h-[380px]">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => {
                  const offset = index - active;

                  // Only show current + 2 behind
                  if (offset < 0 || offset > 2) return null;

                  const rotations = [0, 3, -2.5];
                  const yOffsets = [0, 30, 55];
                  const scales = [1, 0.94, 0.88];
                  const opacities = [1, 0.7, 0.4];

                  return (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 80, scale: 0.9 }}
                      animate={{
                        opacity: opacities[offset],
                        y: yOffsets[offset],
                        scale: scales[offset],
                        rotate: rotations[offset],
                        zIndex: testimonials.length - offset,
                      }}
                      exit={{ opacity: 0, y: -100, scale: 0.85, rotate: -5 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 26,
                      }}
                      className="absolute inset-0"
                    >
                      <div
                        className="rounded-[28px] p-8 md:p-10 h-full flex flex-col justify-between shadow-2xl"
                        style={{
                          backgroundColor: testimonial.bg,
                          border:
                            testimonial.bg === "#0a0a0a"
                              ? "1px solid rgba(255,255,255,0.08)"
                              : "none",
                        }}
                      >
                        {/* Quote Icon */}
                        <div>
                          <div className="mb-8">
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="48"
                                height="48"
                                rx="12"
                                fill={
                                  testimonial.bg === "#0a0a0a"
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(0,0,0,0.12)"
                                }
                              />
                              <text
                                x="8"
                                y="38"
                                fontFamily="serif"
                                fontSize="42"
                                fontWeight="900"
                                fill={testimonial.quoteColor}
                              >
                                &rdquo;
                              </text>
                            </svg>
                          </div>

                          <p
                            className="text-xl md:text-2xl font-medium leading-relaxed"
                            style={{ color: testimonial.textColor }}
                          >
                            {testimonial.quote}
                          </p>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-4 mt-8">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-sm shrink-0"
                            style={{
                              backgroundColor:
                                testimonial.bg === "#0a0a0a"
                                  ? "rgba(255,255,255,0.1)"
                                  : "rgba(0,0,0,0.15)",
                              color: testimonial.textColor,
                            }}
                          >
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div
                              className="font-semibold text-base"
                              style={{ color: testimonial.textColor }}
                            >
                              {testimonial.name}
                            </div>
                            <div
                              className="text-sm font-light"
                              style={{ color: testimonial.roleColor }}
                            >
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Progress indicator */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-500 ${
                      i === active
                        ? "w-8 h-2 bg-white"
                        : i < active
                        ? "w-2 h-2 bg-white/50"
                        : "w-2 h-2 bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
              {metrics.map((metric, i) => (
                <div key={i} className="flex flex-col items-center">
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                  <span className="text-gray-400 text-sm font-light mt-3 tracking-wide uppercase">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
