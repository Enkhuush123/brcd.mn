import prisma from '../src/lib/prisma';

async function main() {
  const categories = [
    { slug: 'news', nameMn: 'Мэдээ', nameEn: 'News', nameZh: '新闻' },
    { slug: 'events', nameMn: 'Арга хэмжээ', nameEn: 'Events', nameZh: '活动' },
    { slug: 'translation', nameMn: 'Орчуулга', nameEn: 'Translation', nameZh: '翻译' },
    { slug: 'analysis', nameMn: 'Анализ', nameEn: 'Analysis', nameZh: '分析' },
    { slug: 'programs', nameMn: 'Судалгааны хөтөлбөр', nameEn: 'Research Programs', nameZh: '研究项目' },
    { slug: 'economic-statistics', nameMn: 'Эдийн засгийн статистик', nameEn: 'Economic Statistics', nameZh: '经济统计' },
    { slug: 'vision-2050', nameMn: 'Алсын хараа 2050', nameEn: 'Vision 2050', nameZh: '2050愿景' },
    { slug: 'investment-environment', nameMn: 'Хөрөнгө оруулалтын орчин', nameEn: 'Investment Environment', nameZh: '投资环境' }
  ];

  console.log("Upserting categories...");
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    console.log(`- ${cat.nameMn}`);
  }
  
  console.log("Categories seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
