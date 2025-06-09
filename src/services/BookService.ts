import { BaseService } from './BaseService';
import { Ebook } from '@/models/Ebook';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';
import config from '@/config/app.config';
import { generateMockBooks } from '@/models/mocks/books';

export class BookService extends BaseService {
  constructor() {
    super(config.apiBaseUrl + '/api/books');
  }

  private async getMockPaginatedResponse<T>(data: T[]): Promise<PaginatedResponse<T[]>> {
    await new Promise(resolve => setTimeout(resolve, config.mockDelay));
    return {
      data,
      total: data.length,
      totalPages: Math.ceil(data.length / 8),
      currentPage: 1,
      status: 200,
      message: 'Success',
    };
  }

  async getBooks(params: PaginationParams): Promise<PaginatedResponse<Ebook[]>> {
    if (config.useMockData) {
      const mockBooks = generateMockBooks(params.limit);
      return this.getMockPaginatedResponse(mockBooks);
    }
    return this.getPaginated<Ebook[]>('', params);
  }

  async getBookBySlug(slug: string): Promise<ApiResponse<Ebook>> {
    if (config.useMockData) {
      const mockBooks = generateMockBooks(1);
      await new Promise(resolve => setTimeout(resolve, config.mockDelay));
      return {
        data: mockBooks[0],
        status: 200,
        message: 'Success',
      };
    }
    return this.get<Ebook>(`/${slug}`);
  }

  async searchBooks(query: string, params: PaginationParams): Promise<PaginatedResponse<Ebook[]>> {
    if (config.useMockData) {
      const mockBooks = generateMockBooks(20).filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.description.toLowerCase().includes(query.toLowerCase())
      );
      return this.getMockPaginatedResponse(mockBooks);
    }
    return this.getPaginated<Ebook[]>(`/search?q=${encodeURIComponent(query)}`, params);
  }

  async getBooksByCategory(categoryId: string, params: PaginationParams): Promise<PaginatedResponse<Ebook[]>> {
    if (config.useMockData) {
      const mockBooks = generateMockBooks(20);
      return this.getMockPaginatedResponse(mockBooks);
    }
    return this.getPaginated<Ebook[]>(`/category/${categoryId}`, params);
  }
} 