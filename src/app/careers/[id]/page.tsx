import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobDetailClient from "./JobDetailClient";
import { Metadata } from "next";

const SAMPLE_JOBS: Record<string, {
  id: string;
  title: string;
  description: string;
  department: string;
  locationType: string;
  employmentType: string;
  salaryRange: string;
  createdAt: Date;
}> = {
  "sample-1": {
    id: "sample-1",
    title: "Digital Marketing Manager",
    description: "Lead digital marketing campaigns across global markets with data-driven strategies and creative excellence.",
    department: "Marketing and finance",
    locationType: "Tokyo, Japan",
    employmentType: "Internship",
    salaryRange: "$8,000 USD",
    createdAt: new Date("2023-01-18"),
  },
  "sample-2": {
    id: "sample-2",
    title: "Fresher Dev-Ops Engineer",
    description: "Architect and maintain CI/CD pipelines, cloud infrastructure, and container orchestration systems.",
    department: "Design & development",
    locationType: "Remote",
    employmentType: "Part-Time",
    salaryRange: "₹15-25LPA",
    createdAt: new Date("2023-02-10"),
  },
  "sample-3": {
    id: "sample-3",
    title: "Technology Analyst: Data Science",
    description: "Analyze complex data sets and build predictive models to drive strategic business decisions.",
    department: "Business & consulting",
    locationType: "Mumbai, India",
    employmentType: "Full-Time",
    salaryRange: "₹20-35LPA",
    createdAt: new Date("2023-03-05"),
  },
  "sample-4": {
    id: "sample-4",
    title: "Senior Frontend Engineer",
    description: "Build beautiful, performant user interfaces with React, Next.js and modern animation libraries.",
    department: "Design & development",
    locationType: "Miami, Florida",
    employmentType: "Freelance",
    salaryRange: "$12,000 USD",
    createdAt: new Date("2023-03-15"),
  },
  "sample-5": {
    id: "sample-5",
    title: "AI Engineer (Deep Learning)",
    description: "Architect and implement large-scale deep learning models and production ML pipelines.",
    department: "Design & development",
    locationType: "Remote",
    employmentType: "Full-Time",
    salaryRange: "₹20-35LPA",
    createdAt: new Date("2023-04-01"),
  },
  "sample-6": {
    id: "sample-6",
    title: "Project Manager",
    description: "Lead agile squads in delivering complex IT solutions for global clients. Ensure high-quality outcomes.",
    department: "Project management",
    locationType: "Remote",
    employmentType: "Full-Time",
    salaryRange: "₹12-20LPA",
    createdAt: new Date("2023-04-10"),
  },
};

