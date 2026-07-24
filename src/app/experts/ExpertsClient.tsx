"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ExpertsClient({ experts }: { experts: any[] }) {
  const { language } = useLanguage();

  const dict = {
    MN: { expertTitle: "Бидний экспертүүд", noExperts: "Судлаачдын мэдээлэл ороогүй байна." },
    EN: { expertTitle: "Our Experts", noExperts: "No expert information available." },
    ZH: { expertTitle: "我们的专家", noExperts: "暂无专家信息。" }
  };

  const t = dict[language];

  return (
    <section className="py-24 md:py-32 px-6 md:px-16 bg-white min-h-[70vh]">
      <AnimatedSection className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#002b5c] mb-6">
            {t.expertTitle}
          </h1>
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
  );
}
