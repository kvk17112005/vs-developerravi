import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CONTACT, PROJECTS } from "../data/site";
import { cn } from "../utils/cn";
import { Cta, Icon, Magnetic, Reveal, SectionHeading } from "./ui";

interface ComparisonRow {
  category: string;
  feature: string;
  heritage: string;
  rosemeadows: string;
  yogitha: string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    category: "Overview",
    feature: "Micro-Market Location",
    heritage: "Vemagal-Kurugal, Karnataka",
    rosemeadows: "Vemagal-Kurugal, Karnataka",
    yogitha: "Vemagal Hosahalli",
  },
  {
    category: "Overview",
    feature: "Total Land Extent",
    heritage: "12.5 Acres",
    rosemeadows: "4.7 Acres",
    yogitha: "6.8 Acres",
  },
  {
    category: "Overview",
    feature: "Total Plotted Units",
    heritage: "148 Plots",
    rosemeadows: "71 Plots",
    yogitha: "76 Plots",
  },
  {
    category: "Overview",
    feature: "Plot Dimensions",
    heritage: "30×50 & 40×60 ft",
    rosemeadows: "Starts at 30×40 ft",
    yogitha: "30×40 & 30×50 ft",
    highlight: true,
  },
  {
    category: "Approvals",
    feature: "Government Approvals",
    heritage: "DC Converted · DTCP Approved",
    rosemeadows: "DC Converted · DTCP Approved",
    yogitha: "DC Converted · DTCP Approved",
    highlight: true,
  },
  {
    category: "Approvals",
    feature: "Bank Loan Availability",
    heritage: "Approved (SBI, HDFC, ICICI, LIC)",
    rosemeadows: "Approved (SBI, HDFC, ICICI, Canara)",
    yogitha: "Approved (Major Nationalized Banks)",
  },
  {
    category: "Infrastructure",
    feature: "Internal Road Widths",
    heritage: "30' & 40' Asphalt Roads",
    rosemeadows: "33' & 40' Wide Boulevard",
    yogitha: "30' Wide Asphalt Roads",
  },
  {
    category: "Infrastructure",
    feature: "Utilities Included",
    heritage: "Underground UGD, Water & Power",
    rosemeadows: "Underground UGD, Water & Power",
    yogitha: "Underground UGD, Water & Power",
  },
  {
    category: "Lifestyle",
    feature: "Signature Amenity",
    heritage: "Avenue Shade Trees & Central Park",
    rosemeadows: "Landscaped Rose Meadow & 800m Track",
    yogitha: "Kids Play Park & Double-Road Corners",
  },
  {
    category: "Lifestyle",
    feature: "Ideal Buyer Profile",
    heritage: "Families seeking immediate construction",
    rosemeadows: "Luxury spacious custom villa buyers",
    yogitha: "IT professionals & rental yield seekers",
    highlight: true,
  },
];

const CATEGORIES = ["All", "Overview", "Approvals", "Infrastructure", "Lifestyle"] as const;

