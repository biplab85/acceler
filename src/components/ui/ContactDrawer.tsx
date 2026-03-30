'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { HiXMark } from 'react-icons/hi2';
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCalendarDays,
} from 'react-icons/hi2';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from './ContactDrawer.module.scss';

// ─── CONTEXT ────────────────────────────────────────────
const DrawerContext = createContext<{
  open: () => void;
  close: () => void;
  isOpen: boolean;
}>({ open: () => {}, close: () => {}, isOpen: false });

export const useContactDrawer = () => useContext(DrawerContext);

// ─── PROVIDER ───────────────────────────────────────────
export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Intercept all clicks on #contact links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href="#contact"]');
      if (target) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  return (
    <DrawerContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ContactDrawer isOpen={isOpen} onClose={close} />
    </DrawerContext.Provider>
  );
}

// ─── DRAWER COMPONENT ───────────────────────────────────
function ContactDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <HiXMark />
        </button>

        <div className={styles.drawerInner}>
          {/* FORM */}
          <div className={styles.formSection}>
            <h2 className={styles.drawerTitle}>Get In Touch</h2>
            <p className={styles.drawerSubtext}>
              Have questions or ready to get started? Fill out the form and we&apos;ll be in touch.
            </p>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>First Name</label>
                  <input type="text" className={styles.input} placeholder="John" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Last Name</label>
                  <input type="text" className={styles.input} placeholder="Doe" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input type="email" className={styles.input} placeholder="john@example.com" />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Phone</label>
                <input type="tel" className={styles.input} placeholder="+61 400 000 000" />
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Preferred Time</label>
                  <select className={styles.input}>
                    <option value="">Select a time</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>1:00 PM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Finance Pre-approval?</label>
                  <select className={styles.input}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                    <option>In Progress</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Message</label>
                <textarea
                  className={styles.textarea}
                  rows={3}
                  placeholder="Anything else you'd like to mention?"
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <HiOutlineCalendarDays />
                Book Now
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Contact Details</h3>

            <div className={styles.contactList}>
              <a href="mailto:info@acceler.com.au" className={styles.contactItem}>
                <div className={styles.contactIcon}><HiOutlineEnvelope /></div>
                <div>
                  <span className={styles.contactLabel}>Email</span>
                  <span className={styles.contactValue}>info@acceler.com.au</span>
                </div>
              </a>

              <a href="tel:+61300000000" className={styles.contactItem}>
                <div className={styles.contactIcon}><HiOutlinePhone /></div>
                <div>
                  <span className={styles.contactLabel}>Phone</span>
                  <span className={styles.contactValue}>+61 3 0000 0000</span>
                </div>
              </a>

              <a
                href="https://wa.me/61300000000"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
              >
                <div className={styles.contactIcon}><FaWhatsapp /></div>
                <div>
                  <span className={styles.contactLabel}>WhatsApp</span>
                  <span className={styles.contactValue}>Chat with us</span>
                </div>
              </a>
            </div>

            <div className={styles.socialRow}>
              <a
                href="https://linkedin.com/company/acceler-investing"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://facebook.com/accelerinvesting"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
