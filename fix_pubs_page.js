const fs = require('fs');

let page = fs.readFileSync('src/app/publications/page.tsx', 'utf8');

// Remove the strict category filter
page = page.replace(`  const whereClause: any = {
    category: {
      slug: { in: ["policy-brief", "research-report", "analysis"] }
    }
  };`, `  const whereClause: any = {};`);

fs.writeFileSync('src/app/publications/page.tsx', page, 'utf8');
console.log("Updated publications page query");
