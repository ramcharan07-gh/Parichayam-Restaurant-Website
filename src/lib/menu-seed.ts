import { MENU_CATEGORIES, type MenuItem } from "@/lib/menu-data";

type MenuSeedItem = Pick<
  MenuItem,
  "id" | "name" | "category" | "posterPrice" | "specialOffer" | "photoPath" | "isVeg"
> & { defaultPrice: number };

const biryaniCategory = MENU_CATEGORIES[0]; // Non-Veg Biryani
const vegBiryaniCategory = MENU_CATEGORIES[1]; // Veg Biryani
const starterCategory = MENU_CATEGORIES[2]; // Non-Veg Starters
const milkshakeCategory = MENU_CATEGORIES[3]; // Regular Milkshakes
const doubleMilkshakeCategory = MENU_CATEGORIES[4]; // Double Milkshakes

const seedItems: MenuSeedItem[] = [
  // Non-Veg Biryani
  {
    id: "chicken-dum-biryani",
    name: "Chicken Dum Biryani",
    category: biryaniCategory,
    defaultPrice: 129,
    posterPrice: "₹129",
    specialOffer: "Free 250ml Coke + Water Bottle",
    photoPath: "/images/menu/chicken-dum-biryani.jpg",
    isVeg: false,
  },
  {
    id: "chicken-fry-piece-biryani",
    name: "Chicken Fry Piece Biryani",
    category: biryaniCategory,
    defaultPrice: 149,
    posterPrice: "₹149",
    specialOffer: "Free 250ml Coke + 1 Water Bottle",
    photoPath: "/images/menu/chicken-fry-piece-biryani.jpg",
    isVeg: false,
  },
  {
    id: "boneless-biryani",
    name: "Boneless Biryani",
    category: biryaniCategory,
    defaultPrice: 189,
    posterPrice: "₹189",
    specialOffer: "Free 1 Scoop Ice Cream + Water Bottle",
    photoPath: "/images/menu/boneless-biryani.jpg",
    isVeg: false,
  },
  {
    id: "lollipop-biryani",
    name: "Lollipop Biryani",
    category: biryaniCategory,
    defaultPrice: 169,
    posterPrice: "₹169",
    specialOffer: "Free 1 Scoop Ice Cream + Water Bottle",
    photoPath: "/images/menu/lollipop-biryani.jpg",
    isVeg: false,
  },
  {
    id: "mughalai-biryani",
    name: "Mughalai Biryani",
    category: biryaniCategory,
    defaultPrice: 199,
    posterPrice: "₹199",
    specialOffer: "Free 250ml Coke + Water Bottle + Ice Cream",
    photoPath: "/images/menu/mughalai-biryani.jpg",
    isVeg: false,
  },
  {
    id: "biryani-rice-plate",
    name: "Biryani Rice Plate",
    category: biryaniCategory,
    defaultPrice: 89,
    posterPrice: "₹89",
    specialOffer: "Free 250ml Coke",
    photoPath: "/images/menu/biryani-rice-plate.jpg",
    isVeg: false,
  },
  {
    id: "chicken-65-biryani",
    name: "Chicken 65 Biryani",
    category: biryaniCategory,
    defaultPrice: 179,
    posterPrice: "₹179",
    specialOffer: "Free 250ml Coke + Water Bottle",
    photoPath: "/images/menu/chicken-65-biryani.jpg",
    isVeg: false,
  },

  // Veg Biryani
  {
    id: "mushroom-biryani",
    name: "Mushroom Biryani",
    category: vegBiryaniCategory,
    defaultPrice: 129,
    posterPrice: "₹129 / ₹159",
    specialOffer: "Free Blackcurrant Milkshake",
    photoPath: "/images/menu/mushroom-biryani.jpg",
    isVeg: true,
  },
  {
    id: "paneer-biryani",
    name: "Paneer Biryani",
    category: vegBiryaniCategory,
    defaultPrice: 149,
    posterPrice: "₹149 / ₹169",
    specialOffer: "Free Chocolate Milkshake",
    photoPath: "/images/menu/paneer-biryani.jpg",
    isVeg: true,
  },
  {
    id: "veg-dum-biryani",
    name: "Veg Dum Biryani",
    category: vegBiryaniCategory,
    defaultPrice: 109,
    posterPrice: "₹109",
    specialOffer: "Served with fragrant salan & raita",
    photoPath: "/images/menu/veg-dum-biryani.jpg",
    isVeg: true,
  },
  {
    id: "veg-biryani-rice",
    name: "Veg Biryani Rice",
    category: vegBiryaniCategory,
    defaultPrice: 79,
    posterPrice: "₹79",
    specialOffer: "Free 250ml Coke",
    photoPath: "/images/menu/veg-biryani-rice.jpg",
    isVeg: true,
  },

  // Non-Veg Starters
  {
    id: "chilli-chicken",
    name: "Chilli Chicken",
    category: starterCategory,
    defaultPrice: 199,
    posterPrice: "₹199",
    specialOffer: "Free 250ml Coke + 1 Scoop Ice Cream",
    photoPath: "/images/menu/chilli-chicken.jpg",
    isVeg: false,
  },
  {
    id: "chicken-lollipop",
    name: "Chicken Lollipop",
    category: starterCategory,
    defaultPrice: 199,
    posterPrice: "₹199",
    specialOffer: "Free 250ml Coke + Water Bottle",
    photoPath: "/images/menu/chicken-lollipop.jpg",
    isVeg: false,
  },
  {
    id: "dragon-chicken",
    name: "Dragon Chicken",
    category: starterCategory,
    defaultPrice: 229,
    posterPrice: "₹229",
    specialOffer: "Free 2 Scoops Ice Cream + 500ml Water Bottle",
    photoPath: "/images/menu/dragon-chicken.jpg",
    isVeg: false,
  },
  {
    id: "pepper-chicken",
    name: "Pepper Chicken",
    category: starterCategory,
    defaultPrice: 229,
    posterPrice: "₹229",
    specialOffer: "Free 250ml Coke + Water Bottle",
    photoPath: "/images/menu/pepper-chicken.jpg",
    isVeg: false,
  },
  {
    id: "lemon-chicken",
    name: "Lemon Chicken",
    category: starterCategory,
    defaultPrice: 239,
    posterPrice: "₹239",
    specialOffer: "Free Vanilla Milkshake",
    photoPath: "/images/menu/lemon-chicken.jpg",
    isVeg: false,
  },

  // Regular Milkshakes (₹70 each)
  { id: "chocolate-milkshake", name: "Chocolate Milkshake", category: milkshakeCategory, defaultPrice: 70, posterPrice: "₹70", photoPath: "/images/menu/chocolate-milkshake.jpg", isVeg: true },
  { id: "vanilla-milkshake", name: "Vanilla Milkshake", category: milkshakeCategory, defaultPrice: 70, posterPrice: "₹70", photoPath: "/images/menu/vanilla-milkshake.jpg", isVeg: true },
  { id: "strawberry-milkshake", name: "Strawberry Milkshake", category: milkshakeCategory, defaultPrice: 70, posterPrice: "₹70", photoPath: "/images/menu/strawberry-milkshake.jpg", isVeg: true },
  { id: "blackcurrant-milkshake", name: "Blackcurrant Milkshake", category: milkshakeCategory, defaultPrice: 70, posterPrice: "₹70", photoPath: "/images/menu/blackcurrant-milkshake.jpg", isVeg: true },
  { id: "oreo-blast-milkshake", name: "Oreo Blast Milkshake", category: milkshakeCategory, defaultPrice: 70, posterPrice: "₹70", photoPath: "/images/menu/oreo-blast-milkshake.jpg", isVeg: true },
  { id: "kitkat-milkshake", name: "KitKat Milkshake", category: milkshakeCategory, defaultPrice: 70, posterPrice: "₹70", photoPath: "/images/menu/kitkat-milkshake.jpg", isVeg: true },
  { id: "bournville-chocolate-milkshake", name: "Bournville Chocolate Milkshake", category: milkshakeCategory, defaultPrice: 70, posterPrice: "₹70", photoPath: "/images/menu/bournville-chocolate-milkshake.jpg", isVeg: true },
  { id: "butterscotch-milkshake", name: "Butterscotch Milkshake", category: milkshakeCategory, defaultPrice: 70, posterPrice: "₹70", photoPath: "/images/menu/butterscotch-milkshake.jpg", isVeg: true },

  // Double Milkshakes (₹90 each)
  { id: "double-milkshake", name: "Double Milk Shake", category: doubleMilkshakeCategory, defaultPrice: 90, posterPrice: "₹90", photoPath: "/images/menu/double-milkshake.jpg", isVeg: true },
  { id: "choco-vanilla", name: "Choco Vanilla", category: doubleMilkshakeCategory, defaultPrice: 90, posterPrice: "₹90", photoPath: "/images/menu/choco-vanilla.jpg", isVeg: true },
  { id: "oreo-with-digestive", name: "Oreo with Digestive", category: doubleMilkshakeCategory, defaultPrice: 90, posterPrice: "₹90", photoPath: "/images/menu/oreo-with-digestive.jpg", isVeg: true },
  { id: "pista-with-vanilla", name: "Pista with Vanilla", category: doubleMilkshakeCategory, defaultPrice: 90, posterPrice: "₹90", photoPath: "/images/menu/pista-with-vanilla.jpg", isVeg: true },
  { id: "blackcurrant-with-vanilla", name: "Blackcurrant with Vanilla", category: doubleMilkshakeCategory, defaultPrice: 90, posterPrice: "₹90", photoPath: "/images/menu/blackcurrant-with-vanilla.jpg", isVeg: true },
  { id: "strawberry-with-vanilla", name: "Strawberry with Vanilla", category: doubleMilkshakeCategory, defaultPrice: 90, posterPrice: "₹90", photoPath: "/images/menu/strawberry-with-vanilla.jpg", isVeg: true },
  { id: "oreo-with-ice-cream", name: "Oreo with Ice Cream", category: doubleMilkshakeCategory, defaultPrice: 90, posterPrice: "₹90", photoPath: "/images/menu/oreo-with-ice-cream.jpg", isVeg: true },
];

export const DEFAULT_MENU_ITEMS: MenuItem[] = seedItems.map((item) => ({
  id: item.id,
  name: item.name,
  category: item.category,
  description: item.specialOffer ? `Special Offer: ${item.specialOffer}` : "Authentic flavour made fresh to order.",
  price: item.defaultPrice,
  posterPrice: item.posterPrice,
  specialOffer: item.specialOffer,
  photoPath: item.photoPath,
  isVeg: item.isVeg,
  isAvailable: true,
  isPublished: true,
}));

export const DEFAULT_MENU_SNAPSHOT = JSON.stringify(DEFAULT_MENU_ITEMS);
