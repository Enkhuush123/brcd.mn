import prisma from "@/lib/prisma";
import PublicationsClient from "./PublicationsClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function PublicationsPage() {
  // Fetch documents for Policy Briefs and Research Reports
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" }
  });

  // Fetch articles for Analysis & Articles
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true }
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-[#001730]"><Navbar alwaysSolid={true} /></div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-32">
        <PublicationsClient documents={documents} articles={articles} />
      </main>
      <Footer />
    </div>
  );
}
