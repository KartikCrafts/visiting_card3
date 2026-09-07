export interface VisitingCardItem {
  id: string;
  name: string;
  material: string;
  category: 'Matte & Velvet' | 'Textured Paper' | 'Eco Kraft' | 'Waterproof PVC' | 'Metallic & Foil' | 'Heavyweight Cotton';
  gsm: string;
  thickness: string;
  finish: string;
  khasiyat: string[];
  bestFor: string;
  price100: number;
  price500: number;
  price1000: number;
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
  customNotes?: string;
}
