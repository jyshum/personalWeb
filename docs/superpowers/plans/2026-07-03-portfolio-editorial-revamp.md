# Portfolio Editorial Revamp ("The Monograph") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tear down the existing portfolio page and rebuild it as a premium, editorial, single-page site per `docs/superpowers/specs/2026-07-03-portfolio-editorial-revamp-design.md`.

**Architecture:** Next.js App Router single page. One server component per page section under `app/components/`, plus one shared client component (`Reveal.tsx`) wrapping framer-motion scroll reveals. Design tokens live in Tailwind 4's `@theme` block in `globals.css`; fonts load via `next/font/google` CSS variables in `layout.tsx`.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19, Tailwind CSS 4 (`@theme` tokens, `@import "tailwindcss"`), framer-motion 12, `next/font/google` (Fraunces, Inter, IBM Plex Mono).

**Testing note (deviation from TDD):** This is a purely presentational static page in a repo with no test infrastructure. Adding a test framework would be scope creep. Verification per task = `npm run build` must succeed with zero errors + `npx next lint` clean; final task adds visual verification via screenshots. Do not add a test framework.

**Facts you must not "improve":** Email is `jaredshum101@gmail.com`. GitHub is `https://github.com/jyshum`. LinkedIn is `https://www.linkedin.com/in/jared-shum-a9199034b/`. YouTube is `https://www.youtube.com/@CrocEdge`. Résumé links to the Google Drive folder `https://drive.google.com/drive/folders/1IP5qzF3WJvllAlzVZyvNecpdpqAPS6w8` for now (swap to `/resume.pdf` only when that file exists in `public/`). Victory Velocity gets NO description anywhere — only the teaser copy shown in Task 5.

---

### Task 1: Repo hygiene + design foundation (fonts, tokens, layout)

**Files:**
- Create: `assets/` (untracked media parking)
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `.gitignore`

- [ ] **Step 1: Park stray root-level media**

```bash
mkdir -p assets
git mv ballVid1.mov ballvid2.mov assets/ 2>/dev/null || mv ballVid1.mov ballvid2.mov assets/
mv "jaredpicSUIT1 copy 2.jpeg" assets/
```

Then append to `.gitignore`:

```
assets/
```

If `git mv` succeeded (files were tracked), also run `git rm -r --cached assets/` so they leave the index without deleting the files.

- [ ] **Step 2: Replace `app/layout.tsx` entirely**

```tsx
import type { Metadata } from "next"
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
})

export const metadata: Metadata = {
  title: "Jared Shum — ML & full-stack builder",
  description:
    "Jared Shum builds ML systems and web products. Vancouver, BC — UBC Sauder BUCS, Class of 2030.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper text-ink font-sans antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Replace `app/globals.css` entirely**

```css
@import "tailwindcss";

@theme {
  --color-paper: #f7f5f0;
  --color-ink: #1a1815;
  --color-accent: #c2410c;
  --color-rule: #e5e1d8;
  --color-faint: #8a857c;
  --font-serif: var(--font-fraunces), Georgia, serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-plex-mono), ui-monospace, monospace;
}

html {
  scroll-behavior: smooth;
}

::selection {
  background-color: #c2410c;
  color: #f7f5f0;
}

.eyebrow {
  @apply font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-accent;
}

.meta {
  @apply font-mono text-[11px] uppercase tracking-[0.2em] text-faint;
}

