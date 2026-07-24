"use client";

import { Globe, Briefcase, Zap, BookOpen } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function PartnersClient() {
  const { language } = useLanguage();

  const dict = {
    MN: { partners: "Хамтран ажиллагч байгууллагууд" },
    EN: { partners: "Partner Organizations" },
    ZH: { partners: "合作伙伴" }
  };

  const t = dict[language];

  return (
    <section className="py-24 md:py-32 px-6 bg-slate-50 min-h-[70vh] flex flex-col justify-center overflow-hidden">
      <AnimatedSection className="max-w-7xl mx-auto text-center w-full">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#002b5c] mb-16">
          {t.partners}
        </h1>
        <div className="overflow-hidden w-full relative before:absolute before:left-0 before:top-0 before:w-16 md:before:w-32 before:h-full before:bg-gradient-to-r before:from-slate-50 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-16 md:after:w-32 after:h-full after:bg-gradient-to-l after:from-slate-50 after:to-transparent after:z-10">
          <motion.div 
            animate={{ x: [0, -1000] }} 
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex items-center gap-16 md:gap-24 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 whitespace-nowrap min-w-max py-8"
          >
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex gap-16 md:gap-24 items-center">
                <div className="flex items-center gap-2"><Globe className="w-10 h-10 text-[#002b5c]" /><span className="text-2xl font-serif font-bold text-[#002b5c]">Asia Institute</span></div>
                <div className="flex items-center gap-2"><Briefcase className="w-10 h-10 text-[#115e59]" /><span className="text-2xl font-serif font-bold text-[#002b5c]">Global Fund</span></div>
                <div className="flex items-center gap-2"><Zap className="w-10 h-10 text-[#f59e0b]" /><span className="text-2xl font-serif font-bold text-[#002b5c]">Tech Initiative</span></div>
                <div className="flex items-center gap-2"><BookOpen className="w-10 h-10 text-[#002b5c]" /><span className="text-2xl font-serif font-bold text-[#002b5c]">Policy Center</span></div>
                <div className="flex items-center gap-2"><Globe className="w-10 h-10 text-[#115e59]" /><span className="text-2xl font-serif font-bold text-[#002b5c]">Eco Foundation</span></div>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}
