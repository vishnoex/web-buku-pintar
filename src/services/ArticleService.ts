import { BaseService } from './BaseService';
import { Article } from '@/models/Article';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';
import config from '@/config/app.config';
import { generateMockArticles } from '@/models/mocks/articles';

export class ArticleService extends BaseService {
  constructor() {
    super(config.apiBaseUrl + '/api/articles');
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

  async getArticles(params: PaginationParams): Promise<PaginatedResponse<Article[]>> {
    if (config.useMockData) {
      const mockBooks = generateMockArticles(params.limit);
      return this.getMockPaginatedResponse(mockBooks);
    }
    return this.getPaginated<Article[]>('', params);
  }

  async getArticleBySlug(slug: string): Promise<ApiResponse<Article>> {
    return this.get<Article>(`/${slug}`);
  }

  async createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Article>> {
    return this.post<Article>('', article);
  }

  async updateArticle(id: string, article: Partial<Article>): Promise<ApiResponse<Article>> {
    return this.post<Article>(`/${id}`, article);
  }

  async deleteArticle(id: string): Promise<ApiResponse<void>> {
    return this.post<void>(`/${id}/delete`, {});
  }

  async getArticlesByCategory(categorySlug: string, params: PaginationParams): Promise<PaginatedResponse<Article[]>> {
    return this.getPaginated<Article[]>(`/category/${categorySlug}`, params);
  }

  async getArticlesByTag(tag: string, params: PaginationParams): Promise<PaginatedResponse<Article[]>> {
    return this.getPaginated<Article[]>(`/tag/${tag}`, params);
  }

  async searchArticles(query: string, params: PaginationParams): Promise<PaginatedResponse<Article[]>> {
    return this.getPaginated<Article[]>(`/search?q=${encodeURIComponent(query)}`, params);
  }
} 