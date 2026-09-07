import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calculator, Check, MessageCircle, Sparkles, Sliders, ShieldCheck } from 'lucide-react';
import { VisitingCardItem, ShopConfig } from '../types';

interface AddOnCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: VisitingCardItem[];
  config: ShopConfig;
}

interface AddOnOption {
  id: string;
  name: string;
  description: string;
  pricePer500: number; // cost per 500 cards
}

const ADDON_OPTIONS: AddOnOption[] = [
  {
    id: 'round-corners',
    name: '4-Corner Rounded Die-Cut',
    description: 'Precision curved corners matching international luxury credit card standards.',
    pricePer500: 150,
  },
  {
    id: 'spot-uv',
    name: 'Raised Spot UV Gloss Highlighting',
    description: '3D clear gloss elevation on your logo, company name, or brand emblem.',
    pricePer500: 350,
  },
  {
    id: 'gold-foil',
    name: 'Metallic Hot Foil Stamping (Gold / Silver)',
    description: 'Genuine reflective metallic foil stamped under heat for shimmering distinction.',
    pricePer500: 500,
  },
  {
    id: 'deboss',
    name: 'Blind Deboss / Letterpress Impression',
    description: 'Deep physical tactile indentation pressed into thick cotton or board.',
    pricePer500: 450,
  },
  {
    id: 'edge-gilding',
    name: 'Luxury Edge Gilding / Tinted Edges',
    description: 'Hand-applied gold, copper, or matte black edge coloring on card perimeter.',
    pricePer500: 400,
  },
];

