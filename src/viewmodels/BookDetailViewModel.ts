import { useState, useEffect } from 'react';
import { Ebook } from '@/models/Ebook';
import { EbookService } from '@/services/EbookService';

interface BookDetailState {
  book: Ebook | null;
  loading: boolean;
  error: string | null;
}

const initialBookDetailState: BookDetailState = {
  book: null,
  loading: true,
  error: null,
};

export const useBookDetailViewModel = (slug: string) => {
  const [state, setState] = useState<BookDetailState>(initialBookDetailState);

  useEffect(() => {
    const fetchBook = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const ebookService = new EbookService();
        const response = await ebookService.getEbookBySlug(slug);
        setState({
          book: response.data,
          loading: false,
          error: null,
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch book';
        setState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      }
    };

    if (slug) {
      fetchBook();
    }
  }, [slug]);

  const retryFetch = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
  };

  return {
    book: state.book,
    loading: state.loading,
    error: state.error,
    retryFetch,
  };
}; 