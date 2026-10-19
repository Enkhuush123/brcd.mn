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

function cleanPastedText(str: string): string {
  if (!str) return "";
  return str
    .replace(/&nbsp;/gi, " ")
    .replace(/[\u00A0]/g, " ")
    .replace(/[\u200B\u00AD\uFEFF]/g, "");
}

export default function ArticleForm({
  initialData,
  categories,
  authors,
}: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const initialCategorySlugs: string[] = (() => {
    if (Array.isArray(initialData?.categorySlugs) && initialData.categorySlugs.length > 0) {
      return initialData.categorySlugs;
    }
    if (initialData?.categoryId) {
      const match = categories.find((c) => c.id === initialData.categoryId);
      if (match?.slug) return [match.slug];
    }
    return [];
  })();

  const [categorySlugs, setCategorySlugs] = useState<string[]>(initialCategorySlugs);

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
    isFeaturedNews: initialData?.isFeaturedNews || false,
    pdfUrl: initialData?.pdfUrl || "",
    pdfUrlEn: initialData?.pdfUrlEn || "",
    pdfUrlZh: initialData?.pdfUrlZh || "",
    imageUrl: initialData?.imageUrl || "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const toggleCategorySlug = (slug: string) => {
    setCategorySlugs((prev) => {
      const exists = prev.includes(slug);
      const next = exists ? prev.filter((s) => s !== slug) : [...prev, slug];

      // If we added a category and formData.categoryId is not set or not matching
      if (!exists && (!formData.categoryId || !next.some(s => categories.find(c => c.id === formData.categoryId)?.slug === s))) {
        const cat = categories.find((c) => c.slug === slug);
        if (cat) {
          setFormData((f) => ({ ...f, categoryId: cat.id }));
        }
      }
      return next;
    });
  };

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
    field: "pdfUrl" | "pdfUrlZh",
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
        setFormData((prev) => ({ ...prev, imageUrl: result.url }));
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

    let primaryId = formData.categoryId;
    if (!primaryId && categorySlugs.length > 0) {
      const match = categories.find((c) => c.slug === categorySlugs[0]);
      if (match) primaryId = match.id;
    }
    if (!primaryId && categories.length > 0) {
      primaryId = categories[0].id;
    }

    if (!primaryId) {
      showAlert("Ангилал сонгоно уу.");
      return;
    }

    const finalSlugs = Array.from(new Set([
      ...categorySlugs,
      ...(primaryId ? [categories.find(c => c.id === primaryId)?.slug].filter(Boolean) as string[] : [])
    ]));

    setLoading(true);

    const url = initialData
      ? `/api/articles/${initialData.id}`
      : "/api/articles";
    const method = initialData ? "PUT" : "POST";

    const payload = {
      ...formData,
      categoryId: primaryId,
      categorySlugs: finalSlugs,
      contentMn: cleanPastedText(formData.contentMn),
      contentZh: cleanPastedText(formData.contentZh),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
            <h3 className="font-bold text-[#002b5c]">AI Автомат орчуулга (Монгол ➔ Хятад)</h3>
            <p className="text-sm text-slate-600">
              Монголоор бичсэн мэдээллээ автоматаар Хятад хэл рүү орчуулах
            </p>
          </div>
          <button
            type="button"
            onClick={handleTranslate}
            disabled={translating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Bot className="w-5 h-5" />
            {translating ? "Орчуулж байна..." : "Хятад хэл рүү орчуулах"}
          </button>
        </div>

        {/* Зохиогч ба Үндсэн ангилал */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Үндсэн ангилал (Primary Category)
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => {
                const newCatId = e.target.value;
                setFormData({ ...formData, categoryId: newCatId });
                const matched = categories.find(c => c.id === newCatId);
                if (matched?.slug && !categorySlugs.includes(matched.slug)) {
                  setCategorySlugs(prev => [...prev, matched.slug]);
                }
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#115e59]"
              required
            >
              <option value="" disabled>
                Сонгоно уу
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameMn} ({c.nameZh})
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">
              Нийтлэлийн үндсэн харъяалагдах ангилал
            </p>
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
            <p className="text-xs text-slate-500 mt-1">
              Нийтлэлийг бичсэн шинжээч эсвэл судлаач
            </p>
          </div>
        </div>

        {/* Олон ангилал ба Нүүр хуудсанд харуулах тохиргоо (Multi-Taxonomy Selection) */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-bold text-[#002b5c] text-base uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#115e59]"></span>
              Ангилал ба Байршил сонгох (Олон сонголт хийх боломжтой)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Энэхүү нийтлэл сайт дээр аль аль дэд бүлэг, цэс болон нүүр хуудасны блокуудад зэрэг харагдахыг чагтална уу.
            </p>
          </div>

          {/* 1. Бодлогын тойм (3 дэд хэсэг) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-[#115e59] uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#115e59]"></span>
              1. Бодлогын тойм (3 дэд бүлэг)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { slug: "mongolia-economy-investment", nameMn: "Монголын эдийн засаг, хөрөнгө оруулалт", nameZh: "蒙古经济与投资" },
                { slug: "china-macro-policy", nameMn: "Хятадын макро эдийн засаг, бодлого", nameZh: "中国宏观经济与政策" },
                { slug: "bilateral-regional-integration", nameMn: "Хоёр талт болон Бүс нутгийн интеграци", nameZh: "双边与区域经济一体化" },
              ].map((item) => {
                const isChecked = categorySlugs.includes(item.slug);
                return (
                  <label
                    key={item.slug}
                    onClick={() => toggleCategorySlug(item.slug)}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isChecked
                        ? "bg-[#115e59]/10 border-[#115e59] text-[#115e59]"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-4 h-4 text-[#115e59] rounded mt-0.5 pointer-events-none"
                    />
                    <div className="text-xs">
                      <span className="font-bold block leading-snug">{item.nameMn}</span>
                      <span className="text-slate-400 block text-[11px] mt-0.5">{item.nameZh}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 2. Мэдээ, Нийтлэл (3 дэд хэсэг) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              2. Мэдээ, Нийтлэл (3 дэд бүлэг)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { slug: "analysis", nameMn: "Аналитик нийтлэл", nameZh: "深度分析" },
                { slug: "news", nameMn: "Онцлох мэдээ, тойм", nameZh: "热点快讯" },
                { slug: "translation", nameMn: "Орчуулга, эх сурвалж", nameZh: "编译专栏" },
              ].map((item) => {
                const isChecked = categorySlugs.includes(item.slug);
                return (
                  <label
                    key={item.slug}
                    onClick={() => toggleCategorySlug(item.slug)}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isChecked
                        ? "bg-blue-50 border-blue-600 text-blue-900"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-4 h-4 text-blue-600 rounded mt-0.5 pointer-events-none"
                    />
                    <div className="text-xs">
                      <span className="font-bold block leading-snug">{item.nameMn}</span>
                      <span className="text-slate-400 block text-[11px] mt-0.5">{item.nameZh}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 3. Судалгааны чиглэл (3 дэд хэсэг) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              3. Судалгааны чиглэл (3 дэд бүлэг)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { slug: "eurasian-connectivity", nameMn: "Евразийн холболт ба Бүс ба Зам", nameZh: "欧亚联通与一带一路" },
                { slug: "regional-geo-economics", nameMn: "Бүс нутгийн гео-эдийн засаг ба Хөрөнгө оруулалт", nameZh: "区域地缘经济与投资合作" },
                { slug: "green-digital-transition", nameMn: "Ногоон эдийн засаг ба Дижитал шилжилт", nameZh: "绿色转型与数字经济" },
              ].map((item) => {
                const isChecked = categorySlugs.includes(item.slug);
                return (
                  <label
                    key={item.slug}
                    onClick={() => toggleCategorySlug(item.slug)}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isChecked
                        ? "bg-emerald-50 border-emerald-600 text-emerald-900"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-4 h-4 text-emerald-600 rounded mt-0.5 pointer-events-none"
                    />
                    <div className="text-xs">
                      <span className="font-bold block leading-snug">{item.nameMn}</span>
                      <span className="text-slate-400 block text-[11px] mt-0.5">{item.nameZh}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 4. Төвийн мэдээ / Үйл ажиллагаа */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              4. Төвийн үйл ажиллагаа / Арга хэмжээ
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { slug: "events", nameMn: "Төвийн мэдээ / Арга хэмжээ", nameZh: "中心动态 / 活动" },
              ].map((item) => {
                const isChecked = categorySlugs.includes(item.slug);
                return (
                  <label
                    key={item.slug}
                    onClick={() => toggleCategorySlug(item.slug)}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isChecked
                        ? "bg-purple-50 border-purple-600 text-purple-900"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-4 h-4 text-purple-600 rounded mt-0.5 pointer-events-none"
                    />
                    <div className="text-xs">
                      <span className="font-bold block leading-snug">{item.nameMn}</span>
                      <span className="text-slate-400 block text-[11px] mt-0.5">{item.nameZh}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 5. Нүүр хуудасны онцлох байршил */}
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 shadow-xs">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
              5. Нүүр хуудсанд онцгойлон харуулах (Highlights)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-start gap-3 p-3.5 bg-white rounded-lg border border-amber-200 hover:border-[#115e59] cursor-pointer transition-colors shadow-xs">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="w-5 h-5 text-[#115e59] rounded mt-0.5"
                />
                <div>
                  <span className="font-bold text-sm text-[#002b5c] block">
                    Онцлох анализ (Блок 1)
                  </span>
                  <span className="text-xs text-slate-500">
                    Нүүр хуудасны дээд талд "Онцлох анализ" хэсэгт томоор онцлон харуулах
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-white rounded-lg border border-amber-200 hover:border-[#f59e0b] cursor-pointer transition-colors shadow-xs">
                <input
                  type="checkbox"
                  checked={formData.isFeaturedNews}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeaturedNews: e.target.checked })
                  }
                  className="w-5 h-5 text-[#f59e0b] rounded mt-0.5"
                />
                <div>
                  <span className="font-bold text-sm text-[#002b5c] block">
                    Төвийн онцлох мэдээ (Блок 4)
                  </span>
                  <span className="text-xs text-slate-500">
                    Нүүр хуудасны "Төвийн мэдээ" блокт онцлон харуулах
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* 6. Бусад нэмэлт ангилал (DB дээрх бусад ангиллууд) */}
          {categories.filter(c => ![
            "mongolia-economy-investment", "china-macro-policy", "bilateral-regional-integration",
            "analysis", "news", "translation",
            "eurasian-connectivity", "regional-geo-economics", "green-digital-transition",
            "events"
          ].includes(c.slug)).length > 0 && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                6. Бусад нэмэлт ангилал
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {categories.filter(c => ![
                  "mongolia-economy-investment", "china-macro-policy", "bilateral-regional-integration",
                  "analysis", "news", "translation",
                  "eurasian-connectivity", "regional-geo-economics", "green-digital-transition",
                  "events"
                ].includes(c.slug)).map((item) => {
                  const isChecked = categorySlugs.includes(item.slug);
                  return (
                    <label
                      key={item.slug}
                      onClick={() => toggleCategorySlug(item.slug)}
                      className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        isChecked
                          ? "bg-slate-100 border-[#115e59] text-[#002b5c]"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 text-[#115e59] rounded mt-0.5 pointer-events-none"
                      />
                      <span className="text-xs font-medium">{item.nameMn}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Монгол хэлээр */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-[#002b5c] border-b pb-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#115e59]"></span>
            Монгол хэлээр (Үндсэн)
          </h3>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Гарчиг (Монгол)
            </label>
            <input
              type="text"
              required
              value={formData.titleMn}
              onChange={(e) =>
                setFormData({ ...formData, titleMn: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#115e59]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Агуулга (Монгол)
            </label>
            <div className="h-72 mb-12">
              <ReactQuill
                theme="snow"
                value={formData.contentMn}
                onChange={(val) => setFormData({ ...formData, contentMn: val })}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Хятад хэлээр */}
        <div className="space-y-6 pt-4 border-t">
          <h3 className="text-lg font-bold text-[#002b5c] border-b pb-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
            Хятад хэлээр (ZH)
          </h3>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Гарчиг (Хятад)
            </label>
            <input
              type="text"
              value={formData.titleZh}
              onChange={(e) =>
                setFormData({ ...formData, titleZh: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#115e59]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Агуулга (Хятад)
            </label>
            <div className="h-72 mb-12">
              <ReactQuill
                theme="snow"
                value={formData.contentZh}
                onChange={(val) => setFormData({ ...formData, contentZh: val })}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* PDF Файлууд */}
        <div className="space-y-6 pt-4 border-t">
          <h3 className="text-lg font-bold text-[#002b5c] border-b pb-2">
            PDF Хавсралт (Цахимаар унших)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* MN PDF */}
            <div className="border p-4 rounded-lg bg-slate-50">
              <p className="font-bold mb-2 text-sm">Монгол хэл дээрх PDF</p>
              {formData.pdfUrl ? (
                <div className="flex items-center gap-2">
                  <a
                    href={formData.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate w-48"
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

            {/* ZH PDF */}
            <div className="border p-4 rounded-lg bg-slate-50">
              <p className="font-bold mb-2 text-sm">Хятад хэл дээрх PDF</p>
              {formData.pdfUrlZh ? (
                <div className="flex items-center gap-2">
                  <a
                    href={formData.pdfUrlZh}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate w-48"
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

        {/* Нүүр зураг */}
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

        <div className="pt-6 flex justify-end gap-4 border-t">
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
