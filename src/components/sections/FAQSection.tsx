'use client';

import { useState } from 'react';
import { faqContent } from '@/lib/content';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FAQItem } from '@/components/ui/FAQItem';
import styles from './FAQSection.module.scss';

export function FAQSection() {
  const { label, heading, description, cta, items } = faqContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq" padding="sm" background="default">
      <div className={styles.grid}>
        <div className={styles.header}>
          <SectionLabel text={label} />
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>
          <a href={cta.href} className={styles.ctaLink}>
            {cta.label} &rarr;
          </a>
        </div>

        <div className={styles.accordion}>
          {items.map((item, i) => (
            <FAQItem
              key={i}
              {...item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
