import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const doc = await prisma.document.create({
      data: {
        titleMn: body.titleMn,
        titleEn: body.titleEn,
        titleZh: body.titleZh,
        type: body.type,
        fileUrl: body.fileUrl,
        contentMn: body.contentMn,
        contentEn: body.contentEn,
        contentZh: body.contentZh,
      }
    });

    return NextResponse.json(doc);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
