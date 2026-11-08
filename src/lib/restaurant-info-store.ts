"use client";

import { useSyncExternalStore } from "react";

export interface RestaurantInfo {
  name: string;
  tagline: string;
  motto: string;
  proprietor: string;
  phone1: string;
  phone2: string;
  address: string;
  mapsLink: string;
  hours: string;
  deliveryRadius: string;
  partyHallCapacity: string;
  cateringAvailable: string;
}

export const DEFAULT_RESTAURANT_INFO: RestaurantInfo = {
  name: "Parichayam Restaurant & Garden",
  tagline: "Good Food • Great Taste • Warm Hospitality",
  motto: "Taste Tradition. Feel at Home.",
  proprietor: "Macha Kiran Kumar Naidu",
  phone1: "9014498145",
  phone2: "9347209229",
  address: "Angallu, Near MITS College, Madanapalle, Andhra Pradesh",
  mapsLink: "https://maps.google.com/?q=13.6318002,78.4823367",
  hours: "Monday – Sunday: 11:00 AM – 11:00 PM (Lunch & Dinner)",
  deliveryRadius: "Free delivery within 3 km of Angallu (covers all hostels, PGs, MITS college campus)",
  partyHallCapacity: "Private Party Hall up to 50 guests",
  cateringAvailable: "College & Family Outdoor Catering Available",
};

const RESTAURANT_INFO_STORAGE_KEY = "parichayam-restaurant-details-v1";
const RESTAURANT_INFO_CHANGE_EVENT = "parichayam-restaurant-details-change";

function getSnapshot(): string {
  if (typeof window === "undefined") return JSON.stringify(DEFAULT_RESTAURANT_INFO);
  const data = window.localStorage.getItem(RESTAURANT_INFO_STORAGE_KEY);
  if (!data) {
    window.localStorage.setItem(RESTAURANT_INFO_STORAGE_KEY, JSON.stringify(DEFAULT_RESTAURANT_INFO));
    return JSON.stringify(DEFAULT_RESTAURANT_INFO);
  }
  return data;
}

function subscribe(callback: () => void) {
  window.addEventListener(RESTAURANT_INFO_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(RESTAURANT_INFO_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function saveRestaurantInfoToStore(updated: RestaurantInfo) {
  window.localStorage.setItem(RESTAURANT_INFO_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(RESTAURANT_INFO_CHANGE_EVENT));
}

export function resetRestaurantInfoToDefaults() {
  window.localStorage.setItem(RESTAURANT_INFO_STORAGE_KEY, JSON.stringify(DEFAULT_RESTAURANT_INFO));
  window.dispatchEvent(new Event(RESTAURANT_INFO_CHANGE_EVENT));
}

export function useRestaurantInfo(): {
  info: RestaurantInfo;
  updateInfo: (data: RestaurantInfo) => void;
  resetInfo: () => void;
} {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => JSON.stringify(DEFAULT_RESTAURANT_INFO));
  let info: RestaurantInfo;
  try {
    info = { ...DEFAULT_RESTAURANT_INFO, ...JSON.parse(raw) };
  } catch {
    info = DEFAULT_RESTAURANT_INFO;
  }

  return {
    info,
    updateInfo: saveRestaurantInfoToStore,
    resetInfo: resetRestaurantInfoToDefaults,
  };
}
