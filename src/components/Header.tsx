import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Settings, Sparkles, Layers, FileSpreadsheet, Calculator, Package, Lock } from 'lucide-react';
import { ShopConfig } from '../types';

interface HeaderProps {
  config: ShopConfig;
  onOpenDashboard: () => void;
  onOpenContact: () => void;
  onOpenCalculator: () => void;
  onOpenRateCard: () => void;
  onOpenSampleKit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOpenDashboard,
  onOpenContact,
  onOpenCalculator,
  onOpenRateCard,
  onOpenSampleKit,
}) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${config.ownerName} (${config.shopName})! I would like to inquire about business card materials, samples, and printing quotes.`
  )}`;

  const logoUrl =
    config.logoUrl ||
    'https://cdn.phototourl.com/free/2026-09-05-47f48cc1-83b5-4418-88e7-41e03a644791.jpg';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE0D3] transition-all shadow-[0_2px_12px_-4px_rgba(44,38,33,0.04)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left column: Quick Links & Phone Call */}
        <div className="flex-1 flex items-center justify-start gap-1.5 sm:gap-2">
          {/* Quick Direct Call */}
          <a
            id="header-call-button"
            href={`tel:${config.displayPhone}`}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold text-neutral-800 bg-[#FAF7F2] border border-[#DECFC0] rounded-xl hover:bg-[#F4ECE3] transition-all"
            title="Call Factory"
          >
            <Phone className="w-3.5 h-3.5 text-neutral-700" />
            <span className="hidden md:inline">{config.displayPhone}</span>
            <span className="md:hidden">Call</span>
          </a>

          {/* Desktop Quick Shortcuts */}
          <div className="hidden xl:flex items-center gap-1 text-xs font-bold text-neutral-700">
            <button
              onClick={onOpenCalculator}
              className="px-2.5 py-1.5 rounded-lg hover:bg-[#FAF7F2] hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculator</span>
            </button>
            <button
              onClick={onOpenSampleKit}
              className="px-2.5 py-1.5 rounded-lg hover:bg-[#FAF7F2] hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Sample Box</span>
            </button>
            <button
              onClick={onOpenRateCard}
              className="px-2.5 py-1.5 rounded-lg hover:bg-[#FAF7F2] hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Rate Card</span>
            </button>
          </div>
        </div>

        {/* Center column: OFFICIAL LOGO IN CENTER */}
        <div className="shrink-0 flex items-center justify-center gap-2.5 sm:gap-3">
          <div className="relative group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#CDBAA5] via-[#D4AF37] to-[#FAF7F2] shadow-[0_3px_12px_rgba(44,38,33,0.12)] transition-transform duration-300 group-hover:scale-105">
              <img
                src={logoUrl}
                alt={`${config.shopName} Logo`}
                className="w-full h-full rounded-full object-cover bg-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white" title="Verified Print Studio" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-neutral-900 font-['Playfair_Display',serif] whitespace-nowrap">
                {config.shopName}
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F4ECE3] text-neutral-900 border border-[#DECFC0]">
                <Sparkles className="w-2.5 h-2.5 mr-1 text-[#9E7D59]" /> Cards
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 hidden sm:block font-medium truncate max-w-[200px] lg:max-w-[260px]">
              {config.tagline}
            </p>
          </div>
        </div>

        {/* Right column: WhatsApp & Dashboard buttons */}
        <div className="flex-1 flex items-center justify-end gap-1.5 sm:gap-2">
          {/* Direct WhatsApp Button */}
          <a
            id="header-whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-900 bg-[#F4ECE3] border border-[#DECFC0] hover:bg-[#EADBCC] hover:border-[#CDBAA5] rounded-xl transition-all shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>

          {/* Light Brown Dashboard Button with Security Indicator */}
          <motion.button
            id="header-dashboard-toggle-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenDashboard}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-bold text-neutral-900 bg-[#E8DDD0] hover:bg-[#DDD0BF] border border-[#CDBAA5] rounded-xl shadow-xs transition-colors"
            title="Update materials, pricing & contact info"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
