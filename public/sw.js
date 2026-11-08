const CACHE_NAME = "parichayam-shell-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data === "CLEAR_PARICHAYAM_CACHE") {
    event.waitUntil(caches.delete(CACHE_NAME));
  }
});
