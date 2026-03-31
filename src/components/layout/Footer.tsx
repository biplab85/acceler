'use client';

import Image from 'next/image';
import { footerContent } from '@/lib/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { HiArrowUp } from 'react-icons/hi';
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineChartBarSquare,
  HiOutlineHomeModern,
  HiOutlineUserGroup,
  HiOutlineChevronRight,
  HiOutlineMapPin,
  HiOutlineEnvelope,
} from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './Footer.module.scss';

function FooterSkyline() {
  return (
    <div className={styles.skylineWrap}>
      <svg
        className={styles.skyline}
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Building group 1 */}
        <rect x="60" y="80" width="40" height="120" fill="rgba(255,255,255,0.04)" />
        <rect x="65" y="88" width="8" height="10" rx="1" fill="rgba(255,145,77,0.15)" />
        <rect x="80" y="88" width="8" height="10" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="65" y="104" width="8" height="10" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="80" y="104" width="8" height="10" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="65" y="120" width="8" height="10" rx="1" fill="rgba(255,145,77,0.1)" />
        <rect x="80" y="120" width="8" height="10" rx="1" fill="rgba(255,255,255,0.06)" />

        {/* Tall tower */}
        <rect x="110" y="30" width="30" height="170" fill="rgba(255,255,255,0.05)" />
        <rect x="116" y="40" width="6" height="8" rx="1" fill="rgba(255,145,77,0.18)" />
        <rect x="128" y="40" width="6" height="8" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="116" y="56" width="6" height="8" rx="1" fill="rgba(255,255,255,0.05)" />
        <rect x="128" y="56" width="6" height="8" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="116" y="72" width="6" height="8" rx="1" fill="rgba(255,145,77,0.1)" />
        <rect x="128" y="72" width="6" height="8" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="116" y="88" width="6" height="8" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="128" y="88" width="6" height="8" rx="1" fill="rgba(255,145,77,0.14)" />
        <rect x="124" y="18" width="2" height="12" fill="rgba(255,255,255,0.08)" />
        <circle cx="125" cy="16" r="2" fill="rgba(255,145,77,0.3)" />

        {/* Wide building */}
        <rect x="150" y="100" width="55" height="100" fill="rgba(255,255,255,0.035)" />
        <rect x="158" y="110" width="10" height="12" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="174" y="110" width="10" height="12" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="190" y="110" width="10" height="12" rx="1" fill="rgba(255,255,255,0.05)" />
        <rect x="158" y="130" width="10" height="12" rx="1" fill="rgba(255,145,77,0.1)" />
        <rect x="174" y="130" width="10" height="12" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="190" y="130" width="10" height="12" rx="1" fill="rgba(255,145,77,0.08)" />

        {/* Building group 2 */}
        <rect x="240" y="60" width="35" height="140" fill="rgba(255,255,255,0.045)" />
        <rect x="247" y="68" width="7" height="9" rx="1" fill="rgba(255,145,77,0.16)" />
        <rect x="260" y="68" width="7" height="9" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="247" y="84" width="7" height="9" rx="1" fill="rgba(255,255,255,0.05)" />
        <rect x="260" y="84" width="7" height="9" rx="1" fill="rgba(255,145,77,0.1)" />
        <rect x="247" y="100" width="7" height="9" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="260" y="100" width="7" height="9" rx="1" fill="rgba(255,145,77,0.13)" />

        {/* Small house */}
        <polygon points="310,120 330,100 350,120" fill="rgba(255,255,255,0.04)" />
        <rect x="312" y="120" width="36" height="80" fill="rgba(255,255,255,0.035)" />
        <rect x="324" y="150" width="12" height="20" rx="1" fill="rgba(255,145,77,0.1)" />

        {/* Skyscraper */}
        <rect x="380" y="20" width="28" height="180" fill="rgba(255,255,255,0.05)" />
        <rect x="376" y="20" width="36" height="8" fill="rgba(255,255,255,0.06)" />
        <rect x="386" y="36" width="6" height="8" rx="1" fill="rgba(255,145,77,0.2)" />
        <rect x="398" y="36" width="6" height="8" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="386" y="52" width="6" height="8" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="398" y="52" width="6" height="8" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="386" y="68" width="6" height="8" rx="1" fill="rgba(255,145,77,0.15)" />
        <rect x="398" y="68" width="6" height="8" rx="1" fill="rgba(255,255,255,0.05)" />
        <rect x="386" y="84" width="6" height="8" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="398" y="84" width="6" height="8" rx="1" fill="rgba(255,145,77,0.1)" />
        <rect x="393" y="6" width="2" height="14" fill="rgba(255,255,255,0.07)" />

        {/* Medium building */}
        <rect x="440" y="90" width="45" height="110" fill="rgba(255,255,255,0.04)" />
        <rect x="448" y="100" width="8" height="10" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="462" y="100" width="8" height="10" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="448" y="118" width="8" height="10" rx="1" fill="rgba(255,145,77,0.1)" />
        <rect x="462" y="118" width="8" height="10" rx="1" fill="rgba(255,255,255,0.05)" />

        {/* Building cluster right */}
        <rect x="520" y="70" width="32" height="130" fill="rgba(255,255,255,0.045)" />
        <rect x="527" y="78" width="6" height="8" rx="1" fill="rgba(255,145,77,0.14)" />
        <rect x="539" y="78" width="6" height="8" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="527" y="94" width="6" height="8" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="539" y="94" width="6" height="8" rx="1" fill="rgba(255,145,77,0.1)" />

        <rect x="560" y="110" width="40" height="90" fill="rgba(255,255,255,0.035)" />
        <rect x="567" y="118" width="8" height="10" rx="1" fill="rgba(255,145,77,0.1)" />
        <rect x="581" y="118" width="8" height="10" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="567" y="136" width="8" height="10" rx="1" fill="rgba(255,255,255,0.05)" />
        <rect x="581" y="136" width="8" height="10" rx="1" fill="rgba(255,145,77,0.12)" />

        {/* Tower with spire */}
        <rect x="640" y="40" width="26" height="160" fill="rgba(255,255,255,0.05)" />
        <polygon points="640,40 653,10 666,40" fill="rgba(255,255,255,0.04)" />
        <rect x="647" y="50" width="5" height="7" rx="1" fill="rgba(255,145,77,0.18)" />
        <rect x="656" y="50" width="5" height="7" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="647" y="64" width="5" height="7" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="656" y="64" width="5" height="7" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="647" y="78" width="5" height="7" rx="1" fill="rgba(255,145,77,0.1)" />
        <rect x="656" y="78" width="5" height="7" rx="1" fill="rgba(255,255,255,0.06)" />

        {/* Right side buildings */}
        <rect x="720" y="50" width="35" height="150" fill="rgba(255,255,255,0.04)" />
        <rect x="727" y="60" width="7" height="9" rx="1" fill="rgba(255,145,77,0.14)" />
        <rect x="740" y="60" width="7" height="9" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="727" y="76" width="7" height="9" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="740" y="76" width="7" height="9" rx="1" fill="rgba(255,145,77,0.1)" />

        <rect x="770" y="95" width="50" height="105" fill="rgba(255,255,255,0.035)" />
        <rect x="778" y="105" width="9" height="11" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="793" y="105" width="9" height="11" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="778" y="124" width="9" height="11" rx="1" fill="rgba(255,145,77,0.08)" />
        <rect x="793" y="124" width="9" height="11" rx="1" fill="rgba(255,255,255,0.05)" />

        <rect x="850" y="35" width="25" height="165" fill="rgba(255,255,255,0.05)" />
        <rect x="845" y="35" width="35" height="7" fill="rgba(255,255,255,0.05)" />
        <rect x="856" y="48" width="5" height="7" rx="1" fill="rgba(255,145,77,0.16)" />
        <rect x="865" y="48" width="5" height="7" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="856" y="62" width="5" height="7" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="865" y="62" width="5" height="7" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="861" y="22" width="2" height="13" fill="rgba(255,255,255,0.07)" />

        <polygon points="920,110 945,85 970,110" fill="rgba(255,255,255,0.04)" />
        <rect x="922" y="110" width="46" height="90" fill="rgba(255,255,255,0.035)" />
        <rect x="938" y="135" width="14" height="22" rx="1" fill="rgba(255,145,77,0.1)" />

        <rect x="1000" y="65" width="38" height="135" fill="rgba(255,255,255,0.045)" />
        <rect x="1008" y="74" width="7" height="9" rx="1" fill="rgba(255,145,77,0.15)" />
        <rect x="1021" y="74" width="7" height="9" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="1008" y="90" width="7" height="9" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="1021" y="90" width="7" height="9" rx="1" fill="rgba(255,145,77,0.1)" />

        <rect x="1060" y="100" width="42" height="100" fill="rgba(255,255,255,0.04)" />
        <rect x="1068" y="110" width="8" height="10" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="1082" y="110" width="8" height="10" rx="1" fill="rgba(255,145,77,0.1)" />

        <rect x="1130" y="45" width="28" height="155" fill="rgba(255,255,255,0.05)" />
        <rect x="1137" y="55" width="5" height="7" rx="1" fill="rgba(255,145,77,0.18)" />
        <rect x="1147" y="55" width="5" height="7" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="1137" y="69" width="5" height="7" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="1147" y="69" width="5" height="7" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="1143" y="32" width="2" height="13" fill="rgba(255,255,255,0.07)" />
        <circle cx="1144" cy="30" r="2" fill="rgba(255,145,77,0.25)" />

        <rect x="1180" y="85" width="48" height="115" fill="rgba(255,255,255,0.035)" />
        <rect x="1188" y="95" width="9" height="11" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="1203" y="95" width="9" height="11" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="1188" y="114" width="9" height="11" rx="1" fill="rgba(255,255,255,0.05)" />
        <rect x="1203" y="114" width="9" height="11" rx="1" fill="rgba(255,145,77,0.08)" />

        <rect x="1260" y="70" width="32" height="130" fill="rgba(255,255,255,0.045)" />
        <rect x="1267" y="80" width="6" height="8" rx="1" fill="rgba(255,145,77,0.14)" />
        <rect x="1279" y="80" width="6" height="8" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="1267" y="96" width="6" height="8" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="1279" y="96" width="6" height="8" rx="1" fill="rgba(255,145,77,0.1)" />

        <rect x="1320" y="90" width="40" height="110" fill="rgba(255,255,255,0.04)" />
        <rect x="1328" y="100" width="8" height="10" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="1342" y="100" width="8" height="10" rx="1" fill="rgba(255,145,77,0.12)" />
        <rect x="1328" y="118" width="8" height="10" rx="1" fill="rgba(255,145,77,0.1)" />
        <rect x="1342" y="118" width="8" height="10" rx="1" fill="rgba(255,255,255,0.05)" />

        <polygon points="1390,105 1410,82 1430,105" fill="rgba(255,255,255,0.04)" />
        <rect x="1392" y="105" width="36" height="95" fill="rgba(255,255,255,0.035)" />
        <rect x="1404" y="130" width="12" height="18" rx="1" fill="rgba(255,145,77,0.1)" />

        {/* Ground line */}
        <rect x="0" y="198" width="1440" height="2" fill="rgba(255,255,255,0.03)" />
      </svg>
    </div>
  );
}

