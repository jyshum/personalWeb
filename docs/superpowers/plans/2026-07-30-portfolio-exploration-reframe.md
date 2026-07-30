# Portfolio Exploration Reframe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the existing portfolio around “Exploring the world through people and tech” while preserving its editorial design, featuring Victory Velocity first, interweaving About, and keeping SickNote as a complete secondary project demo.

**Architecture:** Keep the App Router homepage as a composition of focused static Server Components. Add `Recently`, `VictoryVelocity`, and `ContactFooter`; simplify `Hero` and `FeaturedSickNote`; preserve the interactive `BallReel` client boundary; and let `app/page.tsx` define the approved section order.

**Tech Stack:** Next.js 16.2.1 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4.2.2, Framer Motion 12.38, Node's built-in test runner.

## Global Constraints

- Before editing product files, use the `using-git-worktrees` skill to create an isolated worktree on branch `feat/portfolio-exploration-reframe`.
- Do not edit the existing `main` worktree; it must continue to show the current portfolio.
- Do not stage or commit on Thursday, 2026-07-30. If execution continues on a Friday or Sunday, Jared's repository rules permit commits; otherwise leave changes uncommitted on the feature branch.
- Read the relevant Next.js 16.2.1 guides in `node_modules/next/dist/docs/` before implementation; the applicable guides are `03-layouts-and-pages.md`, `05-server-and-client-components.md`, `12-images.md`, and `local-development.md`.
- Keep static sections as Server Components. `BallReel` remains the only interactive client component involved in this change.
- Preserve the current paper/ink/vermillion palette, fonts, `max-w-5xl` width, border-separated sections, and reveal animations.
- Victory Velocity must contain exactly one descriptive line: `Engineering how brands can appear in AI responses.`
- `Recently` contains exactly one diary paragraph and no archive, dates, feed, CMS, or data layer.
- About content remains unchanged except for its page position and `03 — About` label.
- SickNote retains its screenshot, explanation, stack, live link, and source link; only the four-item bullet list is removed.
- Remove the AI Data Internship and Cycle Length Prediction from the homepage.
- External links open in a new tab and use `rel="noopener noreferrer"`.
- Run the feature branch on localhost and provide its URL for review before any merge or deployment.

---

## File Map

**Create**

- `app/components/Recently.tsx` — the single replaceable diary entry.
- `app/components/VictoryVelocity.tsx` — the primary project feature.
- `app/components/ContactFooter.tsx` — the restrained final contact section.
- `tests/homepage-exploration-reframe.test.mjs` — source-level contract tests for approved copy, section order, links, and removals.

**Modify**

- `.gitignore` — ignore visual brainstorming session files under `/.superpowers/`.
- `package.json` — expose the existing Node test suite through `npm test`.
- `app/components/Hero.tsx` — replace the ML pitch with the approved motto and separate location line.
- `app/components/Masthead.tsx` — change navigation to Building, About, Contact.
- `app/components/About.tsx` — update only the section label from `04 — About` to `03 — About`.
- `app/components/FeaturedSickNote.tsx` — relabel the section and remove the long bullet list.
- `app/page.tsx` — render the approved interwoven order.

**Delete**

- `app/components/NextTeaser.tsx` — superseded by `VictoryVelocity.tsx`.
- `app/components/IndexTable.tsx` — the résumé-style homepage index is out of scope.

---

### Task 1: Establish the feature branch contracts and introduction

**Files:**

- Create: `tests/homepage-exploration-reframe.test.mjs`
- Create: `app/components/Recently.tsx`
- Modify: `app/components/Hero.tsx`
- Modify: `app/components/Masthead.tsx`
- Modify: `package.json`
- Modify: `.gitignore`

**Interfaces:**

- Produces: `Recently(): JSX.Element`, rendered later by `app/page.tsx`.
- Produces: stable anchors `#building`, `#about`, and `#contact` for later sections.
- Consumes: the existing `Reveal` component and existing Tailwind design tokens.

- [ ] **Step 1: Confirm branch isolation and baseline health**

Run:

```bash
git branch --show-current
git status --short
node --test tests/*.test.mjs
npm run lint
```

Expected:

- Branch is `feat/portfolio-exploration-reframe`.
- The worktree contains the approved spec and plan but no unrelated user changes.
- The existing ball reel tests pass.
- ESLint exits successfully.

