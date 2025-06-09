import { BaseService } from './BaseService';
import { Category } from '@/models/Category';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';
import config from '@/config/app.config';

// Simple mock categories generator
const generateMockCategories = (): Category[] => {
  const base = [
    { name: 'Semua', slug: 'all', description: 'Semua kategori', icon: 'star', order: 0, isActive: true },
    { name: 'Ringkasan', slug: 'ringkasan', description: 'Ringkasan buku', icon: 'book-open', order: 1, isActive: true },
    { name: 'Inspirasi', slug: 'inspirasi', description: 'Inspirasi', icon: 'lightbulb', order: 2, isActive: true },
    { name: 'E-Book', slug: 'books', description: 'E-Book', icon: 'book-open-check', order: 3, isActive: true },
    { name: 'Artikel', slug: 'artikel', description: 'Artikel', icon: 'file-text', order: 4, isActive: true },
  ];
  return base.map((cat, i) => ({
    id: `${i+1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...cat,
    seoMetadata: {},
  }));
};

export class CategoryService extends BaseService {
  constructor() {
    super('/api/categories');
  }

  async getCategories(params: PaginationParams): Promise<PaginatedResponse<Category[]>> {
    if (config.useMockData) {
      const mockCategories = generateMockCategories();
      return {
        data: mockCategories,
        total: mockCategories.length,
        totalPages: 1,
        currentPage: 1,
        status: 200,
        message: 'Success',
      };
    }
    return this.getPaginated<Category[]>('', params);
  }

  async getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
    return this.get<Category>(`/${slug}`);
  }

  async createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Category>> {
    return this.post<Category>('', category);
  }

  async updateCategory(id: string, category: Partial<Category>): Promise<ApiResponse<Category>> {
    return this.post<Category>(`/${id}`, category);
  }

  async deleteCategory(id: string): Promise<ApiResponse<void>> {
    return this.post<void>(`/${id}/delete`, {});
  }

  async getSubCategories(parentId: string): Promise<ApiResponse<Category[]>> {
    return this.get<Category[]>(`/parent/${parentId}`);
  }

  async getActiveCategories(): Promise<ApiResponse<Category[]>> {
    if (config.useMockData) {
      const mockCategories = generateMockCategories();
      return {
        data: mockCategories,
        status: 200,
        message: 'Success',
      };
    }
    return this.get<Category[]>('/active');
  }
} 