import { BaseService } from './BaseService';
import { Category } from '@/models/Category';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';

export class CategoryService extends BaseService {
  constructor() {
    super('/api/categories');
  }

  async getCategories(params: PaginationParams): Promise<PaginatedResponse<Category[]>> {
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
    return this.get<Category[]>('/active');
  }
} 