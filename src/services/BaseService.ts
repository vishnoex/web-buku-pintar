import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';

export class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }

  protected async post<T, D = Record<string, unknown>>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  protected async getPaginated<T>(
    endpoint: string,
    params: PaginationParams
  ): Promise<PaginatedResponse<T>> {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
    });
    const response = await fetch(`${this.baseUrl}${endpoint}?${queryParams}`);
    return response.json();
  }
} 