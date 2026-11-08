import type { Metadata, Viewport } from "next";
import { PwaRegistrar } from "@/components/pwa-registrar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import PageTransition from "@/components/page-transition";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Parichayam Restaurant | Authentic Hyderabadi Cuisine & Garden Dining",
    template: "%s | Parichayam Restaurant",
  },
  description:
    "Experience the authentic flavours of Hyderabad at Parichayam Restaurant in Angallu, near MITS College. Biryani, Starters, Milkshakes, Free Delivery & Garden Dining.",
  applicationName: "Parichayam Restaurant",
  appleWebApp: {
    capable: true,
    title: "Parichayam",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F3D2A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,700;0,800;1,500;1,700&family=Poppins:wght@400;500;600;700&family=Caveat:wght@600;700&family=Rozha+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PwaRegistrar />
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}
