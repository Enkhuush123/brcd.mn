import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });
const notoSerifSC = Noto_Serif_SC({ weight: ["400", "700"], subsets: ["latin"] });

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
      <body className={`${inter.className} ${notoSerifSC.className} antialiased selection:bg-[#115e59] selection:text-white`}>
        <Providers>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
