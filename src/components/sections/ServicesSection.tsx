import { servicesContent } from '@/lib/content';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ServiceCard } from '@/components/ui/ServiceCard';
import styles from './ServicesSection.module.scss';

export function ServicesSection() {
  const { label, heading, cta, items } = servicesContent;

  return (
    <SectionWrapper id="services" padding="lg" background="alt">
      <SectionLabel text={label} />
      <h2 className={styles.heading}>{heading}</h2>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <ServiceCard
            key={item.title}
            {...item}
            variant={i === 1 ? 'elevated' : 'default'}
          />
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <a href={cta.href} className={styles.ctaLink}>
          {cta.label} &rarr;
        </a>
      </div>
    </SectionWrapper>
  );
}
