import styles from './StatBadge.module.scss';

interface StatBadgeProps {
  value: string;
  label: string;
}

export function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <div className={styles.badge}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
