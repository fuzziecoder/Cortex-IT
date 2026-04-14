"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  BarChart3,
  Briefcase,
  Clock,
  DollarSign,
  ArrowRight,
  Code,
  TrendingUp,
  Palette,
  Settings,
  Users,
  Cpu,
  Globe,
} from "lucide-react";

interface JobDetail {
  id: string;
  title: string;
  description: string;
  department: string;
  locationType: string;
  employmentType: string;
  salaryRange: string;
  createdAt: string;
  fullDescription: string;
  responsibilities: string[];
}

/* Department → icon mapping */
const deptIcons: Record<string, React.ReactNode> = {
  "Design & development": <Code className="w-6 h-6 text-white" />,
  "Marketing and finance": <TrendingUp className="w-6 h-6 text-white" />,
  "Business & consulting": <BarChart3 className="w-6 h-6 text-white" />,
  Design: <Palette className="w-6 h-6 text-white" />,
  Operations: <Settings className="w-6 h-6 text-white" />,
  Management: <Users className="w-6 h-6 text-white" />,
  "Project management": <Users className="w-6 h-6 text-white" />,
  "AI/ML": <Cpu className="w-6 h-6 text-white" />,
  "Customer services": <Globe className="w-6 h-6 text-white" />,
};

const deptColors: Record<string, string> = {
  "Design & development": "bg-blue-600",
  "Marketing and finance": "bg-sky-500",
  "Business & consulting": "bg-purple-600",
  Design: "bg-pink-600",
  Operations: "bg-orange-500",
  Management: "bg-teal-500",
  "Project management": "bg-teal-500",
  "AI/ML": "bg-green-500",
  "Customer services": "bg-rose-500",
};

function getLevelFromJob(job: JobDetail): string {
  const title = job.title.toLowerCase();
  const type = job.employmentType.toLowerCase();
  if (title.includes("senior") || title.includes("lead")) return "Senior";
  if (type.includes("internship")) return "Junior";
  if (title.includes("fresher")) return "Fresher";
  if (title.includes("manager") || title.includes("analyst")) return "Mid-Senior";
  return "Mid-level";
}

export default function JobDetailClient({ job }: { job: JobDetail }) {
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const level = getLevelFromJob(job);

  return (
    <div className="bg-[#0a0a0a] text-white font-sans selection:bg-[#00bfff]/30">
      {/* ── Header ── */}
      <section className="pt-32 md:pt-40 pb-10 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-5"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                deptColors[job.department] || "bg-indigo-600"
              }`}
            >
              {deptIcons[job.department] || (
                <Briefcase className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold tracking-tight">
                {job.title}
              </h1>
              <p className="text-gray-400 text-sm mt-1">Cortex IT</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content: Description + Sidebar ── */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* ── Left: Job Description ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex-1"
            >
              <h2 className="text-xl font-bold mb-6 text-white">
                Job Description
              </h2>
              <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line mb-12">
                {job.fullDescription}
              </div>

              {job.responsibilities.length > 0 && (
                <>
                  <h2 className="text-xl font-bold mb-6 text-white">
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-4">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C8F542] mt-2 shrink-0" />
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>

            {/* ── Right: Overview Sidebar ── */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full lg:w-[360px] shrink-0"
            >
              <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 sticky top-28">
                <h3 className="text-lg font-bold mb-8 text-white">Overview</h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <Calendar size={16} className="text-gray-500" />
                      <span>Posted on:</span>
                    </div>
                    <span className="text-white text-sm font-medium">
                      {postedDate}
                    </span>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <MapPin size={16} className="text-gray-500" />
                      <span>Location:</span>
                    </div>
                    <span className="text-white text-sm font-medium">
                      {job.locationType}
                    </span>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <BarChart3 size={16} className="text-gray-500" />
                      <span>Level:</span>
                    </div>
                    <span className="text-white text-sm font-medium">
                      {level}
                    </span>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <Briefcase size={16} className="text-gray-500" />
                      <span>Department:</span>
                    </div>
                    <span className="text-white text-sm font-medium">
                      {job.department}
                    </span>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <Clock size={16} className="text-gray-500" />
                      <span>Time:</span>
                    </div>
                    <span className="text-white text-sm font-medium">
                      {job.employmentType}
                    </span>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <DollarSign size={16} className="text-gray-500" />
                      <span>Salary:</span>
                    </div>
                    <span className="text-white text-sm font-medium">
                      {job.salaryRange}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/careers/${job.id}/apply`}
                  className="mt-10 w-full flex items-center justify-center gap-2 py-3.5 bg-[#C8F542] hover:bg-[#d4ff6e] text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(200,245,66,0.4)] group"
                >
                  Apply now
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
}
