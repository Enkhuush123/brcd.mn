"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";
import { Landmark, Globe2, BookOpen } from "lucide-react";

export default function PartnersClient() {
  const { language } = useLanguage();

  const content = {
    MN: {
      title: "Түншлэл хамтын ажиллагаа",
      intro: "\"Нэг бүс нэг зам\" Хамтын хөгжил судалгааны төв нь Монгол Улсын урт хугацааны хөгжлийн бодлого болон \"Бүс ба Зам\" санаачилгын хүрээнд хил дамнасан судалгаа, төсөл хөтөлбөр хэрэгжүүлэх зорилгоор дотоод, гадаадын түнш байгууллагуудтай нягт хамтран ажилладаг.",
      categories: [
        {
          name: "Төрийн болон дипломат байгууллагууд",
          icon: Landmark,
          partners: [
            "Монгол Улсын Эдийн засаг, хөгжлийн яам",
            "БНХАУ-аас Монгол Улсад суугаа Элчин сайдын яам"
          ]
        },
        {
          name: "Судалгаа, эрдэм шинжилгээний байгууллагууд",
          icon: BookOpen,
          partners: [
            "Фүдань их сургуулийн \"Бүс ба Зам ба Глобал засаглалын хүрээлэн\"",
            "\"Бүс ба Зам\" Тяньжиний стратегийн судалгааны хүрээлэн",
            "Гуандуны Олон улсын стратегийн судалгааны хүрээлэн",
            "Алс Дорнодын Глобал Технологийн Аж Үйлдвэрийн Академи (Хонг Конг)"
          ]
        },
        {
          name: "Олон улсын соёл, мэдээлэл болон хэвлэн нийтлэх хамтын ажиллагаа",
          icon: Globe2,
          partners: [
            "БНХАУ-ын Гадаад хэлээр хэвлэн нийтлэх Хороо (CICG) (Төрийн Зөвлөлийн харьяа)",
            "Илинь хэвлэлийн хороо (Yilin Press)",
            "CGTN (Mongolia)",
            "\"C2M\" глобал платформ",
            "S.M.I.A Инновацийн холбоо",
            "\"Ай Эс Ди Рүби паблишинг\""
          ]
        }
      ]
    },
    EN: {
      title: "Partnership & Cooperation",
      intro: "The Mongolian \"Belt and Road\" Co-Development Research Center works closely with domestic and foreign partner organizations to implement cross-border research and projects within the framework of Mongolia's long-term development policies and the \"Belt and Road\" initiative.",
      categories: [
        {
          name: "Government and Diplomatic Organizations",
          icon: Landmark,
          partners: [
            "Ministry of Economy and Development of Mongolia",
            "Embassy of the People's Republic of China in Mongolia"
          ]
        },
        {
          name: "Research and Academic Institutions",
          icon: BookOpen,
          partners: [
            "Fudan University \"Belt and Road and Global Governance Institute\"",
            "Tianjin Strategic Research Institute for \"Belt and Road\"",
            "Guangdong Institute for International Strategic Studies",
            "Far East Global Technology Industry Academy (Hong Kong)"
          ]
        },
        {
          name: "International Cultural, Information and Publishing Cooperation",
          icon: Globe2,
          partners: [
            "China International Communications Group (CICG)",
            "Yilin Press",
            "CGTN (Mongolia)",
            "\"C2M\" Global Platform",
            "S.M.I.A Innovation Alliance",
            "ISD Ruby Publishing"
          ]
        }
      ]
    },
    ZH: {
      title: "伙伴关系与合作",
      intro: "蒙古国“一带一路”共同发展研究中心与国内外合作机构密切配合，在蒙古国长期发展政策及“一带一路”倡议框架内，积极开展跨国研究及项目合作。",
      categories: [
        {
          name: "政府与外交机构",
          icon: Landmark,
          partners: [
            "蒙古国经济与发展部",
            "中华人民共和国驻蒙古国大使馆"
          ]
        },
        {
          name: "研究与学术机构",
          icon: BookOpen,
          partners: [
            "复旦大学“一带一路”及全球治理研究院",
            "天津“一带一路”战略研究院",
            "广东国际战略研究院",
            "远东全球科技产业学院（香港）"
          ]
        },
        {
          name: "国际文化、信息与出版合作",
          icon: Globe2,
          partners: [
            "中国外文出版发行事业局 (CICG)",
            "译林出版社",
            "CGTN（蒙古）",
            "“C2M”全球平台",
            "S.M.I.A 创新联盟",
            "ISD Ruby Publishing"
          ]
        }
      ]
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <section className="py-24 md:py-32 px-6 bg-slate-50 min-h-screen">
      <AnimatedSection className="max-w-4xl mx-auto text-center mb-16 mt-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#002b5c] mb-8">
          {t.title}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed text-justify md:text-center">
          {t.intro}
        </p>
      </AnimatedSection>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.categories.map((category, idx) => (
          <AnimatedSection key={idx} delay={idx * 0.1} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-[#115e59]">
              <category.icon className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-[#002b5c] mb-6 leading-tight min-h-[56px]">
              {category.name}
            </h2>
            <ul className="space-y-4">
              {category.partners.map((partner, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-2 shrink-0"></div>
                  <span className="text-slate-600 font-medium leading-relaxed">{partner}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
