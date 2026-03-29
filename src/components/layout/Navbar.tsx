'use client';

import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { HiOutlineMenu, HiOutlineX, HiOutlineHome, HiOutlineUserGroup, HiOutlineBriefcase, HiOutlineChartBar, HiOutlineClipboardList, HiOutlineQuestionMarkCircle, HiOutlinePhone, HiOutlineCalendar } from 'react-icons/hi';
import { NAV_LINKS } from '@/lib/constants';
import { navContent } from '@/lib/content';

const NAV_ICONS: Record<string, React.ReactNode> = {
  Home: <HiOutlineHome />,
  About: <HiOutlineUserGroup />,
  Services: <HiOutlineBriefcase />,
  Results: <HiOutlineChartBar />,
  Process: <HiOutlineClipboardList />,
  FAQ: <HiOutlineQuestionMarkCircle />,
  Contact: <HiOutlinePhone />,
};
import { useActiveSection } from '@/hooks/useActiveSection';
import styles from './Navbar.module.scss';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.href.slice(1)));

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header className={clsx(styles.header, isScrolled && styles.scrolled)}>
      <nav className={styles.nav}>
        <a href="#home" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="Acceler Investing"
            width={80}
            height={80}
            priority
            style={{ objectFit: 'contain' }}
          />
        </a>

        <ul className={clsx(styles.links, isOpen && styles.open)}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={clsx(
                  styles.link,
                  activeSection === link.href.slice(1) && styles.active
                )}
                onClick={() => setIsOpen(false)}
              >
                {NAV_ICONS[link.label] && <span className={styles.navIcon}>{NAV_ICONS[link.label]}</span>}
                {link.label}
              </a>
            </li>
          ))}
          <li className={styles.mobileCta}>
            <a href={navContent.cta.href} className={styles.ctaButton} onClick={() => setIsOpen(false)}>
              {navContent.cta.label}
            </a>
          </li>
        </ul>

        <a href={navContent.cta.href} className={styles.desktopCta}>
          <HiOutlineCalendar /> {navContent.cta.label}
        </a>

        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </nav>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </header>
  );
}
