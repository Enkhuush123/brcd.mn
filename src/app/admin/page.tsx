import prisma from "@/lib/prisma";
import { FileText, Users, FolderOpen, FileArchive } from "lucide-react";

export default async function AdminDashboard() {
  const articlesCount = await prisma.article.count();
  const authorsCount = await prisma.author.count();
  const categoriesCount = await prisma.category.count();
  const docsCount = await prisma.document.count();

  const stats = [
    { label: "Нийтлэлүүд", count: articlesCount, icon: FileText, color: "bg-blue-50 text-blue-600" },
    { label: "Судлаачид", count: authorsCount, icon: Users, color: "bg-green-50 text-green-600" },
    { label: "Ангилалууд", count: categoriesCount, icon: FolderOpen, color: "bg-orange-50 text-orange-600" },
    { label: "Тайлангууд", count: docsCount, icon: FileArchive, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#002b5c] mb-8">Хянах самбар</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-800">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
