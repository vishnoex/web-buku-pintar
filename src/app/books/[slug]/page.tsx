import { Metadata } from 'next';
import BookDetail from '@/views/BookDetail';

export const metadata: Metadata = {
  title: 'Book Details',
  description: 'View detailed information about the book',
};

type tParams = Promise<{ slug: string }>;

export default async function BookDetailPage({ params }: { params: tParams }) {
  return <BookDetail slug={(await params).slug} />;
} 
