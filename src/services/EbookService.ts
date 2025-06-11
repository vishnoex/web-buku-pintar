import { BaseService } from './BaseService';
import { Ebook } from '@/models/Ebook';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';
import config from '@/config/app.config';
import { generateMockEbooks } from '@/models/mocks/ebooks';

export class EbookService extends BaseService {
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

  async getEbooks(params: PaginationParams): Promise<PaginatedResponse<Ebook[]>> {
    if (config.useMockData) {
      const mockEbooks = generateMockEbooks(params.limit);
      return this.getMockPaginatedResponse(mockEbooks);
    }
    return this.getPaginated<Ebook[]>('', params);
  }

  async getEbookBySlug(slug: string): Promise<ApiResponse<Ebook>> {
    if (config.useMockData) {
      const mockEbooks = generateMockEbooks(1);
      await new Promise(resolve => setTimeout(resolve, config.mockDelay));
      return {
        data: mockEbooks[0],
        status: 200,
        message: 'Success',
      };
    }
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
    if (config.useMockData) {
      const mockBooks = generateMockEbooks(20).filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.description.toLowerCase().includes(query.toLowerCase())
      );
      return this.getMockPaginatedResponse(mockBooks);
    }
    return this.getPaginated<Ebook[]>(`/search?q=${encodeURIComponent(query)}`, params);
  }

  async getFreeEbooks(params: PaginationParams): Promise<PaginatedResponse<Ebook[]>> {
    return this.getPaginated<Ebook[]>('/free', params);
  }
} 