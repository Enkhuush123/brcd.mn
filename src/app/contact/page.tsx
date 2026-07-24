import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactClient from "./ContactClient";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-[#001730]"><Navbar alwaysSolid={true} /></div>
      <main className="flex-1 w-full">
        <ContactClient />
      </main>
      <Footer />
    </div>
  );
}
