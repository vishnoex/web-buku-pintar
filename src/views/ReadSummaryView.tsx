"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useReadResumeViewModel } from '@/viewmodels/ReadSummaryViewModel';
import MainLayout from '@/components/templates/MainLayout';
import { Button } from '@/components/atoms/button';
import { ChevronLeft, ChevronRight, Settings, Bookmark, List } from 'lucide-react';
import ePub from 'epubjs';
import BookmarksList from '@/components/molecules/BookmarksList';

interface EpubBook {
  renderTo: (element: HTMLElement, options: RenderOptions) => EpubRendition;
  destroy: () => void;
}

interface RenderOptions {
  method?: string;
  width?: string | number;
  height?: string | number;
  spread?: string;
  allowScriptedContent?: boolean;
}

interface EpubRendition {
  display: (target?: string | number) => void;
  on: (event: string, callback: (location: EpubLocation) => void) => void;
  prev: () => void;
  next: () => void;
  location: {
    start: {
      cfi: string;
      index: number;
    };
  };
  themes: {
    default: (theme: object) => void;
  };
}

interface EpubLocation {
  start: {
    cfi: string;
    index: number;
  };
}

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
  const viewerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<EpubBook | null>(null);
  const renditionRef = useRef<EpubRendition | null>(null);
  const searchParams = useSearchParams();
  const params = URLSearchParams && new URLSearchParams(searchParams);
  const currentSectionIndex = (params && params.get("loc")) ? params.get("loc") : undefined;

  useEffect(() => {
    if (url && viewerRef.current) {
      // Initialize the book
      bookRef.current = ePub(url) as unknown as EpubBook;
      
      // Render the book
      renditionRef.current = bookRef.current?.renderTo(viewerRef.current, {
        method: 'default',
        width: '100%',
        height: '100%',
        spread: 'none',
        allowScriptedContent: true,
      });
      
      // Check for saved position
      if (currentLocation && currentLocation.cfi) {
        renditionRef.current?.display(currentLocation.cfi);
      } else {
        renditionRef.current?.display(currentSectionIndex || undefined);
      }

      renditionRef.current.themes.default({});
      console.log(location);
      
      // Handle location changes
      renditionRef.current.on('locationChanged', (loc: EpubLocation) => {
        setLocation(loc.start.cfi);
        // Save position whenever location changes
        if (loc.start.cfi) {
          updateCurrentLocation(loc.start.cfi, currentPage);
        }
      });
      
      // Cleanup
      return () => {
        if (bookRef.current) {
          bookRef.current.destroy();
        }
      };
    }
  }, [url, slug, currentLocation, currentPage, currentSectionIndex, location, updateCurrentLocation]);

  // Handle page navigation events
  useEffect(() => {
    if (renditionRef.current) {
      // Listen for page changes from the rendition
      renditionRef.current.on('relocated', (location: EpubLocation) => {
        // Update the current page in the view model
        const currentCfi = location.start.cfi;
        const spineItem = location.start.index;
        
        // Update the current page number based on spine position
        const newPage = spineItem + 1; // spine is 0-indexed, pages are 1-indexed
        if (newPage !== currentPage) {
          goToPage(newPage);
        }
        
        // Save position whenever page changes
        if (currentCfi) {
          updateCurrentLocation(currentCfi, newPage);
        }
      });
    }
  }, [currentPage, goToPage, updateCurrentLocation]);

  // Add bookmark functionality
  const addBookmark = () => {
    if (renditionRef.current) {
      const currentCfi = renditionRef.current.location.start.cfi;
      const success = saveBookmark(currentCfi, currentPage, `Bookmark at page ${currentPage}`);
      
      if (success) {
        alert('Bookmark added!');
      } else {
        alert('Bookmark already exists for this page!');
      }
    }
  };

  // Handle bookmark selection
  const handleSelectBookmark = (cfi: string) => {
    if (renditionRef.current) {
      renditionRef.current.display(cfi);
      setShowBookmarks(false);
    }
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
        <div style={{ height: '100vh', paddingTop: '60px', paddingBottom: '60px' }}>
          <div ref={viewerRef} style={{ width: '100%', height: '100%' }}></div>
        </div>

        {/* Pagination Controls */}
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white shadow-sm py-4 px-4 flex justify-between items-center">
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