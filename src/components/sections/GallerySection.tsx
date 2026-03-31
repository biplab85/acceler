import { galleryContent } from '@/lib/content';
import { GalleryGrid } from '@/components/ui/GalleryGrid';
import styles from './GallerySection.module.scss';

export function GallerySection() {
  const { label, heading, images } = galleryContent;

  return (
    <section id="gallery" className={styles.sectionWrap}>
      {/* Ambient floating orbs */}
      <div className={styles.ambientOrb + ' ' + styles.orb1} aria-hidden="true" />
      <div className={styles.ambientOrb + ' ' + styles.orb2} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <div className={styles.labelWrap}>
              <span className={styles.labelLine} />
              <span className={styles.label}>{label}</span>
            </div>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.subtitle}>
              Insights, case studies, and expert analysis from our property advisory team.
            </p>
          </div>
        </div>

        <GalleryGrid images={images} />

        <div className={styles.ctaRow}>
          <a href="#" className={styles.readMoreBtn}>
            View All Posts
            <span className={styles.readMoreArrow}>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
