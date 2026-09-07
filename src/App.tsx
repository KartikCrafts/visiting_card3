import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  MessageCircle,
  Phone,
  HelpCircle,
  ShieldCheck,
  CheckCircle,
  Sliders,
  ArrowUpRight
} from 'lucide-react';
import { VisitingCardItem, ShopConfig } from './types';
import { INITIAL_CARDS, DEFAULT_SHOP_CONFIG } from './data/defaultCards';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MaterialFilter } from './components/MaterialFilter';
import { CardItem } from './components/CardItem';
import { InteractiveComparison } from './components/InteractiveComparison';
import { DirectContactSection } from './components/DirectContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { InquiryModal } from './components/InquiryModal';
import { DashboardModal } from './components/DashboardModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { UptimeStatusBar } from './components/UptimeStatusBar';
import { AddOnCalculatorModal } from './components/AddOnCalculatorModal';
import { SampleKitOrderModal } from './components/SampleKitOrderModal';
import { PrintSpecsModal } from './components/PrintSpecsModal';
import { RateCardPrintModal } from './components/RateCardPrintModal';
import { ClientReviewsSection } from './components/ClientReviewsSection';

const CARDS_STORAGE_KEY = 'haya_visiting_cards_v2';
const CONFIG_STORAGE_KEY = 'haya_shop_config_v2';

