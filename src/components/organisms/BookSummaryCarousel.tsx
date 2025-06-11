"use client";

import React from 'react';
import BookCard from '@/components/molecules/BookCard';
import Link from 'next/link';
import { Button } from '@/components/atoms/button';
import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';
import { Ebook } from '@/models/Ebook';
import { cn } from '@/utils/utils';

interface BookSummaryCarouselProps {
  className?: string;
  books: Ebook[];
  loading?: boolean;
  error?: string | null;
}

const BookSummaryCarousel: React.FC<BookSummaryCarouselProps> = ({ className, books, loading, error }) => {
  return (
    <section className={cn("py-2", className)}>
      <div className="container">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-base md:text-xl font-bold tracking-tight">
              Ringkasan Buku
            </h2>
            <span className="text-xs">Bukan sekadar ringkasan, ini nutrisi untuk pikiranmu.</span>
          </div>

          <div className="margin-block-end">
            <Button asChild variant="ghost">
              <Link href="/books">Semua</Link>
            </Button>
          </div>
        </div>

        <ScrollArea className="w-full" type="auto">
          <div className="flex gap-4 py-2 px-2">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <BookCard key={index} loading />
              ))
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : books.map((book) => (
              <BookCard key={book.id} book={book} displayAudioPlayer={true} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default BookSummaryCarousel;
