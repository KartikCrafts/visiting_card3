import { VisitingCardItem, ShopConfig } from '../types';

export const DEFAULT_SHOP_CONFIG: ShopConfig = {
  shopName: 'Haya Graphics',
  tagline: 'Premium Business Cards & Exclusive Paper Materials',
  ownerName: 'Niraj Vora',
  whatsappNumber: '917383855862',
  displayPhone: '+91 73838 55862',
  email: 'nirajvora18@gmail.com',
  address: 'Shop No. 14, Commercial Plaza, MG Road',
  cityState: 'Mumbai, Maharashtra - 400001',
  currency: '₹',
  workingHours: 'Mon - Sat: 10:00 AM - 8:30 PM',
  logoUrl: 'https://cdn.phototourl.com/free/2026-09-05-47f48cc1-83b5-4418-88e7-41e03a644791.jpg',
};

export const INITIAL_CARDS: VisitingCardItem[] = [
  {
    id: 'velvet-matte-450',
    name: 'Velvet Soft-Touch Luxe',
    material: '450 GSM Heavyweight Imported Art Board with Peach-Skin Velvet Film',
    category: 'Matte & Velvet',
    gsm: '450 GSM',
    thickness: '0.52 mm (Rigid & Bend-Proof)',
    finish: 'Ultra Velvet Matte, Non-Reflective, Silk Touch',
    khasiyat: [
      'Velvety peach-skin soft-touch texture that feels distinctly luxurious to the touch',
      'Zero fingerprint smudges with a scratch-resistant protective coating',
      'Heavy rigid board structure that does not bend or crease easily',
      'Double-sided high-definition 2400 DPI rich color reproduction',
      'Ideal base foundation for Gold Foil or Gloss Spot UV highlights'
    ],
    bestFor: 'Corporate CEOs, Physicians, Real Estate Developers, Premium Consultants',
    price100: 480,
    price500: 1450,
    price1000: 2450,
    badge: 'Best Seller',
    inStock: true,
    deliveryDays: '2 - 3 Days',
    visualTheme: {
      cardBg: '#1e242b',
      cardTextColor: '#f3ede2',
      accentColor: '#d4af37',
      textureStyle: 'velvet-subtle'
    }
  },
  {
    id: 'royal-textured-linen-350',
    name: 'Royal Textured Linen',
    material: '350 GSM Italian Woven Texture Paper (Pure Cellulose Fiber)',
    category: 'Textured Paper',
    gsm: '350 GSM',
    thickness: '0.45 mm (Crisp Paper Texture)',
    finish: 'Cross-Hatch Woven Linen Texture, Natural Matte',
    khasiyat: [
      'Authentic cloth-like cross-woven linen grain providing an aristocratic legacy feel',
      'Uncoated natural paper surface suitable for signatures or handwritten notes',
      'Warm natural off-white tone that enhances typographic elegance',
      'Crafted from sustainable, eco-certified European wood pulp',
      'Perfect choice for clean, minimalist, and sophisticated typography'
    ],
    bestFor: 'Attorneys, Chartered Accountants, Architects, Interior Designers, Heritage Brands',
    price100: 420,
    price500: 1250,
    price1000: 2150,
    badge: 'Royal Classic',
    inStock: true,
    deliveryDays: '2 - 3 Days',
    visualTheme: {
      cardBg: '#f6f3eb',
      cardTextColor: '#1c1b18',
      accentColor: '#7a6042',
      textureStyle: 'linen-texture'
    }
  },
  {
    id: 'eco-natural-kraft-400',
    name: 'Eco-Friendly Earth Kraft',
    material: '400 GSM 100% Recycled Unbleached Virgin Kraft Paperboard',
    category: 'Eco Kraft',
    gsm: '400 GSM',
    thickness: '0.50 mm (Heavy Stiff Kraft)',
    finish: 'Raw Organic Earthy Texture, Matte Kraft',
    khasiyat: [
      '100% Recycled and biodegradable organic earthy brown shade',
      'Natural unbleached wood grain textures visible on each unique card',
      'Exceptional high-contrast visual appeal with black ink or opaque white foil',
      'Heavy-duty stiffness, highly durable and environmentally conscious',
      'Instantly portrays an authentic, sustainable, and eco-friendly brand identity'
    ],
    bestFor: 'Organic Cafes, Sustainable Brands, Artisan Photographers, Concept Boutiques',
    price100: 380,
    price500: 1100,
    price1000: 1950,
    badge: 'Eco Choice',
    inStock: true,
    deliveryDays: '1 - 2 Days',
    visualTheme: {
      cardBg: '#c9a87d',
      cardTextColor: '#2b1e13',
      accentColor: '#422817',
      textureStyle: 'kraft-fibers'
    }
  },
  {
    id: 'clear-frosted-pvc-waterproof',
    name: 'Frosted Translucent Waterproof PVC',
    material: '350 Micron Solid Virgin Polyvinyl (PVC Plastic)',
    category: 'Waterproof PVC',
    gsm: '350 Micron (~400 GSM equivalent)',
    thickness: '0.40 mm Flexible Waterproof Plastic',
    finish: 'Frosted Matte (Semi-Transparent) / Ultra-Clear Gloss',
    khasiyat: [
      '100% Waterproof and washable — impervious to moisture, sweat, and spills',
      'Completely tear-proof — cannot be torn by hand',
      'Futuristic semi-transparent frosted finish that softly diffuses light',
      'Precision rounded corners standard for pocket safety and sleek presentation',
      'Lasts for years without discoloration, with 5x longer durability than paper'
    ],
    bestFor: 'Tech Founders, Software Companies, Fitness Centers, Clubs, Modern Startups',
    price100: 650,
    price500: 1950,
    price1000: 3200,
    badge: '100% Waterproof',
    inStock: true,
    deliveryDays: '3 - 4 Days',
    visualTheme: {
      cardBg: '#d7e2e8',
      cardTextColor: '#10222e',
      accentColor: '#0284c7',
      textureStyle: 'frosted-glass'
    }
  },
  {
    id: 'gold-embossed-cotton-600',
    name: 'Embossed Gold Foil Cotton Rag',
    material: '600 GSM Extra-Thick 100% Cotton Rag Pulp Board',
    category: 'Metallic & Foil',
    gsm: '600 GSM (Double-Thick Sandwich)',
    thickness: '0.80 mm (Credit Card Rigidity)',
    finish: 'Deep Letterpress Emboss with Hot Stamped Foil (Gold/Rose Gold)',
    khasiyat: [
      'Extraordinary 600 GSM weight with credit-card grade solid thickness',
      'Genuine hot-stamped metallic foil that brilliantly reflects light',
      'Deep tactile 3D deboss/emboss relief that you can physically feel with fingertips',
      'Pure 100% cotton rag pulp providing unmatched softness and prestige',
      'Commands immediate attention and sets a high-end benchmark on first impression'
    ],
    bestFor: 'Jewelry Brands, Luxury Fashion Designers, Exotic Auto Dealers, Managing Directors',
    price100: 950,
    price500: 2900,
    price1000: 4900,
    badge: 'Ultra Luxury',
    inStock: true,
    deliveryDays: '4 - 5 Days',
    visualTheme: {
      cardBg: '#171513',
      cardTextColor: '#e5d9c5',
      accentColor: '#f59e0b',
      textureStyle: 'cotton-press'
    }
  },
  {
    id: 'metallic-pearl-shimmer-350',
    name: 'Metallic Pearl Shimmer',
    material: '350 GSM Iridescent Metallic Mica Coated Cardstock',
    category: 'Metallic & Foil',
    gsm: '350 GSM',
    thickness: '0.44 mm',
    finish: 'Double Sided Pearlescent Luster, Subtle Glitter Sheen',
    khasiyat: [
      'Gleaming pearlescent mica shimmer that glows elegantly under ambient lighting',
      'Creates a rich, decorative aesthetic even without additional foil stamping',
      'Silky smooth surface with exceptional ink brightness and vibrant colors',
      'Extremely popular in luxury events, bridal, and creative industries',
      'High-end visual charm delivered at an accessible price point'
    ],
    bestFor: 'Bridal Salons, Event Curators, Makeup Artists, Luxury Gift Boutiques',
    price100: 460,
    price500: 1350,
    price1000: 2300,
    badge: 'Glitter Shimmer',
    inStock: true,
    deliveryDays: '2 - 3 Days',
    visualTheme: {
      cardBg: '#ece6df',
      cardTextColor: '#26211c',
      accentColor: '#b45309',
      textureStyle: 'pearl-luster'
    }
  }
];
