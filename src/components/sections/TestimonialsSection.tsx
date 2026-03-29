import { testimonialsContent } from '@/lib/content';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import styles from './TestimonialsSection.module.scss';

export function TestimonialsSection() {
  const { label, heading, items } = testimonialsContent;

  return (
    <SectionWrapper id="testimonials" padding="md" background="default">
      <div className={styles.header}>
        <SectionLabel text={label} />
        <h2 className={styles.heading}>{heading}</h2>
      </div>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <TestimonialCard
            key={item.name}
            {...item}
            variant={i === 1 || i === 4 ? 'warm' : 'default'}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
