"use client";

import { useRef } from "react";
import { about } from "@/lib/content";
import { useGsapScope, revealChildren, countUp, scrubDrift } from "@/lib/motion";
import { ConcentricCircles } from "./Icons";
import CloudBand from "./CloudBand";

export default function About() {
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const ref = useGsapScope(({ root }) => {
    revealChildren(root);
    statRefs.current.forEach((el, i) => {
      if (el) countUp(el, about.stats[i].value, about.stats[i].suffix);
    });
    // continuous scroll response: the band pulls left, the ring counter-rotates
    scrubDrift(root, "[data-band]", { xPercent: -12 });
    scrubDrift(root, "[data-ring]", { rotate: 34, yPercent: -18 });
    scrubDrift(root, "[data-stats]", { yPercent: -10 });
  }, []);

  return (
    <section
      id="about"
      ref={ref as React.Ref<HTMLElement>}
      className="section-y relative overflow-hidden bg-[var(--bg)]"
    >
      {/* the hero's clouds, returning as a right-to-left band */}
      <div data-band className="absolute inset-x-0 top-0 h-[320px]" aria-hidden="true">
        <CloudBand className="inset-y-0" opacity={0.5} />
      </div>

      <div
        data-ring
        className="pointer-events-none absolute -right-24 top-12 hidden w-[420px] lg:block"
        aria-hidden="true"
      >
        <ConcentricCircles className="w-full text-[var(--accent-ink)] opacity-25" />
      </div>

      <div className="container-dp relative grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
        <div>
          <p className="eyebrow reveal">{about.eyebrow}</p>
          <h2 className="h-section reveal mt-5">{about.headline}</h2>
          {about.body.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="measure reveal mt-6 text-[var(--text-muted)]"
            >
              {p}
            </p>
          ))}
        </div>

        <dl data-stats className="flex flex-col gap-8 lg:pt-4">
          {about.stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal border-l-2 border-[var(--accent-ink)] pl-6"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span
                  ref={(el) => {
                    statRefs.current[i] = el;
                  }}
                  className="font-display block text-5xl leading-none tabular-nums text-[var(--text)] sm:text-6xl"
                >
                  {/* Rendered server-side as the final value so the figure is
                      present without JS and under reduced motion. */}
                  {s.value.toLocaleString()}
                  {s.suffix}
                </span>
                <span className="mt-3 block text-sm text-[var(--text-muted)]">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
