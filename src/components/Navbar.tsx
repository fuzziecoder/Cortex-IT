"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Why Us", href: "#why-us" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-[var(--color-bg-main)]/90 backdrop-blur-md border-b border-[var(--color-border-subtle)] py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 relative z-10">
          <svg className="w-8 h-8 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 15C30.67 15 15 30.67 15 50C15 63.83 23.04 75.82 35 81.39V68.32C28.53 64.08 24.33 56.66 24.33 48.33C24.33 34.16 35.83 22.67 50 22.67C64.17 22.67 75.67 34.16 75.67 48.33C75.67 56.66 71.47 64.08 65 68.32V81.39C76.96 75.82 85 63.83 85 50C85 30.67 69.33 15 50 15Z" fill="currentColor" />
            <path d="M50 33.33C41.72 33.33 35 40.05 35 48.33C35 54.2 38.38 59.27 43.33 61.76V72.1C38.01 68.86 34.33 62.97 34.33 56.33C34.33 47.68 41.35 40.67 50 40.67C58.65 40.67 65.67 47.68 65.67 56.33C65.67 62.97 61.99 68.86 56.67 72.1V61.76C61.62 59.27 65 54.2 65 48.33C65 40.05 58.28 33.33 50 33.33Z" fill="currentColor" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
          <span className="font-heading font-bold text-xl tracking-wide uppercase">Cortex</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors text-sm font-medium tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-8 py-2.5 rounded-full bg-white text-black font-sans font-medium text-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
          >
            START PROJECT
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-10 text-[var(--color-text-primary)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[var(--color-bg-main)] flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-heading text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-8 py-4 rounded-none bg-[var(--color-accent-primary)] text-white text-lg font-heading font-medium"
          >
            START PROJECT
          </a>
        </div>
      )}
    </header>
  );
}
