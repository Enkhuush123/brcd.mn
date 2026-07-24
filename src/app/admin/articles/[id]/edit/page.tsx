import prisma from "@/lib/prisma";
import ArticleForm from "@/components/admin/ArticleForm";
import { notFound } from "next/navigation";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id }
  });

  if (!article) {
    notFound();
  }

  const categories = await prisma.category.findMany();
  const authors = await prisma.author.findMany();

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#002b5c] mb-8">Нийтлэл засах</h1>
      <ArticleForm initialData={article} categories={categories} authors={authors} />
    </div>
  );
}
