"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { hero } from "@/lib/content";
import { useGsapScope, EASE } from "@/lib/motion";

/**
 * Section 01 — pinned cinematic sequence, scrubbed to scroll.
 *
 * Beat map (t = 0 → 1 across the pin):
 *   sky      0.00–1.00  pans right → left, continuous
 *   clouds   0.00–0.42  zoom toward camera (scale 1 → 2.4) and dissolve
 *   house    0.12–0.55  fades up + zooms in from small, centred
 *            0.55–1.00  slides to the right side
 *   model    0.22–0.62  fades up + zooms in from small, centred
 *            0.62–1.00  slides to the left side
 *   headline 0.00–0.30  present over the clouds, then lifts away
 *   endline  0.62–0.85  settles into the cleared centre
 *
 * The effect is flying through cloud cover and having the scene resolve into
 * house-right / model-left with the copy between them.
 */
export default function Hero() {
  const ref = useGsapScope(({ root }) => {
    const q = (sel: string) => root.querySelector(sel);

    // How far the two figures part depends on viewport: they're proportionally
    // much wider on mobile, so a fixed xPercent either overlaps the copy card
    // or throws them off-screen.
    const mm = gsap.matchMedia();
    const partition = { model: -105, house: 88 };
    mm.add("(max-width: 1023px)", () => {
      // Narrow viewports need a bigger push — the figures occupy far more of
      // the width, so they'd otherwise sit under the copy card.
      partition.model = -120;
      partition.house = 105;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=260%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
      defaults: { ease: "none" },
    });

    // Sky: right → left the whole way.
    tl.fromTo(q("[data-sky]"), { xPercent: 0 }, { xPercent: -18, duration: 1 }, 0);

    // Clouds: fly through them.
    tl.fromTo(
      q("[data-clouds]"),
      { scale: 1, opacity: 1 },
      { scale: 2.4, opacity: 0, duration: 0.36 },
      0
    );

    // Opening headline rides the clouds out.
    tl.fromTo(
      q("[data-open-copy]"),
      { opacity: 1, y: 0 },
      { opacity: 0, y: -70, duration: 0.28 },
      0.04
    );

    // House arrives first and clears to the right BEFORE the model zooms in.
    // Running them together stacked the model behind the house mid-sequence.
    tl.fromTo(
      q("[data-house]"),
      { opacity: 0, scale: 0.4, xPercent: 0 },
      { opacity: 1, scale: 1, duration: 0.3 },
      0.1
    ).to(q("[data-house]"), { xPercent: partition.house, duration: 0.28 }, 0.42);

    // Model zooms into the centre the house just vacated, then clears left.
    tl.fromTo(
      q("[data-model]"),
      { opacity: 0, scale: 0.4, xPercent: 0 },
      { opacity: 1, scale: 1, duration: 0.28 },
      0.46
    ).to(q("[data-model]"), { xPercent: partition.model, duration: 0.24 }, 0.74);

    // Closing copy settles into the cleared centre.
    tl.fromTo(
      q("[data-end-copy]"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.18 },
      0.8
    );

    tl.to(q("[data-scroll-prompt]"), { opacity: 0, duration: 0.12 }, 0);

    // Load-in for the opening headline, independent of scroll.
    gsap.from(root.querySelectorAll("[data-hero-line]"), {
      yPercent: 110,
      duration: 1.25,
      stagger: 0.1,
      ease: EASE,
    });
    gsap.from(root.querySelectorAll("[data-hero-fade]"), {
      opacity: 0,
      y: 22,
      duration: 1,
      delay: 0.5,
      stagger: 0.12,
      ease: EASE,
    });
  }, []);

  return (
    <section
      ref={ref as React.Ref<HTMLElement>}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[var(--bg)]"
      aria-label="Introduction"
    >
      {/* Sky — 3000px wide, mirror-tiled, pans right to left */}
      <div
        data-sky
        className="cine-layer absolute inset-y-0 -left-[10%] w-[130%]"
        aria-hidden="true"
      >
        <Image
          src="/assets/sky-light.webp"
          alt=""
          fill
          priority
          sizes="130vw"
          className="object-cover object-center"
        />
      </div>

      {/* House — appears, zooms, then moves right.
          Wrapper holds the CSS centring; GSAP only ever touches the inner
          node, otherwise it would overwrite the -translate-x-1/2. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42%] w-[72%] -translate-x-1/2 -translate-y-1/2 sm:h-[54%] sm:w-[46%] lg:h-[62%] lg:w-[38%]">
        <div data-house className="cine-layer relative h-full w-full opacity-0">
          <Image
            src="/assets/house-light.webp"
            alt="A modern multi-storey residential building"
            fill
            priority
            sizes="(max-width: 640px) 72vw, 38vw"
            className="object-contain drop-shadow-[0_30px_60px_rgba(15,30,43,.18)]"
          />
        </div>
      </div>

      {/* Model — appears, zooms, then moves left */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[52%] w-[52%] -translate-x-1/2 sm:h-[64%] sm:w-[32%] lg:h-[74%] lg:w-[26%]">
        <div data-model className="cine-layer relative h-full w-full origin-bottom opacity-0">
          <Image
            src="/assets/model-plumber.webp"
            alt="Digital Point maintenance technician in a high-visibility vest and hard hat"
            fill
            sizes="(max-width: 640px) 52vw, 26vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Cloud mass — camera flies through it */}
      <div
        data-clouds
        className="cine-layer pointer-events-none absolute inset-0 origin-center"
        aria-hidden="true"
      >
        <Image
          src="/assets/cloud-mass.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-125 object-cover"
        />
      </div>

      {/* Opening copy — sits above the clouds, exits with them */}
      <div
        data-open-copy
        className="container-dp absolute inset-0 z-20 flex flex-col justify-center"
      >
        <div className="max-w-[52rem]">
          <h1 className="h-hero">
            {hero.headline.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-hero-fade
            className="measure mt-7 text-base text-[var(--text-muted)] sm:text-lg"
          >
            {hero.sub}
          </p>
        </div>
      </div>

      {/* Closing copy — lands in the gap between model and house */}
      <div
        data-end-copy
        className="container-dp pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center opacity-0"
      >
        <div className="pointer-events-auto max-w-sm rounded-2xl bg-[rgba(255,255,255,.9)] px-7 py-8 shadow-[0_18px_50px_rgba(15,30,43,.12)] backdrop-blur-md">
          <p className="eyebrow">{hero.endEyebrow}</p>
          <p className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
            {hero.endLine}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex min-h-[48px] items-center rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-[var(--text)] transition-transform duration-[var(--dur-micro)] hover:scale-[1.03] active:scale-[0.98]"
            >
              {hero.cta}
            </a>
            <a
              href="#services"
              className="inline-flex min-h-[48px] items-center rounded-full border border-[var(--hairline)] px-7 text-sm text-[var(--text)] transition-colors duration-[var(--dur-micro)] hover:border-[var(--accent-ink)]"
            >
              See what we do
            </a>
          </div>
        </div>
      </div>

      {/* Scroll prompt */}
      <div
        data-scroll-prompt
        className="scroll-prompt absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          {hero.scrollPrompt}
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-[var(--hairline)]">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollLine_2s_ease-in-out_infinite] bg-[var(--accent-ink)]" />
        </span>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