export function Footer() {
  const { mission, socials, quickLinks, contact, copyright } = footerContent;
  const activeId = useActiveSection(
    quickLinks.map((l) => l.href.replace('#', ''))
  );

  const linksLeft = quickLinks.slice(0, 3);
  const linksRight = quickLinks.slice(3);

  return (
    <footer className={styles.footer}>
      <FooterSkyline />
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

          {/* Column 2: Quick Links (2 sub-columns) */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <div className={styles.linkColumns}>
              <ul className={styles.list}>
                {linksLeft.map((link) => {
                  const isActive = activeId === link.href.replace('#', '');
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={`${styles.footerLink} ${isActive ? styles.active : ''}`}
                      >
                        <HiOutlineChevronRight className={styles.linkArrow} />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <ul className={styles.list}>
                {linksRight.map((link) => {
                  const isActive = activeId === link.href.replace('#', '');
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={`${styles.footerLink} ${isActive ? styles.active : ''}`}
                      >
                        <HiOutlineChevronRight className={styles.linkArrow} />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Column 3: Why Us */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Why Acceler</h4>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <HiOutlineChartBarSquare className={styles.featureIcon} />
                <span>15,000+ Suburbs Analysed</span>
              </li>
              <li className={styles.featureItem}>
                <HiOutlineHomeModern className={styles.featureIcon} />
                <span>75+ Properties Purchased</span>
              </li>
              <li className={styles.featureItem}>
                <HiOutlineClipboardDocumentCheck className={styles.featureIcon} />
                <span>100% Client Satisfaction</span>
              </li>
              <li className={styles.featureItem}>
                <HiOutlineUserGroup className={styles.featureIcon} />
                <span>143 Five-Star Reviews</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <ul className={styles.list}>
              <li className={styles.contactItem}>
                <HiOutlineMapPin className={styles.contactIcon} />
                {contact.address}
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={styles.footerLink}>
                  <HiOutlineEnvelope className={styles.contactIcon} />
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/61${contact.phone.replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                  <FaWhatsapp className={styles.contactIcon} />
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
