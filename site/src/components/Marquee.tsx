"use client";

import { areas } from "@/lib/content";

/**
 * Infinite horizontal area marquee. The track holds two identical copies and
 * translates -50%, so the loop is seamless. Pauses on hover and on focus
 * within, and collapses to a plain scrollable row under reduced motion.
 */
export default function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center">
      {areas.map((a) => (
        <span key={a} className="flex items-center">
          <span className="font-display whitespace-nowrap px-8 text-3xl text-[var(--text)] opacity-45 sm:text-5xl">
            {a}
          </span>
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-ink)]"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );

  return (
    <section
      className="relative border-y border-[var(--hairline)] bg-[var(--bg)] py-12 sm:py-16"
      aria-label="Areas served across Abu Dhabi"
    >
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track">
          {row}
          <div aria-hidden="true" className="flex shrink-0 items-center">
            {row}
          </div>
        </div>
      </div>
    </section>
  );
}
