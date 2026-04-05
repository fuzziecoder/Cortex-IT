"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPartnerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/admin/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/partners");
        router.refresh();
      } else {
        alert("Failed to create partner");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-heading mb-8">Add New Partner</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Partner Name
          <input required name="name" type="text" className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
        </label>
        
        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Partner Logo URL / Path
          <input required name="logoUrl" type="text" placeholder="/partner-logo.png" className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
        </label>
        
        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Partner Website URL
          <input required name="websiteUrl" type="url" placeholder="https://..." className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
        </label>

        <button disabled={loading} type="submit" className="bg-[var(--color-accent-secondary)] text-white py-3 rounded-lg hover:opacity-80 transition-opacity font-medium mt-4 disabled:opacity-50">
          {loading ? "Saving..." : "Save Partner"}
        </button>
      </form>
    </div>
  );
}
