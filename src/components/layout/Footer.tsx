import Image from 'next/image';
import { footerContent } from '@/lib/content';
import { HiArrowUp } from 'react-icons/hi';
import styles from './Footer.module.scss';

export function Footer() {
  const { mission, socials, quickLinks, resources, contact, copyright } = footerContent;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Brand */}
          <div className={styles.brand}>
            <Image
              src="/logo-white.svg"
              alt="Acceler Investing"
              width={130}
              height={34}
              unoptimized
            />
            <p className={styles.mission}>{mission}</p>
            <div className={styles.socials}>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <ul className={styles.list}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Resources</h4>
            <ul className={styles.list}>
              {resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <ul className={styles.list}>
              <li className={styles.contactItem}>{contact.address}</li>
              <li>
                <a href={`mailto:${contact.email}`} className={styles.footerLink}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone}`} className={styles.footerLink}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.cta.href} className={styles.contactCta}>
                  {contact.cta.label} &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>{copyright}</p>
          <a href="#home" className={styles.backToTop} aria-label="Back to top">
            <HiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
