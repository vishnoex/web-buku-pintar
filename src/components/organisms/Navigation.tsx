import React from 'react';
import Link from 'next/link';
import { BookOpen, Search, FileText } from 'lucide-react';

const Navigation: React.FC = () => (
  <nav className="hidden md:flex items-center space-x-6 text-white">
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
);

export default Navigation; 