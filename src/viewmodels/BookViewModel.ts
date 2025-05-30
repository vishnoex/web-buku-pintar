import { makeAutoObservable } from 'mobx';
import { BookService } from '@/services/BookService';
import { Ebook } from '@/models/Ebook';
import { PaginationParams } from '@/types';
import config from '@/config/app.config';

export class BookViewModel {
  private bookService: BookService;
  books: Ebook[] = [];
  currentBook: Ebook | null = null;
  loading = false;
  error: string | null = null;
  totalPages = 0;
  currentPage = 1;
  searchQuery = '';
  retryCount = 0;
  maxRetries = 3;
  retryDelay = 2000; // 2 seconds

  constructor() {
    makeAutoObservable(this);
    this.bookService = new BookService();
  }

  private async handleApiCall<T>(
    apiCall: () => Promise<T>,
    errorMessage: string
  ): Promise<T | null> {
    try {
      this.loading = true;
      this.error = null;
      const result = await apiCall();
      this.retryCount = 0;
      return result;
    } catch (error) {
      errorMessage = error as string;
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.handleApiCall(apiCall, errorMessage);
      }
      this.error = errorMessage;
      return null;
    } finally {
      this.loading = false;
    }
  }

  async loadBooks(params: PaginationParams = { page: 1, limit: 8 }) {
    const result = await this.handleApiCall(
      () => this.bookService.getBooks(params),
      'Failed to load books. Please try again.'
    );

    if (result) {
      this.books = result.data;
      this.totalPages = result.totalPages;
      this.currentPage = result.currentPage;
    }
  }

  async searchBooks(query: string, params: PaginationParams = { page: 1, limit: 8 }) {
    this.searchQuery = query;
    const result = await this.handleApiCall(
      () => this.bookService.searchBooks(query, params),
      'Failed to search books. Please try again.'
    );

    if (result) {
      this.books = result.data;
      this.totalPages = result.totalPages;
      this.currentPage = result.currentPage;
    }
  }

  async loadBooksByCategory(categoryId: string, params: PaginationParams = { page: 1, limit: 8 }) {
    const result = await this.handleApiCall(
      () => this.bookService.getBooksByCategory(categoryId, params),
      'Failed to load books by category. Please try again.'
    );

    if (result) {
      this.books = result.data;
      this.totalPages = result.totalPages;
      this.currentPage = result.currentPage;
    }
  }

  async getBookBySlug(slug: string) {
    const result = await this.handleApiCall(
      () => this.bookService.getBookBySlug(slug),
      'Failed to load book details. Please try again.'
    );

    if (result) {
      this.currentBook = result.data;
    }

    return result;
  }

  async retryLastOperation() {
    this.retryCount = 0;
    if (this.searchQuery) {
      await this.searchBooks(this.searchQuery, { page: this.currentPage, limit: 8 });
    } else {
      await this.loadBooks({ page: this.currentPage, limit: 8 });
    }
  }

  clearError() {
    this.error = null;
  }

  get isUsingMockData() {
    return config.useMockData;
  }
} 