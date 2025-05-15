import { BaseService } from './BaseService';
import { Audiobook } from '@/models/Audiobook';
import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';

export class AudiobookService extends BaseService {
  constructor() {
    super('/api/audiobooks');
  }

  async getAudiobooks(params: PaginationParams): Promise<PaginatedResponse<Audiobook[]>> {
    return this.getPaginated<Audiobook[]>('', params);
  }

  async getAudiobookBySlug(slug: string): Promise<ApiResponse<Audiobook>> {
    return this.get<Audiobook>(`/${slug}`);
  }

  async createAudiobook(audiobook: Omit<Audiobook, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Audiobook>> {
    return this.post<Audiobook>('', audiobook);
  }

  async updateAudiobook(id: string, audiobook: Partial<Audiobook>): Promise<ApiResponse<Audiobook>> {
    return this.post<Audiobook>(`/${id}`, audiobook);
  }

  async deleteAudiobook(id: string): Promise<ApiResponse<void>> {
    return this.post<void>(`/${id}/delete`, {});
  }

  async getAudiobooksByCategory(categoryId: string, params: PaginationParams): Promise<PaginatedResponse<Audiobook[]>> {
    return this.getPaginated<Audiobook[]>(`/category/${categoryId}`, params);
  }

  async getAudiobooksByNarrator(narratorId: string, params: PaginationParams): Promise<PaginatedResponse<Audiobook[]>> {
    return this.getPaginated<Audiobook[]>(`/narrator/${narratorId}`, params);
  }

  async searchAudiobooks(query: string, params: PaginationParams): Promise<PaginatedResponse<Audiobook[]>> {
    return this.getPaginated<Audiobook[]>(`/search?q=${encodeURIComponent(query)}`, params);
  }

  async getFreeAudiobooks(params: PaginationParams): Promise<PaginatedResponse<Audiobook[]>> {
    return this.getPaginated<Audiobook[]>('/free', params);
  }

  async getAudiobookChapters(id: string): Promise<ApiResponse<Audiobook['chapters']>> {
    return this.get<Audiobook['chapters']>(`/${id}/chapters`);
  }
} 