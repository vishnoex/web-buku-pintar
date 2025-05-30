import React from 'react';
import { cn } from '@/utils/utils';
import Header from '../organisms/Header';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={cn("flex-1", className)}>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