- [ ] **Step 2: Add the introduction contract tests**

Create `tests/homepage-exploration-reframe.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8")
}

function count(source, value) {
  return source.split(value).length - 1
}

function compact(source) {
  return source.replace(/\s+/g, " ").trim()
}

test("hero uses the approved motto and keeps the location line", () => {
  const source = read("app/components/Hero.tsx")

  assert.equal(count(source, "Exploring the world through people and tech."), 1)
  assert.equal(
    count(source, "Vancouver, BC — UBC Sauder BUCS, Class of 2030."),
    1,
  )
  assert.doesNotMatch(source, /I love building ML systems/)
})

test("masthead links to Building, About, and Contact", () => {
  const source = read("app/components/Masthead.tsx")

  assert.match(source, /\{ label: "Building", href: "#building"/)
  assert.match(source, /\{ label: "About", href: "#about"/)
  assert.match(source, /\{ label: "Contact", href: "#contact"/)
  assert.doesNotMatch(source, /\{ label: "Work"/)
})

test("Recently is one static diary entry", () => {
  const source = read("app/components/Recently.tsx")
  const entry =
    "Recently, I saw 2027 internships opening at places like Amazon and Databricks and immediately started stressing about applying—even while on vacation. Then I remembered I’m 17, haven’t taken a single university class, and couldn’t really explain why I wanted one. I think I just want to explore, meet interesting people, and learn, and assumed big tech was the best way to do that. Funny how we stress over things before asking why we want them. I guess figuring that out takes time and a bit of stupidity."

  assert.equal(count(compact(source), entry), 1)
  assert.match(source, /01 — Recently/)
  assert.doesNotMatch(source, /entries\.map|archive|publishedAt/)
})
```

- [ ] **Step 3: Run the new tests and verify the expected failures**

Run:

```bash
node --test tests/homepage-exploration-reframe.test.mjs
```

Expected: FAIL because the hero and masthead still contain old copy and `Recently.tsx` does not exist.

- [ ] **Step 4: Add the test script and ignore brainstorming artifacts**

In `package.json`, update the scripts object to:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "node --test tests/*.test.mjs"
  }
}
```

Add this line under the miscellaneous entries in `.gitignore`:

```gitignore
/.superpowers/
```

- [ ] **Step 5: Replace the hero pitch while preserving the existing layout**

Replace `app/components/Hero.tsx` with:

```tsx
import Image from "next/image"
import Reveal from "./Reveal"

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_340px] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-8">My DMs are open.</p>
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
              <span className="block">Exploring the world through people and tech.</span>
              <span className="mt-2 block font-serif italic">
                Vancouver, BC — UBC Sauder BUCS, Class of 2030.
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              <a href="mailto:jaredshum101@gmail.com" className="meta-link">
                Email ↗︎
              </a>
              <a
                href="https://github.com/jyshum"
                target="_blank"
                rel="noopener noreferrer"
                className="meta-link"
              >
                GitHub ↗︎
              </a>
              <a
                href="https://www.linkedin.com/in/jared-shum-a9199034b/"
                target="_blank"
                rel="noopener noreferrer"
                className="meta-link"
              >
                LinkedIn ↗︎
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <Image
            src="/croatia-hero.jpeg"
            alt="Jared Shum on the Adriatic coast, Croatia"
            width={1200}
            height={1600}
            priority
            className="aspect-[4/5] w-full border border-rule object-cover object-[center_30%]"
          />
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Update the masthead anchors**

Replace `app/components/Masthead.tsx` with:

```tsx
const links = [
  { label: "Building", href: "#building" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function Masthead() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-serif text-lg font-semibold tracking-tight">
          Jared Shum
        </a>
        <nav className="flex items-center gap-5 sm:gap-8">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="meta-link">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 7: Add the single-entry Recently section**

Create `app/components/Recently.tsx`:

```tsx
import Reveal from "./Reveal"

export default function Recently() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow mb-8">01 — Recently</p>
          <p className="max-w-3xl text-lg leading-relaxed text-ink/80">
            Recently, I saw 2027 internships opening at places like Amazon and
            Databricks and immediately started stressing about applying—even while
            on vacation. Then I remembered I’m 17, haven’t taken a single university
            class, and couldn’t really explain why I wanted one. I think I just want
            to explore, meet interesting people, and learn, and assumed big tech was
            the best way to do that. Funny how we stress over things before asking
            why we want them. I guess figuring that out takes time and a bit of
            stupidity.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Run the focused tests**

