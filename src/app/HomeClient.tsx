"use client";

import {
  ArrowRight,
  BookOpen,
  Download,
  Globe,
  Briefcase,
  Zap,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

import ExpertsAndPartners from "@/components/ExpertsAndPartners";

export default function HomeClient({
  articles,
  experts,
}: {
  articles: any[];
  experts: any[];
}) {
  const { language } = useLanguage();

  const dict = {
    MN: {
      heroTitle1: "Евразийн холболт, гео-эдийн засаг болон ",
      heroTitleHighlight: "Монгол-Хятадын",
      heroTitle2: " харилцаа",
      heroDesc:
        "бол бүс нутгийн хамтын ажиллагааг гүнзгийрүүлэх хараат бус судалгаа, бодлогын зөвлөмжүүдийг боловсруулдаг тинк-танк.",
      readLatest: "Хамгийн сүүлийн тайлан унших",

      progTitle: "Судалгааны хөтөлбөр",
      progDesc:
        "Бид зөвхөн Монгол гэлтгүй Еврази, Дэлхийн өмнөд, Бүс нутгийн макро түвшний гүнзгийрүүлсэн судалгаануудыг хийж гүйцэтгэдэг.",
      prog1Title: "Евразийн холболт ба Бүс ба Зам",
      prog1Desc:
        "Макро геополитик, логистик болон транзит тээврийн коридорын судалгаа шинжилгээ.",
      prog2Title: "Бүс нутгийн гео-эдийн засаг ба Хөрөнгө оруулалт",
      prog2Desc:
        "Хятад-Монгол-Оросын эдийн засгийн коридор, гадаадын шууд хөрөнгө оруулалтын урсгал.",
      prog3Title: "Ногоон хөгжил ба Технологи",
      prog3Desc:
        "Экологийн засаглал, сэргээгдэх эрчим хүч, AI болон дижитал шилжилтийн бодлого.",
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

      insightTitle: "Онцлох нийтлэл, анализууд",
      viewAll: "Бүх хэвлэлийг үзэх",
      noArticles: "Нийтлэл ороогүй байна.",
      researcher: "Судлаач",

      expertTitle: "Бидний экспертүүд",
      noExperts: "Судлаачдын мэдээлэл ороогүй байна.",

      partners: "Хамтран ажиллагч байгууллагууд",
    },
    EN: {
      heroTitle1: "Eurasian Connectivity, Geo-Economics & ",
      heroTitleHighlight: "Mongolia-China",
      heroTitle2: " Relations",
      heroDesc:
        "We are an independent think-tank providing deep research and policy recommendations to enhance regional cooperation.",
      readLatest: "Read Latest Reports",

      progTitle: "Research Programs",
      progDesc:
        "We conduct macro-level in-depth research covering Mongolia, Eurasia, the Global South, and the broader region.",
      prog1Title: "Eurasian Connectivity & BRI",
      prog1Desc:
        "Macro geopolitics, logistics, and transit transport corridor analysis.",
      prog2Title: "Regional Geo-Economics & FDI",
      prog2Desc:
        "China-Mongolia-Russia economic corridor and foreign direct investment flows.",
      prog3Title: "Green Development & Tech",
      prog3Desc:
        "Ecological governance, renewable energy, AI, and digital transition policies.",
      readMore: "Read More",

      hubBadge: "🇲🇳 Investor's Guide",
      hubDesc:
        "A comprehensive database of Mongolia's investment environment, strategic projects, tax, and legal information. Tailored for foreign investors and researchers.",
      hubBtn1: "Investment Guide",
      hubBtn2: "Read Vision 2050",
      hubFeat1: "Legal Framework",
      hubFeat1Desc: "FDI laws and taxation updates",
      hubFeat2: "Strategic Projects",
      hubFeat2Desc: "New Recovery Policy and energy mega projects",
      hubFeat3: "Macro Economics",
      hubFeat3Desc: "Economic statistics and data analytics for investors",

      insightTitle: "Featured Insights & Analysis",
      viewAll: "View All Publications",
      noArticles: "No articles available.",
      researcher: "Researcher",

      expertTitle: "Our Experts",
      noExperts: "No expert information available.",

      partners: "Partner Organizations",
    },
    ZH: {
      heroTitle1: "欧亚互联互通，地缘经济与 ",
      heroTitleHighlight: "中蒙",
      heroTitle2: " 关系",
      heroDesc:
        "我们是一家独立的智库，致力于提供深入的研究和政策建议，以加强区域合作。",
      readLatest: "阅读最新报告",

      progTitle: "研究项目",
      progDesc:
        "我们进行涵盖蒙古、欧亚大陆、全球南方及更广泛区域的宏观层面深入研究。",
      prog1Title: "欧亚互联互通与“一带一路”",
      prog1Desc: "宏观地缘政治、物流及过境运输走廊分析。",
      prog2Title: "区域地缘经济与外商直接投资",
      prog2Desc: "中蒙俄经济走廊与外国直接投资流动。",
      prog3Title: "绿色发展与科技",
      prog3Desc: "生态治理、可再生能源、人工智能及数字化转型政策。",
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

      insightTitle: "精选洞察与分析",
      viewAll: "查看所有出版物",
      noArticles: "暂无文章。",
      researcher: "研究员",

      expertTitle: "我们的专家",
      noExperts: "暂无专家信息。",

      partners: "合作伙伴",
    },
  };

  const t = dict[language];

  return (
    <>
      {/* BLOCK 1: Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#001730]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#001730] via-[#002b5c] to-[#001730] z-10 opacity-90" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        </div>

        <AnimatedSection className="z-20 text-center max-w-5xl px-6 mt-20 md:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl">
            {t.heroTitle1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">
              {t.heroTitleHighlight}
            </span>{" "}
            {t.heroTitle2}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-10 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            {t.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              href="/publications"
              className="w-full sm:w-auto bg-[#115e59] hover:bg-[#0f4d4a] active:scale-95 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg shadow-[#115e59]/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
            >
              <BookOpen className="w-5 h-5" /> {t.readLatest}
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* BLOCK 2: Research Programs */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-white relative">
        <AnimatedSection className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#002b5c] mb-6">
              {t.progTitle}
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#115e59] to-[#f59e0b] mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {t.progDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: Globe,
                title: t.prog1Title,
                desc: t.prog1Desc,
                color: "bg-[#002b5c]",
              },
              {
                icon: Briefcase,
                title: t.prog2Title,
                desc: t.prog2Desc,
                color: "bg-[#115e59]",
              },
              {
                icon: Zap,
                title: t.prog3Title,
                desc: t.prog3Desc,
                color: "bg-[#f59e0b]",
              },
            ].map((prog, i) => (
              <Link href="/programs" key={i}>
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
                  <h3 className="text-xl md:text-2xl font-bold text-[#002b5c] mb-4 font-serif group-hover:text-[#115e59] transition-colors">
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
        </AnimatedSection>
      </section>

      {/* BLOCK 3: Mongolia Policy Hub */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-[#001730] relative overflow-hidden text-white border-y-[8px] border-[#115e59]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#115e59] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse hidden lg:block translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <AnimatedSection className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-bold mb-6 tracking-widest uppercase">
              <span className="text-xl"></span> {t.hubBadge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight text-white">
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

      {/* BLOCK 4: Latest Insights */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-slate-50 border-t border-slate-100">
        <AnimatedSection className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#002b5c] mb-6">
                {t.insightTitle}
              </h2>
              <div className="w-20 h-1.5 bg-[#115e59] rounded-full"></div>
            </div>
            <Link
              href="/publications"
              className="flex items-center gap-2 text-[#115e59] font-bold hover:text-[#002b5c] transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 hover:shadow-md active:scale-95"
            >
              {t.viewAll} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {articles.length > 0 ? (
              articles.map((article, i) => {
                const title =
                  language === "EN" && article.titleEn
                    ? article.titleEn
                    : language === "ZH" && article.titleZh
                      ? article.titleZh
                      : article.titleMn;
                const authorName =
                  language === "EN" && article.author?.nameEn
                    ? article.author.nameEn
                    : language === "ZH" && article.author?.nameZh
                      ? article.author.nameZh
                      : article.author?.nameMn;
                const categoryName =
                  language === "EN" && article.category?.nameEn
                    ? article.category.nameEn
                    : language === "ZH" && article.category?.nameZh
                      ? article.category.nameZh
                      : article.category?.nameMn;

                return (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 h-full flex flex-col"
                  >
                    <AnimatedSection
                      delay={i * 0.1}
                      className="flex flex-col h-full"
                    >
                      <div className="h-48 md:h-52 bg-slate-200 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[#002b5c]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 group-hover:scale-105 transition-transform duration-700 ease-out"></div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex gap-2 items-center text-[10px] md:text-xs font-bold text-[#115e59] uppercase tracking-wider mb-4">
                          <span className="bg-[#115e59]/10 px-2 py-1 rounded text-[#115e59]">
                            {categoryName || "Анализ"}
                          </span>
                          <span className="text-slate-400">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-serif font-bold text-[#002b5c] mb-4 group-hover:text-[#115e59] transition-colors leading-snug line-clamp-3">
                          {title}
                        </h3>
                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#002b5c]">
                              {(authorName || "С").charAt(0)}
                            </div>
                            <p className="text-sm text-slate-600 font-medium">
                              {authorName || t.researcher}
                            </p>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  </Link>
                );
              })
            ) : (
              <AnimatedSection className="col-span-1 sm:col-span-2 lg:col-span-4 bg-white rounded-2xl p-12 text-center border border-slate-200 border-dashed">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg font-medium">
                  {t.noArticles}
                </p>
              </AnimatedSection>
            )}
          </div>
        </AnimatedSection>
      </section>

      <ExpertsAndPartners experts={experts} />
    </>
  );
}
