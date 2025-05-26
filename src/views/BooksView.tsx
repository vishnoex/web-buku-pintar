"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { BookViewModel } from '@/viewmodels/BookViewModel';
import EmptyState from '@/components/molecules/EmptyState';
import BookCard from '@/components/molecules/BookCard';
import { Button } from '@/components/atoms/button';
import { Book } from 'lucide-react';
import Header from '@/components/organisms/Header';

const BooksView: React.FC = observer(() => {
  const viewModel = React.useRef(new BookViewModel()).current;
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !viewModel.loading && viewModel.currentPage < viewModel.totalPages) {
        viewModel.loadBooks({ page: viewModel.currentPage + 1, limit: 8 });
      }
    },
    [viewModel]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleIntersect]);

  useEffect(() => {
    viewModel.loadBooks();
  }, [viewModel]);

  const handleSearch = useCallback(
    (query: string) => {
      viewModel.searchBooks(query);
    },
    [viewModel]
  );

  const renderContent = () => {
    if (viewModel.error) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="mb-4 text-red-500">{viewModel.error}</p>
          <Button onClick={() => viewModel.retryLastOperation()}>Retry</Button>
        </div>
      );
    }

    if (viewModel.loading && viewModel.books.length === 0) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      );
    }

    if (viewModel.books.length === 0) {
      return (
        <EmptyState
          icon={<Book className="h-12 w-12" />}
          title="No Books Found"
          description="We couldn't find any books matching your criteria. Try adjusting your search or check back later."
          action={{
            label: "Refresh",
            onClick: () => viewModel.retryLastOperation()
          }}
        />
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {viewModel.books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">Books</h1>
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search books..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-blue focus:outline-none"
            />
          </div>
        </div>

        {renderContent()}

        {viewModel.loading && viewModel.books.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-4 h-4 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={observerTarget} className="h-4" />
      </div>
    </div>
  );
});

export default BooksView; 