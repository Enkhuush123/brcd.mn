import { NextResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { titleMn, titleEn, titleZh, contentMn, contentEn, contentZh, categoryId, authorId, isFeatured, pdfUrl } = body;

    if (!titleMn || !categoryId || !authorId || !contentMn) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate new slug if titleMn changed (this is simplistic, in reality you might keep the old slug to avoid breaking links)
    // We will just keep the old slug, or generate a new one if you prefer.
    // Usually it's better to NOT change the slug on edit, but we'll leave it as is unless specifically requested.
    
    const article = await prisma.article.update({
      where: { id: (await params).id },
      data: {
        titleMn,
        titleEn,
        titleZh,
        contentMn,
        contentEn,
        contentZh,
        categoryId,
        authorId,
        isFeatured,
        pdfUrl
      }
    });

    return NextResponse.json(article);
  } catch (error: any) {
    console.error("Failed to update article", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
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
