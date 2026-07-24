"use client";

import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  isAlert?: boolean; // If true, only show "Ойлголоо" button
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
  isAlert = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
          <p className="text-slate-500 mb-8 leading-relaxed font-medium">{message}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!isAlert && (
              <button
                onClick={onCancel}
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors w-full sm:w-auto"
              >
                Үгүй, болих
              </button>
            )}
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-6 py-2.5 rounded-xl text-white font-bold transition-colors w-full sm:w-auto disabled:opacity-50 flex items-center justify-center gap-2
                ${isAlert ? 'bg-[#002b5c] hover:bg-[#001730]' : 'bg-red-500 hover:bg-red-600'}
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Түр хүлээнэ үү...
                </>
              ) : isAlert ? (
                "Ойлголоо"
              ) : (
                "Тийм, устгах"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
