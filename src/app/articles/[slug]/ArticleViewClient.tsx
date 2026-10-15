"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SecurePdfViewerWrapper from "@/components/SecurePdfViewerWrapper";

export default function ArticleViewClient({ article }: { article: any }) {
  const { language } = useLanguage();

  const title = language === "ZH" && article.titleZh ? article.titleZh : article.titleMn;
  const content = language === "ZH" && article.contentZh ? article.contentZh : article.contentMn;
  const authorName = language === "ZH" && article.author?.nameZh ? article.author.nameZh : article.author?.nameMn;
  const authorTitle = language === "ZH" && article.author?.titleZh ? article.author.titleZh : article.author?.titleMn;
  const categoryName = language === "ZH" && article.category?.nameZh ? article.category.nameZh : article.category?.nameMn;

  const dict = {
    MN: {
      back: "Нүүр хуудас руу буцах",
      authorDefault: "Судлаач",
      pdfTitle: "PDF Хавсралт",
      pdfNotice: "Энэхүү баримт бичгийг зөвхөн онлайнаар унших зориулалттай.",
    },
    ZH: {
      back: "返回首页",
      authorDefault: "研究员",
      pdfTitle: "PDF 附件",
      pdfNotice: "本文档仅供在线阅读。",
    },
  };

  const current = dict[language];
  const activePdf = language === "ZH" && article.pdfUrlZh ? article.pdfUrlZh : article.pdfUrl;

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-24 md:py-36 overflow-hidden">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-[#002b5c] transition-colors font-medium mb-8 md:mb-10 group text-sm md:text-base"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {current.back}
      </Link>

      <article className="bg-white p-6 sm:p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full overflow-hidden">
        <header className="mb-8 md:mb-12">
          <div className="flex gap-3 items-center text-xs font-bold text-[#115e59] uppercase tracking-widest mb-4 md:mb-6">
            <span className="bg-[#115e59]/10 px-3.5 py-1.5 rounded-full">
              {categoryName || "Нийтлэл"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#002b5c] leading-tight mb-6">
            {title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-xs md:text-sm text-slate-500 font-medium border-y border-slate-100 py-4 md:py-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#002b5c] shrink-0">
                {(authorName || "С").charAt(0)}
              </div>
              <span>
                {authorName || current.authorDefault}
                {authorTitle && (
                  <span className="text-slate-400 font-normal ml-1">
                    ({authorTitle})
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#115e59] shrink-0" />
              {new Date(article.publishedAt).toLocaleDateString(
                language === "ZH" ? "zh-CN" : "mn-MN",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </div>
          </div>
        </header>

        {/* Content with clean formatting */}
        <div
          className="prose prose-slate prose-base md:prose-lg max-w-none w-full text-slate-700 font-light mb-16
                     leading-[1.8] prose-p:leading-[1.8] prose-li:leading-[1.8]
                     prose-headings:font-serif prose-headings:text-[#002b5c] prose-headings:font-bold
                     prose-a:text-[#115e59] prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-2xl prose-img:shadow-sm prose-img:w-full prose-img:h-auto
                     prose-table:block prose-table:overflow-x-auto prose-table:w-full
                     prose-td:px-4 prose-td:py-2 prose-th:px-4 prose-th:py-2 prose-td:border prose-th:border"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* PDF Viewer */}
        {activePdf && (
          <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-slate-100 w-full overflow-hidden">
            <div className="mb-6 md:mb-8 text-center px-2">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#002b5c] mb-2">
                {current.pdfTitle}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-medium">
                {current.pdfNotice}
              </p>
            </div>
            <div className="bg-slate-50 p-2 sm:p-4 md:p-6 rounded-2xl border border-slate-200 overflow-hidden w-full">
              <SecurePdfViewerWrapper url={activePdf} />
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
