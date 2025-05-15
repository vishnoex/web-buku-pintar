import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { Button } from '@/components/atoms/button';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fade-in">
              BukuPintar
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl animate-fade-in" style={{animationDelay: '0.1s'}}>
              Ringkasan buku praktis yang bisa kamu baca atau dengar sambil ngopi, jalan atau rebahan.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in" style={{animationDelay: '0.2s'}}>
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
                <Link href="/books">Explore Books</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/write">Start Writing</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              alt="Hero Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last animate-fade-in"
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
              width="550"
              height="310"
              style={{animationDelay: '0.3s'}}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
