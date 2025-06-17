'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/atoms/button';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

interface ResumeReadingButtonProps {
  slug: string;
  className?: string;
}

const ResumeReadingButton: React.FC<ResumeReadingButtonProps> = ({ slug, className = '' }) => {
  const [hasSavedPosition, setHasSavedPosition] = useState(false);
  
  useEffect(() => {
    // Check if there's a saved reading position for this book
    if (typeof window !== 'undefined') {
      const savedPosition = localStorage.getItem(`book-${slug}-position`);
      setHasSavedPosition(!!savedPosition);
    }
  }, [slug]);
  
  // Only show the button if there's a saved position
  if (!hasSavedPosition) {
    return null;
  }
  
  return (
    <Link href={`/books/${slug}/read`} passHref>
      <Button 
        variant="secondary" 
        className={`flex items-center ${className}`}
      >
        <BookOpen className="mr-2 h-5 w-5" />
        Resume Reading
      </Button>
    </Link>
  );
};

export default ResumeReadingButton;