import React from 'react';
import { cn } from '@/utils/utils';
import Image from 'next/image';

interface BookCoverProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'portrait' | 'square';
}

const BookCover: React.FC<BookCoverProps> = ({ 
  src, 
  alt, 
  className,
  aspectRatio = 'portrait'
}) => {
  return (
    <div className={cn(
      "overflow-hidden rounded-md bg-muted",
      aspectRatio === 'portrait' ? 'aspect-[2/3]' : 'aspect-square',
      className
    )}>
      <Image
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-all hover:scale-105"
        fill={true}
      />
    </div>
  );
};

export default BookCover;
