import { COLORS, rgba } from '@/lib/constants';

export function CityscapeSvg() {
  const bFill = rgba(COLORS.primary, 0.10);
  const bFill2 = rgba(COLORS.primary, 0.07);
  const bStroke = rgba(COLORS.primary, 0.08);
  const wOrange = (o: number) => rgba(COLORS.accent, o);
  const wBlue = (o: number) => rgba(COLORS.blue, o);

  // Generate window rows for a building
  const windows = (x: number, startY: number, cols: number, rows: number, colW: number, rowH: number, gap: number) => {
    const els = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isOrange = (r + c) % 3 !== 0;
        const opacity = 0.06 + ((r * cols + c) % 5) * 0.015;
        els.push(
          <rect
            key={`w-${x}-${r}-${c}`}
            x={x + c * (colW + gap)}
            y={startY + r * (rowH + gap + 4)}
            width={colW}
            height={rowH}
            rx={1}
            fill={isOrange ? wOrange(opacity) : wBlue(opacity)}
          />
        );
      }
    }
    return els;
  };

  return (
    <svg viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="skyBldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(2,41,73,0.13)" />
          <stop offset="100%" stopColor="rgba(2,41,73,0.05)" />
        </linearGradient>
        <linearGradient id="skyBldg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(2,41,73,0.08)" />
          <stop offset="100%" stopColor="rgba(2,41,73,0.03)" />
        </linearGradient>
      </defs>

      {/* ── BACK ROW — shorter, transparent ── */}
      <g opacity="0.55">
        {[25, 80, 155, 230, 310, 395, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200, 1280, 1360].map((x, i) => {
          const h = 80 + (i * 17) % 90;
          const w = 28 + (i * 7) % 30;
          return <rect key={`bg-${i}`} x={x} y={300 - h} width={w} height={h} fill="url(#skyBldg2)" rx={1} />;
        })}
      </g>

      {/* ── FRONT ROW — detailed buildings with windows ── */}

      {/* 1. Tall tower with antenna */}
      <rect x="0" y="80" width="48" height="220" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      <rect x="18" y="65" width="12" height="15" fill={bFill} />
      <rect x="22" y="50" width="4" height="15" fill={bFill2} />
      <circle cx="24" cy="47" r="3" fill={wOrange(0.15)} />
      {windows(6, 92, 3, 10, 8, 10, 5)}

      {/* 2. Medium office */}
      <rect x="58" y="140" width="58" height="160" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      <rect x="66" y="125" width="38" height="15" fill={bFill} />
      {windows(65, 150, 4, 7, 8, 10, 4)}

      {/* 3. House with pitched roof */}
      <polygon points="130,195 168,158 206,195" fill={wOrange(0.06)} stroke={bStroke} strokeWidth={0.5} />
      <rect x="136" y="195" width="64" height="105" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      <rect x="158" y="250" width="18" height="50" rx={2} fill={wOrange(0.09)} />
      <circle cx="172" cy="278" r="1.5" fill={wOrange(0.18)} />
      <rect x="142" y="208" width="16" height="14" rx={1} fill={wBlue(0.09)} />
      <rect x="178" y="208" width="16" height="14" rx={1} fill={wBlue(0.07)} />
      <line x1="150" y1="208" x2="150" y2="222" stroke={bStroke} strokeWidth={0.4} />
      <line x1="142" y1="215" x2="158" y2="215" stroke={bStroke} strokeWidth={0.4} />
      <line x1="186" y1="208" x2="186" y2="222" stroke={bStroke} strokeWidth={0.4} />
      <line x1="178" y1="215" x2="194" y2="215" stroke={bStroke} strokeWidth={0.4} />
      <rect x="188" y="162" width="14" height="33" rx={1} fill={bFill2} />

      {/* 4. Skyscraper */}
      <rect x="215" y="40" width="42" height="260" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      <rect x="225" y="25" width="22" height="15" fill={bFill} />
      <rect x="233" y="12" width="6" height="13" fill={bFill2} />
      <circle cx="236" cy="9" r="3" fill={wOrange(0.14)} />
      {windows(222, 52, 3, 12, 8, 9, 4)}

      {/* 5. Wide block */}
      <rect x="270" y="160" width="72" height="140" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      {windows(278, 170, 4, 6, 10, 10, 4)}

      {/* 6. Twin towers */}
      <rect x="358" y="75" width="34" height="225" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      {windows(364, 88, 2, 10, 8, 10, 6)}
      <rect x="398" y="110" width="34" height="190" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      {windows(404, 122, 2, 8, 8, 10, 6)}

      {/* 7. House */}
      <polygon points="445,200 480,165 515,200" fill={wOrange(0.05)} stroke={bStroke} strokeWidth={0.5} />
      <rect x="450" y="200" width="60" height="100" rx={1} fill="url(#skyBldg)" />
      <rect x="470" y="248" width="18" height="52" rx={2} fill={wOrange(0.08)} />
      <rect x="455" y="212" width="14" height="14" rx={1} fill={wBlue(0.08)} />
      <rect x="490" y="212" width="14" height="14" rx={1} fill={wBlue(0.06)} />

      {/* 8. Tall slim */}
      <rect x="530" y="55" width="38" height="245" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      <rect x="540" y="40" width="18" height="15" fill={bFill} />
      {windows(536, 68, 3, 11, 7, 9, 4)}

      {/* 9. Commercial */}
      <rect x="580" y="165" width="68" height="135" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      {windows(588, 175, 4, 5, 10, 12, 4)}

      {/* 10. Tower */}
      <rect x="665" y="85" width="40" height="215" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      {windows(672, 98, 3, 9, 7, 10, 4)}

      {/* 11. Medium */}
      <rect x="718" y="145" width="55" height="155" rx={1} fill="url(#skyBldg)" />
      {windows(725, 158, 3, 6, 10, 12, 4)}

      {/* 12. Tall with top */}
      <rect x="788" y="65" width="36" height="235" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      <rect x="796" y="50" width="20" height="15" fill={bFill} />
      {windows(794, 78, 2, 10, 9, 10, 6)}

      {/* 13. Wide with roof */}
      <rect x="838" y="155" width="65" height="145" rx={1} fill="url(#skyBldg)" />
      <polygon points="838,155 870,128 903,155" fill={wBlue(0.04)} />
      {windows(846, 168, 4, 5, 9, 12, 5)}

      {/* 14. Skyscraper */}
      <rect x="920" y="50" width="38" height="250" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      <rect x="930" y="35" width="18" height="15" fill={bFill} />
      {windows(926, 62, 3, 11, 7, 9, 4)}

      {/* 15. Office */}
      <rect x="975" y="150" width="55" height="150" rx={1} fill="url(#skyBldg)" />
      {windows(982, 162, 3, 6, 10, 12, 4)}

      {/* 16. Tower */}
      <rect x="1045" y="100" width="42" height="200" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      {windows(1052, 112, 3, 8, 8, 10, 4)}

      {/* 17. House */}
      <polygon points="1100,195 1135,160 1170,195" fill={wOrange(0.05)} stroke={bStroke} strokeWidth={0.5} />
      <rect x="1106" y="195" width="58" height="105" rx={1} fill="url(#skyBldg)" />
      <rect x="1126" y="248" width="16" height="52" rx={2} fill={wOrange(0.08)} />
      <rect x="1112" y="208" width="14" height="14" rx={1} fill={wBlue(0.07)} />
      <rect x="1144" y="208" width="14" height="14" rx={1} fill={wBlue(0.08)} />

      {/* 18. Tall */}
      <rect x="1180" y="70" width="36" height="230" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      {windows(1186, 82, 2, 10, 9, 10, 6)}

      {/* 19. Medium */}
      <rect x="1228" y="155" width="52" height="145" rx={1} fill="url(#skyBldg)" />
      {windows(1235, 168, 3, 5, 10, 12, 4)}

      {/* 20. Tower */}
      <rect x="1295" y="90" width="40" height="210" rx={1} fill="url(#skyBldg)" stroke={bStroke} strokeWidth={0.5} />
      {windows(1302, 102, 3, 9, 7, 10, 4)}

      {/* 21. End block */}
      <rect x="1350" y="140" width="55" height="160" rx={1} fill="url(#skyBldg)" />
      {windows(1358, 152, 3, 6, 10, 12, 4)}

      <rect x="1412" y="110" width="28" height="190" rx={1} fill="url(#skyBldg)" />
      {windows(1416, 122, 2, 8, 7, 10, 4)}

      {/* Ground line */}
      <line x1="0" y1="299" x2="1440" y2="299" stroke="rgba(2,41,73,0.1)" strokeWidth={1} />
    </svg>
  );
}