export default function ProjectComparison({ className }: { className?: string }) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [activeTabMobile, setActiveTabMobile] = useState<number>(0);

  const filteredRows =
    activeCategory === "All"
      ? COMPARISON_DATA
      : COMPARISON_DATA.filter((r) => r.category === activeCategory);

  return (
    <section className={cn("relative overflow-hidden bg-mint-50 py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Side-by-Side Comparison"
          title={
            <>
              Compare layouts. <em className="text-forest-600">Choose with clarity.</em>
            </>
          }
          sub="Transparent specifications, government approvals, and connectivity highlights for every VS plotted development in Bengaluru East."
        />

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer",
                activeCategory === cat
                  ? "bg-forest-600 text-white shadow-md shadow-forest-600/20"
                  : "border border-forest-600/20 bg-white text-forest-800 hover:border-forest-600/50 hover:bg-mint-100/60"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Comparison Table */}
        <div className="mt-12 hidden overflow-hidden rounded-[2rem] border border-forest-600/15 bg-white shadow-xl lg:block">
          {/* Table Header Cards */}
          <div className="grid grid-cols-4 border-b border-forest-600/10 bg-mint-100/70 p-6">
            <div className="flex flex-col justify-end pr-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">
                Key Parameters
              </span>
              <p className="mt-1 text-sm font-semibold text-forest-900">
                Compare project specifications
              </p>
            </div>

            {PROJECTS.map((p) => (
              <div key={p.slug} className="flex flex-col justify-between px-4">
                <div>
                  <h3 className="mt-0 font-display text-2xl font-semibold text-forest-900">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-forest-600">
                    {p.location.split(",")[0]}
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-forest-700 hover:text-forest-900 hover:underline"
                  >
                    View Layout <Icon name="arrowR" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Table Body Rows */}
          <div className="divide-y divide-forest-600/10">
            {filteredRows.map((row, idx) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                className={cn(
                  "grid grid-cols-4 items-center p-5 transition hover:bg-mint-50/70",
                  row.highlight && "bg-mint-50/40"
                )}
              >
                <div className="pr-4">
                  <span className="block text-xs font-bold uppercase tracking-wide text-forest-900/80">
                    {row.feature}
                  </span>
                  <span className="text-[10px] font-medium text-forest-900/40">
                    {row.category}
                  </span>
                </div>

                <div className="px-4 text-sm font-medium text-forest-800">
                  {row.heritage}
                </div>

                <div className="px-4 text-sm font-medium text-forest-800">
                  {row.rosemeadows}
                </div>

                <div className="px-4 text-sm font-medium text-forest-800">
                  {row.yogitha}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table Footer Actions */}
          <div className="grid grid-cols-4 items-center border-t border-forest-600/10 bg-mint-100/50 p-6">
            <div className="pr-4">
              <span className="font-display text-base font-semibold text-forest-900">
                Ready to decide?
              </span>
              <p className="text-xs text-forest-900/60">Schedule your guided site tour.</p>
            </div>

            {PROJECTS.map((p) => (
              <div key={p.slug} className="px-4">
                <a
                  href={CONTACT.whatsapp(
                    `Hello VS Developers! I am comparing your projects and interested in ${p.name}. Please share details.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-forest-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-forest-700 shadow-sm"
                >
                  Enquire {p.shortName} <Icon name="arrowR" className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Interactive Tabs View */}
        <div className="mt-8 block lg:hidden">
          {/* Mobile Project Selector Buttons */}
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-1.5 shadow-sm">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.slug}
                onClick={() => setActiveTabMobile(idx)}
                className={cn(
                  "rounded-xl py-2.5 text-center text-xs font-bold transition cursor-pointer",
                  activeTabMobile === idx
                    ? "bg-forest-600 text-white shadow-md"
                    : "text-forest-800 hover:bg-mint-100"
                )}
              >
                {p.shortName}
              </button>
            ))}
          </div>

          {/* Mobile Active Project Card */}
          {(() => {
            const cur = PROJECTS[activeTabMobile];
            const getVal = (row: ComparisonRow) => {
              if (activeTabMobile === 0) return row.heritage;
              if (activeTabMobile === 1) return row.rosemeadows;
              return row.yogitha;
            };

            return (
              <div className="mt-6 overflow-hidden rounded-[2rem] border border-forest-600/15 bg-white p-6 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-forest-900">
                      {cur.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-forest-600">
                      {cur.location}
                    </p>
                  </div>
                  <Link
                    to={`/projects/${cur.slug}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-100 text-forest-700"
                  >
                    <Icon name="arrowR" className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-6 divide-y divide-forest-600/10">
                  {filteredRows.map((row) => (
                    <div
                      key={row.feature}
                      className={cn(
                        "flex items-center justify-between py-3.5",
                        row.highlight && "bg-mint-50/60 -mx-4 px-4 rounded-lg"
                      )}
                    >
                      <span className="text-xs font-bold text-forest-900/70">
                        {row.feature}
                      </span>
                      <span className="text-right text-xs font-semibold text-forest-900 max-w-[55%]">
                        {getVal(row)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <a
                    href={CONTACT.whatsapp(
                      `Hello VS Developers! I am interested in exploring ${cur.name}. Please share details.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-full bg-forest-600 py-3 text-center text-xs font-bold text-white shadow-md transition hover:bg-forest-700"
                  >
                    Enquire Now
                  </a>
                  <Link
                    to={`/projects/${cur.slug}`}
                    className="rounded-full border border-forest-600/20 px-5 py-3 text-center text-xs font-bold text-forest-800 hover:bg-mint-100"
                  >
                    View Layout
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Bottom Recommendation Helper */}
        <Reveal delay={0.15} className="mt-14">
          <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-r from-forest-900 to-forest-800 p-8 text-white sm:flex-row sm:px-12">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">
                Need Help Shortlisting?
              </span>
              <h4 className="mt-1 font-display text-xl font-semibold sm:text-2xl">
                Let our legal & layout team guide your selection.
              </h4>
              <p className="mt-1.5 text-xs text-white/70 max-w-xl">
                We'll walk you through survey sketches, approval certificates, and plot dimension options for all 3 layouts over WhatsApp or a cup of tea.
              </p>
            </div>
            <Magnetic>
              <Cta href={CONTACT.whatsapp("Hello! I'd like a personalized layout comparison & recommendation.")} variant="gold" className="shrink-0">
                Compare with an Expert <Icon name="arrowR" className="h-4 w-4" />
              </Cta>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}