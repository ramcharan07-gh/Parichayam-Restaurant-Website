import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InteractiveMenu } from "@/components/interactive-menu";
import { RestaurantLocation } from "@/components/restaurant-location";
import { Sparkles, Gift, Truck, Clock, ShieldCheck, Users, UtensilsCrossed } from "lucide-react";
import { RESTAURANT_PHONE_1, RESTAURANT_PHONE_2 } from "@/lib/restaurant-menu";

export const metadata: Metadata = {
  title: "Official Restaurant Menu & Prices",
  description: "Browse the full Parichayam Restaurant menu. Authentic Hyderabadi Dum Biryani, starters, milkshakes, and free combo offers.",
};

export default function MenuPage() {
  return (
    <main className="pr-main-flow">
      {/* ── Menu Hero ─────────────────────────────────────────── */}
      <section className="pr-menu-hero-banner">
        <div className="pr-hero-glow" aria-hidden="true" />
        <div className="pr-menu-hero-content">
          <span className="pr-section-eyebrow">AUTHENTIC HYDERABADI TASTE</span>
          <h1 className="pr-menu-hero-title">
            Our Official <span className="pr-hero-script-gold">Menu List</span>
          </h1>
          <p className="pr-menu-hero-sub">
            Freshly prepared with pure spices, tender halal meats, and aged basmati.
            Order your favourites online with fast, free delivery within 3 km in Angallu.
          </p>

          <div className="pr-menu-hero-badges">
            <span><Truck size={15} /> Free Delivery within 3 km</span>
            <span><Gift size={15} /> Free Drink / Shake Combo Included</span>
            <span><Clock size={15} /> Open 11:00 AM – 11:00 PM</span>
          </div>
        </div>
      </section>

      {/* ── Official Poster Special Offer Highlights ──────────── */}
      <section className="pr-poster-combos-section">
        <div className="pr-poster-combos-inner">
          <div className="pr-combos-header">
            <span className="pr-section-eyebrow">— SPECIAL OFFER MENU —</span>
            <h2>Complimentary Gifts With Every Dish</h2>
            <p>Every single biryani and starter ordered comes with special complimentary treats from our kitchen!</p>
          </div>

          <div className="pr-combos-grid">
            <div className="pr-combo-box">
              <div className="pr-combo-pill">NON-VEG BIRYANI GIFTS</div>
              <ul>
                <li><strong>Chicken Dum Biryani (₹129):</strong> 250ml Coke + Water Bottle</li>
                <li><strong>Chicken Fry Piece Biryani (₹149):</strong> 250ml Coke + 1 Water Bottle</li>
                <li><strong>Boneless Biryani (₹189):</strong> 1 Scoop Ice Cream + Water Bottle</li>
                <li><strong>Lollipop Biryani (₹169):</strong> 1 Scoop Ice Cream + Water Bottle</li>
                <li><strong>Mughalai Biryani (₹199):</strong> 250ml Coke + Water Bottle + Ice Cream</li>
                <li><strong>Chicken 65 Biryani (₹179):</strong> 250ml Coke + Water Bottle</li>
                <li><strong>Biryani Rice Plate (₹89):</strong> 250ml Coke</li>
              </ul>
            </div>

            <div className="pr-combo-box">
              <div className="pr-combo-pill">VEG BIRYANI &amp; STARTER GIFTS</div>
              <ul>
                <li><strong>Mushroom Biryani (₹129/159):</strong> Blackcurrant Milkshake</li>
                <li><strong>Paneer Biryani (₹149/169):</strong> Chocolate Milkshake</li>
                <li><strong>Veg Biryani Rice (₹79):</strong> 250ml Coke</li>
                <li><strong>Chilli Chicken (₹199):</strong> 250ml Coke + 1 Scoop Ice Cream</li>
                <li><strong>Chicken Lollipop (₹199):</strong> 250ml Coke + Water Bottle</li>
                <li><strong>Dragon Chicken (₹229):</strong> 2 Scoops Ice Cream + 500ml Water</li>
                <li><strong>Lemon Chicken (₹239):</strong> Vanilla Milkshake</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full Interactive Menu Explorer ───────────────────── */}
      <section className="pr-menu-explorer-section">
        <div className="pr-menu-explorer-inner">
          <InteractiveMenu />
        </div>
      </section>

      {/* ── Catering & Hall Callout ───────────────────────────── */}
      <section className="pr-catering-callout-section">
        <div className="pr-catering-card">
          <div className="pr-cat-icon"><UtensilsCrossed size={32} /></div>
          <div>
            <h3>College &amp; Family Catering Available</h3>
            <p>Planning an event, farewell, or college gathering near MITS? We offer bulk orders with customized menus and special student discounts.</p>
            <div className="pr-cat-contact">
              <span>Call for catering enquiries:</span>
              <a href={`tel:${RESTAURANT_PHONE_1}`}>📞 {RESTAURANT_PHONE_1}</a>
              <a href={`tel:${RESTAURANT_PHONE_2}`}>📞 {RESTAURANT_PHONE_2}</a>
            </div>
          </div>
          <Link href="/booking" className="pr-btn pr-btn-gold">
            Enquire for Party Hall →
          </Link>
        </div>
      </section>

      {/* ── Delivery FAQs ─────────────────────────────────────── */}
      <section className="pr-menu-faq-section">
        <div className="pr-menu-faq-inner">
          <span className="pr-section-eyebrow">— FREQUENTLY ASKED QUESTIONS —</span>
          <h2>Ordering &amp; Delivery Information</h2>

          <div className="pr-faq-grid">
            <div className="pr-faq-item">
              <strong>Is delivery really free?</strong>
              <p>Yes! We provide 100% free delivery to all hostels, PGs, college campus locations, and homes within a 3 km radius in Angallu.</p>
            </div>
            <div className="pr-faq-item">
              <strong>How do I confirm my order?</strong>
              <p>Add your dishes to cart, fill in your delivery details, and click "Place Order via WhatsApp". Our kitchen instantly receives the details and confirms delivery time.</p>
            </div>
            <div className="pr-faq-item">
              <strong>What payment modes are accepted?</strong>
              <p>We accept Cash on Delivery (COD) as well as UPI (Google Pay, PhonePe, Paytm) upon delivery or pickup.</p>
            </div>
            <div className="pr-faq-item">
              <strong>Can I place advance party or bulk orders?</strong>
              <p>Absolutely. You can place bulk biryani orders for up to 50+ members with advance notice by phone or using our table booking page.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Restaurant Location ───────────────────────────────── */}
      <RestaurantLocation />
    </main>
  );
}
