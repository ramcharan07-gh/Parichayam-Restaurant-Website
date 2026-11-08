"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useBrowserPhoto, HERO_PHOTO_KEY } from "@/lib/photo-store";
import { useMenuItems } from "@/lib/menu-store";

export function GardenHeroPhoto() {
  const heroPhoto = useBrowserPhoto(HERO_PHOTO_KEY);

  return (
    <figure className={`editorial-photo hero-photo ${heroPhoto ? "has-photo" : "photo-pending"}`}>
      {heroPhoto ? (
        <Image
          src={heroPhoto}
          alt="Parichayam Restaurant garden and dining space"
          fill
          priority
          unoptimized
          sizes="(max-width: 700px) 100vw, 48vw"
        />
      ) : (
        <div className="photo-pending-copy">
          <span className="photo-index">P / 01</span>
          <span className="photo-pending-rule" />
          <span className="photo-pending-title">A place<br />to gather.</span>
          <span className="photo-pending-caption">Parichayam · Angallu</span>
          <span className="photo-pending-note">Add a real restaurant photo in Menu Manager</span>
        </div>
      )}
      {heroPhoto && (
        <figcaption className="photo-caption">
          <span>PARICHAYAM</span>
          <span>ANGALLU · ANDHRA PRADESH</span>
        </figcaption>
      )}
    </figure>
  );
}

export function FeaturedDishPhoto() {
  const { items } = useMenuItems();
  const featuredItem = useMemo(
    () => items.find((item) => item.isPublished && item.isAvailable && item.photoDataUrl),
    [items],
  );

  return (
    <figure className={`editorial-photo featured-dish-photo ${featuredItem ? "has-photo" : "photo-pending"}`}>
      {featuredItem?.photoDataUrl ? (
        <Image
          src={featuredItem.photoDataUrl}
          alt={featuredItem.name}
          fill
          unoptimized
          sizes="(max-width: 700px) 100vw, 40vw"
        />
      ) : (
        <div className="photo-pending-copy">
          <span className="photo-index">FROM THE KITCHEN</span>
          <span className="photo-pending-rule" />
          <span className="photo-pending-title">The real<br />thing, soon.</span>
          <span className="photo-pending-caption">Only Parichayam dishes belong here.</span>
        </div>
      )}
      {featuredItem && (
        <figcaption className="photo-caption">
          <span>{featuredItem.name}</span>
          <span>FROM OUR KITCHEN</span>
        </figcaption>
      )}
    </figure>
  );
}
