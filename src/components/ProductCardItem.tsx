import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  CheckCircle,
  Sparkles,
  Layers,
  Scale,
  Ruler,
  Clock,
  RotateCw,
  QrCode,
  MapPin,
  Mail,
  ShieldCheck,
  Eye,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import { ProductItem, ShopConfig } from '../types';

interface ProductCardItemProps {
  product: ProductItem;
  config: ShopConfig;
  index: number;
  onOpenInquiry: (product: ProductItem, quantity: number) => void;
}

export const ProductCardItem: React.FC<ProductCardItemProps> = ({
  product,
  config,
  index,
  onOpenInquiry,
}) => {
  // Active selected quantity tier (defaults to 1st tier)
  const [selectedTier, setSelectedTier] = useState<number>(() => {
    return product.qtyTiers[0]?.qty || 1000;
  });

  // 3D Flip state: PC hover or mobile alternating tap (1st tap: back, 2nd tap: front)
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

  // Mobile / Touch click toggle (1st tap: back, 2nd tap: front)
  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const activeTierObj = product.qtyTiers.find((t) => t.qty === selectedTier) || product.qtyTiers[0];
  const currentPrice = activeTierObj?.price || 0;
  const unitPrice = activeTierObj && activeTierObj.qty > 0 ? (currentPrice / activeTierObj.qty).toFixed(2) : '0';

  const logoUrl =
    config.logoUrl ||
    'https://cdn.phototourl.com/free/2026-09-05-47f48cc1-83b5-4418-88e7-41e03a644791.jpg';

  // Professional pre-filled WhatsApp inquiry message
  const whatsappMsg = `Hello ${config.ownerName} (${config.shopName})!
I want to order / inquire about this printing product:

📌 Product: ${product.name}
🗂️ Category: ${product.categoryKey.toUpperCase()}
📄 Material (Which Material Made): ${product.material}
✨ Look & Finish: ${product.finish}
📐 Dimensions / Size (Height x Width): ${product.dimensions}
⚖️ Weight / GSM: ${product.weightGsm}
📦 Selected Quantity: ${activeTierObj?.label || selectedTier}
💰 Package Rate: ${config.currency}${currentPrice} (${config.currency}${unitPrice} per unit)

Delivery Address: Ahmedabad / Gujarat / All India
Please share digital design proof and turnaround schedule. Thank you!`;

  const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    whatsappMsg
  )}`;

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -25, scale: 0.96 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
      className="group relative rounded-2xl bg-[#F6EFE6] border border-[#DECFC0] shadow-[0_4px_20px_-4px_rgba(44,38,33,0.06)] hover:shadow-[0_12px_32px_-8px_rgba(44,38,33,0.14)] hover:border-[#BFAF9C] transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-['Playfair_Display',serif] tracking-tight">
                {product.name}
              </h3>
              {product.badge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6D7C3] text-neutral-900 border border-[#CBB8A0]">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  {product.badge}
                </span>
              )}
            </div>
            {product.categoryBadge && (
              <span className="inline-block text-xs font-semibold text-neutral-600">
                {product.categoryBadge}
              </span>
            )}
          </div>

          <div className="text-right shrink-0">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600 bg-[#EFE5D8] px-2.5 py-1 rounded-lg border border-[#DECFC0]">
              <Clock className="w-3 h-3 text-neutral-700" />
              {product.deliveryDays}
            </span>
          </div>
        </div>

        {/* INTERACTIVE 3D FLIP / LIVE PRODUCT SIMULATOR */}
        <div className="my-5">
          <div className="flex items-center justify-between text-[11px] text-neutral-600 mb-1.5 px-1 font-medium">
            <span className="flex items-center gap-1 text-neutral-800 font-bold">
              <Eye className="w-3.5 h-3.5 text-neutral-700" />
              <span>{product.imageUrl ? 'Product Proof & Dimensions' : 'Interactive 3D Visual'}</span>
            </span>
            <button
              onClick={handleToggleFlip}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-900 hover:text-neutral-700 underline cursor-pointer bg-[#EFE5D8] hover:bg-[#E2D5C3] px-2 py-0.5 rounded transition-colors"
              title="Click to flip front/back"
            >
              <RotateCw className="w-3 h-3" />
              <span>{isFlipped ? 'Show Front' : 'Flip to Specs'}</span>
            </button>
          </div>

          {/* 3D Flip Container with Perspective */}
          <div
            className="w-full h-48 sm:h-52 [perspective:1000px] cursor-pointer select-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleToggleFlip}
            title="Hover on PC or Tap on Mobile to flip card"
          >
            <div
              className="relative w-full h-full rounded-xl transition-transform duration-700 [transform-style:preserve-3d]"
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* FRONT FACE */}
              <div
                className="absolute inset-0 w-full h-full rounded-xl p-5 flex flex-col justify-between shadow-md border border-black/10 [backface-visibility:hidden] overflow-hidden"
                style={{
                  backgroundColor: product.visualTheme.cardBg,
                  color: product.visualTheme.cardTextColor,
                }}
              >
                {product.imageUrl ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                          {config.shopName}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/90 text-neutral-900">
                          {product.colorType === '2-colour' ? '2-Colour Dual Tone' : '1-Colour Offset'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm line-clamp-1 font-['Playfair_Display',serif]">
                          {product.name}
                        </p>
                        <p className="text-white/80 text-[11px]">{product.dimensions} • {product.weightGsm}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={logoUrl}
                          alt={config.shopName}
                          className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-xs"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4
                            className="font-bold text-xs sm:text-sm font-['Playfair_Display',serif] tracking-wide"
                            style={{ color: product.visualTheme.cardTextColor }}
                          >
                            {config.shopName}
                          </h4>
                          <p className="text-[10px] opacity-75">{config.tagline}</p>
                        </div>
                      </div>
                      <span
                        className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-current/20"
                        style={{ color: product.visualTheme.accentColor }}
                      >
                        ORIGINAL SPEC
                      </span>
                    </div>

                    <div className="my-auto text-center py-2">
                      <p
                        className="text-sm sm:text-base font-bold tracking-tight font-['Playfair_Display',serif]"
                        style={{ color: product.visualTheme.accentColor }}
                      >
                        {product.name}
                      </p>
                      <p className="text-[10px] opacity-80 mt-0.5 line-clamp-1">{product.material}</p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-2 border-t border-white/10">
                      <span className="font-semibold">{product.weightGsm}</span>
                      <span className="font-mono">{product.dimensions}</span>
                    </div>
                  </>
                )}
              </div>

              {/* BACK FACE (Rotated 180deg) */}
              <div
                className="absolute inset-0 w-full h-full rounded-xl p-5 flex flex-col justify-between shadow-md border border-black/10 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{
                  backgroundColor: product.visualTheme.cardBg,
                  color: product.visualTheme.cardTextColor,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={logoUrl}
                      alt={config.shopName}
                      className="w-6 h-6 rounded-full object-cover border border-white/20"
                      referrerPolicy="no-referrer"
                    />
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase"
                      style={{ color: product.visualTheme.accentColor }}
                    >
                      {config.ownerName}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono opacity-80">{config.cityState}</span>
                </div>

                <div className="space-y-1.5 text-left text-[11px] my-auto py-1">
                  <div className="flex items-center gap-2 opacity-90">
                    <MapPin className="w-3 h-3 shrink-0" style={{ color: product.visualTheme.accentColor }} />
                    <span className="truncate text-[10px]">{config.address}, {config.cityState}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-90">
                    <MessageCircle className="w-3 h-3 shrink-0" style={{ color: product.visualTheme.accentColor }} />
                    <span className="text-[10px]">{config.displayPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-90">
                    <Mail className="w-3 h-3 shrink-0" style={{ color: product.visualTheme.accentColor }} />
                    <span className="text-[10px]">{config.email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] pt-1.5 border-t border-white/10 opacity-75">
                  <span>Haya Graphics Ahmedabad</span>
                  <span>Tap again to flip front</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED SPECIFICATIONS SECTION */}
        <div className="space-y-2.5 my-4 text-xs bg-[#FAF7F2] rounded-xl p-4 border border-[#DECFC0]">
          {/* Which Material Made */}
          <div className="flex items-start gap-2.5">
            <Layers className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold text-neutral-900 block text-[11px] uppercase tracking-wider">
                Material &amp; Stock:
              </span>
              <span className="text-neutral-800 font-medium">{product.material}</span>
            </div>
          </div>

          {/* Look & Finish */}
          <div className="flex items-start gap-2.5 pt-2 border-t border-[#EAE0D3]">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold text-neutral-900 block text-[11px] uppercase tracking-wider">
                Look &amp; Surface Finish:
              </span>
              <span className="text-neutral-800 font-medium">{product.finish}</span>
            </div>
          </div>

          {/* Height & Width / Dimensions */}
          <div className="flex items-start gap-2.5 pt-2 border-t border-[#EAE0D3]">
            <Ruler className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold text-neutral-900 block text-[11px] uppercase tracking-wider">
                Dimensions &amp; Size:
              </span>
              <span className="text-neutral-800 font-medium">{product.dimensions}</span>
            </div>
          </div>

          {/* Weight / GSM / Thickness */}
          <div className="flex items-start gap-2.5 pt-2 border-t border-[#EAE0D3]">
            <Scale className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold text-neutral-900 block text-[11px] uppercase tracking-wider">
                Weight &amp; Paper Density:
              </span>
              <span className="text-neutral-800 font-medium">{product.weightGsm}</span>
            </div>
          </div>
        </div>

        {/* Khasiyat & Benefits */}
        <div className="my-4">
          <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block mb-2">
            Key Highlights &amp; Specifications:
          </span>
          <ul className="space-y-1.5 text-xs text-neutral-800">
            {product.khasiyat.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-normal">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Best For Recommendation */}
        <div className="p-3 rounded-xl bg-[#EFE5D8] border border-[#DECFC0] text-xs mb-5">
          <span className="font-bold text-neutral-900 block mb-0.5">Recommended Application:</span>
          <p className="text-neutral-700 leading-snug">{product.bestFor}</p>
        </div>
      </div>

      {/* BOTTOM PRICING & CALL TO ACTIONS */}
      <div className="pt-4 border-t border-[#DECFC0] space-y-4">
        {/* Quantity Selection Buttons */}
        <div>
          <span className="text-xs font-bold text-neutral-800 block mb-2">
            Select Batch Quantity:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {product.qtyTiers.map((tier) => {
              const isSelected = selectedTier === tier.qty;
              return (
                <button
                  key={tier.qty}
                  onClick={() => setSelectedTier(tier.qty)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-[#FAF7F2] text-neutral-800 border-[#DECFC0] hover:bg-[#EFE5D8]'
                  }`}
                >
                  <span className="block truncate">{tier.label}</span>
                  <span className="block text-[10px] font-normal opacity-85 mt-0.5">
                    ₹{tier.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Display */}
        <div className="flex items-baseline justify-between bg-[#FAF7F2] p-3.5 rounded-xl border border-[#DECFC0]">
          <div>
            <span className="text-[11px] text-neutral-600 block">
              Direct Ahmedabad Factory Rate:
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-neutral-950 font-['Playfair_Display',serif]">
                {config.currency}{currentPrice}
              </span>
              <span className="text-xs text-neutral-600">
                ({config.currency}{unitPrice} / unit)
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            GST Invoice Ready
          </span>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Direct WhatsApp Order */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-all shadow-sm active:scale-98"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Order on WhatsApp</span>
          </a>

          {/* Inquire / Custom Specs */}
          <button
            onClick={() => onOpenInquiry(product, selectedTier)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE5D8] text-neutral-900 font-bold text-xs border border-[#DECFC0] transition-all active:scale-98"
          >
            <FileSpreadsheet className="w-4 h-4 text-neutral-800" />
            <span>Inquiry / Proof</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
