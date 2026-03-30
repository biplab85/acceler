'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './SectionWrapper.module.scss';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  background?: 'default' | 'alt' | 'warm' | 'primary';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
  backgroundElement?: ReactNode;
}

function CornerAccent({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(255,145,77,0.2)" strokeWidth="1.5" />
      <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(255,145,77,0.2)" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="3" fill="rgba(255,145,77,0.25)" />
    </svg>
  );
}

export function SectionWrapper({
  children,
  id,
  background = 'default',
  padding = 'md',
  className,
  animate = true,
  backgroundElement,
}: SectionWrapperProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id={id}
      ref={animate ? ref : undefined}
      className={clsx(
        styles.section,
        styles[`bg-${background}`],
        styles[`pad-${padding}`],
        animate && styles.animated,
        animate && isVisible && styles.visible,
        className
      )}
    >
      <div className={styles.topEdge} />
      {backgroundElement}
      <CornerAccent className={styles.cornerTL} />
      <CornerAccent className={styles.cornerBR} />
      <div className={styles.container}>{children}</div>
    </section>
  );
}
