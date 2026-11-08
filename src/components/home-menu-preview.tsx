"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMenuItems } from "@/lib/menu-store";
import { useCart } from "@/lib/cart-store";

export function HomeMenuPreview() {
  const { items } = useMenuItems();
  const { addToCart } = useCart();
  const featuredItems = items
    .filter((item) => item.isPublished && item.isAvailable)
    .slice(0, 3);

  return (
    <div className="home-dish-grid">
      {featuredItems.map((item, index) => (
        <article className="home-dish-card" key={item.id}>
          <Link className={`home-dish-image ${!item.photoDataUrl && !item.photoPath ? "home-dish-image-empty" : ""}`} href="/menu" aria-label={`View ${item.name} in menu`}>
            {item.photoDataUrl ? (
              <Image src={item.photoDataUrl} alt={item.name} fill unoptimized sizes="(max-width: 700px) 90vw, 32vw" />
            ) : item.photoPath ? (
              <Image src={item.photoPath} alt={item.name} fill sizes="(max-width: 700px) 90vw, 32vw" />
            ) : (
              <span>PARICHAYAM<br />PHOTO COMING SOON</span>
            )}
            {index === 0 && <span className="dish-ribbon">From our menu</span>}
            <span className={`diet-dot ${item.isVeg ? "veg-dot" : "nonveg-dot"}`} aria-label={item.isVeg ? "Vegetarian" : "Non-vegetarian"} />
          </Link>
          <div className="home-dish-details">
            <div className="home-dish-name-row">
              <h3>{item.name}</h3>
              <span className="home-dish-price">{item.price === null ? "Confirm price" : `₹${item.price}`}</span>
            </div>
            {item.specialOffer && <span className="home-dish-offer">{item.specialOffer}</span>}
            <Link className="home-dish-link" href="/menu">View menu <ArrowRight size={14} /></Link>
            <div className="home-dish-actions">
              <button type="button" className="add-cart-button" onClick={() => addToCart(item.id)}>Add to cart</button>
              <Link className="order-now-button" href="/order" onClick={() => addToCart(item.id)}>Order now</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
