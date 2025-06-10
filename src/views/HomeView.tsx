"use client";

import React, { useState } from 'react';
import Header from '@/components/organisms/Header';
import HeroSection from '@/components/organisms/HeroSection';
import BookSummaryCarousel from '@/components/organisms/BookSummaryCarousel';
import TopBookSection from '@/components/organisms/TopBookSection';
import InspirationSection from '@/components/organisms/InspirationSection';
import ArticleSection from '@/components/organisms/ArticleSection';
import { useHomeViewModel } from '@/viewmodels/HomeViewModel';
import CategorySection from '@/components/organisms/CategorySection';
import SearchBar from '@/components/molecules/SearchBar';

import { Star, BookOpen, Lightbulb, BookOpenCheck, FileText } from 'lucide-react';

const HomeView: React.FC = () => {
  const { categories, banners, inspirations, books, loading, error } = useHomeViewModel();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'star': Star,
    'book-open': BookOpen,
    'lightbulb': Lightbulb,
    'book-open-check': BookOpenCheck,
    'file-text': FileText,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Search Bar */}
        <section className="py-4">
          <div className="container px-4 md:px-6">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </section>
        {/* Category Section */}
        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          loading={loading}
          error={error}
          iconMap={iconMap}
        />
        <HeroSection banners={banners} loading={loading} error={error} />
        <InspirationSection inspirations={inspirations} loading={loading} error={error} />
        {/* <HighlightSection className='bg-slate-50' /> */}
        <BookSummaryCarousel books={books} loading={loading} error={error} />
        <TopBookSection className='bg-slate-50' />
        <ArticleSection className='bg-slate-50' />
      </main>
    </div>
  );
};

export default HomeView;
