import React from 'react';
import { cn } from '@/utils/utils';
import { Banner } from '@/models/Banner';
import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';
import BannerCard from '@/components/molecules/BannerCard';

interface HeroSectionProps {
  className?: string;
  banners: Banner[];
  loading?: boolean;
  error?: string | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className, loading, error, banners }) => {
  return (
    <section className={cn('py-4', className)}>
      <div className="container px-4 md:px-6">
        <ScrollArea className="w-full" type="auto">
          <div className="flex gap-4 pb-2">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <BannerCard key={index} loading />
              ))
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : banners && banners.length > 0 ? (
              banners.map((banner) => (
                <BannerCard key={banner.id} banner={banner} />
              ))
            ) : (
              <div className="text-muted-foreground">No banners available</div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default HeroSection;