Run:

```bash
npm test
```

Expected: the hero, masthead, Recently, and existing ball reel tests all pass.

- [ ] **Step 9: Record the branch checkpoint without staging or committing**

Run:

```bash
git branch --show-current
git status --short
```

Expected: branch remains `feat/portfolio-exploration-reframe`; only Task 1 files and approved documentation are modified/untracked.

---

### Task 2: Build the concise Victory Velocity feature

**Files:**

- Create: `app/components/VictoryVelocity.tsx`
- Modify: `tests/homepage-exploration-reframe.test.mjs`

**Interfaces:**

- Produces: `VictoryVelocity(): JSX.Element`.
- Produces: the `id="building"` anchor consumed by `Masthead`.
- Consumes: `Reveal`, `next/image`, and `/vvicon.png`.

- [ ] **Step 1: Add the Victory Velocity content and asset contracts**

Change the Node filesystem import in `tests/homepage-exploration-reframe.test.mjs` to:

```js
import { existsSync, readFileSync } from "node:fs"
```

Then append:

```js
test("Victory Velocity does not use a homepage screenshot", () => {
  assert.equal(
    existsSync(
      new URL("../public/victory-velocity-shot.png", import.meta.url),
    ),
    false,
  )
})

test("Victory Velocity is a concise feature with exactly one description", () => {
  const source = read("app/components/VictoryVelocity.tsx")
  const description = "Engineering how brands can appear in AI responses."

  assert.match(source, /id="building"/)
  assert.match(source, /02 — Building/)
  assert.equal(count(source, description), 1)
  assert.doesNotMatch(source, /victory-velocity-shot/)
  assert.match(source, /src="\/vvicon\.png"/)
  assert.match(source, /href="https:\/\/www\.victoryvelocity\.ca\/"/)
  assert.doesNotMatch(source, /Generative Engine Optimization|ChatGPT Ads|tech stack/i)
})
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
node --test tests/homepage-exploration-reframe.test.mjs
```

Expected: FAIL because `VictoryVelocity.tsx` does not exist.

- [ ] **Step 3: Create the primary feature**

Create `app/components/VictoryVelocity.tsx`:

```tsx
import Image from "next/image"
import Reveal from "./Reveal"

export default function VictoryVelocity() {
  return (
    <section id="building" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-12">02 — Building</p>
        </Reveal>
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-4 sm:gap-5">
              <Image
                src="/vvicon.png"
                alt=""
                width={1074}
                height={930}
                className="h-12 w-auto sm:h-14"
              />
              <h2 className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
                Victory Velocity
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 text-lg leading-relaxed text-ink/80">
              Engineering how brands can appear in AI responses.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="https://www.victoryvelocity.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
            >
              Visit ↗︎
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run the feature contracts**

Run:

```bash
npm test
```

Expected: all tests pass, including the no-screenshot assertion and the exact one-line Victory Velocity description.

- [ ] **Step 5: Record the branch checkpoint without staging or committing**

Run:

```bash
git status --short
```

Expected: the new component appears only in the feature worktree.

---

### Task 3: Preserve About and simplify SickNote

**Files:**

- Modify: `app/components/About.tsx`
- Modify: `app/components/FeaturedSickNote.tsx`
- Modify: `tests/homepage-exploration-reframe.test.mjs`

**Interfaces:**

- Produces: unchanged About content under label `03 — About`.
- Produces: `FeaturedSickNote(): JSX.Element` under label `04 — Also built`, without a bullet-list dependency.
- Consumes: the existing `BallReel`, `Reveal`, and `/sicknote-shot.png`.

- [ ] **Step 1: Add About and SickNote regression contracts**

Append to `tests/homepage-exploration-reframe.test.mjs`:

```js
test("About keeps its personal content under section 03", () => {
  const source = read("app/components/About.tsx")

  assert.match(source, /03 — About/)
  assert.match(source, /Basketball — peaked in high school as a D&3 shooting guard/)
  assert.match(source, /@CrocEdge/)
  assert.match(source, /filming and playing dinosaur games are my zen, subscribe!/)
  assert.match(source, /<BallReel \/>/)
})

