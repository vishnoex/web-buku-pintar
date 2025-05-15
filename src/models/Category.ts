import { BaseModel } from '@/types';

export interface Category extends BaseModel {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
  order: number;
  isActive: boolean;
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}
