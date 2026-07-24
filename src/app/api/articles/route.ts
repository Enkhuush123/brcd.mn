import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Generate a slug based on titleMn
    let baseSlug = slugify(body.titleMn, { lower: true, strict: true });
    if (!baseSlug) baseSlug = `article-${Date.now()}`;

    // Ensure slug uniqueness
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.article.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const article = await prisma.article.create({
      data: {
        slug,
        titleMn: body.titleMn,
        titleEn: body.titleEn,
        titleZh: body.titleZh,
        contentMn: body.contentMn,
        contentEn: body.contentEn,
        contentZh: body.contentZh,
        categoryId: body.categoryId,
        authorId: body.authorId,
        isFeatured: body.isFeatured,
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
