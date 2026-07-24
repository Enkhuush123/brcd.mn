import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { titleMn, titleEn, titleZh, fileUrl, type, contentMn, contentEn, contentZh } = await req.json();

    if (!titleMn || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const doc = await prisma.document.update({
      where: { id: (await params).id },
      data: {
        titleMn,
        titleEn,
        titleZh,
        type,
        fileUrl: fileUrl || null,
        contentMn: contentMn || null,
        contentEn: contentEn || null,
        contentZh: contentZh || null,
      }
    });

    return NextResponse.json(doc);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.document.delete({
      where: { id: (await params).id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
