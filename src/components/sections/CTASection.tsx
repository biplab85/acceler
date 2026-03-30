import { ctaContent } from '@/lib/content';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import styles from './CTASection.module.scss';

function Windmill({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="52,80 68,80 72,250 48,250" fill="rgba(2,41,73,0.06)" />
      <line x1="54" y1="120" x2="66" y2="120" stroke="rgba(2,41,73,0.04)" strokeWidth="1" />
      <line x1="53" y1="160" x2="67" y2="160" stroke="rgba(2,41,73,0.04)" strokeWidth="1" />
      <line x1="51" y1="200" x2="69" y2="200" stroke="rgba(2,41,73,0.04)" strokeWidth="1" />
      <rect x="52" y="72" width="16" height="10" rx="3" fill="rgba(2,41,73,0.1)" />
      <circle cx="60" cy="77" r="5" fill="rgba(2,41,73,0.12)" />
      <g className={styles.blades}>
        <polygon points="60,77 56,10 60,5 64,10" fill="rgba(2,41,73,0.08)" />
        <polygon points="60,77 118,108 120,114 114,112" fill="rgba(2,41,73,0.06)" />
        <polygon points="60,77 2,108 0,114 6,112" fill="rgba(2,41,73,0.06)" />
      </g>
      <circle cx="60" cy="77" r="3" fill="rgba(255,145,77,0.3)" />
      <rect x="44" y="248" width="32" height="4" rx="2" fill="rgba(2,41,73,0.05)" />
    </svg>
  );
}

export function CTASection() {
  const { heading, description, cta, subtext } = ctaContent;

  return (
    <SectionWrapper id="contact" padding="lg" className={styles.ctaBg}>
      <Windmill className={styles.windmillRight} />
      <div className={styles.center}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>
        <Button href={cta.href} variant="primary" className={styles.ctaButton}>
          <HiOutlineCalendarDays className={styles.btnIcon} />
          {cta.label}
        </Button>
        <p className={styles.subtext}>{subtext}</p>
      </div>
    </SectionWrapper>
  );
}
