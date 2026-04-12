"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Briefcase,
  Code,
  TrendingUp,
  BarChart3,
  Palette,
  Settings,
  Users,
  Cpu,
  Globe,
  ChevronRight,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  locationType: string;
  employmentType: string;
  salaryRange?: string | null;
  createdAt?: string;
}

const categories = [
  "All",
  "Accounting",
  "Business & consulting",
  "Human research",
  "Marketing and finance",
  "Design & development",
  "Finance management",
  "Project management",
  "Customer services",
];

const jobLevels = ["Senior", "Executive", "Junior", "Fresher", "Internship"];

/* Department → icon mapping */
const deptIcons: Record<string, React.ReactNode> = {
  "Design & development": <Code className="w-5 h-5 text-white" />,
  "Marketing and finance": <TrendingUp className="w-5 h-5 text-white" />,
  "Business & consulting": <BarChart3 className="w-5 h-5 text-white" />,
  Design: <Palette className="w-5 h-5 text-white" />,
  Operations: <Settings className="w-5 h-5 text-white" />,
  Management: <Users className="w-5 h-5 text-white" />,
  "Project management": <Users className="w-5 h-5 text-white" />,
  "AI/ML": <Cpu className="w-5 h-5 text-white" />,
  "Customer services": <Globe className="w-5 h-5 text-white" />,
};

/* Department → color mapping for icon backgrounds */
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

export default function CareersClient({ initialJobs }: { initialJobs: Job[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    let jobs = initialJobs;
    if (activeCategory !== "All") {
      jobs = jobs.filter((j) => j.department === activeCategory);
    }
    if (activeLevel) {
      jobs = jobs.filter(
        (j) =>
          j.employmentType.toLowerCase().includes(activeLevel.toLowerCase()) ||
          j.title.toLowerCase().includes(activeLevel.toLowerCase())
      );
    }
    return jobs;
  }, [initialJobs, activeCategory, activeLevel]);

  return (
    <div className="bg-[#0a0a0a] text-white font-sans selection:bg-[#00bfff]/30">
      {/* ── Hero Section ── */}
      <section className="relative pt-36 md:pt-44 pb-20 overflow-hidden">
        {/* Dot grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium leading-[1.08] tracking-tight text-white max-w-3xl"
          >
            Let&rsquo;s Build
            <br />
            Something{" "}
            <span className="text-[#a5b4fc]">Great</span>
            <br />
            Together
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              Get in Touch
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content: Sidebar + Job Listings ── */}
      <section className="pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* ── Left Sidebar ── */}
            <aside className="w-full lg:w-[260px] shrink-0">
              {/* Categories */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-white mb-5 tracking-tight">
                  Categories
                </h3>
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        suppressHydrationWarning
                        onClick={() => {
                          setActiveCategory(cat);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          activeCategory === cat
                            ? "bg-white/10 text-[#C8F542] font-medium"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {cat === "All" ? "View All" : <span>{cat}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Job Level Categories */}
              <div>
                <h3 className="text-lg font-bold italic text-white mb-5 tracking-tight">
                  Job level categories
                </h3>
                <ul className="space-y-1">
                  {jobLevels.map((level) => (
                    <li key={level}>
                      <button
                        suppressHydrationWarning
                        onClick={() =>
                          setActiveLevel(activeLevel === level ? null : level)
                        }
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          activeLevel === level
                            ? "bg-white/10 text-[#C8F542] font-medium"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {level}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* ── Right: Job List ── */}
            <div className="flex-1">
              <AnimatePresence mode="popLayout">
                {filteredJobs.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {filteredJobs.map((job, idx) => (
                      <motion.div
                        key={job.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                        className="group bg-[#141414] border border-white/5 rounded-xl hover:border-white/10 hover:bg-[#1a1a1a] transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-5 gap-4">
                          {/* Left: Icon + Title + Location */}
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                deptColors[job.department] || "bg-indigo-600"
                              }`}
                            >
                              {deptIcons[job.department] || (
                                <Briefcase className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-white font-semibold text-base group-hover:text-[#C8F542] transition-colors truncate">
                                {job.title}
                              </h3>
                              <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-xs">
                                <MapPin size={12} />
                                <span>{job.locationType}</span>
                              </div>
                            </div>
                          </div>

                          {/* Middle: Employment Type Badge */}
                          <div className="flex items-center gap-4 shrink-0">
                            <span className="px-4 py-1.5 border border-white/10 rounded-md text-xs text-gray-300 font-medium whitespace-nowrap">
                              {job.employmentType}
                            </span>

                            {/* Right: View Job Button */}
                            <Link
                              href={`/careers/${job.id}`}
                              className="px-5 py-1.5 border border-white/10 rounded-md text-xs text-gray-300 font-medium hover:bg-white/5 hover:text-white hover:border-white/20 transition-all whitespace-nowrap flex items-center gap-2 group/btn"
                            >
                              View job
                              <ChevronRight
                                size={12}
                                className="group-hover/btn:translate-x-0.5 transition-transform"
                              />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-24 text-center text-gray-600 border border-dashed border-white/10 rounded-2xl"
                  >
                    <Briefcase
                      size={48}
                      className="mx-auto mb-4 opacity-20"
                    />
                    <p>No open positions matching your filters.</p>
                    <button
                      onClick={() => {
                        setActiveCategory("All");
                        setActiveLevel(null);
                      }}
                      className="mt-4 text-[#C8F542] text-sm hover:underline"
                    >
                      Clear filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Talent Pool CTA ── */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#a5b4fc]/5 rounded-full blur-[120px] -ml-64 -mb-32" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8">
            Ready to Build the Future?
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Don&rsquo;t see a role that fits? Join our talent pool and be the first to
            know when new positions open up.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              suppressHydrationWarning
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#C8F542] transition-colors"
            />
            <button 
              suppressHydrationWarning
              className="bg-[#C8F542] text-black font-bold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(200,245,66,0.2)] hover:shadow-[0_0_30px_rgba(200,245,66,0.4)] transition-all"
            >
              Join Talent Pool
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