export default function App() {
  // 1. Visiting Cards State with localStorage
  const [cards, setCards] = useState<VisitingCardItem[]>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY)
        ? localStorage.getItem(CARDS_STORAGE_KEY)
        : null;
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cards from storage', e);
    }
    return INITIAL_CARDS;
  });

  // 2. Shop & Contact Configuration State
  const [shopConfig, setShopConfig] = useState<ShopConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.shopName && parsed.shopName !== 'Elite Print Studio') {
          // If stored config has old default logo or none, upgrade to new logo
          if (
            !parsed.logoUrl ||
            parsed.logoUrl ===
              'https://cdn.phototourl.com/free/2026-09-04-030fee9c-0662-490e-95b5-8ea83f3330e1.jpg'
          ) {
            parsed.logoUrl = DEFAULT_SHOP_CONFIG.logoUrl;
          }
          return { ...DEFAULT_SHOP_CONFIG, ...parsed };
        }
      }
    } catch (e) {
      console.error('Error loading shop config', e);
    }
    return DEFAULT_SHOP_CONFIG;
  });

  // 3. Modals state
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [inquiryModalCard, setInquiryModalCard] = useState<VisitingCardItem | null>(null);
  const [inquiryDefaultQty, setInquiryDefaultQty] = useState(500);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSampleKitOpen, setIsSampleKitOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isRateCardOpen, setIsRateCardOpen] = useState(false);

  // 4. Filters & Search state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'gsm-desc'>('popular');

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('Failed to save cards to localStorage', e);
    }
  }, [cards]);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(shopConfig));
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
    }
  }, [shopConfig]);

  // Derived Categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    cards.forEach((c) => set.add(c.category));
    return Array.from(set);
  }, [cards]);

  // Filter & Sort Logic
  const filteredCards = useMemo(() => {
    let result = [...cards];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Search query filter (matches material name, raw material, finish, or khasiyat)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.material.toLowerCase().includes(q) ||
          c.finish.toLowerCase().includes(q) ||
          c.gsm.toLowerCase().includes(q) ||
          c.khasiyat.some((k) => k.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price500 - b.price500);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price500 - a.price500);
    } else if (sortBy === 'gsm-desc') {
      const getGsmNum = (val: string) => parseInt(val.replace(/[^0-9]/g, ''), 10) || 0;
      result.sort((a, b) => getGsmNum(b.gsm) - getGsmNum(a.gsm));
    }

    return result;
  }, [cards, selectedCategory, searchQuery, sortBy]);

  const handleOpenInquiry = (card: VisitingCardItem, quantity: number) => {
    setInquiryModalCard(card);
    setInquiryDefaultQty(quantity);
  };

  const handleResetDefaults = () => {
    setCards(INITIAL_CARDS);
    setShopConfig(DEFAULT_SHOP_CONFIG);
    localStorage.removeItem(CARDS_STORAGE_KEY);
    localStorage.removeItem(CONFIG_STORAGE_KEY);
  };

  const scrollToCards = () => {
    const el = document.getElementById('materials-showcase-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('direct-contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-[#EFE6DC] selection:text-neutral-900">
        
        {/* Real 24/7 Cloud Node & High-Availability Reliability Bar */}
        <UptimeStatusBar onOpenDashboard={() => setIsDashboardOpen(true)} />

        {/* Top Announcement Bar in Light Brown */}
        <div className="bg-[#FAF7F2] border-b border-[#DECFC0] px-4 py-2 text-center text-xs font-semibold text-neutral-800 flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
          <span>Visiting Card Factory Direct Rates & WhatsApp Inquiry Active</span>
          <button
            onClick={() => setIsDashboardOpen(true)}
            className="ml-2 underline font-bold hover:text-neutral-950 flex items-center gap-0.5 text-neutral-900"
          >
            <span>Proprietor Portal</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Header */}
        <Header
          config={shopConfig}
          onOpenDashboard={() => setIsDashboardOpen(true)}
          onOpenContact={scrollToContact}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenRateCard={() => setIsRateCardOpen(true)}
          onOpenSampleKit={() => setIsSampleKitOpen(true)}
        />

        {/* Main Content */}
        <main className="flex-1">
          {/* Dynamic Hero Section with 3D Card Simulation */}
          <HeroSection
            config={shopConfig}
            onExploreClick={scrollToCards}
            onOpenInquiryModal={() => handleOpenInquiry(cards[0], 500)}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenSampleKit={() => setIsSampleKitOpen(true)}
            onOpenSpecs={() => setIsSpecsOpen(true)}
          />

        {/* CORE SHOWCASE SECTION: "Kis Material Se Bana Hai, Khasiyat, Prise & Direct Contact" */}
        <section
          id="materials-showcase-section"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24"
        >
          {/* Section Heading with Motion Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] text-neutral-900 border border-[#DECFC0] mb-2">
              <Layers className="w-3.5 h-3.5 text-neutral-900" /> Material & Pricing Catalog
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 font-['Playfair_Display',serif] tracking-tight">
              Business Card Materials & Volume Rates
            </h2>
            <p className="text-base text-neutral-700 mt-2">
              Explore authentic <strong>board materials</strong>, <strong>distinctive features</strong>, and <strong>transparent package rates</strong> below. Click any WhatsApp button to order directly with digital proofs.
            </p>
          </motion.div>

          {/* Search, Sort & Category Filter */}
          <MaterialFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalCards={cards.length}
          />

          {/* Cards Grid: Light Brown Boxes with Entry & Exit Animations */}
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              <AnimatePresence mode="popLayout">
                {filteredCards.map((card, idx) => (
                  <CardItem
                    key={card.id}
                    card={card}
                    config={shopConfig}
                    index={idx}
                    onOpenInquiry={handleOpenInquiry}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-[#FAF7F2] rounded-3xl border border-[#DECFC0]">
              <p className="text-lg font-bold text-neutral-800">No matching card materials found</p>
              <p className="text-xs text-neutral-600 mt-1">
                Please try a different keyword or select another category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold"
              >
                Show All Cards
              </button>
            </div>
          )}

          {/* Interactive Material Comparison Table */}
          <InteractiveComparison
            cards={cards}
            config={shopConfig}
            onSelectCard={(c) => handleOpenInquiry(c, 500)}
          />
        </section>

        {/* Real Client Testimonials and Commercial Print Assurance */}
        <ClientReviewsSection
          config={shopConfig}
          onOpenSampleKit={() => setIsSampleKitOpen(true)}
          onOpenSpecs={() => setIsSpecsOpen(true)}
        />

        {/* Direct Contact & WhatsApp Form Section */}
        <DirectContactSection config={shopConfig} cards={cards} />
      </main>

      {/* Footer in Light Brown with recurring in-view animation */}
      <footer className="bg-[#FAF7F2] border-t border-[#DECFC0] py-12 text-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EADBCC] border border-[#CDBAA5] p-0.5 overflow-hidden shadow-xs">
                  <img
                    src={shopConfig.logoUrl || 'https://cdn.phototourl.com/free/2026-09-05-47f48cc1-83b5-4418-88e7-41e03a644791.jpg'}
                    alt={shopConfig.shopName}
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-xl font-bold font-['Playfair_Display',serif] block text-neutral-900">
                    {shopConfig.shopName}
                  </span>
                  <span className="text-[11px] text-neutral-600 font-medium">
                    {shopConfig.tagline}
                  </span>
                </div>
              </div>
              <p className="text-xs text-neutral-700 max-w-md leading-relaxed">
                Explore luxury business card materials, exact paper GSM weights, thickness specifications, and transparent volume rates. Instant WhatsApp order support and sample inquiries.
              </p>
              <div className="pt-1">
                <span className="text-xs font-bold text-neutral-900">
                  Proprietor: {shopConfig.ownerName}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-3">
                Materials We Print
              </h4>
              <ul className="text-xs text-neutral-700 space-y-2">
                <li>• 450 GSM Velvet Matte Luxe</li>
                <li>• 350 GSM Royal Textured Linen</li>
                <li>• 400 GSM Unbleached Earth Kraft</li>
                <li>• 350 Micron Waterproof Frosted PVC</li>
                <li>• 600 GSM Embossed Gold Foil Cotton</li>
                <li>• 350 GSM Metallic Pearl Shimmer</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-3">
                Instant Customer Help
              </h4>
              <div className="space-y-2 text-xs text-neutral-700">
                <p>
                  <strong className="text-neutral-900">WhatsApp:</strong>{' '}
                  {shopConfig.whatsappNumber}
                </p>
                <p>
                  <strong className="text-neutral-900">Call:</strong>{' '}
                  {shopConfig.displayPhone}
                </p>
                <p>
                  <strong className="text-neutral-900">Hours:</strong>{' '}
                  {shopConfig.workingHours}
                </p>
                <button
                  id="footer-dashboard-btn"
                  onClick={() => setIsDashboardOpen(true)}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 font-bold border border-[#DECFC0] transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Proprietor Dashboard</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#DECFC0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
            <p>© {new Date().getFullYear()} {shopConfig.shopName}. All business card specifications and pricing verified.</p>
            <p className="flex items-center gap-1">
              <span>Haya Graphics • Niraj Vora • +91 73838 55862</span>
            </p>
          </div>
        </motion.div>
      </footer>

      {/* Floating WhatsApp Instant Chat Button */}
      <FloatingWhatsApp config={shopConfig} />

      {/* Direct Quote / Inquiry Modal */}
      <InquiryModal
        card={inquiryModalCard}
        defaultQty={inquiryDefaultQty}
        config={shopConfig}
        isOpen={!!inquiryModalCard}
        onClose={() => setInquiryModalCard(null)}
      />

      {/* Commercial Finish & Price Add-On Calculator Modal */}
      <AddOnCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        config={shopConfig}
        cards={cards}
      />

      {/* Paper Swatch Sample Kit Order Modal */}
      <SampleKitOrderModal
        isOpen={isSampleKitOpen}
        onClose={() => setIsSampleKitOpen(false)}
        config={shopConfig}
        cards={cards}
      />

      {/* Pre-Press & Bleed Technical Specifications Modal */}
      <PrintSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        config={shopConfig}
      />

      {/* Printable B2B Rate Card Modal */}
      <RateCardPrintModal
        isOpen={isRateCardOpen}
        onClose={() => setIsRateCardOpen(false)}
        config={shopConfig}
        cards={cards}
      />

      {/* Light Brown Dashboard Modal with PIN Security */}
      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        cards={cards}
        config={shopConfig}
        onSaveCards={(newCards) => setCards(newCards)}
        onSaveConfig={(newConfig) => setShopConfig(newConfig)}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  </ErrorBoundary>
  );
}
