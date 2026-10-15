/* ------------------------------------------------------------------ */
/*  VS Developers — central content model                              */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  phone: "+91 9035585849",
  phoneHref: "tel:+919035585849",
  whatsapp: (msg?: string) =>
    `https://wa.me/919035585849${msg ? `?text=${encodeURIComponent(msg)}` : ""}`,
  email: "vsdevelopersvsd@outlook.com",
  address:
    "#46/1, 1st Floor, Mahadev Complex, Behind Royal Enfield Showroom & Green Trends, Bhattarahalli, Virgonagar (P), Near T.C. Palya Gate Signal, Bangalore – 560049",
  shortAddress: "Bhattarahalli, Virgonagar, Bengaluru – 560049",
  mapUrl: "https://maps.app.goo.gl/Bd2CoUQLbW4dbCjd9",
  mapEmbed:
    "https://maps.google.com/maps?q=13.0180673,77.7055913&hl=en&z=17&output=embed",
  hours: "Mon – Sat · 9:30 AM – 7:00 PM",
};

export const TAGLINE = "A Trusted Property Partner.";

export const TRUST_BADGES = [
  "DTCP Approved",
  "DC Converted",
];

export const STATS = [
  { value: 110, suffix: "+", label: "Acres Developed", sub: "Across Bengaluru East" },
  { value: 1800, suffix: "+", label: "Plots Delivered", sub: "To happy owners" },
  { value: 10, suffix: "+", label: "Years of Trust", sub: "Family-run since 2014" },
  { value: 1500, suffix: "+", label: "Happy Families", sub: "And counting" },
];

/* ------------------------------ media helpers ---------------------- */

const px = (id: number, w = 1600, h = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

// Public direct-stream URL for the client-provided Google Drive video.
export const HERO_VIDEO = "/hero-video.mp4";
export const HERO_POSTER = "/hero-poster.jpg";

/* ------------------------------ 3D layout generator ---------------- */

export type PlotStatus = "available" | "corner" | "reserved" | "sold";

export interface PlotCell {
  id: string;
  label: string;
  x: number;
  z: number;
  w: number;
  d: number;
  status: PlotStatus;
  sqft: number;
  kind: "plot" | "park";
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic simplified plot layout.
 * roadRow / roadCol are skipped columns/rows (roads / boulevards).
 */
function makeLayout(
  seed: number,
  cols: number,
  rows: number,
  sqftOptions: number[],
  opts: { roadRow?: number; roadCol?: number; parks?: number } = {},
): { plots: PlotCell[]; parks: PlotCell[] } {
  const rnd = mulberry32(seed);
  const cell = 1.35;
  const gap = 0.42;
  const { roadRow = -1, roadCol = -1, parks = 1 } = opts;
  const plots: PlotCell[] = [];
  const parksList: PlotCell[] = [];
  const center = { c: (cols - 1) / 2, r: (rows - 1) / 2 };
  let n = 0;

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      if (c === roadCol || r === roadRow) continue;
      const x = (c - center.c) * (cell + gap);
      const z = (r - center.r) * (cell + gap);
      const isEdge =
        c === 0 || r === 0 || c === cols - 1 || r === rows - 1 ||
        c === roadCol + 1 || c === roadCol - 1 || r === roadRow + 1 || r === roadRow - 1;

      const distCenter = Math.abs(c - center.c) + Math.abs(r - center.r);
      if (parksList.length < parks && distCenter <= 2 && rnd() < 0.18) {
        parksList.push({
          id: `park-${c}-${r}`,
          label: "Park",
          x,
          z,
          w: cell,
          d: cell,
          status: "available",
          sqft: 0,
          kind: "park",
        });
        continue;
      }

      n++;
      const status: PlotStatus = "sold";

      plots.push({
        id: `p-${c}-${r}`,
        label: String(n),
        x,
        z,
        w: cell,
        d: cell,
        status,
        sqft: sqftOptions[Math.floor(rnd() * sqftOptions.length)],
        kind: "plot",
      });
    }
  }
  return { plots, parks: parksList };
}

/* ------------------------------ projects --------------------------- */

export interface GalleryItem {
  src: string;
  caption: string;
  type: "photo" | "video" | "360";
  video?: string;
}

