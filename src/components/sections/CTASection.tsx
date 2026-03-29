import { ctaContent } from '@/lib/content';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import styles from './CTASection.module.scss';

export function CTASection() {
  const { heading, description, cta, subtext } = ctaContent;

  return (
    <SectionWrapper id="contact" padding="lg" background="primary">
      <div className={styles.center}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>
        <Button href={cta.href} variant="primary">
          {cta.label}
        </Button>
        <p className={styles.subtext}>{subtext}</p>
      </div>
    </SectionWrapper>
  );
}
