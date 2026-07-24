import prisma from "@/lib/prisma";
import CategoriesClient from "./CategoriesClient";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#002b5c] mb-8">Ангилал удирдах</h1>
      <CategoriesClient initialCategories={categories} />
    </div>
  );
}
