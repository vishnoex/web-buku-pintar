import React from 'react';
import { Category } from '@/models/Category';
import { ScrollArea, ScrollBar } from '@/components/atoms/scroll-area';
import CategoryButton from '@/components/molecules/CategoryButton';

interface CategorySectionProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  loading?: boolean;
  error?: string | null;
  iconMap: Record<string, React.ComponentType<{ className?: string }>>;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  loading,
  error,
  iconMap,
}) => (
  <section>
    <div className="container px-4 md:px-6">
      <ScrollArea className="w-full" type="auto">
        <div className="flex gap-4 content-center">
          {loading ? (
            // Loading state
            Array.from({ length: 5 }).map((_, index) => (
              <CategoryButton key={index} loading />
            ))
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              category={cat}
              isActive={selectedCategory === cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              iconMap={iconMap}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  </section>
);

export default CategorySection; 