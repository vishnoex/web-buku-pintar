import React from 'react';
import { cn } from '@/utils/utils';
import { Button } from '@/components/atoms/button';
import Link from 'next/link';
import { useMockInspirations } from '@/hooks/useMockInspirations';
import InspirationCard from '@/components/molecules/InspirationCard';

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
            <InspirationCard key={inspiration.id} inspiration={inspiration} />
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