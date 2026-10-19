import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import slugify from "slugify";

function cleanText(str?: string | null): string {
  if (!str) return "";
  return str
    .replace(/&nbsp;/gi, " ")
    .replace(/[\u00A0]/g, " ")
    .replace(/[\u200B\u00AD\uFEFF]/g, "");
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Generate a slug based on titleMn
    let baseSlug = slugify(body.titleMn || "article", { lower: true, strict: true });
    if (!baseSlug) baseSlug = `article-${Date.now()}`;

    // Ensure slug uniqueness
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.article.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const contentMn = cleanText(body.contentMn);
    const contentZh = cleanText(body.contentZh);
    const contentEn = cleanText(body.contentEn);

    const categorySlugs = Array.isArray(body.categorySlugs) ? body.categorySlugs : [];

    const article = await prisma.article.create({
      data: {
        slug,
        titleMn: body.titleMn?.trim() || "",
        titleEn: body.titleEn?.trim() || "",
        titleZh: body.titleZh?.trim() || "",
        contentMn,
        contentEn: contentEn || "",
        contentZh: contentZh || "",
        categoryId: body.categoryId,
        categorySlugs,
        authorId: body.authorId,
        isFeatured: Boolean(body.isFeatured),
        isFeaturedNews: Boolean(body.isFeaturedNews),
        pdfUrl: body.pdfUrl || null,
        pdfUrlEn: body.pdfUrlEn || null,
        pdfUrlZh: body.pdfUrlZh || null,
        imageUrl: body.imageUrl || null,
      },
    });

    return NextResponse.json(article);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
