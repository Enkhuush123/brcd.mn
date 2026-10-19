import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpertProfileClient from "./ExpertProfileClient";

export const dynamic = "force-dynamic";

export default async function ExpertProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const expertId = resolvedParams.id;

  const expert = await prisma.author.findUnique({
    where: { id: expertId },
  });

  if (!expert) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar alwaysSolid={true} />
        <main className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl text-slate-500 font-bold">Expert not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const articles = await prisma.article.findMany({
    where: { authorId: expertId },
    orderBy: { publishedAt: "desc" },
    include: { category: true, author: true },
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar alwaysSolid={true} />
      <ExpertProfileClient expert={expert} articles={articles} />
      <Footer />
    </div>
  );
}
