import Link from "next/link";
import prisma from "@/lib/prisma";
import ProjectActionButtons from "./ProjectActionButtons";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
            <ProjectActionButtons id={p.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
