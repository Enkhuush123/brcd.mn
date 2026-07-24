"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, BookOpen, FileText, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function PublicationsClient({ documents, articles }: { documents: any[], articles: any[] }) {
  const [activeTab, setActiveTab] = useState<"POLICY" | "REPORT" | "ARTICLE">("POLICY");
  const { language } = useLanguage();

  const policyBriefs = documents.filter(d => d.type === "POLICY");
  const reports = documents.filter(d => d.type === "REPORT");
  
  const dict = {
    MN: {
      title: "Хэвлэл, нийтлэл",
      policy: "Бодлогын зөвлөмж", report: "Судалгааны тайлан", article: "Анализ ба Нийтлэл",
      translation: "Орчуулга", empty: "Мэдээлэл одоогоор ороогүй байна.",
      researcher: "Судлаач", readPdf: "PDF үзэх", readOnline: "Унших"
    },
    EN: {
      title: "Publications",
      policy: "Policy Briefs", report: "Research Reports", article: "Analysis & Articles",
      translation: "Translation", empty: "No information available.",
      researcher: "Researcher", readPdf: "View PDF", readOnline: "Read"
    },
    ZH: {
      title: "出版物",
      policy: "政策简报", report: "研究报告", article: "分析与文章",
      translation: "翻译", empty: "暂无信息",
      researcher: "研究员", readPdf: "查看PDF", readOnline: "阅读"
    }
  };
  const current = dict[language];

  return (
    <div>
      <AnimatedSection className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#002b5c] mb-6">
          {current.title}
        </h1>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#115e59] to-[#002b5c] mx-auto rounded-full"></div>
      </AnimatedSection>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab("POLICY")}
          className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
            activeTab === "POLICY" ? "bg-[#115e59] text-white shadow-lg" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {current.policy}
        </button>
        <button
          onClick={() => setActiveTab("REPORT")}
          className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
            activeTab === "REPORT" ? "bg-[#115e59] text-white shadow-lg" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {current.report}
        </button>
        <button
          onClick={() => setActiveTab("ARTICLE")}
          className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
            activeTab === "ARTICLE" ? "bg-[#115e59] text-white shadow-lg" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {current.article}
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {activeTab === "POLICY" && policyBriefs.map((doc, i) => (
          <DocumentCard key={doc.id} doc={doc} index={i} language={language} dict={current} />
        ))}

        {activeTab === "REPORT" && reports.map((doc, i) => (
          <DocumentCard key={doc.id} doc={doc} index={i} language={language} dict={current} />
        ))}

        {activeTab === "ARTICLE" && articles.map((article, i) => {
          const isTranslation = article.category?.nameMn.includes("Орчуулга") || article.titleMn.includes("Орчуулга");
          const title = language === "EN" && article.titleEn ? article.titleEn : language === "ZH" && article.titleZh ? article.titleZh : article.titleMn;
          const authorName = language === "EN" && article.author?.nameEn ? article.author.nameEn : language === "ZH" && article.author?.nameZh ? article.author.nameZh : article.author?.nameMn;
          const categoryName = language === "EN" && article.category?.nameEn ? article.category.nameEn : language === "ZH" && article.category?.nameZh ? article.category.nameZh : article.category?.nameMn;

          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 border border-slate-100 h-full flex flex-col relative"
            >
              {isTranslation && (
                <div className="absolute top-4 right-4 z-20 bg-[#f59e0b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {current.translation}
                </div>
              )}
              <AnimatedSection delay={i * 0.1} className="flex flex-col h-full">
                <div className="h-48 bg-slate-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#002b5c]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 items-center text-xs font-bold text-[#115e59] uppercase tracking-wider mb-4">
                    <span className="bg-[#115e59]/10 px-2 py-1 rounded text-[#115e59]">
                      {categoryName || current.article}
                    </span>
                    <span className="text-slate-400">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#002b5c] mb-4 group-hover:text-[#115e59] transition-colors leading-snug line-clamp-3">
                    {title}
                  </h3>
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#002b5c]">
                      {(authorName || "C").charAt(0)}
                    </div>
                    <p className="text-sm text-slate-600 font-medium">
                      {authorName || current.researcher}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </Link>
          );
        })}

        {((activeTab === "POLICY" && policyBriefs.length === 0) ||
          (activeTab === "REPORT" && reports.length === 0) ||
          (activeTab === "ARTICLE" && articles.length === 0)) && (
            <div className="col-span-full text-center py-20 text-slate-500">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              {current.empty}
            </div>
        )}
      </div>
    </div>
  );
}

function DocumentCard({ doc, index, language, dict }: { doc: any, index: number, language: string, dict: any }) {
  const title = language === "EN" && doc.titleEn ? doc.titleEn : language === "ZH" && doc.titleZh ? doc.titleZh : doc.titleMn;
  
  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-[#115e59] group-hover:text-white transition-colors duration-500 text-[#115e59]">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-[#002b5c] text-lg mb-2 group-hover:text-[#115e59] transition-colors leading-snug">
              {title}
            </h4>
            <p className="text-sm text-slate-400 font-medium">
              {new Date(doc.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-slate-50 flex justify-end">
          {doc.fileUrl ? (
            <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-[#f59e0b] hover:text-[#d97706] transition-colors">
              {dict.readPdf} <Download className="w-4 h-4" />
            </a>
          ) : (
            <Link href={`/publications/documents/${doc.id}`} className="flex items-center gap-2 text-sm font-bold text-[#115e59] hover:text-[#0f4d4a] transition-colors">
              {dict.readOnline} <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
