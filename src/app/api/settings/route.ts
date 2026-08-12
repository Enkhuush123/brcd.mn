import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Ensure settings exist
async function getOrCreateSettings() {
  let settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        phone: "+976 7700-0000",
        email: "info@bcrd.mn",
      }
    });
  }
  return settings;
}

export async function GET() {
  try {
    const settings = await getOrCreateSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { phone, email } = body;

    const settings = await getOrCreateSettings();
    
    const updated = await prisma.siteSettings.update({
      where: { id: settings.id },
      data: {
        phone: phone || settings.phone,
        email: email || settings.email,
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
