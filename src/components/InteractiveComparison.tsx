import React from 'react';
import { motion } from 'motion/react';
import { Table, Check, MessageCircle, ShieldCheck, Layers, Sparkles } from 'lucide-react';
import { VisitingCardItem, ShopConfig } from '../types';

interface ComparisonProps {
  cards: VisitingCardItem[];
  config: ShopConfig;
  onSelectCard: (card: VisitingCardItem) => void;
}

export const InteractiveComparison: React.FC<ComparisonProps> = ({ cards, config, onSelectCard }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.6 }}
      className="my-14 sm:my-16 bg-[#F6EFE6] rounded-3xl p-5 sm:p-10 border border-[#DECFC0] shadow-[0_4px_20px_-4px_rgba(44,38,33,0.05)] overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-2xl mx-auto mb-8"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EADBCC] text-neutral-900 border border-[#CDBAA5] mb-2">
          <Table className="w-3.5 h-3.5" /> Direct Material & Price Comparison
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-['Playfair_Display',serif]">
          Which Card Material Suits Your Brand?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-700 mt-2">
          A side-by-side comparison of paper weight, thickness, durability, and standard 500-card package rates.
        </p>
      </motion.div>

      {/* MOBILE SCREEN: Fully responsive vertical cards with ZERO horizontal slider/scrollbar */}
      <div className="block md:hidden space-y-3.5">
        {cards.map((card) => {
          const isWaterproof = card.category === 'Waterproof PVC';
          const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            `Hello ${config.ownerName} (${config.shopName})! I would like to order 500 cards of '${card.name}' (${card.material}) at ${config.currency}${card.price500}.`
          )}`;

          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-4 border border-[#DECFC0] shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-neutral-900 font-['Playfair_Display',serif]">
                    {card.name}
                  </h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5">
                    {card.gsm} • {card.thickness}
                  </p>
                </div>
                {card.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[#EADBCC] text-neutral-800 border border-[#CDBAA5] shrink-0">
                    {card.badge}
                  </span>
                )}
              </div>

              {/* Highlight bullet */}
              <p className="text-xs text-neutral-700 font-medium bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EFE5D8]">
                {card.khasiyat[0]}
              </p>

              {/* Durability & Price row */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold">Durability</span>
                  {isWaterproof ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                      <Check className="w-3.5 h-3.5" /> 100% Waterproof
                    </span>
                  ) : (
                    <span className="text-neutral-700 font-medium">Standard Water-Resist</span>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold">500 Cards Price</span>
                  <span className="text-base font-black text-neutral-900">
                    {config.currency}{card.price500}
                  </span>
                  <span className="text-[10px] text-neutral-500 block">
                    ({config.currency}{(card.price500 / 500).toFixed(2)}/card)
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <a
                id={`compare-mobile-whatsapp-${card.id}`}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Order 500 Cards on WhatsApp</span>
              </a>
            </div>
          );
        })}
      </div>

      {/* DESKTOP & TABLET SCREEN: Full comparison table */}
      <div className="hidden md:block rounded-2xl border border-[#DECFC0] bg-white shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#EFE5D8] text-neutral-900 border-b border-[#DECFC0] text-xs uppercase font-extrabold tracking-wider">
              <th className="p-4 sm:p-5">Card Material</th>
              <th className="p-4">GSM & Thickness</th>
              <th className="p-4">Key Advantage</th>
              <th className="p-4">Durability</th>
              <th className="p-4">500 Cards Rate</th>
              <th className="p-4 text-center">Direct Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFE5D8] text-xs sm:text-sm">
            {cards.map((card) => {
              const isWaterproof = card.category === 'Waterproof PVC';
              const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hello ${config.ownerName} (${config.shopName})! I would like to order 500 cards of '${card.name}' (${card.material}) at ${config.currency}${card.price500}.`
              )}`;

              return (
                <tr key={card.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-neutral-900">
                    <div className="flex items-center gap-2">
                      <span>{card.name}</span>
                      {card.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[#EADBCC] text-neutral-800 border border-[#CDBAA5]">
                          {card.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-neutral-900 block">{card.gsm}</span>
                    <span className="text-[11px] text-neutral-500">{card.thickness}</span>
                  </td>
                  <td className="p-4 max-w-xs text-neutral-700 font-medium">
                    <p className="line-clamp-2">{card.khasiyat[0]}</p>
                  </td>
                  <td className="p-4">
                    {isWaterproof ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <Check className="w-4 h-4" /> 100% Waterproof
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-neutral-600 font-medium">
                        Standard Water-Resist
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-black text-neutral-900 whitespace-nowrap text-base">
                    {config.currency}{card.price500}
                    <span className="text-[11px] font-normal text-neutral-500 block">
                      ({config.currency}{(card.price500 / 500).toFixed(2)}/card)
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <a
                      id={`compare-whatsapp-${card.id}`}
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
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
