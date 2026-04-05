"use client";

import { useState } from "react";

export default function Broadcaster({ subscriberCount }: { subscriberCount: number }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subscriberCount === 0) return alert("No subscribers to send to.");
    
    setStatus("sending");
    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });

      if (res.ok) {
        setStatus("success");
        setSubject("");
        setMessage("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-medium mb-4">Send Broadcast</h2>
      <p className="text-sm text-gray-400 mb-6">Write an update to send to all {subscriberCount} subscribers.</p>
      
      <form onSubmit={handleBroadcast} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Subject</label>
          <input 
            required
            type="text" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C8F542]/50" 
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Message Body (Text/HTML)</label>
          <textarea 
            required
            rows={8} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C8F542]/50 resize-none" 
          />
        </div>
        
        {status === "success" && <p className="text-green-500 text-sm">Emails dispatched successfully!</p>}
        {status === "error" && <p className="text-red-500 text-sm">Failed to send. Check SMTP settings.</p>}

        <button 
          type="submit" 
          disabled={status === "sending"}
          className="mt-2 bg-[var(--color-accent-secondary)] text-white font-medium text-sm px-6 py-3 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send to All Subscribers"}
        </button>
      </form>
    </div>
  );
}
