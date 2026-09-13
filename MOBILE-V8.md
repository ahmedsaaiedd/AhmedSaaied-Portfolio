# Mobile v8 — local review

Desktop composition is preserved. Mobile now has a compact hero, a single
scroll-linked headline layer, touch-first project controls, horizontal universe
swipes, and image-first project chapters. Vertical scrolling remains native on
mobile. Hidden decorative scenes pause without removing their content.

## Run locally

```powershell
pnpm install
pnpm build
pnpm start --hostname 0.0.0.0
```

Open the laptop's local IPv4 address with port 3000 on a phone on the same Wi-Fi.
Use the production build when judging motion, not the development server.

## Acceptance checks

- Scroll down and back to the hero repeatedly; all three title lines must remain.
- Swipe horizontally across the universe image; one gesture changes one project.
- Scroll vertically starting on the universe; the page must never lock.
- Select every project using the labeled controls.
- Open each world, use All work, and confirm return to the work section.
- Check 320, 390, 430, and 768 pixel widths, portrait and landscape.
- Enable reduced motion and confirm content remains visible and usable.
- Compare desktop at the same viewport and zoom as v7.

TypeScript, targeted ESLint, and production build are checked during delivery.
Physical Samsung Browser/Safari testing is still needed. No fixed FPS guarantee
is made: device refresh rate, thermal throttling and browser work affect frames.
No deployment is performed by this update.
