import type { Metadata } from "next";
import { Inter, Lora, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });
const lora = Lora({ subsets: ["latin", "cyrillic"], variable: "--font-serif-main" });
const notoSerifSC = Noto_Serif_SC({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-serif-sc" });

export const metadata: Metadata = {
  title: "BCRD | Хамтын Хөгжил Судалгааны Төв",
  description: "Евразийн холболт, гео-эдийн засаг болон Монгол-Хятадын харилцааны гүнзгийрүүлсэн судалгаа",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body className={`${inter.variable} ${lora.variable} ${notoSerifSC.variable} font-sans antialiased selection:bg-[#115e59] selection:text-white leading-relaxed`}>
        <Providers>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
