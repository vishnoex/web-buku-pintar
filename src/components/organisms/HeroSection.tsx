import React, { useState } from 'react';
import { cn } from '@/utils/utils';
import { Star, BookOpen, Lightbulb, BookOpenCheck, FileText } from 'lucide-react';
import { Category } from '@/models/Category';
import { Banner } from '@/models/Banner';
import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';
import BannerCard from '@/components/molecules/BannerCard';

interface HeroSectionProps {
  className?: string;
  categories: Category[];
  banners: Banner[];
  loading?: boolean;
  error?: string | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'star': Star,
  'book-open': BookOpen,
  'lightbulb': Lightbulb,
  'book-open-check': BookOpenCheck,
  'file-text': FileText,
};

const HeroSection: React.FC<HeroSectionProps> = ({ className, categories, loading, error, banners }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  return (
    <section className={cn('py-4 md:py-8', className)}>
      <div className="container px-4 md:px-6">
        {/* Search Bar */}
        <div className="flex items-center w-full max-w-xl mx-auto mb-6 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari inspirasi"
            className="w-full rounded-full bg-[#FAFAFF] border-none pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-sm"
          />
        </div>
        {/* Category Section */}
        <ScrollArea className="w-full mb-6" type="auto">
          <div className="flex gap-4 pb-2">
            {loading ? (
              <div className="text-muted-foreground">Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : categories.map((cat) => {
              const Icon = iconMap[cat.icon || 'star'] || Star;
              const isActive = selectedCategory === cat.slug;
              return (
                <button key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={cn('flex flex-col items-center min-w-[80px] px-2 py-2 rounded-full transition-colors')}
                >
                  <span className={cn('mb-1 flex items-center justify-center w-12 h-12 rounded-full', isActive ? 'bg-[#7B61FF] text-white' : 'bg-[#E9E6FF] text-[#7B61FF]')}> 
                    <Icon className="w-7 h-7" />
                  </span>
                  <span className="text-xs font-medium text-[#000000]">{cat.name}</span>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {/* Banner Section */}
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
