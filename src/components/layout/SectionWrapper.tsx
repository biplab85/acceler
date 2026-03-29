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
}

export function SectionWrapper({
  children,
  id,
  background = 'default',
  padding = 'md',
  className,
  animate = true,
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
      <div className={styles.container}>{children}</div>
    </section>
  );
}
