import prisma from "@/lib/prisma";
import CategoryFeedClient from "@/components/CategoryFeedClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function ProgramsCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ author?: string }>;
}) {
  const resolvedParams = await params;
  let categorySlug = resolvedParams.category;

  // Normalize aliases if used
  if (categorySlug === "geo-economics") categorySlug = "regional-geo-economics";
  if (categorySlug === "green-development") categorySlug = "green-digital-transition";

  const resolvedSearch = await searchParams;
  const authorId = resolvedSearch.author;

  const titleMap: Record<string, { MN: string; ZH: string }> = {
    "eurasian-connectivity": {
      MN: "Евразийн холболт ба Бүс ба Зам",
      ZH: "欧亚互联互通与“一带一路”",
    },
    "regional-geo-economics": {
      MN: "Бүс нутгийн гео-эдийн засаг ба Хөрөнгө оруулалт",
      ZH: "区域地缘经济与外商直接投资",
    },
    "green-digital-transition": {
      MN: "Ногоон эдийн засаг ба Дижитал шилжилт",
      ZH: "绿色经济与数字化转型",
    },
    "programs": {
      MN: "Судалгааны чиглэл",
      ZH: "研究方向",
    },
  };

  const titleDict = titleMap[categorySlug] || {
    MN: "Судалгааны чиглэл",
    ZH: "研究方向",
  };

  const whereClause: any = {
    OR: [
      { category: { slug: categorySlug } },
      { categorySlugs: { has: categorySlug } },
    ],
  };

  if (authorId) {
    whereClause.authorId = authorId;
  }

  const articles = await prisma.article.findMany({
    where: whereClause,
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true },
  });

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
