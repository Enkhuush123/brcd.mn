"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Upload, FileText, X } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function DocumentsClient({ initialDocuments }: { initialDocuments: any[] }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    id: "", titleMn: "", titleEn: "", titleZh: "", 
    contentMn: "", contentEn: "", contentZh: "", 
    fileUrl: "", type: "REPORT" 
  });
  const [loading, setLoading] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const handleOpenModal = (doc?: any) => {
    if (doc) {
      setFormData({
        id: doc.id,
        titleMn: doc.titleMn,
        titleEn: doc.titleEn || "",
        titleZh: doc.titleZh || "",
        contentMn: doc.contentMn || "",
        contentEn: doc.contentEn || "",
        contentZh: doc.contentZh || "",
        fileUrl: doc.fileUrl || "",
        type: doc.type,
      });
    } else {
      setFormData({ 
        id: "", titleMn: "", titleEn: "", titleZh: "", 
        contentMn: "", contentEn: "", contentZh: "", 
        fileUrl: "", type: "REPORT" 
      });
    }
    setIsModalOpen(true);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.type !== "application/pdf") {
      alert("Зөвхөн PDF файл оруулна уу.");
      return;
    }

    setUploadingPdf(true);
    const data = new FormData();
    data.append("file", file);
    data.append("folder", "documents");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setFormData({ ...formData, fileUrl: result.url });
      } else {
        alert("Хуулахад алдаа гарлаа: " + result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Сервертэй холбогдоход алдаа гарлаа.");
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fileUrl && !formData.contentMn) {
      alert("PDF файл хавсаргах эсвэл гараар текст (MN) бичнэ үү!");
      return;
    }
    
    setLoading(true);
    const method = formData.id ? "PUT" : "POST";
    const url = formData.id ? `/api/documents/${formData.id}` : "/api/documents";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        window.location.reload(); 
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch (err) {
      alert("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Устгахдаа итгэлтэй байна уу?")) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Устгаж чадсангүй.");
      }
    } catch (err) {
      alert("Алдаа гарлаа");
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[#115e59] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0f4d4a] transition-colors">
          <Plus className="w-5 h-5" />
          Шинэ файл
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-700 text-sm">Гарчиг (MN)</th>
              <th className="px-6 py-4 font-bold text-slate-700 text-sm">Төрөл</th>
              <th className="px-6 py-4 font-bold text-slate-700 text-sm">Файл / Агуулга</th>
              <th className="px-6 py-4 font-bold text-slate-700 text-sm text-right">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map(d => (
              <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{d.titleMn}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{d.type}</td>
                <td className="px-6 py-4 text-sm">
                  {d.fileUrl ? (
                    <a href={d.fileUrl} target="_blank" rel="noreferrer" className="text-[#115e59] hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" /> Үзэх
                    </a>
                  ) : (
                    <span className="text-slate-500 italic">Гараар бичсэн</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleOpenModal(d)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(d.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr><td colSpan={4} className="text-center py-8 text-slate-500">Баримт бичиг ороогүй байна.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col" style={{ maxHeight: "90vh" }}>
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50 flex-shrink-0">
              <h3 className="font-bold text-lg text-[#002b5c]">{formData.id ? "Файл засах" : "Шинэ файл оруулах"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form id="doc-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Titles */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Гарчиг (MN) *</label>
                    <input required type="text" value={formData.titleMn} onChange={e => setFormData({...formData, titleMn: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Гарчиг (EN)</label>
                      <input type="text" value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Гарчиг (ZH)</label>
                      <input type="text" value={formData.titleZh} onChange={e => setFormData({...formData, titleZh: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Төрөл</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border rounded-lg px-3 py-2">
                    <option value="REPORT">Тайлан (Report)</option>
                    <option value="POLICY">Бодлогын зөвлөмж (Policy Brief)</option>
                    <option value="JOURNAL">Сэтгүүл (Journal)</option>
                  </select>
                </div>

                {/* File Upload or Text Editor */}
                <div className="border-t pt-6 mt-6">
                  <h4 className="font-bold text-[#002b5c] mb-4">Агуулга (PDF хавсаргах ЭСВЭЛ гараар бичих)</h4>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">PDF Файл</label>
                    {formData.fileUrl ? (
                      <div className="flex items-center gap-3 p-3 border border-[#115e59] bg-teal-50 rounded-lg">
                        <FileText className="w-5 h-5 text-[#115e59]" />
                        <a href={formData.fileUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#115e59] hover:underline flex-1 truncate">
                          {formData.fileUrl.split('/').pop()}
                        </a>
                        <button type="button" onClick={() => setFormData({...formData, fileUrl: ""})} className="p-1 hover:bg-teal-100 rounded text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-6 h-6 mb-2 text-slate-400" />
                          <p className="text-sm text-slate-500">PDF файлаа энд хуулна уу</p>
                        </div>
                        <input type="file" accept="application/pdf" className="hidden" onChange={handlePdfUpload} disabled={uploadingPdf} />
                      </label>
                    )}
                    {uploadingPdf && <p className="text-sm text-teal-600 font-medium mt-2">Хуулж байна...</p>}
                  </div>

                  <div className="space-y-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2 border-t pt-4">ЭСВЭЛ гараар бичих (Rich Text)</label>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Монгол хэлээр</label>
                      <div className="bg-white rounded-lg border h-64">
                        <ReactQuill theme="snow" value={formData.contentMn} onChange={val => setFormData({...formData, contentMn: val})} modules={modules} className="h-48" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Англи хэлээр</label>
                      <div className="bg-white rounded-lg border h-64">
                        <ReactQuill theme="snow" value={formData.contentEn} onChange={val => setFormData({...formData, contentEn: val})} modules={modules} className="h-48" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Хятад хэлээр</label>
                      <div className="bg-white rounded-lg border h-64">
                        <ReactQuill theme="snow" value={formData.contentZh} onChange={val => setFormData({...formData, contentZh: val})} modules={modules} className="h-48" />
                      </div>
                    </div>
                  </div>

                </div>

              </form>
            </div>
            
            <div className="px-6 py-4 border-t flex justify-end gap-3 bg-slate-50 flex-shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 font-bold">Цуцлах</button>
              <button form="doc-form" type="submit" disabled={loading} className="px-4 py-2 bg-[#115e59] text-white rounded-lg hover:bg-[#0f4d4a] font-bold">
                {loading ? "Түр хүлээнэ үү..." : "Хадгалах"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
