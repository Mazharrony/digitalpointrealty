"use client";

import Image from "next/image";
import { cta, contact } from "@/lib/content";
import { useGsapScope, revealChildren, scrubDrift } from "@/lib/motion";

export default function CTA() {
  const ref = useGsapScope(({ root }) => {
    revealChildren(root);
    // the house watermark keeps pushing toward the camera on scroll
    scrubDrift(root, "[data-watermark]", { scale: 1.22, yPercent: -6 });
  }, []);

  const waNumber = contact.whatsapp.replace(/[^\d]/g, "");

  return (
    <section
      id="contact"
      ref={ref as React.Ref<HTMLElement>}
      className="section-y relative overflow-hidden bg-[var(--bg)]"
      aria-label="Contact"
    >
      {/* the hero house returns as a faint watermark */}
      <div
        data-watermark
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.09]"
        aria-hidden="true"
      >
        <div className="relative h-[70%] w-[70%] max-w-2xl">
          <Image
            src="/assets/house-light.webp"
            alt=""
            fill
            sizes="672px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="container-dp relative text-center">
        <h2 className="h-section reveal mx-auto max-w-3xl">{cta.headline}</h2>
        <p className="reveal mx-auto mt-6 max-w-xl text-[var(--text-muted)]">
          {cta.sub}
        </p>

        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--accent)] px-8 text-sm font-semibold text-[var(--text)] transition-transform duration-[var(--dur-micro)] hover:scale-[1.03] active:scale-[0.98]"
          >
            {cta.button}
          </a>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[var(--hairline)] px-8 text-sm transition-colors duration-[var(--dur-micro)] hover:border-[var(--accent-ink)]"
          >
            WhatsApp
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <dl className="reveal mx-auto mt-14 grid max-w-3xl gap-8 border-t border-[var(--hairline)] pt-10 sm:grid-cols-3">
          {[
            { k: "Call", v: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
            { k: "Email", v: contact.email, href: `mailto:${contact.email}` },
            { k: "Office", v: contact.address },
          ].map((row) => (
            <div key={row.k}>
              <dt className="eyebrow">{row.k}</dt>
              <dd className="mt-2 text-sm">
                {row.href ? (
                  <a
                    href={row.href}
                    className="inline-flex min-h-[44px] items-center transition-colors duration-[var(--dur-micro)] hover:text-[var(--accent-ink)]"
                  >
                    {row.v}
                  </a>
                ) : (
                  <span className="inline-flex min-h-[44px] items-center text-[var(--text-muted)]">
                    {row.v}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
