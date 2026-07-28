"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { brand, nav, contact } from "@/lib/content";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on Escape — modal escape route.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
        solid
          ? "border-b border-[var(--hairline)] bg-[rgba(255,255,255,.86)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-dp flex h-16 items-center justify-between gap-6 sm:h-20">
        <a
          href="#top"
          className="flex items-center gap-3"
          aria-label={`${brand.full} — home`}
        >
          <Image
            src="/assets/logo-mark-dark.webp"
            alt=""
            width={512}
            height={341}
            priority
            className="h-9 w-auto sm:h-10"
            aria-hidden="true"
          />
          <span className="sr-only">{brand.full}</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-[var(--text-muted)] transition-colors duration-[var(--dur-micro)] hover:text-[var(--text)]"
            >
              {n.label}
            </a>
          ))}
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--hairline)] px-5 text-sm transition-colors duration-[var(--dur-micro)] hover:border-[var(--accent-ink)]"
          >
            {contact.phone}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-[var(--text)] transition-transform duration-200 ${
                open ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-px w-6 bg-[var(--text)] transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-[var(--text)] transition-transform duration-200 ${
                open ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-[var(--hairline)] bg-[rgba(255,255,255,.97)] backdrop-blur-md md:hidden"
      >
        <nav className="container-dp flex flex-col py-3" aria-label="Primary mobile">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[52px] items-center border-b border-[var(--hairline)] text-base last:border-b-0"
            >
              {n.label}
            </a>
          ))}
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="flex min-h-[52px] items-center text-base text-[var(--accent-ink)]"
          >
            {contact.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
