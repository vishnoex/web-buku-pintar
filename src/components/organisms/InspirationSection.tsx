import React from 'react';
import { cn } from '@/utils/utils';
import { Button } from '@/components/atoms/button';
import Link from 'next/link';
import { Inspiration } from '@/models/Inspiration';
import InspirationCard from '@/components/molecules/InspirationCard';
import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';

interface InspirationSectionProps {
  className?: string;
  inspirations: Inspiration[];
  loading?: boolean;
  error?: string | null;
}

const InspirationSection: React.FC<InspirationSectionProps> = ({ className, inspirations, loading, error }) => {
  return (
    <section className={cn("py-2", className)}>
      <div className="container">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-base md:text-xl font-bold tracking-tight">
            Inspirasi Hari Ini
            </h2>
            <span className="text-xs">Untuk motivasi biar Kamu semangat dan punya pola pikir positif setiap hari!</span>
          </div>

          <div className="margin-block-end">
            <Button asChild variant="ghost">
              <Link href="/inspirations?sort=published&direction=desc">Semua</Link>
            </Button>
          </div>
        </div>

        <ScrollArea className="w-full" type="auto">
          <div className="flex gap-4 py-2 px-2">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <InspirationCard key={index} loading />
              ))
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : inspirations && inspirations.length > 0 ? (
              inspirations.map((inspiration) => (
                <InspirationCard key={inspiration.id} inspiration={inspiration} />
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

export default InspirationSection; 