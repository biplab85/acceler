# Acceler Website Rebuild — Premium One-Page

## Goal

Rebuild [acceler.com.au](https://acceler.com.au/) as a single-page, premium website that feels architect-designed — not template-generated. The site represents a data-driven property buyer's agency analysing 15,000+ suburbs across Australia. Every pixel must communicate trust, authority, and sophistication.

This is not a redesign exercise. It's a ground-up rebuild with intentional layout decisions, real content from the existing brand, and enough visual personality that no one mistakes it for AI output.

**Tech stack:** Next.js + SCSS (modular, no Tailwind, no plain CSS) + Swiper.js + Fancybox + React Icons
**Theme:** Light/white-first (dark mode planned for phase 2)
**Scalability:** Architected as one-page now, convertible to multi-page later

---

## Design System

### Colour Palette (Light Theme)

| SCSS Variable | Hex | Usage |
|---|---|---|
| `$primary` | `#022949` | Headings, nav, footer background, primary buttons |
| `$accent` | `#ff914d` | CTAs, highlights, hover states, active indicators |
| `$accent-hover` | `#e87d3a` | Button hover, link hover |
| `$surface` | `#ffffff` | Card backgrounds, main canvas |
| `$surface-alt` | `#f7f8fa` | Alternating section backgrounds |
| `$surface-warm` | `#fff7ed` | Accent callout backgrounds, subtle warm panels |
| `$text-primary` | `#1a1a2e` | Body copy, headings |
| `$text-secondary` | `#5a6275` | Descriptions, captions, muted labels |
| `$text-tertiary` | `#94a3b8` | Placeholders, disabled states |
| `$border` | `#e8eaef` | Card borders, dividers |
| `$border-light` | `#f0f1f4` | Subtle separators |

**Rule:** Never use pure black (`#000`). Never use generic blue (`#3b82f6`). The navy-to-orange pairing is the brand's identity — respect it.

### Typography

Two fonts only. No exceptions.

| Role | Font | Weight | Sizes |
|---|---|---|---|
| **Heading** | **Sora** | 600, 700 | 48px (hero), 36px (section), 24px (subsection), 18px (card) |
| **Body** | **Inter** | 400, 500 | 16px (body), 14px (caption/label), 13px (small/meta) |

**Hierarchy pattern (every section follows this):**
1. **Label** — uppercase, 13px, Inter 500, letter-spacing 0.08em, `$accent` colour
2. **Heading** — Sora 700, 36–48px, `$text-primary`, tight line-height (1.15)
3. **Description** — Inter 400, 16px, `$text-secondary`, line-height 1.7, max-width 560px

**Rules:**
- Never make everything bold. Labels are medium-weight, descriptions are regular.
- Headings use tight line-height (1.15). Body uses generous line-height (1.7).
- Left-align text by default. Centre only for standalone CTAs and hero taglines.

### Spacing System

Defined as SCSS variables and mixins — no utility classes.

| Context | SCSS Variable / Value |
|---|---|
| Section vertical padding | `$section-pad-sm: 96px`, `$section-pad-md: 112px`, `$section-pad-lg: 128px` (rotate per section — never identical) |
| Between label → heading | `$gap-label: 12px` |
| Between heading → description | `$gap-heading: 20px` |
| Between description → content | `$gap-content: 48px` to `64px` |
| Card internal padding | `$card-pad: 24px` to `32px` |
| Card gap in grids | `$grid-gap: 24px` to `32px` |
| Container max-width | `$container-max: 1440px` |
| Container padding | `$container-px: 20px` (mobile), `40px` (desktop) |

**Rule:** Alternate section padding. If Hero uses `$section-pad-lg`, About uses `$section-pad-sm`, Services uses `$section-pad-md`. This kills the "stamped out by a machine" feel.

### UI Principles

- **Controlled asymmetry.** Text-left + image-right, then flip. Offset grid columns (7/5, 5/7, not 6/6).
- **Breathing room.** Generous whitespace. Let content sit. Don't fill every gap.
- **One accent per viewport.** Only one orange element should dominate per visible screen area.
- **Depth without glow.** Use SCSS shadow mixins (`@include shadow-sm`, `@include shadow-md`). No coloured box-shadows. No glow effects.
- **Border restraint.** Prefer `border-bottom` or subtle `box-shadow: inset` borders over full borders. Cards can use background contrast instead of borders.

### SCSS Architecture Rules

**Never use plain CSS files. Never use Tailwind utility classes. All styling is SCSS.**

**File naming:** Every component gets a co-located `.module.scss` file (CSS Modules for scoping).

**SCSS features to use properly:**
- **Variables** (`$primary`, `$accent`) — defined in `_variables.scss`
- **Nesting** — max 3 levels deep, use `&` for modifiers and states
- **Mixins** — for responsive breakpoints, typography presets, shadows, transitions
- **Conditionals** — `@if`, `@else` for theme-aware styles, variant-based component styling
- **Loops** — `@for`, `@each` for generating grid columns, stagger delays, colour variants
- **Partials** — prefixed with `_`, imported via `@use`
- **`@use` / `@forward`** — no `@import` (deprecated). Namespace partials properly.
- **Placeholder selectors** (`%flex-center`) — for shared base styles via `@extend`
- **Maps** — for colour palettes, breakpoints, spacing scales. Access with `map.get()`.

**Conditional SCSS patterns required:**

```scss
// Theme-aware component styling
@mixin theme($mode) {
  @if $mode == 'light' {
    background: $surface;
    color: $text-primary;
  } @else if $mode == 'dark' {
    background: $surface-dark;
    color: $text-primary-dark;
  }
}

// Variant-driven card rendering
@mixin card-variant($variant: 'default') {
  @include shadow-sm;
  padding: $card-pad;
  border-radius: $radius-lg;

  @if $variant == 'elevated' {
    transform: translateY(-#{$space-sm});
    @include shadow-md;
  } @else if $variant == 'warm' {
    background: $surface-warm;
    border-left: 3px solid $accent;
  } @else if $variant == 'outlined' {
    background: transparent;
    border: 1px solid $border;
  }
}

// Responsive conditional
@mixin respond-to($breakpoint) {
  $value: map.get($breakpoints, $breakpoint);
  @if $value {
    @media (min-width: $value) { @content; }
  } @else {
    @warn "Unknown breakpoint: #{$breakpoint}";
  }
}

// Staggered animation generation
@for $i from 1 through 8 {
  .stagger-#{$i} {
    animation-delay: #{$i * 80}ms;
  }
}

// Colour map iteration
@each $name, $color in $colors {
  .text-#{$name} {
    color: $color;
  }
}
```

---

## Section-by-Section Breakdown

### 1. Navigation

**Layout:** Fixed top, transparent on hero → white with shadow on scroll.

**Structure:**
- Left: Acceler logo (use `nav-logo-lg.svg` from original site)
- Centre: Links — Home, About, Services, Results, Process, FAQ, Contact
- Right: "Free Consultation" button — `$accent` background, white text, `border-radius: $radius-lg`

**Behaviour:**
- Sticky with `backdrop-filter: blur(12px)` and `rgba($surface, 0.9)` background after scroll (use `&.is-scrolled` modifier class)
- Active section highlighting via Intersection Observer
- Mobile: hamburger → slide-in panel from right (not dropdown)

**SCSS:** `Navbar.module.scss` — use `&.is-scrolled`, `&.is-open` conditional modifiers. Use `@include respond-to('tablet')` for mobile breakpoint.

**Component:** `<Navbar />`

---

### 2. Hero Section

**Layout:** Two-column asymmetric — 55% text / 45% visual. NOT centred text over fullscreen image.

**Left column (text):**
- Label: `DATA-DRIVEN PROPERTY ADVISORY`
- Heading: `Unlock the Potential of Australian Property Market`
- Description: `Sourcing high growth, maximum cashflow property analysing 15,000+ suburbs, right across Australia.`
- CTA group: Primary button "Book a Free Call" (`$accent`) + Secondary ghost button "See Our Results"
- Trust line below CTAs: `143 Five-Star Reviews · 75+ Properties Purchased · $70K–$178K Client Equity Gains`

**Right column (visual):**
- Real image/collage: property dashboard screenshot or suburb data visualisation from original site
- Slight rotation (`transform: rotate(1deg)`) and layered shadow for depth
- Optional: a small floating stat card overlapping the image corner (e.g. "15,000+ Suburbs Analysed") — use `position: absolute` with negative offset

**Motion:**
- Text fades in from left (staggered: label → heading → description → CTAs, 100ms delays)
- Image slides in from right with subtle scale (1.02 → 1)
- Floating stat card fades in last with a slight upward drift

**Component:** `<Hero />`

---

### 3. Trust Strip / Social Proof Bar

**Layout:** Single row, full-width, `$surface-alt` background. Not a "logo carousel" — a contextual proof strip.

**Content:**
- Left text: `Trusted by investors across Australia since 2020`
- Right: logos or badges — Google Reviews badge (143 reviews, 5.0), Smart Property Investment podcast feature, any partner/media logos from original site
- If logos unavailable: use stat pills instead — `75+ Properties` · `$1M+ Equity Built` · `100% Satisfaction`

**Style:**
- Logos at `opacity: 0.6`, `&:hover { opacity: 1 }` with transition
- No borders. Subtle `border-bottom: 1px solid $border-light` underneath.
- Compact: `padding: $space-md 0`

**Component:** `<TrustStrip />`

---

### 4. About / Value Proposition

**Layout:** Two-column, image-left (45%) + text-right (55%). Image offset downward by `margin-top: $space-xl` to break grid alignment.

**Image:** Real photo — Nafiz Hoque or team photo from original site. Rounded corners, subtle shadow.

**Text:**
- Label: `WHO WE ARE`
- Heading: `Your Data-Backed Property Partner`
- Description: Founded in 2020, Acceler Investing is a buyer's advocacy firm that doesn't rely on gut feel. We analyse 15,000+ suburbs using proprietary data models to match investors with high-growth, maximum-cashflow properties across Australia.
- A secondary paragraph or pull-quote from Nafiz about mission/why.
- Small stat row below: 3 inline stats with `$accent` numbers (e.g. `Founded 2020`, `15,000+ Suburbs`, `143 Reviews`)

**Motion:** Image parallax on scroll (subtle, 20px max). Text fades up on intersection.

**Component:** `<AboutSection />`

---

### 5. Services

**Layout:** Staggered grid — NOT a uniform 3×1 or 4×1 row. Use a 2-column layout where one card spans full height on the left, and two stack on the right. Or a 3-column grid where the middle card is slightly elevated (`@include card-variant('elevated')`).

**Cards (4–5 services from original site):**
Each card:
- React Icon at top (e.g. `HiOutlineChartBar`, `HiOutlineHome`, `HiOutlineDocumentSearch`, `HiOutlineUserGroup`)
- Title (Sora 600, 18px)
- Description (Inter 400, 15px, 2–3 lines max)
- Subtle hover: card lifts (`transform: translateY(-4px)`), shadow deepens via `@include shadow-md`, icon colour shifts to `$accent`
- No button inside cards. The section itself has a bottom CTA.

**Services to include (from real site):**
1. **Suburb Analysis** — Data-driven research across 15,000+ suburbs
2. **Property Sourcing** — Finding high-growth, high-cashflow investment properties
3. **Buyer's Advocacy** — End-to-end representation from search to settlement
4. **Portfolio Strategy** — Multi-property planning and portfolio construction
5. **Market Reports** — Quarterly data insights and growth forecasts

**Section CTA:** `Explore Our Full Process →` (text link, not a heavy button)

**Component:** `<ServicesSection />`, `<ServiceCard />`

---

### 6. Featured Results / Case Studies

**Layout:** Full-width section with Swiper.js slider. `$surface-alt` background.

**Swiper config:**
- `slidesPerView: 3` (desktop), `2` (tablet), `1` (mobile)
- `spaceBetween: 24`
- `loop: true`
- Navigation arrows (custom styled — circular, `$primary` border, `$accent` on hover)
- Pagination dots below
- `autoplay: { delay: 5000, disableOnInteraction: true }`

**Each slide (from Recent Purchases on original site):**
- Property image (real, from original site)
- Location badge overlay (top-left of image, semi-transparent `$primary` bg)
- Title: suburb/property name
- Key result: equity gain or growth % — large `$accent` number
- Brief detail line (purchase price, type, date)

**Section header:**
- Label: `RESULTS THAT SPEAK`
- Heading: `Recent Client Purchases`
- Description: `Every property backed by data. Every result measured.`

**Component:** `<CaseStudiesSlider />`, `<CaseStudySlide />`

---

### 7. Image Gallery

**Layout:** Asymmetric masonry grid (not uniform). Mix of landscape and portrait aspect ratios.

**Fancybox integration:**
- Click any image → opens Fancybox lightbox with full-size view
- Gallery group: all images linked so user can navigate within lightbox
- Smooth open/close transitions

**Images:** Real property images from acceler.com.au — recent purchases, property inspections, suburb shots.

**Grid pattern (desktop):**
```
[  large-landscape  ] [ portrait ]
[ square ] [ square ] [ large-landscape ]
```
Not a perfect grid — intentional size variation.

**Component:** `<GallerySection />`, `<GalleryGrid />`

---

### 8. Why Choose Us (Proof Section)

**Layout:** Split — left side has a tall accent-background panel (`$surface-warm`) with a large pull-quote or key stat. Right side has 4 proof points stacked.

**Left panel:**
- Large number: `143` (Sora 700, 72px, `$accent`)
- Label: `Five-Star Google Reviews`
- Subtext: `Zero negative reviews. Ever.`

**Right side (4 proof points):**
Each item: icon + title + one-line description
1. `15,000+ Suburbs Analysed` — Proprietary data models, not guesswork
2. `$70K–$178K Equity Gains` — Measurable client outcomes
3. `100% Client Satisfaction` — Every client, every time
4. `75+ Properties Purchased` — Experienced across every market cycle

**Style:** No cards here. Simple stacked list with subtle left-border accent on each item. Keeps visual variety from the card-heavy services section.

**Component:** `<WhyChooseUs />`, `<ProofPoint />`

---

### 9. Process Section

**Layout:** Horizontal timeline on desktop, vertical on mobile. NOT numbered boxes in a row.

**Structure (from original site's 7-step process — condensed to 5 for one-page):**

1. **Discovery Call** — Understand your goals, budget, and strategy
2. **Data Analysis** — Run suburb-level analysis across 15,000+ data points
3. **Property Shortlisting** — Curate properties matching your criteria
4. **Due Diligence** — Inspections, reports, negotiation
5. **Settlement & Beyond** — Secure the property, plan next steps

**Visual:** Each step is a node on a connecting line. The line uses `$border` colour, nodes use `$accent` filled circles. Active/hover state enlarges the node and shows the description.

**Desktop:** Horizontal line with steps spaced along it. Description appears below each node.
**Mobile:** Vertical line on the left, steps stacked with text to the right.

**Motion:** Steps animate in sequentially as user scrolls into view (staggered 150ms).

**Component:** `<ProcessTimeline />`, `<ProcessStep />`

---

### 10. Testimonials

**Layout:** NOT a Swiper here (already used in case studies — avoid repetition). Use a staggered column layout: 3 columns, cards at different heights.

**Each testimonial:**
- Quote text (Inter 400, 16px, italic)
- Client name + context (e.g. "Sarah M. — First-time Investor, Melbourne")
- Star rating (5 stars, `$accent` colour, React Icons `HiStar`)
- Optional: small result tag (e.g. "+$120K equity in 14 months")

**Source:** Pull real testimonials from original site.

**Style:** Cards with `$surface` background, `border: 1px solid $border` subtle border. One card per column uses `$surface-warm` background as accent.

**Component:** `<TestimonialsSection />`, `<TestimonialCard />`

---

### 11. FAQ

**Layout:** Two-column — left has section header (sticky on scroll), right has accordion items.

**Section header (left, sticky):**
- Label: `COMMON QUESTIONS`
- Heading: `Everything You Need to Know`
- Description: `Can't find your answer? Book a free call.`
- Small CTA link: `Book a Consultation →`

**Accordion (right):**
- 6–8 questions relevant to buyer's agency services
- Smooth expand/collapse with height animation
- `+` / `−` toggle icon (not chevron — adds personality)
- Only one open at a time
- Open state: answer text + subtle left border in `$accent`

**Questions (real, relevant):**
1. What does a buyer's agent actually do?
2. How is Acceler different from other buyer's agents?
3. What areas of Australia do you cover?
4. How much does your service cost?
5. How long does the process take?
6. Do you help with investment strategy or just purchasing?
7. Can I see examples of properties you've purchased?
8. What if I'm a first-time investor?

**Component:** `<FAQSection />`, `<FAQItem />`

---

### 12. Final CTA

**Layout:** Full-width, `$primary` background (navy). Centred text. This is the ONE section where centred layout is appropriate.

**Content:**
- Heading: `Ready to Invest Smarter?` (Sora 700, 40px, white)
- Description: `Book a free consultation and let our data show you where the growth is.` (Inter 400, 18px, white/80%)
- CTA button: `Book Your Free Call` — `$accent` background, white text, large padding, `$radius-lg`
- Below button: `No obligation · 30-minute call · Data-backed advice`

**Style:** Clean. No decorative elements. No patterns. Let the colour block and typography do the work.

**Component:** `<CTASection />`

---

### 13. Footer

**Layout:** 4-column grid on `$primary` background (navy).

**Columns:**
1. Logo (white version) + one-line mission + social icons (LinkedIn, Facebook, Instagram — React Icons)
2. Quick Links: Home, About, Services, Results, Process, Contact
3. Resources: FAQ, Privacy Policy, Terms of Service, Blog (coming soon)
4. Contact: Address (Melbourne, VIC), Email, Phone, "Book a Call" link

**Bottom bar:** Copyright `© 2024 Acceler Investing. All Rights Reserved.` + back-to-top button

**Style:** White text on navy. Links at 70% opacity, full on hover. Minimal dividers.

**Component:** `<Footer />`

---

## UX & Interaction Guidelines

### Hover Effects
- **Buttons:** Background darkens (`$accent-hover`), `transform: translateY(-1px)` — handled by `@include button-variant`
- **Cards:** `@include hover-lift(4px)` — shadow transitions from `shadow-sm` to `shadow-md`
- **Links:** Underline slides in from left via `&::after` pseudo-element with `transform: scaleX(0→1)`, `transform-origin: left`
- **Images:** `transform: scale(1.03)` on hover with `overflow: hidden` on container
- **Icons:** `color` transition to `$accent` via `transition: color $transition-base`

### Scroll Animations
- Use Intersection Observer (or `framer-motion` `whileInView`)
- **Default entrance:** Fade up (opacity 0→1, translateY 20px→0), 600ms, ease-out
- **Stagger children:** 80–120ms delay between siblings
- **Never animate the same way twice in adjacent sections.** If About fades up, Services fades in from sides.
- **Parallax:** Hero image only. Subtle (15–20px range). No parallax elsewhere.
- **No animation on re-entry.** Animate once, then stay visible.

### Layout Variation Rules
- Never use the same column split in consecutive sections
- Alternate background: `$surface` → `$surface-alt` → `$surface` (not strict alternation — vary)
- If Section A uses cards, Section B uses a list or timeline
- If Section A has image-left, Section B has image-right or no image

---

## Image Strategy

### Sources
- Extract all property images from acceler.com.au (Recent Purchases section)
- Use team/founder photos from the original site
- Use the client journey diagram from the original site
- Pull the Acceler logo (both `nav-logo-lg.svg` and `nav-logo-sm.svg`)

### Handling
- Store in `/public/images/` organised by section: `/hero/`, `/properties/`, `/gallery/`, `/team/`
- Optimise with Next.js `<Image />` component — automatic WebP, lazy loading, responsive srcset
- All images must have meaningful `alt` text
- Use `placeholder="blur"` with `blurDataURL` for perceived performance
- Aspect ratios: maintain originals, never stretch

### Fallback
- If a real image is unavailable for a specific slot, use a solid `$surface-alt` block with a label — never a stock photo

---

## Component Architecture

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Navbar.module.scss
│   │   ├── Footer.tsx
│   │   ├── Footer.module.scss
│   │   ├── SectionWrapper.tsx      # Reusable section container with animation
│   │   └── SectionWrapper.module.scss
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Hero.module.scss
│   │   ├── TrustStrip.tsx
│   │   ├── TrustStrip.module.scss
│   │   ├── AboutSection.tsx
│   │   ├── AboutSection.module.scss
│   │   ├── ServicesSection.tsx
│   │   ├── ServicesSection.module.scss
│   │   ├── CaseStudiesSlider.tsx
│   │   ├── CaseStudiesSlider.module.scss
│   │   ├── GallerySection.tsx
│   │   ├── GallerySection.module.scss
│   │   ├── WhyChooseUs.tsx
│   │   ├── WhyChooseUs.module.scss
│   │   ├── ProcessTimeline.tsx
│   │   ├── ProcessTimeline.module.scss
│   │   ├── TestimonialsSection.tsx
│   │   ├── TestimonialsSection.module.scss
│   │   ├── FAQSection.tsx
│   │   ├── FAQSection.module.scss
│   │   ├── CTASection.tsx
│   │   └── CTASection.module.scss
│   └── ui/
│       ├── ServiceCard.tsx
│       ├── ServiceCard.module.scss
│       ├── CaseStudySlide.tsx
│       ├── CaseStudySlide.module.scss
│       ├── GalleryGrid.tsx
│       ├── GalleryGrid.module.scss
│       ├── ProofPoint.tsx
│       ├── ProofPoint.module.scss
│       ├── ProcessStep.tsx
│       ├── ProcessStep.module.scss
│       ├── TestimonialCard.tsx
│       ├── TestimonialCard.module.scss
│       ├── FAQItem.tsx
│       ├── FAQItem.module.scss
│       ├── Button.tsx              # Primary / Secondary / Ghost variants
│       ├── Button.module.scss
│       ├── SectionLabel.tsx        # Uppercase accent label
│       ├── SectionLabel.module.scss
│       ├── StatBadge.tsx           # Floating stat indicator
│       └── StatBadge.module.scss
├── hooks/
│   ├── useScrollAnimation.ts       # Intersection Observer wrapper
│   └── useActiveSection.ts         # Nav highlight on scroll
├── lib/
│   ├── constants.ts                # Colours, nav links, breakpoints (non-content config)
│   └── content.tsx                 # ALL site content — text, data, icons, structured by section
├── styles/
│   ├── globals.scss                # Root-level resets, font imports, CSS custom properties
│   ├── _variables.scss             # All SCSS variables ($primary, $accent, spacing, etc.)
│   ├── _breakpoints.scss           # $breakpoints map + respond-to() mixin
│   ├── _typography.scss            # Font-face declarations + type mixins (heading, body, label)
│   ├── _mixins.scss                # shadow-sm, shadow-md, card-variant, theme(), transitions
│   ├── _animations.scss            # @keyframes definitions + stagger generation loops
│   └── _placeholders.scss          # %flex-center, %grid-base, %section-base extendables
└── app/
    ├── layout.tsx
    └── page.tsx                    # Composes all sections
```

### SCSS Partial Breakdown

**`_variables.scss`** — Single source of truth for all design tokens:
```scss
@use 'sass:map';

// Colours
$primary: #022949;
$accent: #ff914d;
$accent-hover: #e87d3a;
$surface: #ffffff;
$surface-alt: #f7f8fa;
$surface-warm: #fff7ed;
$text-primary: #1a1a2e;
$text-secondary: #5a6275;
$text-tertiary: #94a3b8;
$border: #e8eaef;
$border-light: #f0f1f4;

// Dark mode overrides (used conditionally)
$surface-dark: #0f1419;
$surface-alt-dark: #1a2029;
$text-primary-dark: #e8eaef;
$text-secondary-dark: #94a3b8;

// Colour map for loop generation
$colors: (
  'primary': $primary,
  'accent': $accent,
  'text-primary': $text-primary,
  'text-secondary': $text-secondary,
);

// Spacing
$space-xs: 4px;
$space-sm: 8px;
$space-md: 16px;
$space-lg: 24px;
$space-xl: 32px;
$space-2xl: 48px;
$space-3xl: 64px;

// Section padding (intentionally different — rotate per section)
$section-pad-sm: 96px;
$section-pad-md: 112px;
$section-pad-lg: 128px;

// Card
$card-pad: 24px;
$grid-gap: 24px;

// Layout
$container-max: 1440px;
$container-px-mobile: 20px;
$container-px-desktop: 40px;

// Radius
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;
$radius-xl: 16px;

// Transitions
$transition-fast: 150ms ease;
$transition-base: 250ms ease;
$transition-slow: 400ms ease;
```

**`_breakpoints.scss`** — Responsive conditionals:
```scss
@use 'sass:map';

$breakpoints: (
  'mobile': 480px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1280px,
);

@mixin respond-to($breakpoint) {
  $value: map.get($breakpoints, $breakpoint);
  @if $value {
    @media (min-width: $value) {
      @content;
    }
  } @else {
    @warn "Unknown breakpoint: #{$breakpoint}";
  }
}

@mixin below($breakpoint) {
  $value: map.get($breakpoints, $breakpoint);
  @if $value {
    @media (max-width: #{$value - 1px}) {
      @content;
    }
  }
}
```

**`_mixins.scss`** — Reusable conditional patterns:
```scss
@use 'variables' as *;
@use 'breakpoints' as *;

// Shadow system
@mixin shadow-sm {
  box-shadow: 0 1px 3px rgba($primary, 0.06), 0 1px 2px rgba($primary, 0.04);
}
@mixin shadow-md {
  box-shadow: 0 4px 12px rgba($primary, 0.08), 0 2px 4px rgba($primary, 0.04);
}
@mixin shadow-lg {
  box-shadow: 0 12px 32px rgba($primary, 0.1), 0 4px 8px rgba($primary, 0.06);
}

// Theme-aware conditional
@mixin theme($mode) {
  @if $mode == 'light' {
    background-color: $surface;
    color: $text-primary;
  } @else if $mode == 'dark' {
    background-color: $surface-dark;
    color: $text-primary-dark;
  }
}

// Card variant conditional
@mixin card-variant($variant: 'default') {
  @include shadow-sm;
  padding: $card-pad;
  border-radius: $radius-lg;
  transition: transform $transition-base, box-shadow $transition-base;

  @if $variant == 'elevated' {
    transform: translateY(-$space-md);
    @include shadow-md;
  } @else if $variant == 'warm' {
    background-color: $surface-warm;
    border-left: 3px solid $accent;
  } @else if $variant == 'outlined' {
    background-color: transparent;
    border: 1px solid $border;
    box-shadow: none;
  } @else {
    background-color: $surface;
  }
}

// Button variant conditional
@mixin button-variant($type: 'primary') {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: $radius-md;
  transition: all $transition-base;
  cursor: pointer;
  border: none;

  @if $type == 'primary' {
    background-color: $accent;
    color: #fff;
    padding: 14px 32px;
    &:hover {
      background-color: $accent-hover;
      transform: translateY(-1px);
    }
  } @else if $type == 'secondary' {
    background-color: $primary;
    color: #fff;
    padding: 14px 32px;
    &:hover {
      background-color: lighten($primary, 8%);
    }
  } @else if $type == 'ghost' {
    background-color: transparent;
    color: $primary;
    padding: 14px 32px;
    border: 1px solid $border;
    &:hover {
      border-color: $primary;
      background-color: rgba($primary, 0.04);
    }
  }
}

// Section padding conditional (pass 'sm', 'md', 'lg' to vary per section)
@mixin section-pad($size: 'md') {
  @if $size == 'sm' {
    padding-top: $section-pad-sm;
    padding-bottom: $section-pad-sm;
  } @else if $size == 'md' {
    padding-top: $section-pad-md;
    padding-bottom: $section-pad-md;
  } @else if $size == 'lg' {
    padding-top: $section-pad-lg;
    padding-bottom: $section-pad-lg;
  }

  @include below('tablet') {
    padding-top: $section-pad-sm * 0.65;
    padding-bottom: $section-pad-sm * 0.65;
  }
}

// Container
@mixin container {
  max-width: $container-max;
  margin: 0 auto;
  padding-left: $container-px-mobile;
  padding-right: $container-px-mobile;

  @include respond-to('tablet') {
    padding-left: $container-px-desktop;
    padding-right: $container-px-desktop;
  }
}

// Hover lift (reusable interaction)
@mixin hover-lift($distance: 4px) {
  transition: transform $transition-base, box-shadow $transition-base;
  &:hover {
    transform: translateY(-#{$distance});
    @include shadow-md;
  }
}
```

**`_typography.scss`** — Type presets as mixins:
```scss
@use 'variables' as *;
@use 'breakpoints' as *;

@mixin font-heading($size: 36px) {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  line-height: 1.15;
  color: $text-primary;
  font-size: $size * 0.75;

  @include respond-to('tablet') {
    font-size: $size;
  }
}

@mixin font-body($size: 16px) {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1.7;
  color: $text-secondary;
  font-size: $size;
}

@mixin font-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $accent;
}
```

**`_animations.scss`** — Keyframes + stagger generation:
```scss
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// Generate staggered delay classes
@for $i from 1 through 10 {
  .stagger-#{$i} {
    animation-delay: #{$i * 80}ms;
  }
}

// Animation mixin with conditional direction
@mixin animate($type: 'fadeUp', $duration: 600ms) {
  animation: $type $duration ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**`_placeholders.scss`** — Shared base patterns:
```scss
@use 'variables' as *;

%flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

%flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

%grid-base {
  display: grid;
  gap: $grid-gap;
}

%section-base {
  width: 100%;
  position: relative;
  overflow: hidden;
}

%img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Component SCSS Pattern

Every component `.module.scss` file follows this structure:
```scss
// ServiceCard.module.scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;
@use '@/styles/typography' as *;
@use '@/styles/breakpoints' as *;

.card {
  @include card-variant('default');

  &:hover {
    @include hover-lift;

    .icon {
      color: $accent;
    }
  }

  // Conditional: warm variant passed via className
  &.warm {
    @include card-variant('warm');
  }

  // Conditional: elevated variant
  &.elevated {
    @include card-variant('elevated');
  }
}

.icon {
  font-size: 28px;
  color: $primary;
  margin-bottom: $space-md;
  transition: color $transition-base;
}

.title {
  @include font-heading(18px);
  margin-bottom: $space-sm;
}

.description {
  @include font-body(15px);
  max-width: 320px;
}
```

**In the TSX file, apply variant conditionally:**
```tsx
import styles from './ServiceCard.module.scss';
import clsx from 'clsx';

export function ServiceCard({ variant = 'default', ...props }) {
  return (
    <div className={clsx(styles.card, variant !== 'default' && styles[variant])}>
      {/* ... */}
    </div>
  );
}
```

### Component Rules
- Every component gets a co-located `.module.scss` file — no inline styles, no CSS-in-JS, no Tailwind
- **All content lives in `content.tsx`** — every heading, description, label, stat, testimonial, FAQ, service, process step, CTA, and footer link. No hardcoded strings inside component JSX. Components receive content via props or import from `content.tsx`.
- `constants.ts` holds non-content config only: colour tokens (for JS usage), nav link anchors, breakpoint values.
- `content.tsx` (not `.ts`) because it exports JSX-compatible content — React Icons inline with text, rich descriptions with `<span>` / `<strong>` wrapping where needed.
- `SectionWrapper` handles: background colour, padding (via `@include section-pad()`), max-width, scroll animation trigger
- All components are client components only when they need interactivity (Swiper, Fancybox, accordion state). Keep everything else as server components.
- Use `clsx` for conditional class composition in TSX — never string concatenation

---

## Content Architecture (`content.tsx`)

**All site content is centralised in a single file: `src/lib/content.tsx`.**

This is the single source of truth for every word, number, icon, and label on the page. Components are pure renderers — they receive structured data and display it. This makes content updates, i18n, and multi-page extraction trivial.

### Structure

```tsx
// src/lib/content.tsx
import { HiOutlineChartBar, HiOutlineHome, HiOutlineDocumentSearch, HiOutlineUserGroup, HiOutlineClipboardCheck } from 'react-icons/hi';
import { FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { HiStar } from 'react-icons/hi';

// ─── NAVIGATION ─────────────────────────────────────────
export const navContent = {
  links: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Results', href: '#results' },
    { label: 'Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Free Consultation', href: '#contact' },
};

// ─── HERO ───────────────────────────────────────────────
export const heroContent = {
  label: 'DATA-DRIVEN PROPERTY ADVISORY',
  heading: 'Unlock the Potential of Australian Property Market',
  description: 'Sourcing high growth, maximum cashflow property analysing 15,000+ suburbs, right across Australia.',
  primaryCta: { label: 'Book a Free Call', href: '#contact' },
  secondaryCta: { label: 'See Our Results', href: '#results' },
  trustLine: [
    '143 Five-Star Reviews',
    '75+ Properties Purchased',
    '$70K–$178K Client Equity Gains',
  ],
  floatingBadge: { value: '15,000+', label: 'Suburbs Analysed' },
};

// ─── TRUST STRIP ────────────────────────────────────────
export const trustContent = {
  headline: 'Trusted by investors across Australia since 2020',
  stats: [
    { value: '75+', label: 'Properties' },
    { value: '$1M+', label: 'Equity Built' },
    { value: '100%', label: 'Satisfaction' },
  ],
};

// ─── ABOUT ──────────────────────────────────────────────
export const aboutContent = {
  label: 'WHO WE ARE',
  heading: 'Your Data-Backed Property Partner',
  description: 'Founded in 2020, Acceler Investing is a buyer\'s advocacy firm that doesn\'t rely on gut feel. We analyse 15,000+ suburbs using proprietary data models to match investors with high-growth, maximum-cashflow properties across Australia.',
  pullQuote: '...',  // Nafiz quote from original site
  stats: [
    { value: '2020', label: 'Founded' },
    { value: '15,000+', label: 'Suburbs' },
    { value: '143', label: 'Reviews' },
  ],
};

// ─── SERVICES ───────────────────────────────────────────
export const servicesContent = {
  label: 'WHAT WE DO',
  heading: 'Services Built Around Data',
  cta: { label: 'Explore Our Full Process', href: '#process' },
  items: [
    {
      icon: <HiOutlineChartBar />,
      title: 'Suburb Analysis',
      description: 'Data-driven research across 15,000+ suburbs to identify high-growth corridors.',
    },
    {
      icon: <HiOutlineHome />,
      title: 'Property Sourcing',
      description: 'Finding high-growth, high-cashflow investment properties matched to your strategy.',
    },
    {
      icon: <HiOutlineDocumentSearch />,
      title: 'Buyer\'s Advocacy',
      description: 'End-to-end representation from search to settlement — negotiation included.',
    },
    {
      icon: <HiOutlineUserGroup />,
      title: 'Portfolio Strategy',
      description: 'Multi-property planning and portfolio construction for long-term wealth.',
    },
    {
      icon: <HiOutlineClipboardCheck />,
      title: 'Market Reports',
      description: 'Quarterly data insights and growth forecasts backed by real numbers.',
    },
  ],
};

// ─── CASE STUDIES ───────────────────────────────────────
export const caseStudiesContent = {
  label: 'RESULTS THAT SPEAK',
  heading: 'Recent Client Purchases',
  description: 'Every property backed by data. Every result measured.',
  items: [
    // Populate from real Recent Purchases on acceler.com.au
    {
      image: '/images/properties/property-1.jpg',
      location: 'Suburb, VIC',
      title: 'Property title from site',
      result: '+$120K',
      detail: 'Purchased at $X — Type — Date',
    },
    // ... 6-8 slides
  ],
};

// ─── GALLERY ────────────────────────────────────────────
export const galleryContent = {
  label: 'OUR WORK',
  heading: 'Properties We\'ve Secured',
  images: [
    // Populate from real property images
    { src: '/images/gallery/img-1.jpg', alt: 'Description', aspect: 'landscape' },
    { src: '/images/gallery/img-2.jpg', alt: 'Description', aspect: 'portrait' },
    // ...
  ],
};

// ─── WHY CHOOSE US ──────────────────────────────────────
export const whyChooseContent = {
  highlight: {
    value: '143',
    label: 'Five-Star Google Reviews',
    subtext: 'Zero negative reviews. Ever.',
  },
  proofPoints: [
    { title: '15,000+ Suburbs Analysed', description: 'Proprietary data models, not guesswork.' },
    { title: '$70K–$178K Equity Gains', description: 'Measurable client outcomes.' },
    { title: '100% Client Satisfaction', description: 'Every client, every time.' },
    { title: '75+ Properties Purchased', description: 'Experienced across every market cycle.' },
  ],
};

// ─── PROCESS ────────────────────────────────────────────
export const processContent = {
  label: 'HOW IT WORKS',
  heading: 'From First Call to Keys in Hand',
  steps: [
    { number: 1, title: 'Discovery Call', description: 'Understand your goals, budget, and strategy.' },
    { number: 2, title: 'Data Analysis', description: 'Run suburb-level analysis across 15,000+ data points.' },
    { number: 3, title: 'Property Shortlisting', description: 'Curate properties matching your criteria.' },
    { number: 4, title: 'Due Diligence', description: 'Inspections, reports, negotiation.' },
    { number: 5, title: 'Settlement & Beyond', description: 'Secure the property, plan next steps.' },
  ],
};

// ─── TESTIMONIALS ───────────────────────────────────────
export const testimonialsContent = {
  label: 'CLIENT VOICES',
  heading: 'What Our Investors Say',
  items: [
    // Populate from real testimonials on acceler.com.au
    {
      quote: '...',
      name: 'Sarah M.',
      context: 'First-time Investor, Melbourne',
      result: '+$120K equity in 14 months',
      rating: 5,
    },
    // ...
  ],
};

// ─── FAQ ────────────────────────────────────────────────
export const faqContent = {
  label: 'COMMON QUESTIONS',
  heading: 'Everything You Need to Know',
  description: 'Can\'t find your answer? Book a free call.',
  cta: { label: 'Book a Consultation', href: '#contact' },
  items: [
    { question: 'What does a buyer\'s agent actually do?', answer: '...' },
    { question: 'How is Acceler different from other buyer\'s agents?', answer: '...' },
    { question: 'What areas of Australia do you cover?', answer: '...' },
    { question: 'How much does your service cost?', answer: '...' },
    { question: 'How long does the process take?', answer: '...' },
    { question: 'Do you help with investment strategy or just purchasing?', answer: '...' },
    { question: 'Can I see examples of properties you\'ve purchased?', answer: '...' },
    { question: 'What if I\'m a first-time investor?', answer: '...' },
  ],
};

// ─── CTA ────────────────────────────────────────────────
export const ctaContent = {
  heading: 'Ready to Invest Smarter?',
  description: 'Book a free consultation and let our data show you where the growth is.',
  cta: { label: 'Book Your Free Call', href: '#contact' },
  subtext: 'No obligation · 30-minute call · Data-backed advice',
};

// ─── FOOTER ─────────────────────────────────────────────
export const footerContent = {
  mission: 'Data-driven property advisory solutions for Australian investors.',
  socials: [
    { icon: <FaLinkedinIn />, href: 'https://linkedin.com/company/acceler-investing', label: 'LinkedIn' },
    { icon: <FaFacebookF />, href: 'https://facebook.com/accelerinvesting', label: 'Facebook' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
  ],
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Results', href: '#results' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  resources: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Blog', href: '/blog', badge: 'Coming Soon' },
  ],
  contact: {
    address: 'Melbourne, VIC, Australia',
    email: 'info@acceler.com.au',
    phone: '...',
    cta: { label: 'Book a Call', href: '#contact' },
  },
  copyright: '© 2024 Acceler Investing. All Rights Reserved.',
};
```

### Content Rules

- **No string lives in a component.** If text appears on screen, it comes from `content.tsx`.
- **Icons are embedded in content.tsx** — this is why it's `.tsx` not `.ts`. Icons like `<HiOutlineChartBar />` sit alongside the text they belong to.
- **Content is typed.** Define TypeScript interfaces for each content export (e.g. `ServiceItem`, `TestimonialItem`, `FAQItem`) so components get autocomplete and type safety.
- **Placeholder values** (marked with `'...'`) must be replaced with real content from acceler.com.au before launch.
- **Content updates require zero component changes.** Edit `content.tsx`, the site updates. This is the contract.

### How Components Consume Content

```tsx
// src/components/sections/ServicesSection.tsx
import { servicesContent } from '@/lib/content';
import styles from './ServicesSection.module.scss';
import { ServiceCard } from '@/components/ui/ServiceCard';

export function ServicesSection() {
  const { label, heading, cta, items } = servicesContent;

  return (
    <section className={styles.section}>
      <span className={styles.label}>{label}</span>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <ServiceCard key={i} {...item} />
        ))}
      </div>
      <a href={cta.href} className={styles.cta}>{cta.label} →</a>
    </section>
  );
}
```

---

## Future Scalability

### Multi-Page Conversion (Phase 2)
The one-page sections are designed to lift directly into standalone pages:
- `ServicesSection` → `/services` page with expanded descriptions
- `CaseStudiesSlider` → `/results` page with filterable grid
- `GallerySection` → `/gallery` page with category tabs
- `FAQSection` → `/faq` page with search
- `AboutSection` → `/about` page with team bios, story, timeline
- `ProcessTimeline` → `/process` page with detailed step breakdowns
- Add `/contact` page with form + embedded map
- Add `/resources` page for blog/guides (content hub from growth strategy)

### Dark Mode (Phase 2)
- All colours already defined as SCSS variables in `_variables.scss` (both light and dark tokens)
- Dark mode applied via `[data-theme="dark"]` selector on `<html>` — uses CSS custom properties mapped from SCSS variables in `globals.scss`:
  ```scss
  :root {
    --surface: #{$surface};
    --surface-alt: #{$surface-alt};
    --text-primary: #{$text-primary};
    --text-secondary: #{$text-secondary};
  }

  [data-theme="dark"] {
    --surface: #{$surface-dark};
    --surface-alt: #{$surface-alt-dark};
    --text-primary: #{$text-primary-dark};
    --text-secondary: #{$text-secondary-dark};
  }
  ```
- Components use the `@include theme()` mixin or reference CSS custom properties for theme-sensitive values
- `$primary` and `$accent` remain unchanged across themes
- Toggle component in Navbar (sun/moon icon)

---

## How to Remove AI-Generated Feel

This is the difference between a site that looks "made" and one that looks "generated."

**1. Break the rhythm.**
AI loves consistency. Every section same padding, same column split, same card size. Intentionally vary these. Make the About section tighter than the Services section. Give one testimonial card a warm background while the others are white. Human designers make small inconsistencies — they feel alive.

**2. Use real numbers, not round ones.**
"143 Five-Star Reviews" is real. "100+ Happy Clients" is template language. Specific numbers signal authenticity. Use `$178K` not `$200K`. Use `15,247` not `15,000+` if the real number is available.

**3. Write copy that could only belong to this brand.**
"We analyse 15,000+ suburbs so you don't have to" is Acceler. "We help you find your dream property" is everyone. Every heading should fail the competitor test — if you can swap in a competitor's name and it still works, the copy is too generic.

**4. Let one element be slightly "wrong."**
A photo that's rotated 1 degree. A stat card that overlaps its container by 20px. A section heading that's aligned left while its content is in a grid. These controlled imperfections are what make designs feel handcrafted. AI never adds them because AI optimises for alignment.

**5. Avoid the gradient trap.**
AI defaults to purple-to-blue gradients, mesh backgrounds, and glowing borders. Acceler's brand is navy and orange — use flat colour confidently. A solid `#022949` block is more premium than a gradient. If you must use a gradient, keep it to a single subtle directional shift (e.g. `linear-gradient(180deg, $primary, rgba($primary, 0.95))`).

