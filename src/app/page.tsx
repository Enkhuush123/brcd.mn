import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch latest 4 articles
  const articles = await prisma.article.findMany({
    where: { isFeatured: true },
    orderBy: { publishedAt: "desc" },
    take: 4,
    include: { author: true, category: true },
  });

  // Fetch experts (authors)
  const experts = await prisma.author.findMany({
    take: 4,
    orderBy: { nameMn: "asc" }
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-[#115e59] selection:text-white">
      <Navbar />
      <HomeClient articles={articles} experts={experts} />
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
