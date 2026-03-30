import { testimonialsContent } from '@/lib/content';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import styles from './TestimonialsSection.module.scss';

function TestimonialsBg() {
  return (
    <svg
      className={styles.bgSvg}
      viewBox="0 0 1440 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Large quote mark — left */}
      <text x="40" y="180" fontSize="280" fontFamily="Georgia, serif" fill="rgba(2,41,73,0.025)">&ldquo;</text>

      {/* Large quote mark — right */}
      <text x="1100" y="520" fontSize="280" fontFamily="Georgia, serif" fill="rgba(2,41,73,0.025)">&rdquo;</text>

      {/* Decorative circles */}
      <circle cx="1350" cy="100" r="80" stroke="rgba(255,145,77,0.06)" strokeWidth="1" fill="none" />
      <circle cx="1350" cy="100" r="50" stroke="rgba(255,145,77,0.04)" strokeWidth="1" fill="none" />
      <circle cx="90" cy="480" r="65" stroke="rgba(2,41,73,0.04)" strokeWidth="1" fill="none" />
      <circle cx="90" cy="480" r="40" stroke="rgba(2,41,73,0.03)" strokeWidth="1" fill="none" />

      {/* Dotted grid pattern — top right */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <circle
            key={`dot-tr-${row}-${col}`}
            cx={1180 + col * 18}
            cy={30 + row * 18}
            r="1.5"
            fill="rgba(2,41,73,0.04)"
          />
        ))
      )}

      {/* Dotted grid pattern — bottom left */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <circle
            key={`dot-bl-${row}-${col}`}
            cx={160 + col * 18}
            cy={500 + row * 18}
            r="1.5"
            fill="rgba(2,41,73,0.04)"
          />
        ))
      )}

      {/* Subtle diagonal lines */}
      <line x1="0" y1="200" x2="200" y2="0" stroke="rgba(2,41,73,0.02)" strokeWidth="1" />
      <line x1="0" y1="260" x2="260" y2="0" stroke="rgba(2,41,73,0.015)" strokeWidth="1" />
      <line x1="1240" y1="600" x2="1440" y2="400" stroke="rgba(2,41,73,0.02)" strokeWidth="1" />
      <line x1="1180" y1="600" x2="1440" y2="340" stroke="rgba(2,41,73,0.015)" strokeWidth="1" />

      {/* Small property silhouettes — bottom */}
      {/* House 1 */}
      <polygon points="580,580 600,560 620,580" fill="rgba(2,41,73,0.02)" />
      <rect x="582" y="580" width="36" height="20" fill="rgba(2,41,73,0.018)" />

      {/* Building */}
      <rect x="640" y="555" width="20" height="45" fill="rgba(2,41,73,0.02)" />
      <rect x="644" y="560" width="4" height="5" rx="0.5" fill="rgba(255,145,77,0.04)" />
      <rect x="652" y="560" width="4" height="5" rx="0.5" fill="rgba(2,41,73,0.025)" />
      <rect x="644" y="570" width="4" height="5" rx="0.5" fill="rgba(2,41,73,0.025)" />
      <rect x="652" y="570" width="4" height="5" rx="0.5" fill="rgba(255,145,77,0.035)" />

      {/* House 2 */}
      <polygon points="680,575 700,555 720,575" fill="rgba(2,41,73,0.02)" />
      <rect x="683" y="575" width="34" height="25" fill="rgba(2,41,73,0.018)" />
      <rect x="694" y="585" width="10" height="15" rx="1" fill="rgba(255,145,77,0.03)" />

      {/* Tall building */}
      <rect x="745" y="540" width="16" height="60" fill="rgba(2,41,73,0.022)" />
      <rect x="749" y="546" width="3" height="4" rx="0.5" fill="rgba(255,145,77,0.04)" />
      <rect x="756" y="546" width="3" height="4" rx="0.5" fill="rgba(2,41,73,0.025)" />
      <rect x="749" y="556" width="3" height="4" rx="0.5" fill="rgba(2,41,73,0.025)" />
      <rect x="756" y="556" width="3" height="4" rx="0.5" fill="rgba(255,145,77,0.035)" />

      {/* Accent star shapes */}
      <circle cx="300" cy="80" r="3" fill="rgba(255,145,77,0.08)" />
      <circle cx="1100" cy="150" r="2" fill="rgba(255,145,77,0.06)" />
      <circle cx="800" cy="50" r="2.5" fill="rgba(2,41,73,0.04)" />
    </svg>
  );
}

export function TestimonialsSection() {
  const { label, heading, items } = testimonialsContent;

  return (
    <SectionWrapper id="testimonials" padding="md" background="default" className={styles.sectionWrap}>
      <TestimonialsBg />
      <div className={styles.header}>
        <SectionLabel text={label} />
        <h2 className={styles.heading}>{heading}</h2>
      </div>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <TestimonialCard
            key={item.name}
            {...item}
            variant={i === 1 || i === 4 ? 'warm' : 'default'}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
