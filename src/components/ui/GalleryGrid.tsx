'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import type { GalleryImage } from '@/lib/content';
import styles from './GalleryGrid.module.scss';

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {
      animated: true,
      showClass: 'f-fadeIn',
      hideClass: 'f-fadeOut',
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <div className={styles.grid}>
      {images.map((img, i) => (
        <a
          key={i}
          href={img.src}
          data-fancybox="gallery"
          data-caption={img.alt}
          className={`${styles.item} ${styles[img.aspect]}`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.image}
          />
        </a>
      ))}
    </div>
  );
}
