import { ReactNode } from 'react';
import {
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineDocumentSearch,
  HiOutlineUserGroup,
  HiOutlineClipboardCheck,
  HiOutlinePhone,
  HiOutlineLightBulb,
  HiOutlineSearchCircle,
  HiOutlineCalculator,
  HiOutlineKey,
  HiOutlineRefresh,
  HiOutlineCalendar,
  HiOutlineGlobe,
  HiStar,
} from 'react-icons/hi';
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from 'react-icons/fa';

// ─── TYPES ──────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface ServiceItem {
  icon: ReactNode;
  title: string;
  description: string;
  highlights?: string[];
  stat?: { value: string; label: string };
}

export interface CaseStudyItem {
  image: string;
  location: string;
  title: string;
  result: string;
  detail: string;
  bed?: number;
  bath?: number;
  garage?: number;
  rent?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  aspect: 'landscape' | 'portrait' | 'square';
}

export interface ProofPointItem {
  title: string;
  description: string;
}

export interface ProcessStepItem {
  number: number;
  title: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  context: string;
  result?: string;
  rating: number;
}

export interface FAQItemData {
  question: string;
  answer: string;
}

export interface JourneyStepItem {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface TeamMember {
  name: string;
  designation: string;
  image: string;
  shortBio: string;
}

export interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

// ─── NAVIGATION ─────────────────────────────────────────
export const navContent = {
  cta: { label: 'Free Consultation', href: '#contact' },
};

// ─── HERO ───────────────────────────────────────────────
export const heroContent = {
  label: 'DATA-DRIVEN PROPERTY ADVISORY',
  heading: 'Unlock the Potential of Australian Property Market',
  description:
    'Sourcing high growth, maximum cashflow property analysing 15,000+ suburbs, right across Australia.',
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
// ─── CLIENT JOURNEY ─────────────────────────────────────
export const journeyContent = {
  label: 'YOUR JOURNEY WITH US',
  heading: 'Client Journey',
  description: 'From your first conversation to building lasting wealth — here\'s exactly how we guide you through every step.',
  steps: [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We start with a free, no-obligation call to understand your investment goals, financial position, and risk appetite.',
      icon: <HiOutlinePhone />,
    },
    {
      number: '02',
      title: 'Strategy Development',
      description: 'Our team builds a tailored investment strategy, analysing your situation against 15,000+ suburbs of data.',
      icon: <HiOutlineLightBulb />,
    },
    {
      number: '03',
      title: 'Property Research',
      description: 'We shortlist high-growth, high-cashflow properties that match your strategy using our proprietary data models.',
      icon: <HiOutlineSearchCircle />,
    },
    {
      number: '04',
      title: 'Due Diligence & Analysis',
      description: 'Every property undergoes rigorous inspections, market analysis, rental appraisals, and financial modelling.',
      icon: <HiOutlineCalculator />,
    },
    {
      number: '05',
      title: 'Acquisition & Settlement',
      description: 'We negotiate the best price, manage contracts, coordinate with solicitors, and guide you through to settlement.',
      icon: <HiOutlineKey />,
    },
    {
      number: '06',
      title: 'Ongoing Support',
      description: 'Post-purchase, we help with property management setup, portfolio reviews, and planning your next investment.',
      icon: <HiOutlineRefresh />,
    },
  ] as JourneyStepItem[],
};

export const trustContent = {
  headline: 'Trusted by investors across Australia since 2020',
  stats: [
    { value: '75+', label: 'Properties' },
    { value: '$1M+', label: 'Equity Built' },
    { value: '100%', label: 'Satisfaction' },
  ] as StatItem[],
};

// ─── ABOUT ──────────────────────────────────────────────
export const aboutContent = {
  label: 'WHO WE ARE',
  heading: 'Your Data-Backed Property Partner',
  description:
    "Founded in 2020, Acceler Investing is a buyer's advocacy firm that doesn't rely on gut feel. We analyse 15,000+ suburbs using proprietary data models to match investors with high-growth, maximum-cashflow properties across Australia.",
  pullQuote:
    "As a data-driven buyer\'s advocate, I understand the importance of making informed decisions based on reliable data. We don\'t sell dreams; we guide you to property success.",
  quoteAuthor: 'Nafiz Hoque, Founder & Director',
  stats: [
    { value: '2020', label: 'Founded', icon: <HiOutlineCalendar /> },
    { value: '15,000+', label: 'Suburbs', icon: <HiOutlineGlobe /> },
    { value: '143', label: 'Reviews', icon: <HiStar /> },
  ] as StatItem[],
};

// ─── SERVICES ───────────────────────────────────────────
// ─── TEAM ───────────────────────────────────────────────
export const teamContent = {
  members: [
    {
      name: 'Aleksandra Czynszak',
      designation: 'Operations Manager',
      image: '/images/acceler-originals/team/aleksandra.jpg',
      shortBio: 'Detail-driven force ensuring smooth day-to-day operations with a background in data analytics and a passion for research.',
    },
    {
      name: 'Abdullah Rafi',
      designation: 'Client Fulfilment Specialist',
      image: '/images/acceler-originals/team/abdullah-rafi.png',
      shortBio: 'Backbone of customer support, ensuring clients receive timely and accurate property reports with seamless communication.',
    },
    {
      name: 'Martina Danyal',
      designation: 'Property Sourcing Specialist',
      image: '/images/acceler-originals/team/martina.jpeg',
      shortBio: 'Sources exceptional properties across Australia with heart, focus, and a commitment to uncovering the right opportunities.',
    },
    {
      name: 'Anika Tanjima',
      designation: 'Client Fulfilment Specialist',
      image: '/images/acceler-originals/team/anika.jpg',
      shortBio: 'Ensures every detail is managed with care so clients feel confident and supported throughout their buying journey.',
    },
  ] as TeamMember[],
};

export const servicesContent = {
  label: 'WHAT WE DO',
  heading: 'Services Built Around Data',
  cta: { label: 'Explore Our Full Process', href: '#process' },
  items: [
    {
      icon: <HiOutlineChartBar />,
      title: 'Suburb Analysis',
      description:
        'Data-driven research across 15,000+ suburbs to identify high-growth corridors before the market catches on.',
      highlights: ['Proprietary data models', 'Growth corridor mapping', 'Rental yield analysis', 'Infrastructure tracking'],
      stat: { value: '15,000+', label: 'Suburbs Analysed' },
    },
    {
      icon: <HiOutlineHome />,
      title: 'Property Sourcing',
      description:
        'Finding high-growth, high-cashflow investment properties matched to your unique strategy and budget.',
      highlights: ['Off-market access', 'On-site inspections', 'Price benchmarking', 'Due diligence reports'],
      stat: { value: '75+', label: 'Properties Sourced' },
    },
    {
      icon: <HiOutlineDocumentSearch />,
      title: "Buyer's Advocacy",
      description:
        'End-to-end representation from search to settlement — inspections, negotiation, and paperwork handled.',
      highlights: ['Expert negotiation', 'Contract review', 'Solicitor coordination', 'Settlement support'],
      stat: { value: '100%', label: 'Client Satisfaction' },
    },
    {
      icon: <HiOutlineUserGroup />,
      title: 'Portfolio Strategy',
      description:
        'Multi-property planning and portfolio construction for long-term wealth building across market cycles.',
      highlights: ['Risk profiling', 'Multi-property planning', 'Cash flow modelling', 'Growth forecasting'],
      stat: { value: '$1M+', label: 'Equity Built' },
    },
    {
      icon: <HiOutlineClipboardCheck />,
      title: 'Market Reports',
      description:
        'Quarterly data insights and growth forecasts so you always know where the market is heading.',
      highlights: ['Quarterly insights', 'Suburb rankings', 'Trend forecasts', 'Investment alerts'],
      stat: { value: '4x', label: 'Reports Per Year' },
    },
  ] as ServiceItem[],
};

// ─── CASE STUDIES ───────────────────────────────────────
export const caseStudiesContent = {
  label: 'RESULTS THAT SPEAK',
  heading: 'Recent Client Purchases',
  description: 'Every property backed by data. Every result measured.',
  items: [
    {
      image: '/images/properties/property-1.png',
      location: 'QLD',
      title: "Investor's Delight",
      result: '$425K',
      detail: '$515/wk rent',
      bed: 4, bath: 2, garage: 2, rent: '$515/wk',
    },
    {
      image: '/images/properties/property-2.png',
      location: 'WA',
      title: 'Secluded Luxury',
      result: '$539K',
      detail: '$700/wk rent',
      bed: 5, bath: 2, garage: 2, rent: '$700/wk',
    },
    {
      image: '/images/properties/property-3.png',
      location: 'WA',
      title: 'Your Slice of Paradise',
      result: '$550K',
      detail: '$670/wk rent',
      bed: 4, bath: 2, garage: 2, rent: '$670/wk',
    },
    {
      image: '/images/properties/property-4.png',
      location: 'QLD',
      title: 'Garden House',
      result: '$395K',
      detail: '$500/wk rent',
      bed: 4, bath: 2, garage: 2, rent: '$500/wk',
    },
    {
      image: '/images/properties/property-5.png',
      location: 'WA',
      title: 'Invest in Your Future',
      result: '$449K',
      detail: '$580/wk rent',
      bed: 4, bath: 2, garage: 2, rent: '$580/wk',
    },
    {
      image: '/images/properties/property-6.jpg',
      location: 'AUS',
      title: 'Luxury Living Redefined',
      result: '$460K',
      detail: '$610/wk rent',
      bed: 4, bath: 2, garage: 2, rent: '$610/wk',
    },
  ] as CaseStudyItem[],
};

// ─── GALLERY ────────────────────────────────────────────
export const galleryContent = {
  label: 'OUR BLOG',
  heading: 'Latest Insights & Updates',
  images: [
    { src: '/images/gallery/gallery-1.jpg', alt: 'Why QLD Is the Hottest Market for Property Investors in 2026', aspect: 'landscape' as const },
    { src: '/images/gallery/gallery-2.jpg', alt: 'How We Helped a First-Time Buyer Build $120K Equity in 12 Months', aspect: 'portrait' as const },
    { src: '/images/gallery/gallery-3.jpg', alt: '5 Coastal Suburbs Poised for Massive Growth This Year', aspect: 'square' as const },
    { src: '/images/gallery/gallery-4.jpg', alt: 'The Data-Driven Approach to Finding High-Cashflow Properties', aspect: 'square' as const },
    { src: '/images/gallery/gallery-5.jpg', alt: 'Suburb Spotlight: Why Investors Are Flocking to Western Australia', aspect: 'landscape' as const },
    { src: '/images/gallery/gallery-6.jpg', alt: 'Your Complete Guide to Building a Property Portfolio from Scratch', aspect: 'portrait' as const },
  ] as GalleryImage[],
};

// ─── WHY CHOOSE US ──────────────────────────────────────
export const whyChooseContent = {
  highlight: {
    value: '143',
    label: 'Five-Star Google Reviews',
    subtext: 'Zero negative reviews. Ever.',
  },
  proofPoints: [
    {
      title: '15,000+ Suburbs Analysed',
      description: 'Proprietary data models, not guesswork.',
    },
    {
      title: '$70K–$178K Equity Gains',
      description: 'Measurable client outcomes across every purchase.',
    },
    {
      title: '100% Client Satisfaction',
      description: 'Every client, every time — no exceptions.',
    },
    {
      title: '75+ Properties Purchased',
      description: 'Experienced across every market cycle since 2020.',
    },
  ] as ProofPointItem[],
};

// ─── PROCESS ────────────────────────────────────────────
export const processContent = {
  label: 'OUR 7-STEP PROCESS',
  heading: 'Our 7-Step Process',
  steps: [
    {
      number: 1,
      title: 'Portfolio Review, Strategy & Mentoring',
      description: 'We provide guidance on structuring your real estate investment portfolio, design a strategy aligned with your goals, and offer ongoing mentoring and support.',
    },
    {
      number: 2,
      title: 'Research Location',
      description: 'We help identify suitable locations based on local market conditions, potential rental income, and future growth prospects.',
    },
    {
      number: 3,
      title: 'Sourcing Properties',
      description: 'We assist with finding suitable investment properties that meet your specific requirements and investment criteria.',
    },
    {
      number: 4,
      title: 'Conducting Due Diligence',
      description: 'We help conduct thorough due diligence including reviewing financials, conducting inspections, and assessing rental income potential.',
    },
    {
      number: 5,
      title: 'Settlement Process Support',
      description: 'We provide support throughout settlement, reviewing contracts, coordinating with solicitors, and ensuring a smooth transaction.',
    },
    {
      number: 6,
      title: 'Professional Introductions',
      description: 'We connect you with property managers, solicitors, and insurers to ensure your investment is properly managed and protected.',
    },
    {
      number: 7,
      title: 'Tenant Selection Process',
      description: 'We assist with selecting suitable tenants through thorough screening to secure reliable rental income.',
    },
  ] as ProcessStepItem[],
};

// ─── TESTIMONIALS ───────────────────────────────────────
export const testimonialsContent = {
  label: 'CLIENT VOICES',
  heading: 'What Our Investors Say',
  items: [
    {
      quote:
        'Acceler made the entire process seamless. The data-backed approach gave me confidence I was making the right decision. My property has already gained significant equity.',
      name: 'Sarah M.',
      context: 'First-time Investor, Melbourne',
      result: '+$120K equity in 14 months',
      rating: 5,
    },
    {
      quote:
        "Nafiz and the team don't just find properties — they find the right properties. The suburb analysis was eye-opening. I wouldn't invest without them now.",
      name: 'James T.',
      context: 'Portfolio Investor, Sydney',
      result: '3 properties in 18 months',
      rating: 5,
    },
    {
      quote:
        "As a first-time investor, I was nervous. Acceler's process was so structured and transparent that I felt supported every step of the way. Highly recommend.",
      name: 'Priya K.',
      context: 'First-time Buyer, Brisbane',
      result: '+$89K equity in 12 months',
      rating: 5,
    },
    {
      quote:
        'The level of data analysis is unmatched. They showed me suburbs I never would have considered, and the numbers have proven them right.',
      name: 'David L.',
      context: 'Experienced Investor, Melbourne',
      result: '+$178K equity across 2 properties',
      rating: 5,
    },
    {
      quote:
        'Working with Acceler was the best investment decision I have made. Professional, data-driven, and genuinely care about your outcomes.',
      name: 'Michelle R.',
      context: 'Property Investor, Adelaide',
      result: '+$95K equity in 10 months',
      rating: 5,
    },
    {
      quote:
        'From the first call I knew these guys were different. No fluff, just data and results. My portfolio has grown faster than I imagined.',
      name: 'Andrew S.',
      context: 'Growing Portfolio, Perth',
      rating: 5,
    },
  ] as TestimonialItem[],
};

// ─── FAQ ────────────────────────────────────────────────
export const faqContent = {
  label: 'COMMON QUESTIONS',
  heading: 'Everything You Need to Know',
  description: "Can't find your answer? Book a free call.",
  cta: { label: 'Book a Consultation', href: '#contact' },
  items: [
    {
      question: "What does a buyer's agent actually do?",
      answer:
        "A buyer's agent works exclusively for you — the buyer. We research suburbs, find properties, attend inspections, negotiate the best price, and manage the process through to settlement. Unlike selling agents who represent the vendor, we're on your side.",
    },
    {
      question: "How is Acceler different from other buyer's agents?",
      answer:
        "We analyse over 15,000 suburbs using proprietary data models before recommending a single property. Most agents rely on gut feel or limited market knowledge. Our approach is entirely data-driven, which is why our clients consistently see $70K–$178K in equity gains.",
    },
    {
      question: 'What areas of Australia do you cover?',
      answer:
        'We cover all major metropolitan and regional areas across Australia. Our data models analyse suburbs nationwide, so we can identify growth corridors in VIC, NSW, QLD, SA, WA, and beyond.',
    },
    {
      question: 'How much does your service cost?',
      answer:
        'Our fees vary depending on the scope of service. We offer a free initial consultation where we can discuss your goals and provide a transparent breakdown of costs. Our clients typically see returns that far exceed the investment in our service.',
    },
    {
      question: 'How long does the process take?',
      answer:
        "From initial consultation to settlement, the typical timeline is 8–12 weeks. This includes data analysis (1–2 weeks), property shortlisting and inspections (3–5 weeks), negotiation and contract (1–2 weeks), and settlement (4–6 weeks). We move at your pace.",
    },
    {
      question: 'Do you help with investment strategy or just purchasing?',
      answer:
        "Both. We start with strategy — understanding your financial position, risk tolerance, and long-term goals. Then we build a tailored investment plan before sourcing properties. It's not just about buying a property; it's about buying the right property for your portfolio.",
    },
    {
      question: "Can I see examples of properties you've purchased?",
      answer:
        "Absolutely. Check out our Results section to see recent purchases with real equity gains. We're transparent about our track record because the numbers speak for themselves — 75+ properties purchased, 143 five-star reviews, and zero negative reviews.",
    },
    {
      question: "What if I'm a first-time investor?",
      answer:
        "We love working with first-time investors. Our structured process is designed to guide you through every step with confidence. We explain everything in plain language, help you understand the data, and ensure you feel comfortable before making any decisions.",
    },
  ] as FAQItemData[],
};

// ─── CTA ────────────────────────────────────────────────
export const ctaContent = {
  heading: 'Ready to Invest Smarter?',
  description:
    'Book a free consultation and let our data show you where the growth is.',
  cta: { label: 'Book Your Free Call', href: '#contact' },
  subtext: 'No obligation · 30-minute call · Data-backed advice',
};

// ─── FOOTER ─────────────────────────────────────────────
export const footerContent = {
  mission:
    'Data-driven property advisory solutions for Australian investors.',
  socials: [
    {
      icon: <FaLinkedinIn />,
      href: 'https://www.linkedin.com/company/acceler-investing/',
      label: 'LinkedIn',
    },
    {
      icon: <FaFacebookF />,
      href: 'https://www.facebook.com/accelerinvesting',
      label: 'Facebook',
    },
    {
      icon: <FaInstagram />,
      href: 'https://www.instagram.com/acceler.investing/',
      label: 'Instagram',
    },
  ] as SocialLink[],
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
  ],
  contact: {
    address: 'Melbourne, VIC, Australia',
    email: 'Invest@acceler.com.au',
    phone: '0433112316',
    cta: { label: 'Book a Call', href: '#contact' },
  },
  copyright: '© 2024 Acceler Investing. All Rights Reserved.',
};
