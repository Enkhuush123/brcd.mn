import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryFeedClient from "@/components/CategoryFeedClient";

export const dynamic = 'force-dynamic';

export default async function EconomicStatisticsPage() {
  const articles = await prisma.article.findMany({
    where: { category: { slug: "economic-statistics" } },
    include: { author: true, category: true },
    orderBy: { publishedAt: "desc" }
  });

  const titleDict = {
    MN: "Эдийн засгийн статистик, дата",
    EN: "Economic Statistics and Data",
    ZH: "经济统计数据"
  };

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
