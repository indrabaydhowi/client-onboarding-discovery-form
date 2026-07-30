import type { Metadata } from "next";
import "./globals.css";
import { FormProvider } from "@/context/FormContext";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
  title: "Client Onboarding & Project Discovery Form",
  description: "Interactive single-page application for client requirement discovery",
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
      <body className="min-h-screen bg-[#FAF9F5] text-stone-800 antialiased">
        <FormProvider>
          <Header />
          {children}
        </FormProvider>
      </body>
    </html>
  );
}
