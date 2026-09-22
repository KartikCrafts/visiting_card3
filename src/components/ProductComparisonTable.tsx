import React from 'react';
import { motion } from 'motion/react';
import { Table, MessageCircle, Layers, Sparkles, Ruler, Scale } from 'lucide-react';
import { ProductItem, ShopConfig } from '../types';

interface ProductComparisonTableProps {
  products: ProductItem[];
  categoryTitle: string;
  config: ShopConfig;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductComparisonTable: React.FC<ProductComparisonTableProps> = ({
  products,
  categoryTitle,
  config,
  onSelectProduct,
}) => {
  if (products.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className="my-14 sm:my-16 bg-[#F6EFE6] rounded-3xl p-5 sm:p-10 border border-[#DECFC0] shadow-[0_4px_20px_-4px_rgba(44,38,33,0.05)] overflow-hidden"
    >
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EADBCC] text-neutral-900 border border-[#CDBAA5] mb-2">
          <Table className="w-3.5 h-3.5" /> Material & Dimension Specification Matrix
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-['Playfair_Display',serif]">
          Compare {categoryTitle} Materials, Sizes & Rates
        </h3>
        <p className="text-xs sm:text-sm text-neutral-700 mt-2">
          Side-by-side assessment of raw materials, surface finish, dimensions, paper density, and Ahmedabad factory pricing.
        </p>
      </div>

      {/* MOBILE SCREEN: Card list format */}
      <div className="block lg:hidden space-y-3.5">
        {products.map((item) => {
          const firstTier = item.qtyTiers[0];
          const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            `Hello ${config.ownerName}! I want to order ${item.name} (${item.material}) at ${config.currency}${firstTier?.price || 0}.`
          )}`;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-[#DECFC0] shadow-xs space-y-3 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-neutral-900 font-['Playfair_Display',serif]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5">{item.dimensions}</p>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EADBCC] text-neutral-800 border border-[#CDBAA5]">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-neutral-700 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EAE0D3]">
                <div>
                  <span className="font-bold text-neutral-900">Material: </span>
                  <span>{item.material}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900">Finish: </span>
                  <span>{item.finish}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900">Weight / GSM: </span>
                  <span>{item.weightGsm}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-neutral-500 block">
                    Starting Package:
                  </span>
                  <span className="text-base font-bold text-neutral-900">
                    {config.currency}{firstTier?.price} ({firstTier?.label})
                  </span>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white font-bold text-xs inline-flex items-center gap-1 shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP SCREEN: Comprehensive Table */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#DECFC0] bg-white shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#FAF7F2] border-b border-[#DECFC0] text-neutral-900 font-bold text-[11px] uppercase tracking-wider">
              <th className="py-3.5 px-4">Design / Variant</th>
              <th className="py-3.5 px-4">Which Material Made</th>
              <th className="py-3.5 px-4">Look & Finish</th>
              <th className="py-3.5 px-4">Height x Width</th>
              <th className="py-3.5 px-4">Weight / Density</th>
              <th className="py-3.5 px-4">Direct Batch Rate</th>
              <th className="py-3.5 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAE0D3] text-neutral-800">
            {products.map((item) => {
              const firstTier = item.qtyTiers[0];
              const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hello ${config.ownerName}! I want to order ${item.name} (${item.material}) at ${config.currency}${firstTier?.price || 0}.`
              )}`;

              return (
                <tr key={item.id} className="hover:bg-[#FAF7F2]/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-neutral-900">
                    <div className="flex items-center gap-1.5">
                      <span className="font-['Playfair_Display',serif] text-sm">{item.name}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#EADBCC] text-neutral-800">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate" title={item.material}>
                    {item.material}
                  </td>
                  <td className="py-3 px-4">{item.finish}</td>
                  <td className="py-3 px-4 font-mono">{item.dimensions}</td>
                  <td className="py-3 px-4 font-semibold">{item.weightGsm}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-neutral-900 text-sm">
                      {config.currency}{firstTier?.price}
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      ({firstTier?.label})
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-[11px] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};
