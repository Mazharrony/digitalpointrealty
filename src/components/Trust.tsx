"use client";

import { trust } from "@/lib/content";
import { useGsapScope, revealChildren, scrubDrift } from "@/lib/motion";
import CloudBand from "./CloudBand";

export default function Trust() {
  const ref = useGsapScope(({ root }) => {
    revealChildren(root);
    scrubDrift(root, "[data-band]", { xPercent: -16 });
    scrubDrift(root, "[data-glow]", { scale: 1.25 });
  }, []);

  return (
    <section
      ref={ref as React.Ref<HTMLElement>}
      className="section-y relative overflow-hidden bg-[var(--surface)]"
      aria-label="Credentials and testimonials"
    >
      <div data-band className="absolute inset-x-0 top-0 h-[260px]" aria-hidden="true">
        <CloudBand className="inset-y-0" opacity={0.3} />
      </div>

      <div
        data-glow
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 40%, rgba(52,200,232,.16), transparent 72%)",
        }}
      />

      <div className="container-dp relative">
        <p className="eyebrow reveal">{trust.eyebrow}</p>
        <h2 className="h-section reveal mt-5 max-w-2xl">{trust.headline}</h2>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {trust.differentiators.map((d) => (
            <li key={d.k} className="reveal bg-[var(--surface)] p-7">
              <h3 className="font-display text-xl text-[var(--accent-ink)]">{d.k}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{d.v}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {trust.testimonials.map((t) => (
            <figure key={t.attribution} className="reveal">
              <span
                className="font-display block text-5xl leading-none text-[var(--accent-ink)] opacity-40"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="font-display mt-3 text-xl leading-snug text-[var(--text)] sm:text-2xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 text-sm text-[var(--text-muted)]">
                {t.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
