'use client';

import { servicesContent } from '@/lib/content';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import styles from './ServicesSection.module.scss';
import { ReactNode } from 'react';

const CARD_COLORS = [
  { bg: '#fff8f3', accent: '#ff914d', iconBg: 'rgba(255,145,77,0.1)' },
  { bg: '#f0f9ff', accent: '#0ea5e9', iconBg: 'rgba(14,165,233,0.1)' },
  { bg: '#f0fdf6', accent: '#10b981', iconBg: 'rgba(16,185,129,0.1)' },
  { bg: '#f5f3ff', accent: '#8b5cf6', iconBg: 'rgba(139,92,246,0.1)' },
  { bg: '#fef2f2', accent: '#ef4444', iconBg: 'rgba(239,68,68,0.1)' },
];

function ServiceCard({
  icon,
  title,
  description,
  highlights,
  stat,
  index,
  color,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  highlights?: string[];
  stat?: { value: string; label: string };
  index: number;
  color: typeof CARD_COLORS[0];
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}
      style={{
        '--card-bg': color.bg,
        '--card-accent': color.accent,
        '--card-icon-bg': color.iconBg,
      } as React.CSSProperties}
    >
      {/* Large stroke number — right side */}
      <span className={styles.cardNumber}>0{index + 1}</span>

      {/* Card header */}
      <div className={styles.cardHeader}>
        <div className={styles.iconCircle}>{icon}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>

      {/* Description */}
      <p className={styles.cardDesc}>{description}</p>

      {/* Highlights grid */}
      {highlights && (
        <ul className={styles.highlights}>
          {highlights.map((h) => (
            <li key={h} className={styles.highlightItem}>
              <HiOutlineCheckCircle className={styles.checkIcon} />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Stat badge */}
      {stat && (
        <div className={styles.statBadge}>
          <span className={styles.statValue}>{stat.value}</span>
          <span className={styles.statLabel}>{stat.label}</span>
        </div>
      )}

      {/* Bottom accent */}
      <div className={styles.cardAccent} />
    </div>
  );
}

export function ServicesSection() {
  const { label, heading, cta, items } = servicesContent;

  return (
    <section id="services" className={styles.section}>
      <div className={styles.stickyLayout}>
        {/* LEFT: Sticky panel */}
        <div className={styles.stickyPanel}>
          <SectionLabel text={label} />
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subtext}>
            We combine proprietary data analysis with hands-on expertise to deliver
            end-to-end property investment services across Australia.
          </p>
          <div className={styles.stickyStats}>
            <div className={styles.stickyStat}>
              <span className={styles.stickyStatValue}>5</span>
              <span className={styles.stickyStatLabel}>Core Services</span>
            </div>
            <div className={styles.stickyStat}>
              <span className={styles.stickyStatValue}>A–Z</span>
              <span className={styles.stickyStatLabel}>Full Coverage</span>
            </div>
          </div>
          <a href={cta.href} className={styles.ctaLink}>
            {cta.label} &rarr;
          </a>
        </div>

        {/* RIGHT: Scrolling cards */}
        <div className={styles.scrollCards}>
          {items.map((item, i) => (
            <ServiceCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              highlights={item.highlights}
              stat={item.stat}
              index={i}
              color={CARD_COLORS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
