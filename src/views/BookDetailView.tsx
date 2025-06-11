"use client";

import React, { useState } from 'react';
import { useBookDetailViewModel } from '@/viewmodels/BookDetailViewModel';
import MainLayout from '@/components/templates/MainLayout';
import { Button } from '@/components/atoms/button';
import { observer } from 'mobx-react-lite';
import BookDetailTabs from '@/components/organisms/BookDetailTabs';
import BookCover from '@/components/atoms/bookCover';
import { ChevronLeft, Heart } from 'lucide-react';

interface BookDetailProps {
  slug: string;
}

const BookDetail: React.FC<BookDetailProps> = observer(({ slug }) => {
  const { book, loading, error } = useBookDetailViewModel(slug);
  const [activeTab, setActiveTab] = useState('Sinopsis');

  if (error || !book) {
    return (
      <MainLayout>
        <div className="left-0 right-0 flex justify-between items-center p-4">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="w-full max-w-xs md:max-w-none aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="plc-5 prc-5">
        <div className="left-0 right-0 flex justify-between items-center p-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600">
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1 flex justify-center md:justify-start">
            {loading ? (
              <div className="w-full max-w-xs md:max-w-none aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" />
            ) : (
              <BookCover src={book.coverImage} alt={book.title} aspectRatio="portrait" className="relative w-full max-w-xs md:max-w-none" />
            )}
          </div>
          <BookDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} book={book} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
});

export default BookDetail;
