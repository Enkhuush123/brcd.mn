import prisma from "@/lib/prisma";
import DocumentsClient from "./DocumentsClient";

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#002b5c] mb-8">Баримт бичиг / PDF удирдах</h1>
      <DocumentsClient initialDocuments={documents} />
    </div>
  );
}
