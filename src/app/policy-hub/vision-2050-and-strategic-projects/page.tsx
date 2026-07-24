import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryFeedClient from "@/components/CategoryFeedClient";

export default async function Vision2050Page() {
  const articles = await prisma.article.findMany({
    where: { category: { slug: "vision-2050" } },
    include: { author: true, category: true },
    orderBy: { publishedAt: "desc" }
  });

  const titleDict = {
    MN: "Алсын хараа 2050 ба Стратегийн төслүүд",
    EN: "Vision 2050 and Strategic Projects",
    ZH: "2050愿景与战略项目"
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
