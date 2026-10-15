import type { Metadata } from "next";
import { Inter, Lora, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });
const lora = Lora({ subsets: ["latin", "cyrillic"], variable: "--font-serif-main" });
const notoSerifSC = Noto_Serif_SC({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-serif-sc" });

export const metadata: Metadata = {
  metadataBase: new URL("https://brcd-mongolia.org"),
  title: "BCRD | Хамтын Хөгжил Судалгааны Төв",
  description: "Евразийн холболт, гео-эдийн засаг болон Монгол-Хятадын харилцааны гүнзгийрүүлсэн судалгаа",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "BCRD | Хамтын Хөгжил Судалгааны Төв",
    description: "Евразийн холболт, гео-эдийн засаг болон Монгол-Хятадын харилцааны гүнзгийрүүлсэн судалгаа",
    images: [{ url: "/logo.png" }],
  },
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
