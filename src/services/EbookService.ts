import { BaseService } from './BaseService';
import { Ebook } from '@/models/Ebook';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';

export class EbookService extends BaseService {
  constructor() {
    super('/api/ebooks');
  }

  async getEbooks(params: PaginationParams): Promise<PaginatedResponse<Ebook[]>> {
    return this.getPaginated<Ebook[]>('', params);
  }

  async getEbookBySlug(slug: string): Promise<ApiResponse<Ebook>> {
    return this.get<Ebook>(`/${slug}`);
  }

  async createEbook(ebook: Omit<Ebook, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Ebook>> {
    return this.post<Ebook>('', ebook);
  }

  async updateEbook(id: string, ebook: Partial<Ebook>): Promise<ApiResponse<Ebook>> {
    return this.post<Ebook>(`/${id}`, ebook);
  }

  async deleteEbook(id: string): Promise<ApiResponse<void>> {
    return this.post<void>(`/${id}/delete`, {});
  }

  async getEbooksByCategory(categoryId: string, params: PaginationParams): Promise<PaginatedResponse<Ebook[]>> {
    return this.getPaginated<Ebook[]>(`/category/${categoryId}`, params);
  }

  async getEbooksByAuthor(authorId: string, params: PaginationParams): Promise<PaginatedResponse<Ebook[]>> {
    return this.getPaginated<Ebook[]>(`/author/${authorId}`, params);
  }

  async searchEbooks(query: string, params: PaginationParams): Promise<PaginatedResponse<Ebook[]>> {
    return this.getPaginated<Ebook[]>(`/search?q=${encodeURIComponent(query)}`, params);
  }

  async getFreeEbooks(params: PaginationParams): Promise<PaginatedResponse<Ebook[]>> {
    return this.getPaginated<Ebook[]>('/free', params);
  }
} 