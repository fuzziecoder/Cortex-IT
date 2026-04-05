import prisma from "@/lib/prisma";
import Broadcaster from "@/components/Broadcaster";

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading">Subscribers & Broadcaster</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subscribers List */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-medium mb-4">Mailing List ({subscribers.length})</h2>
          <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2">
            {subscribers.map((s) => (
              <div key={s.id} className="flex justify-between items-center p-3 bg-black/50 rounded-lg">
                <span className="text-sm font-light">{s.email}</span>
                <span className="text-xs text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
            {subscribers.length === 0 && <p className="text-gray-500 text-sm">No subscribers yet.</p>}
          </div>
        </div>

        {/* Broadcaster */}
        <Broadcaster subscriberCount={subscribers.length} />
      </div>
    </div>
  );
}
