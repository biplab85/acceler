# Acceler Investing — Website Rebuild

Premium one-page website for [Acceler Investing](https://acceler.com.au/), a data-driven property buyer's agency analysing 15,000+ suburbs across Australia.

## Tech Stack

- **Framework:** Next.js (React)
- **Styling:** SCSS Modules (no Tailwind, no plain CSS)
- **Slider:** Swiper.js
- **Lightbox:** Fancybox
- **Icons:** React Icons
- **Class Utils:** clsx

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, SectionWrapper
│   ├── sections/        # Hero, About, Services, CaseStudies, Gallery, etc.
│   └── ui/              # ServiceCard, FAQItem, Button, TestimonialCard, etc.
├── hooks/               # useScrollAnimation, useActiveSection
├── lib/
│   ├── constants.ts     # Non-content config (breakpoints, nav anchors)
│   └── content.tsx      # ALL site content (text, icons, data)
├── styles/
│   ├── globals.scss
│   ├── _variables.scss
│   ├── _breakpoints.scss
│   ├── _typography.scss
│   ├── _mixins.scss
│   ├── _animations.scss
│   └── _placeholders.scss
└── app/
    ├── layout.tsx
    └── page.tsx
```

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `$primary` | `#022949` | Navy — headings, nav, footer |
| `$accent` | `#ff914d` | Orange — CTAs, highlights |
| `$surface` | `#ffffff` | Main canvas |
| `$container-max` | `1440px` | Desktop max-width |

**Typography:** Sora (headings) + Inter (body). Two fonts only.

## Content Management

All site content lives in `src/lib/content.tsx`. Components are pure renderers — zero hardcoded strings in JSX. Edit content in one place, the entire site updates.

## SCSS Architecture

Every component has a co-located `.module.scss` file. Shared styles use partials:

- `_variables.scss` — colours, spacing, radius, transitions
- `_breakpoints.scss` — `respond-to()` and `below()` responsive mixins
- `_mixins.scss` — `shadow-sm`, `card-variant()`, `button-variant()`, `theme()`, `hover-lift()`
- `_typography.scss` — `font-heading()`, `font-body()`, `font-label()` presets
- `_animations.scss` — keyframes + `@for` stagger generation

## Roadmap

- [x] Task plan (`task.md`)
- [ ] One-page build (light theme)
- [ ] Dark mode toggle
- [ ] Multi-page conversion (Services, Results, About, Contact, Blog)

## Docs

See [`task.md`](./task.md) for the full build specification — design system, section breakdowns, component architecture, SCSS patterns, and quality checklist.
