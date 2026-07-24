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

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-32 md:py-40">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#002b5c] transition-colors font-medium mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Нүүр хуудас руу буцах
        </Link>
        
        <article className="bg-white p-6 sm:p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <header className="mb-10 md:mb-12">
            <div className="flex gap-3 items-center text-xs md:text-sm font-bold text-[#115e59] uppercase tracking-widest mb-6">
              <span className="bg-[#115e59]/10 px-3 py-1.5 rounded-full">
                {article.category?.nameMn}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#002b5c] leading-[1.15] mb-8">
              {article.titleMn}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium border-y border-slate-100 py-6">
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
                <Calendar className="w-4 h-4 text-slate-400" />
                {new Date(article.publishedAt).toLocaleDateString('mn-MN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </header>

          <div 
            className="prose prose-slate prose-lg sm:prose-xl max-w-none text-slate-700 leading-relaxed font-light mb-16
                       prose-headings:font-serif prose-headings:text-[#002b5c] prose-headings:font-bold
                       prose-a:text-[#115e59] prose-a:no-underline hover:prose-a:underline
                       prose-img:rounded-2xl prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: article.contentMn }} 
          />

          {article.pdfUrl && (
            <div className="mt-16 pt-12 border-t border-slate-100">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-serif font-bold text-[#002b5c] mb-3">PDF Хавсралт</h3>
                <p className="text-sm text-slate-500 font-medium">Энэхүү баримт бичгийг татаж авах боломжгүй бөгөөд зөвхөн онлайнаар унших зориулалттай.</p>
              </div>
              <div className="bg-slate-50 p-2 md:p-6 rounded-2xl border border-slate-200">
                <SecurePdfViewerWrapper url={article.pdfUrl} />
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
