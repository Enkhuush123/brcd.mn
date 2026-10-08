const fs = require('fs');
let home = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

home = home.replace(
  /href="\/publications"(\s*className="flex items-center gap-2 text-\[#f59e0b\])/g,
  'href="/publications/news"$1'
);

fs.writeFileSync('src/app/HomeClient.tsx', home, 'utf8');
