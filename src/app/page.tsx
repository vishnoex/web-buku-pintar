import { Metadata } from 'next';
import HomeView from '../views/HomeView';

export const metadata: Metadata = {
  title: 'BukuPintar',
  description: 'Welcome to Buku Pintar - Your Smart Learning Platform',
};

export default function Home() {
  return <HomeView />;
}
