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
  pricePer1000: number; // cost per 1000 cards
}

const ADDON_OPTIONS: AddOnOption[] = [
  {
    id: 'round-corners',
    name: '4-Corner Rounded Die-Cut',
    description: 'Precision curved corners matching international luxury credit card standards.',
    pricePer1000: 250,
  },
  {
    id: 'spot-uv',
    name: 'Raised Spot UV Gloss Highlighting',
    description: '3D clear gloss elevation on your logo, company name, or brand emblem.',
    pricePer1000: 600,
  },
  {
    id: 'gold-foil',
    name: 'Metallic Hot Foil Stamping (Gold / Silver / Rose Gold)',
    description: 'Genuine reflective metallic foil stamped under heat for shimmering distinction.',
    pricePer1000: 850,
  },
  {
    id: 'deboss',
    name: 'Blind Deboss / Letterpress Impression',
    description: 'Deep physical tactile indentation pressed into thick cotton or board.',
    pricePer1000: 750,
  },
  {
    id: 'edge-gilding',
    name: 'Luxury Edge Gilding / Tinted Edges',
    description: 'Hand-applied gold, copper, or matte black edge coloring on card perimeter.',
    pricePer1000: 700,
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
  const [quantity, setQuantity] = useState<number>(1000); // 100 removed, 1000 default!
  const [printSides, setPrintSides] = useState<'single' | 'double'>('double');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['spot-uv']);
  const [customArtwork, setCustomArtwork] = useState<string>('Ready PDF file with vector curves');

  const currentCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  // Base price computation tailored to 1000 / 2000 / 3000
  const getBaseCardPrice = () => {
    if (!currentCard) return 2450;
    if (quantity === 1000) return currentCard.price1000;
    if (quantity === 2000) return currentCard.price2000;
    if (quantity === 3000) return currentCard.price3000;
    // 5000 volume bulk
    return Math.round(currentCard.price3000 * 1.55);
  };

  const basePrice = getBaseCardPrice();

  // Sides adjustment
  const sideMultiplier = printSides === 'single' ? 0.9 : 1.0;
  const adjustedBase = Math.round(basePrice * sideMultiplier);

  // Add-on computation scaled by quantity ratio from 1000 baseline
  const qtyRatio = quantity / 1000;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const opt = ADDON_OPTIONS.find((o) => o.id === addonId);
    if (!opt) return sum;
    const scaled = Math.round(opt.pricePer1000 * Math.pow(qtyRatio, 0.88));
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
Factory Hub: ${config.cityState}

📌 *Base Material:* ${currentCard.name} (${currentCard.material})
📦 *Selected Batch:* ${quantity} Cards
📐 *Printing:* ${printSides === 'double' ? 'Double-Side Full Color (Front & Back)' : 'Single-Side Full Color'}
✨ *Custom Finishes Selected:* ${selectedAddonNames || 'Standard Finish (No add-ons)'}
🎨 *Artwork Status:* ${customArtwork}

💰 *Estimated Package Price:* ${config.currency}${finalTotalPrice}
🏷️ *Unit Cost:* ${config.currency}${perCardPrice} / card

Please confirm digital proofs and turnaround schedule. Thank you!`;

    const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
      msg
    )}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#FAF7F2] border border-[#DECFC0] shadow-2xl p-5 sm:p-8 text-neutral-900 my-4 max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EADBCC] text-neutral-900 border border-[#CDBAA5]">
              <Calculator className="w-3.5 h-3.5 text-neutral-900" /> Commercial Volume & Finish Estimator
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-neutral-900 mt-2">
              Business Card Batch & Add-On Calculator
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 mt-1">
              Select card board material, batch quantity (1000, 2000, 3000), and custom embellishments for instant transparent factory pricing.
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
                    className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
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

            {/* 2. Quantity (1000, 2000, 3000, 5000) & Printing Sides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 border border-[#DECFC0]">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-800 mb-2">
                  Step 2: Batch Quantity (1000 / 2000 / 3000)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[1000, 2000, 3000, 5000].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setQuantity(qty)}
                      className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
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
                  Step 3: Print Sides
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPrintSides('double')}
                    className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center justify-between border cursor-pointer ${
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
                    className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center justify-between border cursor-pointer ${
                      printSides === 'single'
                        ? 'bg-[#F4ECE3] border-neutral-900 text-neutral-900'
                        : 'bg-white border-[#EAE0D3] text-neutral-700'
                    }`}
                  >
                    <span>Single-Side Full Color</span>
                    {printSides === 'single' && <Check className="w-4 h-4 text-neutral-900" />}
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Luxury Embellishments */}
            <div className="bg-white rounded-2xl p-4 border border-[#DECFC0]">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-800 mb-2">
                Step 4: Optional Luxury Enhancements
              </label>
              <div className="space-y-2">
                {ADDON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#FAF7F2] border-neutral-900 shadow-xs'
                          : 'bg-white border-[#EAE0D3] hover:bg-[#FAF7F2]/50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-neutral-900 border-neutral-900 text-white'
                            : 'border-[#CDBAA5] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-neutral-900">{addon.name}</span>
                          <span className="font-mono font-bold text-neutral-800">
                            +₹{addon.pricePer1000}/1000 cards
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-600 mt-0.5">
                          {addon.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Summary & WhatsApp Inquiry */}
            <div className="p-5 rounded-2xl bg-[#EFE5D8] border border-[#DECFC0] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-neutral-700 font-bold block uppercase tracking-wider">
                    Total Estimated Direct Rate:
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-neutral-900 font-['Playfair_Display',serif]">
                      {config.currency}{finalTotalPrice}
                    </span>
                    <span className="text-xs text-neutral-700">
                      ({config.currency}{perCardPrice} / card for {quantity} cards)
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 self-start sm:self-auto">
                  Ahmedabad Factory Direct
                </span>
              </div>

              <button
                type="button"
                onClick={handleSendQuoteWhatsApp}
                className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm & Order Batch on WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
