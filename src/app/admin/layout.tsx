"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, FolderOpen, FileArchive, LogOut, Globe2, Mail } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // If this is the login page, don't show the layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Хянах самбар", href: "/admin", icon: LayoutDashboard },
    { name: "Санал хүсэлт", href: "/admin/messages", icon: Mail },
    { name: "Нийтлэлүүд", href: "/admin/articles", icon: FileText },
    { name: "Ангилал", href: "/admin/categories", icon: FolderOpen },
    { name: "Судлаачид", href: "/admin/authors", icon: Users },
    { name: "Тайлан, товхимол", href: "/admin/documents", icon: FileArchive },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#001730] text-white flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center p-1">
            <img src="/logo.jpg" alt="Logo" onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }} className="w-full h-full object-contain" />
          </div>
          <span className="font-serif font-bold text-lg tracking-wide leading-tight">BCRD<br/>Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${
                  isActive
                    ? "bg-[#115e59] text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="mb-4 px-4">
            <p className="text-xs text-slate-400 font-medium">Нэвтэрсэн:</p>
            <p className="text-sm text-white font-bold truncate">{session?.user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors w-full font-medium text-sm"
          >
            <LogOut className="w-5 h-5" />
            Гарах
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
