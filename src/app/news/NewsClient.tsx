"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsClient({ articles }: { articles: any[] }) {
  const [activeTab, setActiveTab] = useState<"NEWS" | "EVENTS">("NEWS");
  const { language } = useLanguage();

  const dict = {
    MN: {
      title: "Мэдээ & Арга хэмжээ",
      tabNews: "Төвийн мэдээ",
      tabEvents: "Хурал, хэлэлцүүлэг",
      empty: "Мэдээлэл одоогоор ороогүй байна.",
      authorDefault: "Төвийн админ",
      fallbackNews: "Мэдээ",
      fallbackEvents: "Арга хэмжээ"
    },
    EN: {
      title: "News & Events",
      tabNews: "Center News",
      tabEvents: "Conferences & Events",
      empty: "No information available at the moment.",
      authorDefault: "Center Admin",
      fallbackNews: "News",
      fallbackEvents: "Events"
    },
    ZH: {
      title: "新闻与活动",
      tabNews: "中心新闻",
      tabEvents: "会议与活动",
      empty: "暂无信息。",
      authorDefault: "中心管理员",
      fallbackNews: "新闻",
      fallbackEvents: "活动"
    }
  };
  const current = dict[language];

  // A basic heuristic: if category slug is "events" -> EVENTS, else -> NEWS
  const events = articles.filter(a => a.category?.slug === "events");
  const news = articles.filter(a => a.category?.slug === "news");

  const displayedArticles = activeTab === "NEWS" ? news : events;

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
          onClick={() => setActiveTab("NEWS")}
          className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
            activeTab === "NEWS" ? "bg-[#115e59] text-white shadow-lg" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {current.tabNews}
        </button>
        <button
          onClick={() => setActiveTab("EVENTS")}
          className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
            activeTab === "EVENTS" ? "bg-[#115e59] text-white shadow-lg" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {current.tabEvents}
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayedArticles.map((article, i) => {
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
                  <div className="absolute inset-0 bg-[#002b5c]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 items-center text-xs font-bold text-[#115e59] uppercase tracking-wider mb-4">
                    <span className="bg-[#115e59]/10 px-2 py-1 rounded text-[#115e59]">
                      {categoryName || (activeTab === "NEWS" ? current.fallbackNews : current.fallbackEvents)}
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
                      {authorName || current.authorDefault}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </Link>
          );
        })}

        {displayedArticles.length === 0 && (
          <div className="col-span-full text-center py-20 text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            {current.empty}
          </div>
        )}
      </div>
    </div>
  );
}
