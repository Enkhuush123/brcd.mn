const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clean() {
  const articles = await prisma.article.findMany();
  for (const article of articles) {
    let changed = false;
    let data = {};
    
    if (article.contentMn && (article.contentMn.includes('\u200B') || article.contentMn.includes('\u00AD'))) {
      data.contentMn = article.contentMn.replace(/[\u200B\u00AD]/g, '');
      changed = true;
    }
    
    if (changed) {
      await prisma.article.update({
        where: { id: article.id },
        data
      });
      console.log("Cleaned article:", article.titleMn);
    }
  }
  console.log("Done");
}

clean().finally(() => prisma.$disconnect());
