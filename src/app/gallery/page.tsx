import type { Metadata } from "next";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Link from "next/link";
import { ReferenceGallery } from "@/components/reference-gallery";

export const metadata: Metadata = {
  title: "Visual References & Gallery",
  description: "The restaurant website image and design references.",
};

export default function GalleryPage() {
  return (
    <main className="gallery-page" style={{ padding: "3rem 1.5rem" }}>
      <section className="gallery-hero" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div className="gallery-hero-copy">
          <span className="pr-section-eyebrow">GALLERY &amp; INSPIRATIONS</span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--pr-forest)", margin: "0.25rem 0 0.5rem" }}>
            Visual Showcase
          </h1>
          <p style={{ color: "var(--pr-muted)" }}>Explore our restaurant ambiance, food presentations, and authentic kitchen craft.</p>
        </div>
      </section>
      <section className="reference-content" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ReferenceGallery />
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link className="pr-btn pr-btn-gold" href="/">
            <ArrowLeft size={16} /> Back to Parichayam Home
          </Link>
        </div>
      </section>
    </main>
  );
}
