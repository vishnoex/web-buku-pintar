"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useReadResumeViewModel } from '@/viewmodels/ReadSummaryViewModel';
import MainLayout from '@/components/templates/MainLayout';
import { Button } from '@/components/atoms/button';
import { ChevronLeft, ChevronRight, Settings, Bookmark, List } from 'lucide-react';
import { ReactReader, ReactReaderStyle } from "react-reader";
import BookmarksList from '@/components/molecules/BookmarksList';
import type { Rendition } from 'epubjs';

interface ReadSummaryViewProps {
  slug: string;
}

const ReadResumeView: React.FC<ReadSummaryViewProps> = ({ slug }) => {
  const { 
    url, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    bookmarks, 
    currentLocation, 
    goToPage, 
    saveBookmark, 
    removeBookmark,
    updateCurrentLocation 
  } = useReadResumeViewModel(slug);
  
  const [location, setLocation] = useState<string | number>(0);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const renditionRef = useRef<Rendition | null>(null);
  const searchParams = useSearchParams();
  const params = URLSearchParams && new URLSearchParams(searchParams);
  const currentSectionIndex = (params && params.get("loc")) ? params.get("loc") : undefined;

  useEffect(() => {
    if (currentLocation && currentLocation.cfi) {
      setLocation(currentLocation.cfi);
    } else if (currentSectionIndex) {
      setLocation(currentSectionIndex);
    }
  }, [currentLocation, currentSectionIndex]);

  const onLocationChanged = (loc: string) => {
    setLocation(loc);
    if (renditionRef.current) {
      const { displayed } = renditionRef.current.location.start;
      const page = displayed.page;
      if (page !== currentPage) {
        goToPage(page);
      }
      updateCurrentLocation(loc, page);
    }
  };

  const addBookmark = () => {
    if (location) {
      const success = saveBookmark(location.toString(), currentPage, `Bookmark at page ${currentPage}`);
      if (success) {
        alert('Bookmark added!');
      } else {
        alert('Bookmark already exists for this page!');
      }
    }
  };

  const handleSelectBookmark = (cfi: string) => {
    setLocation(cfi);
    setShowBookmarks(false);
  };

  if (loading) {
    return (
      <MainLayout className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-full max-w-2xl h-96 bg-gray-200 rounded-lg animate-pulse" />
          <div className="mt-4 space-y-2 w-full max-w-2xl">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </MainLayout>
    );
  }

  if (!url) {
    return (
      <MainLayout className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-gray-500 text-lg">Ebook content not available.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout className="h-screen w-screen p-0 m-0">
      <div className="relative h-full">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm py-4 px-4 flex justify-between items-center">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100" onClick={() => window.history.back()}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100" onClick={addBookmark}>
              <Bookmark className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-gray-100" 
              onClick={() => setShowBookmarks(!showBookmarks)}
            >
              <List className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Bookmarks Panel */}
        {showBookmarks && (
          <div className="fixed top-16 right-4 z-30 w-80">
            <BookmarksList 
              bookmarks={bookmarks} 
              onSelectBookmark={handleSelectBookmark} 
              onRemoveBookmark={removeBookmark} 
            />
          </div>
        )}

        {/* Ebook Content */}
        <div style={{ height: '100vh' }}>
          <ReactReader
            url={url}
            location={location}
            locationChanged={onLocationChanged}
            showToc={false}

            epubOptions={
              {
                manager: 'continuous',
                flow: 'scrolled',
              }
            }
            // getRendition={(_rendition: Rendition) => {
            //   _rendition.hooks.content.register((contents: Contents) => {
            //     // @ts-ignore - manager type is missing in epubjs Rendition
            //     _rendition.manager.container.style['scroll-behavior'] = 'smooth'
            //   })
            //   renditionRef.current = _rendition;
            //   renditionRef.current.themes.fontSize(largeText ? '140%' : '100%')
            // }}
            readerStyles={ReactReaderStyle}
          />
        </div>

        {/* Pagination Controls */}
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white shadow-sm py-4 px-4 hidden justify-between items-center">
          <Button onClick={() => {
            if (renditionRef.current) {
              renditionRef.current.prev();
            }
          }} disabled={currentPage === 1} variant="outline">
            <ChevronLeft className="h-5 w-5 mr-2" /> Previous
          </Button>
          <Button onClick={() => {
            if (renditionRef.current) {
              renditionRef.current.next();
            }
          }} disabled={currentPage === totalPages} variant="outline">
            Next <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReadResumeView;