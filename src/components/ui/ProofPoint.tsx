import type { ProofPointItem } from '@/lib/content';
import styles from './ProofPoint.module.scss';

export function ProofPoint({ title, description }: ProofPointItem) {
  return (
    <div className={styles.item}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
