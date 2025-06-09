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
    <section className={cn("py-8 md:py-12", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Book Summaries
          </h2>
          
          <Button asChild variant="outline">
            <Link href="/books">View All Books</Link>
          </Button>
        </div>

        <div className="relative w-full">
          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {loading ? (
                <div className="text-muted-foreground">Loading...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : books.map((book) => (
                <BookCard key={book.id} book={book} displayAudioPlayer={true} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default BookSummaryCarousel; 