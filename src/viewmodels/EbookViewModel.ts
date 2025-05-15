import { useState, useCallback } from 'react';
import { Ebook } from '@/models/Ebook';
import { EbookService } from '@/services/EbookService';
import { PaginationParams } from '@/types';

interface EbookState {
  ebooks: Ebook[];
  currentEbook: Ebook | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: EbookState = {
  ebooks: [],
  currentEbook: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

const ebookService = new EbookService();

export const useEbookViewModel = () => {
  const [state, setState] = useState<EbookState>(initialState);

  const fetchEbooks = useCallback(async (params: PaginationParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await ebookService.getEbooks(params);
      setState(prev => ({
        ...prev,
        ebooks: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch ebooks',
        loading: false,
      }));
    }
  }, []);

  const fetchEbookBySlug = useCallback(async (slug: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await ebookService.getEbookBySlug(slug);
      setState(prev => ({
        ...prev,
        currentEbook: response.data,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch ebook',
        loading: false,
      }));
    }
  }, []);

  const searchEbooks = useCallback(async (query: string, params: PaginationParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await ebookService.searchEbooks(query, params);
      setState(prev => ({
        ...prev,
        ebooks: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to search ebooks',
        loading: false,
      }));
    }
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    fetchEbooks,
    fetchEbookBySlug,
    searchEbooks,
    resetState,
  };
}; 