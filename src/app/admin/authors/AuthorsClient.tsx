"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function AuthorsClient({ initialAuthors }: { initialAuthors: any[] }) {
  const [authors, setAuthors] = useState(initialAuthors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: "", nameMn: "", nameEn: "", nameZh: "", titleMn: "", titleEn: "", titleZh: "", photoUrl: "" });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Dialog State
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isAlert: boolean;
    idToDelete?: string;
  }>({ isOpen: false, title: "", message: "", isAlert: false });

  const closeDialog = () => setDialogConfig(prev => ({ ...prev, isOpen: false }));

  const handleOpenModal = (author?: any) => {
    if (author) {
      setFormData({
        id: author.id,
        nameMn: author.nameMn,
        nameEn: author.nameEn,
        nameZh: author.nameZh,
        titleMn: author.titleMn || "",
        titleEn: author.titleEn || "",
        titleZh: author.titleZh || "",
        photoUrl: author.photoUrl || "",
      });
    } else {
      setFormData({ id: "", nameMn: "", nameEn: "", nameZh: "", titleMn: "", titleEn: "", titleZh: "", photoUrl: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id ? `/api/authors/${formData.id}` : "/api/authors";

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
          setAuthors([data, ...authors]);
        } else {
          setAuthors(authors.map(a => a.id === formData.id ? data : a));
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      setDialogConfig({ isOpen: true, title: "Алдаа", message: "Зөвхөн зураг оруулна уу.", isAlert: true });
      return;
    }

    setUploadingImage(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/cloudinary", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setFormData({ ...formData, photoUrl: result.url });
      } else {
        setDialogConfig({ isOpen: true, title: "Алдаа", message: "Хуулахад алдаа гарлаа: " + result.error, isAlert: true });
      }
    } catch (error) {
      console.error(error);
      setDialogConfig({ isOpen: true, title: "Алдаа", message: "Сервертэй холбогдоход алдаа гарлаа.", isAlert: true });
    } finally {
      setUploadingImage(false);
    }
  };

  const requestDelete = (id: string) => {
    setDialogConfig({
      isOpen: true,
      title: "Анхааруулга",
      message: "Энэ судлаачийг устгахдаа итгэлтэй байна уу?",
      isAlert: false,
      idToDelete: id
    });
  };

  const confirmDelete = async () => {
    const id = dialogConfig.idToDelete;
    if (!id) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/authors/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAuthors(authors.filter(a => a.id !== id));
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
          Шинэ судлаач
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-700 text-sm">Нэр (MN)</th>
              <th className="px-6 py-4 font-bold text-slate-700 text-sm">Албан тушаал (MN)</th>
              <th className="px-6 py-4 font-bold text-slate-700 text-sm text-right">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {authors.map(a => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{a.nameMn}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{a.titleMn}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleOpenModal(a)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => requestDelete(a.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {authors.length === 0 && (
              <tr><td colSpan={3} className="text-center py-8 text-slate-500">Судлаач бүртгэгдээгүй байна.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50 flex-shrink-0">
              <h3 className="font-bold text-lg text-[#002b5c]">{formData.id ? "Судлаач засах" : "Шинэ судлаач"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            <div className="overflow-y-auto p-6">
              <form id="author-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Нэр (MN)</label>
                  <input required type="text" value={formData.nameMn} onChange={e => setFormData({...formData, nameMn: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Албан тушаал (MN)</label>
                  <input type="text" value={formData.titleMn} onChange={e => setFormData({...formData, titleMn: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div className="pt-2 border-t mt-4">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Нэр (EN)</label>
                  <input type="text" value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Нэр (ZH)</label>
                  <input type="text" value={formData.nameZh} onChange={e => setFormData({...formData, nameZh: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                </div>
                
                <div className="pt-2 border-t mt-4">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Зураг оруулах (photoUrl)</label>
                  {formData.photoUrl ? (
                    <div className="relative inline-block border rounded p-1 bg-slate-50">
                      <img src={formData.photoUrl} alt="Photo" className="h-20 object-contain rounded" />
                      <button type="button" onClick={() => setFormData({...formData, photoUrl: ""})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md text-xs">
                        &times;
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="text-sm" />
                      {uploadingImage && <span className="text-xs text-teal-600">Уншиж байна...</span>}
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3 bg-slate-50 flex-shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 font-bold">Цуцлах</button>
              <button form="author-form" type="submit" disabled={loading} className="px-4 py-2 bg-[#115e59] text-white rounded-lg hover:bg-[#0f4d4a] font-bold min-w-[100px] flex justify-center items-center">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : "Хадгалах"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
