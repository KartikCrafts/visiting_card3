import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Sliders,
  Phone,
  MessageCircle,
  FileText,
  DollarSign,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  Key,
  ShieldCheck
} from 'lucide-react';
import { VisitingCardItem, ShopConfig } from '../types';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: VisitingCardItem[];
  config: ShopConfig;
  onSaveCards: (cards: VisitingCardItem[]) => void;
  onSaveConfig: (config: ShopConfig) => void;
  onResetDefaults: () => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  cards,
  config,
  onSaveCards,
  onSaveConfig,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  // Master Security PIN Gate
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

  const [activeTab, setActiveTab] = useState<'cards' | 'add' | 'contact'>('cards');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  
  // Local state for editing cards
  const [cardList, setCardList] = useState<VisitingCardItem[]>(cards);
  // Local state for editing shop config
  const [shopConfig, setShopConfig] = useState<ShopConfig>(config);
  // Status message
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

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

  // New card template
  const [newCard, setNewCard] = useState<Omit<VisitingCardItem, 'id'>>({
    name: '',
    material: '',
    category: 'Matte & Velvet',
    gsm: '400 GSM',
    thickness: '0.45 mm',
    finish: 'Matte Smooth',
    khasiyat: ['Premium look & durability', 'Zero smudges', 'High color saturation'],
    bestFor: 'Professionals & Corporate Executives',
    price100: 400,
    price500: 1200,
    price1000: 2000,
    badge: 'New Arrival',
    inStock: true,
    deliveryDays: '2 - 3 Days',
    visualTheme: {
      cardBg: '#1f2937',
      cardTextColor: '#f9fafb',
      accentColor: '#e5e7eb',
      textureStyle: 'matte',
    },
  });

  const showNotification = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Card list editing helpers
  const handleUpdateCardField = (id: string, field: keyof VisitingCardItem, value: any) => {
    setCardList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleUpdateKhasiyat = (id: string, index: number, value: string) => {
    setCardList((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const newKhasiyat = [...c.khasiyat];
        newKhasiyat[index] = value;
        return { ...c, khasiyat: newKhasiyat };
      })
    );
  };

  const handleAddKhasiyatPoint = (id: string) => {
    setCardList((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return { ...c, khasiyat: [...c.khasiyat, 'New feature bullet point'] };
      })
    );
  };

  const handleRemoveKhasiyatPoint = (id: string, index: number) => {
    setCardList((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return { ...c, khasiyat: c.khasiyat.filter((_, i) => i !== index) };
      })
    );
  };

  const handleDeleteCard = (id: string) => {
    if (window.confirm('Are you sure you want to delete this card material?')) {
      const updated = cardList.filter((c) => c.id !== id);
      setCardList(updated);
      onSaveCards(updated);
      showNotification('Card material deleted successfully!');
    }
  };

  const handleSaveAllCards = () => {
    onSaveCards(cardList);
    showNotification('All card materials and prices saved successfully!');
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(shopConfig);
    showNotification('WhatsApp and contact details updated successfully!');
  };

  const handleCreateNewCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.name || !newCard.material) {
      alert('Please enter card name and material details!');
      return;
    }
    const created: VisitingCardItem = {
      ...newCard,
      id: `custom-card-${Date.now()}`,
    };
    const updated = [created, ...cardList];
    setCardList(updated);
    onSaveCards(updated);
    setActiveTab('cards');
    showNotification(`New card material "${newCard.name}" added successfully!`);
    // reset
    setNewCard({
      name: '',
      material: '',
      category: 'Matte & Velvet',
      gsm: '400 GSM',
      thickness: '0.45 mm',
      finish: 'Matte Smooth',
      khasiyat: ['Premium look & durability'],
      bestFor: 'Professionals',
      price100: 400,
      price500: 1200,
      price1000: 2000,
      badge: 'New Arrival',
      inStock: true,
      deliveryDays: '2 - 3 Days',
      visualTheme: {
        cardBg: '#1f2937',
        cardTextColor: '#f9fafb',
        accentColor: '#e5e7eb',
        textureStyle: 'matte',
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl bg-[#FAF7F2] border border-[#DECFC0] shadow-2xl p-6 sm:p-8 text-neutral-900 text-center relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F4ECE3] border border-[#DECFC0] flex items-center justify-center text-neutral-900 mb-4 shadow-xs">
            <Lock className="w-6 h-6 text-neutral-900" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 bg-[#EADBCC] px-3 py-1 rounded-full border border-[#CDBAA5]">
            Proprietor Access Gate
          </span>

          <h3 className="text-2xl font-bold font-['Playfair_Display',serif] text-neutral-900 mt-3">
            Management Login
          </h3>

          <p className="text-xs text-neutral-600 mt-1 mb-6 leading-relaxed">
            Enter your 4-digit Master PIN to modify paper card stocks, package volume rates, and WhatsApp order routing.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                autoFocus
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setPinError('');
                }}
                placeholder="••••"
                className="w-full text-center tracking-[0.6em] font-mono text-2xl py-3 px-4 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
              />
              {pinError && (
                <p className="text-xs text-red-600 font-bold mt-2">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Unlock Admin Portal</span>
            </button>

            <div className="pt-3 flex items-center justify-between text-[11px] text-neutral-500 border-t border-[#DECFC0]">
              <span>Master Default PIN: <strong>1234</strong></span>
              <button
                type="button"
                onClick={onClose}
                className="underline text-neutral-700 hover:text-neutral-900"
              >
                Close Window
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      {/* Light brown themed main dashboard container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-5xl rounded-3xl bg-[#F6EFE6] border border-[#DECFC0] shadow-2xl overflow-hidden my-6 text-neutral-900 flex flex-col max-h-[92vh]"
      >
        {/* Dashboard Top Header (Light brown bar) */}
        <div className="px-6 py-5 bg-[#EFE5D8] border-b border-[#DECFC0] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-['Playfair_Display',serif] text-neutral-900">
                  Business Card Admin Dashboard
                </h2>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Unlocked
                </span>
              </div>
              <p className="text-xs text-neutral-700">
                Manage materials, specifications, pricing, and WhatsApp contact settings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-800 bg-[#E8DDD0] hover:bg-[#DDD0BF] border border-[#CDBAA5] transition-colors"
              title="Lock admin session"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Portal</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all to original demo cards and details?')) {
                  onResetDefaults();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-800 bg-[#E8DDD0] hover:bg-[#DDD0BF] border border-[#CDBAA5] transition-colors"
              title="Reset default data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#E8DDD0] hover:bg-[#DDD0BF] text-neutral-900 border border-[#CDBAA5] transition-colors"
              title="Close Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status alert if any */}
        {statusMsg && (
          <div className="bg-emerald-800 text-white text-xs font-bold px-6 py-2.5 flex items-center gap-2 transition-all">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Navigation Tabs (Light brown themed) */}
        <div className="px-6 pt-3 bg-[#EFE5D8] border-b border-[#DECFC0] flex gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('cards')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'cards'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            📇 Cards & Pricing ({cardList.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'add'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            ➕ Add New Material
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'contact'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            📱 WhatsApp & Shop Info
          </button>
        </div>

        {/* Dashboard Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-[#F6EFE6]">
          
          {/* TAB 1: EDIT EXISTING CARDS */}
          {activeTab === 'cards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  All Business Card Materials:
                </span>
                <button
                  onClick={handleSaveAllCards}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes Live</span>
                </button>
              </div>

              <div className="space-y-4">
                {cardList.map((card) => {
                  const isExpanded = editingCardId === card.id;

                  return (
                    <div
                      key={card.id}
                      className="rounded-2xl bg-[#FAF7F2] border border-[#DECFC0] p-5 shadow-xs transition-all"
                    >
                      {/* Card Summary Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE0D3]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-neutral-900 font-['Playfair_Display',serif]">
                              {card.name}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EADBCC] text-neutral-800 border border-[#CDBAA5]">
                              {card.gsm}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 truncate max-w-md">
                            {card.material}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right text-xs">
                            <span className="font-bold text-neutral-900 block">
                              100: ₹{card.price100} | 500: ₹{card.price500} | 1000: ₹{card.price1000}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() =>
                                setEditingCardId(isExpanded ? null : card.id)
                              }
                              className="px-3 py-1.5 rounded-lg bg-[#EFE5D8] hover:bg-[#EADBCC] text-neutral-900 font-bold text-xs border border-[#DECFC0]"
                            >
                              {isExpanded ? 'Done' : 'Edit'}
                            </button>
                            <button
                              onClick={() => handleDeleteCard(card.id)}
                              className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
                              title="Delete Card"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Edit Form */}
                      {isExpanded && (
                        <div className="pt-4 space-y-4 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block font-bold text-neutral-800 mb-1">
                                Card Name:
                              </label>
                              <input
                                type="text"
                                value={card.name}
                                onChange={(e) =>
                                  handleUpdateCardField(card.id, 'name', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block font-bold text-neutral-800 mb-1">
                                Board & Material Specifications:
                              </label>
                              <input
                                type="text"
                                value={card.material}
                                onChange={(e) =>
                                  handleUpdateCardField(card.id, 'material', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="block font-bold text-neutral-800 mb-1">
                                GSM (Weight):
                              </label>
                              <input
                                type="text"
                                value={card.gsm}
                                onChange={(e) =>
                                  handleUpdateCardField(card.id, 'gsm', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-neutral-800 mb-1">
                                Thickness:
                              </label>
                              <input
                                type="text"
                                value={card.thickness}
                                onChange={(e) =>
                                  handleUpdateCardField(card.id, 'thickness', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-neutral-800 mb-1">
                                Finish Type:
                              </label>
                              <input
                                type="text"
                                value={card.finish}
                                onChange={(e) =>
                                  handleUpdateCardField(card.id, 'finish', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-neutral-800 mb-1">
                                Badge:
                              </label>
                              <input
                                type="text"
                                value={card.badge || ''}
                                onChange={(e) =>
                                  handleUpdateCardField(card.id, 'badge', e.target.value)
                                }
                                placeholder="e.g. Best Seller"
                                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                              />
                            </div>
                          </div>

                          {/* Prices */}
                          <div className="p-3 bg-[#F6EFE6] rounded-xl border border-[#DECFC0]">
                            <span className="block font-bold text-neutral-900 mb-2">
                              Update Pricing (₹):
                            </span>
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] text-neutral-600 mb-1">
                                  100 Cards Price:
                                </label>
                                <input
                                  type="number"
                                  value={card.price100}
                                  onChange={(e) =>
                                    handleUpdateCardField(
                                      card.id,
                                      'price100',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#DECFC0] font-bold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-neutral-600 mb-1">
                                  500 Cards Price:
                                </label>
                                <input
                                  type="number"
                                  value={card.price500}
                                  onChange={(e) =>
                                    handleUpdateCardField(
                                      card.id,
                                      'price500',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#DECFC0] font-bold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-neutral-600 mb-1">
                                  1000 Cards Price:
                                </label>
                                <input
                                  type="number"
                                  value={card.price1000}
                                  onChange={(e) =>
                                    handleUpdateCardField(
                                      card.id,
                                      'price1000',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#DECFC0] font-bold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Khasiyat List Editing */}
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="font-bold text-neutral-800">
                                Key Highlights & Features (Bullet Points):
                              </label>
                              <button
                                onClick={() => handleAddKhasiyatPoint(card.id)}
                                className="text-[11px] font-bold text-neutral-900 underline"
                              >
                                + Add Feature
                              </button>
                            </div>
                            <div className="space-y-1.5">
                              {card.khasiyat.map((k, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={k}
                                    onChange={(e) =>
                                      handleUpdateKhasiyat(card.id, idx, e.target.value)
                                    }
                                    className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                                  />
                                  <button
                                    onClick={() => handleRemoveKhasiyatPoint(card.id, idx)}
                                    className="text-red-700 hover:text-red-900 p-1"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end pt-2">
                            <button
                              onClick={() => {
                                handleSaveAllCards();
                                setEditingCardId(null);
                              }}
                              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors"
                            >
                              Done Editing This Card
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW CARD MATERIAL */}
          {activeTab === 'add' && (
            <form
              onSubmit={handleCreateNewCard}
              className="rounded-2xl bg-[#FAF7F2] border border-[#DECFC0] p-6 space-y-4 text-xs"
            >
              <div>
                <h3 className="text-lg font-bold font-['Playfair_Display',serif] text-neutral-900">
                  Add New Card Material
                </h3>
                <p className="text-neutral-600">
                  Enter board specifications, distinctive features, and transparent volume rates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Card Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCard.name}
                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                    placeholder="e.g. Matte Laminated Board"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Category
                  </label>
                  <select
                    value={newCard.category}
                    onChange={(e) => setNewCard({ ...newCard, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] font-bold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Matte & Velvet">Matte & Velvet</option>
                    <option value="Textured Paper">Textured Paper</option>
                    <option value="Eco Kraft">Eco Kraft</option>
                    <option value="Waterproof PVC">Waterproof PVC</option>
                    <option value="Metallic & Foil">Metallic & Foil</option>
                    <option value="Heavyweight Cotton">Heavyweight Cotton</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-800 mb-1">
                  Material & Paper Specifications *
                </label>
                <input
                  type="text"
                  required
                  value={newCard.material}
                  onChange={(e) => setNewCard({ ...newCard, material: e.target.value })}
                  placeholder="e.g. 400 GSM Imported Swedish White Board with Thermal Matte lamination"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Weight (GSM)
                  </label>
                  <input
                    type="text"
                    value={newCard.gsm}
                    onChange={(e) => setNewCard({ ...newCard, gsm: e.target.value })}
                    placeholder="e.g. 400 GSM"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Thickness
                  </label>
                  <input
                    type="text"
                    value={newCard.thickness}
                    onChange={(e) => setNewCard({ ...newCard, thickness: e.target.value })}
                    placeholder="e.g. 0.48 mm"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Finish
                  </label>
                  <input
                    type="text"
                    value={newCard.finish}
                    onChange={(e) => setNewCard({ ...newCard, finish: e.target.value })}
                    placeholder="e.g. Soft Matte / Gloss"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Pricing Grid */}
              <div className="p-4 bg-[#F6EFE6] rounded-xl border border-[#DECFC0]">
                <label className="block font-bold text-neutral-900 mb-2">
                  Price Details (₹):
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-600 mb-1">
                      100 Cards Price
                    </label>
                    <input
                      type="number"
                      required
                      value={newCard.price100}
                      onChange={(e) =>
                        setNewCard({ ...newCard, price100: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#DECFC0] font-bold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-600 mb-1">
                      500 Cards Price
                    </label>
                    <input
                      type="number"
                      required
                      value={newCard.price500}
                      onChange={(e) =>
                        setNewCard({ ...newCard, price500: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#DECFC0] font-bold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-600 mb-1">
                      1000 Cards Price
                    </label>
                    <input
                      type="number"
                      required
                      value={newCard.price1000}
                      onChange={(e) =>
                        setNewCard({ ...newCard, price1000: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#DECFC0] font-bold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-800 mb-1">
                  Card Highlights (Features - comma separated)
                </label>
                <textarea
                  rows={2}
                  value={newCard.khasiyat.join(', ')}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      khasiyat: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Velvet touch, Zero fingerprint smudges, Stiff board"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Card Material</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: WHATSAPP & CONTACT SETTINGS */}
          {activeTab === 'contact' && (
            <form
              onSubmit={handleSaveConfig}
              className="rounded-2xl bg-[#FAF7F2] border border-[#DECFC0] p-6 space-y-4 text-xs"
            >
              <div>
                <h3 className="text-lg font-bold font-['Playfair_Display',serif] text-neutral-900">
                  Update WhatsApp & Business Details
                </h3>
                <p className="text-neutral-600">
                  Enter your verified WhatsApp number and business information so customers can reach you directly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    WhatsApp Number (With Country Code, e.g. 917383855862) *
                  </label>
                  <input
                    type="text"
                    required
                    value={shopConfig.whatsappNumber}
                    onChange={(e) =>
                      setShopConfig({ ...shopConfig, whatsappNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] font-bold text-sm focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-neutral-600">
                    All website WhatsApp order buttons open directly to this number.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Calling Phone Display Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={shopConfig.displayPhone}
                    onChange={(e) =>
                      setShopConfig({ ...shopConfig, displayPhone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] font-bold text-sm focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Shop / Printing Press Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shopConfig.shopName}
                    onChange={(e) =>
                      setShopConfig({ ...shopConfig, shopName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] font-semibold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shopConfig.ownerName}
                    onChange={(e) =>
                      setShopConfig({ ...shopConfig, ownerName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] font-semibold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-800 mb-1">
                  Logo Image URL
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border border-[#DECFC0] p-0.5 overflow-hidden bg-white shrink-0 shadow-2xs">
                    <img
                      src={shopConfig.logoUrl || 'https://cdn.phototourl.com/free/2026-09-05-47f48cc1-83b5-4418-88e7-41e03a644791.jpg'}
                      alt="Logo preview"
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <input
                    type="url"
                    value={shopConfig.logoUrl || ''}
                    placeholder="https://cdn.phototourl.com/..."
                    onChange={(e) =>
                      setShopConfig({ ...shopConfig, logoUrl: e.target.value })
                    }
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden text-xs"
                  />
                </div>
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  This logo is displayed in the center of the navigation header and on visiting cards.
                </span>
              </div>

              <div>
                <label className="block font-bold text-neutral-800 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={shopConfig.tagline}
                  onChange={(e) =>
                    setShopConfig({ ...shopConfig, tagline: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Workshop Address
                  </label>
                  <input
                    type="text"
                    value={shopConfig.address}
                    onChange={(e) =>
                      setShopConfig({ ...shopConfig, address: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    City, State & Pincode
                  </label>
                  <input
                    type="text"
                    value={shopConfig.cityState}
                    onChange={(e) =>
                      setShopConfig({ ...shopConfig, cityState: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={shopConfig.email}
                    onChange={(e) =>
                      setShopConfig({ ...shopConfig, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={shopConfig.workingHours}
                    onChange={(e) =>
                      setShopConfig({ ...shopConfig, workingHours: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DECFC0] space-y-3">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-neutral-800" />
                  <label className="font-bold text-xs text-neutral-900 uppercase tracking-wider">
                    Master Security PIN (Proprietor Gate)
                  </label>
                </div>
                <p className="text-xs text-neutral-600">
                  Update the 4-digit PIN required to unlock this management dashboard. Current PIN: <strong>••••</strong>
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="password"
                    maxLength={6}
                    value={newPinValue}
                    onChange={(e) => setNewPinValue(e.target.value)}
                    placeholder="Enter New PIN (min 4 digits)"
                    className="w-full sm:w-60 px-3.5 py-2 rounded-xl bg-white border border-[#DECFC0] text-xs font-mono tracking-widest focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleChangePin}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    Save New PIN
                  </button>
                </div>
                {pinUpdateSuccess && (
                  <p className="text-xs font-bold text-emerald-700">{pinUpdateSuccess}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Contact Details Live</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Dashboard Footer */}
        <div className="px-6 py-3.5 bg-[#EFE5D8] border-t border-[#DECFC0] flex items-center justify-between text-xs text-neutral-700">
          <span>
            Changes are saved locally and immediately active on the live website.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-[#DECFC0] text-neutral-900 font-bold hover:bg-[#FAF7F2] transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};
