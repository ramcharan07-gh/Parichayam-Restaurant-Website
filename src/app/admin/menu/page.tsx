"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, CircleHelp, Eye, EyeOff, ImagePlus, Leaf, Plus, Save, Trash2, X } from "lucide-react";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { BrandMark } from "@/components/brand-mark";
import { MENU_CATEGORIES, type MenuCategory, type MenuItem } from "@/lib/menu-data";
import { useMenuItems } from "@/lib/menu-store";
import { compressPhoto } from "@/lib/photo-utils";
import { HERO_PHOTO_KEY, saveBrowserPhoto, useBrowserPhoto } from "@/lib/photo-store";

const blankForm = {
  name: "",
  category: MENU_CATEGORIES[0] as MenuCategory,
  description: "",
  price: "",
  specialOffer: "",
  photoDataUrl: null as string | null,
  isVeg: false,
};

export default function MenuManagerPage() {
  const { items, isLoaded, saveMenuItems } = useMenuItems();
  const heroPhoto = useBrowserPhoto(HERO_PHOTO_KEY);
  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<MenuCategory | "All">("All");

  const visibleItems = useMemo(
    () => items.filter((item) => categoryFilter === "All" || item.category === categoryFilter),
    [categoryFilter, items],
  );

  function persistItems(nextItems: MenuItem[]) {
    try {
      saveMenuItems(nextItems);
      return true;
    } catch (error) {
      console.error("Could not save menu changes to this browser.", error);
      setNotice("Could not save these changes. This browser may be out of local storage; remove large photos and try again.");
      return false;
    }
  }

  function submitItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const priceValue = form.price.trim() ? Number(form.price) : null;
    if (priceValue !== null && (!Number.isFinite(priceValue) || priceValue < 0)) {
      setNotice("Enter a valid non-negative price, or leave it blank to keep “Confirm price”.");
      return;
    }

    const currentItem = items.find((item) => item.id === editingId);
    const nextItem: MenuItem = {
      id: editingId ?? crypto.randomUUID(),
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      price: priceValue,
      posterPrice: currentItem?.posterPrice,
      specialOffer: form.specialOffer.trim() || undefined,
      photoPath: form.photoDataUrl ? undefined : currentItem?.photoPath,
      photoDataUrl: form.photoDataUrl,
      isVeg: form.isVeg,
      isAvailable: currentItem?.isAvailable ?? true,
      isPublished: currentItem?.isPublished ?? false,
    };

    const saved = persistItems(
      editingId
        ? items.map((item) => (item.id === editingId ? nextItem : item))
        : [...items, nextItem],
    );
    if (!saved) return;
    setForm(blankForm);
    setEditingId(null);
    setNotice(editingId ? "Menu item updated." : "Menu item added as a draft.");
  }

  function editItem(item: MenuItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price === null ? "" : String(item.price),
      specialOffer: item.specialOffer ?? "",
      photoDataUrl: item.photoDataUrl ?? null,
      isVeg: item.isVeg,
    });
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleItem(itemId: string, field: "isPublished" | "isAvailable") {
    const nextItems = items.map((item) =>
      item.id === itemId ? { ...item, [field]: !item[field] } : item,
    );
    persistItems(nextItems);
  }

  async function handleItemPhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const photoDataUrl = await compressPhoto(file);
      setForm((current) => ({ ...current, photoDataUrl }));
      setNotice("Dish photo is ready. Save the item to keep it.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not prepare this photo.");
    }
    input.value = "";
  }

  async function handleHeroPhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    try {
      saveBrowserPhoto(HERO_PHOTO_KEY, await compressPhoto(file));
      setNotice("Homepage photo updated in this browser.");
    } catch (error) {
      console.error("Could not save homepage photo.", error);
      setNotice(error instanceof Error ? error.message : "Could not save the homepage photo.");
    }
    input.value = "";
  }

  function removeHeroPhoto() {
    try {
      saveBrowserPhoto(HERO_PHOTO_KEY, null);
      setNotice("Homepage photo removed.");
    } catch (error) {
      console.error("Could not remove homepage photo.", error);
      setNotice("Could not update the homepage photo in this browser.");
    }
  }

  function deleteItem(itemId: string) {
    const item = items.find((candidate) => candidate.id === itemId);
    if (!item || !window.confirm(`Remove "${item.name}" from this menu?`)) return;
    if (!persistItems(items.filter((candidate) => candidate.id !== itemId))) return;
    if (editingId === itemId) {
      setEditingId(null);
      setForm(blankForm);
    }
    setNotice("Menu item removed.");
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <Link className="admin-back-link" href="/">
          <ArrowLeft size={17} /> Back to the garden
        </Link>
        <span className="brand admin-brand">
          <BrandMark />
          <span className="brand-copy">
            <span className="brand-name">PARICHAYAM</span>
            <span className="brand-caption">MENU MANAGER</span>
          </span>
        </span>
        <Link className="button button-light button-small" href="/menu">
          View public menu
        </Link>
      </header>
      <div className="admin-content">
        <div className="admin-heading">
          <span className="eyebrow">OWNER WORKSPACE</span>
          <h1>Menu Manager</h1>
          <p>Add the dishes from your menu posters, check prices, and choose what guests can see.</p>
        </div>
        <div className="admin-notice" role="note">
          <CircleHelp size={18} aria-hidden="true" />
          <p>
            <strong>Local demo workspace.</strong> The starter catalog comes from the menu poster.
            Printed amounts remain reference-only, and public prices stay marked “Confirm price”
            until you set a final amount. Changes are saved in this browser only for now.
          </p>
        </div>

        <section className="admin-panel homepage-photo-panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">THE FIRST IMPRESSION</span>
              <h2>Homepage photograph</h2>
            </div>
            {heroPhoto && <button className="photo-remove-button" type="button" onClick={removeHeroPhoto}><X size={15} /> Remove photo</button>}
          </div>
          <div className="homepage-photo-content">
            <div className="homepage-photo-frame">
              {heroPhoto ? (
                <Image className="homepage-photo-preview" src={heroPhoto} fill alt="Current homepage restaurant photo" unoptimized />
              ) : (
                <div className="homepage-photo-preview homepage-photo-empty">A REAL PHOTO OF PARICHAYAM</div>
              )}
            </div>
            <div className="homepage-photo-copy">
              <p>Upload an original photo of your garden, dining space, or team. This replaces the homepage photo area; no sample artwork or other restaurant’s dishes will be shown.</p>
              <label className="button button-dark photo-upload-button">
                <ImagePlus size={16} /> {heroPhoto ? "Replace photo" : "Choose restaurant photo"}
                <input type="file" accept="image/*" onChange={handleHeroPhotoChange} />
              </label>
              <span>JPG, PNG, or WebP · up to 12 MB · stored in this browser for now</span>
            </div>
          </div>
        </section>

        <div className="admin-columns">
          <section className="admin-panel">
            <div className="panel-title-row">
              <div>
                <span className="eyebrow">{editingId ? "UPDATE ITEM" : "ADD TO THE MENU"}</span>
                <h2>{editingId ? "Edit a dish" : "Add a dish"}</h2>
              </div>
              <span className="panel-leaf"><Leaf size={19} /></span>
            </div>
            <form className="menu-form" onSubmit={submitItem}>
              <label>
                Dish name
                <input
                  required
                  maxLength={70}
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Name from the restaurant menu"
                />
              </label>
              <label>
                Category
                <select
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value as MenuCategory })}
                >
                  {MENU_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
              <label>
                Description <span className="optional-label">Optional</span>
                <textarea
                  rows={3}
                  maxLength={180}
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  placeholder="A short, appetising description"
                />
              </label>
              {items.find((item) => item.id === editingId)?.posterPrice && (
                <p className="poster-price-reference">
                  Poster reference: <strong>{items.find((item) => item.id === editingId)?.posterPrice}</strong>
                  <span> Not shown as the public price.</span>
                </p>
              )}
              <label>
                Combo / special offer <span className="optional-label">Optional · from the poster</span>
                <textarea
                  rows={2}
                  maxLength={180}
                  value={form.specialOffer}
                  onChange={(event) => setForm({ ...form, specialOffer: event.target.value })}
                  placeholder="Offer details, if applicable"
                />
              </label>
              <label>
                Dish photo <span className="optional-label">Use an actual Parichayam dish photo</span>
                <span className="photo-upload-control">
                  <ImagePlus size={16} />
                  <span>{form.photoDataUrl ? "Replace dish photo" : "Choose dish photo"}</span>
                  <input type="file" accept="image/*" onChange={handleItemPhotoChange} />
                </span>
                {form.photoDataUrl && (
                  <span className="photo-form-preview">
                    <Image src={form.photoDataUrl} width={100} height={74} alt="Selected dish preview" unoptimized />
                    <button className="photo-remove-button" type="button" onClick={() => setForm((current) => ({ ...current, photoDataUrl: null }))}>
                      <X size={14} /> Remove dish photo
                    </button>
                  </span>
                )}
              </label>
              <label>
                Price in rupees <span className="optional-label">Leave blank until confirmed</span>
                <div className="price-input">
                  <span>₹</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={form.price}
                    onChange={(event) => setForm({ ...form, price: event.target.value })}
                    placeholder="Confirm price"
                  />
                </div>
              </label>
              <label className="check-label">
                <input
                  type="checkbox"
                  checked={form.isVeg}
                  onChange={(event) => setForm({ ...form, isVeg: event.target.checked })}
                />
                Vegetarian dish
              </label>
              {notice && <p className="form-notice" role="status">{notice}</p>}
              <div className="form-actions">
                <button className="button button-dark" type="submit">
                  {editingId ? <Save size={16} /> : <Plus size={16} />}
                  {editingId ? "Save changes" : "Add as draft"}
                </button>
                {editingId && (
                  <button
                    className="button button-quiet"
                    type="button"
                    onClick={() => { setEditingId(null); setForm(blankForm); setNotice(""); }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="admin-panel admin-list-panel">
            <div className="panel-title-row">
              <div>
                <span className="eyebrow">YOUR DISHES</span>
                <h2>Menu items <span className="item-total">{items.length}</span></h2>
              </div>
              <label className="admin-filter">
                <span className="sr-only">Filter menu items by category</span>
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value as MenuCategory | "All")}
                >
                  <option value="All">All categories</option>
                  {MENU_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
            </div>
            {!isLoaded ? (
              <p className="admin-list-empty">Loading saved menu…</p>
            ) : visibleItems.length === 0 ? (
              <div className="admin-list-empty">
                <span className="empty-marker" aria-hidden="true">0</span>
                <h3>No menu items yet</h3>
                <p>Add the dishes from your menu posters. Keep uncertain prices blank for now.</p>
              </div>
            ) : (
              <div className="admin-menu-list">
                {visibleItems.map((item) => (
                  <article className="admin-menu-item" key={item.id}>
                    {item.photoDataUrl ? (
                      <Image className="admin-dish-thumb" src={item.photoDataUrl} width={50} height={50} alt="" unoptimized />
                    ) : (
                      <span className="admin-dish-thumb admin-dish-thumb-empty"><ImagePlus size={16} /></span>
                    )}
                    <span className={`diet-dot ${item.isVeg ? "veg-dot" : "nonveg-dot"}`} aria-label={item.isVeg ? "Vegetarian" : "Non-vegetarian"} />
                    <div className="admin-item-copy">
                      <strong>{item.name}</strong>
                      <span>{item.category}</span>
                      {item.posterPrice && <span className="poster-price-label">Poster reference: {item.posterPrice}</span>}
                      {item.specialOffer && <span className="poster-price-label">Offer: {item.specialOffer}</span>}
                    </div>
                    <span className={`admin-price ${item.price === null ? "price-unconfirmed" : ""}`}>
                      {item.price === null ? "Confirm price" : `₹${item.price}`}
                    </span>
                    <span className={`status-chip ${item.isPublished ? "status-published" : "status-draft"}`}>
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                    <div className="admin-item-actions">
                      <button type="button" onClick={() => toggleItem(item.id, "isAvailable")} title={item.isAvailable ? "Mark out of stock" : "Mark in stock"}>
                        {item.isAvailable ? <Check size={16} /> : <span className="out-stock-mark">×</span>}
                        <span className="sr-only">{item.isAvailable ? "Mark out of stock" : "Mark in stock"}</span>
                      </button>
                      <button type="button" onClick={() => toggleItem(item.id, "isPublished")} title={item.isPublished ? "Unpublish" : "Publish"}>
                        {item.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                        <span className="sr-only">{item.isPublished ? "Unpublish" : "Publish"}</span>
                      </button>
                      <button type="button" onClick={() => editItem(item)} title="Edit dish">
                        <Save size={16} /><span className="sr-only">Edit dish</span>
                      </button>
                      <button type="button" onClick={() => deleteItem(item.id)} title="Delete dish">
                        <Trash2 size={16} /><span className="sr-only">Delete dish</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
        <div className="admin-footnote"><Check size={15} /> Public menu shows only published dishes that are in stock.</div>
      </div>
    </main>
  );
}
