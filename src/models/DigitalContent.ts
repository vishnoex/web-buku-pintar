import { BaseModel } from '@/types';
import { Category } from './Category';

export interface DigitalContent extends BaseModel {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  categoryId: string;
  category?: Category;
  tags: string[];
  price: number;
  discountPrice?: number;
  isFree: boolean;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  rating: {
    average: number;
    count: number;
  };
  language: string;
  duration?: number; // in minutes
  fileSize?: number; // in bytes
  format: string;
  isbn?: string;
}
