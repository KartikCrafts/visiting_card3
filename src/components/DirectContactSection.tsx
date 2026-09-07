import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Phone, MapPin, Mail, Clock, Send, Sparkles, CheckCircle } from 'lucide-react';
import { ShopConfig, VisitingCardItem } from '../types';

interface DirectContactProps {
  config: ShopConfig;
  cards: VisitingCardItem[];
}

export const DirectContactSection: React.FC<DirectContactProps> = ({ config, cards }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(cards[0]?.name || 'Velvet Soft-Touch Luxe');
  const [quantity, setQuantity] = useState('500');
  const [customRequirement, setCustomRequirement] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderText = `*Business Card Printing Inquiry:*
• Customer Name: ${customerName || 'Customer'}
• Phone: ${phone || 'N/A'}
• Selected Material: ${selectedMaterial}
• Quantity: ${quantity} Cards
• Notes / Artwork: ${customRequirement || 'I would like to see sample options and get a quotation.'}

Hello ${config.ownerName} (${config.shopName}), please confirm the quote and sample preview!`;

    const whatsappUrl = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
      orderText
    )}`;

    setIsSent(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSent(false);
    }, 400);
  };

  const directWhatsapp = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${config.ownerName} (${config.shopName})! I have a business card printing inquiry. Please assist me!`
  )}`;

  return (
    <section id="direct-contact-section" className="py-14 sm:py-16 bg-white border-t border-[#EAE0D3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with repeat scroll in/out animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F5EFE7] text-neutral-900 border border-[#DECFC0] mb-2">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" /> Direct Customer Support
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 font-['Playfair_Display',serif]">
            Get In Touch Directly
          </h2>
          <p className="text-xs sm:text-base text-neutral-700 mt-2">
            Connect with us directly on WhatsApp or call to finalize your design, request physical paper samples, or place bulk orders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Direct Action Light Brown Boxes */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Box 1: WhatsApp Priority Box */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl bg-[#F6EFE6] border border-[#DECFC0] p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(44,38,33,0.05)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs shrink-0">
                  <MessageCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Instant WhatsApp Chat</h3>
                  <p className="text-xs text-neutral-600">Quick response within 5 minutes</p>
                </div>
              </div>
              <p className="text-xs text-neutral-800 mb-4 leading-relaxed">
                Send your logo, typography, or existing card photo on WhatsApp. We will promptly share live digital mockups and material recommendations.
              </p>
              <a
                id="contact-whatsapp-btn-main"
                href={directWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Start WhatsApp Chat</span>
              </a>
            </motion.div>

            {/* Box 2: Direct Phone Call */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl bg-[#F6EFE6] border border-[#DECFC0] p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(44,38,33,0.05)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#DECFC0] flex items-center justify-center text-neutral-900 shrink-0">
                    <Phone className="w-4 h-4 text-neutral-800" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-600 block">Direct Call Support</span>
                    <span className="text-sm sm:text-base font-bold text-neutral-900">{config.displayPhone}</span>
                  </div>
                </div>
                <a
                  id="contact-call-direct-btn"
                  href={`tel:${config.displayPhone}`}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] text-neutral-900 text-xs font-bold border border-[#DECFC0] transition-colors"
                >
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* Box 3: Address & Shop Timing */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="rounded-2xl bg-[#FAF7F2] border border-[#E5D9CC] p-5 sm:p-6 text-xs text-neutral-800 space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block">Workshop & Printing Unit:</span>
                  <p>{config.address}</p>
                  <p className="text-neutral-600">{config.cityState}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2.5 border-t border-[#E5D9CC]/70">
                <Clock className="w-4 h-4 text-neutral-900 shrink-0" />
                <div>
                  <span className="font-bold text-neutral-900">Working Hours:</span>
                  <span className="ml-1.5 text-neutral-700">{config.workingHours}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2.5 border-t border-[#E5D9CC]/70">
                <Mail className="w-4 h-4 text-neutral-900 shrink-0" />
                <div>
                  <span className="font-bold text-neutral-900">Email:</span>
                  <span className="ml-1.5 text-neutral-700">{config.email}</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Direct Quick Inquiry Form (Light Brown Card) */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 rounded-3xl bg-[#F6EFE6] border border-[#DECFC0] p-6 sm:p-9 shadow-[0_4px_20px_-4px_rgba(44,38,33,0.05)]"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-[#EADBCC] text-neutral-900 text-xs font-bold border border-[#CDBAA5]">
                  1-Click Direct Connect
                </span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 font-['Playfair_Display',serif]">
                Direct Business Card Inquiry Form
              </h3>
              <p className="text-xs text-neutral-700 mt-1">
                Filling this form opens a pre-formatted WhatsApp quote request directly on your phone.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    id="inquiry-customer-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    WhatsApp Mobile Number
                  </label>
                  <input
                    id="inquiry-customer-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 73838 55862"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Selected Card Material
                  </label>
                  <select
                    id="inquiry-card-material"
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 text-xs font-bold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    {cards.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.gsm})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Required Quantity (Cards)
                  </label>
                  <select
                    id="inquiry-card-quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 text-xs font-bold focus:ring-2 focus:ring-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="100">100 Cards (Trial Pack)</option>
                    <option value="500">500 Cards (Most Popular Value)</option>
                    <option value="1000">1000 Cards (Wholesale Best Rate)</option>
                    <option value="2000+">2000+ Cards (Corporate Bulk)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                  Design or Custom Notes (Optional)
                </label>
                <textarea
                  id="inquiry-custom-notes"
                  rows={3}
                  value={customRequirement}
                  onChange={(e) => setCustomRequirement(e.target.value)}
                  placeholder="e.g. I have print-ready PDF files / I need custom logo and layout design..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DECFC0] text-neutral-900 text-xs font-medium focus:ring-2 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <motion.button
                id="submit-inquiry-whatsapp-btn"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
              >
                {isSent ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-emerald-400" />
                    <span>Send Directly via WhatsApp</span>
                  </>
                )}
              </motion.button>

              <p className="text-center text-[11px] text-neutral-600 font-medium">
                🔒 Direct encrypted chat. Instant factory quote guaranteed.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
