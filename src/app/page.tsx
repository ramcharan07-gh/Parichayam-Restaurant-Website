"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  CalendarDays,
  Truck,
  Star,
  Phone,
  Sparkles,
  Gift,
  ArrowRight,
  Flame,
  CheckCircle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Users,
  UtensilsCrossed,
  Plus,
  Check
} from "lucide-react";
import { InteractiveMenu } from "@/components/interactive-menu";
import { RestaurantLocation } from "@/components/restaurant-location";
import { useCart } from "@/lib/cart-store";
import { useRestaurantInfo } from "@/lib/restaurant-info-store";

// Special offer combo items with photos and poster details
const specialOfferItems = [
  {
    id: "chicken-dum-biryani",
    name: "Chicken Dum Biryani",
    category: "Non-Veg Biryani",
    shortName: "Chicken Dum",
    price: "₹129",
    gift: "Free 250ml Coke + Water Bottle",
    image: "/images/menu/chicken-dum-biryani.jpg",
    isVeg: false,
    bestseller: true,
  },
  {
    id: "chicken-fry-piece-biryani",
    name: "Chicken Fry Piece Biryani",
    category: "Non-Veg Biryani",
    shortName: "Fry Piece",
    price: "₹149",
    gift: "Free 250ml Coke + 1 Water Bottle",
    image: "/images/menu/chicken-fry-piece-biryani.jpg",
    isVeg: false,
    bestseller: true,
  },
  {
    id: "boneless-biryani",
    name: "Boneless Biryani",
    category: "Non-Veg Biryani",
    shortName: "Boneless",
    price: "₹189",
    gift: "Free 1 Scoop Ice Cream + Water Bottle",
    image: "/images/menu/boneless-biryani.jpg",
    isVeg: false,
    bestseller: true,
  },
  {
    id: "lollipop-biryani",
    name: "Lollipop Biryani",
    category: "Non-Veg Biryani",
    shortName: "Lollipop Biryani",
    price: "₹169",
    gift: "Free 1 Scoop Ice Cream + Water Bottle",
    image: "/images/menu/lollipop-biryani.jpg",
    isVeg: false,
  },
  {
    id: "mughalai-biryani",
    name: "Mughalai Biryani",
    category: "Non-Veg Biryani",
    shortName: "Mughalai",
    price: "₹199",
    gift: "Free 250ml Coke + Water Bottle + Ice Cream",
    image: "/images/menu/mughalai-biryani.jpg",
    isVeg: false,
    bestseller: true,
  },
  {
    id: "paneer-biryani",
    name: "Paneer Biryani",
    category: "Veg Biryani",
    shortName: "Paneer Biryani",
    price: "₹149",
    gift: "Free Chocolate Milkshake",
    image: "/images/menu/paneer-biryani.jpg",
    isVeg: true,
    bestseller: true,
  },
  {
    id: "mushroom-biryani",
    name: "Mushroom Biryani",
    category: "Veg Biryani",
    shortName: "Mushroom Biryani",
    price: "₹129",
    gift: "Free Blackcurrant Milkshake",
    image: "/images/menu/mushroom-biryani.jpg",
    isVeg: true,
  },
  {
    id: "dragon-chicken",
    name: "Dragon Chicken",
    category: "Non-Veg Starter",
    shortName: "Dragon Chicken",
    price: "₹229",
    gift: "Free 2 Scoops Ice Cream + 500ml Water",
    image: "/images/menu/dragon-chicken.jpg",
    isVeg: false,
  },
  // Add other items as needed (you can keep the rest of the original list below)
];


// Create a triple-looped array for seamless manual infinite scrolling
const loopedOffers = [...specialOfferItems, ...specialOfferItems, ...specialOfferItems];


const reviews = [
  {
    text: "The biryani here is simply outstanding! Authentic Hyderabadi dum taste, tender chicken pieces, and the complimentary Coke & water bottle is such a generous touch.",
    author: "Sai Teja",
    role: "MITS Student",
    rating: 5,
  },
  {
    text: "Best biryani in Angallu! We order from our hostel every weekend. Free delivery within 3 km is super fast and food always arrives piping hot.",
    author: "Karthik Reddy",
    role: "Hostel Resident",
    rating: 5,
  },
  {
    text: "We hosted a 30-member birthday dinner in their garden party hall. The hospitality was warm, Chicken 65 & Lollipop Biryani were crowd favourites!",
    author: "Priya Sharma",
    role: "Local Resident",
    rating: 5,
  },
];

