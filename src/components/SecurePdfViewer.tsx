"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Maximize2, X } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function SecurePdfViewer({ url }: { url: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    if (!isOpen) return;
    
    // Initial width
    setContainerWidth(Math.min(window.innerWidth - 64, 1000));
    
    // Update on resize
    const handleResize = () => {
      setContainerWidth(Math.min(window.innerWidth - 64, 1000));
    };
    
    window.addEventListener("resize", handleResize);
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setLoading(false);
  }

  // Prevent context menu (right-click) to deter downloading
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 w-full py-4 bg-[#002b5c] hover:bg-[#115e59] text-white rounded-xl font-bold transition-colors shadow-lg active:scale-95"
      >
        <Maximize2 className="w-5 h-5" />
        PDF унших (Дарж үзэх)
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/95 backdrop-blur-sm">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-slate-900 text-white shadow-md">
            <div className="text-sm font-bold opacity-80">
              {numPages && !loading ? `Нийт ${numPages} хуудас` : "Уншиж байна..."}
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 bg-slate-800 hover:bg-red-600 rounded-full transition-colors"
              title="Хаах"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* PDF Container */}
          <div 
            className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center select-none"
            onContextMenu={handleContextMenu}
          >
            <div className="relative w-full max-w-5xl">
              {/* Overlay to prevent drag/drop/save */}
              <div className="absolute inset-0 z-10" />
              
              <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex flex-col items-center justify-center py-32 text-white/70">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                    <span className="font-medium text-lg">Баримт бичгийг бэлтгэж байна...</span>
                  </div>
                }
                error={
                  <div className="py-20 text-red-400 font-medium text-center">
                    Файлыг уншихад алдаа гарлаа. (PDF файл устгагдсан эсвэл гэмтэлтэй байж болзошгүй)
                  </div>
                }
                className="flex flex-col items-center"
              >
                {numPages && Array.from(new Array(numPages), (el, index) => (
                  <div key={`page_${index + 1}`} className="mb-6 bg-white shadow-2xl rounded-sm overflow-hidden flex justify-center">
                    <Page
                      pageNumber={index + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={containerWidth}
                    />
                  </div>
                ))}
              </Document>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
