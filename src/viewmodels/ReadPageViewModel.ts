
import { useState, useEffect } from 'react';
import { EbookService } from '@/services/EbookService';

interface ReadPageState {
  url: string | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ReadPageState = {
  url: null,
  loading: true,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const useReadPageViewModel = (slug: string) => {
  const [state, setState] = useState<ReadPageState>(initialState);

  useEffect(() => {
    const fetchEbookContent = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const ebookService = new EbookService();
        // Assuming getEbookContentBySlug returns an object with url and totalPages
        const response = await ebookService.getEbookContentBySlug(); 
        setState({
          url: response.url,
          totalPages: response.totalPages,
          loading: false,
          error: null,
          currentPage: 1, // Start at the first page
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load ebook content';
        setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      }
    };

    if (slug) {
      fetchEbookContent();
    }
  }, [slug]);

  const goToPage = (pageNumber: number) => {
    setState(prev => ({ ...prev, currentPage: Math.max(1, Math.min(pageNumber, prev.totalPages)) }));
  };

  const nextPage = () => {
    setState(prev => ({ ...prev, currentPage: Math.min(prev.currentPage + 1, prev.totalPages) }));
  };

  const prevPage = () => {
    setState(prev => ({ ...prev, currentPage: Math.max(prev.currentPage - 1, 1) }));
  };

  return {
    ...state,
    goToPage,
    nextPage,
    prevPage,
  };
}; 