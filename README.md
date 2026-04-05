<div align="center">
  <img width="606" height="302" alt="Screenshot_2026-04-04_214502-removebg-preview" src="https://github.com/user-attachments/assets/5f889d59-a07a-4700-867e-f41cb38498bb" />
  <p align="center">
    <strong>A high-performance, dark-minimalist digital agency portfolio.</strong>
    <br />
    Architected for speed, smooth interactions, and typographic excellence.
  </p>

  <!-- Badges -->
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>
</div>

<hr />

## 🪐 Overview
**Cortex Studio** is a state-of-the-art portolio/agency template built to showcase complex engineering projects, design capabilities, and digital identity. Leveraging the power of Next.js 15 App Router and the brand-new Tailwind CSS v4, this application delivers a highly interactive, 60fps Webflow-tier experience engineered entirely in React.

## ✨ High-Yield Features

*   **Advanced Framer Motion Integrations**: 
    *   **Scroll-Driven Stacked Carousel**: Testimonial cards dynamically stack, scale, and rotate as the user scrolls, creating a deep 3D spatial effect.
    *   **Interactive Tilt Cards**: The Services grid features Webflow-inspired interactions. On hover, dark-mode cards instantly invert to white, scale up (x1.05), tilt slightly (`rotate: -2`), and cast glowing drop shadows.
    *   **Scroll Timelines**: The "Why Us" section features a sticky vertical scroll gradient line that fills as you progress through the company's value propositions.
*   **Typography-Led Aesthetic**: Custom integrations of **Satoshi** (body copy) and **Michroma** (sci-fi brutalist headings) configured globally via new Tailwind 4 `@theme` setups.
*   **Fully Responsive & Edge-to-Edge**: Custom mask-image gradients for infinite scrolling partner marquees and perfectly measured container breakpoints. 
*   **Interactive Chatbot**: Custom floating chatbot UI featuring quick replies and brand-aligned responses.
*   **Dynamic Case Studies**: Embedded `[slug]` dynamic routing for full-fledged subpages showing project breakdowns (SGS, BUC India, Humanity Calls).

## 🛠️ Architecture & Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| **Next.js 15** | SSR, App Router, Image Optimization, Dynamic Routes |
| **React 19** | Core UI rendering and concurrent features |
| **Tailwind CSS v4** | Next-generation utility styling, zero-config `@theme` blocks |
| **Framer Motion** | Physics-based spring animations, gesture handling (`whileHover`), and `IntersectionObserver` wrappers (`whileInView`) |
| **Lucide React** | Clean, minimal, consistent SVG iconography |
| **React Hook Form / Zod** | (Planned/Structured) Type-safe contact & lead ingestion |

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js 18.17.0+ installed.

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/your-username/cortex-studio.git
   ```
2. Navigate to the directory
   ```bash
   cd cortex
   ```
3. Install dependencies
   ```bash
   npm install
   ```
   *(or use `yarn install` / `pnpm install`)*

4. Fire up the development server
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## 📁 Directory Structure

```text
cortex/
├── src/
│   ├── app/
│   │   ├── case-study/       # Dynamic Next.js case study routes
│   │   ├── layout.tsx        # Root layout, font definitions, metadata
│   │   ├── page.tsx          # Main landing page component assembly
│   │   └── globals.css       # Tailwind v4 injection & theme tokens
│   ├── components/
│   │   ├── About.tsx         # Brand story section
│   │   ├── CallToAction.tsx  # Infinite scrolling marquee
│   │   ├── Hero.tsx          # Full-viewport intro
│   │   ├── ScrollReveal.tsx  # Reusable IntersectionObserver wrapper
│   │   ├── Testimonials.tsx  # Stacked scroll-tracker cards
│   │   └── ...
├── public/                   # Static assets, SVG logos, partner brands
├── package.json
└── tailwind.config.ts        # (Replaced partially by v4 inline config)
```

## 🎨 Design System (Tokens)

The project utilizes a strict dark-minimal aesthetic defined in `globals.css`:
- **Background**: `#0a0a0a`, `#000000`, pristine black.
- **Accents**: Lime Green (`#C8F542`), Deep Purple (`#8B5CF6`).
- **Cards**: Flat `#111` or `#1A1A1A` with 1px `border-white/5` strokes.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
<div align="center">
  <i>Architected with precision. The future is built here.</i>
</div>
