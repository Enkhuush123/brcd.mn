const fs = require('fs');
let post = fs.readFileSync('src/app/api/articles/route.ts', 'utf8');

post = post.replace(
  "if (contentMn) contentMn = contentMn.replace(/[\\u200B\\u00AD]/g, '');",
  "if (body.contentMn) body.contentMn = body.contentMn.replace(/[\\u200B\\u00AD]/g, '');"
);

fs.writeFileSync('src/app/api/articles/route.ts', post, 'utf8');
