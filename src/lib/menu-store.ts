"use client";

import { useEffect, useSyncExternalStore } from "react";
import { MENU_CATEGORIES, MENU_INITIALIZED_KEY, MENU_STORAGE_KEY, type MenuCategory, type MenuItem } from "@/lib/menu-data";
import { DEFAULT_MENU_ITEMS, DEFAULT_MENU_SNAPSHOT } from "@/lib/menu-seed";

const MENU_CHANGE_EVENT = "parichayam-menu-change";

function isMenuItem(value: unknown): value is MenuItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    MENU_CATEGORIES.includes(item.category as (typeof MENU_CATEGORIES)[number]) &&
    typeof item.description === "string" &&
    (item.price === null || (typeof item.price === "number" && Number.isFinite(item.price))) &&
    (item.posterPrice === undefined || typeof item.posterPrice === "string") &&
    (item.specialOffer === undefined || typeof item.specialOffer === "string") &&
    (item.photoPath === undefined || typeof item.photoPath === "string") &&
    (item.photoDataUrl === undefined ||
      item.photoDataUrl === null ||
      (typeof item.photoDataUrl === "string" && item.photoDataUrl.startsWith("data:image/"))) &&
    typeof item.isVeg === "boolean" &&
    typeof item.isAvailable === "boolean" &&
    typeof item.isPublished === "boolean"
  );
}

function migrateCategory(category: unknown): MenuCategory | null {
  if (MENU_CATEGORIES.includes(category as MenuCategory)) return category as MenuCategory;
  if (category === "Starters") return "Non-Veg Starters";
  if (category === "Milkshakes") return "Regular Milkshakes";
  return null;
}

function parseMenuItems(saved: string): MenuItem[] {
  const parsed: unknown = JSON.parse(saved);
  if (!Array.isArray(parsed)) {
    throw new Error("Saved menu data is invalid. Clear the local menu storage to continue.");
  }
  const migrated = parsed.map((value) => {
    if (!value || typeof value !== "object") return value;
    const item = value as Record<string, unknown>;
    const category = migrateCategory(item.category);
    return category ? { ...item, category } : value;
  });
  if (!migrated.every(isMenuItem)) {
    throw new Error("Saved menu data is invalid. Clear the local menu storage to continue.");
  }
  return migrated;
}

function getMenuSnapshot() {
  return window.localStorage.getItem(MENU_STORAGE_KEY) ?? DEFAULT_MENU_SNAPSHOT;
}

function subscribeToMenu(onStoreChange: () => void) {
  window.addEventListener(MENU_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(MENU_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useMenuItems() {
  const saved = useSyncExternalStore(subscribeToMenu, getMenuSnapshot, () => DEFAULT_MENU_SNAPSHOT);
  const items = parseMenuItems(saved);

  useEffect(() => {
    const current = window.localStorage.getItem(MENU_STORAGE_KEY);
    const initialized = window.localStorage.getItem(MENU_INITIALIZED_KEY);
    const currentItems = !current || (current === "[]" && !initialized)
      ? DEFAULT_MENU_ITEMS
      : parseMenuItems(current);
    const seedPhotos = new Map(DEFAULT_MENU_ITEMS.map((item) => [item.id, item.photoPath]));
    const nextItems = currentItems.map((item) => ({
      ...item,
      photoPath: item.photoDataUrl
        ? undefined
        : item.photoPath === "/images/chicken-biryani.png"
          ? seedPhotos.get(item.id)
          : item.photoPath ?? seedPhotos.get(item.id),
    }));
    const nextSnapshot = JSON.stringify(nextItems);
    if (current !== nextSnapshot) window.localStorage.setItem(MENU_STORAGE_KEY, nextSnapshot);
    window.localStorage.setItem(MENU_INITIALIZED_KEY, "true");
    if (current !== nextSnapshot) window.dispatchEvent(new Event(MENU_CHANGE_EVENT));
  }, []);

  function saveMenuItems(nextItems: MenuItem[]) {
    window.localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(nextItems));
    window.localStorage.setItem(MENU_INITIALIZED_KEY, "true");
    window.dispatchEvent(new Event(MENU_CHANGE_EVENT));
  }

  return { items, isLoaded: true, saveMenuItems };
}
