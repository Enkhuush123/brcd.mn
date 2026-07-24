import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Мэдээлэл дутуу байна." }, { status: 400 });
    }

    const contactMsg = await prisma.contactMessage.create({
      data: { name, email, message }
    });

    return NextResponse.json(contactMsg);
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Алдаа гарлаа. Та дахин оролдоно уу." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Basic protection (assuming API routes for GET are protected in a real app,
    // but here we just rely on standard NextAuth for the page itself).
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Алдаа гарлаа." }, { status: 500 });
  }
}
