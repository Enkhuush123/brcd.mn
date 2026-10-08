const fs = require('fs');

let client = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

// The news block viewAll link
client = client.replace('href="/news"', 'href="/publications"');

fs.writeFileSync('src/app/HomeClient.tsx', client, 'utf8');
console.log("Updated HomeClient viewAll link");
