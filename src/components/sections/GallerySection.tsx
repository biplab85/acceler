import { galleryContent } from '@/lib/content';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GalleryGrid } from '@/components/ui/GalleryGrid';
import styles from './GallerySection.module.scss';

export function GallerySection() {
  const { label, heading, images } = galleryContent;

  return (
    <SectionWrapper id="gallery" padding="sm" background="alt">
      <SectionLabel text={label} />
      <h2 className={styles.heading}>{heading}</h2>
      <GalleryGrid images={images} />
    </SectionWrapper>
  );
}
