import { useState, useEffect } from 'react';
import { Category } from '@/models/Category';
import { Ebook } from '@/models/Ebook';
import { Banner } from '@/models/Banner';
import { Inspiration } from '@/models/Inspiration';
import { CategoryService } from '@/services/CategoryService';
import { BookService } from '@/services/BookService';
import { BannerService } from '@/services/BannerService';
import { InspirationService } from '@/services/InspirationService';

interface HomeState {
  categories: Category[];
  books: Ebook[];
  banners: Banner[];
  inspirations: Inspiration[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  categories: [],
  books: [],
  banners: [],
  inspirations: [],
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
        const inspirationService = new InspirationService();
        const [catRes, bookRes, bannerRes, inspRes] = await Promise.all([
          categoryService.getCategories({ page: 1, limit: 10 }),
          bookService.getBooks({ page: 1, limit: 8 }),
          bannerService.getBanners({ page: 1, limit: 5 }),
          inspirationService.getInspirations({ page: 1, limit: 3 }),
        ]);
        setState({
          categories: catRes.data,
          books: bookRes.data,
          banners: bannerRes.data,
          inspirations: inspRes.data,
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
    inspirations: state.inspirations,
    loading: state.loading,
    error: state.error,
  };
}; 