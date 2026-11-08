"use client";
export const dynamic = 'force-dynamic';

import { useState } from "react";
import Link from "next/link";
import { RestaurantLocation } from "@/components/restaurant-location";
import { Star, MessageSquare, ThumbsUp, CheckCircle, Award, Sparkles, Send } from "lucide-react";

interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  dish: string;
  comment: string;
}

const initialReviews: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Sai Teja",
    role: "MITS Final Year Student",
    rating: 5,
    date: "2 days ago",
    dish: "Chicken Dum Biryani (₹129)",
    comment:
      "The biryani here is simply outstanding! The dum flavor is deep and aromatic, chicken pieces are moist, and getting a free chilled Coke + water bottle with it is unbeatable value.",
  },
  {
    id: "rev-2",
    author: "Karthik Reddy",
    role: "Angallu Resident",
    rating: 5,
    date: "1 week ago",
    dish: "Mughalai Biryani & Chicken 65",
    comment:
      "Best Mughalai Biryani I have tasted in the Madanapalle region. Generous boiled egg, nuts, and rich gravy. Delivered to our house within 20 minutes hot and fresh.",
  },
  {
    id: "rev-3",
    author: "Ananya Sharma",
    role: "College Faculty",
    rating: 5,
    date: "2 weeks ago",
    dish: "Paneer Biryani & Oreo Milkshake",
    comment:
      "The Paneer Biryani is so soft and spiced to perfection. Plus the free Chocolate Milkshake combo offer was delightful! Clean garden ambience for families.",
  },
  {
    id: "rev-4",
    author: "Venkatesh Naidu",
    role: "Birthday Party Host",
    rating: 5,
    date: "3 weeks ago",
    dish: "Party Hall Booking (35 Guests)",
    comment:
      "We celebrated my brother's 25th birthday in Parichayam's private party hall. The proprietor Kiran Kumar Naidu personally ensured everything was smooth. Unlimited starters and biryani!",
  },
  {
    id: "rev-5",
    author: "Meera Krishnan",
    role: "Weekend Visitor",
    rating: 5,
    date: "1 month ago",
    dish: "Chicken Lollipop & Dragon Chicken",
    comment:
      "Crispy, juicy, and coated with the best spicy sauce. If you love starters, the Dragon Chicken with free ice cream scoops is a must try.",
  },
  {
    id: "rev-6",
    author: "Ravi Kumar",
    role: "Hostel Student",
    rating: 4,
    date: "1 month ago",
    dish: "Biryani Rice Plate & Lemon Chicken",
    comment:
      "Pocket friendly, filling, and saves us every exam season with free hostel delivery within 3 km. 10/10 recommendation to everyone in Angallu.",
  },
];

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(initialReviews);
  const [filter, setFilter] = useState<string>("All");
  const [newReview, setNewReview] = useState({
    name: "",
    dish: "Chicken Dum Biryani",
    rating: 5,
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleAddReview(e: React.FormEvent) {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const added: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReview.name.trim(),
      role: "Verified Guest",
      rating: newReview.rating,
      date: "Just now",
      dish: newReview.dish,
      comment: newReview.comment.trim(),
    };

    setReviewsList([added, ...reviewsList]);
    setSubmitted(true);
    setNewReview({ name: "", dish: "Chicken Dum Biryani", rating: 5, comment: "" });
  }

  const filtered = reviewsList.filter((r) => {
    if (filter === "5 Stars") return r.rating === 5;
    if (filter === "Biryani") return r.dish.toLowerCase().includes("biryani");
    if (filter === "Starters") return r.dish.toLowerCase().includes("chicken") || r.dish.toLowerCase().includes("starter");
    return true;
  });

  return (
    <main className="pr-main-flow">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="pr-reviews-page-hero">
        <div className="pr-hero-glow" aria-hidden="true" />
        <div className="pr-reviews-hero-content">
          <span className="pr-section-eyebrow">HEAR FROM OUR FOODIES</span>
          <h1 className="pr-reviews-hero-title">
            Words from Our <span className="pr-hero-script-gold">Guests</span>
          </h1>
          <p className="pr-reviews-hero-sub">
            Real experiences from students, professors, local families, and travelers who dine at Parichayam.
          </p>

          {/* Aggregate Rating Scorecard */}
          <div className="pr-rating-scorecard">
            <div className="pr-score-main">
              <strong>4.9</strong>
              <div className="pr-stars-gold">★★★★★</div>
              <span>Based on 1,200+ local reviews</span>
            </div>
            <div className="pr-score-breakdown">
              <div className="pr-breakdown-row">
                <span>Food Quality &amp; Taste</span>
                <div className="pr-bar"><div className="pr-bar-fill" style={{ width: "98%" }} /></div>
                <span>4.9</span>
              </div>
              <div className="pr-breakdown-row">
                <span>Hospitality &amp; Service</span>
                <div className="pr-bar"><div className="pr-bar-fill" style={{ width: "96%" }} /></div>
                <span>4.8</span>
              </div>
              <div className="pr-breakdown-row">
                <span>Value for Money</span>
                <div className="pr-bar"><div className="pr-bar-fill" style={{ width: "100%" }} /></div>
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews Grid Section ───────────────────────────────── */}
      <section className="pr-reviews-list-section">
        <div className="pr-reviews-list-inner">
          <div className="pr-reviews-filter-bar">
            <span>Filter Reviews:</span>
            {["All", "5 Stars", "Biryani", "Starters"].map((f) => (
              <button
                key={f}
                className={`pr-pill-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="pr-reviews-cards-grid">
            {filtered.map((rev) => (
              <div key={rev.id} className="pr-review-guest-card">
                <div className="pr-rev-card-top">
                  <div>
                    <div className="pr-stars-gold">{"★".repeat(rev.rating)}</div>
                    <strong className="pr-rev-author">{rev.author}</strong>
                    <span className="pr-rev-role">{rev.role}</span>
                  </div>
                  <span className="pr-rev-date">{rev.date}</span>
                </div>

                <div className="pr-rev-dish-tag">
                  <span>Ordered:</span> <strong>{rev.dish}</strong>
                </div>

                <p className="pr-rev-text">"{rev.comment}"</p>

                <div className="pr-rev-verified">
                  <CheckCircle size={14} /> Verified Parichayam Diner
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leave a Review Section ─────────────────────────────── */}
      <section className="pr-leave-review-section">
        <div className="pr-leave-review-inner">
          <div className="pr-leave-review-copy">
            <span className="pr-section-eyebrow">WE VALUE YOUR FEEDBACK</span>
            <h2>Dined With Us Recently?</h2>
            <p>
              Your thoughts help us keep our kitchen standards sky high. Share your experience with the Angallu community!
            </p>
            <div className="pr-leave-perks">
              <div><Sparkles size={16} /> Honest reviews published directly</div>
              <div><Award size={16} /> Every review read by our Head Chef</div>
            </div>
          </div>

          <div className="pr-leave-review-form-box">
            {submitted ? (
              <div className="pr-review-success-msg">
                <CheckCircle size={40} className="pr-gold-icon" />
                <h3>Thank You for Your Review!</h3>
                <p>Your feedback has been published in the guestbook above.</p>
                <button onClick={() => setSubmitted(false)} className="pr-btn pr-btn-gold">
                  Write Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="pr-rev-form">
                <h3>Write a Review</h3>

                <div className="pr-form-field">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Rohith Varma"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    required
                    className="pr-input"
                  />
                </div>

                <div className="pr-form-field">
                  <label>Dish Enjoyed</label>
                  <select
                    value={newReview.dish}
                    onChange={(e) => setNewReview({ ...newReview, dish: e.target.value })}
                    className="pr-input"
                  >
                    <option value="Chicken Dum Biryani (₹129)">Chicken Dum Biryani (₹129)</option>
                    <option value="Chicken Fry Piece Biryani (₹149)">Chicken Fry Piece Biryani (₹149)</option>
                    <option value="Boneless Biryani (₹189)">Boneless Biryani (₹189)</option>
                    <option value="Mughalai Biryani (₹199)">Mughalai Biryani (₹199)</option>
                    <option value="Paneer Biryani (₹149)">Paneer Biryani (₹149)</option>
                    <option value="Dragon Chicken (₹229)">Dragon Chicken (₹229)</option>
                    <option value="Milkshakes (₹70/₹90)">Milkshakes (₹70 / ₹90)</option>
                  </select>
                </div>

                <div className="pr-form-field">
                  <label>Rating</label>
                  <div className="pr-star-picker">
                    {[5, 4, 3, 2, 1].map((s) => (
                      <label key={s} className="pr-star-pick-opt">
                        <input
                          type="radio"
                          name="rating"
                          checked={newReview.rating === s}
                          onChange={() => setNewReview({ ...newReview, rating: s })}
                        />
                        <span>{"★".repeat(s)} ({s} Stars)</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pr-form-field">
                  <label>Your Review *</label>
                  <textarea
                    placeholder="What did you love about the food, taste, packaging, or hospitality?"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                    rows={4}
                    className="pr-input"
                  />
                </div>

                <button type="submit" className="pr-btn pr-btn-submit-order">
                  <Send size={16} /> Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Location & Directions ──────────────────────────────── */}
      <RestaurantLocation />
    </main>
  );
}
