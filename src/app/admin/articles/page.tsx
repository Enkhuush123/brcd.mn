import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import ArticleActions from "@/components/admin/ArticleActions";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      author: true
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#002b5c]">Нийтлэлүүд</h1>
        <Link href="/admin/articles/create" className="flex items-center gap-2 bg-[#115e59] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0f4d4a] transition-colors">
          <Plus className="w-5 h-5" />
          Шинэ нийтлэл
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-700 text-sm">Гарчиг</th>
                <th className="px-6 py-4 font-bold text-slate-700 text-sm">Ангилал</th>
                <th className="px-6 py-4 font-bold text-slate-700 text-sm">Судлаач</th>
                <th className="px-6 py-4 font-bold text-slate-700 text-sm">Огноо</th>
                <th className="px-6 py-4 font-bold text-slate-700 text-sm text-right">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    Одоогоор нийтлэл байхгүй байна.
                  </td>
                </tr>
              ) : (
                articles.map(article => (
                  <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{article.titleMn}</div>
                      {article.isFeatured && <span className="inline-block mt-1 text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">Онцлох</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{article.category.nameMn}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{article.author.nameMn}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{new Date(article.createdAt).toLocaleDateString("mn-MN")}</td>
                    <td className="px-6 py-4 text-right">
                      <ArticleActions id={article.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
