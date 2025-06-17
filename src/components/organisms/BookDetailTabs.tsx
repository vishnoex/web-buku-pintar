"use client";

import React from 'react';
import { cn } from '@/utils/utils';
import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';
import { Button } from '@/components/atoms/button';
import { BookOpen, Play } from 'lucide-react';
import { Ebook } from '@/models/Ebook';
import { useRouter } from 'next/navigation';

interface BookDetailTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  book: Ebook;
  loading?: boolean;
  slug: string;
}

const BookDetailTabs: React.FC<BookDetailTabsProps> = ({
  activeTab,
  setActiveTab,
  book,
  loading = false,
  slug,
}) => {
  const router = useRouter();
  const tabClass = (tabName: string) => cn(
    "py-2 px-4 text-sm rounded-lg transition-colors",
    activeTab === tabName
      ? 'tab-primary-12 text-primary-600'
      : 'font-medium text-gray-500 hover:text-gray-700'
  );

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
          </div>
        </div>
      );
    }

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
              <Button size="lg" className="flex-1 bg-primary text-white hover:bg-primary/90" onClick={() => router.push(`/books/${slug}/summary`)}>
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
              <Button size="lg" className="flex-1 bg-primary text-white hover:bg-primary/90" onClick={() => router.push(`/books/${slug}/premiumSummary`)}>
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
        return (
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mb-4">Sampel Gratis</h2>
            <p className="mb-6">{book.description}</p>
            <div className="flex space-x-4">
              <Button size="lg" className="flex-1 bg-primary text-white hover:bg-primary/90" onClick={() => router.push(`/books/${slug}/read`)}>
                <BookOpen className="mr-2 h-5 w-5" /> Baca
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="md:col-span-2">
      <h1 className="text-3xl text-center md:text-left font-bold mb-2">{book.title}</h1>
      <div>
        <div className="mb-6">
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex space-x-4 border-b pb-2">
              {loading ? (
                <>
                  <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                </>
              ) : (
                <>
                  <button
                    className={tabClass('Sinopsis')}
                    onClick={() => setActiveTab('Sinopsis')}
                  >
                    Sinopsis
                  </button>
                  <button
                    className={tabClass('Daftar Isi')}
                    onClick={() => setActiveTab('Daftar Isi')}
                  >
                    Daftar Isi
                  </button>
                  <button
                    className={tabClass('Ringkasan')}
                    onClick={() => setActiveTab('Ringkasan')}
                  >
                    Ringkasan
                  </button>
                  <button
                    className={tabClass('Intisari')}
                    onClick={() => setActiveTab('Intisari')}
                  >
                    Intisari
                  </button>
                  <button
                    className={tabClass('Sampel Gratis')}
                    onClick={() => setActiveTab('Sampel Gratis')}
                  >
                    Sampel Gratis
                  </button>
                </>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default BookDetailTabs;
