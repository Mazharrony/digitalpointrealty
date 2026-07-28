# Digital Point Real Estate — Design System (MASTER)

Global source of truth. Page-level deviations live in `design-system/pages/<page>.md`.

**Pattern:** Immersive / Interactive Experience (scroll-driven cinematic)
**Style:** Bright cinematic — white ground, sky imagery, brand cyan
**Stack:** Next.js 16 App Router · GSAP ScrollTrigger · Lenis · Tailwind v4

---

## 1. Palette

Light ground. Accent derived from the actual logo — sampled brand cyans cluster
at hue 189–196 (`#24C9E9`, `#2CB8D9`, `#1E82A1`, `#18627D`) over navy `#152533`.

> **Critical rule — the accent is split in two.**
> Brand cyan `#34C8E8` measures **1.99:1 on white**. It can never carry text.
> It is a FILL/GRAPHIC colour only. Anything textual uses `--accent-ink`
> `#17708C` (5.63:1). Breaking this split fails WCAG AA immediately.

| Role | Hex | Token | Use |
|---|---|---|---|
| Background | `#FFFFFF` | `--bg` | Page ground |
| Surface | `#F2F6F9` | `--surface` | Section separation |
| Surface raised | `#E8EFF4` | `--surface-2` | Cards, hover states |
| Brand cyan | `#34C8E8` | `--accent` | **Fills/graphics only** |
| Accent ink | `#17708C` | `--accent-ink` | Text, rules, icons, borders |
| Steel | `#1B4B6B` | `--steel` | Structural |
| Text | `#0F1E2B` | `--text` | |
| Text muted | `#5A6B7C` | `--text-muted` | |
| Hairline | `rgba(15,30,43,.12)` | `--hairline` | |

### Verified contrast (WCAG 2.1)

| Pair | Ratio | Result |
|---|---|---|
| `--text` on `--bg` | **16.92:1** | AAA |
| `--steel` on `--bg` | **9.27:1** | AAA |
| `--accent-ink` on `--bg` | **5.63:1** | AA |
| `--text-muted` on `--bg` | **5.48:1** | AA |
| `--text-muted` on `--surface` | **5.05:1** | AA |
| `--text` on `--accent` (button) | **8.52:1** | AAA |
| ~~`--accent` on `--bg`~~ | **1.99:1** | **FAIL — never for text** |

---

## 2. Typography

**Display:** Cormorant Garamond · **Body:** Inter · **Label:** Inter uppercase, `.18em`

| Token | Size |
|---|---|
| `.h-hero` | `clamp(2.1rem, 6.4vw, 5.75rem)`, lh 1 |
| `.h-section` | `clamp(2rem, 4.5vw, 3.75rem)` |
| `.h-service` | `clamp(1.75rem, 2.8vw, 2.75rem)` |
| body | `clamp(1rem, 1.1vw, 1.125rem)`, lh 1.7 |
| `.eyebrow` | `.75rem` |

Body floor is 16px (prevents iOS auto-zoom). Measure capped at 68ch.

---

## 3. Motion — the cinematic system

The whole page is a scroll-driven sequence, not just the hero.

### Pinned scenes (4)
Each pins and scrubs a timeline. Built via `cineScene()` in `src/lib/motion.ts`.

**Hero** (`+=260%`) — beat map t = 0 → 1:

| t | Beat |
|---|---|
| 0.00–1.00 | sky pans right → left (`xPercent -18`) |
| 0.00–0.36 | cloud mass zooms to camera (`scale 2.4`) and dissolves |
| 0.04–0.32 | opening headline lifts and fades with the clouds |
| 0.10–0.40 | house fades up + zooms in, centred |
| 0.42–0.70 | house clears right |
| 0.46–0.74 | model zooms into the vacated centre |
| 0.74–0.98 | model clears left |
| 0.80–0.98 | closing copy card settles in the gap |

House and model are **sequenced, not simultaneous** — running them together
stacked the model behind the house mid-shot.

**Service scenes ×3** (`+=180%` each) — same grammar: figure zooms in centred,
clears to its side, copy rises into the vacated half, cloud band drifts R→L.

### Non-pinned sections
Continuous scroll response via `scrubDrift()` — cloud bands pull left, the
concentric ring counter-rotates, the CTA watermark pushes toward camera.

### Hard rules
- **Never put a Tailwind `translate-*` class on a node GSAP transforms.** GSAP
  overwrites the whole `transform`, silently killing the centring. Wrap it:
  CSS positioning on the outer node, GSAP motion on the inner one.
- Parallax applies to decorative layers only — never body copy or controls.
- Animate `transform` / `opacity` only.
- Figure parting distance is viewport-dependent (`gsap.matchMedia`): desktop
  `-105/+88`, ≤1023px `-120/+105`. A fixed value overlaps the copy on mobile.
- Call `ScrollTrigger.refresh()` after fonts and images load.

### Reduced motion — non-negotiable
Under `prefers-reduced-motion: reduce`: Lenis never initialises, every
`useGsapScope` bails out, all `.reveal` and `.cine-layer` elements render at
their final state, marquees stop, the scroll prompt hides. All content is
server-rendered, so the page is fully readable with zero motion and zero JS.

---

## 4. Spacing & layout

4/8px rhythm. Section rhythm `clamp(6rem, 12vh, 11rem)`.
Container `max-width: 1280px`, gutters `clamp(1.25rem, 5vw, 4rem)`.
Breakpoints **375 / 768 / 1024 / 1440**.

z-index: parallax 0–5 · content 10–20 · header 60 · modal 100.

---

## 5. Components

- **Icons:** SVG, stroke-only, `stroke-width 1.5`, round caps, `currentColor`. No emoji.
- **Primary CTA:** one per screen. Cyan fill, `--text` label.
- **Touch targets:** ≥44×44px, ≥8px apart.
- **Focus:** 2px `--accent-ink` ring, 2px offset. Never removed.
- **Images:** WebP with explicit sizing to hold CLS < 0.1.

---

## 6. Anti-patterns

- **Brand cyan as text on white** (1.99:1) — the single easiest way to break this site.
- Dark/navy page ground (superseded — the direction is bright cinematic).
- Gold accents (superseded).
- Tailwind translate classes on GSAP-animated nodes.
- Parallax on text.
- Scroll effects without a reduced-motion escape.
- Raster or emoji iconography.
