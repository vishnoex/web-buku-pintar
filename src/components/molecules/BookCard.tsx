"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Ebook } from '@/models/Ebook';

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
      <div className="rounded-2xl bg-green-100 p-4 flex flex-col items-center shadow w-60 relative animate-pulse" style={{ minHeight: 340 }}>
        <div className="w-40 h-56 bg-white rounded-lg mb-4"></div>
        <div className="text-center mb-2 w-full">
          <div className="h-3 bg-white rounded w-1/2 mx-auto mb-1"></div>
          <div className="h-4 bg-white rounded w-3/4 mx-auto mb-1"></div>
          <div className="h-3 bg-white rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <Link href={`/books/${book.slug}`}>
      <div
        className="rounded-2xl bg-green-100 p-4 flex flex-col items-center shadow hover:shadow-lg transition cursor-pointer w-60 relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ minHeight: 340 }}
      >
        <div className="w-40 h-56 bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden">
          <Image 
            src={book.coverImage}
            alt={book.title}
            width={160}
            height={224}
            className="object-contain w-full"
          />
        </div>
        <div className="text-center mb-2">
          <div className="text-xs text-gray-700 font-semibold mb-1">{book.author.name}</div>
          <div className="text-base font-bold text-gray-900 mb-1">{book.title}</div>
          {book.description && (
            <div className="text-xs text-gray-600">{book.description}</div>
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