test("SickNote remains a complete demo without resume bullets", () => {
  const source = read("app/components/FeaturedSickNote.tsx")

  assert.match(source, /04 — Also built/)
  assert.match(source, /SickNote turns cough recordings into mel/)
  assert.match(source, /Grad-CAM heatmap/)
  assert.match(source, /Next\.js · TypeScript · FastAPI · PyTorch · Docker · Railway · Vercel/)
  assert.match(source, /src="\/sicknote-shot\.png"/)
  assert.match(source, /href="https:\/\/www\.sicknoteinc\.xyz\/"/)
  assert.match(source, /href="https:\/\/github\.com\/jyshum\/SickNote"/)
  assert.doesNotMatch(source, /const points|<ul|<li/)
})
```

- [ ] **Step 2: Run the tests and verify failure**

Run:

```bash
node --test tests/homepage-exploration-reframe.test.mjs
```

Expected: FAIL because About is still numbered 04 and SickNote is still numbered 01 with a points array and list.

- [ ] **Step 3: Renumber About without changing its content**

In `app/components/About.tsx`, make this exact replacement:

```diff
-          <p className="eyebrow mb-12">04 — About</p>
+          <p className="eyebrow mb-12">03 — About</p>
```

Do not change any other About copy, image, link, or `BallReel` placement.

- [ ] **Step 4: Remove the SickNote bullet list and relabel the complete demo**

Replace `app/components/FeaturedSickNote.tsx` with:

```tsx
import Image from "next/image"
import Reveal from "./Reveal"

