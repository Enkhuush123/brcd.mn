import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PolicyHubPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#001730] text-white">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-40 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">Mongolia Policy Hub</h1>
        <p className="text-white/70">Хятадын хөрөнгө оруулагчид, судлаачдад зориулсан Монголын бодлогын нэгдсэн мэдээлэл энд байрлана.</p>
      </main>
      <Footer />
    </div>
  );
}
