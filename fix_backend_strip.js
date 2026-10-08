const fs = require('fs');

let put = fs.readFileSync('src/app/api/articles/[id]/route.ts', 'utf8');

// Inside PUT request before update
put = put.replace(
  "const article = await prisma.article.update({",
  `if (contentMn) contentMn = contentMn.replace(/[\\u200B\\u00AD]/g, '');\n      const article = await prisma.article.update({`
);

fs.writeFileSync('src/app/api/articles/[id]/route.ts', put, 'utf8');

let post = fs.readFileSync('src/app/api/articles/route.ts', 'utf8');

post = post.replace(
  "const article = await prisma.article.create({",
  `if (contentMn) contentMn = contentMn.replace(/[\\u200B\\u00AD]/g, '');\n      const article = await prisma.article.create({`
);

fs.writeFileSync('src/app/api/articles/route.ts', post, 'utf8');
