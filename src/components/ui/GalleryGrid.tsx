'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import type { GalleryImage } from '@/lib/content';
import styles from './GalleryGrid.module.scss';

interface GalleryGridProps {
  images: GalleryImage[];
}

const BLOG_META = [
  { category: 'Market Analysis', date: 'Mar 28, 2026', readTime: '6 min read', desc: '' },
  { category: 'Investment Strategy', date: 'Mar 22, 2026', readTime: '4 min read', desc: 'A real client story showing how strategic suburb selection and timing turned a modest deposit into six-figure equity.' },
  { category: 'Case Study', date: 'Mar 15, 2026', readTime: '8 min read', desc: 'Our data team reveals five under-the-radar coastal markets where median prices are set to surge.' },
  { category: 'Property Insights', date: 'Mar 10, 2026', readTime: '5 min read', desc: '' },
  { category: 'Suburb Spotlight', date: 'Mar 4, 2026', readTime: '7 min read', desc: 'From mining-boom recovery towns to lifestyle hotspots — why WA is back on every serious investor\'s radar.' },
  { category: 'Expert Guide', date: 'Feb 26, 2026', readTime: '6 min read', desc: 'A step-by-step blueprint for going from zero properties to a diversified, cash-flow-positive portfolio.' },
];

export function GalleryGrid({ images }: GalleryGridProps) {
  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {
      animated: true,
      showClass: 'f-fadeIn',
      hideClass: 'f-fadeOut',
    });
    return () => { Fancybox.destroy(); };
  }, []);

  // Split: rows of [featured, small, small] zigzagging
  const row1Featured = images[0];
  const row1Stack = [images[1], images[2]];
  const row2Featured = images[3];
  const row2Stack = [images[4], images[5]];

  return (
    <div className={styles.blogLayout}>
      {/* ─── ROW 1: Featured LEFT, Stack RIGHT ─── */}
      <div className={styles.zigzagRow}>
        <a
          href={row1Featured.src}
          data-fancybox="gallery"
          data-caption={row1Featured.alt}
          className={`${styles.card} ${styles.cardFeatured}`}
        >
          <div className={styles.cardImageWrap}>
            <Image
              src={row1Featured.src}
              alt={row1Featured.alt}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 55vw"
              className={styles.cardImage}
            />
            <div className={styles.cardGradient} />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardTopRow}>
              <span className={styles.cardCategory}>{BLOG_META[0].category}</span>
              <span className={styles.cardDate}>{BLOG_META[0].date}</span>
            </div>
            <h3 className={styles.cardTitle}>{row1Featured.alt}</h3>
            <div className={styles.cardFooter}>
              <span className={styles.cardRead}>{BLOG_META[0].readTime}</span>
              <span className={styles.cardArrow}><HiOutlineArrowUpRight /></span>
            </div>
          </div>
        </a>

        <div className={styles.stackCol}>
          {row1Stack.map((img, i) => (
            <a
              key={i}
              href={img.src}
              data-fancybox="gallery"
              data-caption={img.alt}
              className={`${styles.card} ${styles.cardSmall}`}
            >
              <div className={styles.cardImageWrapSmall}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={styles.cardImage}
                />
                <div className={styles.cardGradient} />
              </div>
              <div className={styles.cardBodySmall}>
                <div className={styles.cardTopRow}>
                  <span className={styles.cardCategory}>{BLOG_META[i + 1].category}</span>
                  <span className={styles.cardDate}>{BLOG_META[i + 1].date}</span>
                </div>
                <h3 className={styles.cardTitleSmall}>{img.alt}</h3>
                {BLOG_META[i + 1].desc && (
                  <p className={styles.cardDesc}>{BLOG_META[i + 1].desc}</p>
                )}
                <div className={styles.cardFooter}>
                  <span className={styles.cardRead}>{BLOG_META[i + 1].readTime}</span>
                  <span className={styles.cardArrow}><HiOutlineArrowUpRight /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ─── ROW 2: Stack LEFT, Featured RIGHT (zigzag) ─── */}
      <div className={`${styles.zigzagRow} ${styles.zigzagReverse}`}>
        <a
          href={row2Featured.src}
          data-fancybox="gallery"
          data-caption={row2Featured.alt}
          className={`${styles.card} ${styles.cardFeatured}`}
        >
          <div className={styles.cardImageWrap}>
            <Image
              src={row2Featured.src}
              alt={row2Featured.alt}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 55vw"
              className={styles.cardImage}
            />
            <div className={styles.cardGradient} />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardTopRow}>
              <span className={styles.cardCategory}>{BLOG_META[3].category}</span>
              <span className={styles.cardDate}>{BLOG_META[3].date}</span>
            </div>
            <h3 className={styles.cardTitle}>{row2Featured.alt}</h3>
            <div className={styles.cardFooter}>
              <span className={styles.cardRead}>{BLOG_META[3].readTime}</span>
              <span className={styles.cardArrow}><HiOutlineArrowUpRight /></span>
            </div>
          </div>
        </a>

        <div className={styles.stackCol}>
          {row2Stack.map((img, i) => (
            <a
              key={i}
              href={img.src}
              data-fancybox="gallery"
              data-caption={img.alt}
              className={`${styles.card} ${styles.cardSmall}`}
            >
              <div className={styles.cardImageWrapSmall}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={styles.cardImage}
                />
                <div className={styles.cardGradient} />
              </div>
              <div className={styles.cardBodySmall}>
                <div className={styles.cardTopRow}>
                  <span className={styles.cardCategory}>{BLOG_META[i + 4].category}</span>
                  <span className={styles.cardDate}>{BLOG_META[i + 4].date}</span>
                </div>
                <h3 className={styles.cardTitleSmall}>{img.alt}</h3>
                {BLOG_META[i + 4].desc && (
                  <p className={styles.cardDesc}>{BLOG_META[i + 4].desc}</p>
                )}
                <div className={styles.cardFooter}>
                  <span className={styles.cardRead}>{BLOG_META[i + 4].readTime}</span>
                  <span className={styles.cardArrow}><HiOutlineArrowUpRight /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