.meta-link {
  @apply font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-accent;
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds. (`app/page.tsx` still renders old components — that's fine, they still compile; `bg-paper` etc. resolve from `@theme`.)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: editorial design foundation — fonts, tokens, repo hygiene"
```

---

### Task 2: Reveal helper, Masthead nav, and new Hero

**Files:**
- Create: `app/components/Reveal.tsx`
- Create: `app/components/Masthead.tsx`
- Delete + recreate: `app/components/Hero.tsx`
- Delete: `app/components/TopBar.tsx`, `app/components/AccentStrip.tsx`, `app/components/Panel.tsx`, `app/components/SectionGrid.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/components/Reveal.tsx`**

```tsx
"use client"

import { motion } from "framer-motion"

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `app/components/Masthead.tsx`**

```tsx
const links = [
  { label: "Work", href: "#work", external: false },
  { label: "About", href: "#about", external: false },
  {
    label: "Résumé",
    href: "https://drive.google.com/drive/folders/1IP5qzF3WJvllAlzVZyvNecpdpqAPS6w8",
    external: true,
  },
  { label: "Contact", href: "#contact", external: false },
]

export default function Masthead() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-serif text-lg font-semibold tracking-tight">
          Jared Shum
        </a>
        <nav className="flex items-center gap-5 sm:gap-8">
          {links.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="meta-link"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Delete old components and recreate `app/components/Hero.tsx`**

```bash
rm app/components/TopBar.tsx app/components/AccentStrip.tsx app/components/Panel.tsx app/components/SectionGrid.tsx app/components/Hero.tsx
```

New `app/components/Hero.tsx`:

```tsx
import Reveal from "./Reveal"

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-20 pt-24 sm:pb-28 sm:pt-36">
      <Reveal>
        <p className="eyebrow mb-8">Portfolio — Vancouver, BC</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="font-serif text-[clamp(3.5rem,12vw,8.5rem)] font-semibold leading-[0.95] tracking-tight">
          Jared
          <br />
          Shum
        </h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
          Builds ML systems and web products.{" "}
          <span className="font-serif italic">
            Vancouver, BC — UBC Sauder BUCS, Class of 2030.
          </span>
        </p>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <span className="meta">Open to internships</span>
          <a
            href="https://github.com/jyshum"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link"
          >
            GitHub ↗
          </a>
          <a href="mailto:jaredshum101@gmail.com" className="meta-link">
            Email ↗
          </a>
        </div>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 4: Replace `app/page.tsx`** (temporary shape until later sections exist)

```tsx
import Masthead from "./components/Masthead"
import Hero from "./components/Hero"

export default function Home() {
  return (
    <main>
      <Masthead />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds; no references to deleted components remain (grep to confirm: `grep -rn "SectionGrid\|TopBar\|AccentStrip\|Panel" app/` returns nothing).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: masthead nav and editorial hero; remove old layout components"
```

---

### Task 3: Capture SickNote screenshot asset

**Files:**
- Create: `public/sicknote-shot.png`

- [ ] **Step 1: Capture the live site**

```bash
npx --yes playwright install chromium
npx --yes playwright screenshot --viewport-size "1440,900" --wait-for-timeout 5000 "https://www.sicknoteinc.xyz/" public/sicknote-shot.png
```

Expected: `public/sicknote-shot.png` exists and shows the SickNote landing UI (open the file to confirm it's not a blank/loading frame; if blank, re-run with `--wait-for-timeout 10000`).

- [ ] **Step 2: Commit**

```bash
git add public/sicknote-shot.png
git commit -m "chore: add SickNote live-site screenshot asset"
```

---

### Task 4: Section 01 — SickNote featured spread

**Files:**
- Create: `app/components/FeaturedSickNote.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/components/FeaturedSickNote.tsx`**

```tsx
import Image from "next/image"
import Reveal from "./Reveal"

const points = [
  "Ensemble inference: five independently trained CNNs with averaged predictions",
  "Grad-CAM heatmaps rendered over each mel spectrogram for explainability",
  "Records from the microphone or accepts uploads, with tiered confidence and session history",
  "Decoupled deployment: PyTorch + FastAPI in Docker on Railway; Next.js frontend on Vercel",
]

export default function FeaturedSickNote() {
  return (
    <section id="work" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-12">01 — Featured work</p>
        </Reveal>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
                SickNote
              </h2>
              <p className="meta mt-4">Binary cough classifier — 2026</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 leading-relaxed text-ink/80">
                A screening tool that listens. SickNote turns cough recordings into mel
                spectrograms and classifies them with an ensemble of five convolutional
                neural networks — returning a prediction alongside a Grad-CAM heatmap
                that shows exactly which regions of the audio drove the decision.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <ul className="mt-8 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-ink/70">
                    <span className="mt-[2px] shrink-0 text-accent">·</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="meta mt-10">
                Next.js · TypeScript · FastAPI · PyTorch · Docker · Railway · Vercel
              </p>
              <div className="mt-6 flex gap-8">
                <a
                  href="https://www.sicknoteinc.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
                >
                  Visit ↗
                </a>
                <a
                  href="https://github.com/jyshum/SickNote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-link text-[12px]"
                >
                  Source ↗
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="https://www.sicknoteinc.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden border border-rule transition-colors hover:border-accent"
            >
              <Image
                src="/sicknote-shot.png"
                alt="SickNote — live site"
                width={1440}
                height={900}
                className="h-auto w-full"
              />
            </a>
            <p className="meta mt-3 normal-case tracking-[0.15em]">sicknoteinc.xyz — live</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`** — import `FeaturedSickNote` and render it after `<Hero />`:

```tsx
import Masthead from "./components/Masthead"
import Hero from "./components/Hero"
import FeaturedSickNote from "./components/FeaturedSickNote"

export default function Home() {
  return (
    <main>
      <Masthead />
      <Hero />
      <FeaturedSickNote />
    </main>
  )
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build` — expected: success.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: SickNote featured case-study spread"
```

---

### Task 5: Section 02 — Victory Velocity teaser + Section 03 — Index

**Files:**
- Create: `app/components/NextTeaser.tsx`
- Create: `app/components/IndexTable.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/components/NextTeaser.tsx`** (NO project description — this copy is final)

```tsx
import Reveal from "./Reveal"

export default function NextTeaser() {
  return (
    <section className="border-t border-rule">
      <a
        href="https://www.victoryvelocity.ca/"
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow mb-6">02 — Next</p>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
              <h2 className="font-serif text-4xl font-medium italic tracking-tight sm:text-5xl">
                Victory Velocity
              </h2>
              <p className="meta transition-colors group-hover:text-accent">
                victoryvelocity.ca ↗
              </p>
            </div>
            <p className="mt-6 text-ink/70">Something new, in production — 2026.</p>
          </Reveal>
        </div>
      </a>
    </section>
  )
}
```

- [ ] **Step 2: Create `app/components/IndexTable.tsx`**

```tsx
import Reveal from "./Reveal"

const rows = [
  {
    year: "2025",
    title: "ML startup internship",
    org: "Growth-stage ML startup",
    summary:
      "Data preprocessing pipelines cleaning and standardizing 3,000+ conference records to sharpen LLM-based matching, with internal documentation other teams adopted independently.",
    stack: "Python · VBA",
    href: null as string | null,
  },
  {
    year: "2026",
    title: "Cycle Length Prediction",
    org: "Independent ML study",
    summary:
      "Regression pipeline across 895 records. GroupShuffleSplit by subject to prevent leakage; near-zero R² reported honestly as the finding. Eleven automated tests.",
    stack: "Python · scikit-learn · pandas",
    href: "https://github.com/jyshum/Cycle-Regression-Project" as string | null,
  },
]

export default function IndexTable() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-12">03 — Index</p>
        </Reveal>
        <div>
          {rows.map((row, i) => (
            <Reveal key={row.title} delay={i * 0.06}>
              <div className="grid gap-3 border-t border-rule py-8 sm:grid-cols-[80px_1fr_1.4fr] sm:gap-8">
                <p className="meta pt-1">{row.year}</p>
                <div>
                  {row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-2xl font-semibold tracking-tight transition-colors hover:text-accent"
                    >
                      {row.title} ↗
                    </a>
                  ) : (
                    <p className="font-serif text-2xl font-semibold tracking-tight">{row.title}</p>
                  )}
                  <p className="meta mt-2 normal-case tracking-[0.15em]">{row.org}</p>
                </div>
                <div>
                  <p className="text-[15px] leading-relaxed text-ink/70">{row.summary}</p>
                  <p className="meta mt-4">{row.stack}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add both to `app/page.tsx`** after `<FeaturedSickNote />`:

```tsx
import NextTeaser from "./components/NextTeaser"
import IndexTable from "./components/IndexTable"
```

…and in JSX: `<NextTeaser />` then `<IndexTable />`.

- [ ] **Step 4: Verify build**

Run: `npm run build` — expected: success.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Victory Velocity teaser and editorial index table"
```

---

### Task 6: Section 04 — About + Off the clock, and Colophon footer

**Files:**
- Create: `app/components/About.tsx`
- Create: `app/components/Colophon.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/components/About.tsx`**

```tsx
import Image from "next/image"
import Reveal from "./Reveal"

export default function About() {
  return (
    <section id="about" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-12">04 — About</p>
        </Reveal>
        <div className="grid gap-12 sm:grid-cols-[280px_1fr] sm:gap-16">
          <Reveal>
            <Image
              src="/profile.jpg"
              alt="Jared Shum"
              width={683}
              height={1024}
              className="w-full max-w-[280px] border border-rule grayscale"
            />
            <p className="meta mt-3 normal-case tracking-[0.15em]">Jared Shum, Vancouver BC</p>
          </Reveal>
          <div>
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-ink/80">
                I&apos;m Jared — a builder in Vancouver working across machine learning and
                full-stack web: training models, deploying them behind real APIs, and
                wrapping them in interfaces people actually use. I like owning things end
                to end — data, model, deployment, product — and explaining them clearly
                along the way.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink/80">
                I&apos;m finishing at Lord Byng Secondary and heading to UBC Sauder&apos;s
                Business + Computer Science program (BUCS), Class of 2030. Right now
                I&apos;m looking for technical internships where I can ship and learn fast.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-14 border-t border-rule pt-10">
                <p className="eyebrow mb-8">Off the clock</p>
                <p className="text-[15px] leading-relaxed text-ink/70">
                  Basketball — repetition, discipline, and showing up every day.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                  YouTube —{" "}
                  <a
                    href="https://www.youtube.com/@CrocEdge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent transition-opacity hover:opacity-70"
                  >
                    @CrocEdge
                  </a>
                  , where Roblox dinosaur games get more editorial rigor than they asked for.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {["/ballpic1.jpeg", "/ballpic2.jpeg", "/ballpic3.jpeg"].map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt="Basketball"
                      width={400}
                      height={400}
                      className="aspect-square w-full border border-rule object-cover grayscale transition-all duration-500 hover:grayscale-0"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `app/components/Colophon.tsx`**

```tsx
import Reveal from "./Reveal"

const links = [
  { label: "Email", href: "mailto:jaredshum101@gmail.com" },
  { label: "GitHub", href: "https://github.com/jyshum" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jared-shum-a9199034b/" },
  { label: "YouTube", href: "https://www.youtube.com/@CrocEdge" },
  {
    label: "Résumé",
    href: "https://drive.google.com/drive/folders/1IP5qzF3WJvllAlzVZyvNecpdpqAPS6w8",
  },
]

export default function Colophon() {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-6xl">
            Let&apos;s build{" "}
            <a
              href="mailto:jaredshum101@gmail.com"
              className="italic text-accent underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70"
            >
              something
            </a>
            .
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-4">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="meta-link text-[12px]"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="meta mt-16 normal-case tracking-[0.15em]">
            Set in Fraunces &amp; Inter · Built with Next.js · © 2026 Jared Shum
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Final `app/page.tsx`**

```tsx
import Masthead from "./components/Masthead"
import Hero from "./components/Hero"
import FeaturedSickNote from "./components/FeaturedSickNote"
import NextTeaser from "./components/NextTeaser"
import IndexTable from "./components/IndexTable"
import About from "./components/About"
import Colophon from "./components/Colophon"

export default function Home() {
  return (
    <main>
      <Masthead />
      <Hero />
      <FeaturedSickNote />
      <NextTeaser />
      <IndexTable />
      <About />
      <Colophon />
    </main>
  )
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build` — expected: success.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: about section, off-the-clock strip, and colophon footer"
```

---

### Task 7: Asset pruning, dependency cleanup, and visual verification

**Files:**
- Delete: unused files in `public/`
- Modify: `package.json` (remove `react-icons`)

- [ ] **Step 1: Confirm nothing references the assets being deleted**

Run: `grep -rn "mepic1\|ytchannel\|gmailLOGO\|googleDriveLOGO\|githubLOGO\|linkedINLOGO\|file.svg\|globe.svg\|window.svg\|next.svg\|vercel.svg\|react-icons" app/`
Expected: no output. If any file matches, fix that reference first.

- [ ] **Step 2: Delete unused public assets and dependency**

```bash
git rm public/mepic1.jpeg public/ytchannel.png public/gmailLOGO.webp public/googleDriveLOGO.png public/githubLOGO.png public/linkedINLOGO.png public/file.svg public/globe.svg public/window.svg public/next.svg public/vercel.svg
npm uninstall react-icons
```

Kept in `public/`: `profile.jpg`, `ballpic1.jpeg`, `ballpic2.jpeg`, `ballpic3.jpeg`, `sicknote-shot.png`.

- [ ] **Step 3: Full verification**

```bash
npm run build
```

Expected: clean build. Then start `npm run dev` and screenshot the page at desktop (1440×900) and mobile (390×844) widths — via the Claude Preview tools or Playwright:

```bash
npx --yes playwright screenshot --viewport-size "1440,900" --wait-for-timeout 4000 "http://localhost:3000" /tmp/portfolio-desktop.png
npx --yes playwright screenshot --viewport-size "390,844" --wait-for-timeout 4000 --full-page "http://localhost:3000" /tmp/portfolio-mobile.png
```

Check against the spec: paper/ink/vermillion palette, Fraunces headlines, all five sections present and readable without hover, Victory Velocity shows no description, no horizontal overflow on mobile.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: prune unused assets and react-icons dependency"
```
