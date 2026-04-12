"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Projects", href: "/#projects" },
    { name: "Why Us", href: "/#why-us" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || pathname !== "/"
        ? "bg-[var(--color-bg-main)]/90 backdrop-blur-md border-b border-[var(--color-border-subtle)] py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center relative z-10 transition-transform hover:scale-105 duration-300">
          <img
            src="/logo-full.png"
            alt="Cortex IT"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[var(--color-text-muted)] hover:text-[#C8F542] transition-colors text-sm font-medium tracking-wide ${pathname === link.href ? "text-[#C8F542]" : ""
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="ml-4 px-8 py-2.5 rounded-full bg-[#C8F542] text-black font-sans font-medium text-sm hover:shadow-[0_0_15px_rgba(200,245,66,0.4)] transition-all"
          >
            START PROJECT
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          suppressHydrationWarning
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
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-heading text-[var(--color-text-primary)] hover:text-[#C8F542] transition-colors ${pathname === link.href ? "text-[#C8F542]" : ""
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-8 py-4 rounded-none bg-[#C8F542] text-black text-lg font-heading font-medium"
          >
            START PROJECT
          </Link>
        </div>
      )}
    </header>
  );
}
