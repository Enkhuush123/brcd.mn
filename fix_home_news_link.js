const fs = require('fs');
let home = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

// Second Link that has text-[#f59e0b] font-bold... is the news one.
home = home.replace(
  'href="/publications"\n                className="flex items-center gap-2 text-[#f59e0b]',
  'href="/publications/news"\n                className="flex items-center gap-2 text-[#f59e0b]'
);

fs.writeFileSync('src/app/HomeClient.tsx', home, 'utf8');
