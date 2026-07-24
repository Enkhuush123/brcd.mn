import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";

export default async function Home() {
  // Fetch latest 4 articles
  const articles = await prisma.article.findMany({
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
    </div>
  );
}
