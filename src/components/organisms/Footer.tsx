import React from 'react';
import Link from 'next/link';
import { Home, Heart, List, User } from 'lucide-react';
import { cn } from '@/utils/utils';
import { useRouter } from 'next/router';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <footer className={cn("fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 py-2 shadow-lg md:hidden", className)}>
      <nav className="flex justify-around items-center h-full">
        <Link href="/" className={cn("flex flex-col items-center justify-center p-2 rounded-lg transition-colors", currentPath === '/' ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-600')}>
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/favorites" className={cn("flex flex-col items-center justify-center p-2 rounded-lg transition-colors", currentPath === '/favorites' ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-600')}>
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">Favorites</span>
        </Link>
        <Link href="/notifications" className={cn("relative flex flex-col items-center justify-center p-2 rounded-lg transition-colors", currentPath === '/notifications' ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-600')}>
          <List className="w-6 h-6" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 px-1.5 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">0</span>
          <span className="text-xs mt-1">List</span>
        </Link>
        <Link href="/profile" className={cn("flex flex-col items-center justify-center p-2 rounded-lg transition-colors", currentPath === '/profile' ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-600')}>
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer; 