export interface MenuItem {
  id: string;
  name: string;
  category: "Non-Veg Biryani" | "Veg Biryani" | "Non-Veg Starters" | "Regular Milkshakes" | "Double Milkshakes";
  price: number;
  priceDouble?: number;
  offer?: string;
  isVeg: boolean;
  bestseller?: boolean;
  image?: string;
}

export const RESTAURANT_PHONE_1 = "9014498145";
export const RESTAURANT_PHONE_2 = "9347209229";
export const RESTAURANT_PROPRIETOR = "Macha Kiran Kumar Naidu";
export const RESTAURANT_ADDRESS = "Angallu, Near MITS College, Madanapalle, Andhra Pradesh";
export const RESTAURANT_MAPS_LINK = "https://maps.google.com/?q=13.6318002,78.4823367";

export const MENU_ITEMS: MenuItem[] = [
  // Non-Veg Biryani
  {
    id: "nvb-1",
    name: "Chicken Dum Biryani",
    category: "Non-Veg Biryani",
    price: 129,
    offer: "250ml Coke + Water Bottle",
    isVeg: false,
    bestseller: true,
    image: "/images/chicken-biryani.png",
  },
  {
    id: "nvb-2",
    name: "Chicken Fry Piece Biryani",
    category: "Non-Veg Biryani",
    price: 149,
    offer: "250ml Coke + 1 Water Bottle",
    isVeg: false,
    bestseller: true,
    image: "/images/chicken-biryani.png",
  },
  {
    id: "nvb-3",
    name: "Boneless Biryani",
    category: "Non-Veg Biryani",
    price: 189,
    offer: "1 Scoop Ice Cream + Water Bottle",
    isVeg: false,
    image: "/images/chicken-biryani.png",
  },
  {
    id: "nvb-4",
    name: "Lollipop Biryani",
    category: "Non-Veg Biryani",
    price: 169,
    offer: "1 Scoop Ice Cream + Water Bottle",
    isVeg: false,
    image: "/images/chicken-biryani.png",
  },
  {
    id: "nvb-5",
    name: "Mughalai Biryani",
    category: "Non-Veg Biryani",
    price: 199,
    offer: "250ml Coke + Water Bottle + Ice Cream",
    isVeg: false,
    image: "/images/chicken-biryani.png",
  },
  {
    id: "nvb-6",
    name: "Chicken 65 Biryani",
    category: "Non-Veg Biryani",
    price: 179,
    offer: "250ml Coke + Water Bottle",
    isVeg: false,
    image: "/images/chicken-biryani.png",
  },
  {
    id: "nvb-7",
    name: "Biryani Rice Plate",
    category: "Non-Veg Biryani",
    price: 89,
    offer: "250ml Coke",
    isVeg: false,
    image: "/images/chicken-biryani.png",
  },

  // Veg Biryani
  {
    id: "vb-1",
    name: "Mushroom Biryani",
    category: "Veg Biryani",
    price: 129,
    priceDouble: 159,
    offer: "Blackcurrant Milkshake",
    isVeg: true,
    image: "/images/paneer-curry.png",
  },
  {
    id: "vb-2",
    name: "Paneer Biryani",
    category: "Veg Biryani",
    price: 149,
    priceDouble: 169,
    offer: "Chocolate Milkshake",
    isVeg: true,
    bestseller: true,
    image: "/images/paneer-curry.png",
  },
  {
    id: "vb-3",
    name: "Veg Dum Biryani",
    category: "Veg Biryani",
    price: 109,
    isVeg: true,
    image: "/images/paneer-curry.png",
  },
  {
    id: "vb-4",
    name: "Veg Biryani Rice",
    category: "Veg Biryani",
    price: 79,
    offer: "250ml Coke",
    isVeg: true,
    image: "/images/paneer-curry.png",
  },

  // Non-Veg Starters
  {
    id: "nvs-1",
    name: "Chilli Chicken",
    category: "Non-Veg Starters",
    price: 199,
    offer: "250ml Coke + 1 Scoop Ice Cream",
    isVeg: false,
    bestseller: true,
    image: "/images/restaurant-spread.png",
  },
  {
    id: "nvs-2",
    name: "Chicken Lollipop",
    category: "Non-Veg Starters",
    price: 199,
    offer: "250ml Coke + Water Bottle",
    isVeg: false,
    image: "/images/restaurant-spread.png",
  },
  {
    id: "nvs-3",
    name: "Dragon Chicken",
    category: "Non-Veg Starters",
    price: 229,
    offer: "2 Scoops Ice Cream + 500ml Water Bottle",
    isVeg: false,
    image: "/images/restaurant-spread.png",
  },
  {
    id: "nvs-4",
    name: "Pepper Chicken",
    category: "Non-Veg Starters",
    price: 229,
    offer: "250ml Coke + Water Bottle",
    isVeg: false,
    image: "/images/restaurant-spread.png",
  },
  {
    id: "nvs-5",
    name: "Lemon Chicken",
    category: "Non-Veg Starters",
    price: 239,
    offer: "Vanilla Milkshake",
    isVeg: false,
    image: "/images/restaurant-spread.png",
  },

  // Regular Milkshakes (₹70 each)
  { id: "rms-1", name: "Chocolate Milkshake", category: "Regular Milkshakes", price: 70, isVeg: true },
  { id: "rms-2", name: "Vanilla Milkshake", category: "Regular Milkshakes", price: 70, isVeg: true },
  { id: "rms-3", name: "Strawberry Milkshake", category: "Regular Milkshakes", price: 70, isVeg: true },
  { id: "rms-4", name: "Blackcurrant Milkshake", category: "Regular Milkshakes", price: 70, isVeg: true },
  { id: "rms-5", name: "Oreo Blast Milkshake", category: "Regular Milkshakes", price: 70, isVeg: true, bestseller: true },
  { id: "rms-6", name: "KitKat Milkshake", category: "Regular Milkshakes", price: 70, isVeg: true, bestseller: true },
  { id: "rms-7", name: "Bournville Chocolate Milkshake", category: "Regular Milkshakes", price: 70, isVeg: true },
  { id: "rms-8", name: "Butterscotch Milkshake", category: "Regular Milkshakes", price: 70, isVeg: true },

  // Double Milkshakes (₹90 each)
  { id: "dms-1", name: "Double Milk Shake", category: "Double Milkshakes", price: 90, isVeg: true },
  { id: "dms-2", name: "Choco Vanilla", category: "Double Milkshakes", price: 90, isVeg: true },
  { id: "dms-3", name: "Oreo with Digestive", category: "Double Milkshakes", price: 90, isVeg: true },
  { id: "dms-4", name: "Pista with Vanilla", category: "Double Milkshakes", price: 90, isVeg: true },
  { id: "dms-5", name: "Blackcurrant with Vanilla", category: "Double Milkshakes", price: 90, isVeg: true },
  { id: "dms-6", name: "Strawberry with Vanilla", category: "Double Milkshakes", price: 90, isVeg: true },
  { id: "dms-7", name: "Oreo with Ice Cream", category: "Double Milkshakes", price: 90, isVeg: true, bestseller: true },
];

