import { Metadata } from 'next';
import BooksView from '@/views/BooksView';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Explore our collection of insightful book summaries',
};

export default function BooksPage() {
  return <BooksView />;
} 