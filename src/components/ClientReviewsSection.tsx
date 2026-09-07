import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Award, Clock, Printer, CheckCircle2 } from 'lucide-react';
import { ShopConfig } from '../types';

interface ClientReviewsSectionProps {
  config: ShopConfig;
  onOpenSampleKit: () => void;
  onOpenSpecs: () => void;
}

const REVIEWS = [
  {
    name: 'Dr. Rajesh Mehta',
    role: 'Senior Consultant Cardiologist',
    org: 'Metro Heart Care Clinic',
    materialUsed: '450 GSM Velvet Matte Luxe',
    stars: 5,
    date: 'Verified Order • 1,000 Cards',
    quote:
      'The soft-touch velvet feel of the 450 GSM card gives an immediate impression of trust and precision. Niraj bhai shared soft proofs on WhatsApp and dispatched the package right on time.',
  },
  {
    name: 'Ar. Sneha Kulkarni',
    role: 'Principal Architect',
    org: 'Studio Kulkarni Architects',
    materialUsed: '350 GSM Royal Textured Linen',
    stars: 5,
    date: 'Verified Order • 500 Cards',
    quote:
      'As architects, tactile paper texture matters immensely to us. The natural cross-weave linen board has crisp typography and zero ink bleed. Exactly what our architectural brand needed.',
  },
  {
    name: 'Vikram Singhal',
    role: 'Managing Director',
    org: 'Singhal Infra & Real Estate',
    materialUsed: '600 GSM Cotton with Gold Foil',
    stars: 5,
    date: 'Verified Order • 2,000 Cards',
    quote:
      'We ordered the heavyweight 600 GSM cotton cards with metallic gold foil stamping for our top management. Client reactions during boardroom introductions have been extraordinary.',
  },
  {
    name: 'Rohit & Priya Varma',
    role: 'Founders & Creative Directors',
    org: 'Aurum Handcrafted Jewelry',
    materialUsed: '350 Micron Frosted Waterproof PVC',
    stars: 5,
    date: 'Verified Order • 1,000 Cards',
    quote:
      'The frosted transparent PVC cards look sensational for our jewelry boutique. They are 100% waterproof, tear-resistant, and customers never throw them away.',
  },
];

export const ClientReviewsSection: React.FC<ClientReviewsSectionProps> = ({
  config,
  onOpenSampleKit,
  onOpenSpecs,
}) => {
  return (
    <section className="bg-white py-16 border-t border-[#DECFC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quality Guarantees 4-Column Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-5 rounded-3xl bg-[#FAF7F2] border border-[#DECFC0]"
        >
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#F4ECE3] border border-[#DECFC0] flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5 text-neutral-900" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-neutral-900">Heidelberg Offset</h5>
              <p className="text-[11px] text-neutral-600">300 DPI razor-sharp print clarity</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#F4ECE3] border border-[#DECFC0] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-neutral-900" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-neutral-900">24–48 Hr Dispatch</h5>
              <p className="text-[11px] text-neutral-600">Fast express delivery network</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#F4ECE3] border border-[#DECFC0] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-neutral-900" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-neutral-900">Certified Paper GSM</h5>
              <p className="text-[11px] text-neutral-600">100% authentic board weights</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-[#F4ECE3] border border-[#DECFC0] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-neutral-900" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-neutral-900">Free Reprint Warranty</h5>
              <p className="text-[11px] text-neutral-600">Guaranteed quality assurance</p>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] text-neutral-900 border border-[#DECFC0] mb-2">
            <Award className="w-3.5 h-3.5 text-neutral-900" /> Verified Commercial Client Feedback
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-neutral-900 tracking-tight">
            Trusted by Professionals & Studios
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 mt-2">
            Read how doctors, architects, and corporate founders rely on <strong>{config.shopName}</strong> for high-impact first impressions.
          </p>
        </motion.div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#DECFC0] flex flex-col justify-between hover:border-[#CDBAA5] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-500">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed italic mb-4">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#DECFC0] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">{rev.name}</h4>
                  <p className="text-[11px] text-neutral-600">
                    {rev.role} • {rev.org}
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-[#F4ECE3] text-neutral-800 border border-[#DECFC0]">
                  {rev.materialUsed}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Banner for Sample Box & Pre-Press Specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#F4ECE3] border border-[#DECFC0] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold font-['Playfair_Display',serif] text-neutral-900">
              Not sure which paper weight fits your brand?
            </h4>
            <p className="text-xs text-neutral-700 max-w-xl">
              Order our physical Paper Swatch Box to feel all 6 board materials in your hands, or inspect the pre-press bleed guidelines before designing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center">
            <button
              onClick={onOpenSampleKit}
              className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Order Sample Swatch Box ({config.currency}199)
            </button>
            <button
              onClick={onOpenSpecs}
              className="px-5 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-neutral-900 font-bold text-xs border border-[#DECFC0] transition-colors"
            >
              View Bleed & Size Specs
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
