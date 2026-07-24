import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, Calendar, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ExpertPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const expertId = resolvedParams.id;

  const expert = await prisma.author.findUnique({
    where: { id: expertId },
  });

  if (!expert) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar alwaysSolid={true} />
        <main className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl text-slate-500 font-bold">Expert not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const articles = await prisma.article.findMany({
    where: { authorId: expertId },
    orderBy: { publishedAt: "desc" },
    include: { category: true, author: true }
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar alwaysSolid={true} />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-32 md:py-40">
        
        <Link href="/" className="inline-flex items-center gap-2 text-[#115e59] font-bold hover:text-[#002b5c] transition-colors mb-12">
          <ArrowLeft className="w-5 h-5" /> Буцах
        </Link>

        {/* Expert Profile Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#115e59] to-[#f59e0b]"></div>
          
          <div className="w-40 h-40 shrink-0 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-md">
            {expert.photoUrl ? (
              <img src={expert.photoUrl} alt={expert.nameMn} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-slate-400">
                {expert.nameMn.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#002b5c] mb-4">
              {expert.nameMn}
            </h1>
            <p className="text-[#115e59] font-bold text-lg mb-6">
              {expert.titleMn}
            </p>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              <p>{expert.bioMn}</p>
            </div>
          </div>
        </div>

        {/* Expert's Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#002b5c] mb-8 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#115e59]" /> Судлаачийн нийтлэлүүд
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.length > 0 ? articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#115e59] bg-[#115e59]/10 px-3 py-1 rounded-full">
                    {article.category?.nameMn || "Анализ"}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#002b5c] mb-4 group-hover:text-[#115e59] transition-colors leading-snug">
                  {article.titleMn}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1">
                  {article.excerptMn}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 text-[#115e59] font-bold text-sm flex items-center justify-between">
                  Унших <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            )) : (
              <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-slate-100 border-dashed">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">Одоогоор нийтлэл оруулаагүй байна.</p>
              </div>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
