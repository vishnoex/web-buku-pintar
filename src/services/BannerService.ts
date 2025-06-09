import { BaseService } from './BaseService';
import { Banner } from '@/models/Banner';
import { PaginationParams, PaginatedResponse } from '@/types';
import config from '@/config/app.config';

// Simple mock banners generator
const generateMockBanners = (): Banner[] => {
  return [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Promo BukuPintar',
      description: 'Dapatkan diskon spesial untuk pembaca baru!',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      link: '/promo',
      ctaLabel: 'Lihat Promo',
      backgroundColor: '#7B61FF',
    },
    {
      id: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Gabung Komunitas',
      description: 'Bergabunglah dengan komunitas pembaca BukuPintar.',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600',
      link: '/community',
      ctaLabel: 'Gabung',
      backgroundColor: '#332D41',
    },
    {
      id: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Baca Gratis',
      description: 'Nikmati ringkasan buku gratis setiap minggu.',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600',
      link: '/free',
      ctaLabel: 'Baca Sekarang',
      backgroundColor: '#F3F0FF',
    },
  ];
};

export class BannerService extends BaseService {
  constructor() {
    super('/api/banners');
  }

  async getBanners(params?: PaginationParams): Promise<PaginatedResponse<Banner[]>> {
    if (config.useMockData) {
      const mockBanners = generateMockBanners();
      return {
        data: mockBanners,
        total: mockBanners.length,
        totalPages: 1,
        currentPage: 1,
        status: 200,
        message: 'Success',
      };
    }
    return this.getPaginated<Banner[]>('', params || { page: 1, limit: 10 });
  }
} 