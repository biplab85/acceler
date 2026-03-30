import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ProofPoint } from "@/components/ui/ProofPoint";
import { whyChooseContent } from "@/lib/content";
import styles from "./WhyChooseUs.module.scss";

function WhyUsBg() {
  return (
    <div className={styles.floatingIcons} aria-hidden="true">
      {/* House icon — top right */}
      <svg className={styles.iconFloat1} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,6 L4,20 L8,20 L8,34 L16,34 L16,24 L24,24 L24,34 L32,34 L32,20 L36,20 Z" stroke="#022949" strokeWidth="1.5" fill="none" opacity="0.08" />
      </svg>

      {/* Key icon — left mid */}
      <svg className={styles.iconFloat2} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="16" r="8" stroke="#ff914d" strokeWidth="1.5" fill="none" opacity="0.1" />
        <line x1="21" y1="16" x2="36" y2="16" stroke="#ff914d" strokeWidth="1.5" opacity="0.1" />
        <line x1="30" y1="16" x2="30" y2="22" stroke="#ff914d" strokeWidth="1.5" opacity="0.1" />
        <line x1="34" y1="16" x2="34" y2="22" stroke="#ff914d" strokeWidth="1.5" opacity="0.1" />
      </svg>

      {/* Chart icon — bottom right */}
      <svg className={styles.iconFloat3} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="22" width="8" height="14" rx="1.5" stroke="#022949" strokeWidth="1.3" fill="none" opacity="0.07" />
        <rect x="16" y="12" width="8" height="24" rx="1.5" stroke="#022949" strokeWidth="1.3" fill="none" opacity="0.07" />
        <rect x="28" y="4" width="8" height="32" rx="1.5" stroke="#022949" strokeWidth="1.3" fill="none" opacity="0.07" />
      </svg>

      {/* Location pin — top left */}
      <svg className={styles.iconFloat4} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18,4 C12,4 7,9 7,15 C7,24 18,34 18,34 C18,34 29,24 29,15 C29,9 24,4 18,4 Z" stroke="#ff914d" strokeWidth="1.3" fill="none" opacity="0.08" />
        <circle cx="18" cy="15" r="4" stroke="#ff914d" strokeWidth="1.2" fill="none" opacity="0.08" />
      </svg>

      {/* Building icon — right mid */}
      <svg className={styles.iconFloat5} viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="28" height="28" rx="2" stroke="#022949" strokeWidth="1.3" fill="none" opacity="0.06" />
        <rect x="10" y="14" width="5" height="5" rx="1" stroke="#022949" strokeWidth="1" fill="none" opacity="0.06" />
        <rect x="21" y="14" width="5" height="5" rx="1" stroke="#022949" strokeWidth="1" fill="none" opacity="0.06" />
        <rect x="10" y="23" width="5" height="5" rx="1" stroke="#022949" strokeWidth="1" fill="none" opacity="0.06" />
        <rect x="21" y="23" width="5" height="5" rx="1" stroke="#022949" strokeWidth="1" fill="none" opacity="0.06" />
        <rect x="14" y="30" width="8" height="6" rx="1" stroke="#022949" strokeWidth="1" fill="none" opacity="0.06" />
      </svg>

      {/* Shield/check — bottom left */}
      <svg className={styles.iconFloat6} viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18,4 L4,10 L4,20 C4,28 10,34 18,38 C26,34 32,28 32,20 L32,10 Z" stroke="#ff914d" strokeWidth="1.3" fill="none" opacity="0.07" />
        <polyline points="11,20 16,25 25,15" fill="none" stroke="#ff914d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.07" />
      </svg>
    </div>
  );
}

export function WhyChooseUs() {
  const { highlight, proofPoints } = whyChooseContent;

  return (
    <SectionWrapper
      id="why-us"
      className={styles.statisticContainer}
      padding="md"
      background="default"
      backgroundElement={<WhyUsBg />}
    >
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
