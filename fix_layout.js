const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Change latestNews query to remove where: { isFeaturedNews: true }
content = content.replace(/const latestNews = await prisma\.article\.findMany\(\{\s*where:\s*\{\s*isFeaturedNews:\s*true\s*\},\s*orderBy:/g, 'const latestNews = await prisma.article.findMany({\n    orderBy:');

fs.writeFileSync('src/app/page.tsx', content, 'utf8');

let client = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

// Extract blocks from HomeClient.tsx
let hero = client.match(/\{\/\* BLOCK 1: Hero Section \*\/\}(.*?)(?=\{\/\* BLOCK 4: Latest Insights \*\/)/s)[0];
let insights = client.match(/\{\/\* BLOCK 4: Latest Insights \*\/\}(.*?)(?=\{\/\* BLOCK 2: Research Programs \*\/)/s)[0];
let programs = client.match(/\{\/\* BLOCK 2: Research Programs \*\/\}(.*?)(?=\{\/\* BLOCK 3: Mongolia Policy Hub \*\/)/s)[0];
let hub = client.match(/\{\/\* BLOCK 3: Mongolia Policy Hub \*\/\}(.*?)(?=\{\/\* BLOCK 5: Center News \*\/)/s)[0];
let news = client.match(/\{\/\* BLOCK 5: Center News \*\/\}(.*?)(?=<ExpertsAndPartners)/s)[0];

// New order: Hero -> News -> Programs -> Hub -> Insights
let new_jsx = hero + "\n      " + news + "\n      " + programs + "\n      " + hub + "\n      " + insights + "\n      ";

client = client.replace(/\{\/\* BLOCK 1: Hero Section \*\/\}(.*?)(?=<ExpertsAndPartners)/s, new_jsx);

fs.writeFileSync('src/app/HomeClient.tsx', client, 'utf8');

console.log("Restored order in HomeClient.tsx and removed filter in page.tsx");
