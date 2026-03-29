import clsx from 'clsx';
import { HiStar } from 'react-icons/hi';
import type { TestimonialItem } from '@/lib/content';
import styles from './TestimonialCard.module.scss';

interface TestimonialCardProps extends TestimonialItem {
  variant?: 'default' | 'warm';
}

export function TestimonialCard({
  quote,
  name,
  context,
  result,
  rating,
  variant = 'default',
}: TestimonialCardProps) {
  return (
    <div className={clsx(styles.card, variant === 'warm' && styles.warm)}>
      <div className={styles.stars}>
        {Array.from({ length: rating }).map((_, i) => (
          <HiStar key={i} className={styles.star} />
        ))}
      </div>
      <blockquote className={styles.quote}>&ldquo;{quote}&rdquo;</blockquote>
      {result && <span className={styles.result}>{result}</span>}
      <div className={styles.author}>
        <span className={styles.name}>{name}</span>
        <span className={styles.context}>{context}</span>
      </div>
    </div>
  );
}
