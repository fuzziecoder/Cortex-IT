"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Phone, 
  Globe, 
  Trash2, 
  Search, 
  Clock, 
  User, 
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  FileText,
  Download
} from "lucide-react";

interface Application {
  id: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;
  resumeUrl?: string | null;
  message: string;
  status: string;
  createdAt: string | Date;
  job: {
    title: string;
  };
}

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/10 text-yellow-500",
  Reviewed: "bg-blue-500/10 text-blue-500",
  Hired: "bg-green-500/10 text-green-500",
  Rejected: "bg-red-500/10 text-red-500",
};

export default function ApplicationsClient({ initialApplications }: { initialApplications: Application[] }) {
  const router = useRouter();
  const [apps, setApps] = useState(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApps = apps.filter(app => 
    `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setApps(apps.map(a => a.id === id ? { ...a, status: newStatus } : a));
        router.refresh();
      } else {
        alert("Failed to update status. Please ensure your database is connected.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error: Failed to update status.");
    }
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/applications?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setApps(apps.filter(a => a.id !== id));
        router.refresh();
      } else {
        alert("Failed to delete record. Please ensure your database is connected.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error: Failed to delete record.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold">Job Applications</h1>
          <p className="text-gray-400 mt-2">Track candidates and manage the recruitment pipeline.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Search by name or role..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-[#121212] border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-[#C8F542] outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredApps.map((app) => (
          <div key={app.id} className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                {/* Candidate Info */}
                <div className="space-y-6 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{app.firstName} {app.lastName}</h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[app.status]}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#00bfff] font-medium">
                        <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Applied for:</span>
                        {app.job.title}
                      </div>
                    </div>
                  </div>

                  {/* Resume & Links Section - High Visibility */}
                  <div className="bg-[#C8F542]/5 border border-[#C8F542]/20 rounded-xl p-6">
                    <p className="text-xs font-bold text-[#C8F542] uppercase tracking-widest mb-4 flex items-center gap-2">
                       Candidate Links & Resume
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {app.resumeUrl && (
                        <a 
                          href={app.resumeUrl} 
                          target="_blank" 
                          rel="noopener" 
                          download
                          className="flex items-center gap-3 bg-black/40 p-4 rounded-lg border border-white/5 hover:border-[#22c55e]/50 transition-all group/link md:col-span-2"
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e]">
                            <FileText size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white group-hover/link:text-[#22c55e]">View Original Resume (PDF)</div>
                            <div className="text-[10px] text-gray-500">Click to download or view</div>
                          </div>
                          <ExternalLink size={14} className="ml-auto text-gray-600" />
                        </a>
                      )}

                      {app.portfolioUrl ? (
                        <a 
                          href={app.portfolioUrl} 
                          target="_blank" 
                          rel="noopener" 
                          className="flex items-center gap-3 bg-black/40 p-4 rounded-lg border border-white/5 hover:border-[#C8F542]/50 transition-all group/link"
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#C8F542]/10 flex items-center justify-center text-[#C8F542]">
                            <Globe size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white group-hover/link:text-[#C8F542]">Portfolio / Resume</div>
                            <div className="text-[10px] text-gray-500 truncate max-w-[150px]">{app.portfolioUrl}</div>
                          </div>
                          <ExternalLink size={14} className="ml-auto text-gray-600" />
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 bg-black/20 p-4 rounded-lg border border-white/5 opacity-50">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-600">
                            <Globe size={20} />
                          </div>
                          <div className="text-sm font-medium text-gray-600">No Resume Provided</div>
                        </div>
                      )}

                      {app.linkedinUrl && (
                        <a 
                          href={app.linkedinUrl} 
                          target="_blank" 
                          rel="noopener" 
                          className="flex items-center gap-3 bg-black/40 p-4 rounded-lg border border-white/5 hover:border-[#0077b5]/50 transition-all group/link"
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                            <ExternalLink size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white group-hover/link:text-[#0077b5]">LinkedIn Profile</div>
                            <div className="text-[10px] text-gray-500 truncate max-w-[150px]">{app.linkedinUrl}</div>
                          </div>
                          <ExternalLink size={14} className="ml-auto text-gray-600" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href={`mailto:${app.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Mail size={14} /></div>
                      {app.email}
                    </a>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Phone size={14} /></div>
                      {app.phone}
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-xl p-6 border border-white/5">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Candidate Message</p>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{app.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:w-64 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-8">
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest text-center lg:text-left">Management</p>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                      <button 
                        onClick={() => updateStatus(app.id, "Reviewed")}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-bold hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <AlertCircle size={14} /> Mark Reviewed
                      </button>
                      <button 
                        onClick={() => updateStatus(app.id, "Hired")}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-500/10 text-green-500 text-xs font-bold hover:bg-green-500 hover:text-white transition-all"
                      >
                        <CheckCircle size={14} /> Mark hired
                      </button>
                      <button 
                        onClick={() => updateStatus(app.id, "Rejected")}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                      <button 
                        onClick={() => deleteApp(app.id)}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 text-gray-500 text-xs font-bold hover:bg-red-900 hover:text-white transition-all"
                      >
                        <Trash2 size={14} /> Delete Record
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex items-center gap-2 text-gray-600 text-[10px] font-bold uppercase tracking-widest justify-center lg:justify-start">
                    <Clock size={12} />
                    Received: {new Date(app.createdAt).toISOString().split('T')[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredApps.length === 0 && (
          <div className="py-20 text-center text-gray-600 border border-dashed border-white/10 rounded-2xl">
            <User className="mx-auto mb-4 opacity-20" size={48} />
            <p>No applications found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
