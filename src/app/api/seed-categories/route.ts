import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = [
      { slug: 'news', nameMn: 'Мэдээ', nameEn: 'News', nameZh: '新闻' },
      { slug: 'events', nameMn: 'Арга хэмжээ', nameEn: 'Events', nameZh: '活动' },
      { slug: 'translation', nameMn: 'Орчуулга', nameEn: 'Translation', nameZh: '翻译' },
      { slug: 'analysis', nameMn: 'Анализ', nameEn: 'Analysis', nameZh: '分析' },
      { slug: 'programs', nameMn: 'Судалгааны хөтөлбөр', nameEn: 'Research Programs', nameZh: '研究项目' },
      { slug: 'economic-statistics', nameMn: 'Эдийн засгийн статистик', nameEn: 'Economic Statistics', nameZh: '经济统计' },
      { slug: 'vision-2050', nameMn: 'Алсын хараа 2050', nameEn: 'Vision 2050', nameZh: '2050愿景' },
      { slug: 'investment-environment', nameMn: 'Хөрөнгө оруулалтын орчин', nameEn: 'Investment Environment', nameZh: '投资环境' },
      { slug: 'policy-brief', nameMn: 'Бодлогын зөвлөмж', nameEn: 'Policy Brief', nameZh: '政策简报' },
      { slug: 'research-report', nameMn: 'Судалгааны тайлан', nameEn: 'Research Report', nameZh: '研究报告' }
    ];

    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: cat,
        create: cat,
      });
    }

    return NextResponse.json({ success: true, message: "Categories seeded!" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
