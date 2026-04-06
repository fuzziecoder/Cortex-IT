import Link from "next/link";
import prisma from "@/lib/prisma";
import PartnerActionButtons from "./PartnerActionButtons";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPartners() {
  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading">Manage Partners</h1>
        <Link href="/admin/partners/new" className="bg-[var(--color-accent-secondary)] text-white font-medium text-sm px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
          + Add New Partner
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partners.map((p) => (
          <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-center text-center">
            <div className="w-full h-24 bg-white/5 rounded-lg mb-4 flex items-center justify-center p-4">
              <img src={p.logoUrl} alt={p.name} className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="text-lg font-medium mb-1 w-full truncate">{p.name}</h3>
            <a href={p.websiteUrl} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-white truncate w-full mb-4">
              {p.websiteUrl}
            </a>
            
            <PartnerActionButtons id={p.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
