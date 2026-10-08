const fs = require('fs');

let put = fs.readFileSync('src/app/api/articles/[id]/route.ts', 'utf8');
put = put.replace(
  "const { titleMn, titleEn, titleZh, contentMn",
  "let { titleMn, titleEn, titleZh, contentMn"
);
fs.writeFileSync('src/app/api/articles/[id]/route.ts', put, 'utf8');

let post = fs.readFileSync('src/app/api/articles/route.ts', 'utf8');
post = post.replace(
  "const { titleMn, titleEn, titleZh, contentMn",
  "let { titleMn, titleEn, titleZh, contentMn"
);
fs.writeFileSync('src/app/api/articles/route.ts', post, 'utf8');

console.log("Fixed const assignment error");
