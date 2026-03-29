import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './ServiceCard.module.scss';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: 'default' | 'elevated';
}

export function ServiceCard({ icon, title, description, variant = 'default' }: ServiceCardProps) {
  return (
    <div className={clsx(styles.card, variant === 'elevated' && styles.elevated)}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
