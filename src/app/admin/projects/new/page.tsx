"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Basic JSON stringify for arrays
    data.tags = JSON.stringify(data.tags.toString().split(',').map((t) => t.trim()));
    data.features = JSON.stringify(data.features.toString().split('\n').map((t) => t.trim()));
    data.results = JSON.stringify(data.results.toString().split('\n').map((t) => t.trim()));
    data.slug = data.title.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        alert("Failed to create project");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-heading mb-8">Add New Project</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Project Title
            <input required name="title" type="text" className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Subtitle
            <input required name="subtitle" type="text" className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Overview
          <textarea required name="overview" rows={3} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Challenge
            <textarea required name="challenge" rows={3} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Solution
            <textarea required name="solution" rows={3} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Tags (comma separated)
            <input required name="tags" type="text" placeholder="Web, App, SEO" className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Website URL
            <input name="websiteUrl" type="url" className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Features (one per line)
            <textarea required name="features" rows={3} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Results (one per line)
            <textarea required name="results" rows={3} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Logo URL / Path
          <input required name="logo" type="text" placeholder="/logo.png or https://..." className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
        </label>

        <button disabled={loading} type="submit" className="bg-[var(--color-accent-secondary)] text-white py-3 rounded-lg hover:opacity-80 transition-opacity font-medium mt-4 disabled:opacity-50">
          {loading ? "Saving..." : "Save Project"}
        </button>
      </form>
    </div>
  );
}
