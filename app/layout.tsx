import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://caiotools.com"),
  title: {
    default: "Caio Tools — Ferramentas online gratuitas",
    template: "%s | Caio Tools",
  },
  description:
    "Ferramentas online gratuitas para desenvolvedores e usuários: conversão de imagens para WebP, e mais. Simples, rápido e sem instalação.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Caio Tools",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
