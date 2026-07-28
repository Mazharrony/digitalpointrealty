/**
 * Line-art icon set. Stroke-only, no fill, stroke-width 1.5, round caps,
 * currentColor — so a single set works on any surface and can be stroke-drawn
 * on scroll entry (see useStrokeDraw).
 *
 * Service icons use a 48 viewBox, process icons 36.
 */

type IconProps = { className?: string };

const svg = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── Service icons (48) ───────────────────────────────────────────────────── */

export function IconCleaning({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...svg} aria-hidden="true">
      <path d="M10 42h28" />
      <path d="M14 42V20l10-7 10 7v22" />
      <path d="M20 27h3M28 27h3M20 34h3M28 34h3" />
      {/* shine marks — the "freshly cleaned" signal */}
      <path d="M38 11l1.4 3.6L43 16l-3.6 1.4L38 21l-1.4-3.6L33 16l3.6-1.4z" />
      <path d="M9 13l.9 2.3L12 16l-2.1.7L9 19l-.9-2.3L6 16l2.1-.7z" />
    </svg>
  );
}

export function IconMaintenance({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...svg} aria-hidden="true">
      <circle cx="18" cy="18" r="6" />
      <path d="M18 6v4M18 26v4M6 18h4M26 18h4M9.5 9.5l2.8 2.8M23.7 23.7l2.8 2.8M26.5 9.5l-2.8 2.8M12.3 23.7l-2.8 2.8" />
      <path d="M39 23.5a6 6 0 0 0-7.9 7.9L24 38.5a2.1 2.1 0 0 0 3 3l7.1-7.1a6 6 0 0 0 7.9-7.9l-3.2 3.2-3-3L39 23.5z" />
    </svg>
  );
}

export function IconLease({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...svg} aria-hidden="true">
      <path d="M8 42h22" />
      <path d="M12 42V18l9-6 9 6v24" />
      <path d="M17 23h3M24 23h3M17 30h3M24 30h3" />
      <circle cx="38" cy="16" r="4.5" />
      <path d="M38 20.5V37M34.5 26H38M34.5 31H38" />
    </svg>
  );
}

/* ── Process icons (36) ───────────────────────────────────────────────────── */

export function IconAssess({ className }: IconProps) {
  return (
    <svg viewBox="0 0 36 36" className={className} {...svg} aria-hidden="true">
      <path d="M4 31h16" />
      <path d="M7 31V15l7-5 7 5v16" />
      <circle cx="23" cy="16" r="7" />
      <path d="M28 21l4.5 4.5" />
    </svg>
  );
}

export function IconPlan({ className }: IconProps) {
  return (
    <svg viewBox="0 0 36 36" className={className} {...svg} aria-hidden="true">
      <rect x="8" y="7" width="20" height="25" rx="2" />
      <path d="M14 7V5.5A1.5 1.5 0 0 1 15.5 4h5A1.5 1.5 0 0 1 22 5.5V7" />
      <path d="M13 16l2 2 4-4" />
      <path d="M13 25l2 2 4-4" />
      <path d="M22 16h3M22 25h3" />
    </svg>
  );
}

export function IconExecute({ className }: IconProps) {
  return (
    <svg viewBox="0 0 36 36" className={className} {...svg} aria-hidden="true">
      <path d="M27 8.5a6.5 6.5 0 0 0-8.6 8.6l-8.8 8.8a2.3 2.3 0 0 0 3.2 3.2l8.8-8.8a6.5 6.5 0 0 0 8.6-8.6l-3.5 3.5-3.2-3.2L27 8.5z" />
      {/* motion ticks */}
      <path d="M4 9h5M4 14.5h3" />
    </svg>
  );
}

export function IconMaintain({ className }: IconProps) {
  return (
    <svg viewBox="0 0 36 36" className={className} {...svg} aria-hidden="true">
      <path d="M29 18a11 11 0 1 1-3.2-7.8" />
      <path d="M26.5 4v6.8h-6.8" />
      <path d="M13 18.5l3.5 3.5L24 14.5" />
    </svg>
  );
}

/* ── Decorative ───────────────────────────────────────────────────────────── */

export function ConcentricCircles({ className }: IconProps) {
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true">
      {[140, 108, 76, 44].map((r) => (
        <circle
          key={r}
          cx="150"
          cy="150"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export function CornerBrackets({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      {...svg}
      aria-hidden="true"
    >
      <path d="M0 14V0h14M86 0h14v14M100 86v14H86M14 100H0V86" />
    </svg>
  );
}
