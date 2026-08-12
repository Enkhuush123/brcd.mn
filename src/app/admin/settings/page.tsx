"use client";

import { useState, useEffect } from "react";
import { Save, Phone, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setPhone(data.phone || "");
          setEmail(data.email || "");
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email })
      });

      if (res.ok) {
        setMessage({ text: "Тохиргоо амжилттай хадгалагдлаа.", type: "success" });
        router.refresh();
      } else {
        const data = await res.json();
        setMessage({ text: data.error || "Хадгалахад алдаа гарлаа.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Сүлжээний алдаа гарлаа.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#002b5c] mb-8">Ерөнхий тохиргоо</h1>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-10 bg-slate-200 rounded"></div>
              <div className="h-10 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#002b5c] mb-8 font-serif">Ерөнхий тохиргоо</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 max-w-2xl">
        <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Холбоо барих мэдээлэл</h2>
        
        {message.text && (
          <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Утасны дугаар</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#115e59] focus:ring-2 focus:ring-[#115e59]/20 transition-all outline-none"
                placeholder="+976 7700-0000"
                required
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Вэбсайтын доод хэсэг болон холбоо барих хуудсанд харагдана.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">И-мэйл хаяг</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#115e59] focus:ring-2 focus:ring-[#115e59]/20 transition-all outline-none"
                placeholder="info@bcrd.mn"
                required
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Вэбсайтын доод хэсэг болон холбоо барих хуудсанд харагдана.</p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#115e59] hover:bg-[#0f4d4a] text-white px-6 py-2.5 rounded-lg font-bold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
