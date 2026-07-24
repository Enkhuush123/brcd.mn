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
    category: { slug: categorySlug }
  };
  
  if (authorId) {
    whereClause.authorId = authorId;
  }

  const articles = await prisma.article.findMany({
    where: whereClause,
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true }
  });

  const titleMap: Record<string, { MN: string, EN: string, ZH: string }> = {
    "policy-brief": { MN: "Бодлогын зөвлөмж", EN: "Policy Briefs", ZH: "政策简报" },
    "research-report": { MN: "Судалгааны тайлан", EN: "Research Reports", ZH: "研究报告" },
    "analysis": { MN: "Аналитик нийтлэл", EN: "Analytical Articles", ZH: "分析文章" }
  };
  
  const titleDict = titleMap[categorySlug] || { MN: "Нийтлэл", EN: "Publications", ZH: "出版物" };

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
