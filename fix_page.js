const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Change latestNews query to include where: { isFeaturedNews: true }
content = content.replace(/const latestNews = await prisma\.article\.findMany\(\{\s*orderBy:/g, 'const latestNews = await prisma.article.findMany({\n    where: { isFeaturedNews: true },\n    orderBy:');

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
