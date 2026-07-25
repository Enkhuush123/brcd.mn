import prisma from "@/lib/prisma";
import AboutClient from "./AboutClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  // Fetch experts from the database
  const experts = await prisma.author.findMany({
    orderBy: { nameMn: "asc" }
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-[#115e59] selection:text-white">
      <div className="bg-[#001730]">
        <Navbar alwaysSolid={true} />
      </div>
      
      <AboutClient experts={experts} />
      
      <Footer />
    </div>
  );
}