export function buildWhatsAppOrderLink(params: {
  customerName: string;
  phone: string;
  address: string;
  instructions?: string;
  items: { name: string; quantity: number; price: number; offer?: string }[];
  total: number;
  restaurantPhone?: string;
  isBeyond3km?: boolean;
}): string {
  const targetPhone = (params.restaurantPhone || RESTAURANT_PHONE_1).replace(/\D/g, "");

  const lineItems = params.items
    .map((item, idx) => {
      const offerText = item.offer ? `\n🎁 Offer: ${item.offer.replace(/^Free\s*/i, "")}` : "";
      return `${idx + 1}. ${item.name} × ${item.quantity}\n💰 ₹${item.price * item.quantity}${offerText}`;
    })
    .join("\n\n");

  const notesLine =
    params.instructions && params.instructions.trim()
      ? `\n🌶️ Notes: ${params.instructions.trim()}`
      : "";

  let totalAndDeliveryBlock = "";
  if (params.isBeyond3km) {
    totalAndDeliveryBlock = `💵 Food Total: ₹${params.total}

🚚 Delivery Charges:
• Within 3 km: FREE
• Beyond 3 km: Additional delivery charges apply based on distance.

━━━━━━━━━━━━━━━━━━━━

📍 Final Amount: ₹${params.total} + applicable delivery charges

⏱️ Please confirm my order and share the estimated delivery time.`;
  } else {
    totalAndDeliveryBlock = `💵 TOTAL AMOUNT: ₹${params.total}

🚚 Delivery: FREE within 3 km (Angallu)

━━━━━━━━━━━━━━━━━━━━

✅ Please confirm my order and share the estimated delivery time.`;
  }

  const message = `🍽️ NEW ORDER — PARICHAYAM RESTAURANT

━━━━━━━━━━━━━━━━━━━━

👤 Customer: ${params.customerName.trim()}
📞 Phone: ${params.phone.trim()}
📍 Address: ${params.address.trim()}${notesLine}

🧾 Order Details

${lineItems}

━━━━━━━━━━━━━━━━━━━━

${totalAndDeliveryBlock}`;

  return `https://wa.me/91${targetPhone}?text=${encodeURIComponent(message)}`;
}
