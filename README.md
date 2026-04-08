<div align="center">
  <img width="606" height="302" alt="Cortex Studio" src="https://github.com/user-attachments/assets/5f889d59-a07a-4700-867e-f41cb38498bb" />
  <p align="center">
    <strong>A high-performance, dark-minimalist digital agency portfolio with full CMS and AI Integration.</strong>
    <br />
    Architected for speed, smooth interactions, typographic excellence, and scalable content management.
  </p>

  <!-- Badges -->
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
    <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/NVIDIA_AI-76B900?style=for-the-badge&logo=nvidia&logoColor=white" alt="NVIDIA AI" />
  </p>
</div>

<hr />

## 🪐 Overview
**Cortex Studio** is a state-of-the-art portfolio and agency management platform. It's built to elegantly showcase engineering projects and digital capabilities while featuring a completely bespoke backend for administration. Leveraging the bleeding-edge stack of **Next.js 15 App Router**, **React 19**, **Prisma**, and **Tailwind CSS v4**, this application delivers a highly interactive 60fps Webflow-tier experience paired with robust full-stack content controls.

## ✨ High-Yield Features

### Frontend & Animations
*   **Scroll-Driven Stacked Carousel**: Testimonial cards dynamically stack, scale, and rotate as the user scrolls, creating a deep 3D spatial effect.
*   **Interactive Tilt Cards**: The Services grid features advanced hover states. Dark-mode cards invert, scale up (`x1.05`), tilt slightly (`rotate: -2`), and cast glowing drop shadows.
*   **Edge-to-Edge Responsiveness**: Includes infinite scrolling partner marquees with custom mask-image gradients.
*   **Typography-Led Aesthetic**: Custom integrations of **Satoshi** (body copy) and **Michroma** (sci-fi headings).

### Data & Content Management
*   **Full Admin CMS Dashboard**: A secured `/admin` path for managing the entire website.
*   **Secure Authentication**: JWT-based stateless authentication and Bcrypt hashing for secure admin logins.
*   **Dynamic Data Integration**: Portfolios, Case Studies, and Partners are fed directly from a speedy embedded `better-sqlite3` database via Prisma ORM.

### Integrations
*   **AI Chatbot Assistant**: Embedded frontend floating chatbot powered by a backend endpoint integrating with the **NVIDIA meta/llama-3.1-8b-instruct** LLM via API stream. It's fully context-aware of the agency's portfolio.
*   **Contact & Lead Ingestion**: React Hook Form and Zod ensure type-safe leads sent securely. Backed by `Nodemailer` for immediate notification delivery.

## 🛠️ Architecture & Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| **Next.js 15** | SSR, App Router, Image Optimization, Comprehensive Route Handlers (APIs) |
| **React 19** | Core UI rendering and highly concurrent features |
| **Tailwind CSS v4** | Next-generation utility styling with zero-config inline definitions |
| **Prisma & SQLite** | Localized high-performance SQL persistence and ORM capabilities |
| **Framer Motion** | Physics-based spring animations, gesture handling, viewport intersections |
| **NVIDIA integrate API**| Advanced contextual conversational flows over LLMs |
| **JWT & Bcrypt**| Secure authentication flows and cryptographic hashes |
| **Nodemailer** | SMTP bindings for live contact inquiries |

## 📁 Comprehensive Directory Structure

```text
cortex/
├── prisma/
│   ├── schema.prisma         # Database tables (User, Project, Partner, Subscriber, Message)
│   ├── seed.ts               # Database bootstrap routines
│   └── dev.db                # Lightweight better-sqlite3 database
├── src/
│   ├── app/
│   │   ├── admin/            # Secure CMS Pages (Dashboard, Inbox, Partners, Projects, Subscribers)
│   │   ├── api/              # Full REST API implementation (auth, chat, contacts, CRUD)
│   │   ├── case-study/       # Dynamic Next.js case study subpages [slug]
│   │   ├── layout.tsx        # Root layout, font definitions, metadata
│   │   ├── page.tsx          # Main landing page component assembly
│   │   └── globals.css       # Tailwind v4 injection & overarching theme tokens
│   ├── components/
│   │   ├── About.tsx         # Brand story and mission section
│   │   ├── CallToAction.tsx  # Infinite scrolling brand marquee
│   │   ├── ChatBot.tsx       # Live LLM floating AI interface
│   │   ├── Contact.tsx       # Lead ingestion form component
│   │   ├── Footer.tsx        # Advanced sitewide navigation footer
│   │   ├── Hero.tsx          # Full-viewport WebGL-inspired intro
│   │   ├── ScrollReveal.tsx  # Reusable IntersectionObserver animation wrapper
│   │   └── ...
│   └── lib/                  # Utilities (Prisma singletons)
├── public/                   # Static assets, SVG logos, partner brands
├── .env                      # Database URLs and Secret Keys
├── package.json              # Node.js manifest
└── tailwind.config.ts        # (Largely deprecated by direct v4 integration)
```

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js 18.17.0+** installed.

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cortex-studio.git
   ```
2. **Navigate to the directory**
   ```bash
   cd cortex
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
   *(or use `yarn install` / `pnpm install`)*
4. **Environment Setup**
   Create a `.env` file referencing your DB and API Keys:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secret-key"
   NVIDIA_API_KEY="your-nvidia-api-key"
   ```
5. **Database Initialization**
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed.ts
   ```
6. **Fire up the development server**
   ```bash
   npm run dev
   ```
7. **Access Application**
   - Main App: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## 🎨 Design System (Tokens)

The project utilizes a strict dark-minimal aesthetic strictly defined natively in `globals.css`:
- **Background**: `#0a0a0a`, `#000000`, pristine black.
- **Accents**: Lime Green (`#C8F542`), Deep Purple (`#8B5CF6`).
- **Cards & Surfaces**: Flat `#111` or `#1A1A1A` finished with high-end `1px border-white/5` strokes.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
<div align="center">
  <i>Architected with precision. The future is built here.</i>
</div>
