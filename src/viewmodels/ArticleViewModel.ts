import { useState, useCallback } from 'react';
import { Article } from '@/models/Article';
import { ArticleService } from '@/services/ArticleService';
import { PaginationParams } from '@/types';

interface ArticleState {
  articles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: ArticleState = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

const articleService = new ArticleService();

export const useArticleViewModel = () => {
  const [state, setState] = useState<ArticleState>(initialState);

  const fetchArticles = useCallback(async (params: PaginationParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await articleService.getArticles(params);
      setState(prev => ({
        ...prev,
        articles: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch articles',
        loading: false,
      }));
    }
  }, []);

  const fetchArticleBySlug = useCallback(async (slug: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await articleService.getArticleBySlug(slug);
      setState(prev => ({
        ...prev,
        currentArticle: response.data,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch article',
        loading: false,
      }));
    }
  }, []);

  const searchArticles = useCallback(async (query: string, params: PaginationParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await articleService.searchArticles(query, params);
      setState(prev => ({
        ...prev,
        articles: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to search articles',
        loading: false,
      }));
    }
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    fetchArticles,
    fetchArticleBySlug,
    searchArticles,
    resetState,
  };
}; 