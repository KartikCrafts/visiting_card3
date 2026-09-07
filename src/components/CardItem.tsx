import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Phone,
  CheckCircle,
  Sparkles,
  Layers,
  Scale,
  Gauge,
  Clock,
  ChevronRight,
  ShieldCheck,
  RotateCw,
  QrCode,
  MapPin,
  Mail
} from 'lucide-react';
import { VisitingCardItem, ShopConfig } from '../types';

interface CardItemProps {
  card: VisitingCardItem;
  config: ShopConfig;
  index: number;
  onOpenInquiry: (card: VisitingCardItem, quantity: number) => void;
}

export const CardItem: React.FC<CardItemProps> = ({ card, config, index, onOpenInquiry }) => {
  const [selectedQty, setSelectedQty] = useState<100 | 500 | 1000>(500);
  // Single flip state that supports both PC hover and Mobile alternating tap (1st tap: back, 2nd tap: front)
  const [isFlipped, setIsFlipped] = useState(false);

  // PC / Laptop hover detection
  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setIsFlipped(false);
    }
  };

  // Tap / Click handler: 1st tap flips to back, 2nd tap flips to front
  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const logoUrl =
    config.logoUrl ||
    'https://cdn.phototourl.com/free/2026-09-05-47f48cc1-83b5-4418-88e7-41e03a644791.jpg';

  const getPrice = (qty: 100 | 500 | 1000) => {
    if (qty === 100) return card.price100;
    if (qty === 500) return card.price500;
    return card.price1000;
  };

  const currentPrice = getPrice(selectedQty);
  const pricePerCard = (currentPrice / selectedQty).toFixed(2);

  // Auto-crafted direct WhatsApp message in clean professional English
  const whatsappMsg = `Hello ${config.ownerName} (${config.shopName})!
I would like to order / inquire about this business card:

📌 Card Type: ${card.name}
📄 Material: ${card.material}
📐 Specifications: ${card.gsm} | ${card.thickness}
✨ Finish: ${card.finish}
📦 Selected Quantity: ${selectedQty} Cards
💰 Package Price: ${config.currency}${currentPrice} (${config.currency}${pricePerCard}/card)

Please share the digital proof process, delivery schedule, and payment details. Thank you!`;

  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    whatsappMsg
  )}`;

  return (
    <motion.div
      id={`visiting-card-box-${card.id}`}
      layout
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -25, scale: 0.96 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative rounded-2xl bg-[#F6EFE6] border border-[#DECFC0] shadow-[0_4px_20px_-4px_rgba(44,38,33,0.05)] hover:shadow-[0_12px_32px_-8px_rgba(44,38,33,0.12)] transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
    >
      {/* Top Meta: Badge & Category */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EADBCC] text-neutral-900 border border-[#CDBAA5]">
            {card.category}
          </span>
          {card.badge && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-white shadow-xs">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              {card.badge}
            </span>
          )}
        </div>

        {/* Card Name */}
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight font-['Playfair_Display',serif]">
          {card.name}
        </h3>

        {/* 3D Flip Visiting Card: Flips on PC/Laptop hover & Mobile tap */}
        <div className="my-4">
          <div
            className="relative w-full aspect-[1.75/1] cursor-pointer select-none [perspective:1000px] group/card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleToggleFlip}
            role="button"
            tabIndex={0}
            aria-label={`Visiting card sample for ${card.name}. Hover on laptop or tap on mobile to flip front and back.`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggleFlip();
              }
            }}
          >
            {/* 3D Flipper Element */}
            <div
              className="relative w-full h-full rounded-2xl shadow-md transition-transform duration-700 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* ================= FRONT SIDE ================= */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden border border-black/15 shadow-sm"
                style={{
                  backgroundColor: card.visualTheme.cardBg,
                  color: card.visualTheme.cardTextColor,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)',
                }}
              >
                {/* Surface sheen & texture overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent pointer-events-none" />
                <div className="absolute -inset-1 rounded-2xl bg-white/5 opacity-50 blur-xs pointer-events-none" />

                {/* Top Row: Logo & Shop Name */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full border border-white/40 p-0.5 overflow-hidden bg-white shrink-0 shadow-xs">
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="w-full h-full rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="truncate">
                      <p className="text-xs sm:text-sm font-bold font-['Playfair_Display',serif] tracking-wide truncate">
                        {config.shopName}
                      </p>
                      <p className="text-[9px] opacity-75 uppercase tracking-wider font-semibold">
                        {card.gsm}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-[9px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs font-bold border border-white/25">
                    FRONT
                  </span>
                </div>

                {/* Middle: Executive Details */}
                <div className="relative z-10 space-y-0.5 my-auto py-1">
                  <p className="text-sm font-bold tracking-wide">
                    {config.ownerName}
                  </p>
                  <p className="text-[10px] opacity-80 uppercase tracking-wider font-medium">
                    Founder & Managing Director
                  </p>
                  <div className="w-8 h-0.5 bg-[#D4AF37] rounded-full opacity-80 mt-1" />
                </div>

                {/* Bottom Row: Finish & Material Assurance */}
                <div className="relative z-10 flex items-center justify-between border-t border-current/15 pt-2 text-[10px]">
                  <span className="truncate max-w-[150px] font-medium opacity-90">
                    {card.finish}
                  </span>
                  <span className="font-semibold text-emerald-400 text-[9px] flex items-center gap-1 shrink-0">
                    ✦ Authentic Board
                  </span>
                </div>
              </div>

              {/* ================= BACK SIDE (REVERSE) ================= */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden border border-black/15 shadow-sm"
                style={{
                  backgroundColor: card.visualTheme.cardBg,
                  color: card.visualTheme.cardTextColor,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {/* Surface sheen & texture overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/10 to-transparent pointer-events-none" />

                {/* Top Row: Shop Title & Back Indicator */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[11px] font-bold font-['Playfair_Display',serif] tracking-wider uppercase truncate">
                      {config.shopName}
                    </span>
                    <span className="text-[8px] opacity-60">PRINT SPEC</span>
                  </div>
                  <span className="shrink-0 text-[9px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                    REVERSE
                  </span>
                </div>

                {/* Middle: Contact Coordinates & QR Simulation */}
                <div className="relative z-10 grid grid-cols-12 gap-2 items-center my-auto py-1">
                  {/* Left: Direct Contacts */}
                  <div className="col-span-8 space-y-1 text-[10px]">
                    <div className="flex items-center gap-1.5 opacity-90">
                      <Phone className="w-3 h-3 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{config.displayPhone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-90">
                      <MessageCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">WA: +{config.whatsappNumber}</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-80">
                      <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                      <span className="truncate">{config.cityState}</span>
                    </div>
                  </div>

                  {/* Right: Simulated QR Code */}
                  <div className="col-span-4 flex flex-col items-center justify-center bg-white/10 border border-white/20 rounded-xl p-1.5 backdrop-blur-2xs">
                    <QrCode className="w-8 h-8 text-white opacity-95" />
                    <span className="text-[7px] uppercase tracking-wider font-bold opacity-75 mt-0.5">
                      V-Card QR
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Exact Factory Board Specs */}
                <div className="relative z-10 flex items-center justify-between border-t border-current/15 pt-2 text-[10px]">
                  <span className="truncate max-w-[150px] font-semibold text-amber-300">
                    {card.material.split(' ')[0]} Board • {card.thickness}
                  </span>
                  <span className="text-[9px] font-medium opacity-85 shrink-0">
                    2-Side High-Res
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Flip Helper & Status */}
          <div className="mt-2.5 px-1 flex items-center justify-between text-[11px] select-none">
            <button
              type="button"
              onClick={handleToggleFlip}
              className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-800 hover:text-neutral-900 bg-[#EFE5D8] hover:bg-[#E2D4C3] px-2.5 py-1 rounded-lg border border-[#DECFC0] transition-colors"
            >
              <RotateCw
                className={`w-3 h-3 transition-transform duration-500 ${
                  isFlipped ? 'rotate-180 text-amber-700' : 'text-neutral-700'
                }`}
              />
              <span>{isFlipped ? 'Flip to Front' : 'Flip to Back'}</span>
            </button>

            <div className="text-[10px] text-neutral-600 font-medium">
              <span className="hidden sm:inline">💻 Hover or click</span>
              <span className="sm:hidden">📱 Tap card</span>
              <span className="text-neutral-400 mx-1">•</span>
              <span className={isFlipped ? 'font-bold text-amber-800' : 'font-semibold text-neutral-700'}>
                {isFlipped ? 'Back Side' : 'Front Side'}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 1: WHAT MATERIAL IS IT MADE OF */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="mb-4 bg-white/80 rounded-xl p-4 border border-[#E5D9CC]"
        >
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-neutral-800 mb-2">
            <Layers className="w-4 h-4 text-neutral-900" />
            <span>What Material Is It Made Of?</span>
          </div>

          <p className="text-sm font-bold text-neutral-900 leading-snug">
            {card.material}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-[#E5D9CC]/70 text-xs">
            <div className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
              <div>
                <span className="text-neutral-500 block text-[10px]">Weight (GSM)</span>
                <span className="font-bold text-neutral-900">{card.gsm}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
              <div>
                <span className="text-neutral-500 block text-[10px]">Thickness</span>
                <span className="font-bold text-neutral-900">{card.thickness}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: KEY FEATURES & ADVANTAGES */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-5 bg-white/80 rounded-xl p-4 border border-[#E5D9CC]"
        >
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-neutral-800 mb-2.5">
            <Sparkles className="w-4 h-4 text-neutral-900" />
            <span>Key Features & Highlights</span>
          </div>

          <ul className="space-y-2">
            {card.khasiyat.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-neutral-900 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-neutral-900 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 pt-2.5 border-t border-[#E5D9CC]/70 flex items-center justify-between text-[11px]">
            <span className="text-neutral-600 font-medium">Best Suited For:</span>
            <span className="font-bold text-neutral-900 text-right truncate max-w-[190px]">{card.bestFor}</span>
          </div>
        </motion.div>
      </div>

      {/* SECTION 3: PRICING & QUANTITY SELECTOR */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="mt-auto pt-2"
      >
        <div className="bg-white rounded-xl p-4 border border-[#DECFC0] shadow-xs mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-800">
              Package Pricing (Select Qty)
            </span>
            <span className="text-[11px] text-neutral-600 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-neutral-500" /> {card.deliveryDays}
            </span>
          </div>

          {/* Quantity Selector Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4ECE3] rounded-lg border border-[#DECFC0] mb-3">
            {[100, 500, 1000].map((qty) => (
              <button
                key={qty}
                onClick={() => setSelectedQty(qty as 100 | 500 | 1000)}
                className={`py-1.5 text-xs font-bold rounded-md transition-all ${
                  selectedQty === qty
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-800 hover:bg-[#EADBCC]'
                }`}
              >
                {qty} Cards
              </button>
            ))}
          </div>

          {/* Dynamic Price Display */}
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[11px] text-neutral-600 block">Total Package Price:</span>
              <div className="text-2xl font-black text-neutral-900 tracking-tight">
                {config.currency}{currentPrice}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-neutral-600 block">Per Card Cost:</span>
              <div className="text-sm font-bold text-neutral-900">
                {config.currency}{pricePerCard} / card
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: DIRECT CUSTOMER CONTACT BUTTONS */}
        <div className="space-y-2">
          {/* Main Direct WhatsApp Button */}
          <motion.a
            id={`whatsapp-order-${card.id}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-xs transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Order Directly on WhatsApp</span>
          </motion.a>

          {/* Secondary: Quick Modal Quote & Direct Call */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`quick-inquiry-btn-${card.id}`}
              onClick={() => onOpenInquiry(card, selectedQty)}
              className="py-2.5 px-3 rounded-xl bg-[#E8DDD0] hover:bg-[#DDD0BF] text-neutral-900 font-bold text-xs border border-[#CDBAA5] transition-colors flex items-center justify-center gap-1"
            >
              <span>Instant Quote Form</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <a
              id={`call-now-btn-${card.id}`}
              href={`tel:${config.displayPhone}`}
              className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-neutral-900 font-bold text-xs border border-[#DECFC0] transition-colors flex items-center justify-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-700" />
              <span>Direct Call</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
