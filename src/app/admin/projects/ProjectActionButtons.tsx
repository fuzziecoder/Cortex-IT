"use client";

import { useRouter } from "next/navigation";

export default function ProjectActionButtons({ id }: { id: string }) {
  const router = useRouter();
  
  const handleEdit = () => {
    router.push(`/admin/projects/${id}/edit`);
  };
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(`Failed to delete project: ${data.error || res.statusText}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Error deleting project: ${err.message}`);
    }
  };

  return (
    <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
      <button onClick={handleEdit} className="flex-1 text-sm py-2 bg-white/10 hover:bg-white/20 rounded text-center transition-colors">Edit</button>
      <button onClick={handleDelete} className="flex-1 text-sm py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded text-center transition-colors">Delete</button>
    </div>
  );
}
