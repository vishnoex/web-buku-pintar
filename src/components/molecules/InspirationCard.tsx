import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Inspiration } from '@/models/Inspiration';
import { Heart, BookOpen, Play } from 'lucide-react';
import { format } from 'date-fns';

interface InspirationCardProps {
  inspiration?: Inspiration;
  loading?: boolean;
}

const InspirationCard: React.FC<InspirationCardProps> = ({
  inspiration,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="block rounded-lg bg-white shadow-sm animate-pulse">
        <div className="aspect-video overflow-hidden rounded-t-lg bg-gray-200"></div>
        <div className="p-4 w-60">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex space-x-2 mb-4">
            <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!inspiration) return null;

  return (
    <div className="block group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
      <div className="aspect-video overflow-hidden rounded-t-lg mb-2">
        <Image
          src={inspiration.coverImage}
          alt={inspiration.title}
          width={320}
          height={224}
          className="object-cover w-full h-full transition-transform"
        />
      </div>

      <div className="px-3 w-60">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-900">{inspiration.title}</h3>
        <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
          <div>
            <Link href={`/inspirations/${inspiration.slug}`} className="flex-1 px-4 py-2 bg-[#7B61FF] text-white rounded-lg flex items-center justify-center font-medium">
              <span className="mr-2">Baca</span>
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>
          <div>
            <button className="flex-1 px-4 py-2 bg-[#7B61FF] text-white rounded-lg flex items-center justify-center font-medium">
              <span className="mr-2">Dengar</span>
              <Play className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="text-xs">{inspiration.publishedAt ? format(new Date(inspiration.publishedAt), 'dd MMM yyyy') : 'N/A'}</span>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspirationCard;
