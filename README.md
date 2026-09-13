# Ahmed Saaied Portfolio

An immersive, performance-focused product engineering portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**, with a lightweight custom motion system designed to deliver rich interactions without sacrificing responsiveness.

The portfolio is structured as a connected product universe rather than a traditional static portfolio. It includes immersive project chapters, dedicated project worlds, fullscreen galleries, shared-element transitions, responsive motion profiles, custom navigation, and interactive product storytelling.

---

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* Custom animation and motion system
* Responsive desktop and mobile experiences
* Vercel deployment
* GitHub version control

---

## Main Experience

The portfolio includes:

* Adaptive responsive landing experience
* Desktop and mobile-specific layouts
* Immersive full-screen project chapters
* Dedicated project-world pages
* Product decision and process sections
* Connected capabilities and skills system
* Fullscreen project screen theater
* Shared-element transitions
* Magnetic cursor interactions
* Cinematic page transitions
* Command palette with `Ctrl + K`
* Responsive floating navigation
* First-visit cinematic intro
* Adaptive animation profiles
* Performance-aware motion behavior
* Reduced-motion accessibility support

---

## Projects

The portfolio currently showcases:

* **SpotON**
* **HelpDesk Lite**
* **SquadTactics**
* **QNB Mobile Banking Redesign**
* **Swizzle**

Each project has its own visual identity, interactive environment, case-study structure, project imagery, and dedicated project-world experience.

---

## Run Locally on Windows

### 1. Open the project

Open the `ahmed-portfolio` folder in **VS Code**.

Then open:

```text
Terminal > New Terminal
```

### 2. Install dependencies

```powershell
pnpm install
```

If `pnpm` is not installed:

```powershell
npm install -g pnpm
```

Then run:

```powershell
pnpm install
```

### 3. Start the development server

```powershell
pnpm dev
```

Open the local address shown in the terminal.

Usually:

```text
http://localhost:3000
```

---

## Test on Another Device

To test the portfolio on a phone or another device connected to the same Wi-Fi network:

```powershell
pnpm dev --hostname 0.0.0.0
```

Find your computer's IPv4 address:

```powershell
ipconfig
```

Then open the website on your phone using:

```text
http://YOUR_IPV4_ADDRESS:3000
```

Example:

```text
http://192.168.1.7:3000
```

---

## Production Build

Before deploying, verify that the production build succeeds:

```powershell
pnpm build
```

You can also run the production version locally:

```powershell
pnpm start
```

---

# GitHub Setup

The complete GitHub repository can be created directly from the terminal using the GitHub CLI.

## 1. Initialize Git

From inside the portfolio folder:

```powershell
git init
```

Add the project files:

```powershell
git add .
```

Create the first commit:

```powershell
git commit -m "Initial portfolio release"
```

Set the default branch:

```powershell
git branch -M main
```

---

## 2. Install GitHub CLI

Check whether GitHub CLI is installed:

```powershell
gh --version
```

If the command is not recognized, install it with:

```powershell
winget install --id GitHub.cli
```

Restart the terminal after installation.

---

## 3. Sign Into GitHub

```powershell
gh auth login
```

Select:

```text
GitHub.com
HTTPS
Login with a web browser
```

Complete authentication in the browser.

---

## 4. Create the GitHub Repository

From inside the project folder:

```powershell
gh repo create ahmed-saaied-portfolio --public --source=. --remote=origin --push
```

This command will automatically:

* Create the GitHub repository
* Connect the local project to GitHub
* Add the `origin` remote
* Push the project
* Upload the `main` branch

Verify the connection:

```powershell
git remote -v
```

---

# Updating the Project

After making changes:

```powershell
git add .
```

```powershell
git commit -m "Describe the update"
```

```powershell
git push
```

Example:

```powershell
git add .
git commit -m "Improve mobile project experience"
git push
```

---

# Deploy to Vercel

The portfolio is designed to run as a native Next.js application on **Vercel**.

The recommended workflow is to connect the GitHub repository directly to Vercel.

Once connected, every push to the `main` branch automatically creates a new production deployment.

This means you do **not** need to create a new Vercel project every time the portfolio changes.

Your main Vercel domain continues pointing to the latest production deployment.

Typical workflow:

```powershell
git add .
git commit -m "Update portfolio"
git push
```

Vercel will automatically build and deploy the update.

---

## Manual Vercel Deployment

