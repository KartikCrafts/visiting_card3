import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Layers, Sparkles, Scale, Ruler } from 'lucide-react';
import { ProductItem, ShopConfig } from '../types';

interface InquiryModalProps {
  product: ProductItem | null;
  defaultQty?: number;
  config: ShopConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  product,
  defaultQty,
  config,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !product) return null;

  const [selectedQty, setSelectedQty] = useState<number>(() => {
    if (defaultQty) return defaultQty;
    return product.qtyTiers[0]?.qty || 1000;
  });
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const activeTier =
    product.qtyTiers.find((t) => t.qty === selectedQty) || product.qtyTiers[0];
  const currentPrice = activeTier?.price || 0;
  const unitPrice =
    activeTier && activeTier.qty > 0 ? (currentPrice / activeTier.qty).toFixed(2) : '0';

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `*Haya Graphics - Commercial Printing Order Inquiry:*
• Product: ${product.name}
• Category: ${product.categoryKey.toUpperCase()}
• Material (Which Material Made): ${product.material}
• Look & Finish: ${product.finish}
• Height x Width (Dimensions): ${product.dimensions}
• Weight / GSM: ${product.weightGsm}
• Selected Batch: ${activeTier?.label || selectedQty}
• Factory Rate: ${config.currency}${currentPrice} (${config.currency}${unitPrice}/unit)
• Customer Name: ${customerName || 'Direct Client'}
• Contact Phone: ${phone || 'N/A'}
• Specific Notes: ${notes || 'Please provide digital design proof and turnaround schedule.'}

Hello ${config.ownerName} (${config.shopName} - Ahmedabad), please review and confirm order details!`;

    const url = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#FAF7F2] border border-[#DECFC0] shadow-2xl p-6 sm:p-8 text-neutral-900 my-4"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
              Direct Order & Proofing
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-['Playfair_Display',serif] text-neutral-900 mt-1.5">
              Order {product.name}
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              {product.material}
            </p>
          </div>

          <form onSubmit={handleSendToWhatsApp} className="space-y-4 text-xs">
            {/* Quantity Tier Selector */}
            <div className="bg-white p-3.5 rounded-2xl border border-[#DECFC0]">
              <label className="block text-xs font-bold text-neutral-800 mb-2">
                Choose Volume Tier:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.qtyTiers.map((tier) => (
                  <button
                    key={tier.qty}
                    type="button"
                    onClick={() => setSelectedQty(tier.qty)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                      selectedQty === tier.qty
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                        : 'bg-[#FAF7F2] text-neutral-800 border-[#DECFC0] hover:bg-[#EFE5D8]'
                    }`}
                  >
                    <span className="block truncate">{tier.label}</span>
                    <span className="block text-[10px] font-normal opacity-85 mt-0.5">
                      ₹{tier.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Preview */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#EFE5D8] border border-[#DECFC0]">
              <div>
                <span className="text-[11px] text-neutral-600 block">Total Package Rate:</span>
                <span className="text-xl font-bold font-['Playfair_Display',serif] text-neutral-950">
                  {config.currency}{currentPrice}
                </span>
              </div>
              <span className="text-xs text-neutral-700 font-medium">
                ({config.currency}{unitPrice} per unit)
              </span>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Your Name / Business Name:
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Niraj Vora / Rajesh Enterprises"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                WhatsApp Phone Number:
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98258 97010"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Design / Artwork Details:
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. I have CDR/PDF file ready, need double-side print with foil logo..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Continue to WhatsApp with Specifications</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
