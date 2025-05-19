import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { BookOpen, Search, FileText, LogIn } from 'lucide-react';

import { Button } from '@/components/atoms/button';

const Header: React.FC = () => (
  <header className={cn("w-full border-b bg-background")}>
    <div className="container flex h-16 items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold">
        <BookOpen className="h-6 w-6" />
        <span>BukuPintar</span>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/books" className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
          <BookOpen className="h-4 w-4" />
          <span>Books</span>
        </Link>
        <Link href="/articles" className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
          <FileText className="h-4 w-4" />
          <span>Articles</span>
        </Link>
        <Link href="/search" className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
          <Search className="h-4 w-4" />
          <span>Search</span>
        </Link>
      </nav>

      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
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
            <LogIn className="h-5 w-5" />
            <span className="sr-only">Sign in</span>
          </Link>
        </Button>
      </div>
    </div>
  </header>
);

export default Header;