If Vercel CLI is installed, the project can also be deployed manually:

```powershell
vercel --prod
```

For large deployments:

```powershell
vercel --prod --archive=tgz
```

For normal development, the **GitHub → Vercel integration is preferred**.

---

# Project Structure

```text
app/
├── page.tsx
├── globals.css
└── work/
    └── [slug]/
        └── page.tsx

components/
├── portfolio-experience.tsx
├── hero-stage.tsx
├── project-showcase.tsx
├── project-world.tsx
├── project-hero-atmosphere.tsx
├── screen-theater.tsx
├── adaptive-motion.tsx
├── cinematic-ending.tsx
├── command-palette.tsx
├── cinematic-intro.tsx
└── site-nav.tsx

lib/
└── portfolio.ts

public/
└── projects/
```

---

## Important Files

### `app/page.tsx`

Main portfolio page entry point.

### `app/globals.css`

Global visual system, responsive behavior, layout rules, effects, and motion styling.

### `components/portfolio-experience.tsx`

Main page structure and portfolio sections.

### `components/hero-stage.tsx`

Portfolio hero environment, product universe, constellation system, and adaptive device presentation.

### `components/project-showcase.tsx`

Immersive project chapters and project-world entry points.

### `app/work/[slug]/page.tsx`

Statically generated dedicated project routes.

### `components/project-world.tsx`

Complete long-form project-world layout and case-study experience.

### `components/project-hero-atmosphere.tsx`

Project-specific visual environments and hero atmospheres.

### `components/screen-theater.tsx`

Fullscreen project gallery with keyboard, swipe, thumbnail, and navigation support.

### `components/adaptive-motion.tsx`

Controls the portfolio's full, balanced, and reduced motion profiles.

### `components/cinematic-intro.tsx`

First-visit opening experience.

### `components/cinematic-ending.tsx`

Final cinematic contact and closing sequence.

### `components/command-palette.tsx`

`Ctrl + K` command center for navigation and contact actions.

### `lib/portfolio.ts`

Central source for:

* Project information
* Project descriptions
* Technologies
* Images
* Prototype flows
* Signals
* Case-study content
* Project ordering

### `public/projects`

Contains project images and portfolio visual assets.

---

# Editing Portfolio Content

Most project-related content can be updated from:

```text
lib/portfolio.ts
```

This includes:

* Project titles
* Project descriptions
* Technologies
* Gallery images
* Project order
* Case-study information
* Prototype steps

Contact information can be updated inside:

```text
components/cinematic-ending.tsx
components/site-nav.tsx
components/command-palette.tsx
```

---

# Motion System

The portfolio uses an adaptive motion engine.

Depending on device capability, input method, connection hints, and accessibility settings, the experience can use:

* **Full Motion**
* **Balanced Motion**
* **Reduced Motion**

The goal is to preserve the visual identity of the portfolio while maintaining smooth interaction across different devices.

Performance-sensitive animations should prioritize:

```text
transform
opacity
```

over layout-triggering properties whenever possible.

Continuous animation is intentionally kept away from critical rendering paths where possible.

---

# Image Loading

Portfolio imagery below the initial viewport is lazy-loaded to reduce initial page cost.

Large project assets should remain optimized and appropriately sized to avoid unnecessary decoding, memory usage, and animation stutter.

---

# Cinematic Intro

The cinematic intro runs once per browser tab.

To replay it:

1. Close the portfolio tab.
2. Open the website again.

---

# Command Center

Press:

```text
Ctrl + K
```

at any time to open the portfolio command center.

It provides fast access to navigation and contact actions.

---

# Development Workflow

For normal development:

```powershell
pnpm dev
```

Before pushing major updates:

```powershell
pnpm build
```

Then:

```powershell
git add .
git commit -m "Update portfolio"
git push
```

If the GitHub repository is connected to Vercel, the updated portfolio will automatically deploy to the existing production project.

---

## Author

**Ahmed Muhammed Saaied**

Product Engineer / Full-Stack Developer

GitHub:
[github.com/ahmedsaaiedd](https://github.com/ahmedsaaiedd)

LinkedIn:
[Ahmed Saaied](https://www.linkedin.com/in/ahmed-saaied-904a23372)

---

## License

This portfolio and its visual design are intended for personal portfolio use.

Project names, logos, screenshots, and third-party branding remain the property of their respective owners.
