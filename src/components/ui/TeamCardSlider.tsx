'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { teamContent } from '@/lib/content';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import styles from './TeamCardSlider.module.scss';

const CARD_THEMES = [
  { bg: '#022949', text: '#ffffff', role: '#ff914d', bio: 'rgba(255,255,255,0.7)' },
  { bg: '#fff3e6', text: '#1a1a2e', role: '#e87d3a', bio: '#5a6275' },
  { bg: '#f0faf4', text: '#1a1a2e', role: '#059669', bio: '#5a6275' },
  { bg: '#f0f0ff', text: '#1a1a2e', role: '#7c3aed', bio: '#5a6275' },
];

export function TeamCardSlider() {
  const { members } = teamContent;
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const swiper = swiperRef.current;
      if (!swiper) return;
      if (swiper.activeIndex >= swiper.slides.length - 1) {
        swiper.slideTo(0, 600);
      } else {
        swiper.slideNext(600);
      }
    }, 3000);
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!mounted) {
    return <div style={{ width: 280, height: 400, borderRadius: 16, background: '#f7f8fa' }} />;
  }

  return (
    <div className={styles.wrapper}>
      <Swiper
        effect="cards"
        grabCursor
        modules={[EffectCards]}
        speed={600}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          startAutoplay();
        }}
        onTouchEnd={() => startAutoplay()}
        cardsEffect={{
          slideShadows: false,
          perSlideRotate: 2,
          perSlideOffset: 8,
        }}
        className={styles.swiper}
      >
        {members.map((member, i) => {
          const theme = CARD_THEMES[i % CARD_THEMES.length];
          return (
            <SwiperSlide key={member.name} className={styles.slide}>
              <div className={styles.card} style={{ backgroundColor: theme.bg }}>
                <div className={styles.imageWrap}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="280px"
                    className={styles.image}
                  />
                </div>
                <div className={styles.info}>
                  <h4 className={styles.name} style={{ color: theme.text }}>{member.name}</h4>
                  <span className={styles.role} style={{ color: theme.role }}>{member.designation}</span>
                  <p className={styles.bio} style={{ color: theme.bio }}>{member.shortBio}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
