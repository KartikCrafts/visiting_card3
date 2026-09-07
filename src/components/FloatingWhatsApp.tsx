import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { ShopConfig } from '../types';

interface FloatingWhatsAppProps {
  config: ShopConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ config }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${config.ownerName} (${config.shopName})! I would like to check business card materials and get a price quote.`
  )}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Dynamic speech tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-neutral-900 text-white px-3.5 py-2 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 max-w-[210px]"
          >
            <span>Need card rates? Chat on WhatsApp!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-white"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-neutral-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        id="floating-whatsapp-trigger"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl relative group transition-colors"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none" />
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </motion.a>
    </div>
  );
};
