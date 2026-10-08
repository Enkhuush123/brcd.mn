const fs = require('fs');

let post = fs.readFileSync('src/app/api/articles/[id]/route.ts', 'utf8');

// The destructuring:
post = post.replace('isFeatured, pdfUrl', 'isFeatured, isFeaturedNews, pdfUrl');
post = post.replace('isFeatured,\n        pdfUrl,', 'isFeatured,\n        isFeaturedNews,\n        pdfUrl,');

fs.writeFileSync('src/app/api/articles/[id]/route.ts', post, 'utf8');
