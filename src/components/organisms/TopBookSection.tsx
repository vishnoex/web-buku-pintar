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
    <section className={cn("py-8 md:py-12", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Top Rated Books
          </h2>

          <Button asChild variant="outline">
            <Link href="/books?sort=rating">View All</Link>
          </Button>
        </div>

        <div className="relative w-full">
          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {topBooks.map((book) => (
                <BookCard key={book.id} book={book} displayAudioPlayer={false} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default TopBookSection;
