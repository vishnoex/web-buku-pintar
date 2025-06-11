"use client";

import React from 'react';
import { useMockBooks } from '@/hooks/useMockBooks';
import BookCard from '@/components/molecules/BookCard';
import Link from 'next/link';
import { Button } from '@/components/atoms/button';
import { cn } from '@/utils/utils';
import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';

interface TopBookSectionProps {
  className?: string;
}

const TopBookSection: React.FC<TopBookSectionProps> = ({ className }) => {
  const allBooks = useMockBooks();
  const topBooks = React.useMemo(() => {
    return [...allBooks.books]
      .sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, 8);
  }, [allBooks]);

  return (
    <section className={cn("py-2", className)}>
      <div className="container">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-base md:text-xl font-bold tracking-tight">
              E-book
            </h2>
            <span className="text-xs">Buku-buku bermutu dalam genggamanmu.</span>
          </div>

          <div className="margin-block-end">
            <Button asChild variant="ghost">
              <Link href="/books">Semua</Link>
            </Button>
          </div>
        </div>

        <ScrollArea className="w-full" type="auto">
          <div className="flex gap-4 py-2 px-2">
            {topBooks.map((book) => (
              <BookCard key={book.id} book={book} displayAudioPlayer={false} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default TopBookSection;
