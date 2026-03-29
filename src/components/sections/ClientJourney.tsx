'use client';

import { useEffect, useRef, useCallback } from 'react';
import { journeyContent } from '@/lib/content';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { COLORS, rgba } from '@/lib/constants';
import styles from './ClientJourney.module.scss';

export function ClientJourney() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const { label, heading, description, steps } = journeyContent;

  // Custom compass cursor
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cursorRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursorRef.current.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cursorRef.current) cursorRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRef.current) cursorRef.current.style.opacity = '0';
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
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
    <section
      className={styles.section}
      ref={(node) => {
        sectionRef.current = node;
        ref(node);
      }}
    >
      {/* Custom compass/crosshair cursor */}
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="10" fill="none" stroke={rgba(COLORS.primary, 0.4)} strokeWidth="1.5" />
          <circle cx="16" cy="16" r="3" fill={rgba(COLORS.primary, 0.5)} />
          <line x1="16" y1="2" x2="16" y2="8" stroke={rgba(COLORS.accent, 0.6)} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="24" x2="16" y2="30" stroke={rgba(COLORS.accent, 0.4)} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="16" x2="8" y2="16" stroke={rgba(COLORS.accent, 0.4)} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="16" x2="30" y2="16" stroke={rgba(COLORS.accent, 0.6)} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Animated SVG background */}
      <div className={styles.bgLayer}>
        {/* Gradient orbs */}
        <svg className={styles.orb1} viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="jOrb1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={rgba(COLORS.primary, 0.06)} />
              <stop offset="100%" stopColor={rgba(COLORS.primary, 0)} />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" fill="url(#jOrb1)" />
        </svg>
        <svg className={styles.orb2} viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="jOrb2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={rgba(COLORS.accent, 0.05)} />
              <stop offset="100%" stopColor={rgba(COLORS.accent, 0)} />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" fill="url(#jOrb2)" />
        </svg>

        {/* Connecting path SVG — winding road */}
        <svg className={styles.pathSvg} viewBox="0 0 1440 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={rgba(COLORS.accent, 0.08)} />
              <stop offset="50%" stopColor={rgba(COLORS.primary, 0.06)} />
              <stop offset="100%" stopColor={rgba(COLORS.accent, 0.08)} />
            </linearGradient>
          </defs>
          <path
            d="M0,450 C200,200 400,600 720,350 C1040,100 1200,550 1440,400"
            fill="none"
            stroke="url(#pathGrad)"
            strokeWidth="2"
            strokeDasharray="12 8"
            className={styles.pathLine}
          />
          <path
            d="M0,500 C250,300 500,650 750,400 C1000,150 1250,600 1440,450"
            fill="none"
            stroke={rgba(COLORS.primary, 0.03)}
            strokeWidth="1"
          />
        </svg>

        {/* ─── TREE / BOTANICAL SVG ILLUSTRATIONS ──── */}
        {/* Tree left — tall with branches */}
        <svg className={styles.treeLeft} viewBox="0 0 120 400" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk */}
          <rect x="52" y="160" width="16" height="240" rx="4" fill={rgba(COLORS.primary, 0.04)} />
          {/* Branches */}
          <line x1="60" y1="200" x2="30" y2="170" stroke={rgba(COLORS.primary, 0.04)} strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="240" x2="90" y2="205" stroke={rgba(COLORS.primary, 0.04)} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="60" y1="280" x2="25" y2="255" stroke={rgba(COLORS.primary, 0.04)} strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="310" x2="95" y2="285" stroke={rgba(COLORS.primary, 0.04)} strokeWidth="2.5" strokeLinecap="round" />
          {/* Canopy circles */}
          <circle cx="60" cy="130" r="50" fill={rgba(COLORS.primary, 0.03)} />
          <circle cx="35" cy="155" r="35" fill={rgba(COLORS.primary, 0.025)} />
          <circle cx="85" cy="150" r="38" fill={rgba(COLORS.primary, 0.025)} />
          <circle cx="60" cy="100" r="35" fill={rgba(COLORS.accent, 0.02)} />
          <circle cx="30" cy="175" r="20" fill={rgba(COLORS.accent, 0.015)} />
          <circle cx="90" cy="170" r="22" fill={rgba(COLORS.accent, 0.015)} />
          {/* Small leaf details */}
          <ellipse cx="28" cy="168" rx="12" ry="7" transform="rotate(-30 28 168)" fill={rgba(COLORS.accent, 0.03)} />
          <ellipse cx="92" cy="200" rx="10" ry="6" transform="rotate(25 92 200)" fill={rgba(COLORS.accent, 0.025)} />
          <ellipse cx="25" cy="250" rx="9" ry="5" transform="rotate(-20 25 250)" fill={rgba(COLORS.primary, 0.025)} />
        </svg>

        {/* Tree right — smaller, different shape */}
        <svg className={styles.treeRight} viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
          {/* Trunk */}
          <rect x="42" y="140" width="14" height="160" rx="3" fill={rgba(COLORS.primary, 0.035)} />
          {/* Branches */}
          <line x1="49" y1="170" x2="75" y2="148" stroke={rgba(COLORS.primary, 0.035)} strokeWidth="3" strokeLinecap="round" />
          <line x1="49" y1="200" x2="22" y2="182" stroke={rgba(COLORS.primary, 0.035)} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="49" y1="230" x2="78" y2="215" stroke={rgba(COLORS.primary, 0.035)} strokeWidth="2" strokeLinecap="round" />
          {/* Canopy — more triangular/pine style */}
          <polygon points="49,30 10,140 88,140" fill={rgba(COLORS.primary, 0.025)} />
          <polygon points="49,55 18,130 80,130" fill={rgba(COLORS.accent, 0.015)} />
          <polygon points="49,80 25,135 73,135" fill={rgba(COLORS.primary, 0.02)} />
          {/* Small berries/dots */}
          <circle cx="30" cy="120" r="3" fill={rgba(COLORS.accent, 0.06)} />
          <circle cx="68" cy="110" r="2.5" fill={rgba(COLORS.accent, 0.05)} />
          <circle cx="45" cy="90" r="2" fill={rgba(COLORS.accent, 0.07)} />
          <circle cx="55" cy="105" r="2.5" fill={rgba(COLORS.accent, 0.04)} />
        </svg>

        {/* Ground bushes — bottom scattered */}
        <svg className={styles.bushes} viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bush clusters */}
          <ellipse cx="80" cy="70" rx="50" ry="30" fill={rgba(COLORS.primary, 0.02)} />
          <ellipse cx="110" cy="75" rx="35" ry="22" fill={rgba(COLORS.accent, 0.015)} />
          <ellipse cx="50" cy="78" rx="28" ry="18" fill={rgba(COLORS.primary, 0.018)} />

          <ellipse cx="350" cy="72" rx="45" ry="28" fill={rgba(COLORS.primary, 0.02)} />
          <ellipse cx="380" cy="78" rx="30" ry="20" fill={rgba(COLORS.accent, 0.015)} />

          <ellipse cx="650" cy="68" rx="55" ry="32" fill={rgba(COLORS.primary, 0.018)} />
          <ellipse cx="690" cy="76" rx="35" ry="22" fill={rgba(COLORS.accent, 0.012)} />
          <ellipse cx="620" cy="80" rx="25" ry="16" fill={rgba(COLORS.primary, 0.02)} />

          <ellipse cx="950" cy="74" rx="40" ry="26" fill={rgba(COLORS.primary, 0.02)} />
          <ellipse cx="980" cy="80" rx="30" ry="18" fill={rgba(COLORS.accent, 0.015)} />

          <ellipse cx="1200" cy="70" rx="50" ry="30" fill={rgba(COLORS.primary, 0.018)} />
          <ellipse cx="1240" cy="78" rx="35" ry="20" fill={rgba(COLORS.accent, 0.012)} />
          <ellipse cx="1170" cy="76" rx="28" ry="18" fill={rgba(COLORS.primary, 0.022)} />

          <ellipse cx="1400" cy="72" rx="40" ry="28" fill={rgba(COLORS.primary, 0.02)} />
        </svg>

        {/* Animated horizontal lines */}
        <div className={styles.hLine} style={{ top: '20%' }} />
        <div className={styles.hLine} style={{ top: '50%' }} />
        <div className={styles.hLine} style={{ top: '80%' }} />

        {/* Animated vertical lines */}
        <div className={styles.vLine} style={{ left: '15%' }} />
        <div className={styles.vLine} style={{ left: '50%' }} />
        <div className={styles.vLine} style={{ left: '85%' }} />
      </div>

      {/* Content */}
      <div className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.header}>
          <SectionLabel text={label} />
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`${styles.card} ${styles[`card${i + 1}`]}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Large text-stroke background number */}
              <span className={styles.bgNumber}>{i + 1}</span>

              <div className={styles.cardTop}>
                <span className={styles.stepNumber}>{step.number}</span>
                <div className={styles.iconWrap}>{step.icon}</div>
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.description}</p>
              {i < steps.length - 1 && <div className={styles.connector} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
