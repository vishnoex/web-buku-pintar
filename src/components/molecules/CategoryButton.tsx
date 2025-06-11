import React from 'react';
import { cn } from '@/utils/utils';
import { Category } from '@/models/Category';
import { Star } from 'lucide-react';

interface CategoryButtonProps {
  category?: Category;
  isActive?: boolean;
  onClick?: () => void;
  iconMap?: Record<string, React.ComponentType<{ className?: string }>>;
  loading?: boolean;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, isActive, onClick, iconMap, loading = false }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center min-w-[80px] px-2 py-2 rounded-full animate-pulse">
        <div className="mb-1 w-12 h-12 rounded-full bg-gray-200"></div>
        <div className="w-16 h-3 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!category || !iconMap) return null;

  const Icon = iconMap[category.icon || 'star'] || Star;

  return (
    <button
      key={category.id}
      onClick={onClick}
      className={cn('flex flex-col items-center min-w-[80px] px-2 py-2 rounded-full transition-colors')}
    >
      <span className={cn('mb-1 flex items-center justify-center w-12 h-12 rounded-full', isActive ? 'bg-[#7B61FF] text-white' : 'bg-[#E9E6FF] text-[#7B61FF]')}> 
        <Icon className="w-7 h-7" />
      </span>
      <span className="text-xs font-medium text-[#000000]">{category.name}</span>
    </button>
  );
};

export default CategoryButton; 