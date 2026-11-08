"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Phone, Clock, Shield, CheckCircle2 } from "lucide-react";
import { useRestaurantInfo } from "@/lib/restaurant-info-store";

export function SiteFooter() {
  const { info } = useRestaurantInfo();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="pr-footer">
      <div className="pr-footer-main">
        {/* Brand & Story */}
        <div className="pr-footer-brand-col">
          <div className="pr-footer-logo">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={42} height={42}>
              <circle cx="20" cy="20" r="19" stroke="#C9A84C" strokeWidth="1.5" />
              <path
                d="M20 8 C20 8 12 14 12 20 C12 26 15 30 20 32 C25 30 28 26 28 20 C28 14 20 8 20 8Z"
                fill="#C9A84C"
                opacity="0.9"
              />
              <path
                d="M20 10 L20 30 M14 16 L26 16 M13 22 L27 22"
                stroke="#0F3D2A"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <div className="pr-footer-brand-name">Parichayam</div>
              <div className="pr-footer-brand-sub">RESTAURANT &amp; GARDEN</div>
            </div>
          </div>
          <p className="pr-footer-tagline">{info.tagline}</p>
          <p className="pr-footer-desc">
            Authentic Hyderabadi Dum Biryani, starters, and rich milkshakes in Angallu.
            Slow-cooked on traditional charcoal dum with hand-ground spices.
          </p>
          <p className="pr-footer-proprietor">
            Proprietor: <strong>{info.proprietor}</strong>
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div className="pr-footer-links-col">
          <span className="pr-footer-col-title">QUICK LINKS</span>
          <div className="pr-footer-links-grid">
            <Link href="/" className="pr-footer-link">Home</Link>
            <Link href="/menu" className="pr-footer-link">Our Menu List</Link>
            <Link href="/about" className="pr-footer-link">About Us</Link>
            <Link href="/booking" className="pr-footer-link">Reserve a Table</Link>
            <Link href="/reviews" className="pr-footer-link">Guest Reviews</Link>
            <Link href="/order" className="pr-footer-link">Your Cart &amp; Order</Link>
            <Link href="/#location" className="pr-footer-link">Find Location</Link>
          </div>
        </div>

        {/* Contact & Hours */}
        <div className="pr-footer-contact-col">
          <span className="pr-footer-col-title">GET IN TOUCH</span>
          <p className="pr-footer-contact-item">
            <MapPin size={16} className="pr-gold-icon" />
            <span>{info.address}</span>
          </p>
          <p className="pr-footer-contact-item">
            <Phone size={16} className="pr-gold-icon" />
            <span>
              <a href={`tel:${info.phone1}`}>{info.phone1}</a>
              {info.phone2 && (
                <>
                  {", "}
                  <a href={`tel:${info.phone2}`}>{info.phone2}</a>
                </>
              )}
            </span>
          </p>
          <p className="pr-footer-contact-item">
            <Clock size={16} className="pr-gold-icon" />
            <span>{info.hours}</span>
          </p>
          <div className="pr-footer-delivery-note">
            <span>🛵 {info.deliveryRadius}</span>
          </div>
        </div>

        {/* Newsletter & Socials */}
        <div className="pr-footer-newsletter-col">
          <span className="pr-footer-col-title">STAY CONNECTED</span>
          <p className="pr-footer-sub-text">Subscribe for weekly secret menu combos and special discount announcements.</p>
          {subscribed ? (
            <div className="pr-footer-sub-success">
              <CheckCircle2 size={16} /> Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="pr-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pr-newsletter-input"
              />
              <button type="submit" className="pr-newsletter-btn" aria-label="Subscribe">
                →
              </button>
            </form>
          )}

          <div className="pr-footer-amenities">
            <span>✨ {info.partyHallCapacity}</span>
            <span>✨ {info.cateringAvailable}</span>
          </div>
        </div>
      </div>

      <div className="pr-footer-bottom">
        <span>
          © 2026 Parichayam Restaurant. All rights reserved.{" "}
          <Link href="/admin" className="pr-hidden-admin-trigger" title="Staff portal" aria-label="Staff Access">
            🔒
          </Link>
        </span>
        <span className="pr-footer-motto">{info.motto}</span>
      </div>
    </footer>
  );
}
