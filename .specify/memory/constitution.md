# LambdaScore Constitution

## Core Principles

### I. Spec before code

No feature is implemented until `specs/[###-feature]/spec.md` states the user value, the functional requirements, and the success criteria. Technical choices belong in `plan.md`, not in the specification.

### II. Stack fijo

The public site is a Next.js application (App Router) deployed on Vercel. Editorial content is managed in **Sanity** (headless CMS). SEO uses the framework Metadata API, `sitemap.ts`, `robots.ts`, canonical URLs, Open Graph, and JSON-LD. A new library, CMS, or host requires an amendment to this constitution before it appears in a plan.

### III. Spanish (Mexico) and stable URLs

The interface and editorial content are `es-MX`. Routes already indexed on `lambdascore.com.mx` stay reachable. One URL is canonical; the duplicate form (trailing slash) redirects to it. The production host is `https://lambdascore.com.mx`.

### IV. Secrets stay out of the repository

Payment instructions may describe the transfer flow. Account numbers, cards, API keys, and form destinations live in Vercel environment variables or private content config, never in git.

### V. Smallest surface that meets the spec

The site does not rebuild the Fitnech registration platform or the RFID timing system. Editors change events, posts, rental prices, and results in Sanity without touching layout components. Each user story in `tasks.md` stays independently testable.

### VI. Differentiator first

Public marketing pages lead with the All-in-One promise (finish line, chip, kit, and registration), not a generic timing slogan. Canonical copy lives in `specs/001-sitio-lambdascore/content/copy.md`. The first viewport is one composition: brand-dominant, full-bleed real photography, no card clutter in the hero.

## Delivery

Each feature folder follows Spec Kit:

```text
specs/[###-feature]/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

A story is done when its acceptance scenarios pass on a Vercel preview and its success criteria still hold.

## Governance

This constitution overrides a feature plan when they conflict. Amendments update this file, raise the version, and set **Last Amended**. Existing plans are re-checked against the constitution before new tasks are executed.

**Version**: 1.2.0 | **Ratified**: 2026-10-01 | **Last Amended**: 2026-10-01
