"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, ExternalLink } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  locationType: string;
  employmentType: string;
  isActive: boolean;
  salaryRange?: string | null;
  description: string;
  _count?: {
    applications: number;
  };
}

export default function JobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    department: "Development",
    locationType: "Remote",
    employmentType: "Full-time",
    salaryRange: "",
    description: "",
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      department: "Development",
      locationType: "Remote",
      employmentType: "Full-time",
      salaryRange: "",
      description: "",
      isActive: true,
    });
    setEditingJob(null);
  };

  const handleOpenModal = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title,
        department: job.department,
        locationType: job.locationType,
        employmentType: job.employmentType,
        salaryRange: job.salaryRange || "",
        description: job.description,
        isActive: job.isActive,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingJob ? `/api/admin/jobs/${editingJob.id}` : "/api/admin/jobs";
      const method = editingJob ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const savedJob = await res.json();
        if (editingJob) {
          setJobs(jobs.map(j => j.id === savedJob.id ? { ...savedJob, _count: editingJob._count } : j));
        } else {
          setJobs([savedJob, ...jobs]);
        }
        setIsModalOpen(false);
        resetForm();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;

    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs(jobs.filter(j => j.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Jobs Board</h1>
          <p className="text-gray-400 mt-2">Manage your open positions and hiring criteria.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#C8F542] text-black px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold hover:shadow-[0_0_15px_rgba(200,245,66,0.2)] transition-all"
        >
          <Plus size={20} /> Create New Job
        </button>
      </div>

      <div className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left bg-black">
          <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-gray-500 bg-[#0a0a0a]">
            <tr>
              <th className="px-6 py-4 font-bold">Title / Department</th>
              <th className="px-6 py-4 font-bold">Type / Location</th>
              <th className="px-6 py-4 font-bold text-center">Applications</th>
              <th className="px-6 py-4 font-bold text-center">Status</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-5">
                  <div className="font-bold text-white">{job.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{job.department}</div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <span className="text-gray-300">{job.employmentType}</span>
                  <span className="mx-2 text-gray-700">•</span>
                  <span className="text-gray-500">{job.locationType}</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`px-2 py-1 rounded bg-white/5 text-xs ${job._count?.applications ? 'text-[#00bfff]' : 'text-gray-600'}`}>
                    {job._count?.applications || 0}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    job.isActive ? "bg-[#39ff14]/10 text-[#39ff14]" : "bg-red-500/10 text-red-500"
                  }`}>
                    {job.isActive ? <Check size={10} /> : <X size={10} />}
                    {job.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleOpenModal(job)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(job.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/5 rounded transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-500 italic">
                  No jobs found. Create your first listing to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#121212] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold">{editingJob ? "Edit Job Listing" : "Create New Job"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Job Title</label>
                  <input 
                    required 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#C8F542] outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Department</label>
                  <select 
                    value={formData.department}
                    onChange={e => setFormData({...formData, department: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#C8F542] outline-none"
                  >
                    <option>Development</option>
                    <option>Design</option>
                    <option>AI/ML</option>
                    <option>Management</option>
                    <option>Operations</option>
                    <option>Marketing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Location Type</label>
                  <input 
                    placeholder="Remote, On-site, etc."
                    value={formData.locationType}
                    onChange={e => setFormData({...formData, locationType: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#C8F542] outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Employment Type</label>
                  <input 
                    placeholder="Full-time, Contract, etc."
                    value={formData.employmentType}
                    onChange={e => setFormData({...formData, employmentType: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#C8F542] outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Salary Range</label>
                  <input 
                    placeholder="e.g. ₹15-25LPA"
                    value={formData.salaryRange}
                    onChange={e => setFormData({...formData, salaryRange: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#C8F542] outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Job Description</label>
                <textarea 
                  required 
                  rows={5}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#C8F542] outline-none resize-none" 
                />
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={formData.isActive}
                  onChange={e => setFormData({...formData, isActive: e.target.checked})}
                />
                <label htmlFor="isActive" className="text-sm">Active & Visible in Careers Page</label>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1 bg-[#C8F542] text-black font-bold py-3 rounded-lg hover:bg-[#b8e53a] transition-all disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : editingJob ? "Update Job" : "Create Job"}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-white/10 bg-transparent hover:bg-white/5 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
