import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, MessageCircle, FileSpreadsheet, ShieldCheck, Check } from 'lucide-react';
import { VisitingCardItem, ShopConfig } from '../types';

interface RateCardPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: VisitingCardItem[];
  config: ShopConfig;
}

export const RateCardPrintModal: React.FC<RateCardPrintModalProps> = ({
  isOpen,
  onClose,
  cards,
  config,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${config.ownerName} (${config.shopName})! I reviewed the complete Business Card Rate Card & Catalog and would like to place a corporate print order.`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 10 }}
          className="relative w-full max-w-3xl rounded-3xl bg-white border border-[#DECFC0] shadow-2xl p-6 sm:p-10 text-neutral-900 my-4 max-h-[94vh] overflow-y-auto print:max-h-none print:border-none print:shadow-none print:m-0 print:p-4"
        >
          {/* Controls Bar (Hidden during printing) */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#DECFC0] print:hidden">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#FAF7F2] border border-[#DECFC0] text-neutral-800">
                <FileSpreadsheet className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-sm text-neutral-900">Official Rate Card & Price Sheet</h4>
                <p className="text-xs text-neutral-500">Ready for corporate procurement & printable record</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#F4ECE3] hover:bg-[#EADBCC] text-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-300">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 block">
                Official Visiting Card Quotation & Rate Sheet
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Playfair_Display',serif] text-neutral-900 mt-0.5">
                {config.shopName}
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Proprietor: <strong>{config.ownerName}</strong> • Direct Phone: {config.displayPhone}
              </p>
              <p className="text-xs text-neutral-600">
                Studio: {config.address}, {config.cityState}
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-neutral-600 bg-[#FAF7F2] p-3 rounded-xl border border-[#DECFC0] print:border-neutral-300">
              <p><strong>Effective Date:</strong> {new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p>
              <p><strong>Currency:</strong> Indian Rupee ({config.currency})</p>
              <p><strong>Heidelberg Offset:</strong> High-Definition 300 DPI</p>
            </div>
          </div>

          {/* Rate Table */}
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8F4EE] border-b-2 border-neutral-300 text-neutral-900 font-extrabold uppercase tracking-wider">
                  <th className="py-3 px-3">Card Material</th>
                  <th className="py-3 px-2">GSM / Specs</th>
                  <th className="py-3 px-2">Finish</th>
                  <th className="py-3 px-2 text-right">100 Pcs</th>
                  <th className="py-3 px-2 text-right">500 Pcs</th>
                  <th className="py-3 px-3 text-right">1000 Pcs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {cards.map((card) => (
                  <tr key={card.id} className="hover:bg-neutral-50">
                    <td className="py-3 px-3">
                      <strong className="text-neutral-900 block font-bold">{card.name}</strong>
                      <span className="text-[11px] text-neutral-500">{card.material}</span>
                    </td>
                    <td className="py-3 px-2 font-medium text-neutral-700">{card.gsm}</td>
                    <td className="py-3 px-2 text-neutral-600">{card.finish}</td>
                    <td className="py-3 px-2 text-right font-bold text-neutral-800">
                      {config.currency}{card.price100}
                    </td>
                    <td className="py-3 px-2 text-right font-black text-neutral-900 bg-[#FAF7F2]/50">
                      {config.currency}{card.price500}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-neutral-900">
                      {config.currency}{card.price1000}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Terms & Guarantees */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#DECFC0] print:border-neutral-300 mb-6 text-xs text-neutral-700 space-y-1.5">
            <h5 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">Commercial Printing Terms:</h5>
            <p>• <strong>Turnaround:</strong> Standard printing and dispatch completed within 24 to 48 business hours.</p>
            <p>• <strong>Digital Proof Approval:</strong> PDF soft proof sent on WhatsApp before offset plate making.</p>
            <p>• <strong>Quality Guarantee:</strong> 100% free reprint if there is any printing or cutting defect on our end.</p>
            <p>• <strong>Custom Finishes:</strong> Spot UV, Metallic Foil, and Rounded Die-Cut available on bulk quantities.</p>
          </div>

          {/* Signature & Verification */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-300">
            <div className="text-xs text-neutral-600">
              <p>For custom bulk requirements exceeding 5,000 cards, contact Niraj Vora directly.</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-sm font-bold text-neutral-900 font-['Playfair_Display',serif]">
                {config.ownerName}
              </div>
              <div className="text-[11px] text-neutral-500">Authorized Signatory • {config.shopName}</div>
            </div>
          </div>

          {/* WhatsApp CTA (hidden when printed) */}
          <div className="mt-6 pt-4 border-t border-neutral-200 print:hidden flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Direct Order via WhatsApp</span>
            </a>
            <button
              onClick={handlePrint}
              className="py-3 px-4 rounded-xl bg-white hover:bg-[#FAF7F2] text-neutral-800 font-bold text-xs border border-[#DECFC0] flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print This Sheet</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
