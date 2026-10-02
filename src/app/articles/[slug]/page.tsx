import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SecurePdfViewerWrapper from "@/components/SecurePdfViewerWrapper";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      author: true,
      category: true,
    }
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#115e59] selection:text-white flex flex-col">
      <Navbar alwaysSolid={true} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 py-24 md:py-40 overflow-hidden">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#002b5c] transition-colors font-medium mb-8 md:mb-10 group text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Нүүр хуудас руу буцах
        </Link>
        
        <article className="bg-white p-4 sm:p-8 md:p-16 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full overflow-hidden">
          <header className="mb-8 md:mb-12">
            <div className="flex gap-3 items-center text-[10px] md:text-xs font-bold text-[#115e59] uppercase tracking-widest mb-4 md:mb-6">
              <span className="bg-[#115e59]/10 px-3 py-1.5 rounded-full">
                {article.category?.nameMn}
              </span>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-[#002b5c] leading-[1.35] md:leading-[1.3] mb-5 md:mb-6 text-wrap-balance">
              {article.titleMn}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-xs md:text-sm text-slate-500 font-medium border-y border-slate-100 py-4 md:py-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                  {(article.author?.nameMn || "A").charAt(0)}
                </div>
                <span>
                  {article.author?.nameMn}
                  {article.author?.titleMn && <span className="text-slate-400 font-normal ml-1">({article.author.titleMn})</span>}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                {new Date(article.publishedAt).toLocaleDateString('mn-MN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </header>

          <div 
            className="prose prose-slate prose-base md:prose-lg max-w-none w-full break-normal text-slate-700 font-light mb-16
                       leading-[1.8] prose-p:leading-[1.8] prose-li:leading-[1.8]
                       prose-headings:font-serif prose-headings:text-[#002b5c] prose-headings:font-bold prose-headings:text-wrap-balance
                       prose-a:text-[#115e59] prose-a:no-underline hover:prose-a:underline
                       prose-img:rounded-xl md:prose-img:rounded-2xl prose-img:shadow-sm prose-img:w-full prose-img:h-auto
                       prose-table:block prose-table:overflow-x-auto prose-table:w-full
                       prose-td:px-4 prose-td:py-2 prose-th:px-4 prose-th:py-2 prose-td:border prose-th:border
                       prose-video:w-full prose-iframe:w-full"
            dangerouslySetInnerHTML={{ __html: article.contentMn }} 
          />

          {article.pdfUrl && (
            <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-slate-100 w-full overflow-hidden">
              <div className="mb-6 md:mb-8 text-center px-2">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#002b5c] mb-2 md:mb-3">PDF Хавсралт (Монгол)</h3>
                <p className="text-xs md:text-sm text-slate-500 font-medium">Энэхүү баримт бичгийг татаж авах боломжгүй бөгөөд зөвхөн онлайнаар унших зориулалттай.</p>
              </div>
              <div className="bg-slate-50 p-2 sm:p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden w-full">
                <SecurePdfViewerWrapper url={article.pdfUrl} />
              </div>
            </div>
          )}

          {article.pdfUrlEn && (
            <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-slate-100 w-full overflow-hidden">
              <div className="mb-6 md:mb-8 text-center px-2">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#002b5c] mb-2 md:mb-3">PDF Attachment (English)</h3>
                <p className="text-xs md:text-sm text-slate-500 font-medium">This document cannot be downloaded and is for online reading only.</p>
              </div>
              <div className="bg-slate-50 p-2 sm:p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden w-full">
                <SecurePdfViewerWrapper url={article.pdfUrlEn} />
              </div>
            </div>
          )}

          {article.pdfUrlZh && (
            <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-slate-100 w-full overflow-hidden">
              <div className="mb-6 md:mb-8 text-center px-2">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#002b5c] mb-2 md:mb-3">PDF 附件 (中文)</h3>
                <p className="text-xs md:text-sm text-slate-500 font-medium">本文档无法下载，仅供在线阅读。</p>
              </div>
              <div className="bg-slate-50 p-2 sm:p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden w-full">
                <SecurePdfViewerWrapper url={article.pdfUrlZh} />
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
