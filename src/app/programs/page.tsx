import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryFeedClient from "@/components/CategoryFeedClient";
import ExpertsAndPartners from "@/components/ExpertsAndPartners";

export const dynamic = 'force-dynamic';

export default async function ProgramsPage() {
  const articles = await prisma.article.findMany({
    where: { category: { slug: "programs" } },
    include: { author: true, category: true },
    orderBy: { publishedAt: "desc" }
  });

  const experts = await prisma.author.findMany({
    orderBy: { createdAt: "desc" }
  });

  const titleDict = {
    MN: "Судалгааны Хөтөлбөр",
    EN: "Research Programs",
    ZH: "研究项目"
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-[#001730]">
        <Navbar alwaysSolid={true} />
      </div>
      <CategoryFeedClient articles={articles} titleDict={titleDict} />
      <ExpertsAndPartners experts={experts} />
      <Footer />
    </div>
  );
}
