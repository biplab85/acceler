import styles from './SectionLabel.module.scss';

export function SectionLabel({ text }: { text: string }) {
  return <span className={styles.label}>{text}</span>;
}
