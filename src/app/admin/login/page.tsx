"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="w-full max-w-sm p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
        <h1 className="text-2xl font-heading mb-6 text-white text-center">Admin Access</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8F542]/50 transition-colors"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-white text-black font-medium text-sm px-6 py-3 rounded-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