const JOB_DESCRIPTIONS: Record<string, { fullDescription: string; responsibilities: string[] }> = {
  "sample-1": {
    fullDescription:
      "We are seeking an experienced Digital Marketing Manager to spearhead our marketing initiatives across Asia-Pacific markets. You will be responsible for developing comprehensive digital strategies, managing cross-functional campaigns, and driving measurable growth for the brand.\n\nThe ideal candidate has a strong track record in performance marketing, content strategy, and analytics. You will work closely with the design, product, and sales teams to craft compelling narratives and optimize every stage of the customer funnel.\n\nAs a key member of the marketing leadership team, you will also mentor junior marketers and build a culture of experimentation and data-driven decision-making.",
    responsibilities: [
      "Develop and execute comprehensive digital marketing strategies across SEO, SEM, social media, and email channels",
      "Manage marketing budgets and optimize spend across channels to maximize ROI",
      "Lead A/B testing and conversion rate optimization initiatives",
      "Analyze campaign performance using Google Analytics, Mixpanel, and internal dashboards",
      "Collaborate with the design team to create compelling marketing assets and landing pages",
      "Build and manage relationships with key media partners and influencers",
    ],
  },
  "sample-2": {
    fullDescription:
      "We are looking for a passionate Fresher Dev-Ops Engineer to join our infrastructure team. This is an excellent opportunity for someone starting their career to work with modern cloud technologies and learn from experienced engineers.\n\nYou will assist in building and maintaining CI/CD pipelines, containerized deployments, and monitoring systems. We value curiosity and a willingness to learn above all else.\n\nOur tech stack includes AWS, Docker, Kubernetes, Terraform, and GitHub Actions. You will gain hands-on experience with all of these tools from day one.",
    responsibilities: [
      "Assist in building and maintaining CI/CD pipelines using GitHub Actions and Jenkins",
      "Learn and apply infrastructure-as-code practices using Terraform and CloudFormation",
      "Help manage containerized deployments with Docker and Kubernetes",
      "Set up and monitor application health using Grafana, Prometheus, and PagerDuty",
      "Participate in incident response and post-mortem analysis",
      "Document infrastructure changes and maintain runbooks",
    ],
  },
  "sample-3": {
    fullDescription:
      "We are hiring a Technology Analyst focused on Data Science to join our rapidly growing consulting practice. You will work directly with enterprise clients to uncover insights from complex datasets and build predictive models that drive strategic decisions.\n\nThe role involves a mix of hands-on technical work and client-facing communication. You should be comfortable presenting findings to non-technical stakeholders and translating business requirements into analytical frameworks.\n\nWe use Python, R, SQL, and various cloud-based ML platforms. Prior experience with statistical modeling, machine learning, or data visualization is highly valued.",
    responsibilities: [
      "Analyze large-scale datasets to identify trends, patterns, and actionable insights",
      "Build predictive models and recommendation systems using Python and scikit-learn",
      "Create data visualizations and dashboards using Tableau, Power BI, or D3.js",
      "Work closely with business stakeholders to define KPIs and success metrics",
      "Present analytical findings and strategic recommendations to C-level executives",
      "Maintain and improve existing data pipelines and ETL processes",
    ],
  },
  "sample-4": {
    fullDescription:
      "We are looking for a Senior Frontend Engineer to lead the development of our next-generation user interfaces. You will architect and build highly performant, accessible web applications using React, Next.js, and TypeScript.\n\nThe ideal candidate has deep expertise in component architecture, state management, and modern CSS. Experience with animation libraries like Framer Motion or GSAP is a significant plus.\n\nYou will work in a cross-functional team with designers, backend engineers, and product managers to deliver pixel-perfect, delightful user experiences.",
    responsibilities: [
      "Architect and build scalable React/Next.js applications with TypeScript",
      "Implement complex animations and micro-interactions using Framer Motion",
      "Establish and enforce frontend best practices, code standards, and testing strategies",
      "Optimize web performance including Core Web Vitals, bundle size, and rendering",
      "Mentor junior engineers and conduct thorough code reviews",
      "Collaborate with UX designers to translate Figma designs into production-ready code",
    ],
  },
  "sample-5": {
    fullDescription:
      "Join our AI team to architect and implement large-scale deep learning models for real-world applications. You will work on cutting-edge problems in natural language processing, computer vision, and generative AI.\n\nWe are looking for someone with strong fundamentals in machine learning theory and practical experience deploying models at scale. You should be comfortable with PyTorch, TensorFlow, and cloud-based ML infrastructure.\n\nThis is a high-impact role where your work will directly shape the products we deliver to millions of users.",
    responsibilities: [
      "Design and implement deep learning architectures for NLP, CV, and generative AI tasks",
      "Train, evaluate, and deploy models using PyTorch and TensorFlow on cloud GPU clusters",
      "Build and optimize data pipelines for model training and inference",
      "Collaborate with product and engineering teams to integrate AI capabilities into products",
      "Stay current with latest research papers and implement state-of-the-art techniques",
      "Write technical documentation and present findings to cross-functional teams",
    ],
  },
  "sample-6": {
    fullDescription:
      "We are seeking an experienced Project Manager to lead agile development squads delivering complex IT solutions for global clients. You will own the end-to-end delivery lifecycle.\n\nThe ideal candidate has experience managing software development projects, is comfortable with agile methodologies, and has excellent communication skills. You will interface directly with clients and internal stakeholders.\n\nWe value servant leadership, transparency, and a commitment to continuous improvement.",
    responsibilities: [
      "Lead agile ceremonies including sprint planning, daily standups, and retrospectives",
      "Define project scope, timelines, and resource allocation with stakeholders",
      "Manage project risks, dependencies, and escalations proactively",
      "Track and report on project health metrics, velocity, and budget utilization",
      "Foster a culture of ownership, collaboration, and continuous improvement within the team",
      "Coordinate cross-team dependencies and manage stakeholder expectations",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  if (id.startsWith("sample-")) {
    const sample = SAMPLE_JOBS[id];
    if (!sample) return { title: "Job Not Found — Cortex IT" };
    return {
      title: `${sample.title} — Careers | Cortex IT`,
      description: sample.description,
    };
  }

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) return { title: "Job Not Found — Cortex IT" };
  return {
    title: `${job.title} — Careers | Cortex IT`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let job: {
    id: string;
    title: string;
    description: string;
    department: string;
    locationType: string;
    employmentType: string;
    salaryRange: string;
    createdAt: Date;
    fullDescription: string;
    responsibilities: string[];
  } | null = null;

  if (id.startsWith("sample-")) {
    const sample = SAMPLE_JOBS[id];
    if (!sample) notFound();
    const extra = JOB_DESCRIPTIONS[id] || {
      fullDescription: sample.description,
      responsibilities: [],
    };
    job = { ...sample, ...extra };
  } else {
    const dbJob = await prisma.job.findUnique({ where: { id } });
    if (!dbJob || !dbJob.isActive) notFound();
    job = {
      ...dbJob,
      salaryRange: dbJob.salaryRange || "Competitive",
      fullDescription: dbJob.description,
      responsibilities: [
        "Drive end-to-end ownership of features from ideation to deployment",
        "Collaborate with cross-functional teams to deliver high-quality solutions",
        "Write clean, maintainable, and well-tested code",
        "Participate in code reviews and contribute to team knowledge sharing",
        "Help define and improve engineering best practices",
      ],
    };
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <JobDetailClient job={JSON.parse(JSON.stringify(job))} />
      <Footer />
    </main>
  );
}
