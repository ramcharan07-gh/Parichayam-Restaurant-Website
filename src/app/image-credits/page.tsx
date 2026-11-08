import type { Metadata } from "next";
import Image from "next/image";
import photoCredits from "../../../public/images/menu-photo-credits.json";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Attribution and license details for menu photographs used by Parichayam.",
};

export default function ImageCreditsPage() {
  return (
    <main className="credits-page" style={{ padding: "3rem 1.5rem" }}>
      <header className="credits-heading" style={{ maxWidth: 800, margin: "0 auto 2rem" }}>
        <span className="pr-section-eyebrow">TRANSPARENCY · PHOTO SOURCES</span>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.4rem", color: "var(--pr-forest)", margin: "0.25rem 0 0.5rem" }}>
          Menu Image Credits
        </h1>
        <p style={{ color: "var(--pr-muted)", fontSize: "0.95rem" }}>
          These illustrative dish photographs are from Wikimedia Commons. Each image is linked to its original source and
          license.
        </p>
      </header>
      <ul className="credits-grid" style={{ maxWidth: 1140, margin: "0 auto" }}>
        {photoCredits.map((credit) => (
          <li className="credit-card" key={credit.id}>
            <Image src={credit.path} alt="" width={320} height={180} sizes="(max-width: 650px) 90vw, 320px" />
            <div>
              <h2>{credit.name}</h2>
              <p>
                “<a href={credit.sourceUrl} target="_blank" rel="noreferrer">{credit.title}</a>”
                {" "}by {credit.artist}; licensed under{" "}
                <a href={credit.licenseUrl || credit.sourceUrl} target="_blank" rel="noreferrer">{credit.license}</a>.
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
