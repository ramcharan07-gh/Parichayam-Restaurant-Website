"use client";

import { useState } from "react";
import { RestaurantLocation } from "@/components/restaurant-location";
import { saveReservationToStore, ReservationRecord } from "@/lib/orders-store";
import { RESTAURANT_PHONE_1, RESTAURANT_PHONE_2 } from "@/lib/restaurant-menu";
import {
  CalendarDays,
  CheckCircle2,
  Sparkles,
  PartyPopper,
  ShieldCheck,
  UtensilsCrossed
} from "lucide-react";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "19:30",
    guests: 4,
    seatingType: "Garden Seating",
    occasion: "Casual Dining",
    note: ""
  });
  const [placed, setPlaced] = useState<ReservationRecord | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanPhone = form.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const guestCount = Number(form.guests);
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 50) {
      return;
    }

    const saved = saveReservationToStore({
      name: form.name.trim(),
      phone: cleanPhone,
      date: form.date,
      time: form.time,
      guests: guestCount,
      note: `Seating: ${form.seatingType} • Occasion: ${form.occasion}${form.note ? ` • Requests: ${form.note.trim()}` : ""}`
    });

    setPlaced(saved);
  }

  return (
    <main className="pr-main-flow">
      {/* ── Booking Hero ───────────────────────────────────────── */}
      <section className="pr-booking-page-hero">
        <div className="pr-hero-glow" aria-hidden="true" />
        <div className="pr-booking-hero-content">
          <span className="pr-section-eyebrow">DINE-IN, GARDEN SEATING &amp; PARTY CELEBRATIONS</span>
          <h1 className="pr-booking-hero-title">
            Book a Party &amp; <span className="pr-hero-script-gold">Reserve Table</span>
          </h1>
          <p className="pr-booking-hero-sub">
            Whether it&apos;s a grand 50-person birthday bash or college celebration near MITS, or an intimate dinner in our breezy garden,
            we ensure your party is warm, ready, and remembered.
          </p>
        </div>
      </section>

      {/* ── Main Booking Section ───────────────────────────────── */}
      <section className="pr-booking-main-section">
        <div className="pr-booking-main-inner">
          {placed ? (
            <div className="pr-booking-confirmed-card">
              <div className="pr-confirmed-icon"><CheckCircle2 size={54} /></div>
              <span className="pr-order-tag">RESERVATION RECEIVED</span>
              <h2>Table Reserved for {placed.name}!</h2>
              <p className="pr-confirmed-details">
                📅 <strong>{placed.date}</strong> at <strong>{placed.time}</strong> • <strong>{placed.guests} Guests</strong>
              </p>
              <p className="pr-confirmed-msg">
                Your reservation has been recorded in our restaurant management portal.
                Our team will keep your table ready with the warmest welcome!
              </p>
              <div className="pr-confirmed-actions">
                <a
                  href={`https://wa.me/91${RESTAURANT_PHONE_1}?text=${encodeURIComponent(
                    `Hello Parichayam, I just submitted a table reservation for ${placed.name} on ${placed.date} at ${placed.time} for ${placed.guests} guests.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="pr-btn pr-btn-whatsapp"
                >
                  Confirm on WhatsApp
                </a>
                <button
                  onClick={() => setPlaced(null)}
                  className="pr-btn pr-btn-outline-dark"
                >
                  Book Another Table
                </button>
              </div>
            </div>
          ) : (
            <div className="pr-booking-layout">
              {/* Left Column: Form */}
              <div className="pr-booking-form-box">
                <h2>Table Reservation Form</h2>
                <p>Fill out the details below. We&apos;ll hold your table and prepare fresh refreshments.</p>

                <form onSubmit={handleSubmit} className="pr-res-form">
                  <div className="pr-res-grid">
                    <div className="pr-form-field">
                      <label>Your Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Suresh Varma"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="pr-input"
                      />
                    </div>

                    <div className="pr-form-field">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. 9014498145"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="pr-input"
                      />
                    </div>
                  </div>

                  <div className="pr-res-grid">
                    <div className="pr-form-field">
                      <label>Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="pr-input"
                      />
                    </div>

                    <div className="pr-form-field">
                      <label>Preferred Time *</label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="pr-input"
                      >
                        <option value="12:00">12:00 PM (Lunch)</option>
                        <option value="13:00">01:00 PM (Lunch)</option>
                        <option value="14:00">02:00 PM (Lunch)</option>
                        <option value="18:30">06:30 PM (Dinner)</option>
                        <option value="19:30">07:30 PM (Dinner)</option>
                        <option value="20:30">08:30 PM (Dinner)</option>
                        <option value="21:30">09:30 PM (Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pr-res-grid">
                    <div className="pr-form-field">
                      <label>Number of Guests *</label>
                      <input
                        type="number"
                        name="guests"
                        min={1}
                        max={50}
                        value={form.guests}
                        onChange={handleChange}
                        required
                        className="pr-input"
                      />
                      {Number(form.guests) > 50 && (
                        <p className="pr-form-hint" role="status">
                          For more than 50 guests, please call us:{" "}
                          <a href={`tel:${RESTAURANT_PHONE_1}`}>{RESTAURANT_PHONE_1}</a>
                          {" or "}
                          <a href={`tel:${RESTAURANT_PHONE_2}`}>{RESTAURANT_PHONE_2}</a>
                        </p>
                      )}
                    </div>

                    <div className="pr-form-field">
                      <label>Seating Preference</label>
                      <select
                        name="seatingType"
                        value={form.seatingType}
                        onChange={handleChange}
                        className="pr-input"
                      >
                        <option value="Garden Seating">🌿 Open Garden Seating</option>
                        <option value="Private Hall">🎉 Private Party Hall (Up to 50 guests)</option>
                        <option value="Family Dining">👨‍👩‍👧‍👦 Family Dining Area</option>
                      </select>
                    </div>
                  </div>

                  <div className="pr-form-field">
                    <label>Occasion</label>
                    <select
                      name="occasion"
                      value={form.occasion}
                      onChange={handleChange}
                      className="pr-input"
                    >
                      <option value="Casual Dining">Casual Dining / Friends Get-together</option>
                      <option value="Birthday Party">Birthday Party Celebration</option>
                      <option value="College Reunion / Farewell">College Reunion / Farewell</option>
                      <option value="Family Dinner">Family Dinner</option>
                      <option value="Anniversary">Anniversary</option>
                    </select>
                  </div>

                  <div className="pr-form-field">
                    <label>Special Requests or Pre-Ordered Dishes (Optional)</label>
                    <textarea
                      name="note"
                      placeholder="e.g. Need birthday cake table setup, pre-order 5 Chicken Dum Biryanis & starters"
                      value={form.note}
                      onChange={handleChange}
                      rows={3}
                      className="pr-input"
                    />
                  </div>

                  <button type="submit" className="pr-btn pr-btn-submit-order">
                    <CalendarDays size={18} /> Complete Reservation →
                  </button>
                </form>
              </div>

              {/* Right Column: Perks & Amenities */}
              <div className="pr-booking-info-box">
                <div className="pr-res-badge-header">
                  <PartyPopper size={28} className="pr-gold-icon" />
                  <div>
                    <h3>Why Dine with Parichayam?</h3>
                    <p>Angallu&apos;s favorite family &amp; student celebration hotspot.</p>
                  </div>
                </div>

                <div className="pr-res-perks-list">
                  <div className="pr-res-perk">
                    <Sparkles size={18} className="pr-gold-icon" />
                    <div>
                      <strong>Private Party Hall Available</strong>
                      <p>Air-conditioned private room accommodating up to 50 guests with dedicated servers and party lighting.</p>
                    </div>
                  </div>

                  <div className="pr-res-perk">
                    <UtensilsCrossed size={18} className="pr-gold-icon" />
                    <div>
                      <strong>Outdoor Catering for Events</strong>
                      <p>Order bulk biryani handis, starters platters, and desserts delivered to your venue.</p>
                    </div>
                  </div>

                  <div className="pr-res-perk">
                    <ShieldCheck size={18} className="pr-gold-icon" />
                    <div>
                      <strong>No Hidden Reservation Charges</strong>
                      <p>Booking a table is 100% free. Pay only for the delicious food you enjoy!</p>
                    </div>
                  </div>
                </div>

                <div className="pr-res-call-box">
                  <p>Need urgent assistance or booking for more than 50 guests?</p>
                  <div className="pr-res-phones">
                    <a href={`tel:${RESTAURANT_PHONE_1}`}>📞 {RESTAURANT_PHONE_1}</a>
                    <a href={`tel:${RESTAURANT_PHONE_2}`}>📞 {RESTAURANT_PHONE_2}</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Location Map ───────────────────────────────────────── */}
      <RestaurantLocation />
    </main>
  );
}
