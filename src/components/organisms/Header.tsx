import React from 'react';
import Link from 'next/link';
import BukuIcon from '@/assets/bp.svg';
import { cn } from '@/utils/utils';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/atoms/button';

const Header: React.FC = () => (
  <header className={cn("w-full border-b bg-header")}>
    <div className="container flex h-16 items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-serif text-white">
        <BukuIcon width={24} />
        <span className="hidden md:block">BukuPintar</span>
      </Link>

      {/* Navigation */}
      {/* <Navigation /> */}

      <div className="flex items-center space-x-2">
        <Button 
          variant="destructive" 
          size="sm" 
          className="hidden md:flex" 
          asChild
        >
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" />
            Sign in
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          asChild
        >
          <Link href="/login">
            <LogIn className="h-5 w-5 text-white" />
            <span className="sr-only">Sign ini</span>
          </Link>
        </Button>
      </div>
    </div>
  </header>
);

export default Header;
