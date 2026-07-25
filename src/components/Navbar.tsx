"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar({
  alwaysSolid = false,
}: {
  alwaysSolid?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(alwaysSolid);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (alwaysSolid) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysSolid]);

  const dict = {
    MN: {
      about: "Бидний тухай",
      programs: "Судалгааны хөтөлбөр",
      policyHub: "Монголын бодлогын тойм",
      publications: "Нийтлэл",
      news: "Мэдээ",
      contact: "Холбоо барих",
      econ: "Эдийн засгийн статистик, дата",
      vision: "Алсын хараа 2050 ба Стратегийн төслүүд",
      invest: "Хөрөнгө оруулалтын орчин ба Эрх зүйн зохицуулалт",
      logoTitle: <>Нэг бүс, нэг зам<br/>Хамтын хөгжил<br/>судалгааны төв</>,
      newsLocal: "Төвийн мэдээ",
      newsGlobal: "Хурал хэлэлцүүлэг",
      pub1: "Бодлогын зөвлөмж",
      pub2: "Судалгааны тайлан",
      pub3: "Аналитик нийтлэл",
      aboutUs: "Бидний тухай",
      experts: "Бидний экспертүүд",
      partners: "Түншүүд",
      prog1: "Евразийн холболт ба Бүс ба Зам",
      prog2: "Бүс нутгийн гео-эдийн засаг ба Хөрөнгө оруулалт",
      prog3: "Ногоон хөгжил ба Технологийн засаглал",
    },
    EN: {
      about: "About Us",
      programs: "Research Programs",
      policyHub: "Mongolia Policy Hub",
      publications: "Articles",
      news: "News",
      contact: "Contact",
      econ: "Economic Statistics & Data",
      vision: "Vision 2050 & Strategic Projects",
      invest: "Investment Environment & Legal Regulation",
      logoTitle: <>Belt & Road<br/>Co-Development<br/>Research Center</>,
      newsLocal: "Center News",
      newsGlobal: "Meetings & Discussions",
      pub1: "Policy Brief",
      pub2: "Research Report",
      pub3: "Analytical Article",
      aboutUs: "About BCRD",
      experts: "Our Experts",
      partners: "Partners",
      prog1: "Eurasian Connectivity & BRI",
      prog2: "Regional Geo-Economics & FDI",
      prog3: "Green Development & Tech Governance",
    },
    ZH: {
      about: "关于我们",
      programs: "研究项目",
      policyHub: "蒙古政策中心",
      publications: "文章",
      news: "新闻",
      contact: "联系我们",
      econ: "经济统计与数据",
      vision: "2050愿景与战略项目",
      invest: "投资环境与法律法规",
      logoTitle: "一带一路共同发展研究中心",
      newsLocal: "中心新闻",
      newsGlobal: "会议与讨论",
      pub1: "政策简报",
      pub2: "研究报告",
      pub3: "分析文章",
      aboutUs: "关于我们",
      experts: "我们的专家",
      partners: "合作伙伴",
      prog1: "欧亚互联互通与一带一路",
      prog2: "区域地缘经济与外商直接投资",
      prog3: "绿色发展与科技治理",
    },
  };

  const current = dict[language];

  const navLinks = [
    {
      name: current.about,
      href: "#",
      activePrefix: "/about",
      subLinks: [
        { name: current.aboutUs, href: "/about" },
      ],
    },
    {
      name: current.programs,
      href: "#",
      activePrefix: "/programs",
      subLinks: [
        { name: current.prog1, href: "/programs#eurasian-connectivity" },
        { name: current.prog2, href: "/programs#geo-economics" },
        { name: current.prog3, href: "/programs#green-development" },
      ],
    },
    {
      name: current.policyHub,
      href: "#",
      activePrefix: "/policy-hub",
      subLinks: [
        { name: current.econ, href: "/policy-hub/economic-statistics" },
        {
          name: current.vision,
          href: "/policy-hub/vision-2050-and-strategic-projects",
        },
        { name: current.invest, href: "/policy-hub/investment-environment" },
      ],
    },
    {
      name: current.publications,
      href: "#",
      activePrefix: "/publications",
      subLinks: [
        { name: current.pub1, href: "/publications/policy-brief" },
        { name: current.pub2, href: "/publications/research-report" },
        { name: current.pub3, href: "/publications/analysis" },
      ],
    },
    {
      name: current.news,
      href: "#",
      activePrefix: "/news",
      subLinks: [
        { name: current.newsLocal, href: "/news/news" },
        { name: current.newsGlobal, href: "/news/events" },
      ],
    },
    { name: current.experts, href: "/experts" },
    { name: current.partners, href: "/partners" },
    { name: current.contact, href: "/contact" },
  ];

  return (
    <>
      {/* Background gradient overlay to ensure text contrast when not scrolled on homepage */}
      {!alwaysSolid && !isScrolled && (
        <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-40 pointer-events-none"></div>
      )}

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-slate-100"
            : "bg-transparent py-6"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center p-1 shadow-sm border border-slate-100 group-hover:shadow-md transition-shadow shrink-0">
              <img
                src="/logo.jpg"
                alt="BCRD Logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo.png";
                }}
                className="w-full h-full object-contain p-1 rounded-full"
              />
            </div>
            <span
              className={`font-serif font-bold text-sm tracking-wide hidden lg:block leading-snug transition-colors duration-500 max-w-[250px] xl:max-w-[300px] ${
                isScrolled ? "text-[#002b5c]" : "text-white drop-shadow-md"
              }`}
            >
              {current.logoTitle}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex flex-1 justify-end xl:justify-between items-center ml-4 2xl:ml-8 overflow-hidden">
            <div className="flex w-full justify-end xl:justify-between items-center gap-2 xl:gap-3 2xl:gap-5 text-[11px] xl:text-[12px] 2xl:text-[13px] font-semibold tracking-wide whitespace-nowrap">
              {navLinks.map((link) => {
                const isActive =
                  (link.href !== "#" &&
                    (pathname === link.href ||
                      pathname.startsWith(link.href + "/"))) ||
                  (link.activePrefix && pathname.startsWith(link.activePrefix));
                return (
                  <div key={link.name} className="relative group">
                    {link.href === "#" ? (
                      <button
                        className={`flex items-center gap-1 transition-all duration-300 py-2 ${
                          isScrolled
                            ? isActive
                              ? "text-[#115e59]"
                              : "text-slate-600 hover:text-[#115e59]"
                            : isActive
                              ? "text-[#f59e0b] drop-shadow-md"
                              : "text-white hover:text-white drop-shadow-md"
                        }`}
                      >
                        {link.name}
                        {link.subLinks && <ChevronDown className="w-4 h-4" />}
                        <span
                          className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                            isScrolled ? "bg-[#115e59]" : "bg-white"
                          } ${isActive ? "w-full" : ""}`}
                        ></span>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 transition-all duration-300 py-2 ${
                          isScrolled
                            ? isActive
                              ? "text-[#115e59]"
                              : "text-slate-600 hover:text-[#115e59]"
                            : isActive
                              ? "text-[#f59e0b] drop-shadow-md"
                              : "text-white hover:text-white drop-shadow-md"
                        }`}
                      >
                        {link.name}
                        {link.subLinks && <ChevronDown className="w-4 h-4" />}
                        <span
                          className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                            isScrolled ? "bg-[#115e59]" : "bg-white"
                          } ${isActive ? "w-full" : ""}`}
                        ></span>
                      </Link>
                    )}

                    {/* Dropdown Menu */}
                    {link.subLinks && (
                      <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-100 w-64 overflow-hidden py-2 flex flex-col">
                          {link.subLinks.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="px-5 py-3 text-sm font-medium text-slate-600 hover:text-[#115e59] hover:bg-slate-50 transition-colors border-l-2 border-transparent hover:border-[#115e59]"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Language Switcher */}
            <div
              className={`flex gap-3 items-center px-4 py-1.5 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "bg-slate-100 border border-slate-200"
                  : "bg-white/10 border border-white/20 backdrop-blur-sm"
              }`}
            >
              <button
                onClick={() => setLanguage("MN")}
                className={`font-bold text-xs whitespace-nowrap transition-colors ${language === "MN" ? (isScrolled ? "text-[#002b5c]" : "text-white") : isScrolled ? "text-slate-400 hover:text-[#002b5c]" : "text-white/70 hover:text-white"}`}
              >
                MN
              </button>
              <div
                className={`w-px h-3 ${isScrolled ? "bg-slate-300" : "bg-white/50"}`}
              ></div>
              <button
                onClick={() => setLanguage("EN")}
                className={`font-bold text-xs whitespace-nowrap transition-colors ${language === "EN" ? (isScrolled ? "text-[#002b5c]" : "text-white") : isScrolled ? "text-slate-400 hover:text-[#002b5c]" : "text-white/70 hover:text-white"}`}
              >
                EN
              </button>
              <div
                className={`w-px h-3 ${isScrolled ? "bg-slate-300" : "bg-white/50"}`}
              ></div>
              <button
                onClick={() => setLanguage("ZH")}
                className={`font-bold text-xs whitespace-nowrap transition-colors ${language === "ZH" ? (isScrolled ? "text-[#002b5c]" : "text-white") : isScrolled ? "text-slate-400 hover:text-[#002b5c]" : "text-white/70 hover:text-white"}`}
              >
                中文
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X
                className={`w-6 h-6 transition-colors ${isScrolled ? "text-[#002b5c]" : "text-white"}`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 transition-colors ${isScrolled ? "text-[#002b5c]" : "text-white"}`}
              />
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="xl:hidden bg-white overflow-hidden shadow-lg absolute w-full top-full left-0 z-40 border-t border-slate-100"
            >
              <div className="flex flex-col px-6 py-8 space-y-6 h-full bg-white overflow-y-auto pb-32">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.href === "#" ? (
                      <div className="text-xl font-serif font-bold text-[#002b5c] block py-2 border-b border-slate-50 hover:text-[#115e59] transition-colors">
                        {link.name}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() =>
                          !link.subLinks && setMobileMenuOpen(false)
                        }
                        className="text-xl font-serif font-bold text-[#002b5c] block py-2 border-b border-slate-50 hover:text-[#115e59] transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                    {link.subLinks && (
                      <div className="pl-4 mt-2 flex flex-col space-y-3 border-l-2 border-slate-100 ml-2">
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-medium text-slate-600 hover:text-[#115e59]"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Mobile Language Switcher */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-6 pt-8 items-center"
                >
                  <button
                    onClick={() => setLanguage("MN")}
                    className={`font-bold text-lg ${language === "MN" ? "text-[#002b5c]" : "text-slate-500"}`}
                  >
                    MN
                  </button>
                  <div className="w-px h-6 bg-slate-200"></div>
                  <button
                    onClick={() => setLanguage("EN")}
                    className={`font-bold text-lg ${language === "EN" ? "text-[#002b5c]" : "text-slate-500"}`}
                  >
                    EN
                  </button>
                  <div className="w-px h-6 bg-slate-200"></div>
                  <button
                    onClick={() => setLanguage("ZH")}
                    className={`font-bold text-lg ${language === "ZH" ? "text-[#002b5c]" : "text-slate-500"}`}
                  >
                    中文
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
