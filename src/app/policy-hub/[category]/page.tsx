import prisma from "@/lib/prisma";
import CategoryFeedClient from "@/components/CategoryFeedClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function PolicyHubCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ author?: string }>;
}) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;

  const resolvedSearch = await searchParams;
  const authorId = resolvedSearch.author;

  const titleMap: Record<string, { MN: string; ZH: string }> = {
    "mongolia-economy-investment": {
      MN: "Монголын эдийн засаг, хөрөнгө оруулалт",
      ZH: "蒙古经济与投资",
    },
    "china-macro-policy": {
      MN: "Хятадын макро эдийн засаг, бодлого",
      ZH: "中国宏观经济与政策",
    },
    "bilateral-regional-integration": {
      MN: "Хоёр талт болон Бүс нутгийн интеграци",
      ZH: "双边与区域一体化",
    },
    "policy-brief": {
      MN: "Бодлогын тойм",
      ZH: "政策述评",
    },
  };

  const titleDict = titleMap[categorySlug] || {
    MN: "Бодлогын тойм",
    ZH: "政策述评",
  };

  // We find articles either matching this exact category slug, or tagged via categorySlugs
  const whereClause: any = {
    OR: [
      { category: { slug: categorySlug } },
      { categorySlugs: { has: categorySlug } },
    ],
  };

  if (authorId) {
    whereClause.authorId = authorId;
  }

  let articles = await prisma.article.findMany({
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
