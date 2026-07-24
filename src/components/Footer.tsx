"use client";

import Link from "next/link";
import { Mail, Globe2, Users, Send } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  const dict = {
    MN: {
      logoTitle: "Нэг бүс, нэг зам Хамтын хөгжил судалгааны төв",
      desc: "Евразийн холболт, гео-эдийн засаг болон Монгол-Хятадын харилцааны гүнзгийрүүлсэн судалгааг гүйцэтгэх хараат бус тинк-танк.",
      linksTitle: "Холбоосууд",
      about: "Бидний тухай", programs: "Судалгааны хөтөлбөр", policyHub: "Монголын бодлогын тойм", 
      publications: "Хэвлэл нийтлэл", news: "Мэдээ & Арга хэмжээ", login: "Системд нэвтрэх",
      newsletterTitle: "Имэйлээр мэдээлэл авах",
      newsletterDesc: "Судалгааны тайлан, бодлогын зөвлөмж болон арга хэмжээний мэдээллийг тогтмол хүлээн авах.",
      emailPlaceholder: "Таны имэйл хаяг",
      address: "Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо",
      rights: "Бүх эрх хуулиар хамгаалагдсан.",
      terms: "Үйлчилгээний нөхцөл", privacy: "Нууцлалын бодлого"
    },
    EN: {
      logoTitle: "Belt & Road Co-Development Research Center",
      desc: "An independent think-tank dedicated to in-depth research on Eurasian connectivity, geo-economics, and Mongolia-China relations.",
      linksTitle: "Quick Links",
      about: "About Us", programs: "Research Programs", policyHub: "Mongolia Policy Hub", 
      publications: "Publications", news: "News & Events", login: "Admin Login",
      newsletterTitle: "Subscribe to Newsletter",
      newsletterDesc: "Receive regular updates on research reports, policy briefs, and upcoming events.",
      emailPlaceholder: "Your email address",
      address: "Sukhbaatar District, 1st Khoroo, Ulaanbaatar",
      rights: "All rights reserved.",
      terms: "Terms of Service", privacy: "Privacy Policy"
    },
    ZH: {
      logoTitle: "一带一路共同发展研究中心",
      desc: "一家致力于欧亚互联互通、地缘经济以及蒙中关系深度研究的独立智库。",
      linksTitle: "快速链接",
      about: "关于我们", programs: "研究项目", policyHub: "蒙古政策中心", 
      publications: "出版物", news: "新闻与活动", login: "管理员登录",
      newsletterTitle: "订阅新闻通讯",
      newsletterDesc: "定期接收研究报告、政策简报及即将举行的活动信息。",
      emailPlaceholder: "您的电子邮箱",
      address: "乌兰巴托市苏赫巴托尔区第1区",
      rights: "版权所有。",
      terms: "服务条款", privacy: "隐私政策"
    }
  };

  const current = dict[language];

  return (
    <footer className="bg-[#001730] text-slate-400 py-20 px-6 md:px-16 border-t border-white/5 relative">
      <AnimatedSection className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-white">
        
        {/* About & Social */}
        <div className="col-span-1 md:col-span-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-0.5 shrink-0">
              <img
                src="/logo.jpg"
                alt="BCRD Logo"
                onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                className="w-full h-full object-contain p-1 rounded-full"
              />
            </div>
            <h3 className="text-xl font-serif font-bold text-white leading-tight">
              {current.logoTitle}
            </h3>
          </div>
          <p className="mb-8 max-w-sm leading-relaxed font-light text-white/80">
            {current.desc}
          </p>
          <div className="flex gap-4 text-white">
            <Link href="mailto:info@bcrd.mn" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#115e59] hover:text-white transition-all">
              <Mail className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#115e59] hover:text-white transition-all">
              <Globe2 className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sitemap */}
        <div className="col-span-1 md:col-span-2 md:col-start-6">
          <h4 className="text-white font-bold mb-6 tracking-wide">{current.linksTitle}</h4>
          <ul className="space-y-4 font-medium text-sm text-white/80">
            <li><Link href="/about" className="hover:text-[#f59e0b] transition-colors">{current.about}</Link></li>
            <li><Link href="/programs" className="hover:text-[#f59e0b] transition-colors">{current.programs}</Link></li>
            <li><Link href="/policy-hub" className="hover:text-[#f59e0b] transition-colors">{current.policyHub}</Link></li>
            <li><Link href="/publications" className="hover:text-[#f59e0b] transition-colors">{current.publications}</Link></li>
            <li><Link href="/news" className="hover:text-[#f59e0b] transition-colors">{current.news}</Link></li>
            <li className="pt-4"><Link href="/admin/login" className="hover:text-white transition-colors flex items-center gap-2 opacity-50"><div className="w-1 h-1 bg-white rounded-full"></div> {current.login}</Link></li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div className="col-span-1 md:col-span-4 lg:col-span-4">
          <h4 className="text-white font-bold mb-6 tracking-wide">{current.newsletterTitle}</h4>
          <p className="text-sm text-white/70 mb-4 leading-relaxed">
            {current.newsletterDesc}
          </p>
          <form className="flex mb-10" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={current.emailPlaceholder}
              className="bg-white/10 text-white placeholder-white/40 px-4 py-3 rounded-l-lg border border-white/10 focus:outline-none focus:border-[#115e59] w-full text-sm"
              required
            />
            <button type="submit" className="bg-[#115e59] hover:bg-[#0f4d4a] text-white px-5 rounded-r-lg transition-colors flex items-center justify-center">
              <Send className="w-4 h-4" />
            </button>
          </form>

          <ul className="space-y-4 font-medium text-sm text-white/80">
            <li className="flex items-start gap-3">
              <Globe2 className="w-5 h-5 text-[#f59e0b] shrink-0" />
              <span>{current.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#f59e0b] shrink-0" />
              <a href="mailto:info@bcrd.mn" className="hover:text-white">info@bcrd.mn</a>
            </li>
            <li className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#f59e0b] shrink-0" />
              <span>+976 7700-0000</span>
            </li>
          </ul>
        </div>
      </AnimatedSection>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/50">
        <p>© {new Date().getFullYear()} BCRD. {current.rights}</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-white transition-colors">{current.terms}</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">{current.privacy}</Link>
        </div>
      </div>
    </footer>
  );
}
