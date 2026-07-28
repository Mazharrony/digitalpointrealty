/**
 * All site copy and business data.
 *
 * ⚠️  EVERY VALUE MARKED `PLACEHOLDER` IS INVENTED and must be replaced with
 * real figures before this site goes public. That includes the founding year,
 * all three statistics, both testimonials, the licence/insurance claims and
 * every contact detail. Publishing invented credentials for a real company is
 * a legal and reputational problem, not just a content gap.
 */

export const brand = {
  name: "Digital Point",
  full: "Digital Point Real Estate",
  tagline: "Buildings Cleaning · Maintenance · Lease & Management",
  foundedYear: 2014, // PLACEHOLDER
  city: "Abu Dhabi",
};

export const contact = {
  phone: "+971 58 991 4077",
  whatsapp: "+971 58 991 4077",
  email: "digitalgreenpoint.ae@gmail.com",
  address: "Al Danah, East 0, 3 – Building (Khalfan Dhahi Saeed Dhahi), Abu Dhabi, UAE",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  headline: ["We don't just maintain", "buildings — we protect", "what they're worth."],
  sub: "Cleaning, maintenance and lease management across Abu Dhabi, under a single point of accountability.",
  // Lands in the cleared centre once the house and model part
  endEyebrow: "Cleaning · Maintenance · Lease",
  endLine: "One team. One standard. One number to call.",
  cta: "Request an assessment",
  scrollPrompt: "Scroll to explore",
};

export const about = {
  eyebrow: `Est. ${brand.foundedYear} — ${brand.city}`,
  headline: "Three disciplines. One standard.",
  body: [
    "Most buildings are run by three separate vendors who never speak to each other. The cleaning contractor doesn't report the leak. The maintenance team doesn't know a unit is being shown next week. The letting agent inherits whatever the other two left behind.",
    "We hold all three. When cleaning spots a failing seal, maintenance is booked before it becomes a claim. When a unit is due to turn over, it's cleaned, repaired and listed on one schedule. One accountable party, one standard, one number to call.",
  ],
  // PLACEHOLDER — replace all three with audited figures
  stats: [
    { value: 11, suffix: "", label: "Years operating in Abu Dhabi" },
    { value: 240, suffix: "+", label: "Buildings under contract" },
    { value: 130, suffix: "", label: "Directly employed staff" },
  ],
};

export const services = [
  {
    id: "cleaning",
    index: "01",
    title: "Buildings Cleaning",
    lede: "A clean building is not a courtesy. It's the cheapest way to defend your asset's value.",
    body: "Common areas, façades, car parks, waste rooms and post-handover deep cleans — on a schedule tied to how the building is actually used, not a generic weekly sweep. Clean buildings retain tenants longer, command higher rents and pass inspection without a scramble.",
    points: [
      "Scheduled common-area and façade programmes",
      "Post-construction and turnover deep cleans",
      "Waste management and pest control coordination",
      "Documented inspection reports after every visit",
    ],
    image: "/assets/model-cleaner.webp",
    alt: "Cleaning technician in Digital Point uniform holding a mop and cleaning supplies",
    side: "left" as const,
  },
  {
    id: "maintenance",
    index: "02",
    title: "Buildings Maintenance",
    lede: "The best maintenance call is the one your tenant never had to make.",
    body: "Planned preventive maintenance across MEP, HVAC, plumbing and electrical — with condition monitoring that catches the failure while it's still cheap. Reactive callouts are the expensive way to run a building; we treat them as a metric to drive down, not a service to sell you more of.",
    points: [
      "Planned preventive maintenance schedules",
      "MEP, HVAC, plumbing and electrical cover",
      "24/7 emergency response", // PLACEHOLDER — confirm you actually offer this
      "Asset condition reporting and lifecycle forecasting",
    ],
    image: "/assets/model-electrician.webp",
    alt: "Electrician in Digital Point uniform carrying cable with a tool belt",
    side: "right" as const,
  },
];

export const lease = {
  index: "03",
  title: "Lease & Management",
  lede: "Occupancy is easy to buy. Yield is what you actually keep.",
  body: "Anyone can fill a unit by dropping the rent. We manage for net yield — tenant quality, renewal rates, void periods and arrears, reported monthly against the numbers that matter. Finding the tenant is the beginning of the job, not the end of it.",
  features: [
    { k: "Tenant sourcing & screening", v: "Credit, employment and reference checks before an offer is accepted." },
    { k: "Rent collection & arrears", v: "Structured escalation, so a late month never becomes a lost quarter." },
    { k: "Renewals & void management", v: "Renewal conversations start 90 days out, not on expiry." },
    { k: "Owner reporting", v: "Monthly statement covering yield, occupancy, spend and arrears." },
  ],
};

export const process = [
  {
    n: "01",
    title: "Assess",
    body: "A full walk of the asset — condition, compliance gaps, current spend and where it's leaking.",
  },
  {
    n: "02",
    title: "Plan",
    body: "A scope and schedule priced against the actual building, with the trade-offs written down.",
  },
  {
    n: "03",
    title: "Execute",
    body: "Directly employed teams, not a chain of subcontractors. One supervisor owns your site.",
  },
  {
    n: "04",
    title: "Maintain",
    body: "Monthly reporting, quarterly review, and a scope that adjusts as the building ages.",
  },
];

export const trust = {
  eyebrow: "Why owners move to us",
  headline: "Accountability you can point at.",
  differentiators: [
    { k: "Licensed", v: "Abu Dhabi DED & DMT registered" }, // PLACEHOLDER — verify exact authorities
    { k: "Insured", v: "Public liability & workmen's comp" }, // PLACEHOLDER — verify
    { k: "Directly employed", v: "No subcontractor chains" },
    { k: "One point of contact", v: "A named supervisor per site" },
  ],
  // PLACEHOLDER — these are written examples, not real client quotes.
  // Do not publish until replaced with attributed, permissioned testimonials.
  testimonials: [
    {
      quote:
        "Three vendors became one. Our reactive callouts dropped by roughly half in the first year, and I stopped being the person who had to chase all of them.",
      attribution: "Property Manager, residential tower — Al Reem Island",
    },
    {
      quote:
        "The monthly report is the difference. I can see occupancy, arrears and spend on one page instead of reconstructing it from invoices.",
      attribution: "Owner, mixed-use building — Khalifa City",
    },
  ],
};

export const areas = [
  "Al Reem Island",
  "Yas Island",
  "Saadiyat Island",
  "Al Maryah Island",
  "Corniche",
  "Al Danah",
  "Khalifa City",
  "Al Bateen",
  "Al Raha Beach",
  "Masdar City",
  "Mohammed Bin Zayed City",
];

export const cta = {
  headline: "Your building deserves better.",
  sub: "Book a no-obligation assessment. We'll walk the asset, document what we find, and show you what it should cost to run.",
  button: "Request an assessment",
};