export interface Project {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  location: string;
  address?: string;
  status: "Sold Out" | "100% Sold Out" | "Completed" | "Selling" | "New Launch" | "Limited Plots";
  areaAcres: number;
  plotCount: number;
  sizes: string;
  approvals: string;
  heroImage: string;
  video: string;
  highlights: string[];
  amenities: { icon: string; label: string; desc: string }[];
  locationAdvantages: string[];
  gallery: GalleryItem[];
  layout: { plots: PlotCell[]; parks: PlotCell[] };
  about: string;
  mapEmbed?: string;
  mapUrl?: string;
  directionsUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "vs-heritage",
    name: "VS Heritage",
    shortName: "Heritage",
    tagline: "Twelve and a half acres of DTCP approved & DC converted calm in Kalkere.",
    location: "Kalkere, Bengaluru East",
    status: "Sold Out",
    areaAcres: 12.5,
    plotCount: 148,
    sizes: "30×50 & 40×60 ft",
    approvals: "DC / DTCP Approved",
    heroImage: "/projects/heritage/heritage-1.jpg",
    video: "https://videos.pexels.com/video-files/33700875/14313921_3840_2160_30fps.mp4",
    mapEmbed: "https://maps.google.com/maps?q=13.026526,77.709515&hl=en&z=16&output=embed",
    mapUrl: "https://maps.app.goo.gl/z5kCzu3gEZ34RUab9",
    about:
      "Twelve and a half acres of DTCP approved & DC converted calm in Kalkere — wide 40-ft avenues, a half-acre park and 148 vaastu-friendly plots minutes from Hennur Road.",
    highlights: [
      "100% Sold Out & Fully Handed Over",
      "Wide 40-ft avenues & half-acre park",
      "148 vaastu-friendly plots delivered",
      "Minutes from Hennur Road",
    ],
    amenities: [
      { icon: "road", label: "Wide Asphalt Roads", desc: "40' wide avenues with kerb stones and drains." },
      { icon: "tree", label: "Avenue Plantation", desc: "Shade trees planted along every internal road." },
      { icon: "power", label: "Underground Power & Drainage", desc: "Ducted electricity and UGD to every plot." },
      { icon: "water", label: "Water Supply", desc: "Cauvery & borewell lines drawn to plot corners." },
      { icon: "park", label: "Half-Acre Park", desc: "Landscaped central park with walking track." },
      { icon: "shield", label: "24×7 Security", desc: "Gated entry, compound wall and street lighting." },
      { icon: "rain", label: "Rainwater Harvesting", desc: "Percolation pits across the layout." },
      { icon: "ruler", label: "Levelled & Marked Plots", desc: "Surveyor-verified boundaries, ready to build." },
    ],
    locationAdvantages: [
      "Hennur Road corridor — 5 minutes",
      "Manyata Tech Park — 15 minutes",
      "Kempegowda Airport road — 25 minutes",
      "Kalkere Lake & walking promenade — 2 minutes",
    ],
    gallery: [
      { src: "/projects/heritage/heritage-1.jpg", caption: "Aerial view of VS Heritage layout", type: "photo" },
      { src: "/projects/heritage/heritage-2.jpg", caption: "Avenue roads & boundary demarcations", type: "photo" },
      { src: "/projects/heritage/heritage-3.jpg", caption: "Layout entrance boulevard & greenery", type: "photo" },
      { src: "/projects/heritage/heritage-4.jpg", caption: "Vaastu-compliant corner & regular plots", type: "photo" },
      { src: "/projects/heritage/heritage-5.jpg", caption: "Wide asphalt roads with kerb stones", type: "photo" },
      { src: "/projects/heritage/heritage-6.jpg", caption: "Underground electrical & water utility lines", type: "photo" },
      { src: "/projects/heritage/heritage-7.jpg", caption: "Park & avenue tree plantations", type: "photo" },
      { src: "/projects/heritage/heritage-8.jpg", caption: "Scenic layout landscape & lake proximity", type: "photo" },
      { src: "/projects/heritage/heritage-9.jpg", caption: "Surveyor-marked plot corner stones", type: "photo" },
      { src: "/projects/heritage/heritage-10.jpg", caption: "Completed development phase overview", type: "360" },
    ],
    layout: makeLayout(11, 10, 9, [1200, 1500, 1800, 2400], { roadRow: 4, parks: 2 }),
  },
  {
    slug: "vs-rosemeadows",
    name: "VS Rosemeadows",
    shortName: "Rosemeadows",
    tagline: "4.7 acres of flowering avenues on the Sulibele growth corridor.",
    location: "Vemagal–Kurugal, Karnataka",
    address: "Vemagal–Kurugal, Karnataka 563157, India",
    status: "Sold Out",
    areaAcres: 4.7,
    plotCount: 71,
    sizes: "Starts at 30×40 ft",
    approvals: "DC / DTCP Approved",
    heroImage: "/projects/rose/rose-1.jpg",
    video: "https://videos.pexels.com/video-files/33700929/14314063_3840_2160_30fps.mp4",
    mapEmbed: "https://maps.google.com/maps?q=13.2210196,77.9708434&hl=en&z=16&output=embed",
    mapUrl: "https://maps.app.goo.gl/rF3kqMzLJAbEWFNV9",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=13.2210196%2C77.9708434",
    about:
      "4.7 acres of flowering avenues on the Sulibele growth corridor — DC / DTCP approved, with a rose-and-tabebuia theme woven through the master plan.",
    highlights: [
      "100% Sold Out & Handed Over",
      "Rose-and-tabebuia flowering avenues",
      "71 premium villa plots across 4.7 acres",
      "Plots starting at 30×40 ft on Sulibele Road",
    ],
    amenities: [
      { icon: "road", label: "Wide Asphalt Roads", desc: "30' & 40' roads with service lanes." },
      { icon: "tree", label: "Rose & Tabebuia Theme", desc: "Signature landscaped flowering tree master plan." },
      { icon: "power", label: "Underground Power & Drainage", desc: "Ducted electricity and UGD to every plot." },
      { icon: "water", label: "Water Supply", desc: "Cauvery & borewell lines drawn to plot corners." },
      { icon: "park", label: "Jogging Track", desc: "800m walking loop around the meadow." },
      { icon: "shield", label: "24×7 Security", desc: "Gated entry, compound wall and street lighting." },
      { icon: "rain", label: "Rainwater Harvesting", desc: "Percolation pits across the layout." },
      { icon: "ruler", label: "Levelled & Marked Plots", desc: "Surveyor-verified boundaries, ready to build." },
    ],
    locationAdvantages: [
      "Hoskote Industrial Hub — 8 minutes",
      "STRR (Satellite Town Ring Road) — 5 minutes",
      "Whitefield IT corridor — 25 minutes",
      "Kempegowda Airport — 35 minutes via SH-104",
    ],
    gallery: [
      { src: "/projects/rose/rose-1.jpg", caption: "Aerial overview of VS Rosemeadows", type: "photo" },
      { src: "/projects/rose/rose-2.jpg", caption: "Flowering avenues along Sulibele road", type: "photo" },
      { src: "/projects/rose/rose-3.jpg", caption: "Gated layout entrance & wide roads", type: "photo" },
      { src: "/projects/rose/rose-4.jpg", caption: "Curated green central park & walking track", type: "photo" },
      { src: "/projects/rose/rose-5.jpg", caption: "Underground storm water & drainage lines", type: "photo" },
      { src: "/projects/rose/rose-6.jpg", caption: "Individual plot demarcations & stones", type: "photo" },
      { src: "/projects/rose/rose-7.jpg", caption: "Villa construction taking shape", type: "photo" },
      { src: "/projects/rose/rose-8.jpg", caption: "Rose and tabebuia tree plantations", type: "photo" },
      { src: "/projects/rose/rose-9.jpg", caption: "Street lighting and security infrastructure", type: "photo" },
      { src: "/projects/rose/rose-10.jpg", caption: "Corner villa plots with dual road access", type: "photo" },
      { src: "/projects/rose/rose-11.jpg", caption: "Landscape garden & jogging pathway", type: "photo" },
      { src: "/projects/rose/rose-12.jpg", caption: "Surrounding Hoskote green corridor view", type: "360" },
    ],
    layout: makeLayout(23, 9, 8, [1200, 1500, 1800, 2400], { roadCol: 4, parks: 1 }),
  },
  {
    slug: "vs-yogitha",
    name: "VS Yogitha",
    shortName: "Yogitha",
    tagline: "76 plots against a hill-and-lake backdrop, 20 mins from Whitefield.",
    location: "Budigere, Old Madras Road",
    status: "Sold Out",
    areaAcres: 6.8,
    plotCount: 76,
    sizes: "30×40 & 30×50 ft",
    approvals: "DC / DTCP Approved",
    heroImage: "/projects/yogitha/yogitha-1.jpg",
    video: "https://videos.pexels.com/video-files/33700589/14313615_3840_2160_30fps.mp4",
    mapEmbed: "https://maps.google.com/maps?q=13.2328838,77.9737425&hl=en&z=16&output=embed",
    mapUrl: "https://www.google.com/maps?q=13.2328838,77.9737425",
    about:
      "Our boutique development at Budigere — 76 plots against a hill-and-lake backdrop, 20 minutes from Whitefield on NH-75.",
    highlights: [
      "100% Sold Out & Delivered",
      "Hill-and-lake natural panoramic backdrop",
      "20 minutes from Whitefield on NH-75",
      "DC / DTCP Approved",
    ],
    amenities: [
      { icon: "road", label: "Wide Asphalt Roads", desc: "30' roads with kerb stones and drains." },
      { icon: "tree", label: "Avenue Plantation", desc: "Shade trees planted along every road." },
      { icon: "power", label: "Underground Power & Drainage", desc: "Ducted electricity and UGD to every plot." },
      { icon: "water", label: "Water Supply", desc: "Cauvery & borewell lines drawn to plot corners." },
      { icon: "park", label: "Kids' Play Park", desc: "Secure play area with soft flooring." },
      { icon: "shield", label: "24×7 Security", desc: "Gated entry, compound wall and street lighting." },
      { icon: "rain", label: "Rainwater Harvesting", desc: "Percolation pits across the layout." },
      { icon: "ruler", label: "Levelled & Marked Plots", desc: "Surveyor-verified boundaries, ready to build." },
    ],
    locationAdvantages: [
      "Budigere Cross junction — 5 minutes",
      "Whitefield (ITPL) — 20 minutes via NH-75",
      "KR Puram railway & metro hub — 15 minutes",
      "Upcoming Peripheral Ring Road — 3 km",
    ],
    gallery: [
      { src: "/projects/yogitha/yogitha-1.jpg", caption: "Boutique layout against hill & lake backdrop", type: "photo" },
      { src: "/projects/yogitha/yogitha-2.jpg", caption: "40-ft wide central avenue boulevard", type: "photo" },
      { src: "/projects/yogitha/yogitha-3.jpg", caption: "Budigere Cross connectivity & entry gate", type: "photo" },
      { src: "/projects/yogitha/yogitha-4.jpg", caption: "Levelled, vaastu-aligned plotted sites", type: "photo" },
      { src: "/projects/yogitha/yogitha-5.jpg", caption: "Underground utilities and ducted power", type: "photo" },
      { src: "/projects/yogitha/yogitha-6.jpg", caption: "Children play area & landscaped garden", type: "photo" },
      { src: "/projects/yogitha/yogitha-7.jpg", caption: "Boundary fencing & 24x7 security post", type: "photo" },
      { src: "/projects/yogitha/yogitha-8.jpg", caption: "First residential villa construction", type: "photo" },
      { src: "/projects/yogitha/yogitha-9.jpg", caption: "Tree-lined internal roads & drainage", type: "photo" },
      { src: "/projects/yogitha/yogitha-10.jpg", caption: "Sunset panoramic view over layout", type: "360" },
    ],
    layout: makeLayout(31, 8, 8, [1200, 1500, 2000], { roadRow: 3, roadCol: 3, parks: 1 }),
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

/* ------------------------------ testimonials ----------------------- */

export const TESTIMONIALS = [
  {
    quote:
      "We bought two plots in VS Heritage in 2019. Documents were clean, the layout came up exactly as promised — trees, roads, everything. We're building our home now.",
    name: "Raghavendra K.",
    role: "IT Professional · VS Heritage plot owner",
    initials: "RK",
  },
  {
    quote:
      "What won us over was the patience. No pushy sales — they walked us through every approval paper before we paid a rupee. That's rare in real estate.",
    name: "Priya & Sandeep Menon",
    role: "VS Rosemeadows plot owners",
    initials: "PM",
  },
  {
    quote:
      "I flew in from Dubai twice. They handled the registration, the loan documentation, even the plot marking. Truly a trusted partner.",
    name: "Lakshmi Narayan",
    role: "NRI buyer · VS Yogitha",
    initials: "LN",
  },
  {
    quote:
      "Three generations of my family have bought plots here. Same desk, same people, same honesty — ten years on.",
    name: "Manjunath G.",
    role: "Repeat buyer · VS Heritage",
    initials: "MG",
  },
  {
    quote:
      "The 3D plot viewer on their site matched the actual site visit so closely I booked the corner plot the next day.",
    name: "Arjun Shetty",
    role: "VS Heritage corner plot owner",
    initials: "AS",
  },
];

/* ------------------------------ careers ----------------------------- */

export const ROLES = [
  {
    title: "Senior Sales Manager",
    type: "Full-time",
    location: "Bhattarahalli HQ, Bengaluru",
    exp: "4+ years in plotted/real estate sales",
    desc: "Own the complete sales cycle for VS Heritage & VS Yogitha — site visits, documentation, closing.",
  },
  {
    title: "Site Engineer (Civil)",
    type: "Full-time",
    location: "Budigere Cross & Seegehalli sites",
    exp: "Diploma/B.E. Civil, 2+ years",
    desc: "Supervise road works, UGD, levelling and plot marking at our active layouts.",
  },
  {
    title: "Digital Marketing Executive",
    type: "Full-time",
    location: "Bhattarahalli HQ, Bengaluru",
    exp: "2+ years, Meta & Google Ads",
    desc: "Run performance campaigns, site content and lead funnels for new launches.",
  },
  {
    title: "Relationship Manager (Telesales)",
    type: "Full-time",
    location: "Bhattarahalli HQ, Bengaluru",
    exp: "Fluent in Kannada, English & Hindi",
    desc: "Guide inbound enquiries from first call to site visit with warmth and precision.",
  },
  {
    title: "Documentation Executive",
    type: "Full-time",
    location: "Bhattarahalli HQ, Bengaluru",
    exp: "Knowledge of khata, EC & registration",
    desc: "Prepare sale deeds, agreements, ECs and registration dockets with zero-error discipline.",
  },
];

/* ------------------------------ services ---------------------------- */

export const SERVICES = [
  {
    icon: "seal",
    title: "Approved Layouts",
    desc: "DTCP approved & DC conversion secured on every layout — before a single plot is sold.",
  },
  {
    icon: "doc",
    title: "Clear Land Titles",
    desc: "Bank-grade legal vetting and loan-ready documentation, so your investment is never questioned.",
  },
  {
    icon: "compass",
    title: "Layout Freedom",
    desc: "Choose your plot size, orientation and position. Build on your timeline, with your architect.",
  },
  {
    icon: "road",
    title: "Complete Infrastructure",
    desc: "Asphalt roads, avenue trees, underground power, drainage and water — delivered, not promised.",
  },
  {
    icon: "scale",
    title: "Transparent Pricing",
    desc: "No hidden charges. Every cost is on paper and every paper is explained line by line.",
  },
  {
    icon: "heart",
    title: "After-Sale Care",
    desc: "Registration assistance, construction guidance and a helpline that answers on the second ring.",
  },
];

/* ------------------------------ why us (pinned) --------------------- */

export const WHY_STEPS = [
  {
    icon: "award",
    title: "10 Years of Trust",
    desc: "A family-run practice since 2014 — same desk, same people, same word. 1800+ plots stand on it.",
  },
  {
    icon: "users",
    title: "1800+ Happy Plot Owners",
    desc: "Doctors, engineers, NRIs and second-generation buyers — most of our new sales still come from referrals.",
  },
  {
    icon: "seal",
    title: "100% Approved Layouts",
    desc: "DTCP approved and DC converted on every layout. Approvals first, marketing later — always.",
  },
  {
    icon: "doc",
    title: "Zero-Compromise Titles",
    desc: "Every plot title passes our internal legal desk twice before it reaches you. Loan-ready documentation, guaranteed.",
  },
  {
    icon: "compass",
    title: "Layout Freedom",
    desc: "Pick your size, your corner, your direction. We mark, you build — on your timeline, with your architect.",
  },
  {
    icon: "heart",
    title: "After-Sale Care",
    desc: "From registration to your first concrete pour, our team stays on call. We answer on the second ring.",
  },
];
