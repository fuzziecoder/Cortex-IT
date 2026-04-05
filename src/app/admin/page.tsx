import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const contactCount = await prisma.contactRequest.count();
  const subCount = await prisma.subscriber.count();
  const projectCount = await prisma.project.count();
  const partnerCount = await prisma.partner.count();

  return (
    <div>
      <h1 className="text-3xl font-heading mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">Total Contacts</p>
          <p className="text-4xl font-light">{contactCount}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">Subscribers</p>
          <p className="text-4xl font-light">{subCount}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">Projects</p>
          <p className="text-4xl font-light">{projectCount}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">Partners</p>
          <p className="text-4xl font-light">{partnerCount}</p>
        </div>
      </div>
    </div>
  );
}
