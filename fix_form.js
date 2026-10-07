const fs = require('fs');
let content = fs.readFileSync('src/components/admin/ArticleForm.tsx', 'utf8');

// Add to default state
content = content.replace('isFeatured: initialData?.isFeatured || false,', 'isFeatured: initialData?.isFeatured || false,\n      isFeaturedNews: initialData?.isFeaturedNews || false,');

// Add checkbox for isFeaturedNews
const checkbox = `        <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200">
          <input
            type="checkbox"
            id="featuredNews"
            checked={formData.isFeaturedNews}
            onChange={(e) =>
              setFormData({ ...formData, isFeaturedNews: e.target.checked })
            }
            className="w-5 h-5"
          />
          <label htmlFor="featuredNews" className="font-medium text-slate-700">
            Онцлох мэдээнд харуулах (Блок 5)
          </label>
        </div>`;

content = content.replace('<label htmlFor="featured" className="font-medium text-slate-700">', '<label htmlFor="featured" className="font-medium text-slate-700">\n            Онцлох анализд харуулах (Блок 1)\n          </label>\n        </div>\n' + checkbox + '\n        <div style={{display: "none"}}>');
content = content.replace('Онцлох нийтлэл болгох', '');

fs.writeFileSync('src/components/admin/ArticleForm.tsx', content, 'utf8');

let routePost = fs.readFileSync('src/app/api/articles/route.ts', 'utf8');
routePost = routePost.replace('isFeatured: data.isFeatured,', 'isFeatured: data.isFeatured,\n        isFeaturedNews: data.isFeaturedNews,');
fs.writeFileSync('src/app/api/articles/route.ts', routePost, 'utf8');

let routePut = fs.readFileSync('src/app/api/articles/[id]/route.ts', 'utf8');
routePut = routePut.replace('isFeatured: data.isFeatured,', 'isFeatured: data.isFeatured,\n        isFeaturedNews: data.isFeaturedNews,');
fs.writeFileSync('src/app/api/articles/[id]/route.ts', routePut, 'utf8');

console.log("Updated ArticleForm and API routes");
