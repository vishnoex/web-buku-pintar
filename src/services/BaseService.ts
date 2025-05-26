import { ApiResponse, PaginationParams, PaginatedResponse } from '@/types';

const TIMEOUT_DURATION = 10000; // 10 seconds

export class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetchWithTimeout(url: string, options: RequestInit = {}, timeout: number = TIMEOUT_DURATION): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout. Please try again.');
        }
        if (error.message === 'Failed to fetch') {
          throw new Error('Network error. Please check your connection.');
        }
      }
      throw error;
    }
  }

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
      }
      throw new Error('An unexpected error occurred');
    }
  }

  protected async post<T, D = Record<string, unknown>>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to post data: ${error.message}`);
      }
      throw new Error('An unexpected error occurred');
    }
  }

  protected async getPaginated<T>(
    endpoint: string,
    params: PaginationParams
  ): Promise<PaginatedResponse<T>> {
    try {
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        limit: params.limit.toString(),
      });
      const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch paginated data: ${error.message}`);
      }
      throw new Error('An unexpected error occurred');
    }
  }
} 