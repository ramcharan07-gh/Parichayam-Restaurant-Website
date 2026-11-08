"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Check, Plus, Minus, Sparkles, Flame, Gift } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useMenuItems } from "@/lib/menu-store";
import { MenuItem } from "@/lib/menu-data";

export function InteractiveMenu() {
  const router = useRouter();
  const { items } = useMenuItems();
  const { cart, addToCart, setQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories = ["All", "Non-Veg Biryani", "Veg Biryani", "Non-Veg Starters", "Regular Milkshakes", "Double Milkshakes"];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (!item.isPublished) return false;
      if (activeCategory !== "All" && item.category !== activeCategory) return false;
      if (dietaryFilter === "veg" && !item.isVeg) return false;
      if (dietaryFilter === "non-veg" && item.isVeg) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.specialOffer && item.specialOffer.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [items, activeCategory, dietaryFilter, searchQuery]);

  function getCartQuantity(itemId: string): number {
    const found = cart.find((c) => c.itemId === itemId);
    return found ? found.quantity : 0;
  }

  function handleAddToCart(item: MenuItem) {
    addToCart(item.id);
    setAddedToast(`Added ${item.name} to cart!`);
    setTimeout(() => setAddedToast(null), 2500);
  }

  function handleQuickOrder(item: MenuItem) {
    addToCart(item.id);
    router.push("/order");
  }

  return (
    <div className="im-container">
      {/* Toast Notification */}
      {addedToast && (
        <div className="im-toast" role="alert">
          <Check size={16} />
          <span>{addedToast}</span>
          <Link href="/order" className="im-toast-link">View Cart →</Link>
        </div>
      )}

      {/* Special Offer Highlight Strip */}
      <div className="im-offers-banner">
        <div className="im-offers-icon"><Gift size={24} /></div>
        <div className="im-offers-text">
          <strong>Special Combo Offers Included!</strong>
          <p>Every Biryani &amp; Starter comes with complimentary gifts — Free Coke, Water Bottle, Ice Cream, or thick Milkshakes as printed on our poster!</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="im-toolbar">
        <div className="im-search-wrap">
          <Search size={18} className="im-search-icon" />
          <input
            type="text"
            placeholder="Search Chicken Dum Biryani, Starters, Milkshakes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="im-search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="im-search-clear">×</button>
          )}
        </div>

        <div className="im-dietary-pills">
          <button
            className={`im-diet-btn ${dietaryFilter === "all" ? "active" : ""}`}
            onClick={() => setDietaryFilter("all")}
          >
            All Items
          </button>
          <button
            className={`im-diet-btn veg ${dietaryFilter === "veg" ? "active" : ""}`}
            onClick={() => setDietaryFilter("veg")}
          >
            <span className="veg-dot" /> Pure Veg
          </button>
          <button
            className={`im-diet-btn non-veg ${dietaryFilter === "non-veg" ? "active" : ""}`}
            onClick={() => setDietaryFilter("non-veg")}
          >
            <span className="non-veg-dot" /> Non-Veg
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="im-categories-scroll">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`im-cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Item Count */}
      <div className="im-count-row">
        <span>Showing <strong>{filteredItems.length}</strong> items</span>
        {activeCategory !== "All" && (
          <button onClick={() => setActiveCategory("All")} className="im-reset-btn">
            View All Categories
          </button>
        )}
      </div>

      {/* Menu Cards Grid */}
      <div className="im-grid">
        {filteredItems.map((item) => {
          const qty = getCartQuantity(item.id);
          const displayPrice = item.price ? `₹${item.price}` : item.posterPrice || "₹--";

          return (
            <div key={item.id} className="im-card">
              {/* Card Header & Badges */}
              <div className="im-card-top">
                <div className="im-dietary-badge">
                  <span className={`im-food-type ${item.isVeg ? "veg" : "non-veg"}`}>
                    <span className="food-type-symbol" />
                  </span>
                  <span className="im-category-tag">{item.category}</span>
                </div>
                {item.name.toLowerCase().includes("dum") ||
                item.name.toLowerCase().includes("fry") ||
                item.name.toLowerCase().includes("paneer") ||
                item.name.toLowerCase().includes("dragon") ? (
                  <span className="im-badge-popular">
                    <Flame size={12} /> Popular
                  </span>
                ) : null}
              </div>

              {/* Photo or Visual Placeholder */}
              <div className="im-card-img-wrap">
                <Image
                  src={
                    item.photoPath ||
                    (item.isVeg ? "/images/menu/paneer-biryani.jpg" : "/images/menu/chicken-dum-biryani.jpg")
                  }
                  alt={item.name}
                  width={360}
                  height={220}
                  className="im-card-img"
                />
                <span className="im-price-tag">{displayPrice}</span>
              </div>

              {/* Dish Info */}
              <div className="im-card-body">
                <h3 className="im-card-title">{item.name}</h3>

                {/* Poster Special Combo Offer Badge */}
                {item.specialOffer ? (
                  <div className="im-combo-offer">
                    <Sparkles size={13} className="im-combo-icon" />
                    <span><strong>Free:</strong> {item.specialOffer.replace(/^Free\s*/i, "")}</span>
                  </div>
                ) : (
                  <div className="im-combo-offer" style={{ opacity: 0.85, borderStyle: "dotted" }}>
                    <Sparkles size={13} className="im-combo-icon" />
                    <span>Authentic Hyderabadi dum preparation</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="im-card-actions">
                {qty > 0 ? (
                  <div className="im-qty-controls">
                    <button
                      onClick={() => setQuantity(item.id, qty - 1)}
                      className="im-qty-btn"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="im-qty-val">{qty} in cart</span>
                    <button
                      onClick={() => setQuantity(item.id, qty + 1)}
                      className="im-qty-btn"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="im-btn im-btn-add"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                )}

                <button
                  onClick={() => handleQuickOrder(item)}
                  className="im-btn im-btn-order"
                >
                  Order Now →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="im-empty">
          <p>No dishes match your current search.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
              setDietaryFilter("all");
            }}
            className="im-btn im-btn-order"
            style={{ margin: "1rem auto 0", display: "inline-block" }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
