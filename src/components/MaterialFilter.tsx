import React from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface MaterialFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'gsm-desc';
  onSortChange: (sort: 'popular' | 'price-asc' | 'price-desc' | 'gsm-desc') => void;
  totalCards: number;
}

export const MaterialFilter: React.FC<MaterialFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCards
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-4 mb-8"
    >
      {/* Search & Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            id="material-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search material, GSM, or finish (e.g. Velvet, PVC, Kraft, Linen)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5EFE7] border border-[#DECFC0] text-neutral-900 text-sm placeholder-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
          />
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-neutral-600 hidden sm:block" />
          <span className="text-xs font-bold text-neutral-700 hidden sm:block">Sort:</span>
          <select
            id="material-sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-3 py-2.5 rounded-xl bg-[#F5EFE7] border border-[#DECFC0] text-neutral-900 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-neutral-900 cursor-pointer"
          >
            <option value="popular">Recommended / Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="gsm-desc">Highest GSM / Thickness</option>
          </select>
        </div>
      </div>

      {/* Category Pills with responsive wrapping on mobile and clean scrollbar hiding */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap sm:overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => onSelectCategory('All')}
          className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'All'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'bg-[#F5EFE7] text-neutral-800 hover:bg-[#EADBCC] border border-[#DECFC0]'
          }`}
        >
          All Materials ({totalCards})
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-[#F5EFE7] text-neutral-800 hover:bg-[#EADBCC] border border-[#DECFC0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
