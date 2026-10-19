import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryFeedClient from "@/components/CategoryFeedClient";

export const dynamic = 'force-dynamic';

export default async function ProgramsPage() {
  const researchSlugs = [
    "programs",
    "eurasian-connectivity",
    "regional-geo-economics",
    "green-digital-transition"
  ];

  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { category: { slug: { in: researchSlugs } } },
        { categorySlugs: { hasSome: researchSlugs } }
      ]
    },
    include: { author: true, category: true },
    orderBy: { publishedAt: "desc" }
  });

  const titleDict = {
    MN: "Судалгааны чиглэл",
    ZH: "研究方向"
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
