import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import DocumentReaderClient from "./DocumentReaderClient";

export default async function DocumentPage({ params }: { params: { id: string } }) {
  const document = await prisma.document.findUnique({
    where: { id: params.id }
  });

  if (!document) {
    notFound();
  }

  // If it has a fileUrl and somehow landed here, maybe redirect to it, but it shouldn't happen based on UI logic
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-[#001730]"><Navbar alwaysSolid={true} /></div>
      <main className="flex-1 w-full pb-20 pt-32">
        <DocumentReaderClient document={document} />
      </main>
      <Footer />
    </div>
  );
}
