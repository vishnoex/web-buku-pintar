import React from 'react';
import Image from 'next/image';
import { Article } from '@/models/Article';
import Link from 'next/link';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/articles/${article.slug}`} className="block group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="aspect-video overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-muted-foreground">{article.author.name}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            {article.publishedAt ? format(new Date(article.publishedAt), 'MMM d, yyyy') : 'N/A'}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
      </div>
    </Link>
  );
};

export default ArticleCard; 
