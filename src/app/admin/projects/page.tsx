import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading">Manage Projects</h1>
        <Link href="/admin/projects/new" className="bg-[var(--color-accent-secondary)] text-white font-medium text-sm px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
          + Add New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium">{p.title}</h3>
                <span className="text-xs text-gray-500">{p.slug}</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-3 mb-4">{p.overview}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {JSON.parse(p.tags).slice(0, 3).map((t: string) => (
                  <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              <button className="flex-1 text-sm py-2 bg-white/10 hover:bg-white/20 rounded text-center transition-colors">Edit</button>
              <button className="flex-1 text-sm py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded text-center transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
