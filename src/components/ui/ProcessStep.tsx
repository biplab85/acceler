import clsx from 'clsx';
import type { ProcessStepItem } from '@/lib/content';
import styles from './ProcessStep.module.scss';

interface ProcessStepProps extends ProcessStepItem {
  isLast?: boolean;
}

export function ProcessStep({ number, title, description, isLast }: ProcessStepProps) {
  return (
    <div className={clsx(styles.step, isLast && styles.last)}>
      <div className={styles.indicator}>
        <span className={styles.dot}>{number}</span>
        {!isLast && <div className={styles.line} />}
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
