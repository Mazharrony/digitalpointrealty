"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const EASE = "expo.out";

export function prefersReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Runs a GSAP setup function scoped to a container ref, with automatic
 * cleanup via gsap.context. Skips entirely under reduced motion — callers
 * rely on the CSS in globals.css to render the final state instead.
 */
export function useGsapScope(
  setup: (ctx: { root: HTMLElement }) => void,
  deps: unknown[] = []
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReduced()) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => setup({ root }), root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Pinned cinematic scene: pins the section and scrubs a timeline across it,
 * exactly like the hero. `build` receives the timeline and a scoped query
 * helper so each scene only has to describe its own beats.
 *
 * Deliberate deviation from the "pin 1-2 sections" rule in MASTER.md — the
 * brief is a cinematic scroll experience across the whole page. Kept safe by
 * capping each pin's length and disabling all of it under reduced motion.
 */
export function cineScene(
  root: HTMLElement,
  build: (tl: gsap.core.Timeline, q: (s: string) => Element | null) => void,
  end = "+=180%"
) {
  const q = (s: string) => root.querySelector(s);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
    defaults: { ease: "none" },
  });
  build(tl, q);
  return tl;
}

/**
 * Scroll-linked drift for a decorative layer — no pin, just continuous
 * response through the section. Use for backdrops in non-pinned sections.
 */
export function scrubDrift(
  root: HTMLElement,
  selector: string,
  vars: gsap.TweenVars
) {
  const el = root.querySelector(selector);
  if (!el) return;
  gsap.to(el, {
    ...vars,
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}

/**
 * Staggered fade-up for elements marked .reveal inside a section.
 * Each group animates once when its section enters the viewport.
 */
export function revealChildren(root: HTMLElement, selector = ".reveal") {
  const items = gsap.utils.toArray<HTMLElement>(selector, root);
  if (!items.length) return;

  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: EASE,
    scrollTrigger: {
      trigger: root,
      start: "top 78%",
      once: true,
    },
  });
}

/**
 * Stroke-draws any SVG inside `.icon-draw` when it scrolls into view.
 * Path length is measured at runtime so the dash values always match the
 * geometry rather than a hardcoded guess.
 */
export function drawIcons(root: HTMLElement) {
  gsap.utils.toArray<SVGElement>(".icon-draw", root).forEach((wrap) => {
    const shapes = wrap.querySelectorAll<SVGGeometryElement>(
      "path, circle, rect, line, polyline"
    );
    shapes.forEach((s) => {
      const len = typeof s.getTotalLength === "function" ? s.getTotalLength() : 200;
      gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(s, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
      });
    });
  });
}

/**
 * Counts a number up from 0 when it enters the viewport.
 * Uses a proxy object so the DOM write is a single textContent set per frame.
 */
export function countUp(el: HTMLElement, target: number, suffix = "") {
  const proxy = { v: 0 };
  gsap.to(proxy, {
    v: target,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = Math.round(proxy.v).toLocaleString() + suffix;
    },
    scrollTrigger: { trigger: el, start: "top 85%", once: true },
  });
}
