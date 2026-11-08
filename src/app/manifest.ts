import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Parichayam Restaurant",
    short_name: "Parichayam",
    description: "Good food and warm hospitality in the garden.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF6E9",
    theme_color: "#0F3D2A",
    icons: [
      {
        src: "/parichayam-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
