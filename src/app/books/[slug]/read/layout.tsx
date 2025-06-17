import React from 'react';

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
    <div className="min-h-screen">
      {children}
    </div>
  );
}