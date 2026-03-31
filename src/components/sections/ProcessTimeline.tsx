"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { processContent } from "@/lib/content";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ProcessTimeline.module.scss";

const STEP_COLORS = [
  "#ff914d",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
];

// ─── SVG ARC MATH ──────────────────────────────────────
const CX = 150,
  CY = 150,
  R_OUTER = 120,
  R_INNER = 82,
  R_DOT = 120;
const SEGMENT_GAP = 4;
const SEGMENT_SPAN = (360 - SEGMENT_GAP * 7) / 7;

function degToRad(d: number) {
  return (d * Math.PI) / 180;
}
function polar(cx: number, cy: number, r: number, a: number) {
  const rad = degToRad(a);
  return { x: Math.round((cx + r * Math.cos(rad)) * 1e6) / 1e6, y: Math.round((cy + r * Math.sin(rad)) * 1e6) / 1e6 };
}

function arcPath(s: number, e: number) {
  const os = polar(CX, CY, R_OUTER, s),
    oe = polar(CX, CY, R_OUTER, e);
  const is_ = polar(CX, CY, R_INNER, e),
    ie = polar(CX, CY, R_INNER, s);
  const la = e - s > 180 ? 1 : 0;
  return `M ${os.x} ${os.y} A ${R_OUTER} ${R_OUTER} 0 ${la} 1 ${oe.x} ${oe.y} L ${is_.x} ${is_.y} A ${R_INNER} ${R_INNER} 0 ${la} 0 ${ie.x} ${ie.y} Z`;
}

const STEP_ANGLES = Array.from({ length: 7 }, (_, i) => {
  const start = -90 + i * (SEGMENT_SPAN + SEGMENT_GAP);
  return { start, end: start + SEGMENT_SPAN, mid: start + SEGMENT_SPAN / 2 };
});

// ─── LAYOUT: LEFT COLUMN (steps 7,6,5) + CENTER SVG + RIGHT COLUMN (steps 1,2,3,4)
// Cards are rendered in flex columns with manual vertical offsets to align with their ring dot
// Left column: 07 (top), 06 (middle), 05 (bottom)
// Right column: 01 (top), 02, 03, 04 (bottom)
const LEFT_STEPS = [6, 5, 4]; // indices for steps 07, 06, 05
const RIGHT_STEPS = [0, 1, 2, 3]; // indices for steps 01, 02, 03, 04

