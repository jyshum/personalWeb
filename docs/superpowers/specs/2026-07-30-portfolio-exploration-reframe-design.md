# Portfolio Exploration Reframe Design

**Date:** 2026-07-30
**Status:** Approved in conversation

## Purpose

Reframe the portfolio so it remains clearly tech-focused without reading like a recruiting page or an ML résumé. The site should present work as part of Jared's broader curiosity about people and technology while preserving the existing editorial visual identity.

This is a content and hierarchy update, not a visual redesign.

## Goals

- Broaden the hero from ML-specific positioning to Jared's motto.
- Add one casual, current diary entry through a lightweight `Recently` section.
- Make Victory Velocity the primary technology feature.
- Break up project content with the existing personal About section.
- Keep SickNote fully represented as a repository and live-project demo without its résumé-like bullet list.
- Remove the long work index from the homepage.
- Preserve the current typography, palette, spacing, photography, motion, and responsive behavior.

## Non-Goals

- Creating a blog, journal archive, CMS, or dynamic content system.
- Redesigning the site around a scrapbook, dashboard, or new visual theme.
- Removing the site's technology focus.
- Adding interest tags, personal-value statements, or a detailed autobiography.
- Rewriting the existing About content.
- Showing the AI Data Internship or Cycle Length Prediction on the homepage.

## Information Architecture

The homepage order will be:

1. Hero
2. `01 — Recently`
3. `02 — Building` — Victory Velocity
4. `03 — About`
5. `04 — Also built` — SickNote
6. Contact footer

This order deliberately places About between the two projects. Work therefore becomes part of the page's overall story instead of appearing as a continuous résumé block.

The masthead links will be:

- Building
- About
- Contact

The links target the Victory Velocity section, the existing About section, and the new contact footer respectively.

## Hero

The hero retains:

- The large `Jared Shum` heading.
- The existing Croatia photograph.
- The `My DMs are open.` eyebrow.
- Email, GitHub, and LinkedIn links.
- Existing spacing, responsive grid, and reveal animations.

The current ML-focused paragraph will be replaced with:

> Exploring the world through people and tech.

The existing location and education text remains immediately beneath it:

> Vancouver, BC — UBC Sauder BUCS, Class of 2030.

The motto and location should be visually distinct lines. The location retains the current serif italic treatment.

## Recently

`Recently` is a static section containing exactly one manually replaceable paragraph. It is not a feed and has no archive, dates, pagination, or content model.

Initial copy:

> Recently, I saw 2027 internships opening at places like Amazon and Databricks and immediately started stressing about applying—even while on vacation. Then I remembered I’m 17, haven’t taken a single university class, and couldn’t really explain why I wanted one. I think I just want to explore, meet interesting people, and learn, and assumed big tech was the best way to do that. Funny how we stress over things before asking why we want them. I guess figuring that out takes time and a bit of stupidity.

The section uses the same max width, border, eyebrow, typography, spacing, and reveal behavior as the rest of the site. The paragraph should remain a single concise text block rather than an essay layout.

## Victory Velocity

Victory Velocity becomes the primary technology feature and replaces its current minimal teaser.

The section contains:

- The Victory Velocity name and existing mark.
- Exactly one descriptive line:

  > Engineering how brands can appear in AI responses.

- One link to the live site.

There is no second descriptive sentence, service list, technical stack, achievement list, or marketing explanation.

The feature remains intentionally text-led, without a homepage screenshot. Its generous spacing and typography keep it substantial within the portfolio's existing paper, rule, serif, and mono design system.

## About

The About section moves between Victory Velocity and SickNote.

Its content and internal presentation remain unchanged:

- Basketball photographs.
- The basketball and UBC intramurals paragraph.
- The CrocEdge YouTube paragraph and link.
- The interactive court-tape reel.

Only its page position and section number change.

## SickNote

SickNote remains a complete project and repository demo rather than becoming a one-line teaser.

It retains:

- The project title and year.
- The existing live-site screenshot.
- The explanatory paragraph describing cough recordings, mel spectrograms, the CNN ensemble, and Grad-CAM output.
- The concise technology stack.
- The live-site and GitHub source links.

The existing four-item technical bullet list is removed. No replacement bullet list is added.

The section appears after About and is labeled `04 — Also built`. It retains the current two-column project layout; removing the bullet list provides the intended reduction in height without weakening the demo.

## Contact Footer

Add a restrained contact footer after SickNote using the existing design language. It contains Jared's existing:

- Email
- GitHub
- LinkedIn

No contact form, résumé link, call-booking flow, or new marketing copy is added.

## Visual System

Preserve the current:

- Paper, ink, vermillion accent, rule, and faint color tokens.
- Fraunces, Inter, and IBM Plex Mono roles.
- `max-w-5xl` content width and responsive padding.
- Border-separated editorial sections.
- Eyebrow, metadata, and external-link styles.
- Reveal animations.
- Grayscale-to-color basketball imagery.

The numbered labels make all page sections equal editorial chapters:

- `01 — Recently`
- `02 — Building`
- `03 — About`
- `04 — Also built`

No new theme, card system, rounded visual language, decorative interest tags, or scrapbook layout is introduced.

## Component Boundaries

The implementation should keep each homepage section independent:

- `Hero` owns the revised motto and location presentation.
- A new `Recently` component owns the single diary paragraph.
- A new `VictoryVelocity` component replaces `NextTeaser`.
- `About` remains internally unchanged.
- `FeaturedSickNote` is simplified by removing its bullet data and list rendering.
- A small `ContactFooter` owns the final contact links.
- `page.tsx` owns only section ordering.

`NextTeaser.tsx` and `IndexTable.tsx` are deleted after their replacements are wired into `page.tsx`; neither has another consumer.

## Data and Failure Behavior

All content remains local and static. There is no CMS, API request, database, or runtime content loading.

External links:

- Open in a new tab.
- Use `rel="noopener noreferrer"`.
- Remain readable and usable if images or animation fail.

Project images use Next.js image handling with meaningful alt text and explicit dimensions. The page must remain understandable without hover effects or JavaScript-driven reveal animation.

## Responsive and Accessibility Requirements

- Preserve a readable single-column flow on small screens.
- Keep the hero photograph below or alongside the text according to the existing breakpoint behavior.
- Ensure Victory Velocity and SickNote visuals do not create horizontal overflow.
- Keep body copy readable without requiring hover.
- Maintain descriptive image alt text.
- Keep visible keyboard focus and semantic section/link structure.

## Verification

Implementation is complete when:

- The production build and lint checks pass.
- The homepage order matches the approved architecture.
- The hero contains the exact approved motto and retains the location/education line.
- `Recently` shows exactly one paragraph.
- Victory Velocity shows exactly one descriptive line.
- About content is unchanged apart from placement and numbering.
- SickNote retains its full demo information except for the removed bullet list.
- The internship and Cycle Length Prediction are absent from the homepage.
- Masthead anchor links reach the correct sections.
- External project and social links work.
- Desktop and mobile layouts have no clipping or horizontal overflow.
- The site remains understandable and usable without hover.
