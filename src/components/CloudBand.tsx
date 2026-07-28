"use client";

/**
 * The clouds that dissolved in the hero return here as a continuous
 * right-to-left band behind the next scene. Two identical copies translated
 * -50% make the loop seamless; the strip's own margins are transparent so the
 * join never shows.
 */
export default function CloudBand({
  className = "",
  opacity = 0.55,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="cloud-track">
        {/* Raw <img>: the loop needs intrinsic aspect ratio at h-full/w-auto,
            which next/image's fill mode would override. */}
        {[0, 1].map((i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src="/assets/cloud-strip.webp"
            alt=""
            className="h-full w-auto max-w-none"
          />
        ))}
      </div>
    </div>
  );
}
