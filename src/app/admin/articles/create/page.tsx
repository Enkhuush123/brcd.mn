import prisma from "@/lib/prisma";
import ArticleForm from "@/components/admin/ArticleForm";

export default async function CreateArticlePage() {
  const categories = await prisma.category.findMany();
  const authors = await prisma.author.findMany();

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#002b5c] mb-8">Шинэ нийтлэл нэмэх</h1>
      <ArticleForm categories={categories} authors={authors} />
    </div>
  );
}
