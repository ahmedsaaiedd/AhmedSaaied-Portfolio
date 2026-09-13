# Ahmed Saaied Portfolio

An immersive product-universe portfolio built with Next.js, TypeScript, Tailwind CSS, and a lightweight custom motion system. It includes an adaptive one-device hero, five full-screen product chapters, a product decision lab, a connected capability system, dedicated project worlds, fullscreen screen theaters, shared-element transitions, a magnetic cursor, and an accessible command center.

## Run it in VS Code on Windows

1. Extract the project ZIP and open the `ahmed-portfolio` folder in VS Code.
2. Open **Terminal > New Terminal**.
3. Run:

```powershell
pnpm install
pnpm dev
```

4. Open the local address printed in the terminal (normally `http://localhost:3000`).

If PowerShell says that `pnpm` is not recognized, install it once with:

```powershell
npm install -g pnpm
```

## Production build

```powershell
pnpm build
```

## Deploy to Vercel

The project is configured as a native Next.js application for Vercel.

```powershell
vercel --prod --archive=tgz
```

## Main files

- `app/page.tsx` — page entry
- `app/globals.css` — visual system, responsive layouts, and motion
- `components/portfolio-experience.tsx` — page sections and content structure
- `components/hero-stage.tsx` — Product Universe reactor, constellation, and adaptive device
- `app/work/[slug]/page.tsx` — statically generated project-world routes
- `components/project-showcase.tsx` — immersive project chapters and project-world entry points
- `components/project-world.tsx` — complete long-form project-world layout
- `components/project-hero-atmosphere.tsx` — five project-specific hero worlds
- `components/screen-theater.tsx` — keyboard, swipe, thumbnail, and fullscreen gallery
- `components/adaptive-motion.tsx` — full, balanced, and reduced motion profiles
- `components/cinematic-ending.tsx` — final cinematic contact sequence
- `components/command-palette.tsx` — `Ctrl + K` navigation and contact actions
- `components/cinematic-intro.tsx` — first-visit opening sequence
- `lib/portfolio.ts` — project text, images, prototype steps, signals, and case-study details
- `public/projects` — supplied project imagery

## Editing the portfolio

Update project text, tools, gallery images, or their order in `lib/portfolio.ts`. Update contact details in `components/cinematic-ending.tsx`, `components/site-nav.tsx`, and `components/command-palette.tsx`.

The cinematic intro runs once per browser tab. Close the tab and open the site again if you want to replay it. Press `Ctrl + K` at any time to open the command center.

The adaptive motion engine selects a full, balanced, or reduced profile from the device, input type, connection hints, and accessibility preference. Images are lazy-loaded below the first viewport and continuous animation is kept off the critical path.
