# Portfolio Editorial Revamp — "The Monograph"

**Date:** 2026-07-03
**Status:** Approved design, pending implementation plan

## Goal

Full teardown and rebuild of jaredshum's portfolio into a premium, editorial, magazine-style single page aimed at peers, tech recruiters, and startup founders. Nothing from the current layout survives; content substance is kept but rewritten in a tighter editorial voice.

## Audience & tone

- Recruiters and founders skim: all content readable by default (no blur/hover-to-reveal).
- Register: quiet confidence. Lead with work and the UBC Sauder BUCS credential; high school demoted to bio. No self-deprecating jokes in primary copy; personality lives in the "Off the clock" strip.

## Design system

- **Ground:** warm paper `#F7F5F0`; ink `#1A1815`; hairline rules in faded sand (e.g. `#E5E1D8`).
- **Accent:** burnt vermillion `#C2410C` — links, section numbers, small labels only.
- **Type (next/font/google):**
  - Fraunces — display serif (headlines, name masthead, section titles)
  - Inter — body
  - IBM Plex Mono — metadata: section numbers, dates, stack lines, small-caps labels
- **Motion:** framer-motion, restrained fade/rise on scroll only. No sliding panels, no blur, no gimmicks.
- **Layout language:** generous whitespace, hairline rules, numbered sections (01–04), mono metadata rows.
- **Responsive:** mobile-first; current fixed-pixel desktop-only layout is replaced.

## Page structure (single page, top → bottom)

### Masthead nav
"Jared Shum" wordmark left; Work / About / Résumé / Contact anchors right; hairline rule beneath.

### Hero
Type-led, no photo. Name set oversized in Fraunces. Dek line: "Builds ML systems and web products. Vancouver, BC — UBC Sauder BUCS, Class of 2030." Mono metadata row beneath (availability, GitHub, email).

### 01 · Featured — SickNote
Case-study spread, the visual centerpiece.
- Serif title + one-paragraph narrative: cough audio → mel spectrograms → 5-CNN ensemble → Grad-CAM explainability.
- Mono stack line: Next.js · TypeScript · FastAPI · PyTorch · Docker · Railway · Vercel.
- 3–4 sharp achievement points drawn from the SickNote README (ensemble inference, Grad-CAM heatmaps, dual audio input, deployed split architecture).
- Links: **Visit** → https://www.sicknoteinc.xyz/ and **Source** → https://github.com/jyshum/SickNote.
- Imagery: screenshot(s) of the live site captured during the build.

### 02 · Next — Victory Velocity
Quiet full-width teaser band. Mono label "NEXT", name in serif, single line: "Something new, in production — 2026." Links to https://www.victoryvelocity.ca/. **No description of the project anywhere on the site.**

### 03 · Index
Editorial table, two rows. Columns: year · role/project · description · stack.
1. **ML startup internship (growth-stage)** — built data preprocessing pipelines cleaning and standardizing 3,000+ conference records to enhance LLM-based matching; VBA + Python; internal documentation for team adoption.
2. **Menstrual Cycle Length Prediction** — multiple linear regression across 895 records; GroupShuffleSplit to prevent leakage; MAE/RMSE/R² vs. mean baseline; near-zero R² reported as a valid finding; 11 automated tests. Links to https://github.com/jyshum/Cycle-Regression-Project.

Explicitly excluded: UniPath, Repeat-Floral, UTG Academy.

### 04 · About
- Rewritten bio, quiet-confidence register: builder first, then "Lord Byng Secondary → UBC Sauder, Business + Computer Science, Class of 2030."
- Formal headshot (`public/profile.jpg`) treated editorially: tight crop, subtle grayscale, small caption.
- **Off the clock** strip: one line on basketball, one on the YouTube channel (https://www.youtube.com/@CrocEdge), small photo row from `ballpic1–3.jpeg` with linked YouTube mark.

### Colophon footer
Email `jaredshum101@gmail.com` (mailto), GitHub, LinkedIn, YouTube, Résumé link → `/resume.pdf` (user supplies the PDF in `public/` later). Colophon line: "Set in Fraunces & Inter · Built with Next.js · © 2026."

## Implementation notes

- Same Next.js app. Delete and replace `app/components/Hero.tsx`, `SectionGrid.tsx`, `TopBar.tsx`, `AccentStrip.tsx`, `Panel.tsx`; rebuild `app/page.tsx`, `app/layout.tsx`, `app/globals.css`.
- **Read the bundled Next.js docs in `node_modules/next/dist/docs/` before writing code** — per AGENTS.md this Next.js version has breaking changes vs. training data.
- Repo hygiene as part of the overhaul: remove or relocate root-level `jaredpicSUIT1 copy 2.jpeg`, `ballVid1.mov`, `ballvid2.mov`; prune unused public assets (starter SVGs, unused logos) after the rebuild.
- Components stay small and single-purpose: one component per page section.

## Out of scope

- Any description of Victory Velocity beyond the teaser link.
- Resume PDF content (user provides file).
- New photography (working with existing assets).
