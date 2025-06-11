"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Ebook } from '@/models/Ebook';
import { Heart } from 'lucide-react';

interface BookCardProps {
  book?: Ebook;
  displayAudioPlayer?: boolean;
  onPlay?: () => void;
  loading?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  displayAudioPlayer = false,
  onPlay,
  loading = false,
}) => {
  const [hovered, setHovered] = useState(false);

  if (loading) {
    return (
      <div className="rounded-2xl bg-gray-200 p-4 flex flex-col items-center shadow w-40 hc-75 relative animate-pulse" style={{ minHeight: 340 }}>
        <div className="w-full hc-55 rounded-t-lg bg-gray-300 mb-4"></div>
        <div className="text-center w-full">
          <div className="h-5 bg-gray-300 rounded w-4/5 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <Link href={`/books/${book.slug}`}>
      <div
        className="rounded-2xl bg-card shadow-sm transition-all hover:shadow-md overflow-hidden w-40 hc-75 relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-full hc-55 aspect-video rounded-t-lg overflow-hidden bg-gradient-to-t from-black/60 via-black/30 to-transparent">
          <Image 
            src={book.coverImage}
            alt={book.title}
            width={320}
            height={224}
            className="object-cover w-full h-full absolute"
          />
          <div className="relative z-10 p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-center ml-auto">
              <button className="text-black hover:text-red-400 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="py-2 px-2">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{book.title}</h3>
          {book.duration && (
            <p className="text-xs text-gray-600">{book.duration} Menit</p>
          )}
        </div>

        {/* Audio player appears on hover */}
        {(hovered && displayAudioPlayer) && (
          <div className="absolute left-0 bottom-0 w-full bg-[#18304A] rounded-b-2xl flex items-center px-4 py-3 transition-all">
            <button
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPlay?.();
              }}
            >
              <svg width="18" height="18" fill="currentColor" className="text-[#18304A]">
                <polygon points="5,3 15,9 5,15" />
              </svg>
            </button>
            <span className="text-white font-medium mr-3">Listen</span>
            <div className="flex-1 mx-2">
              <div className="h-1 bg-white/30 rounded-full">
                <div className="h-1 bg-white rounded-full w-2/5"></div>
              </div>
            </div>
            <span className="text-white text-xs">{book.duration}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default BookCard;
