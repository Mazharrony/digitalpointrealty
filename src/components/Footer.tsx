import Image from "next/image";
import { brand, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--bg)]">
      <div className="container-dp flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/logo-mark-dark.webp"
            alt=""
            width={512}
            height={341}
            className="h-9 w-auto"
            aria-hidden="true"
          />
          <p className="text-sm text-[var(--text-muted)]">
            {brand.full}
            <span className="mt-1 block text-xs">{brand.tagline}</span>
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="inline-flex min-h-[44px] items-center text-sm text-[var(--text-muted)] transition-colors duration-[var(--dur-micro)] hover:text-[var(--text)]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-dp border-t border-[var(--hairline)] py-6">
        <p className="text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} {brand.full}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
