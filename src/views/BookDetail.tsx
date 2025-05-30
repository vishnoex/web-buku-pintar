"use client";

import React, { useEffect, useState } from 'react';
import { BookViewModel } from '@/viewmodels/BookViewModel';
import MainLayout from '@/components/templates/MainLayout';
import { Button } from '@/components/atoms/button';
import { BookOpen, Play } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import BookDetailTabs from '@/components/organisms/BookDetailTabs';
import BookCover from '@/components/atoms/bookCover';

interface BookDetailProps {
  slug: string;
}

const BookDetail: React.FC<BookDetailProps> = observer(({ slug }) => {
  const viewModel = React.useRef(new BookViewModel()).current;
  const [activeTab, setActiveTab] = useState('Sinopsis');

  useEffect(() => {
    viewModel.getBookBySlug(slug);
  }, [slug, viewModel]);

  if (viewModel.loading) {
    return (
      <MainLayout className="container mx-auto px-4 py-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (viewModel.error || !viewModel.currentBook) {
    return (
      <MainLayout className="container mx-auto px-4 py-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{viewModel.error || 'Book not found'}</p>
            <Button onClick={() => viewModel.getBookBySlug(slug)}>Retry</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const book = viewModel.currentBook;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Sinopsis':
        return (
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mb-4">Sinopsis Buku</h2>
            <p>{book.description}</p>
          </div>
        );
      case 'Daftar Isi':
        if (!book.tableOfContents || book.tableOfContents.length === 0) {
          return <div className="prose max-w-none">Table of contents not available.</div>;
        }
        return (
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mb-4">Daftar Isi</h2>
            <ul className="list-none p-0 m-0">
              {book.tableOfContents.map((item, index) => (
                <li key={index} className="flex items-center mb-4 last:mb-0">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-3">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 font-medium">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Ringkasan':
        return (
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mb-4">Ringkasan Buku</h2>
            <p className="mb-6">{book.description}</p>
            <div className="flex space-x-4">
              <Button size="lg" className="flex-1 bg-primary text-white hover:bg-primary/90">
                <BookOpen className="mr-2 h-5 w-5" /> Baca
              </Button>
              {book.hasAudioVersion && (
                <Button size="lg" className="flex-1 bg-primary text-white hover:bg-primary/90">
                  <Play className="mr-2 h-5 w-5" /> Dengarkan
                </Button>
              )}
            </div>
          </div>
        );
      case 'Intisari':
        return (
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mb-4">Intisari Buku</h2>
            <p className="mb-6">{book.description}</p>
            <div className="flex space-x-4">
              <Button size="lg" className="flex-1 bg-primary text-white hover:bg-primary/90">
                <BookOpen className="mr-2 h-5 w-5" /> Baca
              </Button>
              {book.hasAudioVersion && (
                <Button size="lg" className="flex-1 bg-primary text-white hover:bg-primary/90">
                  <Play className="mr-2 h-5 w-5" /> Dengarkan
                </Button>
              )}
            </div>
          </div>
        );
      case 'Sampel Gratis':
        return <div className="prose max-w-none">Sampel Gratis</div>; // Placeholder
      default:
        return null;
    }
  };

  return (
    <MainLayout className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="md:col-span-1 flex justify-center md:justify-start">
          {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xs md:max-w-none"> */}
            <BookCover src={book.coverImage} alt={book.title} aspectRatio="portrait" className="relative w-full max-w-xs md:max-w-none" />
          {/* </div> */}
        </div>

        {/* Book Details */}
        <div className="md:col-span-2">
          {/* Title and Author for larger screens */}
          <h1 className="text-3xl text-center md:text-left font-bold mb-2">{book.title}</h1>

          {/* Tabs */}
          <BookDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          <div>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
});

export default BookDetail;
