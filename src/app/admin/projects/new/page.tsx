"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoPath, setLogoPath] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (PNG, JPG, SVG, WebP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    // Show local preview immediately
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileBase64: base64,
            fileName: file.name,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setLogoPath(data.url);
        } else {
          alert("Failed to upload image");
          setLogoPreview(null);
          setLogoPath("");
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      alert("Upload failed");
      setLogoPreview(null);
      setLogoPath("");
      setUploading(false);
    }
  };

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

        {/* Logo Upload Section */}
        <div className="flex flex-col gap-3 text-sm text-gray-300">
          <span>Project Logo</span>
          <div className="flex items-start gap-4">
            {/* Upload area */}
            <div className="flex-1 flex flex-col gap-2">
              <input
                type="hidden"
                name="logo"
                value={logoPath}
                required
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#1a1a1a] border-2 border-dashed border-white/20 rounded-lg px-4 py-5 flex flex-col items-center gap-2 cursor-pointer hover:border-[#C8F542]/50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span className="text-gray-400 text-xs">
                  {uploading ? "Uploading..." : "Click to upload logo image"}
                </span>
                <span className="text-gray-600 text-xs">PNG, JPG, SVG, WebP — Max 5MB</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              {/* Manual URL input as fallback */}
              <input
                type="text"
                placeholder="Or paste URL / path manually"
                value={logoPath}
                onChange={(e) => {
                  setLogoPath(e.target.value);
                  setLogoPreview(e.target.value || null);
                }}
                className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white text-xs"
              />
            </div>

            {/* Preview */}
            {logoPreview && (
              <div className="flex-shrink-0 w-20 h-20 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center relative">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-full h-full object-contain p-1"
                />
              </div>
            )}
          </div>
        </div>

        <button disabled={loading || uploading} type="submit" className="bg-[var(--color-accent-secondary)] text-white py-3 rounded-lg hover:opacity-80 transition-opacity font-medium mt-4 disabled:opacity-50">
          {loading ? "Saving..." : "Save Project"}
        </button>
      </form>
    </div>
  );
}