// ─── CIRCULAR RING SVG ─────────────────────────────────
function CircularRing({
  hovered,
  onHover,
}: {
  hovered: number | null;
  onHover: (i: number | null) => void;
}) {
  return (
    <svg
      viewBox="0 0 300 300"
      className={styles.ring}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {STEP_ANGLES.map((_, i) => (
          <linearGradient
            key={i}
            id={`segG${i}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={STEP_COLORS[i]} stopOpacity="0.85" />
            <stop offset="100%" stopColor={STEP_COLORS[i]} stopOpacity="1" />
          </linearGradient>
        ))}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowA" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {STEP_ANGLES.map((seg, i) => (
        <path
          key={i}
          d={arcPath(seg.start, seg.end)}
          fill={`url(#segG${i})`}
          className={styles.arcSegment}
          style={{
            animationDelay: `${i * 0.12}s`,
            opacity: hovered !== null && hovered !== i ? 0.3 : 1,
            transform: hovered === i ? "scale(1.04)" : "scale(1)",
            transformOrigin: "150px 150px",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
          onMouseEnter={() => onHover(i)}
          onMouseLeave={() => onHover(null)}
        />
      ))}

      {STEP_ANGLES.map((seg, i) => {
        const dp = polar(CX, CY, R_DOT, seg.mid);
        const active = hovered === i;
        return (
          <g
            key={i}
            className={styles.dotGroup}
            style={{ animationDelay: `${0.5 + i * 0.08}s` }}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
          >
            {active && (
              <circle
                cx={dp.x}
                cy={dp.y}
                r="22"
                fill="none"
                stroke={STEP_COLORS[i]}
                strokeWidth="2"
                className={styles.pulseRing}
              />
            )}
            <circle
              cx={dp.x}
              cy={dp.y}
              r={active ? 17 : 14}
              fill={active ? STEP_COLORS[i] : "#fff"}
              stroke={STEP_COLORS[i]}
              strokeWidth={active ? 3 : 2.5}
              filter={active ? "url(#glowA)" : "url(#glow)"}
              style={{ transition: "all 0.3s ease" }}
            />
            <text
              x={dp.x}
              y={dp.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={active ? "#fff" : STEP_COLORS[i]}
              fontSize={active ? "12" : "11"}
              fontWeight="700"
              fontFamily="var(--font-heading)"
              style={{ cursor: "pointer", transition: "all 0.3s ease" }}
            >
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}

      <circle cx={CX} cy={CY} r="30" fill="#fff" filter="url(#glow)" />
      <circle
        cx={CX}
        cy={CY}
        r="22"
        fill="none"
        stroke="#022949"
        strokeWidth="2"
        opacity="0.15"
      />
      <circle
        cx={CX}
        cy={CY}
        r="14"
        fill="none"
        stroke="#022949"
        strokeWidth="2"
        opacity="0.12"
      />
      <circle cx={CX} cy={CY} r="6" fill="#022949" opacity="0.8" />
      <line
        x1={CX}
        y1={CY - 2}
        x2={CX + 8}
        y2={CY - 16}
        stroke="#ff914d"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polygon
        points={`${CX + 8},${CY - 20} ${CX + 12},${CY - 13} ${CX + 5},${CY - 14}`}
        fill="#ff914d"
      />
      <circle
        cx={CX}
        cy={CY}
        r="138"
        fill="none"
        stroke="#022949"
        strokeWidth="0.5"
        strokeDasharray="3 6"
        opacity="0.08"
        className={styles.orbitRing}
      />
    </svg>
  );
}

// ─── CONNECTOR LINES ────────────────────────────────────
function ConnectorLines({
  hovered,
  cardRefs,
  ringRef,
  wrapRef,
}: {
  hovered: number | null;
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>;
  ringRef: React.RefObject<HTMLDivElement | null>;
  wrapRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [lines, setLines] = useState<
    {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
      idx: number;
    }[]
  >([]);

  const calc = useCallback(() => {
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    const cards = cardRefs.current;
    if (!wrap || !ring || !cards) return;

    const wr = wrap.getBoundingClientRect();
    const rr = ring.getBoundingClientRect();
    const rcx = rr.left - wr.left + rr.width / 2;
    const rcy = rr.top - wr.top + rr.height / 2;
    const scale = rr.width / 300;

    const newLines = STEP_ANGLES.map((seg, i) => {
      const dp = polar(CX, CY, R_DOT, seg.mid);
      const dx = rcx + (dp.x - CX) * scale;
      const dy = rcy + (dp.y - CY) * scale;

      const card = cards[i];
      if (!card)
        return {
          x1: dx,
          y1: dy,
          x2: dx,
          y2: dy,
          color: STEP_COLORS[i],
          idx: i,
        };

      const cr = card.getBoundingClientRect();
      // Find the edge of the card closest to the ring dot
      const ccx = cr.left - wr.left + cr.width / 2;
      const ccy = cr.top - wr.top + cr.height / 2;

      // Card edge point: clamp to card rect
      const angle = Math.atan2(dy - ccy, dx - ccx);
      const halfW = cr.width / 2;
      const halfH = cr.height / 2;
      // Find intersection with card edge
      const tX =
        Math.abs(Math.cos(angle)) > 0.001
          ? halfW / Math.abs(Math.cos(angle))
          : Infinity;
      const tY =
        Math.abs(Math.sin(angle)) > 0.001
          ? halfH / Math.abs(Math.sin(angle))
          : Infinity;
      const t = Math.min(tX, tY);
      const ex = ccx + Math.cos(angle) * t;
      const ey = ccy + Math.sin(angle) * t;

      // Shorten from dot side by 18px
      const d2 = Math.sqrt((ex - dx) ** 2 + (ey - dy) ** 2);
      const sx = d2 > 0 ? dx + ((ex - dx) / d2) * 18 : dx;
      const sy = d2 > 0 ? dy + ((ey - dy) / d2) * 18 : dy;

      return { x1: sx, y1: sy, x2: ex, y2: ey, color: STEP_COLORS[i], idx: i };
    });

    setLines(newLines);
  }, [cardRefs, ringRef, wrapRef]);

  useEffect(() => {
    calc();
    window.addEventListener("resize", calc);
    const t = setTimeout(calc, 300);
    return () => {
      window.removeEventListener("resize", calc);
      clearTimeout(t);
    };
  }, [calc]);

  if (!lines.length) return null;

  return (
    <svg className={styles.connectorSvg}>
      <defs>
        {STEP_COLORS.map((c, i) => (
          <marker
            key={i}
            id={`ah${i}`}
            markerWidth="7"
            markerHeight="5"
            refX="6"
            refY="2.5"
            orient="auto"
          >
            <polygon points="0 0, 7 2.5, 0 5" fill={c} />
          </marker>
        ))}
      </defs>
      {lines.map((l) => {
        const active = hovered === l.idx;
        return (
          <line
            key={l.idx}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={l.color}
            strokeWidth={active ? 2 : 1}
            strokeDasharray={active ? "none" : "3 4"}
            opacity={hovered !== null ? (active ? 0.85 : 0.1) : 0.25}
            markerEnd={`url(#ah${l.idx})`}
            style={{ transition: "opacity 0.3s, stroke-width 0.3s" }}
          />
        );
      })}
    </svg>
  );
}

// ─── STEP CARD ──────────────────────────────────────────
function StepCard({
  step,
  index,
  isActive,
  isDimmed,
  onHover,
  cardRef,
}: {
  step: (typeof processContent.steps)[number];
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  onHover: (i: number | null) => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isActive ? styles.cardActive : ""} ${isDimmed ? styles.cardDimmed : ""}`}
      style={{ ["--card-color" as string]: STEP_COLORS[index] }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={styles.cardNumber}
        style={{ background: STEP_COLORS[index] }}
      >
        {String(step.number).padStart(2, "0")}
      </div>
      <div className={styles.cardContent}>
        <h4 className={styles.cardTitle}>{step.title}</h4>
        <p className={styles.cardDesc}>{step.description}</p>
      </div>
    </div>
  );
}

// ─── MOBILE CARD ────────────────────────────────────────
function MobileStepCard({
  step,
  index,
}: {
  step: (typeof processContent.steps)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${styles.mobileCard} ${isVisible ? styles.mobileCardVisible : ""}`}
      style={{
        borderLeftColor: STEP_COLORS[index],
        transitionDelay: `${index * 0.06}s`,
      }}
    >
      <div
        className={styles.cardNumber}
        style={{ background: STEP_COLORS[index] }}
      >
        {String(step.number).padStart(2, "0")}
      </div>
      <div className={styles.cardContent}>
        <h4 className={styles.cardTitle}>{step.title}</h4>
        <p className={styles.cardDesc}>{step.description}</p>
      </div>
    </div>
  );
}

// ─── MAIN ───────────────────────────────────────────────
export function ProcessTimeline() {
  const { label, heading, steps } = processContent;
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [hovered, setHovered] = useState<number | null>(null);
  const manualHover = useRef(false); // true when user is hovering
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    [],
  );

  // Auto-cycle highlight through steps continuously
  useEffect(() => {
    const startAuto = () => {
      if (autoRef.current) clearInterval(autoRef.current);
      autoRef.current = setInterval(() => {
        if (!manualHover.current) {
          setHovered((prev) => ((prev ?? -1) + 1) % 7);
        }
      }, 2000);
    };
    startAuto();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, []);

  // Wrap setHovered to pause auto on manual hover
  const handleHover = useCallback((i: number | null) => {
    manualHover.current = i !== null;
    setHovered(i);
  }, []);

  return (
    <SectionWrapper
      id="process"
      padding="lg"
      background="alt"
      backgroundElement={
        <div className={styles.sectionBg} aria-hidden="true">
          <svg
            className={styles.bgSvg}
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="pBg1" cx="15%" cy="80%" r="40%">
              <stop offset="0%" stopColor="#ff914d" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ff914d" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="pBg2" cx="85%" cy="20%" r="40%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </radialGradient>
            <pattern
              id="pDots"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="0.6" fill="#022949" opacity="0.035" />
            </pattern>
          </defs>

          {/* Soft gradient washes */}
          <ellipse cx="220" cy="720" rx="380" ry="300" fill="url(#pBg1)">
            <animate
              attributeName="rx"
              values="380;410;380"
              dur="12s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="1220" cy="180" rx="350" ry="260" fill="url(#pBg2)">
            <animate
              attributeName="rx"
              values="350;375;350"
              dur="14s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* Dot grid */}
          <rect width="100%" height="100%" fill="url(#pDots)" />

          {/* ── CITYSCAPE SKYLINE (bottom) ──────────────── */}
          <g opacity="0.04" className={styles.skyline}>
            {/* Buildings — left cluster (flush to left edge) */}
            <rect x="0" y="680" width="45" height="220" rx="2" fill="#022949" />
            <rect
              x="10"
              y="700"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="10"
              y="720"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="10"
              y="740"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="28"
              y="700"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="28"
              y="720"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />

            <rect
              x="55"
              y="620"
              width="55"
              height="280"
              rx="2"
              fill="#022949"
            />
            <rect
              x="65"
              y="640"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="65"
              y="660"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="65"
              y="680"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="65"
              y="700"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="85"
              y="640"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="85"
              y="660"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="85"
              y="680"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />

            <rect
              x="120"
              y="710"
              width="35"
              height="190"
              rx="2"
              fill="#022949"
            />
            <rect
              x="130"
              y="730"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="130"
              y="750"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />

            {/* Tall tower — left */}
            <rect
              x="170"
              y="540"
              width="40"
              height="360"
              rx="2"
              fill="#022949"
            />
            <rect
              x="185"
              y="540"
              width="10"
              height="15"
              rx="5"
              fill="#022949"
            />
            <rect
              x="180"
              y="560"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="180"
              y="580"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="180"
              y="600"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="180"
              y="620"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="195"
              y="560"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="195"
              y="580"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="195"
              y="600"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />

            {/* House — left */}
            <rect
              x="230"
              y="760"
              width="50"
              height="140"
              rx="2"
              fill="#022949"
            />
            <polygon points="230,760 255,730 280,760" fill="#022949" />
            <rect
              x="245"
              y="810"
              width="20"
              height="30"
              rx="1"
              fill="#fff"
              opacity="0.4"
            />
            <rect
              x="238"
              y="775"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="262"
              y="775"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />

            {/* Buildings — right cluster (flush to right edge) */}
            <rect
              x="1130"
              y="650"
              width="50"
              height="250"
              rx="2"
              fill="#022949"
            />
            <rect
              x="1140"
              y="670"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1140"
              y="690"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1140"
              y="710"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1160"
              y="670"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1160"
              y="690"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />

            {/* Tall tower — right */}
            <rect
              x="1190"
              y="500"
              width="45"
              height="400"
              rx="2"
              fill="#022949"
            />
            <rect
              x="1208"
              y="490"
              width="10"
              height="15"
              rx="5"
              fill="#022949"
            />
            <rect
              x="1200"
              y="520"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1200"
              y="540"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1200"
              y="560"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1200"
              y="580"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1215"
              y="520"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1215"
              y="540"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1215"
              y="560"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1215"
              y="580"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />

            <rect
              x="1245"
              y="700"
              width="40"
              height="200"
              rx="2"
              fill="#022949"
            />
            <rect
              x="1255"
              y="720"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1255"
              y="740"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1270"
              y="720"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />

            {/* House — right */}
            <rect
              x="1295"
              y="770"
              width="55"
              height="130"
              rx="2"
              fill="#022949"
            />
            <polygon points="1295,770 1322,735 1350,770" fill="#022949" />
            <rect
              x="1308"
              y="820"
              width="22"
              height="30"
              rx="1"
              fill="#fff"
              opacity="0.4"
            />
            <rect
              x="1303"
              y="785"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1330"
              y="785"
              width="10"
              height="12"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />

            <rect
              x="1360"
              y="730"
              width="40"
              height="170"
              rx="2"
              fill="#022949"
            />
            <rect
              x="1368"
              y="750"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1368"
              y="770"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />
            <rect
              x="1382"
              y="750"
              width="8"
              height="10"
              rx="1"
              fill="#fff"
              opacity="0.5"
            />

            {/* ── WINDMILL — flush right edge ──────────── */}
            {/* Pole */}
            <rect x="1414" y="620" width="6" height="280" fill="#022949" />
            {/* Nacelle */}
            <ellipse cx="1417" cy="618" rx="8" ry="5" fill="#022949" />
            {/* Rotating blades */}
            <g
              className={styles.windmillBlades}
              style={{ transformOrigin: "1417px 618px" }}
            >
              <path d="M1417,618 L1417,568 Q1423,590 1417,618" fill="#022949" />
              <path d="M1417,618 L1460,643 Q1439,650 1417,618" fill="#022949" />
              <path d="M1417,618 L1374,643 Q1395,650 1417,618" fill="#022949" />
            </g>
            {/* Hub center dot */}
            <circle cx="1417" cy="618" r="3" fill="#022949" />

            {/* Ground line */}
            <rect x="0" y="895" width="1440" height="5" fill="#022949" rx="1" />
          </g>

          {/* ── FLOATING PROPERTY ICONS ─────────────────── */}
          {/* House icon — top left */}
          <g
            opacity="0.06"
            transform="translate(120, 120)"
            className={styles.floatIcon1}
          >
            <path
              d="M20,18 L20,30 L8,30 L8,18 Z"
              fill="none"
              stroke="#ff914d"
              strokeWidth="1.5"
            />
            <path
              d="M4,20 L14,10 L24,20"
              fill="none"
              stroke="#ff914d"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="12"
              y="23"
              width="5"
              height="7"
              rx="0.5"
              fill="none"
              stroke="#ff914d"
              strokeWidth="1"
            />
          </g>

          {/* Key icon — top right */}
          <g
            opacity="0.05"
            transform="translate(1280, 100)"
            className={styles.floatIcon2}
          >
            <circle
              cx="10"
              cy="10"
              r="7"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="1.5"
            />
            <line
              x1="17"
              y1="10"
              x2="30"
              y2="10"
              stroke="#0ea5e9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="26"
              y1="10"
              x2="26"
              y2="15"
              stroke="#0ea5e9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="30"
              y1="10"
              x2="30"
              y2="15"
              stroke="#0ea5e9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Location pin — left mid */}
          <g
            opacity="0.05"
            transform="translate(60, 400)"
            className={styles.floatIcon3}
          >
            <path
              d="M14,4 C8.5,4 4,8.5 4,14 C4,22 14,32 14,32 C14,32 24,22 24,14 C24,8.5 19.5,4 14,4 Z"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1.5"
            />
            <circle
              cx="14"
              cy="14"
              r="4"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1.2"
            />
          </g>

          {/* Chart/graph icon — right mid */}
          <g
            opacity="0.05"
            transform="translate(1340, 500)"
            className={styles.floatIcon4}
          >
            <rect
              x="4"
              y="18"
              width="6"
              height="14"
              rx="1"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.3"
            />
            <rect
              x="14"
              y="10"
              width="6"
              height="22"
              rx="1"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.3"
            />
            <rect
              x="24"
              y="4"
              width="6"
              height="28"
              rx="1"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.3"
            />
          </g>

          {/* Shield/check icon — bottom center */}
          <g
            opacity="0.04"
            transform="translate(700, 820)"
            className={styles.floatIcon5}
          >
            <path
              d="M14,4 L4,9 L4,18 C4,24 8,29 14,32 C20,29 24,24 24,18 L24,9 Z"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
            />
            <polyline
              points="9,17 13,21 20,13"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Document icon — bottom left */}
          <g
            opacity="0.04"
            transform="translate(380, 780)"
            className={styles.floatIcon6}
          >
            <path
              d="M8,4 L22,4 L28,10 L28,32 L8,32 Z"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.3"
            />
            <polyline
              points="22,4 22,10 28,10"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.3"
            />
            <line
              x1="12"
              y1="17"
              x2="24"
              y2="17"
              stroke="#ef4444"
              strokeWidth="1"
            />
            <line
              x1="12"
              y1="22"
              x2="24"
              y2="22"
              stroke="#ef4444"
              strokeWidth="1"
            />
            <line
              x1="12"
              y1="27"
              x2="20"
              y2="27"
              stroke="#ef4444"
              strokeWidth="1"
            />
          </g>
          </svg>
        </div>
      }
    >
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={`${styles.header} ${isVisible ? styles.headerVisible : ""}`}
      >
        <SectionLabel text={label} />
        <h2 className={styles.heading}>{heading}</h2>
      </div>

      {/* Desktop: 3-column compact layout */}
      <div className={styles.layout} ref={wrapRef}>
        {/* Left column: 07, 06, 05 */}
        <div className={styles.colLeft}>
          {LEFT_STEPS.map((idx) => (
            <StepCard
              key={steps[idx].number}
              step={steps[idx]}
              index={idx}
              isActive={hovered === idx}
              isDimmed={hovered !== null && hovered !== idx}
              onHover={handleHover}
              cardRef={setCardRef(idx)}
            />
          ))}
        </div>

        {/* Center: SVG ring */}
        <div className={styles.colCenter} ref={ringRef}>
          <CircularRing hovered={hovered} onHover={handleHover} />
        </div>

        {/* Right column: 01, 02, 03, 04 */}
        <div className={styles.colRight}>
          {RIGHT_STEPS.map((idx) => (
            <StepCard
              key={steps[idx].number}
              step={steps[idx]}
              index={idx}
              isActive={hovered === idx}
              isDimmed={hovered !== null && hovered !== idx}
              onHover={handleHover}
              cardRef={setCardRef(idx)}
            />
          ))}
        </div>

        {/* Connector lines overlay */}
        <ConnectorLines
          hovered={hovered}
          cardRefs={cardRefs}
          ringRef={ringRef}
          wrapRef={wrapRef}
        />
      </div>

      {/* Mobile */}
      <div className={styles.mobileList}>
        {steps.map((step, i) => (
          <MobileStepCard key={step.number} step={step} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
