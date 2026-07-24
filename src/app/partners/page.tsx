import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersClient from "./PartnersClient";

export const dynamic = "force-dynamic";

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-[#001730]">
        <Navbar alwaysSolid={true} />
      </div>
      <main className="flex-1">
        <PartnersClient />
      </main>
      <Footer />
    </div>
  );
}
