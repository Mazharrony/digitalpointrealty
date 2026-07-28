"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Wires Lenis momentum scrolling into GSAP's ticker so ScrollTrigger stays in
 * sync with the virtual scroll position.
 *
 * Under prefers-reduced-motion this bails out entirely: no Lenis, no ticker
 * hijack, native scroll only. Section components make the same check and skip
 * their ScrollTriggers, so the page renders fully static and readable.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Dev-only handle. Lenis owns the scroll target, so window.scrollTo gets
    // lerped away — this makes the instance drivable from the console.
    if (process.env.NODE_ENV === "development") {
      Object.assign(window, { lenis, gsap, ScrollTrigger });
    }

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links must go through Lenis or they fight the virtual scroll.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    // Images and webfonts change layout height; ScrollTrigger must re-measure
    // or every start/end position computed before load is wrong.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
