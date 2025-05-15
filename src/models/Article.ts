import { BaseModel } from '@/types';
import { Category } from './Category';

export interface Article extends BaseModel {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  categoryId: string;
  category?: Category;
  tags: string[];
  readingTime: number; // in minutes
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
} 