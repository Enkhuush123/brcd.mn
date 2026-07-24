"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createArticle(formData: FormData) {
  const titleMn = formData.get("titleMn") as string;
  const contentMn = formData.get("contentMn") as string;
  const categoryId = formData.get("categoryId") as string;
  
  if (!titleMn || !contentMn) {
    throw new Error("Гарчиг болон агуулга хоосон байж болохгүй.");
  }

  // Create a default category and author if they don't exist just for the demo
  // In a real app, they would be selected from a dropdown.
  let category = await prisma.category.findFirst();
  if (!category) {
    category = await prisma.category.create({
      data: { nameMn: "Мэдээ", nameEn: "News", nameZh: "新闻", slug: "news" }
    });
  }

  let author = await prisma.author.findFirst();
  if (!author) {
    author = await prisma.author.create({
      data: { nameMn: "Админ", nameEn: "Admin", nameZh: "管理员" }
    });
  }

  const slug = titleMn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();

  await prisma.article.create({
    data: {
      titleMn,
      titleEn: formData.get("titleEn") as string || titleMn,
      titleZh: formData.get("titleZh") as string || titleMn,
      contentMn,
      contentEn: formData.get("contentEn") as string || contentMn,
      contentZh: formData.get("contentZh") as string || contentMn,
      slug,
      categoryId: category.id,
      authorId: author.id,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/articles");
}
