import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleViewClient from "./ArticleViewClient";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      author: true,
      category: true,
    }
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#115e59] selection:text-white flex flex-col">
      <Navbar alwaysSolid={true} />
      <ArticleViewClient article={article} />
      <Footer />
    </div>
  );
}
