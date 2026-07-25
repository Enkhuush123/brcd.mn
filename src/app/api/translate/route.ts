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
    3. Return ONLY a valid JSON object matching this schema:
    {
      "titleEn": "...",
      "contentEn": "...",
      "titleZh": "...",
      "contentZh": "..."
    }
    
    Data to translate:
    Title: ${titleMn}
    Content: ${contentMn}`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: error.message || "Орчуулахад алдаа гарлаа. Дахин оролдоно уу." },
      { status: 500 },
    );
  }
}
