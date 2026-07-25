"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { Upload, X, FileText, Bot } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type ArticleFormProps = {
  initialData?: any;
  categories: any[];
  authors: any[];
};

export default function ArticleForm({
  initialData,
  categories,
  authors,
}: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [formData, setFormData] = useState({
    titleMn: initialData?.titleMn || "",
    titleEn: initialData?.titleEn || "",
    titleZh: initialData?.titleZh || "",
    contentMn: initialData?.contentMn || "",
    contentEn: initialData?.contentEn || "",
    contentZh: initialData?.contentZh || "",
    categoryId:
      initialData?.categoryId ||
      (categories.length > 0 ? categories[0].id : ""),
    authorId:
      initialData?.authorId || (authors.length > 0 ? authors[0].id : ""),
    isFeatured: initialData?.isFeatured || false,
    pdfUrl: initialData?.pdfUrl || "",
    pdfUrlEn: initialData?.pdfUrlEn || "",
    pdfUrlZh: initialData?.pdfUrlZh || "",
    imageUrl: initialData?.imageUrl || "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Dialog State
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isAlert: boolean;
  }>({ isOpen: false, title: "", message: "", isAlert: false });

  const closeDialog = () =>
    setDialogConfig((prev) => ({ ...prev, isOpen: false }));

  const showAlert = (message: string) => {
    setDialogConfig({
      isOpen: true,
      title: "Анхааруулга",
      message,
      isAlert: true,
    });
  };

  const handlePdfUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "pdfUrl" | "pdfUrlEn" | "pdfUrlZh",
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.type !== "application/pdf") {
      showAlert("Зөвхөн PDF файл оруулна уу.");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("folder", "pdfs");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, [field]: result.url }));
      } else {
        showAlert("Хуулахад алдаа гарлаа: " + result.error);
      }
    } catch (error) {
      console.error(error);
      showAlert("Сервертэй холбогдоход алдаа гарлаа.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      showAlert("Зөвхөн зураг оруулна уу.");
      return;
    }

    setUploadingImage(true);
    const data = new FormData();
    data.append("file", file);
    data.append("folder", "images");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setFormData({ ...formData, imageUrl: result.url });
      } else {
        showAlert("Хуулахад алдаа гарлаа: " + result.error);
      }
    } catch (error) {
      console.error(error);
      showAlert("Сервертэй холбогдоход алдаа гарлаа.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleTranslate = async () => {
    if (!formData.titleMn && !formData.contentMn) {
      showAlert("Орчуулах Монгол гарчиг болон агуулга байхгүй байна.");
      return;
    }

    setTranslating(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleMn: formData.titleMn,
          contentMn: formData.contentMn,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData((prev) => ({
          ...prev,
          titleEn: data.titleEn || prev.titleEn,
          contentEn: data.contentEn || prev.contentEn,
          titleZh: data.titleZh || prev.titleZh,
          contentZh: data.contentZh || prev.contentZh,
        }));
      } else {
        showAlert("Орчуулахад алдаа гарлаа: " + data.error);
      }
    } catch (error) {
      showAlert("Орчуулгын сервертэй холбогдоход алдаа гарлаа.");
    } finally {
      setTranslating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = initialData
      ? `/api/articles/${initialData.id}`
      : "/api/articles";
    const method = initialData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/articles");
        router.refresh();
      } else {
        const err = await res.json();
        showAlert("Алдаа гарлаа: " + err.error);
      }
    } catch (error) {
      console.error(error);
      showAlert("Сервертэй холбогдоход алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ConfirmDialog
        isOpen={dialogConfig.isOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        isAlert={dialogConfig.isAlert}
        onConfirm={closeDialog}
        onCancel={closeDialog}
      />
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-100"
      >
        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div>
            <h3 className="font-bold text-[#002b5c]">AI Автомат орчуулга</h3>
            <p className="text-sm text-slate-600">
              Монголоор бичсэн мэдээллээ автоматаар Англи, Хятад хэл рүү
              орчуулах
            </p>
          </div>
          <button
            type="button"
            onClick={handleTranslate}
            disabled={translating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Bot className="w-5 h-5" />
            {translating ? "Орчуулж байна..." : "Орчуулах"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Ангилал
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#115e59]"
              required
            >
              <option value="" disabled>
                Сонгоно уу
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameMn}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Судлаач / Зохиогч
            </label>
            <select
              value={formData.authorId}
              onChange={(e) =>
                setFormData({ ...formData, authorId: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#115e59]"
              required
            >
              <option value="" disabled>
                Сонгоно уу
              </option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nameMn}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-[#002b5c] border-b pb-2">
            Монгол хэлээр
          </h3>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Гарчиг (MN)
            </label>
            <input
              type="text"
              required
              value={formData.titleMn}
              onChange={(e) =>
                setFormData({ ...formData, titleMn: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Агуулга (MN)
            </label>
            <div className="h-64 mb-12">
              <ReactQuill
                theme="snow"
                value={formData.contentMn}
                onChange={(val) => setFormData({ ...formData, contentMn: val })}
                className="h-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t">
          <h3 className="text-lg font-bold text-[#002b5c] border-b pb-2">
            Англи хэлээр (EN)
          </h3>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Гарчиг (EN)
            </label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) =>
                setFormData({ ...formData, titleEn: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Агуулга (EN)
            </label>
            <div className="h-64 mb-12">
              <ReactQuill
                theme="snow"
                value={formData.contentEn}
                onChange={(val) => setFormData({ ...formData, contentEn: val })}
                className="h-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t">
          <h3 className="text-lg font-bold text-[#002b5c] border-b pb-2">
            Хятад хэлээр (ZH)
          </h3>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Гарчиг (ZH)
            </label>
            <input
              type="text"
              value={formData.titleZh}
              onChange={(e) =>
                setFormData({ ...formData, titleZh: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Агуулга (ZH)
            </label>
            <div className="h-64 mb-12">
              <ReactQuill
                theme="snow"
                value={formData.contentZh}
                onChange={(val) => setFormData({ ...formData, contentZh: val })}
                className="h-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t">
          <h3 className="text-lg font-bold text-[#002b5c] border-b pb-2">
            PDF Файлууд (Хэл тус бүрээр)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* MN PDF */}
            <div className="border p-4 rounded-lg bg-slate-50">
              <p className="font-bold mb-2 text-sm">Монгол PDF</p>
              {formData.pdfUrl ? (
                <div className="flex items-center gap-2">
                  <a
                    href={formData.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate w-32"
                  >
                    {formData.pdfUrl.split("/").pop()}
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, pdfUrl: "" })}
                    className="text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="application/pdf"
                  className="text-xs"
                  onChange={(e) => handlePdfUpload(e, "pdfUrl")}
                />
              )}
            </div>

            {/* EN PDF */}
            <div className="border p-4 rounded-lg bg-slate-50">
              <p className="font-bold mb-2 text-sm">Англи PDF</p>
              {formData.pdfUrlEn ? (
                <div className="flex items-center gap-2">
                  <a
                    href={formData.pdfUrlEn}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate w-32"
                  >
                    {formData.pdfUrlEn.split("/").pop()}
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, pdfUrlEn: "" })}
                    className="text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="application/pdf"
                  className="text-xs"
                  onChange={(e) => handlePdfUpload(e, "pdfUrlEn")}
                />
              )}
            </div>

            {/* ZH PDF */}
            <div className="border p-4 rounded-lg bg-slate-50">
              <p className="font-bold mb-2 text-sm">Хятад PDF</p>
              {formData.pdfUrlZh ? (
                <div className="flex items-center gap-2">
                  <a
                    href={formData.pdfUrlZh}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate w-32"
                  >
                    {formData.pdfUrlZh.split("/").pop()}
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, pdfUrlZh: "" })}
                    className="text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="application/pdf"
                  className="text-xs"
                  onChange={(e) => handlePdfUpload(e, "pdfUrlZh")}
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t">
          <h3 className="text-lg font-bold text-[#002b5c] border-b pb-2">
            Зураг оруулах (Нүүр зураг)
          </h3>

          {formData.imageUrl ? (
            <div className="relative inline-block border rounded-lg p-2 bg-slate-50">
              <img
                src={formData.imageUrl}
                alt="Cover"
                className="h-32 object-contain rounded"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, imageUrl: "" })}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-slate-400" />
                  <p className="mb-2 text-sm text-slate-500">
                    <span className="font-semibold">Дарж сонгох</span> эсвэл
                    зургаа чирж оруулна уу
                  </p>
                  <p className="text-xs text-slate-500">PNG, JPG эсвэл WEBP</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                />
              </label>
            </div>
          )}
          {uploadingImage && (
            <p className="text-sm text-teal-600 font-medium">
              Зураг хуулж байна...
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-6 border-t">
          <input
            type="checkbox"
            id="featured"
            checked={formData.isFeatured}
            onChange={(e) =>
              setFormData({ ...formData, isFeatured: e.target.checked })
            }
            className="w-5 h-5"
          />
          <label
            htmlFor="featured"
            className="text-sm font-bold text-slate-700"
          >
            Онцлох нийтлэл мөн эсэх (Нүүр хуудсанд гарах)
          </label>
        </div>

        <div className="pt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 font-bold"
          >
            Цуцлах
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#115e59] text-white rounded-lg hover:bg-[#0f4d4a] font-bold"
          >
            {loading ? "Хадгалж байна..." : "Хадгалах"}
          </button>
        </div>
      </form>
    </>
  );
}
