import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Buku Pintar",
    default: "Buku Pintar - Your Smart Learning Platform",
  },
  description: "A smart learning platform that helps you achieve your educational goals",
  keywords: ["education", "learning", "online courses", "smart learning"],
  authors: [{ name: "Buku Pintar Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bukupintar.com",
    siteName: "Buku Pintar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buku Pintar",
    description: "Your Smart Learning Platform",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
