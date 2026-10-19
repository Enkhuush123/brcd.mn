import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PolicyHubClient from "./PolicyHubClient";

export const dynamic = "force-dynamic";

export default async function PolicyHubPage() {
  const policySlugs = [
    "policy-brief",
    "mongolia-economy-investment",
    "china-macro-policy",
    "bilateral-regional-integration",
    "analysis",
  ];

  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { category: { slug: { in: policySlugs } } },
        { categorySlugs: { hasSome: policySlugs } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true },
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-[#001730]">
        <Navbar alwaysSolid={true} />
      </div>
      <PolicyHubClient articles={articles} />
      <Footer />
    </div>
  );
}
