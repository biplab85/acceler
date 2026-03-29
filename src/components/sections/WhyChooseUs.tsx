import { whyChooseContent } from '@/lib/content';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { ProofPoint } from '@/components/ui/ProofPoint';
import styles from './WhyChooseUs.module.scss';

export function WhyChooseUs() {
  const { highlight, proofPoints } = whyChooseContent;

  return (
    <SectionWrapper id="why-us" padding="md" background="default">
      <div className={styles.grid}>
        <div className={styles.highlightPanel}>
          <span className={styles.bigNumber}>{highlight.value}</span>
          <h3 className={styles.highlightLabel}>{highlight.label}</h3>
          <p className={styles.highlightSub}>{highlight.subtext}</p>
        </div>

        <div className={styles.proofCol}>
          {proofPoints.map((point) => (
            <ProofPoint key={point.title} {...point} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
