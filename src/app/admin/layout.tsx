import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  // If not authenticated, render only children (for login page)
  if (!token) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Image src="/logo-full.png" alt="Cortex Studio" width={120} height={40} style={{ width: 'auto' }} className="h-8 w-auto object-contain" />
          </Link>
          <div className="mt-1 text-xs text-gray-500 uppercase tracking-widest font-bold">Admin Panel</div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-white/5 text-sm">Dashboard</Link>
          <Link href="/admin/inbox" className="block px-4 py-2 rounded hover:bg-white/5 text-sm">Inbox</Link>
          <Link href="/admin/subscribers" className="block px-4 py-2 rounded hover:bg-white/5 text-sm">Subscribers & Broadcaster</Link>
          <Link href="/admin/projects" className="block px-4 py-2 rounded hover:bg-white/5 text-sm">Projects</Link>
          <Link href="/admin/partners" className="block px-4 py-2 rounded hover:bg-white/5 text-sm">Partners</Link>
          <Link href="/admin/jobs" className="block px-4 py-2 rounded hover:bg-white/5 text-sm">Jobs Board</Link>
          <Link href="/admin/applications" className="block px-4 py-2 rounded hover:bg-white/5 text-sm">Job Applications</Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 rounded">
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
