import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const author = await prisma.author.create({
      data: {
        nameMn: body.nameMn,
        nameEn: body.nameEn,
        nameZh: body.nameZh,
        titleMn: body.titleMn,
        titleEn: body.titleEn,
        titleZh: body.titleZh,
      }
    });

    return NextResponse.json(author);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
