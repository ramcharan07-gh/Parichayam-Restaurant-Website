"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, Shield } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Our Menu" },
  { href: "/about", label: "About" },
  { href: "/booking", label: "Reservation" },
  { href: "/reviews", label: "Reviews" },
  { href: "/#location", label: "Location" },
];

export function SiteHeader() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="pr-header">
        {/* Brand Logo */}
        <Link href="/" className="pr-brand" aria-label="Parichayam Restaurant Home">
          <div className="pr-logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={38} height={38}>
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
          </div>
          <div className="pr-brand-text">
            <span className="pr-brand-name">Parichayam</span>
            <span className="pr-brand-sub">RESTAURANT &amp; GARDEN</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="pr-nav" aria-label="Main navigation">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`pr-nav-link ${item.href === "/admin" ? "pr-nav-admin-link" : ""}`}
            >
              {item.href === "/admin" && <Shield size={12} style={{ display: "inline", marginRight: 4 }} />}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button: Cart & Order */}
        <div className="pr-header-actions">
          <Link href="/order" className="pr-order-btn" aria-label="View Order and Cart">
            <ShoppingBag size={16} />
            <span>Cart</span>
            {itemCount > 0 && <span className="pr-cart-badge">{itemCount}</span>}
          </Link>

          <button
            className="pr-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="pr-mobile-nav">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`pr-mobile-link ${item.href === "/admin" ? "admin" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.href === "/admin" && <Shield size={14} style={{ display: "inline", marginRight: 6 }} />}
                {item.label}
              </Link>
            ))}
            <div style={{ width: "100%", marginTop: "0.5rem" }}>
              <Link
                href="/order"
                className="pr-btn pr-btn-gold"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingBag size={16} /> View Cart {itemCount > 0 ? `(${itemCount})` : ""}
              </Link>
            </div>
          </div>
        )}
    </header>
  );
}
