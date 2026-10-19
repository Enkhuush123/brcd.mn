import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch 1-3 featured analytic articles for Block 1 (Онцлох анализ)
  let articles = await prisma.article.findMany({
    where: {
      OR: [
        { isFeatured: true },
        { category: { slug: "analysis" } },
        { categorySlugs: { has: "analysis" } }
      ]
    },
    orderBy: [
      { isFeatured: "desc" },
      { publishedAt: "desc" }
    ],
    take: 3,
    include: { author: true, category: true },
  });

  if (articles.length === 0) {
    articles = await prisma.article.findMany({
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { author: true, category: true },
    });
  }

  // Fetch news & updates for Block 4 (Төвийн мэдээ)
  let latestNews = await prisma.article.findMany({
    where: {
      OR: [
        { isFeaturedNews: true },
        { category: { slug: { in: ["news", "events"] } } },
        { categorySlugs: { hasSome: ["news", "events"] } }
      ]
    },
    orderBy: [
      { isFeaturedNews: "desc" },
      { publishedAt: "desc" }
    ],
    take: 7,
    include: { author: true, category: true },
  });

  if (latestNews.length === 0) {
    latestNews = await prisma.article.findMany({
      orderBy: { publishedAt: "desc" },
      take: 7,
      include: { author: true, category: true },
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-[#115e59] selection:text-white">
      <Navbar />
      <HomeClient articles={articles} latestNews={latestNews} />
      <Footer />
      <Link 
        href="/contact" 
        className="fixed bottom-8 right-8 z-50 bg-[#115e59] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        Холбоо барих
      </Link>
    </div>
  );
}
