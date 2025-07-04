import React from 'react';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-serif",
});

export const metadata = {
  title: 'Reading - Buku Pintar',
  description: 'Resume reading your book from where you left off',
};

export default function ReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={poppins.className}>
      {children}
    </div>
  );
}