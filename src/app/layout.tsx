import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { FormProvider } from "@/context/FormContext";
import Header from "@/components/ui/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Tukang Web - Website yang Beneran Kerja",
  description: "Jasa pembuatan website dan aplikasi web yang transparan dan profesional.",
};

/**
 * RootLayout component wrapping all pages with global styles.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-[#FAF9F5] text-stone-800 antialiased`}>
        <FormProvider>
          <Header />
          {children}
        </FormProvider>
      </body>
    </html>
  );
}
