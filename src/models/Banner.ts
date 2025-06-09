import { BaseModel } from '@/types';

export interface Banner extends BaseModel {
  title: string;
  description?: string;
  image: string;
  link?: string;
  ctaLabel?: string;
  backgroundColor?: string;
} 