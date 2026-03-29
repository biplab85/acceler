import { trustContent } from '@/lib/content';
import styles from './TrustStrip.module.scss';

export function TrustStrip() {
  const { headline, stats } = trustContent;

  return (
    <section className={styles.strip}>
      <div className={styles.container}>
        <p className={styles.headline}>{headline}</p>
        <div className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
