"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, Truck, CheckCircle2, MessageSquare, MapPin, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useMenuItems } from "@/lib/menu-store";
import { useRestaurantInfo } from "@/lib/restaurant-info-store";
import { saveOrderToStore, OrderRecord } from "@/lib/orders-store";
import { buildWhatsAppOrderLink } from "@/lib/restaurant-menu";

export function OrderExperience() {
  const { cart, setQuantity, removeFromCart, clearCart } = useCart();
  const { items } = useMenuItems();
  const { info } = useRestaurantInfo();

  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">("delivery");
  const [deliveryDistance, setDeliveryDistance] = useState<"within3km" | "beyond3km">("within3km");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "upi">("cash");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    notes: ""
  });
  const [formError, setFormError] = useState("");
  const [placedOrder, setPlacedOrder] = useState<OrderRecord | null>(null);

  // Match items in cart
  const cartLines = useMemo(() => {
    return cart
      .map((line) => {
        const item = items.find((i) => i.id === line.itemId);
        return item ? { line, item } : null;
      })
      .filter((entry): entry is { line: typeof cart[0]; item: typeof items[0] } => Boolean(entry));
  }, [cart, items]);

  const subtotal = useMemo(() => {
    return cartLines.reduce((sum, { line, item }) => sum + (item.price ?? 0) * line.quantity, 0);
  }, [cartLines]);

  function handleInputChange(field: keyof typeof customer, value: string) {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setFormError("");

    // Auto-detect if customer address mentions areas beyond 3km
    if (field === "address") {
      const lower = value.toLowerCase();
      if (
        lower.includes("madanapalle") ||
        lower.includes("mpl") ||
        lower.includes("kurabalakota") ||
        lower.includes("valmikipuram") ||
        lower.includes("beyond") ||
        lower.includes("outskirts")
      ) {
        setDeliveryDistance("beyond3km");
      }
    }
  }

  function handleConfirmOrder(e: React.FormEvent) {
    e.preventDefault();

    if (cartLines.length === 0) {
      setFormError("Your cart is empty. Please add items to proceed.");
      return;
    }

    const cleanPhone = customer.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setFormError("Please enter a valid 10-digit mobile number so we can reach you.");
      return;
    }

    if (deliveryMode === "delivery" && !customer.address.trim()) {
      setFormError("Please enter your delivery address, hostel, or PG name.");
      return;
    }

    const isBeyond3km = deliveryMode === "delivery" && deliveryDistance === "beyond3km";

    // Save order into the live admin store
    const orderData = {
      customerName: customer.name.trim(),
      phone: cleanPhone,
      address: deliveryMode === "delivery" ? customer.address.trim() : "Self Pickup at Restaurant",
      landmark: customer.landmark.trim() || undefined,
      notes: customer.notes.trim() || undefined,
      deliveryMode,
      paymentMethod,
      isBeyond3km,
      items: cartLines.map(({ line, item }) => ({
        id: item.id,
        name: item.name,
        quantity: line.quantity,
        price: item.price ?? 0,
        specialOffer: item.specialOffer
      })),
      subtotal
    };

    const saved = saveOrderToStore(orderData);
    setPlacedOrder(saved);
    clearCart();

    // Prepare WhatsApp URL according to distance (Within 3km vs Beyond 3km)
    const waUrl = buildWhatsAppOrderLink({
      customerName: saved.customerName,
      phone: saved.phone,
      address: saved.address,
      instructions: saved.notes,
      isBeyond3km,
      items: saved.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        offer: i.specialOffer
      })),
      total: saved.subtotal
    });

    // Auto-open WhatsApp in a new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }
  }

  // If order was successfully placed
  if (placedOrder) {
    const waUrl = buildWhatsAppOrderLink({
      customerName: placedOrder.customerName,
      phone: placedOrder.phone,
      address: placedOrder.address,
      instructions: placedOrder.notes,
      isBeyond3km: placedOrder.isBeyond3km,
      items: placedOrder.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        offer: i.specialOffer
      })),
      total: placedOrder.subtotal
    });

    return (
      <main className="pr-order-page-wrap">
        <div className="pr-order-success-card">
          <div className="pr-order-success-icon"><CheckCircle2 size={48} /></div>
          <span className="pr-order-tag">ORDER CONFIRMED</span>
          <h1 className="pr-order-success-title">Thank You, {placedOrder.customerName}!</h1>
          <p className="pr-order-number">Order ID: <strong>{placedOrder.orderNumber}</strong></p>
          <p className="pr-order-success-text">
            Your order has been recorded in our restaurant kitchen and sent to WhatsApp.
            Our team will confirm and prepare it hot and fresh!
          </p>

          <div className="pr-order-receipt">
            <h3>Order Summary</h3>
            <div className="pr-receipt-items">
              {placedOrder.items.map((item) => (
                <div key={item.id} className="pr-receipt-row">
                  <div>
                    <span>{item.name} × {item.quantity}</span>
                    {item.specialOffer && (
                      <span className="pr-receipt-offer">🎁 {item.specialOffer}</span>
                    )}
                  </div>
                  <strong>₹{item.price * item.quantity}</strong>
                </div>
              ))}
            </div>
            <div className="pr-receipt-total">
              <span>Total Payable</span>
              <strong>₹{placedOrder.subtotal}</strong>
            </div>
          </div>

          <div className="pr-order-success-actions">
            <a href={waUrl} target="_blank" rel="noreferrer" className="pr-btn pr-btn-whatsapp">
              <MessageSquare size={18} /> Open WhatsApp to Confirm
            </a>
            <Link href="/menu" className="pr-btn pr-btn-outline-dark">
              Order More Items
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pr-order-page-wrap">
      {/* Header */}
      <div className="pr-order-hero">
        <Link href="/menu" className="pr-back-link">
          <ArrowLeft size={16} /> Back to Menu
        </Link>
        <span className="pr-section-eyebrow">CHECKOUT &amp; CONFIRMATION</span>
        <h1 className="pr-order-heading">Your Order</h1>
        <p className="pr-order-sub">Review items, provide delivery details, and confirm via WhatsApp.</p>
      </div>

      {cartLines.length === 0 ? (
        <div className="pr-order-empty-wrap">
          <div className="pr-order-empty-icon"><ShoppingBag size={42} /></div>
          <h2>Your cart is currently empty</h2>
          <p>Explore our biryani, starters, and milkshakes to add items to your cart.</p>
          <Link href="/menu" className="pr-btn pr-btn-gold" style={{ marginTop: "1rem" }}>
            Explore Menu Now →
          </Link>
        </div>
      ) : (
        <div className="pr-order-grid">
          {/* Left Column: Cart items */}
          <div className="pr-order-cart-card">
            <div className="pr-cart-card-header">
              <h2>Items in Cart ({cartLines.length})</h2>
              <span className="pr-free-delivery-badge">
                <Truck size={14} /> Free Delivery within 3 km
              </span>
            </div>

            <div className="pr-cart-list">
              {cartLines.map(({ line, item }) => (
                <div key={item.id} className="pr-cart-item">
                  <div className="pr-cart-item-photo">
                    <Image
                      src={
                        item.photoPath ||
                        (item.isVeg ? "/images/paneer-curry.png" : "/images/chicken-biryani.png")
                      }
                      alt={item.name}
                      width={70}
                      height={70}
                      className="pr-cart-thumb"
                    />
                  </div>

                  <div className="pr-cart-item-details">
                    <div className="pr-cart-item-top">
                      <strong className="pr-cart-item-title">{item.name}</strong>
                      <span className="pr-cart-item-price">₹{(item.price ?? 0) * line.quantity}</span>
                    </div>

                    {item.specialOffer && (
                      <div className="pr-cart-offer">
                        <Sparkles size={12} />
                        <span>{item.specialOffer}</span>
                      </div>
                    )}

                    <div className="pr-cart-item-bottom">
                      <div className="pr-cart-qty-wrap">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, line.quantity - 1)}
                          className="pr-qty-btn"
                          aria-label="Decrease"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="pr-qty-count">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, line.quantity + 1)}
                          className="pr-qty-btn"
                          aria-label="Increase"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="pr-remove-btn"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pr-cart-subtotal-box">
              <div className="pr-subtotal-row">
                <span>Items Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <div className="pr-subtotal-row">
                <span>Delivery (within 3 km)</span>
                <span className="pr-free-tag">FREE</span>
              </div>
              <div className="pr-subtotal-row pr-total-row">
                <span>Total Amount</span>
                <span className="pr-total-val">₹{subtotal}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="pr-order-form-card">
            <h2>Delivery &amp; Customer Details</h2>

            {formError && (
              <div className="pr-form-error" role="alert">
                {formError}
              </div>
            )}

            <form onSubmit={handleConfirmOrder}>
              {/* Delivery mode */}
              <div className="pr-toggle-group">
                <button
                  type="button"
                  className={`pr-toggle-btn ${deliveryMode === "delivery" ? "active" : ""}`}
                  onClick={() => setDeliveryMode("delivery")}
                >
                  <Truck size={16} /> Doorstep Delivery
                </button>
                <button
                  type="button"
                  className={`pr-toggle-btn ${deliveryMode === "pickup" ? "active" : ""}`}
                  onClick={() => setDeliveryMode("pickup")}
                >
                  <MapPin size={16} /> Self Pickup
                </button>
              </div>

              <div className="pr-form-field">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={customer.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="pr-input"
                />
              </div>

              <div className="pr-form-field">
                <label>Phone Number (10 digits) *</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={customer.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="pr-input"
                />
              </div>

              {deliveryMode === "delivery" && (
                <>
                  <div className="pr-form-field">
                    <label>Delivery Address / Hostel / PG *</label>
                    <textarea
                      placeholder="e.g. Room 302, Boys Hostel 2, Near MITS College, Angallu"
                      value={customer.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                      rows={2}
                      className="pr-input"
                    />
                  </div>

                  <div className="pr-form-field">
                    <label>Landmark (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Opposite College Gate, Behind canteen"
                      value={customer.landmark}
                      onChange={(e) => handleInputChange("landmark", e.target.value)}
                      className="pr-input"
                    />
                  </div>

                  <div className="pr-form-field">
                    <label>Delivery Distance *</label>
                    <div className="pr-distance-radios">
                      <label className={`pr-distance-choice ${deliveryDistance === "within3km" ? "active" : ""}`}>
                        <input
                          type="radio"
                          name="deliveryRadius"
                          checked={deliveryDistance === "within3km"}
                          onChange={() => setDeliveryDistance("within3km")}
                        />
                        <div>
                          <strong>Within 3 km (Angallu / MITS)</strong>
                          <span>✨ FREE Delivery</span>
                        </div>
                      </label>

                      <label className={`pr-distance-choice ${deliveryDistance === "beyond3km" ? "active" : ""}`}>
                        <input
                          type="radio"
                          name="deliveryRadius"
                          checked={deliveryDistance === "beyond3km"}
                          onChange={() => setDeliveryDistance("beyond3km")}
                        />
                        <div>
                          <strong>Beyond 3 km Radius</strong>
                          <span>Delivery charges apply based on distance</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="pr-form-field">
                <label>Cooking Instructions / Special Requests</label>
                <input
                  type="text"
                  placeholder="e.g. Extra spicy, extra onion & lemon, deliver by 1:30 PM"
                  value={customer.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="pr-input"
                />
              </div>

              {/* Payment Method */}
              <div className="pr-form-field">
                <label>Payment Preference</label>
                <div className="pr-radio-group">
                  <label className="pr-radio-label">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                    />
                    <span>Cash on Delivery / Pickup</span>
                  </label>
                  <label className="pr-radio-label">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                    />
                    <span>UPI on Delivery / Pickup (GPay / PhonePe)</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="pr-btn pr-btn-submit-order">
                <MessageSquare size={18} /> Confirm &amp; Place Order via WhatsApp →
              </button>
              <p className="pr-order-disclaimer">
                Clicking will record your order in our kitchen system and redirect to WhatsApp at +91 {info.phone1} to confirm preparation!
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
