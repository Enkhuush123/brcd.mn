"use client";

import Link from "next/link";
import { BookOpen, User } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function CategoryFeedClient({ articles, titleDict }: { articles: any[], titleDict: { MN: string, EN: string, ZH: string } }) {
  const { language } = useLanguage();
  
  const currentTitle = titleDict[language];

  const dict = {
    MN: { empty: "Мэдээлэл одоогоор ороогүй байна.", researcher: "Судлаач" },
    EN: { empty: "No content available yet.", researcher: "Researcher" },
    ZH: { empty: "暂无内容。", researcher: "研究员" }
  };
  const current = dict[language];

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-32">
      <AnimatedSection className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#002b5c] mb-6">
          {currentTitle}
        </h1>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#115e59] to-[#002b5c] mx-auto rounded-full"></div>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {articles.map((article, i) => {
          const title = language === "EN" && article.titleEn ? article.titleEn : language === "ZH" && article.titleZh ? article.titleZh : article.titleMn;
          const authorName = language === "EN" && article.author?.nameEn ? article.author.nameEn : language === "ZH" && article.author?.nameZh ? article.author.nameZh : article.author?.nameMn;
          const categoryName = language === "EN" && article.category?.nameEn ? article.category.nameEn : language === "ZH" && article.category?.nameZh ? article.category.nameZh : article.category?.nameMn;

          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 border border-slate-100 h-full flex flex-col"
            >
              <AnimatedSection delay={i * 0.1} className="flex flex-col h-full">
                <div className="h-48 bg-slate-200 overflow-hidden relative">
                  {article.imageUrl ? (
                    <img src={article.imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                  )}
                  <div className="absolute inset-0 bg-[#002b5c]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 items-center text-xs font-bold text-[#115e59] uppercase tracking-wider mb-4">
                    <span className="bg-[#115e59]/10 px-2 py-1 rounded text-[#115e59]">
                      {categoryName}
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
                      {authorName ? authorName.charAt(0) : <User className="w-4 h-4" />}
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

        {articles.length === 0 && (
          <div className="col-span-full text-center py-20 text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            {current.empty}
          </div>
        )}
      </div>
    </div>
  );
}
