import prisma from "@/lib/prisma";
import CategoryFeedClient from "@/components/CategoryFeedClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function PublicationsCategoryPage({ params, searchParams }: { params: Promise<{ category: string }>, searchParams: Promise<{ author?: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  
  const resolvedSearch = await searchParams;
  const authorId = resolvedSearch.author;

  const whereClause: any = {
    OR: [
      { category: { slug: categorySlug } },
      { categorySlugs: { has: categorySlug } },
    ]
  };
  
  if (authorId) {
    whereClause.authorId = authorId;
  }

  const articles = await prisma.article.findMany({
    where: whereClause,
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true }
  });

  const titleMap: Record<string, { MN: string, ZH: string }> = {
    "analysis": { MN: "Аналитик нийтлэл", ZH: "分析文章" },
    "news": { MN: "Онцлох мэдээ, тойм", ZH: "重点资讯与综述" },
    "translation": { MN: "Орчуулга, эх сурвалж", ZH: "翻译与文献资料" }
  };
  
  const titleDict = titleMap[categorySlug] || { MN: "Нийтлэл", ZH: "资讯与文章" };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-[#001730]">
        <Navbar alwaysSolid={true} />
      </div>
      <CategoryFeedClient articles={articles} titleDict={titleDict} />
      <Footer />
    </div>
  );
}
