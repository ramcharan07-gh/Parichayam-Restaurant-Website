import Image from "next/image";

export const visualReferences = [
  {
    src: "/visual-references/menu-alternating-layout.png",
    alt: "The menu poster layout reference with alternating dish photos and text",
    title: "Alternating menu layout",
    note: "The zig-zag food and description layout for the menu page",
    width: 736,
    height: 1310,
  },
  {
    src: "/visual-references/chicken-biryani-home-poster.png",
    alt: "The chicken biryani poster selected for the homepage",
    title: "Chicken biryani homepage",
    note: "Your chosen biryani poster for the opening screen",
    width: 736,
    height: 920,
  },
  {
    src: "/visual-references/salmon-editorial-template.png",
    alt: "The supplied editorial salmon restaurant webpage reference",
    title: "Editorial food landing page",
    note: "Layered story, considered type, and food photography",
    width: 624,
    height: 1400,
  },
  {
    src: "/visual-references/dumpling-green-poster.png",
    alt: "The supplied deep-green dumpling poster reference",
    title: "Deep green food poster",
    note: "Bold color, close-up dish, and confident composition",
    width: 768,
    height: 1365,
  },
  {
    src: "/visual-references/rice-bowl-poster.png",
    alt: "The supplied rice bowl food poster reference",
    title: "Rice bowl poster",
    note: "Oversized typography balanced with a hero dish",
    width: 736,
    height: 920,
  },
  {
    src: "/visual-references/momo-poster.png",
    alt: "The supplied steam and momo food poster reference",
    title: "Steam-forward food photo",
    note: "A warm, close crop that puts the food first",
    width: 736,
    height: 1308,
  },
  {
    src: "/visual-references/simple-flavorful-poster.png",
    alt: "The supplied green dining concept poster with illustrated hands",
    title: "Simple. Flavorful. Easy.",
    note: "A graphic dining concept from your visual references",
    width: 736,
    height: 920,
  },
] as const;

export function ReferenceGallery({
  preview = false,
}: {
  preview?: boolean;
}) {
  const references = preview ? visualReferences.slice(0, 3) : visualReferences;

  return (
    <div className={`reference-grid ${preview ? "reference-grid-preview" : ""}`}>
      {references.map((reference, index) => (
        <figure className="reference-card" key={reference.src}>
          <div className="reference-image-wrap">
            <Image
              className="reference-image"
              src={reference.src}
              alt={reference.alt}
              width={reference.width}
              height={reference.height}
              sizes={preview ? "(max-width: 700px) 80vw, 28vw" : "(max-width: 700px) 85vw, 25vw"}
            />
            <span className="reference-index">0{index + 1}</span>
          </div>
          <figcaption className="reference-caption">
            <span className="eyebrow">YOUR VISUAL REFERENCE</span>
            <h3>{reference.title}</h3>
            <p>{reference.note}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
