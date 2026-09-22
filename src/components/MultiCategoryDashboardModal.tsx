import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Sliders,
  Phone,
  MessageCircle,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  CreditCard,
  FileSpreadsheet,
  FileText,
  Tag,
  Flag,
  Eye,
  Mail,
  MapPin
} from 'lucide-react';
import { ProductItem, ProductCategoryKey, ShopConfig } from '../types';
import { CATEGORIES_CONFIG } from '../data/categoriesConfig';

interface MultiCategoryDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  config: ShopConfig;
  onSaveProducts: (products: ProductItem[]) => void;
  onSaveConfig: (config: ShopConfig) => void;
  onResetDefaults: () => void;
  initialCategory?: ProductCategoryKey;
}

export const MultiCategoryDashboardModal: React.FC<MultiCategoryDashboardModalProps> = ({
  isOpen,
  onClose,
  products,
  config,
  onSaveProducts,
  onSaveConfig,
  onResetDefaults,
  initialCategory = 'visiting-cards',
}) => {
  if (!isOpen) return null;

  // Master Security PIN Gate (1234 default)
  const [adminPin, setAdminPin] = useState<string>(() => {
    try {
      return localStorage.getItem('haya_admin_pin') || '1234';
    } catch (e) {
      return '1234';
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [newPinValue, setNewPinValue] = useState<string>('');
  const [pinUpdateSuccess, setPinUpdateSuccess] = useState<string | null>(null);

  // Selected Category inside Dashboard
  const [selectedDashboardCategory, setSelectedDashboardCategory] =
    useState<ProductCategoryKey>(initialCategory);

  // Active top tab
  const [activeMainTab, setActiveMainTab] = useState<'products' | 'add' | 'shop'>('products');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Local state for editing
  const [productList, setProductList] = useState<ProductItem[]>(products);
  const [shopConfig, setShopConfig] = useState<ShopConfig>(config);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Handle PIN unlock
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() === adminPin) {
      setIsAuthenticated(true);
      setPinError('');
      setEnteredPin('');
    } else {
      setPinError('Incorrect Master PIN. (Default factory PIN is 1234)');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinValue.trim().length < 4) {
      setPinUpdateSuccess('PIN must be at least 4 digits');
      return;
    }
    const sanitized = newPinValue.trim();
    setAdminPin(sanitized);
    try {
      localStorage.setItem('haya_admin_pin', sanitized);
    } catch (err) {
      console.error(err);
    }
    setPinUpdateSuccess('Master PIN updated successfully!');
    setNewPinValue('');
    setTimeout(() => setPinUpdateSuccess(null), 3500);
  };

  // Filter products for the active category in dashboard
  const currentCategoryProducts = productList.filter(
    (p) => p.categoryKey === selectedDashboardCategory
  );

  // New product template
  const [newProdName, setNewProdName] = useState('');
  const [newProdMaterial, setNewProdMaterial] = useState('');
  const [newProdFinish, setNewProdFinish] = useState('');
  const [newProdDimensions, setNewProdDimensions] = useState('3.5" x 2.0"');
  const [newProdWeight, setNewProdWeight] = useState('400 GSM');
  const [newProdBestFor, setNewProdBestFor] = useState('');
  const [newProdBadge, setNewProdBadge] = useState('New Arrival');
  const [newPrice1, setNewPrice1] = useState(1500);
  const [newPrice2, setNewPrice2] = useState(2800);
  const [newPrice3, setNewPrice3] = useState(4000);

  const handleUpdateProductField = (
    id: string,
    field: keyof ProductItem,
    value: any
  ) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleUpdateTierPrice = (productId: string, tierIndex: number, newPrice: number) => {
    setProductList((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const updatedTiers = [...p.qtyTiers];
        if (updatedTiers[tierIndex]) {
          updatedTiers[tierIndex] = {
            ...updatedTiers[tierIndex],
            price: newPrice,
          };
        }
        return { ...p, qtyTiers: updatedTiers };
      })
    );
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      setStatusMsg('Product removed successfully.');
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const handleSaveAllProducts = () => {
    onSaveProducts(productList);
    setStatusMsg('All product specifications and prices saved live!');
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleSaveShopConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(shopConfig);
    setStatusMsg('Shop profile and Ahmedabad contact details updated live!');
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdMaterial.trim()) {
      alert('Please fill in Product Name and Material.');
      return;
    }

    const catMeta = CATEGORIES_CONFIG.find((c) => c.key === selectedDashboardCategory);
    let qtyTiers = [
      { qty: 1000, label: '1000 Units', price: newPrice1 },
      { qty: 2000, label: '2000 Units', price: newPrice2 },
      { qty: 3000, label: '3000 Units', price: newPrice3 },
    ];

    if (selectedDashboardCategory === 'bill-books') {
      qtyTiers = [
        { qty: 10, label: '10 Books', price: newPrice1 },
        { qty: 25, label: '25 Books', price: newPrice2 },
        { qty: 50, label: '50 Books', price: newPrice3 },
      ];
    } else if (selectedDashboardCategory === 'letter-pads') {
      qtyTiers = [
        { qty: 5, label: '5 Pads', price: newPrice1 },
        { qty: 10, label: '10 Pads', price: newPrice2 },
        { qty: 20, label: '20 Pads', price: newPrice3 },
      ];
    } else if (selectedDashboardCategory === 'standees') {
      qtyTiers = [
        { qty: 1, label: '1 Standee', price: newPrice1 },
        { qty: 2, label: '2 Standees', price: newPrice2 },
        { qty: 5, label: '5 Standees', price: newPrice3 },
      ];
    } else if (selectedDashboardCategory === 'one-way-vision') {
      qtyTiers = [
        { qty: 25, label: '25 Sq. Ft.', price: newPrice1 },
        { qty: 50, label: '50 Sq. Ft.', price: newPrice2 },
        { qty: 100, label: '100 Sq. Ft.', price: newPrice3 },
      ];
    }

    const newItem: ProductItem = {
      id: `${selectedDashboardCategory}-${Date.now()}`,
      categoryKey: selectedDashboardCategory,
      name: newProdName.trim(),
      material: newProdMaterial.trim(),
      finish: newProdFinish.trim() || 'Matte Smooth',
      dimensions: newProdDimensions.trim(),
      weightGsm: newProdWeight.trim(),
      khasiyat: [
        'Premium commercial grade quality',
        'Direct factory manufactured in Ahmedabad',
        'High durability and crisp offset color clarity',
      ],
      bestFor: newProdBestFor.trim() || 'Corporate and Retail Branding',
      qtyTiers,
      badge: newProdBadge.trim() || undefined,
      inStock: true,
      deliveryDays: '2 - 3 Days',
      visualTheme: {
        cardBg: '#1e242b',
        cardTextColor: '#f3ede2',
        accentColor: '#d4af37',
        textureStyle: 'matte',
      },
    };

    const updated = [newItem, ...productList];
    setProductList(updated);
    onSaveProducts(updated);

    // Reset form
    setNewProdName('');
    setNewProdMaterial('');
    setNewProdFinish('');
    setStatusMsg(`New ${catMeta?.label} material added successfully!`);
    setActiveMainTab('products');
    setTimeout(() => setStatusMsg(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#DECFC0] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* DASHBOARD TOP BANNER */}
        <div className="bg-[#EFE5D8] px-6 py-4 border-b border-[#DECFC0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold shadow-xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-neutral-900 font-['Playfair_Display',serif]">
                  Haya Graphics Proprietor Master Dashboard
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-neutral-900 border border-amber-300">
                  Ahmedabad Factory Hub
                </span>
              </div>
              <p className="text-xs text-neutral-700">
                Manage materials, look, dimensions, weight, and pricing across all 8 commercial print categories
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-800 bg-[#E8DDD0] hover:bg-[#DDD0BF] border border-[#CDBAA5] transition-colors"
                title="Lock session"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Portal</span>
              </button>
            )}

            <button
              onClick={() => {
                if (window.confirm('Reset all categories and shop configuration to factory defaults?')) {
                  onResetDefaults();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-800 bg-[#E8DDD0] hover:bg-[#DDD0BF] border border-[#CDBAA5] transition-colors"
              title="Reset defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#E8DDD0] hover:bg-[#DDD0BF] text-neutral-900 border border-[#CDBAA5] transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STATUS ALERT */}
        {statusMsg && (
          <div className="bg-emerald-800 text-white text-xs font-bold px-6 py-2 flex items-center gap-2 transition-all">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* SECURITY PIN GATE */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-[#EFE5D8] border border-[#DECFC0] flex items-center justify-center shadow-xs">
              <Lock className="w-8 h-8 text-neutral-800" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 font-['Playfair_Display',serif]">
                Enter Master Security PIN
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Enter your 4-digit PIN to configure materials, sizes, and batch prices. (Default factory PIN is <strong>1234</strong>)
              </p>
            </div>

            <form onSubmit={handleUnlock} className="w-full space-y-3">
              <input
                type="password"
                maxLength={8}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="Enter 4-digit PIN..."
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#DECFC0] text-center text-lg font-mono font-bold tracking-widest focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
              {pinError && (
                <p className="text-xs font-bold text-red-600">{pinError}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Unlock Dashboard Live
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD BODY */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* CATEGORY SWITCHER BAR INSIDE DASHBOARD */}
            <div className="bg-[#EFE5D8] px-6 py-2.5 border-b border-[#DECFC0] flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider shrink-0 mr-1">
                Product Category:
              </span>
              {CATEGORIES_CONFIG.map((cat) => {
                const isSelected = selectedDashboardCategory === cat.key;
                const count = productList.filter((p) => p.categoryKey === cat.key).length;

                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedDashboardCategory(cat.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-neutral-800 hover:bg-[#EADBCC] border border-[#DECFC0]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* TOP MAIN TABS */}
            <div className="px-6 pt-3 bg-[#FAF7F2] border-b border-[#DECFC0] flex gap-2">
              <button
                onClick={() => setActiveMainTab('products')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                  activeMainTab === 'products'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                📋 Catalog & Pricing ({currentCategoryProducts.length})
              </button>
              <button
                onClick={() => setActiveMainTab('add')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                  activeMainTab === 'add'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                ➕ Add New Material / Design
              </button>
              <button
                onClick={() => setActiveMainTab('shop')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                  activeMainTab === 'shop'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                🏢 Ahmedabad Shop & WhatsApp Profile
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-[#F6EFE6]">
              {/* TAB 1: PRODUCT LIST & EDITING */}
              {activeMainTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      {CATEGORIES_CONFIG.find((c) => c.key === selectedDashboardCategory)?.label} Catalog:
                    </span>
                    <button
                      onClick={handleSaveAllProducts}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save All Changes Live</span>
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {currentCategoryProducts.map((prod) => {
                      const isExpanded = editingProductId === prod.id;

                      return (
                        <div
                          key={prod.id}
                          className="rounded-2xl bg-[#FAF7F2] border border-[#DECFC0] p-4 sm:p-5 shadow-xs transition-all text-xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EAE0D3]">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-neutral-900 font-['Playfair_Display',serif]">
                                  {prod.name}
                                </span>
                                {prod.badge && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EADBCC] text-neutral-800">
                                    {prod.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-600 line-clamp-1 mt-0.5">
                                {prod.material} • {prod.dimensions} • {prod.weightGsm}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right text-[11px] font-bold text-neutral-900">
                                {prod.qtyTiers.map((t) => `${t.label}: ₹${t.price}`).join(' | ')}
                              </div>
                              <button
                                onClick={() =>
                                  setEditingProductId(isExpanded ? null : prod.id)
                                }
                                className="px-3 py-1.5 rounded-lg bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 font-bold border border-[#DECFC0] cursor-pointer"
                              >
                                {isExpanded ? 'Done' : 'Edit Specs & Rates'}
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* EXPANDED EDIT FORM */}
                          {isExpanded && (
                            <div className="pt-4 space-y-3.5">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block font-bold text-neutral-800 mb-1">
                                    Product Name:
                                  </label>
                                  <input
                                    type="text"
                                    value={prod.name}
                                    onChange={(e) =>
                                      handleUpdateProductField(prod.id, 'name', e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] font-medium"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-neutral-800 mb-1">
                                    Material &amp; Stock Specification:
                                  </label>
                                  <input
                                    type="text"
                                    value={prod.material}
                                    onChange={(e) =>
                                      handleUpdateProductField(prod.id, 'material', e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] font-medium"
                                  />
                                </div>
                              </div>

                              {/* Image URL & Color Offset Mode */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="sm:col-span-2">
                                  <label className="block font-bold text-neutral-800 mb-1">
                                    Image Proof URL (Live Design Preview):
                                  </label>
                                  <input
                                    type="url"
                                    value={prod.imageUrl || ''}
                                    onChange={(e) =>
                                      handleUpdateProductField(prod.id, 'imageUrl', e.target.value)
                                    }
                                    placeholder="https://... (e.g. cdn image link)"
                                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] text-xs font-mono"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-neutral-800 mb-1">
                                    Color Offset Mode:
                                  </label>
                                  <select
                                    value={prod.colorType || 'standard'}
                                    onChange={(e) =>
                                      handleUpdateProductField(prod.id, 'colorType', e.target.value as any)
                                    }
                                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] text-xs font-bold"
                                  >
                                    <option value="standard">Standard Full Color</option>
                                    <option value="1-colour">1-Colour (Single Ink Offset)</option>
                                    <option value="2-colour">2-Colour (Dual Tone Offset)</option>
                                    <option value="multi-colour">Multi-Colour Process</option>
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div>
                                  <label className="block font-bold text-neutral-800 mb-1">
                                    Look &amp; Finish:
                                  </label>
                                  <input
                                    type="text"
                                    value={prod.finish}
                                    onChange={(e) =>
                                      handleUpdateProductField(prod.id, 'finish', e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-neutral-800 mb-1">
                                    Dimensions (Height x Width):
                                  </label>
                                  <input
                                    type="text"
                                    value={prod.dimensions}
                                    onChange={(e) =>
                                      handleUpdateProductField(prod.id, 'dimensions', e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-neutral-800 mb-1">
                                    Weight / GSM / Density:
                                  </label>
                                  <input
                                    type="text"
                                    value={prod.weightGsm}
                                    onChange={(e) =>
                                      handleUpdateProductField(prod.id, 'weightGsm', e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-neutral-800 mb-1">
                                    Badge:
                                  </label>
                                  <input
                                    type="text"
                                    value={prod.badge || ''}
                                    onChange={(e) =>
                                      handleUpdateProductField(prod.id, 'badge', e.target.value)
                                    }
                                    placeholder="e.g. Best Seller"
                                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                                  />
                                </div>
                              </div>

                              {/* PRICING TIERS */}
                              <div className="p-3 bg-[#EFE5D8] rounded-xl border border-[#DECFC0]">
                                <span className="block font-bold text-neutral-900 mb-2">
                                  Package Rates (₹) - {prod.categoryKey === 'visiting-cards' ? '1000 / 2000 / 3000 Cards' : 'Volume Tiers'}:
                                </span>
                                <div className="grid grid-cols-3 gap-3">
                                  {prod.qtyTiers.map((tier, tIdx) => (
                                    <div key={tIdx}>
                                      <label className="block text-[11px] text-neutral-700 mb-1 font-bold">
                                        {tier.label}:
                                      </label>
                                      <input
                                        type="number"
                                        value={tier.price}
                                        onChange={(e) =>
                                          handleUpdateTierPrice(prod.id, tIdx, Number(e.target.value))
                                        }
                                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#DECFC0] font-bold"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: ADD NEW MATERIAL / PRODUCT */}
              {activeMainTab === 'add' && (
                <form
                  onSubmit={handleAddNewProduct}
                  className="rounded-2xl bg-[#FAF7F2] border border-[#DECFC0] p-6 space-y-4 text-xs"
                >
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 font-['Playfair_Display',serif]">
                      Add New Material for{' '}
                      {CATEGORIES_CONFIG.find((c) => c.key === selectedDashboardCategory)?.label}
                    </h3>
                    <p className="text-neutral-600 mt-0.5">
                      Define raw board/paper, finish, dimensions, weight, and volume package rates
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">
                        Product Variant Name *:
                      </label>
                      <input
                        type="text"
                        required
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        placeholder="e.g. Royal Diamond Velvet 450"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">
                        Material &amp; Stock Specification *:
                      </label>
                      <input
                        type="text"
                        required
                        value={newProdMaterial}
                        onChange={(e) => setNewProdMaterial(e.target.value)}
                        placeholder="e.g. 55 GSM Self-Copying NCR or 450 GSM Art Board"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">
                        Look & Finish:
                      </label>
                      <input
                        type="text"
                        value={newProdFinish}
                        onChange={(e) => setNewProdFinish(e.target.value)}
                        placeholder="e.g. Velvet Matte, High Gloss"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">
                        Height x Width (Dimensions):
                      </label>
                      <input
                        type="text"
                        value={newProdDimensions}
                        onChange={(e) => setNewProdDimensions(e.target.value)}
                        placeholder="e.g. 3.5 x 2.0 inch or A4"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">
                        Weight / GSM / Density:
                      </label>
                      <input
                        type="text"
                        value={newProdWeight}
                        onChange={(e) => setNewProdWeight(e.target.value)}
                        placeholder="e.g. 400 GSM / 0.48 mm"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-[#EFE5D8] rounded-xl border border-[#DECFC0] space-y-2">
                    <span className="block font-bold text-neutral-900">
                      Initial 3-Tier Rates (₹):
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-700 mb-1 font-semibold">
                          Tier 1 Rate:
                        </label>
                        <input
                          type="number"
                          value={newPrice1}
                          onChange={(e) => setNewPrice1(Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#DECFC0]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-neutral-700 mb-1 font-semibold">
                          Tier 2 Rate:
                        </label>
                        <input
                          type="number"
                          value={newPrice2}
                          onChange={(e) => setNewPrice2(Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#DECFC0]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-neutral-700 mb-1 font-semibold">
                          Tier 3 Rate:
                        </label>
                        <input
                          type="number"
                          value={newPrice3}
                          onChange={(e) => setNewPrice3(Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#DECFC0]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs shadow-md cursor-pointer hover:bg-neutral-800"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create & Publish Material</span>
                  </button>
                </form>
              )}

              {/* TAB 3: SHOP DETAILS & AHMEDABAD ADDRESS */}
              {activeMainTab === 'shop' && (
                <form
                  onSubmit={handleSaveShopConfig}
                  className="rounded-2xl bg-[#FAF7F2] border border-[#DECFC0] p-6 space-y-4 text-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#DECFC0]">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 font-['Playfair_Display',serif]">
                        Haya Graphics Shop & Ahmedabad Contact Details
                      </h3>
                      <p className="text-neutral-600 mt-0.5">
                        Update official business address, owners (Vora Niraj & Vora Rahul), and WhatsApp routing
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs shadow-xs cursor-pointer hover:bg-neutral-800"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Live Profile</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Shop Name:</label>
                      <input
                        type="text"
                        value={shopConfig.shopName}
                        onChange={(e) => setShopConfig({ ...shopConfig, shopName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Proprietor / Owners:</label>
                      <input
                        type="text"
                        value={shopConfig.ownerName}
                        onChange={(e) => setShopConfig({ ...shopConfig, ownerName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">
                        Street Address (Ahmedabad, Gujarat):
                      </label>
                      <input
                        type="text"
                        value={shopConfig.address}
                        onChange={(e) => setShopConfig({ ...shopConfig, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">City, State & Pincode:</label>
                      <input
                        type="text"
                        value={shopConfig.cityState}
                        onChange={(e) => setShopConfig({ ...shopConfig, cityState: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">WhatsApp Number (with country code):</label>
                      <input
                        type="text"
                        value={shopConfig.whatsappNumber}
                        onChange={(e) => setShopConfig({ ...shopConfig, whatsappNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Display Calling Numbers:</label>
                      <input
                        type="text"
                        value={shopConfig.displayPhone}
                        onChange={(e) => setShopConfig({ ...shopConfig, displayPhone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Official Email:</label>
                      <input
                        type="email"
                        value={shopConfig.email}
                        onChange={(e) => setShopConfig({ ...shopConfig, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0]"
                      />
                    </div>
                  </div>

                  {/* MASTER PIN RESET */}
                  <div className="p-4 bg-[#EFE5D8] rounded-xl border border-[#DECFC0] mt-6">
                    <span className="block font-bold text-neutral-900 mb-1">Change Security PIN:</span>
                    <div className="flex gap-2 max-w-sm">
                      <input
                        type="password"
                        value={newPinValue}
                        onChange={(e) => setNewPinValue(e.target.value)}
                        placeholder="Enter new 4-digit PIN"
                        className="px-3 py-2 rounded-xl bg-white border border-[#DECFC0] text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleChangePin}
                        className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs cursor-pointer"
                      >
                        Update PIN
                      </button>
                    </div>
                    {pinUpdateSuccess && (
                      <p className="text-[11px] font-bold text-emerald-800 mt-1">{pinUpdateSuccess}</p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
