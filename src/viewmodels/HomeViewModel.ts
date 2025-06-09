import { useState, useEffect } from 'react';
import { Category } from '@/models/Category';
import { Ebook } from '@/models/Ebook';
import { CategoryService } from '@/services/CategoryService';
import { BookService } from '@/services/BookService';
import { Banner } from '@/models/Banner';
import { BannerService } from '@/services/BannerService';

interface HomeState {
  categories: Category[];
  books: Ebook[];
  banners: Banner[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  categories: [],
  books: [],
  banners: [],
  loading: true,
  error: null,
};

export const useHomeViewModel = () => {
  const [state, setState] = useState<HomeState>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const categoryService = new CategoryService();
        const bookService = new BookService();
        const bannerService = new BannerService();
        const [catRes, bookRes, bannerRes] = await Promise.all([
          categoryService.getCategories({ page: 1, limit: 10 }),
          bookService.getBooks({ page: 1, limit: 8 }),
          bannerService.getBanners({ page: 1, limit: 5 }),
        ]);
        setState({
          categories: catRes.data,
          books: bookRes.data,
          banners: bannerRes.data,
          loading: false,
          error: null,
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
        setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      }
    };
    fetchData();
  }, []);

  return {
    categories: state.categories,
    books: state.books,
    banners: state.banners,
    loading: state.loading,
    error: state.error,
  };
}; 