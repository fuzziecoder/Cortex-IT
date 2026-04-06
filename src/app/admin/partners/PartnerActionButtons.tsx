"use client";

import { useRouter } from "next/navigation";

export default function PartnerActionButtons({ id }: { id: string }) {
  const router = useRouter();
  
  const handleEdit = () => {
    router.push(`/admin/partners/${id}/edit`);
  };
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this partner?")) return;
    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete partner");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting partner");
    }
  };

  return (
    <div className="flex gap-2 w-full pt-4 border-t border-white/10 mt-auto">
      <button onClick={handleEdit} className="flex-1 text-xs py-2 bg-white/10 hover:bg-white/20 rounded text-center transition-colors">Edit</button>
      <button onClick={handleDelete} className="flex-1 text-xs py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded text-center transition-colors">Delete</button>
    </div>
  );
}
