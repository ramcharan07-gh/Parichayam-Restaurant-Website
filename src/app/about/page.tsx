import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RestaurantLocation } from "@/components/restaurant-location";
import { Sparkles, Heart, Shield, Award, Users, UtensilsCrossed, ArrowRight } from "lucide-react";
import { RESTAURANT_PROPRIETOR } from "@/lib/restaurant-menu";

export const metadata: Metadata = {
  title: "About Us | Our Story & Heritage",
  description: "Learn about Parichayam Restaurant in Angallu, near MITS College. Founded by Macha Kiran Kumar Naidu with a passion for authentic Hyderabadi cuisine.",
};

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <main className="pr-main-flow">
      {/* ── About Hero ─────────────────────────────────────────── */}
      <section className="pr-about-page-hero">
        <div className="pr-hero-glow" aria-hidden="true" />
        <div className="pr-about-hero-content">
          <span className="pr-section-eyebrow">OUR HERITAGE &amp; PASSION</span>
          <h1 className="pr-about-hero-title">
            The Story of <span className="pr-hero-script-gold">Parichayam</span>
          </h1>
          <p className="pr-about-hero-sub">
            In Telugu, <em>"Parichayam"</em> means familiarity — that easy, comforting warmth of being among friends.
            That is the spirit behind every plate we serve.
          </p>
        </div>
      </section>

      {/* ── Founder & Philosophy ───────────────────────────────── */}
      <section className="pr-philosophy-section">
        <div className="pr-philosophy-inner">
          <div className="pr-philosophy-photo-wrap">
            <Image
              src="/images/restaurant-spread.png"
              alt="Traditional South Indian Hospitality"
              width={520}
              height={400}
              className="pr-philosophy-img"
            />
            <div className="pr-founder-badge">
              <span>Proprietor &amp; Host</span>
              <strong>{RESTAURANT_PROPRIETOR}</strong>
            </div>
          </div>

          <div className="pr-philosophy-copy">
            <span className="pr-section-eyebrow">BORN FROM PASSION</span>
            <h2>Where Every Guest Becomes Family</h2>
            <p>
              Parichayam Restaurant was established in Angallu, right next to MITS College, to fill a deeply felt need:
              a dining haven where students, faculty, families, and travelers could relish truly authentic, home-style Hyderabadi
              Biryani without compromise on freshness or quality.
            </p>
            <p>
              Under the guidance of proprietor <strong>{RESTAURANT_PROPRIETOR}</strong>, we have kept our culinary values unshakeable.
              We believe food made with whole spices, pure ghee, and patience speaks directly to the soul.
            </p>
            <div className="pr-philosophy-stats">
              <div>
                <strong>100%</strong>
                <span>Authentic Dum Process</span>
              </div>
              <div>
                <strong>3 km</strong>
                <span>Free Doorstep Delivery</span>
              </div>
              <div>
                <strong>50+</strong>
                <span>Party Hall Capacity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The 4 Pillars ──────────────────────────────────────── */}
      <section className="pr-pillars-section">
        <div className="pr-pillars-inner">
          <div className="pr-pillars-header">
            <span className="pr-section-eyebrow">— OUR PILLARS —</span>
            <h2>The Parichayam Standards</h2>
            <p>What makes our kitchen special day after day.</p>
          </div>

          <div className="pr-pillars-grid">
            <div className="pr-pillar-card">
              <span className="pr-pillar-icon">🏺</span>
              <h3>Authentic Slow Dum</h3>
              <p>
                Our biryanis are never pre-mixed or microwaved. Marinated meats and seasoned basmati rice are sealed with dough
                and slow-cooked on traditional charcoal embers until fragrant.
              </p>
            </div>

            <div className="pr-pillar-card">
              <span className="pr-pillar-icon">🌿</span>
              <h3>Fresh Ground Spices</h3>
              <p>
                We do not use artificial food colors, preservatives, or synthetic flavors. Every blend of garam masala, star anise,
                cardamom, and saffron is hand-prepared daily.
              </p>
            </div>

            <div className="pr-pillar-card">
              <span className="pr-pillar-icon">🍃</span>
              <h3>Garden Dining Experience</h3>
              <p>
                Step away from noisy traffic into our breezy, open-air garden setup. Dine under string lights with soothing greenery,
                making every meal relaxed and unhurried.
              </p>
            </div>

            <div className="pr-pillar-card">
              <span className="pr-pillar-icon">🛵</span>
              <h3>Doorstep Delivery to Hostels</h3>
              <p>
                We know hostel food can get tiring. We deliver hot biryani, crispy starters, and rich milkshakes directly to your
                hostel gate within minutes, free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Private Hall & Catering ────────────────────────────── */}
      <section className="pr-events-section">
        <div className="pr-events-inner">
          <div className="pr-events-copy">
            <span className="pr-section-eyebrow">CELEBRATE WITH US</span>
            <h2>Private Party Hall &amp; Outdoor Catering</h2>
            <p>
              Looking to celebrate a birthday, college club gathering, anniversary, or family get-together?
              Our private party hall comfortably hosts up to 50 guests with personalized buffet arrangements and sound setup.
            </p>
            <div className="pr-events-checklist">
              <div><Shield size={16} /> Private air-conditioned &amp; garden seating</div>
              <div><Users size={16} /> Accommodates up to 50 guests comfortably</div>
              <div><UtensilsCrossed size={16} /> Customized combo menus &amp; student pricing</div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link href="/booking" className="pr-btn pr-btn-gold">
                Book Party Hall or Table <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="pr-events-photo-wrap">
            <Image
              src="/images/chicken-biryani.png"
              alt="Party dining spread"
              width={450}
              height={320}
              className="pr-events-photo"
            />
          </div>
        </div>
      </section>

      {/* ── Location & Directions ──────────────────────────────── */}
      <RestaurantLocation />
    </main>
  );
}
