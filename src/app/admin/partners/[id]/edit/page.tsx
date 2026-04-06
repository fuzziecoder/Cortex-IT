"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface PartnerData {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

export default function EditPartnerPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [partner, setPartner] = useState<PartnerData | null>(null);

  useEffect(() => {
    fetch(`/api/admin/partners/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPartner(data.partner);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`/api/admin/partners/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/partners");
        router.refresh();
      } else {
        alert("Failed to update partner");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center py-20 text-gray-400">Loading partner...</div>;
  }

  if (!partner) {
    return <div className="text-center py-20 text-red-400">Partner not found.</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-heading mb-8">Edit Partner</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Partner Name
          <input required name="name" type="text" defaultValue={partner.name} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
        </label>

        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Partner Logo URL / Path
          <input required name="logoUrl" type="text" defaultValue={partner.logoUrl} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
        </label>

        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Partner Website URL
          <input required name="websiteUrl" type="url" defaultValue={partner.websiteUrl} className="bg-[#1a1a1a] border border-white/10 rounded px-4 py-2 focus:border-[#C8F542]/50 text-white" />
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
