import React from 'react';
import Image from 'next/image';
import { Article } from '@/models/Article';
import Link from 'next/link';
import { format } from 'date-fns';
import { Heart } from 'lucide-react';

interface ArticleCardProps {
  article?: Article;
  loading?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, loading = false }) => {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm animate-pulse overflow-hidden w-60">
        <div className="relative w-full aspect-video rounded-t-lg bg-gray-200"></div>
        <div className="p-4">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <Link href={`/articles/${article.slug}`} className="block">
      <div className="rounded-2xl bg-card shadow-sm transition-all hover:shadow-md overflow-hidden w-60 hc-30 grid grid-cols-2 gap-2">
        <div className="relative w-full h-full aspect-video rounded-l-lg overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            width={320}
            height={224}
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="py-2 prc-2 flex flex-col justify-between">
          <h3 className="font-semibold text-sm line-clamp-2">{article.title}</h3>
          {/* Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="text-xs">{article.publishedAt ? format(new Date(article.publishedAt), 'dd MMM yyyy') : 'N/A'}</span>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard; 
