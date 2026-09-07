import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ShieldCheck, Zap, Sparkles, ArrowDown, CheckCircle2, Calculator, Package, FileCode2 } from 'lucide-react';
import { ShopConfig } from '../types';

interface HeroSectionProps {
  config: ShopConfig;
  onExploreClick: () => void;
  onOpenInquiryModal: () => void;
  onOpenCalculator: () => void;
  onOpenSampleKit: () => void;
  onOpenSpecs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onExploreClick,
  onOpenInquiryModal,
  onOpenCalculator,
  onOpenSampleKit,
  onOpenSpecs,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 14);
    setRotateY(x / 14);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const logoUrl =
    config.logoUrl ||
    'https://cdn.phototourl.com/free/2026-09-05-47f48cc1-83b5-4418-88e7-41e03a644791.jpg';

  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${config.ownerName} (${config.shopName})! I would like to print business cards. Please share material samples and the best price quotation.`
  )}`;

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-16 md:pb-24 bg-white border-b border-[#EAE0D3]">
      {/* Subtle ambient light brown background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[#F6EFE6] rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#EFE5D8] rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content with dynamic text animations */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Pill badge with centered shop logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F5EFE7] border border-[#DECFC0] text-xs font-semibold text-neutral-800 shadow-2xs"
            >
              <img
                src={logoUrl}
                alt="Logo"
                className="w-5 h-5 rounded-full object-cover border border-[#DECFC0]"
                referrerPolicy="no-referrer"
              />
              <span>{config.shopName} • Genuine Material Specifications & Factory Direct Rates</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.18] font-['Playfair_Display',serif]">
                Your Business Card, <br />
                <span className="italic font-normal underline decoration-[#DECFC0] decoration-4 underline-offset-8">
                  What Material Is It Made Of?
                </span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 max-w-2xl leading-relaxed pt-2">
                Discover the <strong>genuine paperboard</strong>, <strong>detailed craftsmanship</strong> (GSM, texture, durability), and <strong>transparent factory pricing</strong> of every card. Choose your favorite material and order directly on WhatsApp.
              </p>
            </div>

            {/* 3 Key highlights in light brown pills with scroll entry & exit animation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="p-3.5 rounded-xl bg-[#F8F4EE] border border-[#DECFC0] flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
                <span className="text-xs font-bold text-neutral-900">Original GSM & Board</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="p-3.5 rounded-xl bg-[#F8F4EE] border border-[#DECFC0] flex items-center gap-2.5"
              >
                <Zap className="w-4 h-4 text-neutral-900 shrink-0" />
                <span className="text-xs font-bold text-neutral-900">Instant WhatsApp Rates</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="p-3.5 rounded-xl bg-[#F8F4EE] border border-[#DECFC0] flex items-center gap-2.5"
              >
                <ShieldCheck className="w-4 h-4 text-neutral-900 shrink-0" />
                <span className="text-xs font-bold text-neutral-900">Zero Hidden Charges</span>
              </motion.div>
            </div>

            {/* Call to action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-3 pt-3"
            >
              <div className="flex flex-wrap items-center gap-3">
                <motion.a
                  id="hero-whatsapp-direct-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F4ECE3] hover:bg-[#EADBCC] text-neutral-900 font-bold border border-[#DECFC0] shadow-xs transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-700" />
                  <span>Chat Directly on WhatsApp</span>
                </motion.a>

                <motion.button
                  id="hero-explore-materials-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onExploreClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-neutral-900 font-bold border border-[#DECFC0] shadow-xs transition-colors"
                >
                  <span>Explore Cards & Pricing</span>
                  <ArrowDown className="w-4 h-4 text-neutral-600" />
                </motion.button>
              </div>

              {/* Real Print Shop Value Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-neutral-700">
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DECFC0] hover:bg-[#F4ECE3] text-neutral-900 transition-colors shadow-2xs"
                >
                  <Calculator className="w-3.5 h-3.5 text-neutral-800" />
                  <span>Custom Finish Calculator</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenSampleKit}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#DECFC0] hover:bg-[#F4ECE3] text-neutral-900 transition-colors shadow-2xs"
                >
                  <Package className="w-3.5 h-3.5 text-neutral-800" />
                  <span>Order Swatch Kit ({config.currency}199)</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenSpecs}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DECFC0] hover:bg-[#F4ECE3] text-neutral-900 transition-colors shadow-2xs"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-neutral-800" />
                  <span>Bleed & Size Specs</span>
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero: Interactive 3D Visiting Card Simulation with viewport animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center perspective-[1000px] w-full"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[380px] aspect-[1.75/1] rounded-2xl p-5 sm:p-6 bg-[#212325] text-[#F8F4EE] shadow-[0_20px_50px_-15px_rgba(44,38,33,0.22)] border border-[#DECFC0]/40 cursor-grab active:cursor-grabbing select-none group"
            >
              {/* Card Sheen Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Edge thickness simulation */}
              <div className="absolute -inset-1 rounded-2xl bg-[#D4AF37]/20 blur-xs -z-10" />

              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">
                      Executive Edition
                    </span>
                    <h3 className="text-xl font-bold font-['Playfair_Display',serif] tracking-wide text-white">
                      {config.shopName}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-[#D4AF37]/50 p-0.5 flex items-center justify-center overflow-hidden shadow-sm">
                    <img
                      src={logoUrl}
                      alt={config.shopName}
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-semibold tracking-wide text-gray-200">
                    {config.ownerName}
                  </div>
                  <div className="text-xs text-[#D4AF37]">
                    Founder & Chief Executive
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-white/15 pt-2 text-[11px] text-gray-300">
                  <span>450 GSM Velvet Matte</span>
                  <span className="text-emerald-400 font-medium">WhatsApp Enabled</span>
                </div>
              </div>

              {/* Interaction Hint */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-neutral-500 font-medium flex items-center gap-1">
                <span>✦ Hover/Tilt card to inspect 3D texture & thickness</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
