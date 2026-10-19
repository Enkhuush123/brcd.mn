import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

function cleanText(str?: string | null): string {
  if (!str) return "";
  return str
    .replace(/&nbsp;/gi, " ")
    .replace(/[\u00A0]/g, " ")
    .replace(/[\u200B\u00AD\uFEFF]/g, "");
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { titleMn, titleEn, titleZh, categoryId, authorId, isFeatured, isFeaturedNews, pdfUrl, pdfUrlEn, pdfUrlZh, imageUrl, categorySlugs } = body;

    if (!titleMn || !categoryId || !authorId || !body.contentMn) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contentMn = cleanText(body.contentMn);
    const contentZh = cleanText(body.contentZh);
    const contentEn = cleanText(body.contentEn);

    const article = await prisma.article.update({
      where: { id: (await params).id },
      data: {
        titleMn: titleMn.trim(),
        titleEn: titleEn ? titleEn.trim() : "",
        titleZh: titleZh ? titleZh.trim() : "",
        contentMn,
        contentEn: contentEn || "",
        contentZh: contentZh || "",
        categoryId,
        categorySlugs: Array.isArray(categorySlugs) ? categorySlugs : [],
        authorId,
        isFeatured: Boolean(isFeatured),
        isFeaturedNews: Boolean(isFeaturedNews),
        pdfUrl: pdfUrl || null,
        pdfUrlEn: pdfUrlEn || null,
        pdfUrlZh: pdfUrlZh || null,
        imageUrl: imageUrl || null
      }
    });

    return NextResponse.json(article);
  } catch (error: any) {
    console.error("Failed to update article", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.article.delete({
      where: { id: (await params).id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete article", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
