"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useOrders, useReservations, OrderStatus } from "@/lib/orders-store";
import { useMenuItems } from "@/lib/menu-store";
import { useRestaurantInfo } from "@/lib/restaurant-info-store";
import { MenuItem, MENU_CATEGORIES, MenuCategory } from "@/lib/menu-data";
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  CalendarCheck,
  Phone,
  MessageSquare,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
  ExternalLink,
  ChefHat,
  Plus,
  Edit,
  Save,
  X,
  RotateCcw,
  Sparkles,
  Lock
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default function AdminPortalPage() {
  const { orders, updateStatus, deleteOrder } = useOrders();
  const { reservations } = useReservations();
  const { items, saveMenuItems } = useMenuItems();
  const { info, updateInfo, resetInfo } = useRestaurantInfo();

  // Admin PIN Gate State (Hidden from general public, protected with 9014 PIN)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = sessionStorage.getItem("pr_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (pinInput.trim() === "9014") {
      setIsAuthenticated(true);
      sessionStorage.setItem("pr_admin_auth", "true");
      setPinError("");
      setPinInput("");
    } else {
      setPinError("Incorrect PIN. Please enter the correct 4-digit security code.");
    }
  }

  function handleLockPortal() {
    setIsAuthenticated(false);
    sessionStorage.removeItem("pr_admin_auth");
  }

  const [activeTab, setActiveTab] = useState<"orders" | "reservations" | "menu" | "settings">("orders");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [orderSearch, setOrderSearch] = useState<string>("");

  // Menu editing state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNewItem, setIsAddingNewItem] = useState<boolean>(false);
  const [newItemData, setNewItemData] = useState<Partial<MenuItem>>({
    name: "",
    category: "Non-Veg Biryani",
    price: 129,
    posterPrice: "₹129",
    specialOffer: "",
    description: "",
    photoPath: "/images/chicken-biryani.png",
    isVeg: false,
    isAvailable: true,
    isPublished: true
  });
  const [menuActionToast, setMenuActionToast] = useState<string | null>(null);

  // Restaurant details editing state
  const [isEditingSettings, setIsEditingSettings] = useState<boolean>(false);
  const [settingsFormData, setSettingsFormData] = useState(info);
  const [settingsToast, setSettingsToast] = useState<string | null>(null);

  // Statistics
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.subtotal, 0);
  const activeOrdersCount = orders.filter(
    (o) => o.status === "New" || o.status === "Confirmed" || o.status === "Preparing" || o.status === "Out for Delivery"
  ).length;

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "All" && o.status !== statusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  function showToast(msg: string) {
    setMenuActionToast(msg);
    setTimeout(() => setMenuActionToast(null), 3000);
  }

  // Stock toggle
  function toggleItemAvailability(itemId: string) {
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    );
    saveMenuItems(updated);
    showToast("Stock status updated");
  }

  // Save edited item
  function handleSaveEditedItem(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;
    const updated = items.map((item) => (item.id === editingItem.id ? editingItem : item));
    saveMenuItems(updated);
    setEditingItem(null);
    showToast(`Updated "${editingItem.name}" successfully!`);
  }

  // Delete item
  function handleDeleteItem(item: MenuItem) {
    if (confirm(`Are you sure you want to remove "${item.name}" from the menu?`)) {
      const updated = items.filter((i) => i.id !== item.id);
      saveMenuItems(updated);
      showToast(`Removed "${item.name}" from the menu.`);
    }
  }

  // Add new item
  function handleCreateNewItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItemData.name?.trim()) return;

    const id = `item-${Date.now()}`;
    const itemToAdd: MenuItem = {
      id,
      name: newItemData.name.trim(),
      category: (newItemData.category as MenuCategory) || "Non-Veg Biryani",
      price: newItemData.price !== undefined ? Number(newItemData.price) : 129,
      posterPrice: newItemData.posterPrice || `₹${newItemData.price || 129}`,
      specialOffer: newItemData.specialOffer?.trim() || undefined,
      description: newItemData.description?.trim() || "Freshly made to order.",
      photoPath: newItemData.photoPath || (newItemData.isVeg ? "/images/paneer-curry.png" : "/images/chicken-biryani.png"),
      isVeg: Boolean(newItemData.isVeg),
      isAvailable: true,
      isPublished: true
    };

    saveMenuItems([...items, itemToAdd]);
    setIsAddingNewItem(false);
    setNewItemData({
      name: "",
      category: "Non-Veg Biryani",
      price: 129,
      posterPrice: "₹129",
      specialOffer: "",
      description: "",
      photoPath: "/images/chicken-biryani.png",
      isVeg: false,
      isAvailable: true,
      isPublished: true
    });
    showToast(`Added new dish "${itemToAdd.name}" to the menu!`);
  }

  // Save settings
  function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    updateInfo(settingsFormData);
    setIsEditingSettings(false);
    setSettingsToast("Restaurant details updated live across website!");
    setTimeout(() => setSettingsToast(null), 3500);
  }

  // Organize menu items by category
  const categoriesList = Array.from(new Set(items.map((i) => i.category)));

  // If not authenticated, show the private PIN security gate
  if (!isAuthenticated) {
    return (
      <main className="pr-admin-pin-screen">
        <div className="pr-admin-pin-card">
          <div className="pr-admin-pin-header">
            <div className="pr-admin-pin-icon-wrap">
              <Lock size={32} />
            </div>
            <span className="pr-offer-pill-badge">STAFF ONLY</span>
            <h1 className="pr-admin-pin-title">Restaurant Management Portal</h1>
            <p className="pr-admin-pin-desc">
              This area is restricted to authorized restaurant staff and management.
              Please enter your 4-digit security PIN to access orders, bookings, and menu management.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="pr-admin-pin-form">
            <div className="pr-admin-pin-input-wrap">
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value.replace(/\D/g, ""));
                  if (pinError) setPinError("");
                }}
                placeholder="••••"
                className="pr-admin-pin-input"
                autoFocus
              />
            </div>

            {pinError && <p className="pr-admin-pin-error">{pinError}</p>}

            <button type="submit" className="pr-admin-pin-submit">
              Unlock Portal →
            </button>

            <p className="pr-admin-pin-hint">
              💡 Staff Passcode: <strong>9014</strong> (proprietor contact prefix)
            </p>
          </form>

          <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
            <Link href="/" className="pr-admin-pin-back">
              ← Return to Customer Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pr-admin-wrap">
      {/* Toast Notification */}
      {menuActionToast && (
        <div className="im-toast" role="alert">
          <CheckCircle size={16} />
          <span>{menuActionToast}</span>
        </div>
      )}
      {settingsToast && (
        <div className="im-toast" role="alert">
          <CheckCircle size={16} />
          <span>{settingsToast}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <div className="pr-admin-top">
        <div>
          <div className="pr-admin-badge">
            <span className="pr-admin-live-dot" /> LIVE KITCHEN &amp; ORDERS DASHBOARD
          </div>
          <h1 className="pr-admin-title">{info.name} — Admin Portal</h1>
          <p className="pr-admin-sub">
            Proprietor: <strong>{info.proprietor}</strong> • {info.address}
          </p>
        </div>
        <div className="pr-admin-quick-actions">
          <button
            onClick={handleLockPortal}
            className="pr-btn pr-btn-outline"
            style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", borderColor: "#EF4444", color: "#EF4444" }}
            title="Lock portal and require PIN"
          >
            <Lock size={13} style={{ display: "inline", marginRight: 4 }} /> Lock Portal
          </button>
          <Link href="/" className="pr-btn pr-btn-outline" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
            View Customer Site <ExternalLink size={13} />
          </Link>
          <Link href="/menu" className="pr-btn pr-btn-gold" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
            Open Menu
          </Link>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="pr-admin-stats-grid">
        <div className="pr-stat-card">
          <div className="pr-stat-icon gold"><TrendingUp size={22} /></div>
          <div>
            <span className="pr-stat-label">Total Revenue</span>
            <strong className="pr-stat-val">₹{totalRevenue.toLocaleString("en-IN")}</strong>
            <span className="pr-stat-note">From all valid orders</span>
          </div>
        </div>

        <div className="pr-stat-card">
          <div className="pr-stat-icon green"><ShoppingBag size={22} /></div>
          <div>
            <span className="pr-stat-label">Total Orders</span>
            <strong className="pr-stat-val">{orders.length}</strong>
            <span className="pr-stat-note">Received through website</span>
          </div>
        </div>

        <div className="pr-stat-card">
          <div className="pr-stat-icon orange"><Clock size={22} /></div>
          <div>
            <span className="pr-stat-label">Active in Kitchen</span>
            <strong className="pr-stat-val">{activeOrdersCount}</strong>
            <span className="pr-stat-note">Pending or in preparation</span>
          </div>
        </div>

        <div className="pr-stat-card">
          <div className="pr-stat-icon blue"><CalendarCheck size={22} /></div>
          <div>
            <span className="pr-stat-label">Table Reservations</span>
            <strong className="pr-stat-val">{reservations.length}</strong>
            <span className="pr-stat-note">Garden &amp; dining bookings</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="pr-admin-tabs-nav">
        <button
          className={`pr-admin-tab-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <ShoppingBag size={16} /> Orders Received ({orders.length})
        </button>
        <button
          className={`pr-admin-tab-btn ${activeTab === "reservations" ? "active" : ""}`}
          onClick={() => setActiveTab("reservations")}
        >
          <CalendarCheck size={16} /> Table Bookings ({reservations.length})
        </button>
        <button
          className={`pr-admin-tab-btn ${activeTab === "menu" ? "active" : ""}`}
          onClick={() => setActiveTab("menu")}
        >
          <ChefHat size={16} /> Menu &amp; Stock Manager ({items.length})
        </button>
        <button
          className={`pr-admin-tab-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("settings");
            setSettingsFormData(info);
          }}
        >
          Restaurant Details &amp; Contact
        </button>
      </div>

      {/* TAB 1: ORDERS RECEIVED */}
      {activeTab === "orders" && (
        <section className="pr-admin-section">
          {/* Filter Bar */}
          <div className="pr-admin-filter-bar">
            <div className="pr-admin-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by Order #, Customer Name, Phone, Address..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
              />
            </div>

            <div className="pr-admin-status-pills">
              {["All", "New", "Preparing", "Out for Delivery", "Delivered", "Cancelled"].map((st) => (
                <button
                  key={st}
                  className={`pr-pill-btn ${statusFilter === st ? "active" : ""}`}
                  onClick={() => setStatusFilter(st)}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="pr-admin-empty">
              <p>No orders found matching the filter.</p>
            </div>
          ) : (
            <div className="pr-admin-orders-list">
              {filteredOrders.map((order) => (
                <div key={order.id} className={`pr-admin-order-card status-${order.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {/* Top Bar */}
                  <div className="pr-order-card-header">
                    <div className="pr-order-meta">
                      <strong className="pr-order-id-badge">{order.orderNumber}</strong>
                      <span className="pr-order-time">
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
                        {" • "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`pr-badge-mode ${order.deliveryMode}`}>
                        {order.deliveryMode === "delivery" ? "🚚 Doorstep Delivery" : "🛍️ Self Pickup"}
                      </span>
                    </div>

                    {/* Status Changer */}
                    <div className="pr-order-status-wrap">
                      <label>Status:</label>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                        className={`pr-status-select status-${order.status.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <option value="New">🟡 New Order</option>
                        <option value="Confirmed">🔵 Confirmed</option>
                        <option value="Preparing">🟠 Preparing</option>
                        <option value="Out for Delivery">🟣 Out for Delivery</option>
                        <option value="Delivered">🟢 Delivered</option>
                        <option value="Cancelled">🔴 Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="pr-order-customer-box">
                    <div>
                      <span className="pr-label-mini">CUSTOMER</span>
                      <strong className="pr-cust-name">{order.customerName}</strong>
                    </div>
                    <div>
                      <span className="pr-label-mini">PHONE</span>
                      <a href={`tel:${order.phone}`} className="pr-cust-phone">📞 {order.phone}</a>
                    </div>
                    <div>
                      <span className="pr-label-mini">DELIVERY ADDRESS</span>
                      <p className="pr-cust-addr">
                        {order.address}
                        {order.landmark && <span className="pr-cust-landmark"> (Landmark: {order.landmark})</span>}
                      </p>
                    </div>
                    {order.notes && (
                      <div className="pr-order-notes-box">
                        <span className="pr-label-mini">SPECIAL INSTRUCTIONS</span>
                        <p className="pr-cust-notes">"{order.notes}"</p>
                      </div>
                    )}
                  </div>

                  {/* Items list */}
                  <div className="pr-order-items-table">
                    <span className="pr-label-mini">ORDERED ITEMS</span>
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx} className="pr-order-item-row">
                          <span className="pr-item-name">
                            <strong>{item.quantity}×</strong> {item.name}
                            {item.specialOffer && (
                              <span className="pr-item-offer-pill">🎁 {item.specialOffer}</span>
                            )}
                          </span>
                          <span className="pr-item-cost">₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Bar: Total & Actions */}
                  <div className="pr-order-card-footer">
                    <div className="pr-order-total-block">
                      <span>Total Amount:</span>
                      <strong>₹{order.subtotal}</strong>
                      <span className="pr-payment-tag">
                        Paid via {order.paymentMethod.toUpperCase()}
                      </span>
                    </div>

                    <div className="pr-order-action-btns">
                      <a
                        href={`https://wa.me/91${order.phone}?text=${encodeURIComponent(
                          `Hello ${order.customerName}, regarding your Parichayam order ${order.orderNumber}: Your order is ${order.status.toLowerCase()}!`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="pr-btn-mini pr-btn-wa"
                      >
                        <MessageSquare size={14} /> WhatsApp
                      </a>
                      <a href={`tel:${order.phone}`} className="pr-btn-mini pr-btn-call">
                        <Phone size={14} /> Call
                      </a>
                      <button
                        onClick={() => {
                          if (confirm(`Delete order ${order.orderNumber}?`)) {
                            deleteOrder(order.id);
                          }
                        }}
                        className="pr-btn-mini pr-btn-del"
                        title="Delete order"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TAB 2: TABLE RESERVATIONS */}
      {activeTab === "reservations" && (
        <section className="pr-admin-section">
          <div className="pr-admin-reservations-list">
            {reservations.length === 0 ? (
              <div className="pr-admin-empty">
                <p>No table reservations made yet. Bookings from the /booking page will appear here instantly!</p>
              </div>
            ) : (
              <table className="pr-admin-table">
                <thead>
                  <tr>
                    <th>Date &amp; Time</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Guests</th>
                    <th>Special Requests</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((res) => (
                    <tr key={res.id}>
                      <td><strong>{res.date}</strong> at {res.time}</td>
                      <td>{res.name}</td>
                      <td><a href={`tel:${res.phone}`} className="pr-gold-link">📞 {res.phone}</a></td>
                      <td><strong>{res.guests} Guests</strong></td>
                      <td>{res.note || "Standard garden table"}</td>
                      <td><span className="pr-status-pill">{res.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {/* TAB 3: MENU & STOCK MANAGER (ORGANIZED BY SECTION WITH EDIT & ADD) */}
      {activeTab === "menu" && (
        <section className="pr-admin-section">
          {/* Menu Manager Header & Add Button */}
          <div className="pr-menu-manager-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--pr-forest)", margin: 0 }}>
                Menu Catalog &amp; Section Manager
              </h2>
              <p style={{ margin: "4px 0 0", color: "var(--pr-muted)", fontSize: "0.88rem" }}>
                Organized by menu sections. Edit prices, gifts, details, or add new dishes.
              </p>
            </div>
            <button
              onClick={() => setIsAddingNewItem(true)}
              className="pr-btn pr-btn-gold"
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem" }}
            >
              <Plus size={16} /> Add New Dish
            </button>
          </div>

          {/* Modal / Form: Add New Dish */}
          {isAddingNewItem && (
            <div className="pr-admin-modal-overlay">
              <div className="pr-admin-modal-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", color: "var(--pr-forest)" }}>Add New Menu Dish</h3>
                  <button onClick={() => setIsAddingNewItem(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleCreateNewItem} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div className="pr-form-field">
                    <label>Dish Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Special Hyderabadi Haleem"
                      value={newItemData.name}
                      onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="pr-form-field">
                      <label>Section / Category *</label>
                      <select
                        value={newItemData.category}
                        onChange={(e) => setNewItemData({ ...newItemData, category: e.target.value as MenuCategory })}
                        className="pr-input"
                      >
                        {MENU_CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="pr-form-field">
                      <label>Numeric Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={newItemData.price || ""}
                        onChange={(e) => setNewItemData({ ...newItemData, price: Number(e.target.value), posterPrice: `₹${e.target.value}` })}
                        className="pr-input"
                      />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="pr-form-field">
                      <label>Poster Display Price (e.g. ₹129 / ₹159)</label>
                      <input
                        type="text"
                        value={newItemData.posterPrice}
                        onChange={(e) => setNewItemData({ ...newItemData, posterPrice: e.target.value })}
                        className="pr-input"
                      />
                    </div>
                    <div className="pr-form-field">
                      <label>Dietary Type</label>
                      <select
                        value={newItemData.isVeg ? "veg" : "non-veg"}
                        onChange={(e) => setNewItemData({ ...newItemData, isVeg: e.target.value === "veg" })}
                        className="pr-input"
                      >
                        <option value="non-veg">🔴 Non-Veg</option>
                        <option value="veg">🟢 Pure Veg</option>
                      </select>
                    </div>
                  </div>
                  <div className="pr-form-field">
                    <label>Special Offer / Complimentary Gift</label>
                    <input
                      type="text"
                      placeholder="e.g. Free 250ml Coke + Water Bottle"
                      value={newItemData.specialOffer}
                      onChange={(e) => setNewItemData({ ...newItemData, specialOffer: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div className="pr-form-field">
                    <label>Photo Path / Image URL</label>
                    <input
                      type="text"
                      placeholder="/images/chicken-biryani.png"
                      value={newItemData.photoPath}
                      onChange={(e) => setNewItemData({ ...newItemData, photoPath: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                    <button type="button" onClick={() => setIsAddingNewItem(false)} className="pr-btn pr-btn-outline-dark">
                      Cancel
                    </button>
                    <button type="submit" className="pr-btn pr-btn-gold">
                      <Save size={16} /> Save Dish to Menu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal / Form: Edit Existing Dish */}
          {editingItem && (
            <div className="pr-admin-modal-overlay">
              <div className="pr-admin-modal-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", color: "var(--pr-forest)" }}>
                    Edit Dish: {editingItem.name}
                  </h3>
                  <button onClick={() => setEditingItem(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSaveEditedItem} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div className="pr-form-field">
                    <label>Dish Name *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="pr-form-field">
                      <label>Category / Section</label>
                      <select
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as MenuCategory })}
                        className="pr-input"
                      >
                        {MENU_CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="pr-form-field">
                      <label>Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={editingItem.price ?? ""}
                        onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                        className="pr-input"
                      />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="pr-form-field">
                      <label>Poster Display Price (e.g. ₹129 / ₹159)</label>
                      <input
                        type="text"
                        value={editingItem.posterPrice || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, posterPrice: e.target.value })}
                        className="pr-input"
                      />
                    </div>
                    <div className="pr-form-field">
                      <label>Dietary Type</label>
                      <select
                        value={editingItem.isVeg ? "veg" : "non-veg"}
                        onChange={(e) => setEditingItem({ ...editingItem, isVeg: e.target.value === "veg" })}
                        className="pr-input"
                      >
                        <option value="non-veg">🔴 Non-Veg</option>
                        <option value="veg">🟢 Pure Veg</option>
                      </select>
                    </div>
                  </div>
                  <div className="pr-form-field">
                    <label>Special Offer / Free Gift</label>
                    <input
                      type="text"
                      placeholder="e.g. Free 250ml Coke + Water Bottle"
                      value={editingItem.specialOffer || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, specialOffer: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div className="pr-form-field">
                    <label>Photo Path / URL</label>
                    <input
                      type="text"
                      value={editingItem.photoPath || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, photoPath: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.88rem" }}>
                      <input
                        type="checkbox"
                        checked={editingItem.isAvailable}
                        onChange={(e) => setEditingItem({ ...editingItem, isAvailable: e.target.checked })}
                      />
                      <span>In Stock &amp; Available for Ordering</span>
                    </label>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                    <button type="button" onClick={() => setEditingItem(null)} className="pr-btn pr-btn-outline-dark">
                      Cancel
                    </button>
                    <button type="submit" className="pr-btn pr-btn-gold">
                      <Save size={16} /> Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Sections List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {categoriesList.map((category) => {
              const categoryItems = items.filter((i) => i.category === category);
              return (
                <div key={category} className="pr-admin-section-block">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "2px solid #E5E7EB", marginBottom: "1rem" }}>
                    <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "var(--pr-forest)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span>{category.toLowerCase().includes("veg") && !category.toLowerCase().includes("non-veg") ? "🥗" : category.toLowerCase().includes("milkshake") ? "🥤" : "🍗"}</span>
                      {category} <span style={{ fontSize: "0.8rem", color: "var(--pr-muted)", fontWeight: "normal" }}>({categoryItems.length} items)</span>
                    </h3>
                  </div>

                  <div className="pr-menu-manager-grid">
                    {categoryItems.map((item) => (
                      <div key={item.id} className="pr-stock-item-card" style={{ flexDirection: "column", alignItems: "stretch" }}>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                          <Image
                            src={item.photoPath || (item.isVeg ? "/images/paneer-curry.png" : "/images/chicken-biryani.png")}
                            alt={item.name}
                            width={54}
                            height={54}
                            style={{ borderRadius: "8px", objectFit: "cover", flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                              <span className={`im-food-type ${item.isVeg ? "veg" : "non-veg"}`} style={{ width: 14, height: 14 }}>
                                <span className="food-type-symbol" />
                              </span>
                              <strong className="pr-stock-title" style={{ fontSize: "0.92rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {item.name}
                              </strong>
                            </div>
                            <span className="pr-stock-price" style={{ color: "var(--pr-gold-dark)", fontWeight: 800 }}>
                              {item.price ? `₹${item.price}` : item.posterPrice}
                            </span>
                            {item.specialOffer && (
                              <span className="pr-stock-offer" style={{ fontSize: "0.72rem", color: "#B45309", display: "block" }}>
                                🎁 {item.specialOffer}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Action Row: Edit, Delete, Stock Toggle */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid #F3F4F6", marginTop: "0.75rem" }}>
                          <div style={{ display: "flex", gap: "0.35rem" }}>
                            <button
                              onClick={() => setEditingItem(item)}
                              className="pr-btn-mini"
                              style={{ background: "#EEF2FF", color: "#4338CA", border: "1px solid #C7D2FE" }}
                              title="Edit item details"
                            >
                              <Edit size={13} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item)}
                              className="pr-btn-mini pr-btn-del"
                              title="Delete item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <button
                            onClick={() => toggleItemAvailability(item.id)}
                            className={`pr-stock-btn ${item.isAvailable ? "available" : "out-of-stock"}`}
                            style={{ padding: "0.3rem 0.65rem", fontSize: "0.74rem" }}
                          >
                            {item.isAvailable ? "In Stock" : "Out of Stock"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 4: SETTINGS & RESTAURANT DETAILS (WITH FULL EDIT OPTION) */}
      {activeTab === "settings" && (
        <section className="pr-admin-section">
          <div className="pr-admin-info-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", color: "var(--pr-forest)" }}>
                  Restaurant Information &amp; Contact Details
                </h2>
                <p style={{ margin: "4px 0 0", color: "var(--pr-muted)", fontSize: "0.88rem" }}>
                  These details power the header, footer, location map, and WhatsApp ordering across the site.
                </p>
              </div>

              {!isEditingSettings ? (
                <button
                  onClick={() => {
                    setSettingsFormData(info);
                    setIsEditingSettings(true);
                  }}
                  className="pr-btn pr-btn-gold"
                  style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem" }}
                >
                  <Edit size={15} /> Edit Restaurant Details
                </button>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => setIsEditingSettings(false)}
                    className="pr-btn pr-btn-outline-dark"
                    style={{ padding: "0.55rem 1rem", fontSize: "0.85rem" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Reset all restaurant details to factory default poster info?")) {
                        resetInfo();
                        setIsEditingSettings(false);
                        showToast("Reset to default restaurant details.");
                      }
                    }}
                    className="pr-btn"
                    style={{ background: "#FEE2E2", color: "#B91C1C", padding: "0.55rem 1rem", fontSize: "0.85rem" }}
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              )}
            </div>

            {/* Read-only view vs Edit Form */}
            {!isEditingSettings ? (
              <div className="pr-settings-list">
                <div className="pr-settings-item">
                  <strong>Restaurant Name:</strong>
                  <span>{info.name}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Tagline / Slogan:</strong>
                  <span>{info.tagline}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Footer Motto:</strong>
                  <span>{info.motto}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Proprietor Name:</strong>
                  <span>{info.proprietor}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Primary Phone (WhatsApp Orders):</strong>
                  <span>{info.phone1}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Secondary Phone:</strong>
                  <span>{info.phone2}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Physical Address:</strong>
                  <span>{info.address}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Opening Hours:</strong>
                  <span>{info.hours}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Delivery Policy:</strong>
                  <span>{info.deliveryRadius}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Party Hall Capacity:</strong>
                  <span>{info.partyHallCapacity}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Catering Policy:</strong>
                  <span>{info.cateringAvailable}</span>
                </div>
                <div className="pr-settings-item">
                  <strong>Google Maps URL:</strong>
                  <a href={info.mapsLink} target="_blank" rel="noreferrer" className="pr-gold-link" style={{ wordBreak: "break-all" }}>
                    {info.mapsLink}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="pr-form-field">
                    <label>Restaurant Name *</label>
                    <input
                      type="text"
                      required
                      value={settingsFormData.name}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, name: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div className="pr-form-field">
                    <label>Proprietor Name *</label>
                    <input
                      type="text"
                      required
                      value={settingsFormData.proprietor}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, proprietor: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="pr-form-field">
                    <label>Primary Phone (WhatsApp Ordering destination) *</label>
                    <input
                      type="tel"
                      required
                      value={settingsFormData.phone1}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, phone1: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div className="pr-form-field">
                    <label>Secondary Phone (Optional)</label>
                    <input
                      type="tel"
                      value={settingsFormData.phone2}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, phone2: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="pr-form-field">
                    <label>Tagline</label>
                    <input
                      type="text"
                      value={settingsFormData.tagline}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, tagline: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div className="pr-form-field">
                    <label>Footer Motto</label>
                    <input
                      type="text"
                      value={settingsFormData.motto}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, motto: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                </div>

                <div className="pr-form-field">
                  <label>Full Restaurant Address *</label>
                  <textarea
                    rows={2}
                    required
                    value={settingsFormData.address}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, address: e.target.value })}
                    className="pr-input"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="pr-form-field">
                    <label>Opening Hours</label>
                    <input
                      type="text"
                      value={settingsFormData.hours}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, hours: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div className="pr-form-field">
                    <label>Delivery Radius &amp; Policy</label>
                    <input
                      type="text"
                      value={settingsFormData.deliveryRadius}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, deliveryRadius: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="pr-form-field">
                    <label>Party Hall Amenities Description</label>
                    <input
                      type="text"
                      value={settingsFormData.partyHallCapacity}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, partyHallCapacity: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                  <div className="pr-form-field">
                    <label>Catering Description</label>
                    <input
                      type="text"
                      value={settingsFormData.cateringAvailable}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, cateringAvailable: e.target.value })}
                      className="pr-input"
                    />
                  </div>
                </div>

                <div className="pr-form-field">
                  <label>Google Maps Embed or Link</label>
                  <input
                    type="text"
                    value={settingsFormData.mapsLink}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, mapsLink: e.target.value })}
                    className="pr-input"
                  />
                </div>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                  <button
                    type="button"
                    onClick={() => setIsEditingSettings(false)}
                    className="pr-btn pr-btn-outline-dark"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="pr-btn pr-btn-gold">
                    <Save size={16} /> Save Restaurant Details
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
