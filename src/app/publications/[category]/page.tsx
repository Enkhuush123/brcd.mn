import prisma from "@/lib/prisma";
import PublicationsClient from "../PublicationsClient";
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

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#115e59] selection:text-white flex flex-col">
      <Navbar alwaysSolid={true} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-32 md:py-40">
        <PublicationsClient articles={articles} />
      </main>
      <Footer />
    </div>
  );
}