export const AddOnCalculatorModal: React.FC<AddOnCalculatorModalProps> = ({
  isOpen,
  onClose,
  cards,
  config,
}) => {
  if (!isOpen) return null;

  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(500);
  const [printSides, setPrintSides] = useState<'single' | 'double'>('double');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['spot-uv']);
  const [customArtwork, setCustomArtwork] = useState<string>('Ready PDF file with vector curves');

  const currentCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  // Base price computation
  const getBaseCardPrice = () => {
    if (!currentCard) return 700;
    if (quantity <= 100) return currentCard.price100;
    if (quantity <= 500) {
      // Interpolate for 250 or exact 500
      if (quantity === 250) return Math.round(currentCard.price500 * 0.65);
      return currentCard.price500;
    }
    if (quantity <= 1000) return currentCard.price1000;
    // 2000 bulk
    return Math.round(currentCard.price1000 * 1.85);
  };

  const basePrice = getBaseCardPrice();

  // Sides adjustment
  const sideMultiplier = printSides === 'single' ? 0.9 : 1.0;
  const adjustedBase = Math.round(basePrice * sideMultiplier);

  // Add-on computation scaled by quantity ratio
  const qtyRatio = quantity / 500;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const opt = ADDON_OPTIONS.find((o) => o.id === addonId);
    if (!opt) return sum;
    // slightly discounted scaling for large quantities
    const scaled = Math.round(opt.pricePer500 * Math.pow(qtyRatio, 0.85));
    return sum + scaled;
  }, 0);

  const finalTotalPrice = adjustedBase + addonsTotal;
  const perCardPrice = (finalTotalPrice / quantity).toFixed(2);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendQuoteWhatsApp = () => {
    const selectedAddonNames = selectedAddons
      .map((id) => ADDON_OPTIONS.find((o) => o.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const msg = `*Custom Business Card Quotation Inquiry:*
Proprietor: ${config.ownerName} (${config.shopName})

📌 *Base Material:* ${currentCard.name} (${currentCard.material}, ${currentCard.gsm})
📦 *Quantity:* ${quantity} Cards
📐 *Printing:* ${printSides === 'double' ? 'Double-Side Full Color (Front & Back)' : 'Single-Side Full Color'}
✨ *Custom Finishes Selected:* ${selectedAddonNames || 'Standard Finish (No add-ons)'}
🎨 *Artwork Status:* ${customArtwork}

💰 *Estimated Package Price:* ${config.currency}${finalTotalPrice}
🏷️ *Unit Cost:* ${config.currency}${perCardPrice} / card

Please confirm if digital proofs and sample pictures can be shared before print run. Thank you!`;

    const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
      msg
    )}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

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
              <Calculator className="w-3.5 h-3.5 text-neutral-900" /> Commercial Finish & Price Estimator
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-neutral-900 mt-2">
              Custom Finishing & Volume Calculator
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 mt-1">
              Select card board material, printing sides, and custom embellishments (Die-cut, Spot UV, Gold Foil) for instant transparent pricing.
            </p>
          </div>

          <div className="space-y-5">
            {/* 1. Base Material Selector */}
            <div className="bg-white rounded-2xl p-4 border border-[#DECFC0]">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-800 mb-2">
                Step 1: Choose Base Card Material
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelectedCardId(card.id)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      selectedCardId === card.id
                        ? 'bg-[#F4ECE3] border-neutral-900 text-neutral-900 shadow-xs'
                        : 'bg-white border-[#EAE0D3] text-neutral-700 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{card.name}</span>
                      {selectedCardId === card.id && (
                        <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                      {card.gsm} • {card.finish}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Quantity & Printing Sides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-[#DECFC0]">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-800 mb-2">
                  Step 2: Required Quantity
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-2 gap-2">
                  {[100, 250, 500, 1000, 2000].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setQuantity(qty)}
                      className={`py-2 px-2 text-xs font-bold rounded-xl transition-all border ${
                        quantity === qty
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                          : 'bg-[#F6EFE6] text-neutral-800 border-[#DECFC0] hover:bg-[#EFE5D8]'
                      }`}
                    >
                      {qty} Cards
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#DECFC0]">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-800 mb-2">
                  Step 3: Print Orientation
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPrintSides('double')}
                    className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center justify-between border ${
                      printSides === 'double'
                        ? 'bg-[#F4ECE3] border-neutral-900 text-neutral-900'
                        : 'bg-white border-[#EAE0D3] text-neutral-700'
                    }`}
                  >
                    <span>Double-Side Full Color (Recommended)</span>
                    {printSides === 'double' && <Check className="w-4 h-4 text-neutral-900" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrintSides('single')}
                    className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center justify-between border ${
                      printSides === 'single'
                        ? 'bg-[#F4ECE3] border-neutral-900 text-neutral-900'
                        : 'bg-white border-[#EAE0D3] text-neutral-700'
                    }`}
                  >
                    <span>Single-Side Front Only</span>
                    {printSides === 'single' && <Check className="w-4 h-4 text-neutral-900" />}
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Luxury Add-On Embellishments */}
            <div className="bg-white rounded-2xl p-4 border border-[#DECFC0]">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-neutral-800">
                  Step 4: Premium Finishes & Add-Ons
                </label>
                <span className="text-[11px] text-neutral-500 font-medium">Select multiple</span>
              </div>
              <div className="space-y-2.5">
                {ADDON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const scaledCost = Math.round(addon.pricePer500 * Math.pow(qtyRatio, 0.85));

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#FAF7F2] border-neutral-900'
                          : 'bg-white border-[#EAE0D3] hover:bg-[#FBF9F6]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-neutral-900 border-neutral-900 text-white'
                              : 'border-[#CDBAA5] bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-neutral-900 block">
                            {addon.name}
                          </span>
                          <p className="text-[11px] text-neutral-600 leading-snug">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-neutral-900">
                          +{config.currency}{scaledCost}
                        </span>
                        <span className="text-[10px] text-neutral-500 block">for {quantity} pcs</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Summary Breakdown Light Brown Box */}
            <div className="bg-[#F4ECE3] rounded-2xl p-5 border border-[#DECFC0] space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-700">
                <span>Base Printing ({quantity} {currentCard.name} cards):</span>
                <span className="font-bold text-neutral-900">{config.currency}{adjustedBase}</span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="flex items-center justify-between text-xs text-neutral-700">
                  <span>Custom Add-ons ({selectedAddons.length} selected):</span>
                  <span className="font-bold text-neutral-900">+{config.currency}{addonsTotal}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#DECFC0] flex items-end justify-between">
                <div>
                  <span className="text-xs text-neutral-600 block font-medium">Final Package Quote:</span>
                  <div className="text-3xl font-black text-neutral-900 font-['Playfair_Display',serif]">
                    {config.currency}{finalTotalPrice}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-neutral-800">
                    {config.currency}{perCardPrice} / card
                  </span>
                  <span className="text-[10px] text-emerald-800 block font-semibold">
                    ✓ All Taxes & Packaging Included
                  </span>
                </div>
              </div>
            </div>

            {/* Send to WhatsApp */}
            <button
              onClick={handleSendQuoteWhatsApp}
              className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Send Custom Specification to WhatsApp ({config.currency}{finalTotalPrice})</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