export default function HomePage() {
  const [reviewIdx, setReviewIdx] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { itemCount, addToCart } = useCart();
  const { info } = useRestaurantInfo();

  // Sideways offers horizontal scroll ref & control
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  function scrollSideways(direction: "left" | "right") {

}





  // Reset position for infinite manual loop
  function handleInfiniteScroll() {
    const el = scrollTrackRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= 5) {
      el.scrollLeft += singleSetWidth;
    }
  }


  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIdx((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function handleAddOfferToCart(item: typeof specialOfferItems[0]) {
    addToCart(item.id);
    setToastMessage(`Added ${item.name} to Cart!`);
    setTimeout(() => setToastMessage(null), 2500);
  }

  return (
    <main className="pr-main-flow">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="im-toast" role="alert">
          <Check size={16} />
          <span>{toastMessage}</span>
          <Link href="/order" className="im-toast-link">View Cart →</Link>
        </div>
      )}

      {/* ── 1. PREMIUM HERO SECTION ───────────────────────────── */}
      <section className="pr-hero-premium">
        <div className="pr-hero-glow" aria-hidden="true" />
        <div className="pr-hero-pattern" aria-hidden="true" />

        <div className="pr-hero-inner">
          {/* Left: Copy & Actions */}
          <div className="pr-hero-copy">
            <div className="pr-hero-pill">
              <Sparkles size={14} className="pr-sparkle-gold" />
              <span>GOOD FOOD • GOOD MOOD • AUTHENTIC DUM BIRYANI</span>
            </div>

            <h1 className="pr-hero-main-title">
              Parichayam
              <span className="pr-hero-script-gold">Restaurant</span>
            </h1>

            <p className="pr-hero-lead">
              A perfect blend of tradition, taste and togetherness. Experience authentic
              Hyderabadi flavours, generous portions, and heartfelt hospitality in Angallu.
            </p>

            {/* CTAs: "Cart" on left, "Book a Party" on right */}
            <div className="pr-hero-btn-row">
              <Link href="/order" className="pr-btn-hero-primary" aria-label="Cart">
                <ShoppingBag size={18} /> Cart <ArrowRight size={16} />
              </Link>
              <Link href="/booking" className="pr-btn-hero-secondary" aria-label="Book a Party">
                <Users size={18} /> Book a Party
              </Link>
            </div>

            {/* Proof Badges */}
            <div className="pr-hero-proof-badges">
              <div className="pr-proof-item">
                <Truck size={17} className="pr-gold-icon" />
                <span>{info.deliveryRadius.split("(")[0]}</span>
              </div>
              <div className="pr-proof-item">
                <Star size={17} className="pr-gold-icon" />
                <span>4.9/5 Rating (1,200+ Foodies)</span>
              </div>
              <div className="pr-proof-item">
                <Phone size={17} className="pr-gold-icon" />
                <a href={`tel:${info.phone1}`}>Call {info.phone1}</a>
              </div>
            </div>
          </div>

          {/* Right: Placed Hero Biryani Dish with Floating Badges */}
          <div className="pr-hero-visual">
            <div className="pr-hero-dish-frame">
              <Image
                src="/images/biryani-hero-plate-clean.jpg"
                alt="Parichayam Signature Biryani on Banana Leaf"
                width={620}
                height={620}
                priority
                className="pr-hero-biryani-photo"
              />

              {/* Floating aesthetic badges */}
              <div className="pr-dish-float-badge float-top-right">
                <Flame size={16} className="text-orange" />
                <div>
                  <strong>Born to Biryani</strong>
                  <span>Dum cooked to perfection</span>
                </div>
              </div>

              <div className="pr-dish-float-badge float-bottom-left">
                <Gift size={16} className="text-gold" />
                <div>
                  <strong>Special Combos</strong>
                  <span>Free Drink / Shake / Ice Cream</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SPECIAL OFFERS AREA (ALL OFFERS DISPLAYED SIDEWAYS IN A SCROLLABLE TRACK) ───────────────────── */}
      <section className="pr-offers pr-offers-area-section" id="offers">
        <div className="pr-offers-area-header">
          <div className="pr-offers-header-left">
            <span className="pr-offer-pill-badge">🔥 TODAY'S SPECIAL COMBO OFFERS</span>
            <h2 className="pr-offers-area-title">Complimentary Gifts with Every Combo</h2>
            <p className="pr-offers-subtitle">
              Browse all our special combo offers sideways! Every single dish includes free chilled drinks,
              ice cream scoops, or thick milkshakes as printed on our restaurant poster.
            </p>
          </div>

          <div className="pr-offers-header-controls">
            <button
              onClick={() => scrollSideways("left")}
              className="pr-offers-arrow-btn"
              aria-label="Scroll special offers left"
              title="Scroll left"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => scrollSideways("right")}
              className="pr-offers-arrow-btn"
              aria-label="Scroll special offers right"
              title="Scroll right"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Sideways Track Displaying ALL Offers */}
        <div
          ref={scrollTrackRef}
          className="pr-offers-sideways-track"
          role="region"
          aria-label="Today's special combo offers sideways list"
        >
          {specialOfferItems.map((offer) => (
            <div key={offer.id} className="pr-offers-sideways-item">
              <div className="pr-ref-card">
                {/* Top Row: Category Pill & Popular Badge */}
                <div className="pr-ref-card-top">
                  <div className="pr-ref-dietary">
                    <span className={`pr-ref-diet-icon ${offer.isVeg ? "veg" : "non-veg"}`}>
                      {offer.isVeg ? (
                        <span className="pr-diet-dot" />
                      ) : (
                        <span className="pr-diet-triangle" />
                      )}
                    </span>
                    <span className="pr-ref-category-label">{offer.category}</span>
                  </div>
                  {offer.bestseller && (
                    <span className="pr-ref-popular-badge">
                      <Flame size={12} /> Popular
                    </span>
                  )}
                </div>

                {/* Dish Photo with floating price badge */}
                <div className="pr-ref-img-wrap">
                  <Image
                    src={offer.image}
                    alt={offer.name}
                    width={340}
                    height={200}
                    className="pr-ref-img"
                  />
                  <span className="pr-ref-price-tag">{offer.price}</span>
                </div>

                {/* Body */}
                <div className="pr-ref-body">
                  <h3 className="pr-ref-title">{offer.name}</h3>

                  {/* Freebie Box with dashed gold border */}
                  <div className="pr-ref-freebie-box">
                    <Sparkles size={14} className="pr-ref-freebie-icon" />
                    <span>
                      <strong>Free:</strong> {offer.gift.replace(/^Free\s*/i, "")}
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Add to Cart & Cart */}
                <div className="pr-ref-actions">
                  <button
                    onClick={() => handleAddOfferToCart(offer)}
                    className="pr-ref-btn-add"
                    title="Add to Cart"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>

                  <Link
                    href="/order"
                    onClick={() => addToCart(offer.id)}
                    className="pr-ref-btn-order"
                    title="Cart"
                  >
                    Cart →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. ABOUT US & THE PARICHAYAM PROMISE ──────────────── */}
      <section className="pr-about-lux-section" id="about">
        <div className="pr-about-lux-inner">
          {/* Left: Atmospheric photo card */}
          <div className="pr-about-lux-photo-wrap">
            <Image
              src="/images/restaurant-spread.png"
              alt="Authentic Indian Spices and Table Spread"
              width={420}
              height={360}
              className="pr-about-lux-photo"
            />
            <div className="pr-about-photo-badge">
              <span>Authentic Hyderabadi</span>
              <strong>Since Inception</strong>
            </div>
          </div>

          {/* Center: Story copy */}
          <div className="pr-about-lux-copy">
            <span className="pr-section-eyebrow">ABOUT US</span>
            <h2 className="pr-about-lux-title">
              The Taste of <span className="pr-gold-script">Parichayam</span>
            </h2>
            <p className="pr-about-lux-desc">
              At Parichayam Restaurant in Angallu, we bring you the authentic flavours of
              Hyderabad with a touch of love and tradition. Every biryani is slowly dum-cooked
              over charcoal using fragrant aged basmati and hand-ground spices.
            </p>
            <p className="pr-about-lux-subdesc">
              Whether you dine in our breezy garden with friends or order right to your hostel
              doorstep, every plate is crafted to make you feel right at home.
            </p>
            <Link href="/about" className="pr-btn-outline-gold">
              Know Our Full Story <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right: 3 Value Pillars */}
          <div className="pr-about-lux-values">
            <div className="pr-val-card">
              <span className="pr-val-icon">👨‍🍳</span>
              <div>
                <strong>Authentic Recipes</strong>
                <p>Generational Hyderabadi recipes perfected by master chefs.</p>
              </div>
            </div>
            <div className="pr-val-card">
              <span className="pr-val-icon">🌿</span>
              <div>
                <strong>Premium Ingredients</strong>
                <p>Pure spices, fresh tender meats, and whole dairy daily.</p>
              </div>
            </div>
            <div className="pr-val-card">
              <span className="pr-val-icon">❤️</span>
              <div>
                <strong>Made with Love</strong>
                <p>Warm South Indian hospitality with every serving.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MENU SECTION WITH INTERACTIVE EXPLORER ──────────── */}
      <section className="pr-home-menu-section" id="menu">
        <div className="pr-home-menu-header">
          <span className="pr-section-eyebrow">— OUR COMPLETE MENU —</span>
          <h2 className="pr-home-menu-title">Explore Our Popular Dishes</h2>
          <p className="pr-home-menu-subtitle">
            All prices from our official restaurant menu poster. Order your favorites individually or add them to cart for WhatsApp confirmation.
          </p>
        </div>

        {/* The Interactive Menu Component */}
        <InteractiveMenu />
      </section>

      {/* ── 5. PLAN YOUR VISIT & ORDER ONLINE CALLOUTS ────────── */}
      <section className="pr-dual-cta-section">
        {/* Left: Book a party / table */}
        <div className="pr-dual-card book-card">
          <div className="pr-dual-photo-col">
            <Image
              src="/images/restaurant-spread.png"
              alt="Dining Experience"
              width={240}
              height={170}
              className="pr-dual-thumb"
            />
          </div>
          <div className="pr-dual-text-col">
            <span className="pr-section-eyebrow">BOOK A PARTY &amp; CELEBRATION</span>
            <h3>Book a Party or Reserve a Table</h3>
            <p>Enjoy a delightful dining experience with your family and friends in our breezy garden setting.</p>
            <div className="pr-dual-perks">
              <span><Users size={14} /> {info.partyHallCapacity}</span>
              <span><UtensilsCrossed size={14} /> {info.cateringAvailable}</span>
            </div>
            <Link href="/booking" className="pr-btn-cta-gold">
              <Users size={15} style={{ display: "inline", marginRight: 6 }} />
              Book a Party →
            </Link>
          </div>
        </div>

        {/* Right: Order online / Cart */}
        <div className="pr-dual-card order-card">
          <div className="pr-dual-text-col">
            <span className="pr-section-eyebrow">ORDER ONLINE</span>
            <h3>Crave It? Order It!</h3>
            <p>Get your favourite biryanis, starters, and milkshakes delivered hot to your doorstep.</p>
            <div className="pr-dual-perks">
              <span><Truck size={14} /> Free delivery within 3 km</span>
              <span><CheckCircle size={14} /> Fast doorstep WhatsApp delivery</span>
            </div>
            <Link href="/order" className="pr-btn-cta-gold">
              <ShoppingBag size={16} /> Order &amp; Checkout →
            </Link>
          </div>
          <div className="pr-dual-scooter-col" aria-hidden="true">
            <div className="pr-scooter-illustration">🛵💨</div>
          </div>
        </div>
      </section>

      {/* ── 6. WHAT OUR CUSTOMERS SAY ─────────────────────────── */}
      <section className="pr-testimonials-section" id="reviews">
        <div className="pr-testimonials-inner">
          <span className="pr-section-eyebrow">— WHAT OUR CUSTOMERS SAY —</span>
          <h2 className="pr-testimonials-title">Words from Our Guests</h2>

          <div className="pr-testimonials-carousel">
            <button
              onClick={() => setReviewIdx((reviewIdx - 1 + reviews.length) % reviews.length)}
              className="pr-carousel-arrow left"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="pr-testimonial-card-active">
              <div className="pr-stars-row">
                {"★".repeat(reviews[reviewIdx].rating)}
              </div>
              <blockquote className="pr-testimonial-quote">
                "{reviews[reviewIdx].text}"
              </blockquote>
              <div className="pr-testimonial-author-block">
                <strong>{reviews[reviewIdx].author}</strong>
                <span>{reviews[reviewIdx].role}</span>
              </div>
            </div>

            <button
              onClick={() => setReviewIdx((reviewIdx + 1) % reviews.length)}
              className="pr-carousel-arrow right"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="pr-carousel-dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`pr-c-dot ${i === reviewIdx ? "active" : ""}`}
                onClick={() => setReviewIdx(i)}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Link href="/reviews" className="pr-view-all-reviews-link">
              Read all customer reviews &amp; ratings →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. RESTAURANT LOCATION & GOOGLE MAP ────────────────── */}
      <RestaurantLocation />
    </main>
  );
}
