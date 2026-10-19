"use client";

import {
  ArrowRight,
  BookOpen,
  Download,
  Globe,
  Briefcase,
  Zap,
  Calendar,
  MessageCircle,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getShortCategoryName } from "@/lib/formatCategory";

export default function HomeClient({
  articles,
  researchArticles = [],
  latestNews,
  experts,
}: {
  articles: any[];
  researchArticles?: any[];
  latestNews: any[];
  experts?: any[];
}) {
  const { language } = useLanguage();

  const dict = {
    MN: {
      heroTitle1: "Евразийн холболт, Гео-эдийн засаг ба ",
      heroTitleHighlight: "Монгол-Хятадын",
      heroTitle2: " харилцаа",
      heroDesc:
        'Бид бүс нутгийн хамтын ажиллагааг гүнзгийрүүлэх хараат бус судалгаа хийж, бодлогын зөвлөмж боловсруулдаг "Тинк-Танк" (Think-Tank) юм.',
      readLatest: "Бодлогын тойм унших",

      insightTitle: "Онцлох анализ",
      viewAllInsights: "Бүх нийтлэлийг үзэх",

      progTitle: "Судалгааны чиглэл",
      viewAllResearch: "Бүх судалгааг үзэх",
      latestResearchTitle: "Судалгааны чиглэлийн шинэ бүтээл, анализууд",
      progDesc:
        "Бид бүс нутгийн болон олон улсын макро түвшний гүнзгийрүүлсэн суурь болон хавсарга судалгаануудыг дараах үндсэн чиглэлээр хийж гүйцэтгэдэг.",
      prog1Title: "Евразийн холболт ба Бүс ба Зам",
      prog1Desc:
        "Макро геополитик, логистик болон транзит тээврийн коридорын судалгаа шинжилгээ.",
      prog2Title: "Бүс нутгийн гео-эдийн засаг ба Хөрөнгө оруулалт",
      prog2Desc:
        "Хятад-Монгол-Оросын эдийн засгийн коридор, гадаадын шууд хөрөнгө оруулалтын урсгал.",
      prog3Title: "Ногоон эдийн засаг ба Дижитал шилжилт",
      prog3Desc:
        "Экологийн засаглал, ногоон санхүүжилт, сэргээгдэх эрчим хүч, AI болон дижитал шилжилтийн бодлого.",
      readMore: "Дэлгэрэнгүй",

      hubBadge: "🇲🇳 Хөрөнгө оруулагчдын хөтөч",
      hubDesc:
        "Монгол Улсын хөрөнгө оруулалтын орчин, стратегийн төслүүд, татвар, хууль эрх зүйн мэдээллийн нэгдсэн сан. Гадаадын хөрөнгө оруулагчид болон судлаачдад зориулав.",
      hubBtn1: "Хөрөнгө оруулалтын гарын авлага",
      hubBtn2: "Алсын хараа 2050 унших",
      hubFeat1: "Хууль эрх зүй",
      hubFeat1Desc: "Гадаадын хөрөнгө оруулалтын хууль, татварын шинэчлэлтүүд",
      hubFeat2: "Стратегийн төслүүд",
      hubFeat2Desc: "Шинэ сэргэлтийн бодлого, эрчим хүчний мега төслүүд",
      hubFeat3: "Макро эдийн засаг",
      hubFeat3Desc:
        "Хөрөнгө оруулагчдад хэрэгтэй эдийн засгийн статистик, дата аналитикууд",

      newsTitle: "Төвийн мэдээ",
      viewAllNews: "Бүх мэдээг үзэх",
      noArticles: "Одоогоор нийтлэл ороогүй байна.",
      noNews: "Одоогоор мэдээ ороогүй байна.",
      researcher: "Судлаач",
      contactBtn: "Холбоо барих",
    },
    ZH: {
      heroTitle1: "欧亚互联、地缘经济与",
      heroTitleHighlight: "中蒙",
      heroTitle2: "关系",
      heroDesc:
        "我们是致力于深化区域合作、开展独立研究并制定政策建议的智库",
      readLatest: "查阅政策简报",

      insightTitle: "重点分析",
      viewAllInsights: "查看所有文章",

      progTitle: "研究方向",
      viewAllResearch: "查看所有研究",
      latestResearchTitle: "重点研究方向最新成果与分析",
      progDesc:
        "我们围绕以下重点方向开展区域与国际宏观层面的深度研究。",
      prog1Title: "欧亚互联互通与“一带一路”",
      prog1Desc: "宏观地缘政治、物流及过境运输走廊分析。",
      prog2Title: "区域地缘经济与外商直接投资",
      prog2Desc: "中蒙俄经济走廊与外国直接投资流动。",
      prog3Title: "绿色经济与数字化转型",
      prog3Desc: "生态治理、绿色金融、可再生能源、人工智能及数字化转型政策。",
      readMore: "了解更多",

      hubBadge: "🇲🇳 投资者指南",
      hubDesc:
        "蒙古投资环境、战略项目、税务及法律信息的综合数据库。专为外国投资者及研究人员量身定制。",
      hubBtn1: "投资指南",
      hubBtn2: "阅读2050愿景",
      hubFeat1: "法律框架",
      hubFeat1Desc: "外商直接投资法及税务更新",
      hubFeat2: "战略项目",
      hubFeat2Desc: "新复苏政策及能源大型项目",
      hubFeat3: "宏观经济",
      hubFeat3Desc: "为投资者提供的经济统计及数据分析",

      newsTitle: "中心动态",
      viewAllNews: "查看所有资讯",
      noArticles: "暂无文章。",
      noNews: "暂无资讯。",
      researcher: "研究员",
      contactBtn: "联系我们",
    },
  };

  const t = dict[language];

  return (
    <>
      {/* СЕКЦ 1: ТОЛГОЙ ХЭСЭГ (Hero Banner & Main CTA) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#001730]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#001730] via-[#002b5c] to-[#001730] z-10 opacity-90" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        </div>

        <AnimatedSection className="z-20 text-center max-w-5xl px-6 mt-20 md:mt-0">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl">
            {t.heroTitle1}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">
              {t.heroTitleHighlight}
            </span>
            {t.heroTitle2}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-10 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            {t.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              href="/policy-hub"
              className="w-full sm:w-auto bg-[#115e59] hover:bg-[#0f4d4a] active:scale-95 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg shadow-[#115e59]/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
            >
              <BookOpen className="w-5 h-5" /> {t.readLatest}
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* СЕКЦ 2: БЛОК 1 — "Онцлох анализ" (重点分析) */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-white border-b border-slate-100">
        <AnimatedSection className="max-w-7xl mx-auto">
          {/* Header with single button in top-right corner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#002b5c] mb-3">
                {t.insightTitle}
              </h2>
              <div className="w-20 h-1.5 bg-[#115e59] rounded-full"></div>
            </div>
            <Link
              href="/publications"
              className="flex items-center gap-2 text-[#115e59] font-bold hover:text-[#002b5c] transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 hover:shadow-md active:scale-95 shrink-0"
            >
              {t.viewAllInsights} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* 1-3 Featured Analytic Articles with large cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length > 0 ? (
              articles.slice(0, 3).map((article, i) => {
                const title =
                  language === "ZH" && article.titleZh
                    ? article.titleZh
                    : article.titleMn;
                const authorName =
                  language === "ZH" && article.author?.nameZh
                    ? article.author.nameZh
                    : article.author?.nameMn;
                const categoryName =
                  language === "ZH" && article.category?.nameZh
                    ? article.category.nameZh
                    : article.category?.nameMn;

                return (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 h-full flex flex-col"
                  >
                    <AnimatedSection delay={i * 0.1} className="flex flex-col h-full">
                      <div className="h-60 sm:h-64 w-full bg-slate-200 overflow-hidden relative shrink-0">
                        <div className="absolute inset-0 bg-[#002b5c]/15 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          style={{
                            backgroundImage: `url('${
                              article.imageUrl ||
                              "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070"
                            }')`,
                          }}
                        ></div>
                        <div className="absolute top-4 left-4 z-20 max-w-[calc(100%-2rem)]">
                          <span className="inline-block bg-[#115e59] text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide shadow-md whitespace-nowrap truncate max-w-full">
                            {getShortCategoryName(categoryName) || "Анализ"}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 md:p-8 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
                          <Calendar className="w-3.5 h-3.5 text-[#115e59]" />
                          <span>
                            {new Date(article.publishedAt)
                              .toISOString()
                              .split("T")[0]}
                          </span>
                        </div>

                        <h3 className="text-xl font-serif font-bold text-[#002b5c] mb-4 group-hover:text-[#115e59] transition-colors leading-snug line-clamp-3">
                          {title}
                        </h3>

                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#002b5c]">
                              {(authorName || "С").charAt(0)}
                            </div>
                            <p className="text-sm text-slate-600 font-medium">
                              {authorName || t.researcher}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-[#115e59] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            {t.readMore} <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </AnimatedSection>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>{t.noArticles}</p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </section>

      {/* СЕКЦ 3: БЛОК 2 — "Судалгааны чиглэл" (Research Priorities) */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-slate-50 relative">
        <AnimatedSection className="max-w-7xl mx-auto">
          {/* Header with button in top-right corner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#002b5c] mb-3">
                {t.progTitle}
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#115e59] to-[#f59e0b] rounded-full"></div>
              <p className="mt-4 text-slate-500 max-w-2xl text-base md:text-lg leading-relaxed">
                {t.progDesc}
              </p>
            </div>
            <Link
              href="/programs"
              className="flex items-center gap-2 text-[#115e59] font-bold hover:text-[#002b5c] transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 hover:shadow-md active:scale-95 shrink-0"
            >
              {t.viewAllResearch} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* 3 Research Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-14">
            {[
              {
                icon: Globe,
                title: t.prog1Title,
                desc: t.prog1Desc,
                color: "bg-[#002b5c]",
                href: "/programs/eurasian-connectivity",
              },
              {
                icon: Briefcase,
                title: t.prog2Title,
                desc: t.prog2Desc,
                color: "bg-[#115e59]",
                href: "/programs/regional-geo-economics",
              },
              {
                icon: Zap,
                title: t.prog3Title,
                desc: t.prog3Desc,
                color: "bg-[#f59e0b]",
                href: "/programs/green-digital-transition",
              },
            ].map((prog, i) => (
              <Link href={prog.href} key={i}>
                <AnimatedSection
                  delay={i * 0.15}
                  className="group bg-white p-8 lg:p-10 rounded-3xl border border-slate-100 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full cursor-pointer"
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-1.5 ${prog.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`}
                  ></div>
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-slate-700 group-hover:scale-110 group-hover:bg-slate-100 transition-all duration-500">
                    <prog.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#002b5c] mb-4 font-serif group-hover:text-[#115e59] transition-colors leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base flex-1">
                    {prog.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#115e59] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span>{t.readMore}</span> <ArrowRight className="w-4 h-4" />
                  </div>
                </AnimatedSection>
              </Link>
            ))}
          </div>

          {/* Research Articles Grid */}
          {researchArticles && researchArticles.length > 0 && (
            <div className="pt-10 border-t border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#002b5c] flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#115e59]"></span>
                  {t.latestResearchTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {researchArticles.slice(0, 3).map((article, i) => {
                  const title =
                    language === "ZH" && article.titleZh
                      ? article.titleZh
                      : article.titleMn;
                  const authorName =
                    language === "ZH" && article.author?.nameZh
                      ? article.author.nameZh
                      : article.author?.nameMn;
                  const categoryName =
                    language === "ZH" && article.category?.nameZh
                      ? article.category.nameZh
                      : article.category?.nameMn;

                  return (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 h-full flex flex-col"
                    >
                      <AnimatedSection delay={i * 0.1} className="flex flex-col h-full">
                        <div className="h-52 w-full bg-slate-200 overflow-hidden relative shrink-0">
                          <div className="absolute inset-0 bg-[#002b5c]/15 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                          <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            style={{
                              backgroundImage: `url('${
                                article.imageUrl ||
                                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
                              }')`,
                            }}
                          ></div>
                          <div className="absolute top-4 left-4 z-20 max-w-[calc(100%-2rem)]">
                            <span className="inline-block bg-[#002b5c] text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide shadow-md whitespace-nowrap truncate max-w-full">
                              {getShortCategoryName(categoryName) || "Судалгаа"}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 md:p-8 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
                            <Calendar className="w-3.5 h-3.5 text-[#115e59]" />
                            <span>
                              {new Date(article.publishedAt)
                                .toISOString()
                                .split("T")[0]}
                            </span>
                          </div>

                          <h3 className="text-xl font-serif font-bold text-[#002b5c] mb-4 group-hover:text-[#115e59] transition-colors leading-snug line-clamp-3">
                            {title}
                          </h3>

                          <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#002b5c]">
                                {(authorName || "С").charAt(0)}
                              </div>
                              <p className="text-sm text-slate-600 font-medium">
                                {authorName || t.researcher}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-[#115e59] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                              {t.readMore} <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </AnimatedSection>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </AnimatedSection>
      </section>

      {/* СЕКЦ 4: БЛОК 3 — "Бодлогын тойм" (Mongolia Policy Hub) */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-[#001730] relative overflow-hidden text-white border-y-[8px] border-[#115e59]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#115e59] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse hidden lg:block translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <AnimatedSection className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-bold mb-6 tracking-widest uppercase">
              {t.hubBadge}
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 leading-tight text-white">
              Mongolia Policy Hub
            </h2>
            <p className="text-white/80 mb-10 leading-relaxed text-lg font-light">
              {t.hubDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/policy-hub/investment-environment"
                className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Download className="w-5 h-5" /> {t.hubBtn1}
              </Link>
              <Link
                href="/policy-hub/vision-2050-and-strategic-projects"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm active:scale-95"
              >
                <BookOpen className="w-5 h-5" /> {t.hubBtn2}
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.2}
            className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Link href="/policy-hub/investment-environment">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer h-full">
                <h4 className="font-bold text-lg text-white mb-2">
                  {t.hubFeat1}
                </h4>
                <p className="text-white/60 text-sm">{t.hubFeat1Desc}</p>
              </div>
            </Link>
            <Link href="/policy-hub/vision-2050-and-strategic-projects">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer h-full">
                <h4 className="font-bold text-lg text-white mb-2">
                  {t.hubFeat2}
                </h4>
                <p className="text-white/60 text-sm">{t.hubFeat2Desc}</p>
              </div>
            </Link>
            <Link
              href="/policy-hub/economic-statistics"
              className="sm:col-span-2"
            >
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer h-full">
                <h4 className="font-bold text-lg text-white mb-2">
                  {t.hubFeat3}
                </h4>
                <p className="text-white/60 text-sm">{t.hubFeat3Desc}</p>
              </div>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* СЕКЦ 5: БЛОК 4 — "Төвийн мэдээ" (中心动态) */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-white border-b border-slate-100">
        <AnimatedSection className="max-w-7xl mx-auto">
          {/* Header with single button in top-right corner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#002b5c] mb-3">
                {t.newsTitle}
              </h2>
              <div className="w-20 h-1.5 bg-[#f59e0b] rounded-full"></div>
            </div>
            <Link
              href="/publications/news"
              className="flex items-center gap-2 text-[#f59e0b] font-bold hover:text-[#002b5c] transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 hover:shadow-md active:scale-95 shrink-0"
            >
              {t.viewAllNews} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* First large featured news */}
            {latestNews.length > 0 && (() => {
              const article = latestNews[0];
              const title =
                language === "ZH" && article.titleZh
                  ? article.titleZh
                  : article.titleMn;
              const categoryName =
                language === "ZH" && article.category?.nameZh
                  ? article.category.nameZh
                  : article.category?.nameMn;

              return (
                <div className="lg:col-span-7">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 h-full relative"
                  >
                    <div className="h-64 sm:h-80 md:h-[400px] w-full bg-slate-200 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001730]/90 via-[#001730]/25 to-transparent z-10"></div>
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        style={{
                          backgroundImage: `url('${
                            article.imageUrl ||
                            "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070"
                          }')`,
                        }}
                      ></div>

                      <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full">
                        <div className="flex gap-3 items-center mb-3">
                          <span className="inline-block bg-[#f59e0b] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm tracking-wide whitespace-nowrap truncate max-w-[200px]">
                            {getShortCategoryName(categoryName) || "Мэдээ"}
                          </span>
                          <span className="text-white/80 text-sm font-medium">
                            {new Date(article.publishedAt)
                              .toISOString()
                              .split("T")[0]}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-[#f59e0b] transition-colors line-clamp-3">
                          {title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })()}

            {/* Smaller news grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {latestNews.slice(1, 4).map((article) => {
                const title =
                  language === "ZH" && article.titleZh
                    ? article.titleZh
                    : article.titleMn;
                const categoryName =
                  language === "ZH" && article.category?.nameZh
                    ? article.category.nameZh
                    : article.category?.nameMn;

                return (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex items-center gap-4 p-4 hover:-translate-y-1"
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-[#002b5c]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                        style={{
                          backgroundImage: `url('${
                            article.imageUrl ||
                            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070"
                          }')`,
                        }}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block text-xs font-bold text-[#f59e0b] tracking-wide whitespace-nowrap truncate max-w-[160px]">
                          {getShortCategoryName(categoryName) || "Мэдээ"}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-400">
                          {new Date(article.publishedAt)
                            .toISOString()
                            .split("T")[0]}
                        </span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-[#002b5c] group-hover:text-[#115e59] transition-colors leading-snug line-clamp-2">
                        {title}
                      </h3>
                    </div>
                  </Link>
                );
              })}

              {latestNews.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  <BookOpen className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p>{t.noNews}</p>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <Link
        href="/contact"
        className="fixed bottom-8 right-8 z-50 bg-[#115e59] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        {t.contactBtn}
      </Link>
    </>
  );
}
