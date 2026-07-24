"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Globe2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 selection:bg-[#115e59] selection:text-white">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl shadow-[#002b5c]/5 border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100 p-1">
            <img src="/logo.jpg" alt="BCRD Logo" onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }} className="w-full h-full object-contain p-2 rounded-full" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#002b5c]">Админ нэвтрэх</h1>
          <p className="text-slate-500 text-sm mt-2">BCRD удирдлагын хэсэг</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm font-medium mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Цахим шуудан</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#115e59] focus:border-transparent transition-all bg-slate-50 focus:bg-white"
              placeholder="admin@bcrd.mn"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#115e59] focus:border-transparent transition-all bg-slate-50 focus:bg-white"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#115e59] hover:bg-[#0f4d4a] text-white py-3.5 rounded-lg font-bold transition-colors shadow-lg shadow-[#115e59]/20 disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Нэвтрэх"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
