"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Eye, 
  Target, 
  ShieldCheck, 
  Microscope, 
  Handshake, 
  Lightbulb,
  Users
} from "lucide-react";

export default function AboutClient({ experts }: { experts: any[] }) {
  const { language: lang, setLanguage: setLang } = useLanguage();

  const content = {
    MN: {
      title: "Бидний тухай",
      intro1: "\"Нэг бүс нэг зам\" Хамтын хөгжил судалгааны төв нь Монгол, Хятад болон Евразийн бүс нутгийн хамтын ажиллагааг судалгаа, дата, бодлогын шинжилгээнд тулгуурлан тайлбарлах хараат бус, мэргэжлийн бодлогын судалгааны тинк-танк юм.",
      intro2: "Манай төв нь 2022 онд үүсгэн байгуулагдсан бөгөөд Монгол Улсын урт хугацааны хөгжлийн бодлого \"Алсын хараа 2050\", \"Шинэ сэргэлтийн бодлого\"-ыг бүс нутгийн хамтын ажиллагааны гол хөдөлгүүр болох \"Бүс ба Зам\" санаачилга, \"Монгол-Орос-Хятадын эдийн засгийн коридор\"-ын бодлогын уялдаатай шинжлэх ухааны үндэслэлтэйгээр холбон судлах чиглэлээр идэвхтэй үйл ажиллагаа явуулж байна.",
      visionTitle: "Алсын хараа",
      visionDesc: "Монгол-Хятадын харилцаа болон бүс нутгийн хөгжлийн асуудлаарх бие даасан бодлогын судалгааны индэр байх.",
      missionTitle: "Эрхэм зорилго",
      missionDesc: "Эдийн засгийн хамтын ажиллагаа, хөрөнгө оруулалтын орчин, ногоон хөгжлийн асуудлаар шинжлэх ухааны үндэслэлтэй, бодитой судалгаа шинжилгээ хийж, төр, хувийн хэвшил болон олон улсын байгууллагуудын оновчтой шийдвэр гаргалтад дэмжлэг үзүүлэх.",
      valuesTitle: "Бидний үнэт зүйлс",
      values: [
        { title: "Хараат бус, бодитой байдал", desc: "Бид аливаа улс төрийн болон явцуу ашиг сонирхлоос ангид зөвхөн баримт, датанд тулгуурласан анализ хийнэ.", icon: ShieldCheck },
        { title: "Шинжлэх ухаанч, нотолгоонд суурилсан", desc: "Судалгааны арга зүй, эрдэм шинжилгээний өндөр стандартыг чанд баримтална.", icon: Microscope },
        { title: "Стратегийн түншлэл", desc: "Хоёр талын болон олон талт, харилцан ашигтай хамтын ажиллагааг эрхэмлэнэ.", icon: Handshake },
        { title: "Инноваци ба Тогтвортой хөгжил", desc: "Ногоон эдийн засаг, технологийн дэвшлийг дэмжсэн ирээдүй рүү чиглэсэн бодлогыг эрэлхийлнэ.", icon: Lightbulb },
      ],
      expertsTitle: "Удирдлага",
      expertsDesc: "Төвийн хараат бус судалгаа, анализыг удирдан чиглүүлэгч тэргүүлэх экспертүүд.",
      partnersTitle: "Стратегийн түншүүд",
    },
    EN: {
      title: "About Us",
      intro1: "Mongolian \"Belt and Road\" Co-Development Research Center is an independent, professional policy research think-tank dedicated to analyzing cooperation across Mongolia, China, and the Eurasian region through research, data, and policy analysis.",
      intro2: "Established in 2022, our Center actively operates to study the alignment of Mongolia’s long-term development policies, namely \"Vision 2050\" and the \"New Recovery Policy,\" with the \"Belt and Road\" initiative—the main driver of regional cooperation—and the \"Mongolia-Russia-China Economic Corridor,\" through scientifically grounded methodologies.",
      visionTitle: "Vision",
      visionDesc: "To serve as an independent policy research platform on Mongolia-China relations and regional development.",
      missionTitle: "Mission",
      missionDesc: "To conduct scientifically grounded and objective research on economic cooperation, the investment climate, and green development, thereby supporting informed decision-making by government bodies, the private sector, and international organizations.",
      valuesTitle: "Our Core Values",
      values: [
        { title: "Independence & Objectivity", desc: "We conduct analyses free from political or narrow interests, relying strictly on empirical facts and data.", icon: ShieldCheck },
        { title: "Evidence-Based Rigor", desc: "We strictly adhere to rigorous research methodologies and the highest academic standards.", icon: Microscope },
        { title: "Strategic Partnership", desc: "We foster bilateral and multilateral cooperation based on mutual benefit and shared strategic goals.", icon: Handshake },
        { title: "Innovation & Sustainability", desc: "We advocate for forward-looking policies that drive the green economy and technological advancement.", icon: Lightbulb },
      ],
      expertsTitle: "Management & Researchers",
      expertsDesc: "Leading experts guiding our independent research and analysis.",
      partnersTitle: "Strategic Partners",
    },
    ZH: {
      title: "关于我们",
      intro1: "蒙古国“一带一路”共同发展研究中心是一家独立、专业的政策研究智库，致力于通过实证研究、数据和政策分析，阐释蒙古国、中国及欧亚地区的区域合作。",
      intro2: "本中心成立于2022年，积极致力于将蒙古国中长期发展政策“远景2050”和“新复兴政策”，与区域合作的核心引擎——“一带一路”倡议以及“中蒙俄经济走廊”进行有机结合，开展具有科学依据的系统性研究。",
      visionTitle: "愿景",
      visionDesc: "致力于成为蒙中关系与区域发展领域的独立政策研究平台。",
      missionTitle: "使命",
      missionDesc: "围绕经济合作、投资环境及绿色发展开展科学、客观的深度研究，为政府、私营部门及国际组织的科学决策提供支持。",
      valuesTitle: "我们的核心价值观",
      values: [
        { title: "独立客观", desc: "我们的研究不受任何政治或特定利益集团的干扰，始终坚持以事实和数据为依据。", icon: ShieldCheck },
        { title: "科学严谨", desc: "严格遵循科学的研究方法，恪守最高标准的学术规范。", icon: Microscope },
        { title: "战略合作", desc: "致力于推动双边及多边框架下的互利共赢与协同发展。", icon: Handshake },
        { title: "创新与可持续", desc: "积极探索并倡导促进绿色经济与技术进步的前瞻性政策。", icon: Lightbulb },
      ],
      expertsTitle: "管理层与研究员",
      expertsDesc: "指导我们独立研究和分析的领先专家。",
      partnersTitle: "战略合作伙伴",
    }
  };

  const current = content[lang];

  return (
    <main className="flex-1 w-full pb-20">
      
      {/* 1. INTRODUCTION SECTION */}
      <section className="bg-white border-b border-slate-200 pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 translate-x-1/3 -translate-y-1/2"></div>
        
        <AnimatedSection className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#002b5c] mb-8">
            {current.title}
          </h1>
          
          {/* Language Switcher */}
          <div className="inline-flex bg-slate-100 p-1 rounded-full mb-12 shadow-inner">
            <button 
              onClick={() => setLang("MN")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${lang === "MN" ? "bg-white text-[#002b5c] shadow-sm" : "text-slate-500 hover:text-[#002b5c]"}`}
            >
              Монгол
            </button>
            <button 
              onClick={() => setLang("EN")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${lang === "EN" ? "bg-white text-[#002b5c] shadow-sm" : "text-slate-500 hover:text-[#002b5c]"}`}
            >
              English
            </button>
            <button 
              onClick={() => setLang("ZH")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${lang === "ZH" ? "bg-white text-[#002b5c] shadow-sm" : "text-slate-500 hover:text-[#002b5c]"}`}
            >
              中文
            </button>
          </div>

          <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light mb-6 text-left">
            {current.intro1}
          </p>
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light text-left">
            {current.intro2}
          </p>
        </AnimatedSection>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <AnimatedSection delay={0.1} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Eye className="w-8 h-8 text-[#115e59]" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#002b5c] mb-4">
              {current.visionTitle}
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              {current.visionDesc}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Target className="w-8 h-8 text-[#f59e0b]" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#002b5c] mb-4">
              {current.missionTitle}
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              {current.missionDesc}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002b5c] mb-6">
            {current.valuesTitle}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#115e59] to-[#002b5c] mx-auto rounded-full"></div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {current.values.map((val, i) => (
            <AnimatedSection 
              key={i} 
              delay={0.1 * i}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#002b5c] group-hover:text-white transition-colors duration-300 text-[#002b5c]">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[#002b5c] leading-tight">
                  {val.title}
                </h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                {val.desc}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 2. MANAGEMENT & RESEARCHERS SECTION */}
      <section className="py-24 px-6 bg-slate-100/50 border-y border-slate-100 mt-20">
        <AnimatedSection className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-6">
              <Users className="w-8 h-8 text-[#f59e0b]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002b5c] mb-4">
              {current.expertsTitle}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              {current.expertsDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {experts.length > 0 ? experts.map((expert, i) => {
              const expertName = lang === "EN" && expert.nameEn ? expert.nameEn : (lang === "ZH" && expert.nameZh ? expert.nameZh : expert.nameMn);
              const expertTitle = lang === "EN" && expert.titleEn ? expert.titleEn : (lang === "ZH" && expert.titleZh ? expert.titleZh : expert.titleMn);
              const expertBio = lang === "EN" && expert.bioEn ? expert.bioEn : (lang === "ZH" && expert.bioZh ? expert.bioZh : expert.bioMn);
              
              return (
                <AnimatedSection key={expert.id} delay={i * 0.1} className="group">
                  <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                    <div className="w-32 h-32 mx-auto rounded-full bg-slate-100 mb-6 overflow-hidden border-4 border-white shadow-md group-hover:border-[#115e59] transition-colors shrink-0">
                      {expert.photoUrl ? (
                        <img src={expert.photoUrl} alt={expertName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-300">
                          {expertName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-xl text-[#002b5c] mb-2">{expertName}</h3>
                    <p className="text-[#115e59] font-medium text-sm mb-4">{expertTitle}</p>
                    {expertBio && (
                      <p className="text-slate-500 text-sm leading-relaxed mt-auto text-left">
                        {expertBio}
                      </p>
                    )}
                  </div>
                </AnimatedSection>
              );
            }) : (
               <div className="col-span-4 text-center text-slate-500 py-10">Судлаачдын мэдээлэл ороогүй байна.</div>
            )}
          </div>
        </AnimatedSection>
      </section>

      {/* 3. PARTNERSHIPS SECTION */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <AnimatedSection className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-6">
            <Handshake className="w-8 h-8 text-[#115e59]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002b5c] mb-12">
            {current.partnersTitle}
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {/* Placeholders for partner logos */}
            <div className="text-2xl font-serif font-bold text-slate-400 hover:text-[#002b5c] transition-colors cursor-pointer">Global Fund</div>
            <div className="text-2xl font-serif font-bold text-slate-400 hover:text-[#002b5c] transition-colors cursor-pointer">Asia Institute</div>
            <div className="text-2xl font-serif font-bold text-slate-400 hover:text-[#002b5c] transition-colors cursor-pointer">Policy Center</div>
            <div className="text-2xl font-serif font-bold text-slate-400 hover:text-[#002b5c] transition-colors cursor-pointer">Eco Foundation</div>
            <div className="text-2xl font-serif font-bold text-slate-400 hover:text-[#002b5c] transition-colors cursor-pointer">Tech Initiative</div>
          </div>
        </AnimatedSection>
      </section>

    </main>
  );
}
