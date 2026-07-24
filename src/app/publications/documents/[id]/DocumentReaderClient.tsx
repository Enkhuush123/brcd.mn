"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import "react-quill-new/dist/quill.bubble.css"; // For reading mode styling
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function DocumentReaderClient({ document }: { document: any }) {
  const { language } = useLanguage();

  const title = language === "EN" && document.titleEn ? document.titleEn : 
                language === "ZH" && document.titleZh ? document.titleZh : document.titleMn;
                
  const content = language === "EN" && document.contentEn ? document.contentEn : 
                  language === "ZH" && document.contentZh ? document.contentZh : document.contentMn;

  const backText = language === "EN" ? "Back to Publications" : 
                   language === "ZH" ? "返回出版物" : "Буцах";

  return (
    <div className="max-w-4xl mx-auto px-6">
      <Link href="/publications" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#115e59] transition-colors mb-10 font-medium">
        <ArrowLeft className="w-4 h-4" />
        {backText}
      </Link>

      <AnimatedSection className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
        <div className="flex gap-2 items-center text-sm font-bold text-[#f59e0b] uppercase tracking-wider mb-6">
          <BookOpen className="w-4 h-4" />
          <span>{document.type === "POLICY" ? "Бодлогын зөвлөмж" : document.type === "REPORT" ? "Судалгааны тайлан" : document.type}</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#002b5c] mb-8 leading-tight">
          {title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-12 pb-8 border-b border-slate-100">
          <span>{new Date(document.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Content */}
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#002b5c] prose-a:text-[#115e59]">
          <ReactQuill 
            value={content || ""} 
            readOnly={true} 
            theme="bubble" 
          />
        </div>
      </AnimatedSection>
    </div>
  );
}
