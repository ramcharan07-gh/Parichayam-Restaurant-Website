"use client";

import Image from "next/image";
import { HERO_PHOTO_KEY, useBrowserPhoto } from "@/lib/photo-store";

export function HomeHeroPhoto() {
  const uploadedPhoto = useBrowserPhoto(HERO_PHOTO_KEY);

  return (
    <Image
      className="reference-home-photo"
      src={uploadedPhoto || "/images/parichayam-homepage-hero.webp"}
      alt={uploadedPhoto ? "Parichayam restaurant" : "Biryani platter in a dark green garden setting"}
      fill
      priority
      unoptimized={Boolean(uploadedPhoto)}
      sizes="(max-width: 650px) 100vw, 94vw"
    />
  );
}
