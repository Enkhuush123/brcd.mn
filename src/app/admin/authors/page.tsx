import prisma from "@/lib/prisma";
import AuthorsClient from "./AuthorsClient";

export default async function AuthorsPage() {
  const authors = await prisma.author.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#002b5c] mb-8">Судлаачид удирдах</h1>
      <AuthorsClient initialAuthors={authors} />
    </div>
  );
}
