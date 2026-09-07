import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileCode2, Check, AlertCircle, Download, ArrowRight, MessageCircle } from 'lucide-react';
import { ShopConfig } from '../types';

interface PrintSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ShopConfig;
}

export const PrintSpecsModal: React.FC<PrintSpecsModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  if (!isOpen) return null;

  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${config.ownerName} (${config.shopName})! I would like to send my design files for pre-print verification.`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#FAF7F2] border border-[#DECFC0] shadow-2xl p-5 sm:p-8 text-neutral-900 my-4 max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EADBCC] text-neutral-900 border border-[#CDBAA5]">
              <FileCode2 className="w-3.5 h-3.5" /> Technical Pre-Press Standards
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-neutral-900 mt-2">
              Print-Ready Artwork & Bleed Guidelines
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 mt-1">
              Ensure your visiting cards are cut with laser precision and vibrant offset color fidelity by following our pre-press technical specifications.
            </p>
          </div>

          {/* Visual Dimension Diagram in Light Brown Box */}
          <div className="bg-white rounded-2xl p-5 border border-[#DECFC0] mb-5">
            <div className="text-xs font-extrabold uppercase tracking-wider text-neutral-800 mb-3">
              Standard Indian & International Size Specs:
            </div>

            {/* Visual Box Diagram */}
            <div className="relative w-full h-44 sm:h-52 bg-[#F6EFE6] rounded-xl border-2 border-dashed border-red-400 flex items-center justify-center p-3">
              {/* Bleed outline */}
              <span className="absolute top-2 left-2 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                Bleed Area: 93 × 55 mm
              </span>

              {/* Trim Line */}
              <div className="w-11/12 h-4/5 bg-white border-2 border-neutral-900 rounded-lg relative flex items-center justify-center p-2">
                <span className="absolute top-1.5 left-2 text-[10px] font-bold text-neutral-800">
                  Trim / Final Cut: 89 × 51 mm (3.5" × 2.0")
                </span>

                {/* Safe Line */}
                <div className="w-10/12 h-3/4 border border-dashed border-emerald-600 rounded bg-[#FAF7F2] flex items-center justify-center text-center p-2">
                  <div>
                    <span className="text-xs font-black text-emerald-800 block">
                      Safe Design Zone: 85 × 47 mm
                    </span>
                    <span className="text-[10px] text-neutral-600">
                      Keep text, logos & phone numbers inside this green border
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
              <div className="p-2 rounded-lg bg-[#F8F4EE]">
                <span className="text-neutral-500 block text-[10px]">Bleed Cut</span>
                <strong className="text-neutral-900">93 × 55 mm</strong>
              </div>
              <div className="p-2 rounded-lg bg-[#F8F4EE]">
                <span className="text-neutral-500 block text-[10px]">Final Size</span>
                <strong className="text-neutral-900">89 × 51 mm</strong>
              </div>
              <div className="p-2 rounded-lg bg-[#F8F4EE]">
                <span className="text-neutral-500 block text-[10px]">Safe Margin</span>
                <strong className="text-neutral-900">85 × 47 mm</strong>
              </div>
            </div>
          </div>

          {/* Checklist of Pre-Press Requirements */}
          <div className="space-y-2.5 mb-6">
            <div className="p-3 rounded-xl bg-white border border-[#DECFC0] flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-neutral-900 block">Color Profile: CMYK 300 DPI</strong>
                <p className="text-[11px] text-neutral-600">
                  Design files must be created in CMYK mode to prevent color drift. RGB screens show backlighting not achievable in physical ink.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#DECFC0] flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-neutral-900 block">Convert Fonts to Outlines / Curves</strong>
                <p className="text-[11px] text-neutral-600">
                  Convert all text typography to outlines (Ctrl+Shift+O in Illustrator or Ctrl+Q in CorelDraw) to prevent missing font errors.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#DECFC0] flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-neutral-900 block">Accepted File Formats</strong>
                <p className="text-[11px] text-neutral-600">
                  Press Quality PDF (.pdf), Adobe Illustrator (.ai / .eps), CorelDraw (.cdr), Photoshop (.psd), or high-res vector files.
                </p>
              </div>
            </div>
          </div>

          {/* Direct File Verification CTA */}
          <div className="pt-2">
            <a
              id="send-file-verify-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Send Design File on WhatsApp for Free Pre-Print Check</span>
            </a>
            <p className="text-center text-[10px] text-neutral-600 mt-2">
              Our pre-press design department will review bleeds and resolution before sending to Heidelberg offset machines.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
