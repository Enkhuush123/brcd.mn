"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Globe2, ShieldCheck, BookOpen, User, Calendar } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function PolicyHubClient({ articles }: { articles: any[] }) {
  const { language } = useLanguage();

  const dict = {
    MN: {
      title: "Бодлогын тойм",
      desc: "Бүс нутгийн эдийн засаг, хөрөнгө оруулалт, бодлогын судалгааны тоймууд",
      sub1: "Монголын эдийн засаг, хөрөнгө оруулалт",
      sub2: "Хятадын макро эдийн засаг, бодлого",
      sub3: "Хоёр талт болон Бүс нутгийн интеграци",
      viewBtn: "Үзэх",
      feedTitle: "Сүүлийн үеийн тойм, нийтлэлүүд",
      empty: "Мэдээлэл одоогоор ороогүй байна.",
      researcher: "Судлаач",
    },
    ZH: {
      title: "政策述评",
      desc: "区域经济、外商投资与宏观政策研究述评",
      sub1: "蒙古经济与投资",
      sub2: "中国宏观经济与政策",
      sub3: "双边与区域一体化",
      viewBtn: "查看",
      feedTitle: "最新述评与研究文章",
      empty: "暂无内容。",
      researcher: "研究员",
    },
  };

  const current = dict[language];

  return (
    <div className="flex-1 w-full pb-20">
      {/* Subcategory Navigation Cards */}
      <section className="bg-white border-b border-slate-200 pt-32 pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#002b5c] mb-4">
              {current.title}
            </h1>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#115e59] to-[#002b5c] mx-auto rounded-full mb-4"></div>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              {current.desc}
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
                  {current.sub1}
                </h3>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#115e59] group-hover:text-white transition-colors">
                <span>{current.viewBtn}</span> <ArrowRight className="w-3.5 h-3.5" />
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
                  {current.sub2}
                </h3>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#115e59] group-hover:text-white transition-colors">
                <span>{current.viewBtn}</span> <ArrowRight className="w-3.5 h-3.5" />
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
                  {current.sub3}
                </h3>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#115e59] group-hover:text-white transition-colors">
                <span>{current.viewBtn}</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Feed list */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#002b5c] mb-3">
            {current.feedTitle}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#115e59] to-[#002b5c] mx-auto rounded-full"></div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, i) => {
            const title = language === "ZH" && article.titleZh ? article.titleZh : article.titleMn;
            const authorName = language === "ZH" && article.author?.nameZh ? article.author.nameZh : article.author?.nameMn;
            const categoryName = language === "ZH" && article.category?.nameZh ? article.category.nameZh : article.category?.nameMn;

            return (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 border border-slate-100 h-full flex flex-col"
              >
                <AnimatedSection delay={i * 0.08} className="flex flex-col h-full">
                  <div className="h-48 bg-slate-200 overflow-hidden relative">
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                    )}
                    <div className="absolute inset-0 bg-[#002b5c]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex gap-2 items-center text-xs font-bold text-[#115e59] uppercase tracking-wider mb-4">
                      <span className="bg-[#115e59]/10 px-2 py-1 rounded text-[#115e59]">
                        {categoryName || current.title}
                      </span>
                      <span className="text-slate-400">
                        {new Date(article.publishedAt).toISOString().split("T")[0]}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#002b5c] mb-4 group-hover:text-[#115e59] transition-colors leading-snug line-clamp-3">
                      {title}
                    </h3>

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#002b5c]">
                          {authorName ? authorName.charAt(0) : <User className="w-4 h-4" />}
                        </div>
                        <p className="text-sm text-slate-600 font-medium">
                          {authorName || current.researcher}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#115e59] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        {current.viewBtn} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              </Link>
            );
          })}

          {articles.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              {current.empty}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
