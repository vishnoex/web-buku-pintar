import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Inspiration } from '@/models/Inspiration';
import { Heart, Share2, Bookmark } from 'lucide-react';
import { format } from 'date-fns';

interface InspirationCardProps {
  inspiration: Inspiration; // Accept the full Inspiration object
}

const InspirationCard: React.FC<InspirationCardProps> = ({
  inspiration,
}) => {
  return (
    <Link href={`/inspirations/${inspiration.slug}`} className="block group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="aspect-video overflow-hidden">
        <Image
          src={inspiration.coverImage}
          alt={inspiration.title}
          width={320} // Keep existing image dimensions if appropriate
          height={224}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-muted-foreground">{inspiration.source}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            {inspiration.publishedAt ? format(new Date(inspiration.publishedAt), 'MMM d, yyyy') : 'N/A'}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{inspiration.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{inspiration.excerpt}</p>
        {inspiration.quote && (
          <blockquote className="border-l-4 border-brand-blue pl-4 italic mb-4">
            &ldquo; {inspiration.quote} &rdquo;
            {inspiration.authorQuote && (
              <footer className="text-sm text-muted-foreground mt-2">
                — {inspiration.authorQuote}
              </footer>
            )}
          </blockquote>
        )}
        <div className="flex items-center gap-4 mt-4">
          {/* Assuming these buttons are for interaction and not navigation */} 
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-brand-blue transition-colors">
            <Heart className="w-4 h-4" />
            <span>{inspiration.impact?.likes || 0}</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-brand-blue transition-colors">
            <Share2 className="w-4 h-4" />
            <span>{inspiration.impact?.shares || 0}</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-brand-blue transition-colors">
            <Bookmark className="w-4 h-4" />
            <span>{inspiration.impact?.saves || 0}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default InspirationCard;
