import { useState, useEffect } from 'react';
import { EbookService } from '@/services/EbookService';

interface ReadSummaryState {
  url: string | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  bookmarks: Bookmark[];
  currentLocation: SavedPosition | null;
}

interface Bookmark {
  cfi: string;
  page: number;
  timestamp: string;
  text: string;
}

interface SavedPosition {
  cfi: string;
  page: number;
  timestamp: string;
}

const initialState: ReadSummaryState = {
  url: null,
  loading: true,
  error: null,
  currentPage: 1,
  totalPages: 1,
  bookmarks: [],
  currentLocation: null,
};

export const useReadResumeViewModel = (slug: string) => {
  const [state, setState] = useState<ReadSummaryState>(initialState);

  // Load saved data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && slug) {
      // Load bookmarks
      const savedBookmarks = localStorage.getItem(`book-${slug}-bookmarks`);
      const bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
      
      // Load current position
      const savedPosition = localStorage.getItem(`book-${slug}-position`);
      const currentLocation = savedPosition ? JSON.parse(savedPosition) : null;
      
      setState(prev => ({
        ...prev,
        bookmarks,
        currentLocation,
      }));
    }
  }, [slug]);

  // Fetch ebook content
  useEffect(() => {
    const fetchEbookContent = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const ebookService = new EbookService();
        const response = await ebookService.getEbookContentBySlug();
        setState(prev => ({
          ...prev,
          url: response.url,
          totalPages: response.totalPages,
          loading: false,
          error: null,
          currentPage: prev.currentLocation?.page || 1, // Use saved page or start at first page
        }));
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load ebook content';
        setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      }
    };

    if (slug) {
      fetchEbookContent();
    }
  }, [slug]);

  // Update page
  const goToPage = (pageNumber: number) => {
    setState(prev => ({ ...prev, currentPage: Math.max(1, Math.min(pageNumber, prev.totalPages)) }));
  };

  // Save bookmark
  const saveBookmark = (cfi: string, page: number, text: string = `Bookmark at page ${page}`) => {
    if (typeof window !== 'undefined') {
      const newBookmark = {
        cfi,
        page,
        timestamp: new Date().toISOString(),
        text
      };
      
      const savedBookmarks = localStorage.getItem(`book-${slug}-bookmarks`);
      const bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
      
      // Check if bookmark already exists
      if (!bookmarks.some((bookmark: Bookmark) => bookmark.cfi === cfi)) {
        const updatedBookmarks = [...bookmarks, newBookmark];
        localStorage.setItem(`book-${slug}-bookmarks`, JSON.stringify(updatedBookmarks));
        setState(prev => ({ ...prev, bookmarks: updatedBookmarks }));
        return true;
      }
      return false;
    }
    return false;
  };

  // Remove bookmark
  const removeBookmark = (cfi: string) => {
    if (typeof window !== 'undefined') {
      const savedBookmarks = localStorage.getItem(`book-${slug}-bookmarks`);
      if (savedBookmarks) {
        const bookmarks = JSON.parse(savedBookmarks);
        const updatedBookmarks = bookmarks.filter((bookmark: Bookmark) => bookmark.cfi !== cfi);
        localStorage.setItem(`book-${slug}-bookmarks`, JSON.stringify(updatedBookmarks));
        setState(prev => ({ ...prev, bookmarks: updatedBookmarks }));
      }
    }
  };

  // Update current location
  const updateCurrentLocation = (cfi: string, page: number) => {
    if (typeof window !== 'undefined') {
      const currentLocation = {
        cfi,
        page,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`book-${slug}-position`, JSON.stringify(currentLocation));
      setState(prev => ({ ...prev, currentLocation }));
    }
  };

  return {
    ...state,
    goToPage,
    saveBookmark,
    removeBookmark,
    updateCurrentLocation,
  };
};