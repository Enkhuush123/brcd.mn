"use client";

import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function ArticleActions({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Dialog State
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isAlert: boolean;
  }>({ isOpen: false, title: "", message: "", isAlert: false });

  const closeDialog = () => setDialogConfig(prev => ({ ...prev, isOpen: false }));

  const requestDelete = () => {
    setDialogConfig({
      isOpen: true,
      title: "Анхааруулга",
      message: "Энэ нийтлэлийг устгахдаа итгэлтэй байна уу?",
      isAlert: false
    });
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        closeDialog();
        router.refresh();
      } else {
        const data = await res.json();
        setDialogConfig({ isOpen: true, title: "Алдаа", message: "Устгахад алдаа гарлаа: " + data.error, isAlert: true });
      }
    } catch (error) {
      setDialogConfig({ isOpen: true, title: "Алдаа", message: "Сервертэй холбогдоход алдаа гарлаа.", isAlert: true });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <ConfirmDialog 
        isOpen={dialogConfig.isOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        isAlert={dialogConfig.isAlert}
        isLoading={isDeleting}
        onConfirm={dialogConfig.isAlert ? closeDialog : confirmDelete}
        onCancel={closeDialog}
      />
      <div className="flex justify-end gap-2">
        <Link 
          href={`/admin/articles/${id}/edit`} 
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </Link>
        <button 
          onClick={requestDelete}
          disabled={isDeleting}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
