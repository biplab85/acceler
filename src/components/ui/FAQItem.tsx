'use client';

import { useState } from 'react';
import clsx from 'clsx';
import type { FAQItemData } from '@/lib/content';
import styles from './FAQItem.module.scss';

interface FAQItemProps extends FAQItemData {
  isOpen?: boolean;
  onToggle?: () => void;
}

export function FAQItem({ question, answer, isOpen = false, onToggle }: FAQItemProps) {
  return (
    <div className={clsx(styles.item, isOpen && styles.open)}>
      <button className={styles.trigger} onClick={onToggle}>
        <span className={styles.question}>{question}</span>
        <span className={styles.icon}>{isOpen ? '\u2212' : '+'}</span>
      </button>
      <div className={styles.answerWrap}>
        <div className={styles.answer}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}
