import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryFeedClient from "@/components/CategoryFeedClient";

export const dynamic = 'force-dynamic';

export default async function InvestmentEnvironmentPage() {
  const articles = await prisma.article.findMany({
    where: { category: { slug: "investment-environment" } },
    include: { author: true, category: true },
    orderBy: { publishedAt: "desc" }
  });

  const titleDict = {
    MN: "Хөрөнгө оруулалтын орчин ба Эрх зүйн зохицуулалт",
    EN: "Investment Environment and Legal Framework",
    ZH: "投资环境与法律法规"
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
