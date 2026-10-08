const fs = require('fs');

let page = fs.readFileSync('src/app/publications/[category]/page.tsx', 'utf8');

// Update the title map
page = page.replace(/const titleMap: Record<string, { MN: string, EN: string, ZH: string }> = \{.*?\};/s, 
`const titleMap: Record<string, { MN: string, EN: string, ZH: string }> = {
    "analysis": { MN: "Аналитик нийтлэл", EN: "Analysis", ZH: "分析文章" },
    "news": { MN: "Онцлох мэдээ, тойм", EN: "Featured News", ZH: "重点资讯与综述" },
    "translation": { MN: "Орчуулга, эх сурвалж", EN: "Translations & Sources", ZH: "翻译与文献资料" }
  };`);

fs.writeFileSync('src/app/publications/[category]/page.tsx', page, 'utf8');

// Also update Navbar to use the correct slugs
let nav = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
nav = nav.replace('href: "/publications/featured-news"', 'href: "/publications/news"');
nav = nav.replace('href: "/publications/translations-sources"', 'href: "/publications/translation"');
fs.writeFileSync('src/components/Navbar.tsx', nav, 'utf8');

// And update HomeClient to link to the correct sub-pages
let home = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');
// The news block viewAll (currently /publications) should link to /publications/news
home = home.replace(
  /\{t\.newsTitle\}\s*<\/h2>\s*<div[^>]*><\/div>\s*<\/div>\s*<Link\s*href="\/publications"\s*className="hidden md:flex/g, 
  `{t.newsTitle}
                </h2>
                <div className="w-20 h-1.5 bg-[#f59e0b] rounded-full"></div>
              </div>
              <Link
                href="/publications/news"
                className="hidden md:flex`
);

// The insights block viewAll (currently /publications) should link to /publications/analysis
home = home.replace(
  /\{t\.insightTitle\}\s*<\/h2>\s*<div[^>]*><\/div>\s*<\/div>\s*<Link\s*href="\/publications"\s*className="flex items-center gap-2/g,
  `{t.insightTitle}
                </h2>
                <div className="w-20 h-1.5 bg-[#002b5c] rounded-full"></div>
              </div>
              <Link
                href="/publications/analysis"
                className="flex items-center gap-2`
);
fs.writeFileSync('src/app/HomeClient.tsx', home, 'utf8');

console.log("Updated slugs in Navbar, HomeClient, and [category]/page.tsx");
