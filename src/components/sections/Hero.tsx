'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { heroContent } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { StatBadge } from '@/components/ui/StatBadge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { HiOutlineShieldCheck, HiOutlineStar, HiOutlineTrendingUp, HiOutlinePhone, HiOutlineArrowRight } from 'react-icons/hi';
import { CityscapeSvg } from '@/components/ui/CityscapeSvg';
import { COLORS, rgba } from '@/lib/constants';
import styles from './Hero.module.scss';

const heroSlides = [
  { src: '/images/hero/hero-property.jpg', alt: 'Modern luxury property with pool' },
  { src: '/images/hero/hero-property-2.jpg', alt: 'Contemporary waterfront home' },
  { src: '/images/hero/hero-property-3.jpg', alt: 'Stylish modern villa' },
  { src: '/images/hero/hero-property-4.jpg', alt: 'Architectural Australian home at dusk' },
];

const SLIDE_DURATION = 5000;

function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [loaderKey, setLoaderKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
      setLoaderKey((k) => k + 1);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (i: number) => {
    setActive(i);
    setLoaderKey((k) => k + 1);
  };

  return (
    <div className={styles.imageWrap}>
      {heroSlides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`${styles.heroImage} ${styles.slideImage} ${i === active ? styles.slideActive : ''}`}
        />
      ))}
      <div className={styles.slideLoader}>
        <svg className={styles.loaderRing} viewBox="0 0 44 44">
          <circle className={styles.loaderTrack} cx="22" cy="22" r="19" />
          <circle
            key={loaderKey}
            className={styles.loaderProgress}
            cx="22"
            cy="22"
            r="19"
          />
        </svg>
        <span className={styles.loaderCount}>
          {active + 1}/{heroSlides.length}
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const {
    heading,
    description,
    primaryCta,
    secondaryCta,
    floatingBadge,
  } = heroContent;

  // Premium dual-ring cursor
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x - 24}px, ${y - 24}px)`;
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cursorRef.current) cursorRef.current.style.opacity = '1';
    if (cursorDotRef.current) cursorDotRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRef.current) cursorRef.current.style.opacity = '0';
    if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <section id="home" className={styles.hero} ref={(node) => {
      heroRef.current = node;
      ref(node);
    }}>

      {/* ─── PREMIUM CURSOR: ring + dot ──────────────── */}
      <div ref={cursorRef} className={styles.cursorRing} aria-hidden="true" />
      <div ref={cursorDotRef} className={styles.cursorDot} aria-hidden="true" />

      {/* ─── ANIMATED SVG BACKGROUND ──────────────────── */}
      <div className={styles.bgLayer}>
        {/* Orb 1 — top right, warm glow */}
        <svg className={styles.bgBlob1} viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={rgba(COLORS.accent, 0.18)} />
              <stop offset="60%" stopColor={rgba(COLORS.accent, 0.06)} />
              <stop offset="100%" stopColor={rgba(COLORS.accent, 0)} />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" fill="url(#orb1)" />
        </svg>

        {/* Orb 2 — bottom left, cool blue */}
        <svg className={styles.bgBlob2} viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={rgba(COLORS.blue, 0.12)} />
              <stop offset="60%" stopColor={rgba(COLORS.blue, 0.04)} />
              <stop offset="100%" stopColor={rgba(COLORS.blue, 0)} />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" fill="url(#orb2)" />
        </svg>

        {/* Orb 3 — center */}
        <svg className={styles.bgBlob3} viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="orb3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" fill="url(#orb3)" />
        </svg>

        {/* Dot grid */}
        <svg className={styles.bgGrid} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.6" fill={rgba(COLORS.primary, 0.06)} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>

        <div className={styles.bgGradient} />

        {/* ─── REALISTIC CITYSCAPE ──────────────────── */}
        <div className={styles.skylineSvg}>
          <CityscapeSvg />
        </div>

        {/* Animated lines */}
        <div className={styles.animLine} data-direction="h" style={{ top: '18%' }} />
        <div className={styles.animLine} data-direction="h" style={{ top: '45%' }} />
        <div className={styles.animLine} data-direction="h" style={{ top: '72%' }} />
        <div className={styles.animLine} data-direction="h" style={{ top: '92%' }} />
        <div className={styles.animLine} data-direction="v" style={{ left: '12%' }} />
        <div className={styles.animLine} data-direction="v" style={{ left: '35%' }} />
        <div className={styles.animLine} data-direction="v" style={{ left: '62%' }} />
        <div className={styles.animLine} data-direction="v" style={{ left: '85%' }} />

        <div className={styles.bgLine} />
      </div>

      <div className={styles.container}>
        {/* ─── LEFT: TEXT ─────────────────────────────── */}
        <div className={`${styles.textCol} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.labelBadge}>
            <HiOutlineTrendingUp className={styles.labelIcon} />
            <span>Data-Driven Property Advisory</span>
          </div>

          <h1 className={styles.heading}>
            Unlock the <span className={styles.headingAccent}>Potential</span> of
            Australian Property Market
          </h1>

          <p className={styles.description}>{description}</p>

          <div className={styles.ctas}>
            <Button href={primaryCta.href} variant="primary">
              <HiOutlinePhone /> {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="ghost">
              {secondaryCta.label} <HiOutlineArrowRight />
            </Button>
          </div>

          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <HiOutlineStar className={styles.trustIcon} />
              <div>
                <strong>143</strong>
                <span>Five-Star Reviews</span>
              </div>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <HiOutlineShieldCheck className={styles.trustIcon} />
              <div>
                <strong>75+</strong>
                <span>Properties Purchased</span>
              </div>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <HiOutlineTrendingUp className={styles.trustIcon} />
              <div>
                <strong>$178K</strong>
                <span>Max Equity Gain</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: VISUAL ─────────────────────────── */}
        <div className={`${styles.visualCol} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.mainCard}>
            <HeroSlideshow />
            <div className={styles.imageOverlay}>
              <div className={styles.overlayItem}>
                <span className={styles.overlayValue}>15,000+</span>
                <span className={styles.overlayLabel}>Suburbs</span>
              </div>
              <div className={styles.overlayDot} />
              <div className={styles.overlayItem}>
                <span className={styles.overlayValue}>100%</span>
                <span className={styles.overlayLabel}>Satisfaction</span>
              </div>
              <div className={styles.overlayDot} />
              <div className={styles.overlayItem}>
                <span className={styles.overlayValue}>$1M+</span>
                <span className={styles.overlayLabel}>Equity Built</span>
              </div>
            </div>
          </div>
          <div className={styles.floatingBadge}>
            <StatBadge value={floatingBadge.value} label={floatingBadge.label} />
          </div>
          <div className={styles.accentShape} />
        </div>
      </div>
    </section>
  );
}
