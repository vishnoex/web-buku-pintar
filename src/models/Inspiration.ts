import { BaseModel } from '@/types';
import { Category } from './Category';

export interface Inspiration extends BaseModel {
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
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  // Inspiration specific fields
  source?: string;
  quote?: string;
  authorQuote?: string;
  relatedLinks?: string[];
  mood?: string[];
  impact?: {
    likes: number;
    shares: number;
    saves: number;
  };
} 