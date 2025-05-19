"use client";
import Header from '@/components/organisms/Header';
import HeroSection from '@/components/organisms/HeroSection';
import BookSummaryCarousel from '@/components/organisms/BookSummaryCarousel';
import HighlightSection from '@/components/organisms/HighlightSection';
import TopBookSection from '@/components/organisms/TopBookSection';

const HomeView: React.FC = () => {
  // const { title, description } = useHomeViewModel();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HighlightSection className='bg-slate-50' />
        <BookSummaryCarousel />
        <TopBookSection className='bg-slate-50' />
      </main>
    </div>
  );
};

export default HomeView;
