import { BaseService } from './BaseService';
import { Inspiration } from '@/models/Inspiration';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';
import config from '@/config/app.config';
import { generateMockInspirations } from '@/models/mocks/inspirations';

export class InspirationService extends BaseService {
  constructor() {
    super('/api/inspirations');
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

  public async getInspirations(params: PaginationParams): Promise<PaginatedResponse<Inspiration[]>> {
    if (config.useMockData) {
      const mockInspirations = generateMockInspirations(5);
      return this.getMockPaginatedResponse(mockInspirations);
    }

    return this.getPaginated<Inspiration[]>('', params || { page: 1, limit: 10 });
  }

  public async getInspirationBySlug(slug: string): Promise<ApiResponse<Inspiration>> {
    if (config.useMockData) {
      const mockInspirations = generateMockInspirations(1);
      const inspiration = mockInspirations.find(insp => insp.slug === slug);
      if (inspiration) {
        return {
          data: inspiration,
          status: 200,
          message: 'Success',
        };
      }
      throw new Error("Inspiration not found");
    }

    return this.get<Inspiration>(`/${slug}`);
  }
} 