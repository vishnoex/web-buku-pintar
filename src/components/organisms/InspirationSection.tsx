import React from 'react';
import { cn } from '@/utils/utils';
import { Button } from '@/components/atoms/button';
import Link from 'next/link';
import { Heart, Share2, Bookmark } from 'lucide-react';
import { useMockInspirations } from '@/hooks/useMockInspirations';

interface InspirationSectionProps {
  className?: string;
}

const InspirationSection: React.FC<InspirationSectionProps> = ({ className }) => {
  const inspirations = useMockInspirations(3); // Get 3 mock inspirations
  
  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className="container px-4 md:px-6">
        <div className="py-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
            Daily Inspiration
          </h2>
          <p className="mt-4 text-muted-foreground max-w-[600px] mx-auto">
            Discover daily doses of motivation and wisdom to fuel your personal growth journey.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {inspirations.map((inspiration) => (
            <div
              key={inspiration.id}
              className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={inspiration.coverImage}
                  alt={inspiration.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">{inspiration.source}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(inspiration.publishedAt || '').toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{inspiration.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{inspiration.excerpt}</p>
                {inspiration.quote && (
                  <blockquote className="border-l-4 border-brand-blue pl-4 italic mb-4">
                    "{inspiration.quote}"
                    {inspiration.authorQuote && (
                      <footer className="text-sm text-muted-foreground mt-2">
                        — {inspiration.authorQuote}
                      </footer>
                    )}
                  </blockquote>
                )}
                <div className="flex items-center gap-4 mt-4">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Heart className="w-4 h-4" />
                    <span>{inspiration.impact?.likes || 0}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    <span>{inspiration.impact?.shares || 0}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Bookmark className="w-4 h-4" />
                    <span>{inspiration.impact?.saves || 0}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
            <Link href="/inspirations">View All Inspirations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InspirationSection; 