"use client";

import { useState } from "react";
import { Trash2, CheckCircle, Mail } from "lucide-react";

export default function MessagesClient({ initialMessages }: { initialMessages: any[] }) {
  const [messages, setMessages] = useState(initialMessages);

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "PUT" });
      if (res.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
      }
    } catch (err) {
      alert("Алдаа гарлаа");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Устгахдаа итгэлтэй байна уу?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
      }
    } catch (err) {
      alert("Алдаа гарлаа");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 font-bold text-slate-700 text-sm">Төлөв</th>
            <th className="px-6 py-4 font-bold text-slate-700 text-sm">Нэр / Имэйл</th>
            <th className="px-6 py-4 font-bold text-slate-700 text-sm">Зурвас</th>
            <th className="px-6 py-4 font-bold text-slate-700 text-sm">Огноо</th>
            <th className="px-6 py-4 font-bold text-slate-700 text-sm text-right">Үйлдэл</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {messages.map(msg => (
            <tr key={msg.id} className={`transition-colors ${msg.isRead ? 'bg-white' : 'bg-blue-50/50'}`}>
              <td className="px-6 py-4">
                {msg.isRead ? (
                  <Mail className="w-5 h-5 text-slate-400" />
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">Шинэ</span>
                )}
              </td>
              <td className="px-6 py-4">
                <p className="font-bold text-[#002b5c]">{msg.name}</p>
                <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 hover:underline">{msg.email}</a>
              </td>
              <td className="px-6 py-4 max-w-md">
                <p className="text-sm text-slate-600 break-words">{msg.message}</p>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                {new Date(msg.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right space-x-2 w-32">
                {!msg.isRead && (
                  <button onClick={() => handleMarkAsRead(msg.id)} title="Уншсан болгох" className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => handleDelete(msg.id)} title="Устгах" className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          {messages.length === 0 && (
            <tr><td colSpan={5} className="text-center py-8 text-slate-500">Санал хүсэлт одоогоор алга байна.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
