"use client";
import { useHomeViewModel } from '@/viewmodels/HomeViewModel';
import Header from '@/components/organisms/Header';
import HeroSection from '@/components/organisms/HeroSection';

const HomeView = () => {
  const { title, description } = useHomeViewModel();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
    </div>
  );
};

export default HomeView;
