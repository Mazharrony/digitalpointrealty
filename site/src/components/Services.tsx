"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { services, lease } from "@/lib/content";
import { useGsapScope, cineScene, drawIcons } from "@/lib/motion";
import { IconCleaning, IconMaintenance, IconLease, CornerBrackets } from "./Icons";
import CloudBand from "./CloudBand";

const icons = {
  cleaning: IconCleaning,
  maintenance: IconMaintenance,
};

/**
 * Each service is its own pinned cinematic beat, echoing the hero:
 *   0.00–0.38  model fades up and zooms in from small, centred
 *   0.38–0.72  model slides aside to its own edge
 *   0.45–0.80  copy rises into the space the model vacated
 *   0.00–1.00  cloud band and backdrop drift right → left throughout
 */
function ServiceScene({ s }: { s: (typeof services)[number] }) {
  const Icon = icons[s.id as keyof typeof icons];
  const fromLeft = s.side === "left";

  const ref = useGsapScope(({ root }) => {
    drawIcons(root);

    cineScene(root, (tl, q) => {
      tl.fromTo(q("[data-band]"), { xPercent: 0 }, { xPercent: -14, duration: 1 }, 0);

      // Starts partly visible on purpose: a pinned scene that begins at
      // opacity 0 shows a dead, empty frame the moment it pins.
      tl.fromTo(
        q("[data-figure]"),
        { opacity: 0.25, scale: 0.58, xPercent: 0 },
        { opacity: 1, scale: 1, duration: 0.3 },
        0
      ).to(
        q("[data-figure]"),
        { xPercent: fromLeft ? -46 : 46, duration: 0.32 },
        0.34
      );

      tl.fromTo(
        q("[data-copy]"),
        { opacity: 0, y: 44, xPercent: fromLeft ? 10 : -10 },
        { opacity: 1, y: 0, xPercent: 0, duration: 0.32 },
        0.36
      );
    });
  }, []);

  return (
    <article
      ref={ref as React.Ref<HTMLElement>}
      className={`scene-wash relative flex h-[100svh] min-h-[560px] items-center overflow-hidden ${
        s.id === "maintenance" ? "blueprint" : ""
      }`}
      aria-labelledby={`svc-${s.id}`}
    >
      <div data-band className="absolute inset-0" aria-hidden="true">
        <CloudBand className="top-[6%] h-[280px]" opacity={0.35} />
      </div>

      {/* Figure — CSS owns the centring on the wrapper, GSAP owns the inner
          transform. Mixing both on one node makes GSAP wipe the centring. */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[58%] w-[58%] -translate-x-1/2 sm:h-[70%] sm:w-[34%] lg:h-[80%] lg:w-[27%]">
        <div data-figure className="relative h-full w-full origin-bottom">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(50% 42% at 50% 58%, rgba(52,200,232,.16), transparent 72%)",
            }}
          />
          <Image
            src={s.image}
            alt={s.alt}
            fill
            sizes="(max-width: 640px) 58vw, 27vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Copy — lands in the cleared half */}
      <div
        data-copy
        className={`container-dp relative z-10 grid w-full ${
          fromLeft ? "lg:grid-cols-[42%_58%]" : "lg:grid-cols-[58%_42%]"
        }`}
      >
        <div
          className={`rounded-2xl bg-[rgba(255,255,255,.78)] p-7 backdrop-blur-md sm:p-9 ${
            fromLeft ? "lg:col-start-2" : "lg:col-start-1"
          }`}
        >
          <div className="flex items-center gap-4">
            <span
              className="block h-px w-16 bg-[var(--accent-ink)]"
              aria-hidden="true"
            />
            <span className="eyebrow">Service {s.index}</span>
          </div>

          <div className="icon-draw mt-6 text-[var(--accent-ink)]">
            <Icon className="h-10 w-10" />
          </div>

          <h3 id={`svc-${s.id}`} className="h-service mt-4">
            {s.title}
          </h3>
          <p className="font-display mt-3 text-xl leading-snug sm:text-2xl">
            {s.lede}
          </p>
          <p className="measure mt-4 text-sm text-[var(--text-muted)] sm:text-base">
            {s.body}
          </p>

          <ul className="mt-6 space-y-2.5">
            {s.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-[var(--text-muted)]">
                <span
                  className="mt-[.55rem] h-px w-4 shrink-0 bg-[var(--accent-ink)]"
                  aria-hidden="true"
                />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

/**
 * Lease scene — the house returns, zooms, and the feature grid resolves
 * around it. Same grammar, different subject.
 */
function LeaseScene() {
  const ref = useGsapScope(({ root }) => {
    drawIcons(root);

    cineScene(root, (tl, q) => {
      tl.fromTo(
        q("[data-house]"),
        { opacity: 0, scale: 0.5, yPercent: 8 },
        { opacity: 1, scale: 1, yPercent: 0, duration: 0.4 },
        0
      ).to(q("[data-house]"), { scale: 1.12, opacity: 0.22, duration: 0.36 }, 0.44);

      tl.fromTo(
        q("[data-lease-head]"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.28 },
        0.3
      );

      tl.fromTo(
        gsap.utils.toArray<HTMLElement>("[data-lease-card]", root),
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.06 },
        0.52
      );
    });
  }, []);

  return (
    <article
      ref={ref as React.Ref<HTMLElement>}
      className="relative flex h-[100svh] min-h-[600px] items-center overflow-hidden bg-[var(--surface)]"
      aria-labelledby="svc-lease"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(52,200,232,.14), transparent 70%)",
        }}
      />

      {/* House sits behind the content and pushes past the camera */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[70%] -translate-x-1/2 -translate-y-1/2 sm:w-[46%] lg:w-[38%]"
        aria-hidden="true"
      >
        <div data-house className="relative h-full w-full">
          <Image
            src="/assets/house-light.webp"
            alt=""
            fill
            sizes="(max-width: 640px) 70vw, 38vw"
            className="object-contain"
          />
        </div>
      </div>

      <div className="container-dp relative z-10 text-center">
        <div data-lease-head>
          <div className="flex items-center justify-center gap-4">
            <span className="hairline w-16" aria-hidden="true" />
            <span className="eyebrow">Service {lease.index}</span>
            <span className="hairline w-16" aria-hidden="true" />
          </div>

          <div className="icon-draw mt-6 flex justify-center text-[var(--accent-ink)]">
            <IconLease className="h-11 w-11" />
          </div>

          <h3 id="svc-lease" className="h-section mt-4">
            {lease.title}
          </h3>
          <p className="font-display mx-auto mt-4 max-w-3xl text-xl leading-snug sm:text-2xl">
            {lease.lede}
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-px overflow-hidden rounded-lg bg-[var(--hairline)] text-left sm:grid-cols-2">
          {lease.features.map((f) => (
            <li
              key={f.k}
              data-lease-card
              className="group relative bg-[rgba(255,255,255,.9)] p-6 backdrop-blur-sm transition-colors duration-[var(--dur-micro)] hover:bg-[var(--surface-2)]"
            >
              <CornerBrackets className="pointer-events-none absolute inset-3 text-[var(--accent-ink)] opacity-0 transition-opacity duration-[var(--dur-micro)] group-hover:opacity-30" />
              <h4 className="font-display text-lg text-[var(--text)]">{f.k}</h4>
              <p className="mt-1.5 text-sm text-[var(--text-muted)]">{f.v}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Services() {
  const ref = useGsapScope(({ root }) => {
    gsap.from(root.querySelectorAll("[data-intro]"), {
      opacity: 0,
      y: 32,
      duration: 0.9,
      stagger: 0.12,
      ease: "expo.out",
      scrollTrigger: { trigger: root, start: "top 75%", once: true },
    });
  }, []);

  return (
    <section id="services" aria-label="Services">
      <div ref={ref as React.Ref<HTMLDivElement>} className="container-dp py-[clamp(4rem,10vh,8rem)]">
        <p data-intro className="eyebrow">
          What we do
        </p>
        <h2 data-intro className="h-section mt-5 max-w-3xl">
          Three services that only work properly together.
        </h2>
      </div>

      {services.map((s) => (
        <ServiceScene key={s.id} s={s} />
      ))}
      <LeaseScene />
    </section>
  );
}
