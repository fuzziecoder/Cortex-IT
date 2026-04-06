"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function InboxActionButtons({ id }: { id: string }) {
  const router = useRouter();
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this contact request?")) return;
    try {
      const res = await fetch(`/api/admin/inbox/${id}`, { method: "DELETE" });
      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(`Failed to delete contact request: ${data.error || res.statusText}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Error deleting contact request: ${err.message}`);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="mt-4 w-full flex items-center justify-center gap-2 text-sm py-2 px-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded text-center transition-colors"
    >
      <Trash2 size={16} /> Delete
    </button>
  );
}
