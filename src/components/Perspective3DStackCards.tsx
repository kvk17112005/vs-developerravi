import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { CONTACT } from "../data/site";
import { Icon, WhatsAppGlyph } from "./ui";

/* ------------------------------------------------------------------ */
/*  Interactive 3D Perspective Stacking Cards ("Building Communities") */
/* ------------------------------------------------------------------ */

export interface StackCard {
  id: string;
  tabLabel: string;
  title: string;
  tagline: string;
  colorScheme: "forest" | "emerald" | "gold" | "navy" | "teal";
  bgGradient: string;
  icon: string;
  bullets: { title: string; desc: string }[];
  highlightMetric: { value: string; label: string };
  image: string;
}

const STACK_CARDS: StackCard[] = [
  {
    id: "legal",
    tabLabel: "Legal Assurance",
    title: "Legal Transparency & Vetting",
    tagline: "100% DC Converted, DTCP Approved & Clear Marketable Titles",
    colorScheme: "forest",
    bgGradient: "from-[#0F3D23] via-[#165030] to-[#0A2917]",
    icon: "seal",
    bullets: [
      {
        title: "DC Converted & DTCP Approved",
        desc: "Every single layout meets statutory town planning guidelines with complete official sanction numbers.",
      },
      {
        title: "Dual Legal Desk Verification",
        desc: "30+ years title traceability vetted independently by senior high court legal advocates.",
      },
      {
        title: "Immediate E-Khata & Registration",
        desc: "Ready for direct registration with clean individual sub-division plot numbers and E-Khata.",
      },
    ],
    highlightMetric: { value: "100%", label: "Litigation Free" },
    image: "/projects/heritage/heritage-2.jpg",
  },
  {
    id: "infrastructure",
    tabLabel: "Infrastructure",
    title: "Complete Underground Infrastructure",
    tagline: "Civil Infrastructure 100% Delivered Before Any Handover",
    colorScheme: "emerald",
    bgGradient: "from-[#144A2F] via-[#1D6340] to-[#0F3622]",
    icon: "road",
    bullets: [
      {
        title: "40-Ft & 30-Ft Heavy-Duty Roads",
        desc: "Bituminous asphalt surfaced avenues with precast concrete kerb stones and utility ducts.",
      },
      {
        title: "Underground Power & Drainage (UGD)",
        desc: "No overhead electric wire clutter — power cables and sewage pipes ducted underground.",
      },
      {
        title: "Dual Water Lines to Plot Corners",
        desc: "Cauvery water connections and deep borewell lines provided to individual plot boundaries.",
      },
    ],
    highlightMetric: { value: "40 Ft", label: "Avenue Boulevards" },
    image: "/projects/heritage/heritage-5.jpg",
  },
  {
    id: "location",
    tabLabel: "Strategic Locations",
    title: "Bengaluru East Growth Hubs",
    tagline: "Positioned on High-Growth Corridors near Tech Hubs & STRR",
    colorScheme: "gold",
    bgGradient: "from-[#2C2416] via-[#423722] to-[#1F190F]",
    icon: "compass",
    bullets: [
      {
        title: "Direct Highway & Ring Road Access",
        desc: "Connected to NH-75, Old Madras Road, Satellite Town Ring Road (STRR), and Hennur corridor.",
      },
      {
        title: "20 Mins from Whitefield & IT Corridors",
        desc: "Effortless daily commute to Manyata Tech Park, ITPL Whitefield, and KR Puram metro interchange.",
      },
      {
        title: "Proximity to Top Schools & Hospitals",
        desc: "Surrounded by international schools, multi-specialty hospitals, and upcoming commercial centers.",
      },
    ],
    highlightMetric: { value: "20 Mins", label: "To ITPL Whitefield" },
    image: "/projects/yogitha/yogitha-1.jpg",
  },
  {
    id: "investment",
    tabLabel: "Investment Value",
    title: "High Appreciation & Bank Loans",
    tagline: "Proven Wealth Generation with Leading Bank Loan Approvals",
    colorScheme: "navy",
    bgGradient: "from-[#0F2238] via-[#163354] to-[#0A1726]",
    icon: "scale",
    bullets: [
      {
        title: "Pre-Approved by Leading Banks",
        desc: "Hassle-free plot loans available through SBI, HDFC, ICICI, and all major nationalized lenders.",
      },
      {
        title: "Track Record of Exceptional Capital Gains",
        desc: "Delivered layouts have appreciated significantly due to rapid infrastructure development.",
      },
      {
        title: "Family-Run Transparency for 10+ Years",
        desc: "Same founders at the same desk in Bhattarahalli since 2014, ensuring personalized commitment.",
      },
    ],
    highlightMetric: { value: "10+ Yrs", label: "Proven Trust" },
    image: "/projects/rose/rose-1.jpg",
  },
  {
    id: "township",
    title: "Eco-Friendly Master Planning",
    tabLabel: "Township Masterplan",
    tagline: "Curated Flowering Boulevards, Central Parks & Gated Security",
    colorScheme: "teal",
    bgGradient: "from-[#0B332E] via-[#124C45] to-[#072420]",
    icon: "flower",
    bullets: [
      {
        title: "Half-Acre Landscaped Central Parks",
        desc: "Dedicated green lungs with 800m jogging tracks, pagoda gazebos, and children play zones.",
      },
      {
        title: "Tabebuia Rosea Flowering Trees",
        desc: "Signature pink and yellow flowering avenue trees planted alongside all layout boulevards.",
      },
      {
        title: "Gated Compound Wall & Security",
        desc: "Grand layout entrance gate with 24×7 security guard cabin and perimeter compound wall.",
      },
    ],
    highlightMetric: { value: "100%", label: "Green Cover" },
    image: "/projects/rose/rose-2.jpg",
  },
];