**6. Typography carries 60% of the personality.**
If the type hierarchy is weak, no amount of imagery saves it. The label-heading-description pattern must be visible in every section. The spacing between them must feel considered. Sora at 48px with tight leading on a navy background will look more premium than any animation.

**7. Whitespace is a design decision, not leftover space.**
Sections should breathe. If content feels cramped, remove content — don't shrink spacing. A section with one strong heading and one stat looks more premium than a section crammed with three paragraphs, two icons, and a button.

**8. Limit your effects budget.**
Pick 3 micro-interactions for the entire page. Not 3 per section — 3 total unique effects. Example: (1) cards lift on hover, (2) sections fade in on scroll, (3) the hero image has a subtle parallax. Everything else is static. Restraint signals confidence.

---

## Final Quality Checklist

Before considering this build complete:

- [ ] Every section uses different layout structure from its neighbours
- [ ] No two adjacent sections share the same background colour
- [ ] All text content is real (pulled from acceler.com.au or growth strategy)
- [ ] All images are real (from original site, not placeholders)
- [ ] Typography hierarchy is visible: label → heading → description in every section
- [ ] Hover effects are present but subtle (no flashy transforms)
- [ ] Scroll animations fire once and are staggered (not simultaneous)
- [ ] The page loads fast — images optimised, no layout shift
- [ ] Mobile layout is fully considered (not just "stacked columns")
- [ ] The site looks like a studio designed it, not a prompt generated it
- [ ] Navigation highlights active section on scroll
- [ ] Fancybox opens on gallery images with smooth transitions
- [ ] Swiper slides smoothly with proper touch support on mobile
- [ ] `$accent` (orange) is used sparingly — max 1 dominant accent element per viewport
- [ ] Footer has real contact info, social links, and legal links
