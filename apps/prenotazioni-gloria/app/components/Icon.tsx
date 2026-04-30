import { SVGProps } from "react";

/**
 * Set di icone SVG line-art per Salone Gloria.
 * Stile editoriale: stroke 1.25px, niente fill, niente emoji.
 */

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export function Scissors({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

export function Sparkle({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="M5.6 5.6l2.1 2.1" />
      <path d="M16.3 16.3l2.1 2.1" />
      <path d="M5.6 18.4l2.1-2.1" />
      <path d="M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function Diamond({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M6 3h12l3 6-9 12L3 9z" />
      <path d="M3 9h18" />
      <path d="M9 3l3 6 3-6" />
      <path d="M9 9l3 12 3-12" />
    </svg>
  );
}

export function Leaf({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M21 4c-2 11-9 16-17 16 0-9 5-15 17-16z" />
      <path d="M4 20c4-7 9-11 16-13" />
    </svg>
  );
}

export function Clock({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function MapPin({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M12 21s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="8" r="2.5" />
    </svg>
  );
}

export function Phone({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M5 3.5h3l1.5 4.5-2 1.5a13 13 0 0 0 7 7l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2c-9 0-16-7-16-16a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function Mail({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  );
}

export function Check({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function ArrowRight({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

export function ArrowLeft({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="11 6 5 12 11 18" />
    </svg>
  );
}

export function Calendar({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 9h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  );
}

export function User({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.5 3.5-8 8-8s8 3.5 8 8" />
    </svg>
  );
}

export function Star({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <polygon points="12 2.5 14.7 9 21.5 9.5 16.5 14 18 20.5 12 17 6 20.5 7.5 14 2.5 9.5 9.3 9" />
    </svg>
  );
}

export function Instagram({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Whatsapp({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M3 21l1.6-5A8.5 8.5 0 1 1 8 19.5L3 21z" />
      <path d="M9 9.5c0.3 1.5 1.7 3 3.5 4 1.5 0.7 2.5 0.5 3 0v-1l-1.5-1c-0.3 0-0.7 0.5-1 0.5-0.5 0-1.5-0.5-2.5-2 0-0.5 0.5-0.5 0.5-1l-0.5-1.5h-1c-0.5 0.5-0.5 1-0.5 2z" />
    </svg>
  );
}

/**
 * Ornamento decorativo: due piccoli rombi separati da una linea.
 * Si usa come divider tra sezioni o sotto i titoli.
 */
export function Ornament({ size = 80, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size / 4}
      viewBox="0 0 80 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      {...props}
    >
      <line x1="0" y1="10" x2="32" y2="10" />
      <path d="M40 5 l4 5 l-4 5 l-4 -5 z" />
      <line x1="48" y1="10" x2="80" y2="10" />
    </svg>
  );
}

/**
 * Monogram ornamentale "SG" — uso decorativo nel hero
 * e nelle pagine di conferma. Disegnato a mano in SVG.
 */
export function MonogramSG({ size = 120, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.8}
      {...props}
    >
      <circle cx="60" cy="60" r="55" />
      <circle cx="60" cy="60" r="48" opacity="0.4" />
      <text
        x="60"
        y="76"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="56"
        fontWeight="500"
        fontStyle="italic"
        fill="currentColor"
        stroke="none"
        letterSpacing="-2"
      >
        SG
      </text>
    </svg>
  );
}

/**
 * Mappa decorativa stilizzata di Chiaia (non geograficamente esatta).
 * Si usa nella sezione contatti come "tocco editoriale" al posto
 * di una vera mappa interattiva.
 */
export function ChiaiaMap({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 280"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.8}
      {...props}
    >
      {/* linee strade */}
      <path d="M0 80 Q 100 60, 200 90 T 400 70" opacity="0.4" />
      <path d="M0 140 Q 120 130, 240 150 T 400 130" opacity="0.4" />
      <path d="M0 200 Q 90 195, 180 210 T 400 200" opacity="0.4" />
      <path d="M70 0 Q 90 100, 110 280" opacity="0.3" />
      <path d="M180 0 Q 200 100, 220 280" opacity="0.3" />
      <path d="M290 0 Q 310 100, 330 280" opacity="0.3" />
      {/* mare */}
      <path
        d="M0 240 Q 50 230, 100 245 T 200 245 T 300 240 T 400 250 L 400 280 L 0 280 Z"
        fill="currentColor"
        fillOpacity="0.04"
        stroke="none"
      />
      <path
        d="M0 240 Q 50 230, 100 245 T 200 245 T 300 240 T 400 250"
        opacity="0.5"
      />
      <text
        x="350"
        y="265"
        fontSize="9"
        fontFamily="Inter, sans-serif"
        letterSpacing="2"
        fill="currentColor"
        stroke="none"
        opacity="0.4"
      >
        TIRRENO
      </text>
      {/* pin Salone Gloria */}
      <g transform="translate(200 130)">
        <circle r="20" fill="currentColor" fillOpacity="0.08" stroke="none" />
        <circle r="12" fill="currentColor" fillOpacity="0.12" stroke="none" />
        <circle r="4" fill="currentColor" stroke="none" />
        <text
          x="0"
          y="-28"
          fontSize="10"
          fontFamily="Cormorant Garamond, serif"
          fontStyle="italic"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
        >
          Salone Gloria
        </text>
        <text
          x="0"
          y="36"
          fontSize="8"
          fontFamily="Inter, sans-serif"
          letterSpacing="2"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          opacity="0.6"
        >
          VIA DEI MILLE
        </text>
      </g>
    </svg>
  );
}
