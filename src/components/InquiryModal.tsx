import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';
import { VisitingCardItem, ShopConfig } from '../types';

interface InquiryModalProps {
  card: VisitingCardItem | null;
  defaultQty?: number;
  config: ShopConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  card,
  defaultQty = 500,
  config,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !card) return null;

  const [quantity, setQuantity] = useState<number>(defaultQty);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const currentPrice =
    quantity === 100
      ? card.price100
      : quantity === 500
      ? card.price500
      : card.price1000;

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `*Business Card Order Inquiry:*
• Card Type: ${card.name}
• Material Specifications: ${card.material}
• GSM & Thickness: ${card.gsm} | ${card.thickness}
• Selected Quantity: ${quantity} Cards
• Package Price: ${config.currency}${currentPrice} (${config.currency}${(currentPrice / quantity).toFixed(2)}/card)
• Customer Name: ${customerName || 'Customer'}
• Phone: ${phone || 'N/A'}
• Notes: ${notes || 'I would like to finalize design files and delivery schedule.'}

Hello ${config.ownerName} (${config.shopName}), please confirm the order details!`;

    const url = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#FAF7F2] border border-[#DECFC0] shadow-2xl p-5 sm:p-8 text-neutral-900 my-4"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-5 pr-8">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EADBCC] text-neutral-900 border border-[#CDBAA5]">
              Direct Quotation
            </span>
            <h3 className="text-2xl font-bold font-['Playfair_Display',serif] mt-2">
              {card.name}
            </h3>
            <p className="text-xs text-neutral-700 mt-0.5">
              Material: {card.material} ({card.gsm})
            </p>
          </div>

          <form onSubmit={handleSendToWhatsApp} className="space-y-4">
            {/* Quantity Selector */}
            <div className="bg-white rounded-xl p-3.5 border border-[#DECFC0]">
              <label className="block text-xs font-bold text-neutral-800 mb-2">
                Select Quantity:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000].map((qty) => (
                  <button
                    type="button"
                    key={qty}
                    onClick={() => setQuantity(qty)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      quantity === qty
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-[#F6EFE6] text-neutral-800 hover:bg-[#EFE5D8] border border-[#DECFC0]'
                    }`}
                  >
                    {qty} Cards
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-neutral-100 text-xs font-bold">
                <span className="text-neutral-600">Total Price:</span>
                <span className="text-base text-neutral-900">
                  {config.currency}{currentPrice}
                </span>
              </div>
            </div>

            {/* Customer Inputs */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                WhatsApp Mobile Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 73838 55862"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Design Notes or Special Requests (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Logo file is ready, need double-side printing..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Send Order Quote via WhatsApp</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
