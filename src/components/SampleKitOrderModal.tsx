import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Check, MessageCircle, MapPin, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { ShopConfig, VisitingCardItem } from '../types';

interface SampleKitOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ShopConfig;
  cards: VisitingCardItem[];
}

export const SampleKitOrderModal: React.FC<SampleKitOrderModalProps> = ({
  isOpen,
  onClose,
  config,
  cards,
}) => {
  if (!isOpen) return null;

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [cityPincode, setCityPincode] = useState('');
  const [companyName, setCompanyName] = useState('');

  const sampleKitPrice = 199;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `*Physical Paper Swatch Box Request:*
Proprietor: ${config.ownerName} (${config.shopName})

📦 *Item:* Haya Graphics Master Paper Swatch Box (6+ Luxury Materials + Finish Samples)
👤 *Client Name:* ${clientName || 'Valued Client'}
🏢 *Business / Firm:* ${companyName || 'Individual Professional'}
📞 *WhatsApp Phone:* ${phone}
📍 *Delivery Address:* ${deliveryAddress}
📮 *City & Pincode:* ${cityPincode}
💰 *Sample Box Fee:* ${config.currency}${sampleKitPrice} (100% refundable upon first bulk card order)

Hello Niraj bhai, please confirm courier dispatch and payment QR code for the sample swatch kit.`;

    const url = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
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
          className="relative w-full max-w-xl rounded-3xl bg-[#FAF7F2] border border-[#DECFC0] shadow-2xl p-5 sm:p-8 text-neutral-900 my-4 max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-5 pr-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EADBCC] text-neutral-900 border border-[#CDBAA5]">
              <Package className="w-3.5 h-3.5" /> Doorstep Physical Proof
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-neutral-900 mt-2">
              Order Paper Swatch Box
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 mt-1">
              Touch, feel, and inspect all 6 luxury paper stocks and finishes in person before placing your final bulk card order.
            </p>
          </div>

          {/* Kit Inclusions */}
          <div className="bg-white rounded-2xl p-4 border border-[#DECFC0] mb-5 space-y-2.5">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
              What Is Inside The Swatch Box?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>450 GSM Velvet Soft-Touch</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>350 GSM Textured Linen Board</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>400 GSM Unbleached Earth Kraft</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>350 Micron Frosted Waterproof PVC</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>600 GSM Cotton with Gold Foil</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Spot UV & Raised Die-Cut Samples</span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#DECFC0] flex items-center justify-between text-xs font-bold">
              <span className="text-neutral-600">Sample Box Courier Fee:</span>
              <span className="text-base text-neutral-900 font-extrabold">
                {config.currency}{sampleKitPrice}{' '}
                <span className="text-[10px] text-emerald-700 font-semibold">(100% Refundable on First Order)</span>
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Vikram Singhal"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Company / Studio Name (Optional)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Studio Kulkarni Architects"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Delivery Street Address *
              </label>
              <textarea
                rows={2}
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Office/Residential address for courier delivery..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DECFC0] text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                City & Pincode *
              </label>
              <input
                type="text"
                required
                value={cityPincode}
                onChange={(e) => setCityPincode(e.target.value)}
                placeholder="e.g. Ahmedabad - 380015"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Confirm Swatch Box on WhatsApp ({config.currency}{sampleKitPrice})</span>
              </button>
              <p className="text-center text-[10px] text-neutral-600 mt-2">
                🚀 Dispatched via BlueDart / DTDC air express within 24 hours. Tracking link provided on WhatsApp.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