export default function FeaturedSickNote() {
  return (
    <section id="sicknote" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-12">04 — Also built</p>
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
                SickNote turns cough recordings into mel spectrograms and classifies
                them with an ensemble of five convolutional neural networks —
                returning a prediction alongside a Grad-CAM heatmap.
              </p>
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
                  Visit ↗︎
                </a>
                <a
                  href="https://github.com/jyshum/SickNote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-link"
                >
                  Source ↗︎
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="https://www.sicknoteinc.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SickNote — live site"
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
            <p className="meta mt-3 normal-case tracking-[0.15em]">
              sicknoteinc.xyz — live
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run regression tests**

Run:

```bash
npm test
```

Expected: all homepage contracts and ball reel tests pass.

- [ ] **Step 6: Confirm About changed only where approved**

Run:

```bash
git diff -- app/components/About.tsx
```

Expected: the only About diff is `04 — About` becoming `03 — About`.

---

### Task 4: Compose the interwoven homepage and contact ending

**Files:**

- Create: `app/components/ContactFooter.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/homepage-exploration-reframe.test.mjs`
- Delete: `app/components/NextTeaser.tsx`
- Delete: `app/components/IndexTable.tsx`

**Interfaces:**

- Produces: `ContactFooter(): JSX.Element` with `id="contact"`.
- Consumes: `Recently`, `VictoryVelocity`, `About`, `FeaturedSickNote`, and `ContactFooter` in the approved order.

- [ ] **Step 1: Add composition and footer contracts**

Append to `tests/homepage-exploration-reframe.test.mjs`:

```js
test("homepage follows the approved interwoven order", () => {
  const source = read("app/page.tsx")
  const renderedSections = [
    ...source.matchAll(
      /<(Hero|Recently|VictoryVelocity|About|FeaturedSickNote|ContactFooter)\s*\/>/g,
    ),
  ].map((match) => match[1])

  assert.deepEqual(renderedSections, [
    "Hero",
    "Recently",
    "VictoryVelocity",
    "About",
    "FeaturedSickNote",
    "ContactFooter",
  ])
  assert.doesNotMatch(source, /NextTeaser|IndexTable/)
})

test("contact footer contains only the established contact routes", () => {
  const source = read("app/components/ContactFooter.tsx")

  assert.match(source, /id="contact"/)
  assert.match(source, /mailto:jaredshum101@gmail\.com/)
  assert.match(source, /https:\/\/github\.com\/jyshum/)
  assert.match(source, /https:\/\/www\.linkedin\.com\/in\/jared-shum-a9199034b\//)
  assert.doesNotMatch(source, /<form|resume|book a call/i)
})
```

- [ ] **Step 2: Run the tests and verify failure**

Run:

```bash
node --test tests/homepage-exploration-reframe.test.mjs
```

Expected: FAIL because the footer does not exist and the homepage still renders the old project sequence.

- [ ] **Step 3: Add the restrained contact footer**

Create `app/components/ContactFooter.tsx`:

```tsx
import Reveal from "./Reveal"

const links = [
  { label: "Email", href: "mailto:jaredshum101@gmail.com" },
  { label: "GitHub", href: "https://github.com/jyshum" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jared-shum-a9199034b/",
  },
]

export default function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow mb-8">Contact</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map(({ label, href }) => {
              const external = href.startsWith("http")

              return (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="meta-link"
                >
                  {label} ↗︎
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Render the approved order**

Replace `app/page.tsx` with:

```tsx
import Masthead from "./components/Masthead"
import Hero from "./components/Hero"
import Recently from "./components/Recently"
import VictoryVelocity from "./components/VictoryVelocity"
import About from "./components/About"
import FeaturedSickNote from "./components/FeaturedSickNote"
import ContactFooter from "./components/ContactFooter"

export default function Home() {
  return (
    <main>
      <Masthead />
      <Hero />
      <Recently />
      <VictoryVelocity />
      <About />
      <FeaturedSickNote />
      <ContactFooter />
    </main>
  )
}
```

- [ ] **Step 5: Remove the superseded homepage components**

Delete:

```text
app/components/NextTeaser.tsx
app/components/IndexTable.tsx
```

Before deleting, confirm `rg -n "NextTeaser|IndexTable" app` returns only the old files and the imports being replaced in `app/page.tsx`.

- [ ] **Step 6: Run all automated checks**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected:

- All Node tests pass.
- ESLint exits with no errors.
- Next.js 16.2.1 completes a production build successfully.

---

### Task 5: Run and visually verify the feature branch on localhost

**Files:**

- No product file changes expected.
- Temporary screenshots: `/tmp/portfolio-exploration-desktop.png`, `/tmp/portfolio-exploration-mobile.png`.

**Interfaces:**

- Consumes: the completed feature branch.
- Produces: a live localhost URL and visual-review evidence.

- [ ] **Step 1: Start the feature worktree development server**

Run from the feature worktree:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Expected: Next.js reports the site ready at `http://127.0.0.1:3000`.

If port 3000 is already occupied by the unchanged portfolio, use:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3001
```

Expected: the feature branch is available at `http://127.0.0.1:3001` while the existing profile can remain on port 3000.

- [ ] **Step 2: Confirm the homepage responds**

Run against the selected port:

```bash
curl -I http://127.0.0.1:3000
```

Expected: `HTTP/1.1 200 OK`. Use port 3001 in the command if that is the selected preview port.

- [ ] **Step 3: Capture desktop and mobile review images**

Run against the selected port:

```bash
npx --yes playwright screenshot --viewport-size "1440,1200" --full-page "http://127.0.0.1:3000" /tmp/portfolio-exploration-desktop.png
npx --yes playwright screenshot --device "iPhone 13" --full-page "http://127.0.0.1:3000" /tmp/portfolio-exploration-mobile.png
```

Expected: both screenshots capture the full homepage. Use port 3001 if that is the selected preview port.

- [ ] **Step 4: Inspect the visual acceptance criteria**

Confirm from the screenshots and live page:

- The existing editorial visual identity is preserved.
- The hero reads “Exploring the world through people and tech.” with the UBC line beneath it.
- Recently is a short standalone chapter, not a blog feed.
- Victory Velocity appears before About and contains only one descriptive sentence.
- About remains visually and textually unchanged apart from numbering and placement.
- SickNote appears after About, retains a complete demo, and has no bullet list.
- Contact anchors to the final footer.
- No desktop or mobile horizontal overflow is present.
- Project screenshots are sharp and do not cause layout shift.
- Basketball hover/tap behavior still works.

- [ ] **Step 5: Re-run final verification after visual review**

Run:

```bash
npm test
npm run lint
npm run build
git diff --check
git status --short
```

Expected: all tests, lint, build, and whitespace checks pass; all implementation changes are confined to `feat/portfolio-exploration-reframe`.

- [ ] **Step 6: Hand off the localhost preview**

Keep the development server running and provide Jared:

- The feature branch name.
- The feature worktree path.
- The exact localhost URL.
- A concise summary of what changed.
- Any visual issue still requiring a decision.

Do not merge, deploy, stage, or commit unless Jared explicitly requests it or the repository's Friday/Sunday commit rule applies.
