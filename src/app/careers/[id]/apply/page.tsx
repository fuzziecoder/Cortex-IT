import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyFormClient from "./ApplyFormClient";
import { Metadata } from "next";

const SAMPLE_TITLES: Record<string, string> = {
  "sample-1": "Digital Marketing Manager",
  "sample-2": "Fresher Dev-Ops Engineer",
  "sample-3": "Technology Analyst: Data Science",
  "sample-4": "Senior Frontend Engineer",
  "sample-5": "AI Engineer (Deep Learning)",
  "sample-6": "Project Manager",
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const title = SAMPLE_TITLES[id];
  if (title) {
    return { title: `Apply — ${title} | Cortex IT` };
  }
  const job = await prisma.job.findUnique({ where: { id }, select: { title: true } });
  if (!job) return { title: "Apply — Cortex IT" };
  return { title: `Apply — ${job.title} | Cortex IT` };
}

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let jobTitle: string | null = null;
  let jobId: string = id;

  if (id.startsWith("sample-")) {
    jobTitle = SAMPLE_TITLES[id] || null;
  } else {
    const job = await prisma.job.findUnique({ where: { id }, select: { id: true, title: true, isActive: true } });
    if (!job || !job.isActive) notFound();
    jobTitle = job.title;
    jobId = job.id;
  }

  if (!jobTitle) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <ApplyFormClient jobId={jobId} jobTitle={jobTitle} />
      <Footer />
    </main>
  );
}
