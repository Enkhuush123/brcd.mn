"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function CategoriesClient({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: "", nameMn: "", nameEn: "", nameZh: "", slug: "" });
  const [loading, setLoading] = useState(false);

  // Dialog State
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isAlert: boolean;
    idToDelete?: string;
  }>({ isOpen: false, title: "", message: "", isAlert: false });

  const closeDialog = () => setDialogConfig(prev => ({ ...prev, isOpen: false }));

  const handleOpenModal = (category?: any) => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({ id: "", nameMn: "", nameEn: "", nameZh: "", slug: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id ? `/api/categories/${formData.id}` : "/api/categories";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        if (method === "POST") {
          setCategories([data, ...categories]);
        } else {
          setCategories(categories.map(c => c.id === formData.id ? data : c));
        }
      } else {
        setDialogConfig({ isOpen: true, title: "Алдаа", message: data.error || "Алдаа гарлаа", isAlert: true });
      }
    } catch (err) {
      setDialogConfig({ isOpen: true, title: "Алдаа", message: "Алдаа гарлаа", isAlert: true });
    } finally {
      setLoading(false);
    }
  };

  const requestDelete = (id: string) => {
    setDialogConfig({
      isOpen: true,
      title: "Анхааруулга",
      message: "Энэ ангиллыг устгахдаа итгэлтэй байна уу?",
      isAlert: false,
      idToDelete: id
    });
  };

  const confirmDelete = async () => {
    const id = dialogConfig.idToDelete;
    if (!id) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
        closeDialog();
      } else {
        setDialogConfig({ isOpen: true, title: "Алдаа", message: "Устгаж чадсангүй (Магадгүй нийтлэл холбогдсон байж болно).", isAlert: true });
      }
    } catch (err) {
      setDialogConfig({ isOpen: true, title: "Алдаа", message: "Алдаа гарлаа", isAlert: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ConfirmDialog 
        isOpen={dialogConfig.isOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        isAlert={dialogConfig.isAlert}
        isLoading={loading}
        onConfirm={dialogConfig.isAlert ? closeDialog : confirmDelete}
        onCancel={closeDialog}
      />

      <div className="flex justify-end mb-6">
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[#115e59] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0f4d4a] transition-colors">
          <Plus className="w-5 h-5" />
          Шинэ ангилал
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-700 text-sm">Нэр (MN)</th>
              <th className="px-6 py-4 font-bold text-slate-700 text-sm">Slug</th>
              <th className="px-6 py-4 font-bold text-slate-700 text-sm text-right">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{c.nameMn}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{c.slug}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleOpenModal(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => requestDelete(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={3} className="text-center py-8 text-slate-500">Ангилал байхгүй байна.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-[#002b5c]">{formData.id ? "Ангилал засах" : "Шинэ ангилал"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Нэр (MN)</label>
                <input required type="text" value={formData.nameMn} onChange={e => setFormData({...formData, nameMn: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Нэр (EN)</label>
                <input type="text" value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Нэр (ZH)</label>
                <input type="text" value={formData.nameZh} onChange={e => setFormData({...formData, nameZh: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">URL Slug</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border rounded-lg px-3 py-2 font-mono text-sm" placeholder="my-category-slug" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 font-bold">Цуцлах</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-[#115e59] text-white rounded-lg hover:bg-[#0f4d4a] font-bold min-w-[100px] flex justify-center items-center">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : "Хадгалах"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
