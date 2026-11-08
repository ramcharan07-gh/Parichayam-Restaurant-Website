"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDownWideNarrow, Check, Search, ShoppingBag, Shuffle, SlidersHorizontal } from "lucide-react";
import { MENU_CATEGORIES, type MenuCategory } from "@/lib/menu-data";
import { useMenuItems } from "@/lib/menu-store";
import { useCart } from "@/lib/cart-store";

export function MenuExplorer() {
  const { items, isLoaded } = useMenuItems();
  const { addToCart } = useCart();
  const [category, setCategory] = useState<MenuCategory | "All" | "Offers">("All");
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<"all" | "veg" | "non-veg">("all");
  const [sortByPrice, setSortByPrice] = useState(false);
  const [surpriseId, setSurpriseId] = useState<string | null>(null);
  const [cartNotice, setCartNotice] = useState("");

  const publishedItems = useMemo(
    () => items.filter((item) => item.isPublished && item.isAvailable),
    [items],
  );
  const visibleItems = useMemo(() => {
    const filtered = publishedItems.filter((item) => {
      const matchesCategory =
        category === "All" ||
        (category === "Offers" ? Boolean(item.specialOffer) : item.category === category);
      const matchesQuery =
        !query.trim() ||
        `${item.name} ${item.description} ${item.specialOffer ?? ""}`.toLowerCase().includes(query.trim().toLowerCase());
      const matchesDiet = diet === "all" || (diet === "veg" ? item.isVeg : !item.isVeg);
      return matchesCategory && matchesQuery && matchesDiet;
    });

    if (sortByPrice) {
      return [...filtered].sort((first, second) => {
        if (first.price === null) return 1;
        if (second.price === null) return -1;
        return first.price - second.price;
      });
    }
    return filtered;
  }, [category, diet, publishedItems, query, sortByPrice]);

  function surpriseMe() {
    if (publishedItems.length === 0) return;
    const pick = publishedItems[Math.floor(Math.random() * publishedItems.length)];
    setSurpriseId(pick.id);
    setCategory("All");
    setQuery("");
    setDiet("all");
    document.getElementById("menu-items")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const surpriseItem = publishedItems.find((item) => item.id === surpriseId);

  return (
    <div className="menu-explorer">
      <div className="menu-tools">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search menu</span>
          <input
            type="search"
            placeholder="Search something delicious..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="filter-field">
          <SlidersHorizontal size={17} aria-hidden="true" />
          <span className="sr-only">Filter by diet</span>
          <select value={diet} onChange={(event) => setDiet(event.target.value as typeof diet)}>
            <option value="all">Everything</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-vegetarian</option>
          </select>
        </label>
        <button className="filter-button" type="button" onClick={() => setSortByPrice(!sortByPrice)}>
          <ArrowDownWideNarrow size={17} aria-hidden="true" />
          {sortByPrice ? "Price: low to high" : "Sort by price"}
        </button>
        <button className="filter-button surprise-button" type="button" onClick={surpriseMe}>
          <Shuffle size={17} aria-hidden="true" />
          Surprise me
        </button>
      </div>

      <div className="menu-results-layout">
        <aside className="menu-categories-panel" aria-label="Menu categories">
          <h3>Categories</h3>
          <button className={`menu-category-link ${category === "All" ? "is-active" : ""}`} type="button" onClick={() => setCategory("All")}>
            <span>All items</span><span>{publishedItems.length}</span>
          </button>
          {MENU_CATEGORIES.map((itemCategory) => {
            const count = publishedItems.filter((item) => item.category === itemCategory).length;
            if (count === 0) return null;
            return (
              <button
                className={`menu-category-link ${category === itemCategory ? "is-active" : ""}`}
                type="button"
                key={itemCategory}
                onClick={() => setCategory(itemCategory)}
              >
                <span>{itemCategory}</span><span>{count}</span>
              </button>
            );
          })}
          <button className={`menu-category-link ${category === "Offers" ? "is-active" : ""}`} type="button" onClick={() => setCategory("Offers")}>
            <span>Special offers</span><span>{publishedItems.filter((item) => item.specialOffer).length}</span>
          </button>
        </aside>

        <div className="menu-results-main">
          <div className="menu-results-heading" id="menu-items">
            <div>
              <span className="eyebrow">OUR KITCHEN, YOUR TABLE</span>
              <h2>{category === "All" ? "All the good things." : category === "Offers" ? "A little something extra." : category}</h2>
            </div>
            {publishedItems.length > 0 && (
              <span className="result-count">{visibleItems.length} {visibleItems.length === 1 ? "dish" : "dishes"}</span>
            )}
          </div>
          {!isLoaded ? (
            <div className="menu-empty"><span className="empty-marker" aria-hidden="true">P</span><h3>Setting the table...</h3></div>
          ) : visibleItems.length === 0 ? (
            <div className="menu-empty">
              <span className="empty-marker" aria-hidden="true">P</span>
              <span className="eyebrow">A LITTLE MORE TIME</span>
              <h3>{query ? "No dishes found just yet." : "No dishes in this category."}</h3>
              <p>{query ? "Try another search." : "Choose another category or call us and we’ll be happy to help."}</p>
              {!query && <a className="button button-dark" href="tel:9014498145">Call 90144 98145</a>}
            </div>
          ) : (
            <>
              {surpriseItem && <p className="surprise-note" role="status">Today’s little nudge: <strong>{surpriseItem.name}</strong></p>}
              <div className="dish-grid">
                {visibleItems.map((item) => (
                  <article className={`dish-card ${item.id === surpriseId ? "is-surprise" : ""}`} key={item.id}>
                    <div className={`dish-photo ${item.photoDataUrl || item.photoPath ? "" : "dish-photo-empty"}`}>
                      {item.photoDataUrl ? (
                        <Image src={item.photoDataUrl} alt={item.name} fill unoptimized sizes="(max-width: 700px) 90vw, 35vw" />
                      ) : item.photoPath ? (
                        <Image src={item.photoPath} alt={item.name} fill sizes="(max-width: 700px) 90vw, 35vw" />
                      ) : (
                        <span>PARICHAYAM<br />PHOTO COMING SOON</span>
                      )}
                      {item.specialOffer && <span className="dish-offer-label">Special offer</span>}
                      <span className={`diet-dot ${item.isVeg ? "veg-dot" : "nonveg-dot"}`} aria-label={item.isVeg ? "Vegetarian" : "Non-vegetarian"} />
                    </div>
                    <div className="dish-card-copy">
                      <span className="dish-category">{item.category}</span>
                      <div className="dish-title-row">
                        <h3>{item.name}</h3>
                        <span className="price-badge">{item.price === null ? "Confirm price" : `₹${item.price}`}</span>
                      </div>
                      {item.description && <p>{item.description}</p>}
                      {item.specialOffer && <p className="dish-offer-copy"><strong>Combo:</strong> {item.specialOffer}</p>}
                      <div className="dish-order-actions">
                        <button className="add-cart-button" type="button" onClick={() => {
                          addToCart(item.id);
                          setCartNotice(`${item.name} added to your cart.`);
                        }}>
                          <ShoppingBag size={14} /> Add to cart
                        </button>
                        <Link className="order-now-button" href="/order" onClick={() => addToCart(item.id)}>
                          Order now
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
          {cartNotice && <p className="cart-notice" role="status"><Check size={14} /> {cartNotice} <Link href="/order">View cart</Link></p>}
        </div>
      </div>
    </div>
  );
}
