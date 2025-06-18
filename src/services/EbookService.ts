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
      if (typeof window === 'undefined') {
        // Server-side mock data for metadata generation
        return {
          data: {
            id: slug,
            createdAt: new Date(),
            updatedAt: new Date(),
            title: slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            slug: slug,
            description: `This is a mock description for ${slug.replace(/-/g, ' ')}.`,
            coverImage: 'https://via.placeholder.com/400x600?text=Mock+Book',
            author: { id: 'mock-author-id', name: 'Mock Author', avatar: '' },
            categoryId: 'mock-category-id',
            tags: [],
            price: 0,
            isFree: true,
            status: 'published',
            publishedAt: new Date(),
            seoMetadata: { metaTitle: '', metaDescription: '', keywords: [] },
            rating: { average: 0, count: 0 },
            language: 'English',
            duration: 0,
            fileSize: 0,
            format: 'EPUB',
            pageCount: 0,
            tableOfContents: [],
            features: { hasBookmarks: false, hasNotes: false, hasHighlights: false, hasSearch: false },
          } as Ebook,
          status: 200,
          message: 'Success',
        };
      }
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

  async getEbookContentBySlug(): Promise<{ url: string; totalPages: number }> {
    if (config.useMockData) {
      await new Promise(resolve => setTimeout(resolve, config.mockDelay));
      // Mock URL for a sample EPUB file (now served locally from public folder)
      // const mockEpubUrl = 'https://react-reader.metabits.no/files/alice.epub';
      const mockEpubUrl = "/Berbicara_Dari_Hati_Reflowable.epub";
      // const mockEpubUrl = "/Sample_reflowable.epub";
      return { url: mockEpubUrl, totalPages: 25 }; // Simulate 5 pages
    }
    // In a real scenario, this would fetch the actual ebook content URL
    // For now, we'll return a placeholder
    return { url: "https://react-reader.metabits.no/files/alice.epub", totalPages: 10 };
  }
} 