const fs = require('fs');

let post = fs.readFileSync('src/app/api/articles/route.ts', 'utf8');
post = post.replace('isFeatured: body.isFeatured,', 'isFeatured: body.isFeatured,\n        isFeaturedNews: body.isFeaturedNews,');
fs.writeFileSync('src/app/api/articles/route.ts', post, 'utf8');

let put = fs.readFileSync('src/app/api/articles/[id]/route.ts', 'utf8');
put = put.replace('isFeatured: body.isFeatured,', 'isFeatured: body.isFeatured,\n        isFeaturedNews: body.isFeaturedNews,');
fs.writeFileSync('src/app/api/articles/[id]/route.ts', put, 'utf8');
