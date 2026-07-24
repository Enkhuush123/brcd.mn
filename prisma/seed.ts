import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { slug: 'news', nameMn: 'Мэдээ', nameEn: 'News', nameZh: '新闻' },
    { slug: 'events', nameMn: 'Арга хэмжээ', nameEn: 'Events', nameZh: '活动' },
    { slug: 'translation', nameMn: 'Орчуулга', nameEn: 'Translation', nameZh: '翻译' },
    { slug: 'analysis', nameMn: 'Анализ', nameEn: 'Analysis', nameZh: '分析' }
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
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
