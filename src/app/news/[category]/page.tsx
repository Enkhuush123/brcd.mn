import prisma from "@/lib/prisma";
import NewsClient from "../NewsClient";
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

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-[#001730]"><Navbar alwaysSolid={true} /></div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-32">
        <NewsClient articles={articles} />
      </main>
      <Footer />
    </div>
  );
}
