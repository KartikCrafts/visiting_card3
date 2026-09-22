export type ProductCategoryKey =
  | 'visiting-cards'
  | 'bill-books'
  | 'letter-pads'
  | 'stickers'
  | 'pamphlets'
  | 'standees'
  | 'one-way-vision'
  | 'envelopes';

export interface CategoryMetadata {
  key: ProductCategoryKey;
  label: string;
  gujaratiLabel: string;
  iconName: string;
  tagline: string;
  heroHeadline: string;
  heroDescription: string;
  sampleUnitName: string; // e.g., 'Cards', 'Books', 'Pads', 'Pieces', 'Flyers', 'Units', 'Sq. Ft.', 'Envelopes'
  defaultQty: number;
}

export interface QuantityTier {
  qty: number;
  label: string;
  price: number;
}

export interface ProductItem {
  id: string;
  categoryKey: ProductCategoryKey;
  name: string;
  material: string; // Material specification (Paper Board, NCR, Maplitho, etc.)
  finish: string; // Surface Look & Finish
  dimensions: string; // Dimensions (Height x Width / Trim Size)
  weightGsm: string; // Weight / GSM / Caliper Thickness
  categoryBadge?: string;
  khasiyat: string[]; // Key Features & Technical Specifications
  bestFor: string;
  qtyTiers: QuantityTier[];
  badge?: string;
  inStock: boolean;
  deliveryDays: string;
  imageUrl?: string; // High-resolution real product photography or proof
  colorType?: '1-colour' | '2-colour' | 'multi-colour';
  printColors?: string; // e.g. "Single Color Offset" or "Dual Color Offset"
  visualTheme: {
    cardBg: string;
    cardTextColor: string;
    accentColor: string;
    textureStyle: string;
  };
}

// Backward-compatible VisitingCardItem interface matching ProductItem
export interface VisitingCardItem {
  id: string;
  name: string;
  material: string;
  category: string;
  gsm: string;
  thickness: string;
  finish: string;
  dimensions?: string;
  khasiyat: string[];
  bestFor: string;
  price1000: number; // 100 cards removed!
  price2000: number;
  price3000: number;
  badge?: string;
  inStock: boolean;
  deliveryDays: string;
  visualTheme: {
    cardBg: string;
    cardTextColor: string;
    accentColor: string;
    textureStyle: string;
  };
}

export interface ShopConfig {
  shopName: string;
  tagline: string;
  ownerName: string;
  whatsappNumber: string;
  displayPhone: string;
  email: string;
  address: string;
  cityState: string;
  currency: string;
  workingHours: string;
  logoUrl?: string;
}

export interface InquiryFormData {
  customerName: string;
  phone: string;
  quantity: number;
  selectedCardId: string;
  selectedCardName: string;
  selectedCategoryName?: string;
  customNotes?: string;
}
