"use client";

import { Globe, Briefcase, Zap, BookOpen } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function ExpertsAndPartners({ experts }: { experts: any[] }) {
  const { language } = useLanguage();

  const dict = {
    MN: { expertTitle: "Бидний экспертүүд", noExperts: "Судлаачдын мэдээлэл ороогүй байна.", partners: "Хамтран ажиллагч байгууллагууд" },
    EN: { expertTitle: "Our Experts", noExperts: "No expert information available.", partners: "Partner Organizations" },
    ZH: { expertTitle: "我们的专家", noExperts: "暂无专家信息。", partners: "合作伙伴" }
  };

  const t = dict[language];

  return (
    <>
      {/* BLOCK 5: Our Experts */}
      <section id="experts" className="py-24 md:py-32 px-6 md:px-16 bg-white border-t border-slate-100">
        <AnimatedSection className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#002b5c] mb-6">
              {t.expertTitle}
            </h2>
            <div className="w-20 h-1.5 bg-[#f59e0b] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {experts.length > 0 ? experts.map((expert, i) => {
              const name = language === "EN" && expert.nameEn ? expert.nameEn : language === "ZH" && expert.nameZh ? expert.nameZh : expert.nameMn;
              const title = language === "EN" && expert.titleEn ? expert.titleEn : language === "ZH" && expert.titleZh ? expert.titleZh : expert.titleMn;
              const bio = language === "EN" && expert.bioEn ? expert.bioEn : language === "ZH" && expert.bioZh ? expert.bioZh : expert.bioMn;
              return (
              <AnimatedSection key={expert.id} delay={i * 0.1} className="group cursor-pointer">
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <Link href={`/experts/${expert.id}`} className="block w-24 h-24 mx-auto rounded-full bg-slate-200 mb-6 overflow-hidden border-4 border-white shadow-sm group-hover:border-[#115e59] transition-colors relative">
                    {expert.photoUrl ? (
                      <img src={expert.photoUrl} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-400">
                        {name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                  <h3 className="font-bold text-xl text-[#002b5c] mb-2">{name}</h3>
                  <p className="text-[#115e59] font-medium text-sm mb-4">{title}</p>
                </div>
              </AnimatedSection>
              );
            }) : (
               <div className="col-span-4 text-center text-slate-500 py-10">{t.noExperts}</div>
            )}
          </div>
        </AnimatedSection>
      </section>

      {/* BLOCK 6: Partners */}
      <section id="partners" className="py-20 px-6 bg-slate-50 border-t border-slate-100 overflow-hidden">
        <AnimatedSection className="max-w-7xl mx-auto text-center">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">
            {t.partners}
          </h4>
          <div className="overflow-hidden w-full relative before:absolute before:left-0 before:top-0 before:w-16 md:before:w-32 before:h-full before:bg-gradient-to-r before:from-slate-50 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-16 md:after:w-32 after:h-full after:bg-gradient-to-l after:from-slate-50 after:to-transparent after:z-10">
            <motion.div 
              animate={{ x: [0, -1000] }} 
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              className="flex items-center gap-16 md:gap-24 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 whitespace-nowrap min-w-max"
            >
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-16 md:gap-24 items-center">
                  <div className="flex items-center gap-2"><Globe className="w-8 h-8" /><span className="text-xl font-serif font-bold text-[#002b5c]">Asia Institute</span></div>
                  <div className="flex items-center gap-2"><Briefcase className="w-8 h-8" /><span className="text-xl font-serif font-bold text-[#002b5c]">Global Fund</span></div>
                  <div className="flex items-center gap-2"><Zap className="w-8 h-8" /><span className="text-xl font-serif font-bold text-[#002b5c]">Tech Initiative</span></div>
                  <div className="flex items-center gap-2"><BookOpen className="w-8 h-8" /><span className="text-xl font-serif font-bold text-[#002b5c]">Policy Center</span></div>
                  <div className="flex items-center gap-2"><Globe className="w-8 h-8" /><span className="text-xl font-serif font-bold text-[#002b5c]">Eco Foundation</span></div>
                </div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
