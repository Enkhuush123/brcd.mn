import prisma from "@/lib/prisma";
import CategoryFeedClient from "@/components/CategoryFeedClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function NewsCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;

  const articles = await prisma.article.findMany({
    where: {
      category: { slug: categorySlug }
    },
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true }
  });

  const titleMap: Record<string, { MN: string, EN: string, ZH: string }> = {
    "news": { MN: "Төвийн мэдээ", EN: "Center News", ZH: "中心新闻" },
    "events": { MN: "Хурал хэлэлцүүлэг", EN: "Meetings & Discussions", ZH: "会议与讨论" }
  };
  
  const titleDict = titleMap[categorySlug] || { MN: "Мэдээ", EN: "News", ZH: "新闻" };

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
