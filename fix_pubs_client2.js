const fs = require('fs');

let client = fs.readFileSync('src/app/publications/PublicationsClient.tsx', 'utf8');

// Replace the entire Content section
const contentStart = client.indexOf('{/* Content */}');
if (contentStart !== -1) {
  client = client.substring(0, contentStart) + `{/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {articles.map((article, i) => {
          const isTranslation = article.category?.nameMn.includes("Орчуулга") || article.titleMn.includes("Орчуулга");
          const title =  language === "ZH" && article.titleZh ? article.titleZh : article.titleMn;
          const authorName =  language === "ZH" && article.author?.nameZh ? article.author.nameZh : article.author?.nameMn;
          const categoryName =  language === "ZH" && article.category?.nameZh ? article.category.nameZh : article.category?.nameMn;

          return (
            <Link
              key={article.id}
              href={\`/articles/\${article.slug}\`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 border border-slate-100 h-full flex flex-col relative"
            >
              {isTranslation && (
                <div className="absolute top-4 right-4 z-20 bg-[#f59e0b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {current.translation}
                </div>
              )}
              <AnimatedSection delay={i * 0.1} className="flex flex-col h-full">
                <div className="h-48 bg-slate-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#002b5c]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ backgroundImage: \`url('\${article.imageUrl || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070'}')\` }}
                  ></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 items-center text-xs font-bold text-[#115e59] uppercase tracking-wider mb-4">
                    <span className="bg-[#115e59]/10 px-2 py-1 rounded text-[#115e59]">
                      {categoryName || "Нийтлэл"}
                    </span>
                    <span className="text-slate-400">
                      {new Date(article.publishedAt).toISOString().split('T')[0]}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#002b5c] mb-4 group-hover:text-[#115e59] transition-colors leading-snug line-clamp-3">
                    {title}
                  </h3>
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#002b5c]">
                      {(authorName || "C").charAt(0)}
                    </div>
                    <p className="text-sm text-slate-600 font-medium">
                      {authorName || current.researcher}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </Link>
          );
        })}

        {articles.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              {current.empty}
            </div>
        )}
      </div>
    </div>
  );
}
`;
}

fs.writeFileSync('src/app/publications/PublicationsClient.tsx', client, 'utf8');
