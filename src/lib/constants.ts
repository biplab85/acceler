export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#results' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  services: 'services',
  results: 'results',
  gallery: 'gallery',
  whyUs: 'why-us',
  process: 'process',
  testimonials: 'testimonials',
  faq: 'faq',
  cta: 'contact',
} as const;

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultra: 1440,
} as const;

// ─── BRAND COLOURS (single source of truth for JS/TSX) ──
// These MUST stay in sync with src/styles/_variables.scss
// Change here → updates all inline SVGs, favicon, dynamic styles
export const COLORS = {
  primary: '#022949',
  primaryLight: '#0a3a5e',
  accent: '#ff914d',
  accentHover: '#e87d3a',
  surface: '#ffffff',
  surfaceAlt: '#f7f8fa',
  surfaceWarm: '#fff7ed',
  textPrimary: '#1a1a2e',
  textSecondary: '#5a6275',
  textTertiary: '#94a3b8',
  border: '#e8eaef',
  borderLight: '#f0f1f4',
  blue: '#0ea5e9',
} as const;

// Helper: rgba string from hex + opacity
export function rgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}
