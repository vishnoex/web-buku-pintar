import { useState, useCallback } from 'react';
import { Category } from '@/models/Category';
import { CategoryService } from '@/services/CategoryService';
import { PaginationParams } from '@/types';

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

const categoryService = new CategoryService();

export const useCategoryViewModel = () => {
  const [state, setState] = useState<CategoryState>(initialState);

  const fetchCategories = useCallback(async (params: PaginationParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await categoryService.getCategories(params);
      setState(prev => ({
        ...prev,
        categories: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
        loading: false,
      }));
    }
  }, []);

  const fetchCategoryBySlug = useCallback(async (slug: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await categoryService.getCategoryBySlug(slug);
      setState(prev => ({
        ...prev,
        currentCategory: response.data,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch category',
        loading: false,
      }));
    }
  }, []);

  const fetchActiveCategories = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await categoryService.getActiveCategories();
      setState(prev => ({
        ...prev,
        categories: response.data,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch active categories',
        loading: false,
      }));
    }
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    fetchCategories,
    fetchCategoryBySlug,
    fetchActiveCategories,
    resetState,
  };
}; 