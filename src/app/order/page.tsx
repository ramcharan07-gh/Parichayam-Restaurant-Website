import type { Metadata } from "next";
import { OrderExperience } from "@/components/order-experience";

export const metadata: Metadata = {
  title: "Your Order & Checkout",
  description: "Review your Parichayam order, provide delivery details, and confirm via WhatsApp.",
};

export default function OrderPage() {
  return <OrderExperience />;
}
