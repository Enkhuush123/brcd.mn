import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpertsClient from "./ExpertsClient";

export const dynamic = "force-dynamic";

export default async function ExpertsPage() {
  const experts = await prisma.author.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-[#001730]">
        <Navbar alwaysSolid={true} />
      </div>
      <main className="flex-1">
        <ExpertsClient experts={experts} />
      </main>
      <Footer />
    </div>
  );
}
