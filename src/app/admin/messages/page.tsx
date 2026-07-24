import prisma from "@/lib/prisma";
import MessagesClient from "./MessagesClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#002b5c]">Санал хүсэлт</h1>
        <p className="text-slate-500">Вэбсайтаас ирсэн холбогдох мессежүүд</p>
      </div>
      <MessagesClient initialMessages={messages} />
    </div>
  );
}
