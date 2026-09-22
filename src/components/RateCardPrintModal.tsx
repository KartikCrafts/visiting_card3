import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Sparkles, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { ProductItem, ShopConfig } from '../types';

interface RateCardPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  config: ShopConfig;
  categoryTitle?: string;
}

export const RateCardPrintModal: React.FC<RateCardPrintModalProps> = ({
  isOpen,
  onClose,
  products,
  config,
  categoryTitle = 'Commercial Printing',
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const logoUrl =
    config.logoUrl ||
    'https://cdn.phototourl.com/free/2026-09-05-47f48cc1-83b5-4418-88e7-41e03a644791.jpg';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl rounded-3xl bg-white border border-[#DECFC0] shadow-2xl p-6 sm:p-10 text-neutral-900 my-4 max-h-[92vh] overflow-y-auto print:p-0 print:border-none print:shadow-none"
        >
          {/* Top Actions (hidden during print) */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200 print:hidden">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EADBCC] text-neutral-900 border border-[#CDBAA5]">
                Official Factory Rate Card
              </span>
              <span className="text-xs text-neutral-500">
                Direct Ahmedabad Wholesale Pricing
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Rate Card</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-neutral-900">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt={config.shopName}
                className="w-16 h-16 rounded-full object-cover border border-[#DECFC0] shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="text-2xl font-bold font-['Playfair_Display',serif] text-neutral-900">
                  {config.shopName}
                </h2>
                <p className="text-xs text-neutral-600 font-medium">{config.tagline}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Proprietors: {config.ownerName} • Phone: {config.displayPhone}
                </p>
                <p className="text-[11px] text-neutral-500">
                  Factory: {config.address}, {config.cityState}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right text-xs text-neutral-600 bg-[#FAF7F2] p-3 rounded-xl border border-[#DECFC0] print:border-neutral-300">
              <p>
                <strong>Catalog:</strong> {categoryTitle}
              </p>
              <p>
                <strong>Effective Date:</strong>{' '}
                {new Date().toLocaleDateString('en-GB', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p>
                <strong>Currency:</strong> Indian Rupee ({config.currency})
              </p>
            </div>
          </div>

          {/* Product Rates Table */}
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b-2 border-neutral-300 text-neutral-900 font-extrabold uppercase tracking-wider">
                  <th className="py-3 px-3">Product & Material</th>
                  <th className="py-3 px-2">Look & Finish</th>
                  <th className="py-3 px-2">Size / Height x Width</th>
                  <th className="py-3 px-2">Weight / GSM</th>
                  <th className="py-3 px-2 text-right">Tier 1 Rate</th>
                  <th className="py-3 px-2 text-right">Tier 2 Rate</th>
                  <th className="py-3 px-3 text-right">Tier 3 Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {products.map((item) => {
                  const t1 = item.qtyTiers[0];
                  const t2 = item.qtyTiers[1];
                  const t3 = item.qtyTiers[2];

                  return (
                    <tr key={item.id} className="hover:bg-neutral-50">
                      <td className="py-3 px-3">
                        <strong className="text-neutral-900 block font-bold">
                          {item.name}
                        </strong>
                        <span className="text-[11px] text-neutral-600 block line-clamp-1">
                          {item.material}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-neutral-700">{item.finish}</td>
                      <td className="py-3 px-2 font-mono text-neutral-600">
                        {item.dimensions}
                      </td>
                      <td className="py-3 px-2 font-semibold text-neutral-800">
                        {item.weightGsm}
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-neutral-800">
                        {t1 ? `${config.currency}${t1.price} (${t1.label})` : '-'}
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-neutral-900 bg-[#FAF7F2]/60">
                        {t2 ? `${config.currency}${t2.price} (${t2.label})` : '-'}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-neutral-900">
                        {t3 ? `${config.currency}${t3.price} (${t3.label})` : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Terms & Guarantees */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#DECFC0] print:border-neutral-300 mb-6 text-xs text-neutral-700 space-y-1.5">
            <h5 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              Commercial Printing Terms & Dispatch:
            </h5>
            <p>
              • <strong>Turnaround:</strong> Standard printing and dispatch completed within 24 to 48 business hours from Ahmedabad.
            </p>
            <p>
              • <strong>Proof Approval:</strong> High-resolution digital proof sent on WhatsApp before offset plate making.
            </p>
            <p>
              • <strong>Quality Guarantee:</strong> 100% free reprint if there is any printing or cutting defect.
            </p>
            <p>
              • <strong>Custom Requirements:</strong> Contact Niraj Vora / Rahul Vora directly for special paper boards or large wholesale volumes.
            </p>
          </div>

          {/* Footer Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-300 text-xs text-neutral-600">
            <div>
              <p>Haya Graphics Commercial Printing Hub, Ahmedabad, Gujarat</p>
            </div>
            <div className="font-bold text-neutral-900">
              WhatsApp / Direct Inquiries: +91 73838 55862
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
