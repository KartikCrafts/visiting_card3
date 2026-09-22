import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Phone,
  CheckCircle2,
  Sparkles,
  Maximize2,
  X,
  FileSpreadsheet,
  Palette,
  Ruler,
  Layers,
  Scale,
  Clock,
  ArrowRight,
  Printer,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ProductItem, ShopConfig } from '../types';

interface BillBookCatalogSectionProps {
  products: ProductItem[];
  config: ShopConfig;
  onOpenInquiry: (product: ProductItem, quantity: number) => void;
}

type BillBookFilter = 'all' | '1-colour' | '2-colour' | 'duplicate' | 'triplicate' | 'a4-invoice';

export const BillBookCatalogSection: React.FC<BillBookCatalogSectionProps> = ({
  products,
  config,
  onOpenInquiry,
}) => {
  const [activeFilter, setActiveFilter] = useState<BillBookFilter>('all');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; desc: string } | null>(null);

  // Selected quantity tier for each product (keyed by product id)
  const [selectedTiers, setSelectedTiers] = useState<Record<string, number>>({});

  const nirajWhatsappNumber = '917383855862';
  const nirajDisplayPhone = '+91 73838 55862';
  const rahulDisplayPhone = '+91 98258 97010';

  // Filter products according to selected commercial category
  const filteredBillBooks = products.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '1-colour') return item.colorType === '1-colour' || item.name.toLowerCase().includes('1-colour');
    if (activeFilter === '2-colour') return item.colorType === '2-colour' || item.name.toLowerCase().includes('2-colour');
    if (activeFilter === 'duplicate') return item.name.toLowerCase().includes('duplicate') || item.dimensions.toLowerCase().includes('duplicate') || item.khasiyat.some(k => k.toLowerCase().includes('duplicate'));
    if (activeFilter === 'triplicate') return item.name.toLowerCase().includes('triplicate') || item.khasiyat.some(k => k.toLowerCase().includes('3-part') || k.toLowerCase().includes('triplicate'));
    if (activeFilter === 'a4-invoice') return item.dimensions.toLowerCase().includes('a4') || item.name.toLowerCase().includes('a4');
    return true;
  });

  const getTierForProduct = (product: ProductItem) => {
    const selectedQty = selectedTiers[product.id];
    if (selectedQty) {
      const match = product.qtyTiers.find((t) => t.qty === selectedQty);
      if (match) return match;
    }
    return product.qtyTiers[0] || { qty: 10, label: '10 Books', price: 1250 };
  };

  const handleSelectTier = (productId: string, qty: number) => {
    setSelectedTiers((prev) => ({ ...prev, [productId]: qty }));
  };

  const generateWhatsAppUrl = (product: ProductItem) => {
    const tier = getTierForProduct(product);
    const unitPrice = tier.qty > 0 ? (tier.price / tier.qty).toFixed(0) : '0';
    const text = `Hello Niraj Vora (Haya Graphics - Ahmedabad),
I want to order / inquire about this Bill Book design:

📖 Book Style: ${product.name}
🎨 Color Setup: ${product.printColors || (product.colorType === '2-colour' ? 'Two Color Dual Tone' : 'Single Color Offset')}
📄 Paper & Material: ${product.material}
📐 Dimensions / Size: ${product.dimensions}
📦 Package Selected: ${tier.label} - ₹${tier.price} (₹${unitPrice} / Book)
🔢 Numbering: Sequential Red Stamped Numbering Included

Delivery Location: Ahmedabad, Gujarat / All India Dispatch
Please send layout proof and confirmed timeline. Thank you!`;

    return `https://wa.me/${nirajWhatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  // Pre-filled message for general "More Designs" inquiry to Niraj Vora
  const generalMoreDesignsWhatsAppUrl = `https://wa.me/${nirajWhatsappNumber}?text=${encodeURIComponent(
    `Hello Niraj Vora (Haya Graphics, Ahmedabad),
I am looking for Bill Book & Cash Memo printing for my business. 

Please share more 1-Colour and 2-Colour designs, customized GST formats, paper sample proofs, and quantity rate cards. Thank you!`
  )}`;

  return (
    <section id="bill-book-special-section" className="py-8 sm:py-12">
      {/* SECTION TOP BANNER & CATEGORY INTRO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#DECFC0] p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#DECFC0_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-white shadow-xs">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                  Commercial Stationery Division
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#EFE5D8] text-neutral-800 border border-[#DECFC0]">
                  <Palette className="w-3.5 h-3.5 text-blue-700" />
                  1-Colour &amp; 2-Colour Offset Printing
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Free Sequential Red Numbering
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 font-['Playfair_Display',serif] tracking-tight">
                Bill Books, Tax Invoices &amp; Commercial Challan Pads
              </h2>

              <p className="text-sm text-neutral-700 leading-relaxed">
                Precision single-color and dual-color offset printing on Sirpur mill paper and imported carbonless NCR paper. 
                Equipped with sharp micro-perforation, bound hardboard backings, and indelible red sequential numbering.
              </p>
            </div>

            {/* Quick Niraj Vora Contact Badge */}
            <div className="bg-[#F6EFE6] border border-[#DECFC0] rounded-2xl p-4 sm:p-5 shrink-0 text-left sm:text-right shadow-xs space-y-2">
              <p className="text-xs text-neutral-600 font-bold uppercase tracking-wider">
                Direct Printing Inquiries:
              </p>
              <div className="text-neutral-900 font-bold text-base font-['Playfair_Display',serif]">
                Vora Niraj • Vora Rahul
              </div>
              <div className="flex flex-col sm:items-end gap-1 text-xs font-bold text-neutral-800">
                <a
                  href={`tel:${nirajWhatsappNumber}`}
                  className="hover:text-blue-800 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-700" />
                  {nirajDisplayPhone}
                </a>
                <span className="text-[11px] text-neutral-600 font-medium">Ahmedabad, Gujarat - 380001</span>
              </div>
            </div>
          </div>

          {/* FILTER TABS: 1-COLOUR VS 2-COLOUR VS TYPES */}
          <div className="mt-6 pt-5 border-t border-[#DECFC0] flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider shrink-0 mr-1">
              Select Color / Type:
            </span>

            {[
              { id: 'all', label: 'All Bill Books', count: products.length },
              {
                id: '1-colour',
                label: '1-Colour Designs (Single Ink)',
                badge: 'Single Color Offset',
                count: products.filter((p) => p.colorType === '1-colour' || p.name.includes('1-Colour')).length,
              },
              {
                id: '2-colour',
                label: '2-Colour Designs (Dual Tone)',
                badge: 'Two Color Offset',
                count: products.filter((p) => p.colorType === '2-colour' || p.name.includes('2-Colour')).length,
              },
              {
                id: 'duplicate',
                label: 'Duplicate (1+1 NCR)',
                count: products.filter((p) => p.name.includes('Duplicate') || p.khasiyat.some(k => k.includes('Duplicate'))).length,
              },
              {
                id: 'triplicate',
                label: 'Triplicate (1+2 Sets)',
                count: products.filter((p) => p.name.includes('Triplicate') || p.khasiyat.some(k => k.includes('3-Part'))).length,
              },
              {
                id: 'a4-invoice',
                label: 'A4 GST Invoices',
                count: products.filter((p) => p.dimensions.includes('A4')).length,
              },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as BillBookFilter)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-[#EFE5D8] text-neutral-800 hover:bg-[#E2D5C3] border border-[#DECFC0]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#DECFC0] text-neutral-900'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* BILL BOOK PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBillBooks.map((product, idx) => {
              const activeTier = getTierForProduct(product);
              const unitPrice = activeTier.qty > 0 ? (activeTier.price / activeTier.qty).toFixed(0) : '0';
              const isTwoColour = product.colorType === '2-colour' || product.name.includes('2-Colour');

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, delay: (idx % 3) * 0.05 }}
                  className="group relative rounded-3xl bg-[#FAF7F2] border border-[#DECFC0] shadow-xs hover:shadow-xl hover:border-[#BFAF9C] transition-all duration-300 p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Tag Row */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {isTwoColour ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-900 border border-rose-200">
                            <Palette className="w-3 h-3 text-rose-700" />
                            2-Colour Dual Tone
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                            <Palette className="w-3 h-3 text-blue-700" />
                            1-Colour Offset
                          </span>
                        )}

                        {product.badge && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6D7C3] text-neutral-900 border border-[#CBB8A0]">
                            <Sparkles className="w-3 h-3 text-amber-700" />
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600 bg-[#EFE5D8] px-2.5 py-0.5 rounded-lg border border-[#DECFC0] shrink-0">
                        <Clock className="w-3 h-3 text-neutral-700" />
                        {product.deliveryDays}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-xl font-bold text-neutral-900 font-['Playfair_Display',serif] tracking-tight leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-600 mt-1">
                      {product.printColors || (isTwoColour ? 'Dual Color Offset Printing' : 'Single Color Offset')}
                    </p>

                    {/* PRODUCT PHOTO / VISUAL DISPLAY */}
                    <div className="my-4 relative rounded-2xl overflow-hidden border border-[#DECFC0] bg-[#EFE5D8] aspect-4/3 flex items-center justify-center group/img">
                      {product.imageUrl ? (
                        <>
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            onClick={() =>
                              setLightboxImage({
                                url: product.imageUrl!,
                                title: product.name,
                                desc: product.material,
                              })
                            }
                            className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/70 hover:bg-black text-white text-[11px] font-bold backdrop-blur-xs transition-opacity opacity-90 group-hover/img:opacity-100 cursor-pointer"
                            title="Click to zoom proof"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>Zoom Proof</span>
                          </button>
                        </>
                      ) : (
                        <div
                          className="w-full h-full p-4 flex flex-col justify-between"
                          style={{
                            backgroundColor: product.visualTheme.cardBg,
                            color: product.visualTheme.cardTextColor,
                          }}
                        >
                          <div className="flex items-center justify-between text-xs opacity-75">
                            <span>{config.shopName}</span>
                            <span>{product.dimensions}</span>
                          </div>
                          <div className="text-center py-4">
                            <p
                              className="font-bold text-base font-['Playfair_Display',serif]"
                              style={{ color: product.visualTheme.accentColor }}
                            >
                              {product.name}
                            </p>
                            <p className="text-[11px] opacity-80 mt-1">{product.material}</p>
                          </div>
                          <div className="text-[10px] text-center border-t border-white/15 pt-1 opacity-70">
                            Sequential Numbering Included
                          </div>
                        </div>
                      )}
                    </div>

                    {/* COMMERCIAL SPECIFICATIONS BREAKDOWN */}
                    <div className="space-y-2 py-3 border-y border-[#DECFC0] text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-neutral-600 font-semibold flex items-center gap-1.5 shrink-0">
                          <Layers className="w-3.5 h-3.5 text-neutral-800" />
                          Paper &amp; Material:
                        </span>
                        <span className="font-bold text-neutral-900 text-right">{product.material}</span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <span className="text-neutral-600 font-semibold flex items-center gap-1.5 shrink-0">
                          <Ruler className="w-3.5 h-3.5 text-neutral-800" />
                          Dimensions / Size:
                        </span>
                        <span className="font-bold text-neutral-900 text-right">{product.dimensions}</span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <span className="text-neutral-600 font-semibold flex items-center gap-1.5 shrink-0">
                          <Scale className="w-3.5 h-3.5 text-neutral-800" />
                          Paper Weight &amp; Spine:
                        </span>
                        <span className="font-bold text-neutral-900 text-right">{product.weightGsm}</span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <span className="text-neutral-600 font-semibold flex items-center gap-1.5 shrink-0">
                          <Printer className="w-3.5 h-3.5 text-neutral-800" />
                          Surface Finish:
                        </span>
                        <span className="font-bold text-neutral-900 text-right">{product.finish}</span>
                      </div>
                    </div>

                    {/* KEY FEATURES LIST */}
                    <div className="my-3 space-y-1.5">
                      <p className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
                        Key Features &amp; Specifications:
                      </p>
                      {product.khasiyat.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM PRICING TIERS & CALL TO ACTION */}
                  <div className="mt-4 pt-4 border-t border-[#DECFC0] space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-neutral-800">Select Volume Batch:</span>
                        <span className="text-neutral-600 text-[11px]">
                          Calculated: <strong>₹{unitPrice}</strong> / book
                        </span>
                      </div>

                      {/* Quantity Selector Pills */}
                      <div className="grid grid-cols-3 gap-1.5">
                        {product.qtyTiers.map((tier) => {
                          const isSelected = activeTier.qty === tier.qty;
                          return (
                            <button
                              key={tier.qty}
                              type="button"
                              onClick={() => handleSelectTier(product.id, tier.qty)}
                              className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                                isSelected
                                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                                  : 'bg-[#EFE5D8] text-neutral-800 hover:bg-[#E6D7C3] border-[#DECFC0]'
                              }`}
                            >
                              <div className="leading-tight">{tier.label.split(' ')[0]} {tier.label.split(' ')[1] || 'Bks'}</div>
                              <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-amber-300' : 'text-neutral-900'}`}>
                                ₹{tier.price}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={generateWhatsAppUrl(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-sm transition-all"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Order on WhatsApp</span>
                      </a>

                      <button
                        onClick={() => onOpenInquiry(product, activeTier.qty)}
                        className="py-2.5 px-3 rounded-xl bg-[#EFE5D8] hover:bg-[#E2D5C3] text-neutral-900 text-xs font-bold border border-[#DECFC0] cursor-pointer transition-colors"
                        title="Open Custom Quotation Form"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* DEDICATED PROMINENT BOTTOM BOX: "CONTACT FOR MORE DESIGNS" (As explicitly requested by user) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative rounded-3xl bg-radial from-[#FAF7F2] to-[#EFE5D8] border-2 border-[#BFAF9C] p-7 sm:p-10 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(#DECFC0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Callout Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>150+ Ready Commercial Templates &amp; Custom Layouts</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 font-['Playfair_Display',serif] tracking-tight">
                Contact for More Bill Book Designs &amp; Custom Formats
              </h3>

              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                Need a specific column layout for your business? We specialize in customized formats for{' '}
                <strong>
                  Retail Showrooms, Wholesalers, Transporters, GST Tax Invoices, Chemists, Hardware, and Jewelry Boutiques
                </strong>
                . Connect directly with proprietor <strong>Niraj Vora</strong> on WhatsApp to view complete PDF sample catalogs, 
                paper swatch books, and get free layout proofs before printing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-neutral-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Custom Columns, HSN/SAC &amp; Bank QR Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Choice of 1-Colour, 2-Colour or Full Color</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Carbonless NCR or High-Grade Sirpur Paper</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Free Red-Ink Consecutive Serial Stamping</span>
                </div>
              </div>
            </div>

            {/* Right Column: Direct WhatsApp & Call Action Box */}
            <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-2xl border border-[#DECFC0] p-6 sm:p-7 shadow-md space-y-4">
              <div className="border-b border-[#DECFC0] pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block">
                  Proprietor Contact:
                </span>
                <div className="text-xl font-bold text-neutral-900 font-['Playfair_Display',serif] mt-0.5">
                  Vora Niraj &amp; Vora Rahul
                </div>
                <p className="text-xs text-neutral-600">Haya Graphics • Ahmedabad Commercial Printing Hub</p>
              </div>

              <div className="space-y-2 text-sm font-semibold text-neutral-800">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Primary WhatsApp:</span>
                  <span className="font-mono font-bold text-neutral-900">{nirajDisplayPhone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Secondary Mobile:</span>
                  <span className="font-mono font-bold text-neutral-900">{rahulDisplayPhone}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>Factory Location:</span>
                  <span>Ahmedabad, Gujarat - 380001</span>
                </div>
              </div>

              {/* Direct WhatsApp Button to Niraj Vora */}
              <a
                id="btn-contact-niraj-more-designs"
                href={generalMoreDesignsWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-md transition-all group"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Chat with Niraj Vora for More Designs</span>
              </a>

              <a
                href={`tel:${nirajWhatsappNumber}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#EFE5D8] hover:bg-[#E5D7C5] text-neutral-900 font-bold text-xs border border-[#DECFC0] transition-colors"
              >
                <Phone className="w-4 h-4 text-neutral-700" />
                <span>Call Directly: {nirajDisplayPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR REAL PROOF ZOOM */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full bg-[#FAF7F2] rounded-3xl overflow-hidden border border-neutral-700 shadow-2xl"
            >
              <div className="p-4 bg-[#EFE5D8] border-b border-[#DECFC0] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-neutral-900 font-['Playfair_Display',serif]">
                    {lightboxImage.title}
                  </h4>
                  <p className="text-xs text-neutral-600">{lightboxImage.desc}</p>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-2 rounded-xl bg-[#E8DDD0] hover:bg-[#DDD0BF] text-neutral-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 flex items-center justify-center max-h-[75vh] overflow-auto">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  className="max-h-[65vh] w-auto rounded-xl object-contain shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 bg-[#EFE5D8] border-t border-[#DECFC0] flex items-center justify-between gap-3">
                <span className="text-xs text-neutral-700">
                  Ready for commercial production in single-color or dual-color offset.
                </span>
                <a
                  href={`https://wa.me/${nirajWhatsappNumber}?text=${encodeURIComponent(
                    `Hello Niraj Vora, I am reviewing this Bill Book proof: ${lightboxImage.title}. Please provide more design proofs and quote.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
