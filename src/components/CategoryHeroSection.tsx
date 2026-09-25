import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Calculator,
  ShieldCheck,
  Package,
  Layers,
  CheckCircle2,
  RotateCw,
  Eye,
  FileSpreadsheet,
  FileText,
  Tag,
  Flag,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Clock
} from 'lucide-react';
import { ProductCategoryKey, ShopConfig } from '../types';
import { CATEGORIES_CONFIG } from '../data/categoriesConfig';
import { ThreeMetalVisitingCard } from './ThreeMetalVisitingCard';

interface CategoryHeroSectionProps {
  activeCategory: ProductCategoryKey;
  config: ShopConfig;
  onExploreClick: () => void;
  onOpenCalculator: () => void;
  onOpenSampleKit: () => void;
  onOpenSpecs: () => void;
  totalProductsCount: number;
}

export const CategoryHeroSection: React.FC<CategoryHeroSectionProps> = ({
  activeCategory,
  config,
  onExploreClick,
  onOpenCalculator,
  onOpenSampleKit,
  onOpenSpecs,
  totalProductsCount,
}) => {
  const currentCategory =
    CATEGORIES_CONFIG.find((c) => c.key === activeCategory) || CATEGORIES_CONFIG[0];

  // Interactive 3D simulator flip/preview toggle
  const [isFlipped, setIsFlipped] = useState(false);
  // Simulator mode for specialized categories
  const [simMode, setSimMode] = useState<'day' | 'night'>('day'); // for one-way vision
  const [isStandeePulled, setIsStandeePulled] = useState(true); // for standees
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false); // for envelopes

  const logoUrl =
    config.logoUrl ||
    'https://cdn.phototourl.com/free/2026-09-05-47f48cc1-83b5-4418-88e7-41e03a644791.jpg';

  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

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

  return (
    <section className="relative overflow-hidden bg-[#F6EFE6] border-b border-[#DECFC0] py-12 lg:py-16">
      {/* Decorative background grid and ambient warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(#DECFC0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Category Narrative, Title & Calls to Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Category Badge */}
            <motion.div
              key={`badge-${activeCategory}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#DECFC0] text-xs font-bold text-neutral-800 shadow-xs"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
              <span>{currentCategory.label}</span>
              <span className="text-neutral-400">•</span>
              <span>Ahmedabad Commercial Printing Hub</span>
            </motion.div>

            {/* Main Category Headline */}
            <motion.div
              key={`heading-${activeCategory}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 font-['Playfair_Display',serif] tracking-tight leading-[1.12]">
                {currentCategory.heroHeadline}
              </h1>
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed max-w-2xl">
                {currentCategory.heroDescription}
              </p>
            </motion.div>

            {/* Material & Factory Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#DECFC0]">
                <span className="text-[11px] font-bold text-neutral-900 block uppercase tracking-wider">
                  Raw Material
                </span>
                <span className="text-xs text-neutral-700 font-medium">
                  Imported Premium Stock
                </span>
              </div>
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#DECFC0]">
                <span className="text-[11px] font-bold text-neutral-900 block uppercase tracking-wider">
                  Batch Rates
                </span>
                <span className="text-xs text-neutral-700 font-medium">
                  Factory Direct Ahmedabad
                </span>
              </div>
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#DECFC0] col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-neutral-900 block uppercase tracking-wider">
                  Catalog Range
                </span>
                <span className="text-xs text-neutral-700 font-medium">
                  {totalProductsCount} Distinct Designs
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer active:scale-98"
              >
                <span>Explore {totalProductsCount} Designs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE5D8] text-neutral-900 font-bold text-sm border border-[#DECFC0] transition-all cursor-pointer active:scale-98"
              >
                <Calculator className="w-4 h-4 text-neutral-800" />
                <span>Rate Calculator</span>
              </button>

              <button
                onClick={onOpenSampleKit}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE5D8] text-neutral-900 font-bold text-sm border border-[#DECFC0] transition-all cursor-pointer active:scale-98"
              >
                <Package className="w-4 h-4 text-amber-700" />
                <span>Request Sample Kit</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 3D / Live Product Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-[#FAF7F2] border border-[#DECFC0] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#DECFC0] mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Interactive 3D Preview
                  </span>
                </div>
                <span className="text-[11px] text-neutral-600 font-medium">
                  {currentCategory.label}
                </span>
              </div>

              {/* DYNAMIC SIMULATION CONTAINER */}
              <div className="relative min-h-[260px] flex items-center justify-center">
                {/* 1. VISITING CARDS SIMULATION - 3D METAL VISITING CARD */}
                {activeCategory === 'visiting-cards' && (
                  <div className="w-full space-y-3">
                    <ThreeMetalVisitingCard
                      shopName="HayaGraphics"
                      ownerName="Niraj Vora"
                      phoneNumbers={config.displayPhone || "+91 73838 55862 / +91 98258 97010"}
                      email={config.email || "hayagraphics18@gmail.com"}
                      address="Commercial Printing Hub, Near Relief Road, Ahmedabad"
                      logoUrl={logoUrl}
                    />

                    {/* Card Details: Phone No, Owner, Address */}
                    <div className="bg-[#FAF7F2] rounded-xl border border-[#DECFC0] p-3 text-xs text-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900 font-['Playfair_Display',serif]">
                          Niraj Vora (HayaGraphics)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          Ahmedabad
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-700 text-xs">
                        <Phone className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                        <span className="font-medium">{config.displayPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-600 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                        <span className="truncate">{config.address}, {config.cityState}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. BILL BOOKS SIMULATION */}
                {activeCategory === 'bill-books' && (
                  <div className="w-full bg-white rounded-xl shadow-md border border-[#DECFC0] p-4 text-xs font-sans space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                      <div className="flex items-center gap-2">
                        <img
                          src={logoUrl}
                          alt="logo"
                          className="w-7 h-7 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-bold text-neutral-900 block leading-tight font-['Playfair_Display',serif]">
                            HAYA GRAPHICS
                          </span>
                          <span className="text-[10px] text-neutral-500">
                            TAX INVOICE / CASH MEMO
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-red-600 font-bold block text-xs">
                          No. 004821
                        </span>
                        <span className="text-[10px] text-neutral-500">Date: __/__/2026</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      <div className="flex justify-between border-b border-dashed border-neutral-300 py-1 text-neutral-600 font-semibold">
                        <span>Description</span>
                        <span>Qty</span>
                        <span>Rate</span>
                        <span>Amount</span>
                      </div>
                      <div className="flex justify-between text-neutral-800 py-0.5">
                        <span>Commercial Print Batch</span>
                        <span>1000</span>
                        <span>₹2.45</span>
                        <span>₹2,450</span>
                      </div>
                      <div className="flex justify-between text-neutral-800 py-0.5">
                        <span>Carbonless NCR Transfer</span>
                        <span>10 bks</span>
                        <span>₹145</span>
                        <span>₹1,450</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-500">
                        100 Duplicate Sets • Micro Perforated
                      </span>
                      <span className="font-bold text-neutral-900">Total: ₹3,900</span>
                    </div>
                  </div>
                )}

                {/* 3. LETTER PADS SIMULATION */}
                {activeCategory === 'letter-pads' && (
                  <div className="w-full bg-[#FCFBF8] rounded-xl shadow-md border border-[#DECFC0] p-5 text-xs relative overflow-hidden">
                    {/* Watermark simulation */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                      <span className="text-5xl font-bold font-['Playfair_Display',serif] text-neutral-900 rotate-[-25deg]">
                        HAYA
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-300">
                      <div className="flex items-center gap-2">
                        <img
                          src={logoUrl}
                          alt="logo"
                          className="w-8 h-8 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-bold text-neutral-900 block font-['Playfair_Display',serif] text-sm">
                            HAYA GRAPHICS
                          </span>
                          <span className="text-[10px] text-neutral-500">
                            Executive Alabaster Bond 100 GSM
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                        REF: HG/2026/09
                      </span>
                    </div>

                    <div className="py-4 space-y-1.5 opacity-60">
                      <div className="h-2 bg-neutral-300 rounded w-5/6" />
                      <div className="h-2 bg-neutral-300 rounded w-full" />
                      <div className="h-2 bg-neutral-300 rounded w-4/6" />
                      <div className="h-2 bg-neutral-300 rounded w-3/4" />
                    </div>

                    <div className="pt-3 border-t border-neutral-300 flex items-center justify-between text-[10px] text-neutral-600">
                      <span>Ahmedabad, Gujarat</span>
                      <span className="italic font-['Playfair_Display',serif] font-bold text-neutral-800">
                        Authorized Signature
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. STICKERS SIMULATION */}
                {activeCategory === 'stickers' && (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="relative w-36 h-36 rounded-full bg-radial from-amber-200 via-amber-400 to-amber-600 p-1 shadow-lg flex items-center justify-center animate-pulse">
                      <div className="w-full h-full rounded-full bg-[#182825] text-white p-3 flex flex-col items-center justify-center text-center">
                        <img
                          src={logoUrl}
                          alt="logo"
                          className="w-9 h-9 rounded-full object-cover mb-1 border border-amber-400"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[10px] font-bold tracking-wider font-['Playfair_Display',serif]">
                          HAYA GRAPHICS
                        </span>
                        <span className="text-[8px] text-amber-300 uppercase">
                          140µ Waterproof Vinyl
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-700">
                      Laser Contour Cut • 100% Waterproof
                    </span>
                  </div>
                )}

                {/* 5. PAMPHLETS SIMULATION */}
                {activeCategory === 'pamphlets' && (
                  <div className="w-full grid grid-cols-3 gap-1 bg-[#FAF7F2] p-2 rounded-xl shadow-md border border-[#DECFC0]">
                    <div className="bg-[#1f2631] text-white p-3 rounded text-[10px] flex flex-col justify-between h-44 shadow-xs">
                      <span className="font-bold text-amber-300 text-[11px]">HAYA</span>
                      <span className="text-[9px] opacity-80">Cover Panel</span>
                      <div className="h-1 bg-amber-400 rounded w-2/3" />
                    </div>
                    <div className="bg-white text-neutral-800 p-3 rounded text-[10px] flex flex-col justify-between h-44 shadow-xs border border-neutral-200">
                      <span className="font-bold text-neutral-900">Features</span>
                      <div className="space-y-1">
                        <div className="h-1 bg-neutral-200 rounded w-full" />
                        <div className="h-1 bg-neutral-200 rounded w-3/4" />
                        <div className="h-1 bg-neutral-200 rounded w-5/6" />
                      </div>
                      <span className="text-[9px] text-neutral-500">130 GSM Gloss</span>
                    </div>
                    <div className="bg-[#FAF7F2] text-neutral-800 p-3 rounded text-[10px] flex flex-col justify-between h-44 shadow-xs border border-neutral-200">
                      <span className="font-bold text-neutral-900">Contact</span>
                      <div className="space-y-1">
                        <span className="block text-[8px]">Ahmedabad</span>
                        <span className="block text-[8px] font-bold">73838 55862</span>
                      </div>
                      <span className="text-[9px] text-emerald-800 font-bold">Full Color</span>
                    </div>
                  </div>
                )}

                {/* 6. STANDEES SIMULATION */}
                {activeCategory === 'standees' && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-40 bg-neutral-900 text-white rounded-t-lg p-3 text-center shadow-lg border-2 border-amber-400/40 relative overflow-hidden transition-all duration-500 h-44 flex flex-col justify-between">
                      <div className="flex items-center justify-center gap-1">
                        <img
                          src={logoUrl}
                          alt="logo"
                          className="w-5 h-5 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[10px] font-bold tracking-wide font-['Playfair_Display',serif]">
                          HAYA GRAPHICS
                        </span>
                      </div>
                      <div className="my-auto text-center">
                        <span className="text-xs font-bold text-amber-300 block">
                          ROLL-UP STANDEE
                        </span>
                        <span className="text-[9px] text-neutral-300">
                          6 x 3 Feet Poly Canvas
                        </span>
                      </div>
                      <span className="text-[8px] bg-white/20 py-0.5 rounded">
                        Ahmedabad Direct
                      </span>
                    </div>
                    {/* Aluminum Base Standee */}
                    <div className="w-48 h-5 bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-400 rounded-b-md shadow-md border-t border-neutral-500 flex items-center justify-center">
                      <span className="text-[8px] font-mono font-bold text-neutral-700">
                        ANODIZED ALUMINUM BASE
                      </span>
                    </div>
                  </div>
                )}

                {/* 7. ONE WAY VISION SIMULATION */}
                {activeCategory === 'one-way-vision' && (
                  <div className="w-full bg-[#1a2634] text-white rounded-xl p-4 shadow-md border border-neutral-700 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-bold text-sky-300">Showroom Glass Facade</span>
                      <button
                        onClick={() => setSimMode(simMode === 'day' ? 'night' : 'day')}
                        className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-400/30 cursor-pointer"
                      >
                        Toggle: {simMode === 'day' ? 'Exterior View' : 'Interior See-Through'}
                      </button>
                    </div>
                    <div className="h-32 rounded-lg relative overflow-hidden flex items-center justify-center p-3 border border-dashed border-sky-400/40">
                      {simMode === 'day' ? (
                        <div className="text-center space-y-1">
                          <span className="text-sm font-bold text-white font-['Playfair_Display',serif] block">
                            HAYA GRAPHICS SHOWROOM
                          </span>
                          <span className="text-[10px] text-sky-200 block">
                            Full Graphic Visibility from Street Outside
                          </span>
                          <span className="text-[9px] text-neutral-400 block">
                            60/40 Micro-Perforated Vinyl
                          </span>
                        </div>
                      ) : (
                        <div className="text-center space-y-1 text-neutral-300">
                          <span className="text-xs font-bold text-emerald-300 block">
                            Crystal Clear Natural View from Inside
                          </span>
                          <span className="text-[10px] block">
                            55% Solar Glare & UV Heat Blocked
                          </span>
                          <span className="text-[9px] text-neutral-400 block">
                            Zero obstruction for employees inside
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 8. ENVELOPES SIMULATION */}
                {activeCategory === 'envelopes' && (
                  <div className="w-full max-w-xs bg-white rounded-lg shadow-md border border-[#DECFC0] p-4 text-neutral-900 space-y-2 relative">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={logoUrl}
                          alt="logo"
                          className="w-6 h-6 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-bold text-xs font-['Playfair_Display',serif]">
                          HAYA GRAPHICS
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-neutral-500">
                        9.5" x 4.5" DL
                      </span>
                    </div>
                    <div className="py-2 text-[10px] text-neutral-600">
                      <p className="font-semibold text-neutral-800">To: Confidential Corporate Addressee</p>
                      <p>Ahmedabad Commercial Hub</p>
                    </div>
                    <div className="pt-2 border-t flex items-center justify-between text-[10px]">
                      <span className="text-emerald-800 font-bold">Peel & Seal Self-Adhesive Strip</span>
                      <span className="text-neutral-500">100 GSM Bond</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Controls */}
              <div className="mt-4 pt-3 border-t border-[#DECFC0] flex items-center justify-between text-xs">
                <span className="text-neutral-700 font-semibold">
                  Factory Rates Active
                </span>
                <button
                  onClick={onExploreClick}
                  className="text-neutral-900 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>View All {totalProductsCount} Varieties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
