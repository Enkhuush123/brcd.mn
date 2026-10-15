import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryFeedClient from "@/components/CategoryFeedClient";
import Link from "next/link";
import { ArrowRight, BookOpen, TrendingUp, Globe2, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PolicyHubPage() {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { category: { slug: "policy-brief" } },
        { category: { slug: "mongolia-economy-investment" } },
        { category: { slug: "china-macro-policy" } },
        { category: { slug: "bilateral-regional-integration" } },
        { category: { slug: "analysis" } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true },
  });

  const titleDict = {
    MN: "Бодлогын тойм",
    ZH: "政策述评",
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-[#001730]">
        <Navbar alwaysSolid={true} />
      </div>

      {/* Subcategory Navigation Cards */}
      <section className="bg-white border-b border-slate-200 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#002b5c] mb-4">
              Бодлогын тойм / 政策述评
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              Бүс нутгийн эдийн засаг, хөрөнгө оруулалт, бодлогын судалгааны тоймууд
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/policy-hub/mongolia-economy-investment"
              className="group p-6 bg-slate-50 hover:bg-[#115e59] rounded-2xl border border-slate-200 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#115e59] group-hover:text-[#f59e0b] shadow-sm mb-4 transition-colors">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#002b5c] group-hover:text-white mb-2 transition-colors">
                  Монголын эдийн засаг, хөрөнгө оруулалт
                </h3>
                <p className="text-xs text-slate-500 group-hover:text-white/80 transition-colors">
                  蒙古经济与投资
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#115e59] group-hover:text-white transition-colors">
                <span>Үзэх</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/policy-hub/china-macro-policy"
              className="group p-6 bg-slate-50 hover:bg-[#115e59] rounded-2xl border border-slate-200 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#115e59] group-hover:text-[#f59e0b] shadow-sm mb-4 transition-colors">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#002b5c] group-hover:text-white mb-2 transition-colors">
                  Хятадын макро эдийн засаг, бодлого
                </h3>
                <p className="text-xs text-slate-500 group-hover:text-white/80 transition-colors">
                  中国宏观经济与政策
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#115e59] group-hover:text-white transition-colors">
                <span>Үзэх</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/policy-hub/bilateral-regional-integration"
              className="group p-6 bg-slate-50 hover:bg-[#115e59] rounded-2xl border border-slate-200 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#115e59] group-hover:text-[#f59e0b] shadow-sm mb-4 transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#002b5c] group-hover:text-white mb-2 transition-colors">
                  Хоёр талт болон Бүс нутгийн интеграци
                </h3>
                <p className="text-xs text-slate-500 group-hover:text-white/80 transition-colors">
                  双边与区域一体化
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#115e59] group-hover:text-white transition-colors">
                <span>Үзэх</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Feed list */}
      <CategoryFeedClient articles={articles} titleDict={titleDict} />
      <Footer />
    </div>
  );
}
