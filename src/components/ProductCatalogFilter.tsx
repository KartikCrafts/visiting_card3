import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductCatalogFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  availableTags: string[];
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'weight';
  onSortChange: (sort: 'recommended' | 'price-low' | 'price-high' | 'weight') => void;
  totalFilteredCount: number;
  totalCount: number;
}

export const ProductCatalogFilter: React.FC<ProductCatalogFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onSelectTag,
  availableTags,
  sortBy,
  onSortChange,
  totalFilteredCount,
  totalCount,
}) => {
  return (
    <div className="mb-8 space-y-4">
      {/* Top Search & Sort Control Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search material, paper weight, finish, or dimensions..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DECFC0] text-xs font-medium text-neutral-900 placeholder:text-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-600 absolute left-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) =>
                onSortChange(
                  e.target.value as 'recommended' | 'price-low' | 'price-high' | 'weight'
                )
              }
              className="pl-8 pr-8 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DECFC0] text-xs font-bold text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 cursor-pointer appearance-none"
            >
              <option value="recommended">Sort: Factory Recommended</option>
              <option value="price-low">Price: Lowest First</option>
              <option value="price-high">Price: Highest First</option>
              <option value="weight">Density: Highest GSM / Weight</option>
            </select>
          </div>

          <span className="text-xs font-bold text-neutral-600 bg-[#FAF7F2] px-3 py-2.5 rounded-xl border border-[#DECFC0] whitespace-nowrap">
            Showing {totalFilteredCount} of {totalCount}
          </span>
        </div>
      </div>

      {/* Subcategory Tag Chips */}
      {availableTags.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => onSelectTag('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedTag === 'All'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-[#FAF7F2] text-neutral-700 hover:bg-[#EFE5D8] border border-[#DECFC0]'
            }`}
          >
            All Sub-Types
          </button>

          {availableTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => onSelectTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-neutral-700 hover:bg-[#EFE5D8] border border-[#DECFC0]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
