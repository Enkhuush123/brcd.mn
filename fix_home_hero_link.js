const fs = require('fs');
let home = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

home = home.replace(
  'href="/publications"\n                className="w-full sm:w-auto bg-[#115e59]',
  'href="/publications/analysis"\n                className="w-full sm:w-auto bg-[#115e59]'
);

fs.writeFileSync('src/app/HomeClient.tsx', home, 'utf8');