function ScrollStackCard({
  card,
  index,
  progress,
}: {
  card: StackCard;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / STACK_CARDS.length;
  const end = (index + 1) / STACK_CARDS.length;
  const y = useTransform(progress, [start, end], ["110%", "0%"]);
  const scale = useTransform(progress, [start, end], [0.96, 1]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div
      style={{ y: index === 0 ? 0 : y, scale: index === 0 ? 1 : scale, opacity: index === 0 ? 1 : opacity, zIndex: index + 1 }}
      className={`absolute inset-0 overflow-hidden rounded-[2.25rem] border border-white/20 p-6 shadow-2xl backdrop-blur-xl sm:p-10 bg-gradient-to-br ${card.bgGradient}`}
    >
      <div className="grid h-full items-center gap-6 sm:grid-cols-12 sm:gap-8">
        <div className="flex flex-col justify-between sm:col-span-7">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-gold-300">
                <Icon name={card.icon} className="h-4.5 w-4.5" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-mint-300">
                {card.tagline}
              </span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {card.title}
            </h3>

            <div className="mt-5 space-y-3">
              {card.bullets.map((b, bIdx) => (
                <div key={bIdx} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-forest-950">
                    <Icon name="check" className="h-3 w-3 stroke-[2.8]" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white sm:text-sm">{b.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/70">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/15 pt-4">
            <a
              href={CONTACT.whatsapp(
                `Hello! I'm reading about "${card.title}" at VS Developers. Please share layout brochures and details.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:brightness-105"
            >
              <WhatsAppGlyph className="h-4 w-4" /> Quick Enquiry
            </a>
          </div>
        </div>

        <div className="relative hidden h-full flex-col justify-between sm:col-span-5 sm:flex">
          <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-white/20 shadow-xl">
            <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold-300">
                Verified Standard
              </span>
              <span className="text-[10px] text-white/70">VS Developers</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                {card.highlightMetric.label}
              </p>
              <p className="font-display text-2xl font-bold text-gold-300">
                {card.highlightMetric.value}
              </p>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold text-mint-200">
              Guaranteed
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Perspective3DStackCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FAF7F0] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest-600/20 bg-mint-50 px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-forest-600" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-forest-800">
              Why Choose VS Developers
            </span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-forest-900 sm:text-5xl">
            Building Communities. <em className="text-forest-700">Creating Value.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-forest-900/65 sm:text-base">
            Scroll to move through our legal assurance, delivered infrastructure, strategic growth corridors, and master planning.
          </p>
        </div>

        <div className="relative mt-12 h-[500vh]">
          <div className="sticky top-6 flex h-[600px] items-center justify-center [perspective:1400px] sm:h-[500px]">
            <div className="relative h-full w-full max-w-4xl">
              {STACK_CARDS.map((card, index) => (
                <ScrollStackCard
                  key={card.id}
                  card={card}
                  index={index}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
