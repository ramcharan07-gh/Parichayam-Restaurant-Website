# Parichayam Restaurant Website – Development Guide

## Overview
This project now includes the following pages:
- **Home** – Existing landing page (`src/app/page.tsx`).
- **About** – `src/app/about/page.tsx`
- **Menu** – `src/app/menu/page.tsx`
- **Booking** – `src/app/booking/page.tsx`
- **Reviews** – `src/app/reviews/page.tsx`

All pages use a simple fade‑in transition via the `PageTransition` component and share a global layout that loads a premium font (currently `Inter` as a placeholder). The navigation menu has been updated to link to all five pages.

## Running locally
```bash
npm install         # install dependencies (skip if already done)
npm run dev         # start Next.js dev server
```
Open your browser at **http://localhost:3000** and navigate to:
- `/` (Home)
- `/about`
- `/menu`
- `/booking`
- `/reviews`

## Adding a real premium font
1. Place your font files (e.g., `MyPremiumFont.woff2`) under `public/fonts/`.
2. Replace the import in `src/app/layout.tsx`:
   ```tsx
   // Example using a local premium font
   import localFont from 'next/font/local';
   const premiumFont = localFont({
     src: '/fonts/MyPremiumFont.woff2',
     display: 'swap',
     weight: '400 700',
     style: 'normal',
     variable: '--font-premium',
   });
   ```
3. Ensure `globals.css` references `var(--font-premium)` (already set).
4. Re‑run the dev server – the new font will be applied site‑wide.

## Supplying mock‑up data
- **Menu** – Edit the `mockMenu` array in `src/app/menu/page.tsx`.
- **Reviews** – Edit the `mockReviews` array in `src/app/reviews/page.tsx`.
- **Images** – Replace placeholder image paths (e.g., `/placeholder-about.jpg`) with the actual assets from your design mock‑up. Put these images in the `public/` folder.

## Styling & Transitions
- The fade‑in transition is defined in `src/components/page-transition.tsx`. Feel free to replace it with a more complex animation library (e.g., `framer-motion`) once network access is available.
- Tailwind utilities are used throughout; you can extend `tailwind.config.cjs` to add custom colors, spacing, etc.

---
**Next steps you might want:**
- Connect a backend (Supabase, etc.) to fetch real menu items.
- Add form validation/submission for the booking page.
- Replace the placeholder font with the premium font you have.

Happy coding!
