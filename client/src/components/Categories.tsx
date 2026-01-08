import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/lib/store';

interface CategoriesProps {
  onCategoryChange?: (category: string) => void;
}

export function Categories({ onCategoryChange }: CategoriesProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">What's on your mind?</h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[90px] transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-card hover:bg-muted border border-border/50'
              }`}
              data-testid={`button-category-${category.id}`}
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
