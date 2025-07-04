import React from 'react';
import { cn } from '@/utils/utils';
import { Button } from '@/components/atoms/button';
import Link from 'next/link';
import ArticleCard from '@/components/molecules/ArticleCard';
import { Article } from '@/models/Article';
import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';

interface ArticleSectionProps {
  className?: string;
  articles: Article[];
  loading?: boolean;
  error?: string | null;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ className, articles, loading, error }) => {
  return (
    <section className={cn("py-2", className)}>
      <div className="container">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-base md:text-xl font-bold tracking-tight">
              Artikel
            </h2>
            <span className="text-xs">Ilmu cepat saji, tapi sehat.</span>
          </div>

          <div className="margin-block-end">
            <Button asChild variant="ghost">
              <Link href="/articles">Semua</Link>
            </Button>
          </div>
        </div>

        <ScrollArea className="w-full" type="auto">
          <div className="flex gap-4 py-2 px-2">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <ArticleCard key={index} loading />
              ))
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : articles && articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="text-muted-foreground">No articles available</div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default ArticleSection; 