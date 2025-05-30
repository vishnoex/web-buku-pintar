"use client";

import React from 'react';
import { cn } from '@/utils/utils';
import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';

interface BookDetailTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BookDetailTabs: React.FC<BookDetailTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabClass = (tabName: string) => cn(
    "py-2 px-4 text-sm rounded-lg transition-colors",
    activeTab === tabName
      ? 'tab-primary-12 text-primary-600'
      : 'font-medium text-gray-500 hover:text-gray-700'
  );

  return (
    <div className="mb-6">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-4 border-b pb-2">
          <button
            className={tabClass('Sinopsis')}
            onClick={() => setActiveTab('Sinopsis')}
          >
            Sinopsis
          </button>
          <button
            className={tabClass('Daftar Isi')}
            onClick={() => setActiveTab('Daftar Isi')}
          >
            Daftar Isi
          </button>
          <button
            className={tabClass('Ringkasan')}
            onClick={() => setActiveTab('Ringkasan')}
          >
            Ringkasan
          </button>
          <button
            className={tabClass('Intisari')}
            onClick={() => setActiveTab('Intisari')}
          >
            Intisari
          </button>
          <button
            className={tabClass('Sampel Gratis')}
            onClick={() => setActiveTab('Sampel Gratis')}
          >
            Sampel Gratis
          </button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default BookDetailTabs;
