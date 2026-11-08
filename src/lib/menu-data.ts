export const MENU_CATEGORIES = [
  "Non-Veg Biryani",
  "Veg Biryani",
  "Non-Veg Starters",
  "Regular Milkshakes",
  "Double Milkshakes",
  "Combos",
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number | null;
  posterPrice?: string;
  specialOffer?: string;
  photoPath?: string;
  photoDataUrl?: string | null;
  isVeg: boolean;
  isAvailable: boolean;
  isPublished: boolean;
};

export const MENU_STORAGE_KEY = "parichayam-menu-v2";
export const MENU_INITIALIZED_KEY = "parichayam-menu-initialized-v5";
