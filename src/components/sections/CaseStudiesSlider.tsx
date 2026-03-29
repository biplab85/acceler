'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { caseStudiesContent } from '@/lib/content';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { CaseStudySlide } from '@/components/ui/CaseStudySlide';
import styles from './CaseStudiesSlider.module.scss';

export function CaseStudiesSlider() {
  const { label, heading, description, items } = caseStudiesContent;

  return (
    <SectionWrapper id="results" padding="md" background="default">
      <div className={styles.header}>
        <div>
          <SectionLabel text={label} />
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <div className={styles.sliderWrap}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          navigation={{
            prevEl: `.${styles.prevBtn}`,
            nextEl: `.${styles.nextBtn}`,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className={styles.swiper}
        >
          {items.map((item, i) => (
            <SwiperSlide key={i}>
              <CaseStudySlide {...item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.navButtons}>
          <button className={styles.prevBtn} aria-label="Previous slide">
            &larr;
          </button>
          <button className={styles.nextBtn} aria-label="Next slide">
            &rarr;
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
