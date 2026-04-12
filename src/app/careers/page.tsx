import prisma from "@/lib/prisma";
import CareersClient from "./CareersClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Cortex IT",
  description: "Join the future of IT innovation at Cortex IT. Build cutting-edge React apps, AI models, and data dashboards with us.",
};

const SAMPLE_JOBS = [
  {
    id: "sample-1",
    title: "Digital Marketing Manager",
    description: "Lead digital marketing campaigns across global markets with data-driven strategies and creative excellence.",
    department: "Marketing and finance",
    locationType: "Tokyo, Japan",
    employmentType: "Internship",
    salaryRange: "$8,000 USD",
    createdAt: new Date("2023-01-18"),
  },
  {
    id: "sample-2",
    title: "Fresher Dev-Ops Engineer",
    description: "Architect and maintain CI/CD pipelines, cloud infrastructure, and container orchestration systems.",
    department: "Design & development",
    locationType: "Remote",
    employmentType: "Part-Time",
    salaryRange: "₹15-25LPA",
    createdAt: new Date("2023-02-10"),
  },
  {
    id: "sample-3",
    title: "Technology Analyst: Data Science",
    description: "Analyze complex data sets and build predictive models to drive strategic business decisions.",
    department: "Business & consulting",
    locationType: "Mumbai, India",
    employmentType: "Full-Time",
    salaryRange: "₹20-35LPA",
    createdAt: new Date("2023-03-05"),
  },
  {
    id: "sample-4",
    title: "Senior Frontend Engineer",
    description: "Build beautiful, performant user interfaces with React, Next.js and modern animation libraries.",
    department: "Design & development",
    locationType: "Miami, Florida",
    employmentType: "Freelance",
    salaryRange: "$12,000 USD",
    createdAt: new Date("2023-03-15"),
  },
  {
    id: "sample-5",
    title: "AI Engineer (Deep Learning)",
    description: "Architect and implement large-scale deep learning models and production ML pipelines.",
    department: "Design & development",
    locationType: "Remote",
    employmentType: "Full-Time",
    salaryRange: "₹20-35LPA",
    createdAt: new Date("2023-04-01"),
  },
  {
    id: "sample-6",
    title: "Project Manager",
    description: "Lead agile squads in delivering complex IT solutions for global clients. Ensure high-quality outcomes.",
    department: "Project management",
    locationType: "Remote",
    employmentType: "Full-Time",
    salaryRange: "₹12-20LPA",
    createdAt: new Date("2023-04-10"),
  }
];

export default async function CareersPage() {
  let dbJobs: typeof SAMPLE_JOBS = [];
  try {
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" }
    });
    dbJobs = jobs.map(j => ({
      ...j,
      salaryRange: j.salaryRange || "Competitive",
    }));
  } catch {
    // If DB fetch fails, fall through to sample jobs
  }

  const jobs = dbJobs.length > 0 ? dbJobs : SAMPLE_JOBS;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <CareersClient initialJobs={JSON.parse(JSON.stringify(jobs))} />
      <Footer />
    </main>
  );
}
