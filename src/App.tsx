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
  ArrowUpRight,
  Calculator,
  Package,
  FileSpreadsheet,
  Printer
} from 'lucide-react';
import { ProductItem, ProductCategoryKey, ShopConfig } from './types';
import { CATEGORIES_CONFIG } from './data/categoriesConfig';
import { INITIAL_PRODUCTS } from './data/allProductsData';
import { DEFAULT_SHOP_CONFIG } from './data/defaultCards';
import { Header } from './components/Header';
import { CategoryNavbar } from './components/CategoryNavbar';
import { CategoryHeroSection } from './components/CategoryHeroSection';
import { ProductCardItem } from './components/ProductCardItem';
import { ProductCatalogFilter } from './components/ProductCatalogFilter';
import { ProductComparisonTable } from './components/ProductComparisonTable';
import { BillBookCatalogSection } from './components/BillBookCatalogSection';
import { MultiCategoryDashboardModal } from './components/MultiCategoryDashboardModal';
import { AddOnCalculatorModal } from './components/AddOnCalculatorModal';
import { SampleKitOrderModal } from './components/SampleKitOrderModal';
import { PrintSpecsModal } from './components/PrintSpecsModal';
import { RateCardPrintModal } from './components/RateCardPrintModal';
import { ClientReviewsSection } from './components/ClientReviewsSection';
import { DirectContactSection } from './components/DirectContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { InquiryModal } from './components/InquiryModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { UptimeStatusBar } from './components/UptimeStatusBar';

const PRODUCTS_STORAGE_KEY = 'haya_all_products_v5';
const CONFIG_STORAGE_KEY = 'haya_shop_config_v5';
const ACTIVE_CAT_STORAGE_KEY = 'haya_active_category_v5';

