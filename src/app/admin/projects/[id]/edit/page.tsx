"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  challenge: string;
  solution: string;
  tags: string;
  features: string;
  results: string;
  logo: string;
  websiteUrl: string;
  slug: string;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    fetch(`/api/admin/projects/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data.project);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    data.tags = JSON.stringify(data.tags.split(",").map((t) => t.trim()));
    data.features = JSON.stringify(data.features.split("\n").map((t) => t.trim()).filter(Boolean));
    data.results = JSON.stringify(data.results.split("\n").map((t) => t.trim()).filter(Boolean));
    data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      const res = await fetch(`/api/admin/projects/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        alert("Failed to update project");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center py-20 text-gray-400">Loading project...</div>;
  }

  if (!project) {
    return <div className="text-center py-20 text-red-400">Project not found.</div>;
  }

  const parsedTags = JSON.parse(project.tags).join(", ");
  const parsedFeatures = JSON.parse(project.features).join("\n");
  const parsedResults = JSON.parse(project.results).join("\n");

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-heading mb-8">Edit Project</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Project Title
            <input required name="title" type="text" defaultValue={project.title} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Subtitle
            <input required name="subtitle" type="text" defaultValue={project.subtitle} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Overview
          <textarea required name="overview" rows={3} defaultValue={project.overview} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Challenge
            <textarea required name="challenge" rows={3} defaultValue={project.challenge} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Solution
            <textarea required name="solution" rows={3} defaultValue={project.solution} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Tags (comma separated)
            <input required name="tags" type="text" defaultValue={parsedTags} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Website URL
            <input name="websiteUrl" type="url" defaultValue={project.websiteUrl} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Features (one per line)
            <textarea required name="features" rows={3} defaultValue={parsedFeatures} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Results (one per line)
            <textarea required name="results" rows={3} defaultValue={parsedResults} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Logo URL / Path
          <input required name="logo" type="text" defaultValue={project.logo} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
        </label>

        <div className="flex gap-4 mt-4">
          <button disabled={loading} type="submit" className="flex-1 bg-[var(--color-accent-secondary)] text-white py-3 rounded-lg hover:opacity-80 transition-opacity font-medium disabled:opacity-50">
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={() => router.back()} className="flex-1 bg-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition-colors font-medium">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
