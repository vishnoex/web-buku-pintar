"use client";

import Header from '@/components/organisms/Header';
import HeroSection from '@/components/organisms/HeroSection';
import BookSummaryCarousel from '@/components/organisms/BookSummaryCarousel';
import HighlightSection from '@/components/organisms/HighlightSection';
import TopBookSection from '@/components/organisms/TopBookSection';
import InspirationSection from '@/components/organisms/InspirationSection';
import ArticleSection from '@/components/organisms/ArticleSection';
import { useHomeViewModel } from '@/viewmodels/HomeViewModel';

const HomeView: React.FC = () => {
  const { categories, banners, books, loading, error } = useHomeViewModel();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection categories={categories} banners={banners} loading={loading} error={error} />
        <HighlightSection className='bg-slate-50' />
        <BookSummaryCarousel books={books} loading={loading} error={error} />
        <TopBookSection className='bg-slate-50' />
        <InspirationSection />
        <ArticleSection className='bg-slate-50' />
      </main>
    </div>
  );
};

export default HomeView;
