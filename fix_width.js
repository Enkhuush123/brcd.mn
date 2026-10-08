const fs = require('fs');
let file = fs.readFileSync('src/app/articles/[slug]/page.tsx', 'utf8');
file = file.replace('max-w-4xl', 'max-w-5xl');
fs.writeFileSync('src/app/articles/[slug]/page.tsx', file, 'utf8');
