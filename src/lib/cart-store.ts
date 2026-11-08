"use client";

import { useSyncExternalStore } from "react";

export type CartLine = { itemId: string; quantity: number };

const CART_STORAGE_KEY = "parichayam-cart-v1";
const CART_CHANGE_EVENT = "parichayam-cart-change";
const EMPTY_CART = "[]";

function getSnapshot() {
  return window.localStorage.getItem(CART_STORAGE_KEY) ?? EMPTY_CART;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CART_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CART_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function readCart(snapshot: string): CartLine[] {
  const parsed: unknown = JSON.parse(snapshot);
  if (!Array.isArray(parsed)) {
    throw new Error("Saved cart data is invalid. Clear this browser's cart storage to continue.");
  }
  return parsed.filter(
    (line): line is CartLine =>
      Boolean(line) &&
      typeof line === "object" &&
      typeof line.itemId === "string" &&
      Number.isInteger(line.quantity) &&
      line.quantity > 0,
  );
}

function saveCart(cart: CartLine[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function useCart() {
  const cart = readCart(useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_CART));

  function addToCart(itemId: string) {
    const current = readCart(getSnapshot());
    const existing = current.find((line) => line.itemId === itemId);
    saveCart(
      existing
        ? current.map((line) => line.itemId === itemId ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { itemId, quantity: 1 }],
    );
  }

  function setQuantity(itemId: string, quantity: number) {
    const current = readCart(getSnapshot());
    if (quantity <= 0) {
      saveCart(current.filter((line) => line.itemId !== itemId));
      return;
    }
    saveCart(current.map((line) => line.itemId === itemId ? { ...line, quantity } : line));
  }

  function removeFromCart(itemId: string) {
    saveCart(readCart(getSnapshot()).filter((line) => line.itemId !== itemId));
  }

  function clearCart() {
    saveCart([]);
  }

  const itemCount = cart.reduce((total, line) => total + line.quantity, 0);

  return { cart, itemCount, addToCart, setQuantity, removeFromCart, clearCart };
}
