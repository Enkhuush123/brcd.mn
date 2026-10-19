import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClient from "./HomeClient";
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

  // Fetch research articles for Block 2 (Судалгааны чиглэл)
  const researchSlugs = [
    "programs",
    "eurasian-connectivity",
    "regional-geo-economics",
    "green-digital-transition",
  ];
  let researchArticles = await prisma.article.findMany({
    where: {
      OR: [
        { category: { slug: { in: researchSlugs } } },
        { categorySlugs: { hasSome: researchSlugs } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    take: 6,
    include: { author: true, category: true },
  });

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
      <HomeClient
        articles={articles}
        researchArticles={researchArticles}
        latestNews={latestNews}
      />
      <Footer />
    </div>
  );
}
