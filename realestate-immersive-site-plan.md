# [BRAND] — Immersive Site Plan
### Buildings Cleaning · Maintenance · Lease & Management
### Dark Cinematic Direction — Scroll-Driven Experience

---

## EXISTING ASSETS — PARALLAX LAYER MAPPING

You have 6 transparent PNGs. Here's exactly how each one works in the parallax system:

```
HERO SCENE — 5 LAYERS STACKED

╔═══════════════════════════════════════════════════════╗
║                                                       ║
║  Layer 5 (BACK) — Sky PNG                            ║
║  ├── Scroll speed: 0.05x (barely moves)              ║
║  ├── Position: full viewport cover                   ║
║  ├── Treatment: darken significantly, add navy        ║
║  │   overlay to match dark palette                   ║
║  └── This is your base environment                   ║
║                                                       ║
║  Layer 4 — Clouds PNG                                ║
║  ├── Scroll speed: 0.1x vertical                     ║
║  ├── ALSO: infinite horizontal drift (CSS loop)      ║
║  ├── Position: upper 60% of viewport                 ║
║  ├── Treatment: reduce opacity to 15-25%,            ║
║  │   tint warm/golden                                ║
║  └── Duplicate side-by-side for seamless loop        ║
║                                                       ║
║  Layer 3 — House PNG                                 ║
║  ├── Scroll speed: 0.2x                              ║
║  ├── Position: center-right, vertically centered     ║
║  ├── Scale: roughly 50-60% of viewport height        ║
║  ├── Treatment: subtle warm color grade, slight      ║
║  │   drop shadow to separate from sky                ║
║  └── This is your ANCHOR — the thing people see      ║
║                                                       ║
║  Layer 2 — Worker PNG (use Cleaner or composite)     ║
║  ├── Scroll speed: 0.35x                             ║
║  ├── Position: lower-left or lower-center            ║
║  ├── Scale: smaller than house, foreground depth     ║
║  ├── Treatment: slightly brighter than background    ║
║  │   to pop forward                                  ║
║  └── Creates the "someone is here" human presence    ║
║                                                       ║
║  Layer 1 (FRONT) — Atmospheric overlay               ║
║  ├── Scroll speed: 0.5x (moves fastest)              ║
║  ├── Golden particles / bokeh / light dust           ║
║  ├── Very low opacity (5-10%)                        ║
║  └── NEW ASSET NEEDED (see section below)            ║
║                                                       ║
║  TEXT LAYER — sits above all images                   ║
║  ├── Scroll speed: 0.25x (lifts and fades on scroll) ║
║  ├── Headline + subtitle + scroll prompt             ║
║  └── z-index highest                                 ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

**The remaining worker PNGs (Plumber, Electrician)** are used in their respective service sections — not the hero. Each service section gets its own mini-parallax scene with the relevant worker.

---

## SITE ARCHITECTURE — SECTION BY SECTION

### Section 01 — HERO
**Scroll position: 0vh → 100vh**

- Full viewport, parallax scene described above
- House sits center-right, worker lower-left
- Headline left-aligned: large serif, two lines
- Suggested copy: "We don't just maintain buildings — we protect what they're worth."
- Below headline: a single-line descriptor and a CTA button
- Clouds drift continuously left-to-right
- "Scroll to explore" prompt at the bottom with animated gold line
- Gold horizontal line at the very bottom edge separating hero from next section

**On scroll (0–100vh):**
- Each layer moves at its assigned speed (sky barely moves, atmospheric overlay moves fastest)
- Headline fades out and lifts upward (opacity 1→0, translateY 0→-60px)
- "Scroll to explore" fades out by 20vh
- The overall effect: the scene separates into depth as you scroll through it

---

### Section 02 — ABOUT / POSITIONING
**Scroll position: 100vh → 200vh**

- Dark background (#0A0E17), no parallax
- Split layout: left side has eyebrow label + large headline + body text
- Right side has 3 vertical stats with gold left-border accent
- Stats: years of operation, buildings managed, team size (or similar)
- Everything scroll-reveals with staggered fade-up animation

**Suggested copy direction:**
- Eyebrow: "Est. [year] — Dubai"
- Headline: "Three disciplines. One standard."
- Body: Something about how cleaning, maintenance, and lease management are interconnected — when one is done well, the others improve. Position the company as the single point of accountability.

**On scroll entry:**
- Eyebrow label fades up first (0s delay)
- Headline fades up (0.15s delay)
- Body text fades up (0.3s delay)
- Stats fade up sequentially (0.15s between each)
- Stats numbers count up from 0 to target value

---

### Section 03 — SERVICES (The Core)
**Scroll position: 200vh → 500vh**

This is the longest section — each service gets its own scroll "scene."

#### Service 03a — Buildings Cleaning
**Scroll position: 200vh → 300vh**

- Dark background with subtle gradient shift (slightly warmer)
- Left side: Cleaner PNG with mini-parallax (slight float/drift)
- Right side: Service title + description + bullet highlights
- A subtle before/after visual element if possible (split image of a dirty vs clean surface)
- Gold accent line above the title

**Suggested copy direction:**
- Title: "Buildings Cleaning"
- Angle: Not "we mop floors" — position it as asset preservation. A clean building retains tenants, commands higher rents, passes inspections. Frame cleaning as a business decision, not a chore.

**On scroll entry:**
- Cleaner PNG slides in from left (translateX -100px → 0, opacity 0→1)
- Text content fades up from right with stagger
- A golden line draws itself horizontally above the title (stroke-dasharray animation)

#### Service 03b — Buildings Maintenance
**Scroll position: 300vh → 400vh**

- Layout flips: Worker PNG (Plumber or Electrician) on the RIGHT
- Text content on the LEFT
- Background: same dark base, but with a subtle blueprint/grid pattern overlay at very low opacity (2-3%) — ties to the technical nature of maintenance

**Suggested copy direction:**
- Title: "Buildings Maintenance"
- Angle: Preventive, not reactive. Your team catches the problem before the tenant calls. Frame it as risk reduction and cost savings, not fixing things.

**On scroll entry:**
- Mirror of the cleaning section — worker slides in from right
- Text fades up from left
- The blueprint grid overlay fades in subtly with the section

#### Service 03c — Real Estate Lease & Management
**Scroll position: 400vh → 500vh**

- Layout: centered or full-width, more editorial feel
- No worker PNG here — instead, use the House PNG again but smaller, or a new asset (building exterior, contract, keys)
- This section should feel elevated — it's the most "business" of the three services
- Consider a horizontal scrolling row of property types or management features

**Suggested copy direction:**
- Title: "Lease & Management"
- Angle: Occupancy, yield, tenant quality. You don't just find tenants — you find the right tenants and keep them. Frame it as revenue optimization.

**On scroll entry:**
- Content reveals center-out or with a slow fade
- If using property cards, they slide in horizontally with stagger

---

### Section 04 — PROCESS / HOW IT WORKS
**Scroll position: 500vh → 600vh**

- A horizontal timeline or step-by-step flow
- 3–4 steps: Assess → Plan → Execute → Maintain (or similar)
- Each step has a short description and a simple icon
- Connected by a gold line that draws itself as you scroll
- Dark background, the gold line is the visual anchor

**On scroll:**
- The connecting gold line animates from left to right as user scrolls through the section
- Each step's icon and text reveal as the line reaches them
- This is the HeronCode-style scroll-driven sequence but simpler and more restrained

---

### Section 05 — TRUST / CREDENTIALS
**Scroll position: 600vh → 700vh**

- Client logos or certification badges (if available)
- 2–3 testimonial quotes (short, punchy)
- Key differentiators in a grid: licensed, insured, 24/7, etc.
- Dark background with subtle radial gradient (warm center glow)

---

### Section 06 — CITY MARQUEE
**Scroll position: 700vh → 760vh**

- Infinite horizontal scroll of Dubai area names or building types served
- "Dubai Marina · Business Bay · Downtown · JLT · DIFC · Palm Jumeirah · JBR · Al Barsha · Silicon Oasis · Motor City · Arabian Ranches"
- Serif typeface, large, low opacity, gold dots between items
- Edge fade (gradient masks left and right)
- Pauses on hover

---

### Section 07 — CTA / CONTACT
**Scroll position: 760vh → 860vh**

- Large centered headline: "Your building deserves better."
- Subtitle with value prop
- CTA button: "Request a Quote" or "Book an Assessment"
- The compass rose or house silhouette from the hero returns here as a faint background watermark
- Contact details: phone, email, WhatsApp (important for Dubai market)

---

### Section 08 — FOOTER
- Minimal: brand, copyright, legal links, social icons
- Gold top border line
- Dark background matching the rest

---

## ADDITIONAL ASSETS NEEDED

Everything below is what you DON'T have yet and need to produce or source.

### A. ATMOSPHERIC OVERLAY (Hero Layer 1)

**Prompt:**
> Scattered golden bokeh / light dust particles on a transparent background. Soft, out-of-focus warm light spots of varying sizes (2px to 30px diameter). Irregularly distributed across a wide canvas. The particles should feel like dust caught in a beam of warm sunlight, or city lights seen through a window at night. PNG with transparency, 3000px × 2000px minimum. Gold and warm amber tones only.

**AI prompt:**
> golden bokeh particles transparent background, warm light dust floating, scattered soft circles, various sizes, amber gold tones, no background, isolated particles, high resolution

---

### B. BLUEPRINT / GRID TEXTURE (Maintenance Section Background)

**Prompt:**
> A subtle technical blueprint grid pattern — thin lines forming a grid with occasional technical markings (dimension lines, small crosses, reference points). The style should reference architectural or engineering drawings. White or light gold lines on transparent background. Very fine stroke weight (0.3–0.5px). Tileable in both directions. 800×800px, PNG with transparency. Will be used at 2–3% opacity over a dark background.

**AI prompt:**
> seamless tileable architectural blueprint grid pattern, thin white lines, technical drawing style, dimension markings, transparent background, minimal, 800x800, fine lines

---

### C. SERVICE DETAIL PHOTOS (4 Images)

These sit alongside the worker PNGs in the service sections — they show the RESULT of the work, not the workers.

#### Photo C1 — Clean Building Lobby

> A pristine modern building lobby — polished marble or tile floor reflecting overhead lighting. The space is empty of people. Warm ambient lighting, clean lines, glass and stone surfaces. Everything gleams. The camera is low, almost floor level, looking across the polished surface. Dark and warm color grade. Mood: perfection, pride in the space.

#### Photo C2 — Maintenance Close-Up

> Close-up of hands working on an electrical panel or plumbing fitting — professional, gloved hands with tools. Shallow depth of field, warm side-lighting. The focus is on precision and skill, not grime. Clean composition, dark background falls off behind the work area. Mood: expertise, craft, reliability.

#### Photo C3 — Building Exterior at Dusk

> A modern residential or commercial building photographed from street level at blue hour. The building's windows glow warm amber against a deep blue sky. Clean facade, well-maintained landscaping visible at the base. The building looks cared-for, inviting. No people. Mood: pride of ownership, value, curb appeal.

#### Photo C4 — Keys / Handover Moment

> A set of keys (modern key fob or traditional keys on a leather keyring) placed on a dark polished surface — a desk or countertop. Warm overhead light catches the metal. Shallow depth of field. A blurred document or folder visible in the background. Mood: access, trust, transaction. This is for the Lease & Management section.

**Color grading spec (same as Aureum brief):**
> Shadows: lifted warm (deep navy, not pure black). Highlights: golden amber. Midtones: desaturated. Overall: dark and warm. Not bright, not cold.

---

### D. SERVICE ICONS (3 Icons)

Line-art SVGs, animated stroke-draw on scroll entry.

#### Icon D1 — Buildings Cleaning
> A simplified building outline with sparkle/shine marks at the top corners — suggesting a freshly cleaned surface. Or: a squeegee against a window pane. Single continuous stroke path, 1.5px weight, no fill. Minimal geometric style. 48×48 viewBox.

#### Icon D2 — Buildings Maintenance
> A wrench and gear, or a small building with a wrench symbol overlaid. Mechanical, precise. Single stroke path. 48×48 viewBox.

#### Icon D3 — Lease & Management
> A key combined with a building outline, or a document/clipboard with a small building icon. Suggests oversight, access, documentation. Single stroke path. 48×48 viewBox.

**Delivery spec:** SVG, stroke only, no fill, stroke-width 1.5, stroke-linecap round, color #C6A55A (gold). If animated, deliver as Lottie JSON with 1.5s draw-on easing.

---

### E. PROCESS ICONS (4 Small Icons)

For the "How It Works" timeline section.

#### Icon E1 — Assess
> A magnifying glass over a building outline. Simple, geometric.

#### Icon E2 — Plan
> A clipboard or document with checklist marks.

#### Icon E3 — Execute
> A tool (wrench or paint roller) in motion — a small action line suggesting movement.

#### Icon E4 — Maintain
> A circular arrow (refresh/cycle) around a shield or checkmark. Suggests ongoing, recurring, protected.

**Delivery spec:** Same as service icons — SVG, 36×36 viewBox, stroke only, gold.

---

### F. DECORATIVE GEOMETRIC ELEMENTS

Same concept as the Aureum brief. You need 5–6 floating background elements:

1. **Concentric circles** — 4 thin gold circles, nested, SVG 300×300
2. **Grid dot pattern** — 8×8 regular dot grid, small (3px dots), SVG, used behind sections at low opacity
3. **Diagonal line texture** — parallel 45° lines, tileable, SVG 400×400
4. **Cross marks** — 5–6 small + symbols scattered irregularly, SVG
5. **Horizontal divider line** — full-width gold line with gradient fade on edges
6. **Corner bracket marks** — L-shaped brackets that frame content blocks (like viewfinder corners), SVG

---

### G. FILM GRAIN OVERLAY

> 500×500px tileable monochromatic film grain. Fine organic noise on transparent or 50% grey background. Will be applied at 3–5% opacity site-wide via CSS.

---

### H. DISPLAY TYPEFACE

Same recommendations as Aureum brief — license a premium serif:
- **Canela** (warm, elegant)
- **GT Sectra** (authoritative)
- **Freight Display Pro** (classic, safe, premium)

For a property services company, **GT Sectra** might be the strongest pick — it reads as institutional and trustworthy without being cold.

---

## EXISTING ASSET PREPARATION

Your current PNGs need some work before they're parallax-ready:

### Sky PNG
- **Darken it significantly** — it needs to sit at the back of a dark-themed site. Apply a navy-black overlay (multiply blend, or just desaturate and darken in Photoshop)
- The sky should read as "dusk" or "night" even if the original is daytime
- Resize to at least 3000px wide to cover full viewport without scaling artifacts

### Clouds PNG
- **Reduce opacity** to 15–25% in the file itself, or handle via CSS
- **Tint warm** — shift the white clouds toward gold/amber
- **Duplicate the image side-by-side** (literally paste it next to itself) and check that the seam is invisible. If it isn't seamless, you'll need to clone-stamp the edges in Photoshop until the join disappears. This is critical for the infinite drift loop.
- Final dimensions should be 2x viewport width minimum (so roughly 4000px+ wide)

### House PNG
- Ensure the cut-out edges are clean — no white fringing or halo from the original background. If there is, use Photoshop's "defringe" or "remove white matte"
- **Color grade** to match the dark palette — darken the shadows, warm the highlights
- The house should look like it's photographed at golden hour or dusk, not midday

### Worker PNGs (Plumber, Cleaner, Electrician)
- Same edge cleanup — no fringing
- **Consistent color grade** across all three — they need to look like they were shot in the same light and edited with the same LUT
- Slight rim light effect helps them pop from the dark background — if they don't have one naturally, a subtle gold edge glow can be added in Photoshop (inner glow, warm gold, 1–2px)
- Scale them relative to each other realistically — the plumber and electrician shouldn't be 2x the size of the cleaner

---

## MOTION BEHAVIOR CHEAT SHEET

| Element | Motion Type | Trigger | Duration | Easing |
|---|---|---|---|---|
| Sky layer | Vertical parallax | Scroll | Continuous | Linear |
| Clouds layer | Horizontal drift + vertical parallax | Auto + scroll | 60s loop | Linear |
| House layer | Vertical parallax | Scroll | Continuous | Linear |
| Worker layer | Vertical parallax | Scroll | Continuous | Linear |
| Atmospheric particles | Float / drift | Auto (loop) | 8–12s | ease-in-out |
| Headline text | Fade up + lift | Page load | 1.2s | cubic-bezier(0.16,1,0.3,1) |
| Scroll prompt | Fade + pulse | Page load | 2s loop | ease-in-out |
| Section content | Fade up (staggered) | Scroll into view | 1s per element | cubic-bezier(0.16,1,0.3,1) |
| Worker PNGs (service sections) | Slide in from side | Scroll into view | 1.2s | cubic-bezier(0.16,1,0.3,1) |
| Stat numbers | Count up | Scroll into view | 2s | cubic-bezier(0,0,0.2,1) |
| Process timeline gold line | Draw left→right | Scroll through section | Scroll-linked | Linear |
| Service icons | Stroke draw | Scroll into view | 1.5s | ease-in-out |
| City marquee | Horizontal scroll loop | Auto | 50s | Linear |
| Gold divider lines | Width expand center→edges | Scroll into view | 0.8s | cubic-bezier(0.16,1,0.3,1) |

---

## TECH STACK RECOMMENDATION

| Layer | Tool | Why |
|---|---|---|
| Framework | Next.js or Webflow | Next.js if custom-built by devs. Webflow if your team prefers visual builder. Both handle this kind of site well. |
| Scroll engine | GSAP ScrollTrigger | Industry standard. Handles parallax speeds, pin sections, scrub animations to scroll position. This is non-negotiable — CSS-only parallax won't give you the control you need. |
| Smooth scroll | Lenis | Replaces native scroll with buttery momentum. Makes everything feel premium. Small library, easy to integrate. |
| Icon animation | Lottie (lottie-web) | If your icons are complex. For simple stroke-draw, pure SVG + CSS stroke-dasharray is lighter. |
| Video | HTML5 video, lazy-loaded | MP4 (H.264) primary, WebM fallback. Compress hard — hero video under 5MB, section clips under 2MB each. |
| Hosting | Vercel or Cloudflare Pages | Fast CDN, good for media-heavy sites. |

---

## FILE DELIVERY STRUCTURE

```
/assets
  /existing (your current PNGs, graded and prepped)
    sky-graded.webp
    clouds-tinted-seamless.webp
    house-graded.webp
    worker-cleaner.webp
    worker-plumber.webp
    worker-electrician.webp
  /photos (new)
    clean-lobby.jpg
    maintenance-closeup.jpg
    building-exterior-dusk.jpg
    keys-handover.jpg
  /icons
    icon-cleaning.svg
    icon-maintenance.svg
    icon-lease.svg
    icon-assess.svg
    icon-plan.svg
    icon-execute.svg
    icon-maintain.svg
  /decorative
    concentric-circles.svg
    dot-grid.svg
    diagonal-lines.svg
    cross-marks.svg
    horizontal-divider.svg
    corner-brackets.svg
  /texture
    film-grain-tile.png
    bokeh-particles.png
    blueprint-grid.png
  /fonts
    [typeface]-light.woff2
    [typeface]-regular.woff2
    [typeface]-medium.woff2
```

---

## SUMMARY — WHAT YOU HAVE VS WHAT YOU NEED

| Category | Have | Need |
|---|---|---|
| Hero parallax layers | 5 of 6 (sky, clouds, house, worker, text) | 1 — atmospheric bokeh overlay |
| Service worker images | All 3 (cleaner, plumber, electrician) | Color grading + edge cleanup |
| Service result photos | None | 4 new photos |
| Icons | None | 7 SVGs (3 service + 4 process) |
| Decorative elements | None | 6 SVGs |
| Textures | None | 3 (grain, bokeh, blueprint grid) |
| Typography | None | 1 licensed serif family |
| Video | None | Optional — site works without it using your PNGs |
| Audio | None | Optional |

The big win here: because you already have separated transparent PNGs, you can skip the most expensive part of production (the parallax layer photography/rendering). Your site's hero can work with what you have plus color grading and one new atmospheric overlay.
