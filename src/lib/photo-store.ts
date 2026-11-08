"use client";

import { useSyncExternalStore } from "react";

export const HERO_PHOTO_KEY = "parichayam-hero-photo-v1";
const PHOTO_CHANGE_EVENT = "parichayam-photo-change";

function getPhoto(key: string) {
  return window.localStorage.getItem(key) ?? "";
}

function subscribeToPhoto(onStoreChange: () => void) {
  window.addEventListener(PHOTO_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(PHOTO_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useBrowserPhoto(key: string) {
  return useSyncExternalStore(subscribeToPhoto, () => getPhoto(key), () => "");
}

export function saveBrowserPhoto(key: string, photo: string | null) {
  if (photo) window.localStorage.setItem(key, photo);
  else window.localStorage.removeItem(key);
  window.dispatchEvent(new Event(PHOTO_CHANGE_EVENT));
}
