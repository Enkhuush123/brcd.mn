import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { titleMn, contentMn } = await req.json();

    if (!titleMn && !contentMn) {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 },
      );
    }

    // Escape content to avoid breaking the prompt
    const safeTitle = (titleMn || "").replace(/`/g, "'");
    const safeContent = (contentMn || "").replace(/`/g, "'");

    const prompt = `You are an expert translator for a policy research institute in Mongolia. 
Translate the following Mongolian title and rich HTML content into English and Chinese. 

IMPORTANT RULES:
1. Maintain all HTML tags EXACTLY as they are in the content. Do NOT strip or break HTML tags.
2. Only translate the text nodes inside the HTML.
3. Return ONLY a valid JSON object with these exact keys: titleEn, contentEn, titleZh, contentZh
4. Do NOT wrap the JSON in markdown code blocks.
5. If content is empty, return empty string for that field.

Title to translate: ${safeTitle}

Content to translate: ${safeContent}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    let text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    // Clean up: strip markdown code fences if present
    text = text.trim();
    if (text.startsWith("```json")) {
      text = text.slice(7);
    } else if (text.startsWith("```")) {
      text = text.slice(3);
    }
    if (text.endsWith("```")) {
      text = text.slice(0, -3);
    }
    text = text.trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (parseErr) {
      console.error("Failed to parse AI response:", text.substring(0, 500));
      return NextResponse.json(
        { error: "AI хариу зөв JSON формат биш байна. Дахин оролдоно уу." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      titleEn: parsed.titleEn || "",
      contentEn: parsed.contentEn || "",
      titleZh: parsed.titleZh || "",
      contentZh: parsed.contentZh || "",
    });
  } catch (error: any) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: error.message || "Орчуулахад алдаа гарлаа. Дахин оролдоно уу." },
      { status: 500 },
    );
  }
}

