'use client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TeamCardSlider } from '@/components/ui/TeamCardSlider';
import { aboutContent } from '@/lib/content';
import Image from 'next/image';
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineStar,
  HiOutlineKey,
  HiOutlineGlobe,
  HiOutlineDocumentSearch,
} from 'react-icons/hi';
import styles from './AboutSection.module.scss';

export function AboutSection() {
  const { label, heading, description, pullQuote, quoteAuthor, stats } =
    aboutContent;

  return (
    <SectionWrapper id="about" padding="sm" background="default">
      {/* Floating icons that move smoothly */}
      <div className={styles.floatingIcons} aria-hidden="true">
        <span className={styles.floatIcon} style={{ top: '8%', left: '5%' }}><HiOutlineHome /></span>
        <span className={styles.floatIcon} style={{ top: '15%', right: '8%' }}><HiOutlineChartBar /></span>
        <span className={styles.floatIcon} style={{ top: '45%', left: '2%' }}><HiOutlineStar /></span>
        <span className={styles.floatIcon} style={{ top: '70%', right: '4%' }}><HiOutlineKey /></span>
        <span className={styles.floatIcon} style={{ top: '85%', left: '10%' }}><HiOutlineGlobe /></span>
        <span className={styles.floatIcon} style={{ top: '30%', right: '2%' }}><HiOutlineDocumentSearch /></span>
      </div>

      {/* Floating geometric shapes */}
      <div className={styles.floatingShapes} aria-hidden="true">
        {/* Triangle */}
        <svg className={`${styles.shape} ${styles.shape1}`} viewBox="0 0 40 40"><polygon points="20,4 36,36 4,36" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        {/* Square */}
        <svg className={`${styles.shape} ${styles.shape2}`} viewBox="0 0 40 40"><rect x="6" y="6" width="28" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        {/* Circle */}
        <svg className={`${styles.shape} ${styles.shape3}`} viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        {/* Diamond */}
        <svg className={`${styles.shape} ${styles.shape4}`} viewBox="0 0 40 40"><polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        {/* Hexagon */}
        <svg className={`${styles.shape} ${styles.shape5}`} viewBox="0 0 40 40"><polygon points="20,3 36,12 36,28 20,37 4,28 4,12" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        {/* Plus/Cross */}
        <svg className={`${styles.shape} ${styles.shape6}`} viewBox="0 0 40 40"><line x1="20" y1="6" x2="20" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="6" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        {/* Small filled circle */}
        <svg className={`${styles.shape} ${styles.shape7}`} viewBox="0 0 20 20"><circle cx="10" cy="10" r="4" fill="currentColor" /></svg>
        {/* Small triangle filled */}
        <svg className={`${styles.shape} ${styles.shape8}`} viewBox="0 0 20 20"><polygon points="10,3 18,17 2,17" fill="currentColor" /></svg>
      </div>

      <div className={styles.grid}>
        {/* LEFT — founder image + stats */}
        <div className={styles.leftCol}>
          <div className={styles.imageCol}>
            <div className={styles.frameBg} />
            <div className={styles.frameWrap}>
              <div className={styles.imageWrap}>
                <Image
                  src="/images/team/founder.jpg"
                  alt="Nafiz Hoque — Founder & Director of Acceler Investing"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className={styles.image}
                />
              </div>
              <span className={styles.cornerTL} />
              <span className={styles.cornerBR} />
              <div className={styles.nameTag}>
                <strong>Nafiz Hoque</strong>
                <span>Founder &amp; Director</span>
              </div>
            </div>
          </div>

          <div className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                {stat.icon && <span className={styles.statIcon}>{stat.icon}</span>}
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — text + team slider */}
        <div className={styles.textCol}>
          <SectionLabel text={label} />
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>

          <blockquote className={styles.quote}>
            <p>&ldquo;{pullQuote}&rdquo;</p>
            <cite className={styles.author}>&mdash; {quoteAuthor}</cite>
          </blockquote>

          <div className={styles.teamSlider}>
            <TeamCardSlider />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