export default function App() {
  // 1. Active Category State (defaults to visiting-cards or stored preference)
  const [activeCategory, setActiveCategory] = useState<ProductCategoryKey>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_CAT_STORAGE_KEY);
      if (
        saved &&
        CATEGORIES_CONFIG.some((c) => c.key === (saved as ProductCategoryKey))
      ) {
        return saved as ProductCategoryKey;
      }
    } catch (e) {
      console.error(e);
    }
    return 'visiting-cards';
  });

  // 2. All Products Database State with localStorage
  const [allProducts, setAllProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasBrokenImgs = parsed.some(
            (p: ProductItem) =>
              p.imageUrl && p.imageUrl.includes('phototourl.com/free/2026-09-14-')
          );
          if (!hasBrokenImgs) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.error('Error loading products from storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // 3. Shop & Ahmedabad Contact Configuration
  const [shopConfig, setShopConfig] = useState<ShopConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.shopName) {
          const cleanShopName = parsed.shopName
            .replace(/[\u0A80-\u0AFF]+/g, '')
            .replace(/[()]/g, '')
            .trim() || 'Haya Graphics';

          return {
            ...DEFAULT_SHOP_CONFIG,
            ...parsed,
            shopName: cleanShopName,
            // Ensure Ahmedabad address & current logo
            cityState: parsed.cityState?.includes('Mumbai')
              ? 'Ahmedabad, Gujarat - 380001'
              : parsed.cityState || DEFAULT_SHOP_CONFIG.cityState,
            logoUrl:
              'https://cdn.phototourl.com/free/2026-09-05-47f48cc1-83b5-4418-88e7-41e03a644791.jpg',
          };
        }
      }
    } catch (e) {
      console.error('Error loading shop config', e);
    }
    return DEFAULT_SHOP_CONFIG;
  });

  // 4. Modals state
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState<ProductItem | null>(null);
  const [inquiryDefaultQty, setInquiryDefaultQty] = useState<number>(1000);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSampleKitOpen, setIsSampleKitOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isRateCardOpen, setIsRateCardOpen] = useState(false);

  // 5. In-Category Filtering & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubTag, setSelectedSubTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<
    'recommended' | 'price-low' | 'price-high' | 'weight'
  >('recommended');

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(allProducts));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [allProducts]);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(shopConfig));
    } catch (e) {
      console.error('Failed to save shopConfig to localStorage', e);
    }
  }, [shopConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_CAT_STORAGE_KEY, activeCategory);
    } catch (e) {
      console.error(e);
    }
    // Reset category-specific search/filter when category changes
    setSearchQuery('');
    setSelectedSubTag('All');
  }, [activeCategory]);

  // Current category metadata
  const currentCategoryMeta = useMemo(() => {
    return (
      CATEGORIES_CONFIG.find((c) => c.key === activeCategory) ||
      CATEGORIES_CONFIG[0]
    );
  }, [activeCategory]);

  // Product Counts for navigation bar badges
  const productCounts = useMemo(() => {
    const counts: Record<ProductCategoryKey, number> = {
      'visiting-cards': 0,
      'bill-books': 0,
      'letter-pads': 0,
      stickers: 0,
      pamphlets: 0,
      standees: 0,
      'one-way-vision': 0,
      envelopes: 0,
    };
    allProducts.forEach((p) => {
      if (counts[p.categoryKey] !== undefined) {
        counts[p.categoryKey]++;
      }
    });
    return counts;
  }, [allProducts]);

  // Products belonging to the active category
  const activeCategoryProducts = useMemo(() => {
    return allProducts.filter((p) => p.categoryKey === activeCategory);
  }, [allProducts, activeCategory]);

  // Sub-tags available in active category (from badges or categories)
  const availableSubTags = useMemo(() => {
    const tags = new Set<string>();
    activeCategoryProducts.forEach((p) => {
      if (p.categoryBadge) tags.add(p.categoryBadge);
      else if (p.badge) tags.add(p.badge);
    });
    return Array.from(tags);
  }, [activeCategoryProducts]);

  // Filtered & Sorted active category products
  const filteredProducts = useMemo(() => {
    let result = [...activeCategoryProducts];

    // SubTag filter
    if (selectedSubTag !== 'All') {
      result = result.filter(
        (p) => p.categoryBadge === selectedSubTag || p.badge === selectedSubTag
      );
    }

    // Search Query (matches name, material, finish, dimensions, or khasiyat)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.finish.toLowerCase().includes(q) ||
          p.dimensions.toLowerCase().includes(q) ||
          p.weightGsm.toLowerCase().includes(q) ||
          p.khasiyat.some((k) => k.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.qtyTiers[0]?.price || 0) - (b.qtyTiers[0]?.price || 0));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.qtyTiers[0]?.price || 0) - (a.qtyTiers[0]?.price || 0));
    } else if (sortBy === 'weight') {
      const getNum = (val: string) => parseInt(val.replace(/[^0-9]/g, ''), 10) || 0;
      result.sort((a, b) => getNum(b.weightGsm) - getNum(a.weightGsm));
    }

    return result;
  }, [activeCategoryProducts, selectedSubTag, searchQuery, sortBy]);

  // Convert visiting cards for backward-compatible modals (Calculator / Contact)
  const visitingCardsCompat = useMemo(() => {
    return allProducts
      .filter((p) => p.categoryKey === 'visiting-cards')
      .map((p) => ({
        id: p.id,
        name: p.name,
        material: p.material,
        category: p.categoryBadge || 'Premium',
        gsm: p.weightGsm,
        thickness: p.dimensions,
        finish: p.finish,
        dimensions: p.dimensions,
        khasiyat: p.khasiyat,
        bestFor: p.bestFor,
        price1000: p.qtyTiers.find((t) => t.qty === 1000)?.price || 2450,
        price2000: p.qtyTiers.find((t) => t.qty === 2000)?.price || 4400,
        price3000: p.qtyTiers.find((t) => t.qty === 3000)?.price || 6150,
        badge: p.badge,
        inStock: p.inStock,
        deliveryDays: p.deliveryDays,
        visualTheme: p.visualTheme,
      }));
  }, [allProducts]);

  const handleOpenInquiry = (product: ProductItem, quantity: number) => {
    setInquiryProduct(product);
    setInquiryDefaultQty(quantity);
  };

  const handleResetDefaults = () => {
    setAllProducts(INITIAL_PRODUCTS);
    setShopConfig(DEFAULT_SHOP_CONFIG);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    localStorage.removeItem(ACTIVE_CAT_STORAGE_KEY);
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-catalog-section');
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
        {/* High-Availability Reliability Bar */}
        <UptimeStatusBar onOpenDashboard={() => setIsDashboardOpen(true)} />

        {/* Top Factory Announcement Bar */}
        <div className="bg-[#FAF7F2] border-b border-[#DECFC0] px-4 py-2 text-center text-xs font-semibold text-neutral-800 flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
          <span>
            Haya Graphics Commercial Hub: Ahmedabad, Gujarat • Direct Factory Wholesale Pricing
          </span>
          <button
            onClick={() => setIsDashboardOpen(true)}
            className="ml-2 underline font-bold hover:text-neutral-950 flex items-center gap-0.5 text-neutral-900 cursor-pointer"
          >
            <span>Proprietor Portal</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Global Shop Header with Centered Official Logo */}
        <Header
          config={shopConfig}
          onOpenDashboard={() => setIsDashboardOpen(true)}
          onOpenContact={scrollToContact}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenRateCard={() => setIsRateCardOpen(true)}
          onOpenSampleKit={() => setIsSampleKitOpen(true)}
        />

        {/* CATEGORY SWITCHER TOP BAR: Visiting Card, Bill Book, Letter Pad, Sticker, Template/Pamphlet, Roll-Up Standee, One Way Vision, Envelope */}
        <CategoryNavbar
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          productCounts={productCounts}
        />

        {/* Main Body */}
        <main className="flex-1">
          {/* DYNAMIC CATEGORY HERO SECTION (Adapts dynamically to the active product category with 3D product simulation) */}
          <CategoryHeroSection
            activeCategory={activeCategory}
            config={shopConfig}
            onExploreClick={scrollToProducts}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenSampleKit={() => setIsSampleKitOpen(true)}
            onOpenSpecs={() => setIsSpecsOpen(true)}
            totalProductsCount={activeCategoryProducts.length}
          />

          {/* BILL BOOK DEDICATED SECTION OR STANDARD CATALOG SECTION */}
          {activeCategory === 'bill-books' ? (
            <div id="products-catalog-section" className="scroll-mt-32">
              <BillBookCatalogSection
                products={activeCategoryProducts}
                config={shopConfig}
                onOpenInquiry={handleOpenInquiry}
              />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <ProductComparisonTable
                  products={activeCategoryProducts}
                  categoryTitle={currentCategoryMeta.label}
                  config={shopConfig}
                  onSelectProduct={(p) => handleOpenInquiry(p, p.qtyTiers[0]?.qty || 10)}
                />
              </div>
            </div>
          ) : (
            /* STANDARD CATALOG SECTION: "10-15 Designs, Material, Look, Dimensions, Weight, Pricing & WhatsApp" */
            <section
              id="products-catalog-section"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 scroll-mt-32"
            >
              {/* Section Header */}
              <motion.div
                key={`cat-header-${activeCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-3xl mx-auto mb-10"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] text-neutral-900 border border-[#DECFC0] mb-2">
                  <Layers className="w-3.5 h-3.5 text-neutral-900" />
                  {currentCategoryMeta.label} Collection
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 font-['Playfair_Display',serif] tracking-tight">
                  {currentCategoryMeta.heroHeadline}
                </h2>
                <p className="text-sm sm:text-base text-neutral-700 mt-2">
                  Browse through all <strong>{activeCategoryProducts.length} individual designs &amp; material variations</strong> below. Check exact raw material specifications, surface look, dimensions, weight, and Ahmedabad batch pricing.
                </p>
              </motion.div>

              {/* In-Category Search, Sort, and Sub-Tag Filter */}
              <ProductCatalogFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedTag={selectedSubTag}
                onSelectTag={setSelectedSubTag}
                availableTags={availableSubTags}
                sortBy={sortBy}
                onSortChange={setSortBy}
                totalFilteredCount={filteredProducts.length}
                totalCount={activeCategoryProducts.length}
              />

              {/* UNIFIED PRODUCT GRID (Same hover effect, same font colors, sizes, and entry/exit animations) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, idx) => (
                    <ProductCardItem
                      key={product.id}
                      product={product}
                      config={shopConfig}
                      index={idx}
                      onOpenInquiry={handleOpenInquiry}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Empty Search Result Fallback */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16 bg-[#FAF7F2] rounded-3xl border border-[#DECFC0] p-8 mt-6">
                  <p className="text-base font-bold text-neutral-800 font-['Playfair_Display',serif]">
                    No matching materials found for "{searchQuery}"
                  </p>
                  <p className="text-xs text-neutral-600 mt-1">
                    Try clearing your search or switching sub-tags to view all {activeCategoryProducts.length} varieties.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSubTag('All');
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold cursor-pointer"
                  >
                    Show All {currentCategoryMeta.label}
                  </button>
                </div>
              )}

              {/* SPECIFICATION COMPARISON MATRIX TABLE FOR ACTIVE CATEGORY */}
              <ProductComparisonTable
                products={activeCategoryProducts}
                categoryTitle={currentCategoryMeta.label}
                config={shopConfig}
                onSelectProduct={(p) => handleOpenInquiry(p, p.qtyTiers[0]?.qty || 1000)}
              />
            </section>
          )}

          {/* Genuine Client Reviews & Ahmedabad Reputation */}
          <ClientReviewsSection
            config={shopConfig}
            onOpenSampleKit={() => setIsSampleKitOpen(true)}
            onOpenSpecs={() => setIsSpecsOpen(true)}
          />

          {/* Direct Contact & WhatsApp Quotation Form (Updated for Ahmedabad, Gujarat) */}
          <DirectContactSection
            config={shopConfig}
            cards={visitingCardsCompat}
          />
        </main>

        {/* Global Footer */}
        <footer className="bg-[#FAF7F2] border-t border-[#DECFC0] py-10 text-xs text-neutral-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-bold text-neutral-900 font-['Playfair_Display',serif] text-sm">
                {shopConfig.shopName}
              </p>
              <p className="text-neutral-600 mt-0.5">
                {shopConfig.address}, {shopConfig.cityState}
              </p>
              <p className="text-neutral-500 text-[11px] mt-0.5">
                Proprietors: {shopConfig.ownerName} • Contact: {shopConfig.displayPhone}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 font-bold border border-[#DECFC0] cursor-pointer"
              >
                Proprietor Dashboard
              </button>
              <button
                onClick={() => setIsRateCardOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 font-bold border border-[#DECFC0] cursor-pointer"
              >
                Print Rate Card
              </button>
            </div>
          </div>
        </footer>

        {/* FLOATING WHATSAPP BUTTON */}
        <FloatingWhatsApp config={shopConfig} />

        {/* UNIVERSAL PROPRIETOR DASHBOARD MODAL */}
        <MultiCategoryDashboardModal
          isOpen={isDashboardOpen}
          onClose={() => setIsDashboardOpen(false)}
          products={allProducts}
          config={shopConfig}
          onSaveProducts={(updated) => setAllProducts(updated)}
          onSaveConfig={(updated) => setShopConfig(updated)}
          onResetDefaults={handleResetDefaults}
          initialCategory={activeCategory}
        />

        {/* 1000/2000/3000 ADD-ON CALCULATOR MODAL */}
        <AddOnCalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
          cards={visitingCardsCompat}
          config={shopConfig}
        />

        {/* DIRECT ORDER / INQUIRY MODAL */}
        <InquiryModal
          isOpen={!!inquiryProduct}
          onClose={() => setInquiryProduct(null)}
          product={inquiryProduct}
          defaultQty={inquiryDefaultQty}
          config={shopConfig}
        />

        {/* SAMPLE KIT ORDER MODAL */}
        <SampleKitOrderModal
          isOpen={isSampleKitOpen}
          onClose={() => setIsSampleKitOpen(false)}
          config={shopConfig}
          cards={visitingCardsCompat}
        />

        {/* PRINT SPECIFICATIONS MODAL */}
        <PrintSpecsModal
          isOpen={isSpecsOpen}
          onClose={() => setIsSpecsOpen(false)}
          config={shopConfig}
        />

        {/* RATE CARD PRINT MODAL */}
        <RateCardPrintModal
          isOpen={isRateCardOpen}
          onClose={() => setIsRateCardOpen(false)}
          products={activeCategoryProducts}
          config={shopConfig}
          categoryTitle={currentCategoryMeta.label}
        />
      </div>
    </ErrorBoundary>
  );
}
