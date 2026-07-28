"use client";

import { gsap } from "gsap";
import { process } from "@/lib/content";
import { useGsapScope, revealChildren, drawIcons } from "@/lib/motion";
import { IconAssess, IconPlan, IconExecute, IconMaintain } from "./Icons";

const stepIcons = [IconAssess, IconPlan, IconExecute, IconMaintain];

export default function Process() {
  const ref = useGsapScope(({ root }) => {
    revealChildren(root);
    drawIcons(root);

    // The connecting line is scrubbed to scroll position, so it literally
    // draws itself as the user moves through the section.
    gsap.fromTo(
      root.querySelector("[data-line]"),
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 68%",
          end: "bottom 72%",
          scrub: 0.6,
        },
      }
    );

    // Each step lights up as the line reaches it.
    gsap.utils.toArray<HTMLElement>("[data-step]", root).forEach((step, i) => {
      gsap.fromTo(
        step,
        { opacity: 0.35 },
        {
          opacity: 1,
          duration: 0.4,
          scrollTrigger: {
            trigger: root,
            start: `top+=${i * 12}% 60%`,
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="process"
      ref={ref as React.Ref<HTMLElement>}
      className="section-y relative bg-[var(--bg)]"
      aria-label="How it works"
    >
      <div className="container-dp">
        <p className="eyebrow reveal">How it works</p>
        <h2 className="h-section reveal mt-5 max-w-2xl">
          Four steps, and you stop chasing vendors.
        </h2>

        <div className="relative mt-16">
          {/* connecting rail */}
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-[var(--hairline)] lg:block"
            aria-hidden="true"
          />
          <div
            data-line
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-[var(--accent-ink)] lg:block"
            aria-hidden="true"
          />

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {process.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <li key={step.n} data-step className="relative lg:pr-6">
                  <span
                    className="relative z-10 mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--bg)] text-[var(--accent-ink)] lg:-mt-6"
                    aria-hidden="true"
                  >
                    <span className="icon-draw">
                      <Icon className="h-6 w-6" />
                    </span>
                  </span>
                  <span className="font-display text-sm text-[var(--accent-ink)]">
                    {step.n}
                  </span>
                  <h3 className="font-display mt-2 text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm text-[var(--text-muted)]">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
