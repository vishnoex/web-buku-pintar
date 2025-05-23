import React from 'react';
import { cn } from '@/utils/utils';
import { Button } from '@/components/atoms/button';
import Link from 'next/link';
import { useMockArticles } from '@/hooks/useMockArticles';
import ArticleCard from '@/components/molecules/ArticleCard';

interface ArticleSectionProps {
  className?: string;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ className }) => {
  const articles = useMockArticles(3); // Get 3 mock articles for the section
  
  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className="container px-4 md:px-6">
        <div className="py-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
            Latest Articles
          </h2>
          <p className="mt-4 text-muted-foreground max-w-[600px] mx-auto">
            Stay updated with our latest insights, tips, and stories.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
            <Link href="/articles">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection; 