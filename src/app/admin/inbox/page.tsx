import prisma from "@/lib/prisma";

export default async function InboxPage() {
  const contacts = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-heading mb-8">Contact Inbox</h1>
      <div className="flex flex-col gap-4">
        {contacts.length === 0 ? (
          <p className="text-gray-500">No requests yet.</p>
        ) : (
          contacts.map((c) => (
            <div key={c.id} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{c.firstName} {c.lastName}</h3>
                  <p className="text-gray-400 text-sm">{c.email} | {c.phone}</p>
                  <p className="text-gray-400 text-sm mt-1">{c.city}, {c.state}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm px-2 py-1 bg-[var(--color-accent-secondary)]/20 text-[var(--color-accent-secondary)] rounded">
                    {c.budget}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">{new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="text-sm text-gray-300"><strong>Services:</strong> {JSON.parse(c.services).join(", ")}</p>
                <p className="text-sm text-gray-300 mt-2"><strong>Timeline:</strong> {c.timeline}</p>
                <p className="text-sm text-gray-200 mt-4 leading-relaxed">"{c.description}"</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
