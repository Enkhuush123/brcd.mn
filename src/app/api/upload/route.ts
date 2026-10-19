import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // 1. Try Supabase Storage if configured with real URL and key
    const isSupabaseConfigured =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("localhost") &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "dummy";

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.storage
          .from("bcrd_bucket")
          .upload(filePath, file, {
            contentType: file.type,
            upsert: false,
          });

        if (!error) {
          const {
            data: { publicUrl },
          } = supabase.storage.from("bcrd_bucket").getPublicUrl(filePath);
          return NextResponse.json({ url: publicUrl });
        }
        console.warn("Supabase upload returned error, falling back to local storage:", error.message);
      } catch (err) {
        console.warn("Supabase upload exception, falling back to local storage:", err);
      }
    }

    // 2. Safe Local Storage Fallback: writes to public/uploads/...
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await fs.mkdir(uploadDir, { recursive: true });
    const fullPath = path.join(uploadDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(fullPath, buffer);

    return NextResponse.json({ url: `/uploads/${folder}/${fileName}` });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
