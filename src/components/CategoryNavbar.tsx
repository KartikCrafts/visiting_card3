import React from 'react';
import { motion } from 'motion/react';
import {
  CreditCard,
  FileSpreadsheet,
  FileText,
  Tag,
  Layers,
  Flag,
  Eye,
  Mail,
  Sparkles
} from 'lucide-react';
import { ProductCategoryKey } from '../types';
import { CATEGORIES_CONFIG } from '../data/categoriesConfig';

interface CategoryNavbarProps {
  activeCategory: ProductCategoryKey;
  onSelectCategory: (category: ProductCategoryKey) => void;
  productCounts: Record<ProductCategoryKey, number>;
}

const getCategoryIcon = (iconName: string, className: string = 'w-4 h-4') => {
  switch (iconName) {
    case 'CreditCard':
      return <CreditCard className={className} />;
    case 'FileSpreadsheet':
      return <FileSpreadsheet className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Tag':
      return <Tag className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Flag':
      return <Flag className={className} />;
    case 'Eye':
      return <Eye className={className} />;
    case 'Mail':
      return <Mail className={className} />;
    default:
      return <CreditCard className={className} />;
  }
};

export const CategoryNavbar: React.FC<CategoryNavbarProps> = ({
  activeCategory,
  onSelectCategory,
  productCounts,
}) => {
  return (
    <nav
      id="category-navigation-bar"
      aria-label="Product Categories Navigation"
      className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#DECFC0] shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-widest hidden md:inline-block mr-1">
              Select Product:
            </span>

            {CATEGORIES_CONFIG.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count = productCounts[cat.key] || 0;

              return (
                <button
                  key={cat.key}
                  id={`cat-nav-btn-${cat.key}`}
                  onClick={() => onSelectCategory(cat.key)}
                  className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-900'
                      : 'bg-[#F6EFE6] text-neutral-800 hover:bg-[#EFE5D8] hover:text-neutral-950 border border-[#DECFC0]'
                  }`}
                >
                  <span
                    className={`transition-transform duration-200 ${
                      isActive ? 'scale-110 text-amber-400' : 'text-neutral-700 group-hover:scale-110'
                    }`}
                  >
                    {getCategoryIcon(cat.iconName, 'w-4 h-4')}
                  </span>

                  <div className="text-left">
                    <span className="font-semibold">{cat.label}</span>
                  </div>

                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#EADBCC] text-neutral-800'
                    }`}
                  >
                    {count}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-xl bg-neutral-900 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
