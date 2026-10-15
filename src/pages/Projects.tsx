import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cta,
  EASE,
  Icon,
  Magnetic,
  ParallaxImage,
  Reveal,
  ScrollText,
  TextReveal,
  WhatsAppGlyph,
  usePageTitle,
} from "../components/ui";
import { CONTACT, PROJECTS } from "../data/site";
import { cn } from "../utils/cn";

const TRUST_TICKER = [
  "DTCP Approved",
  "DC Converted",
  "Clear Titles",
  "Bank Loan Ready",
  "On-time Registration",
];

export default function Projects() {
  usePageTitle("Our Projects | VS Developers | Plotted Developments in Bengaluru");

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mint-50/80 via-mint-50/40 to-white pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-forest-900/60">
            <Link to="/" className="hover:text-forest-800 transition">
              Home
            </Link>
            <span>→</span>
            <span className="text-forest-900 font-bold">Our Projects</span>
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mt-8 max-w-3xl"
          >
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-600">
              <span className="h-2 w-2 rotate-45 bg-gold-500" />
              CURATED PLOTTED DEVELOPMENTS
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-950 sm:text-6xl">
              <TextReveal mode="character">
                Three layouts.{" "}
                <span className="relative inline-block italic font-normal text-forest-900 underline decoration-gold-400 decoration-2 underline-offset-8">
                  One standard.
                </span>
              </TextReveal>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-forest-900/70 sm:text-lg">
              <ScrollText>
                Every VS layout is DTCP approved & DC converted before it reaches this page. Explore each — then come walk the land.
              </ScrollText>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alternating Showcase Cards */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-24 sm:space-y-32">
          {PROJECTS.map((p, idx) => {
            const reverseLayout = idx % 2 === 1;

            // Badges matching the demo screenshots
            const badges = [
              `${p.areaAcres} acres`,
              `${p.plotCount} plots`,
              p.sizes,
              "DTCP Approved",
              "DC Converted",
            ];

            const isSoldOut =
              p.status === "Sold Out" || p.status === "100% Sold Out" || p.status === "Completed";
            const statusBadgeText = isSoldOut ? "100% SOLD OUT" : p.status.toUpperCase();
            const statusBadgeColor = isSoldOut ? "bg-[#1f6b3d] text-white" : "bg-gold-500 text-forest-950";

            return (
              <Reveal key={p.slug} delay={idx * 0.12} y={36}>
                <div className="group/card grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  {/* Image Column */}
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[2rem] shadow-xl transition-transform duration-500 group-hover/card:-translate-y-1.5 group",
                      reverseLayout && "lg:order-2"
                    )}
                  >
                    <ParallaxImage
                      src={p.heroImage}
                      alt={p.name}
                      loading="lazy"
                      className="h-[360px] w-full object-cover sm:h-[440px] transition-transform duration-700 group-hover:scale-105"
                      depth={22}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent" />
                  </div>

                  {/* Details Column */}
                  <div className={cn(reverseLayout && "lg:order-1")}>
                    {/* Status Pill */}
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider",
                          statusBadgeColor
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        {statusBadgeText}
                      </span>
                    </div>

                    {/* Title & Location */}
                    <h2 className="mt-4 font-display text-4xl font-semibold text-forest-950 transition-colors duration-500 group-hover/card:text-forest-600 sm:text-5xl">
                      <TextReveal mode="character">{p.name}</TextReveal>
                    </h2>
                    <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-forest-700">
                      <Icon name="mapPin" className="h-4 w-4 text-forest-600 shrink-0" />
                      {p.location}
                    </p>

                    {/* Specifications Pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-mint-100/90 border border-forest-600/15 px-3.5 py-1.5 text-xs font-bold text-forest-800 transition-colors duration-500 group-hover/card:border-forest-600/40 group-hover/card:bg-mint-200/90"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="mt-6 text-base leading-relaxed text-forest-900/70">
                      <TextReveal>{p.about}</TextReveal>
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Magnetic>
                        <Link
                          to={`/projects/${p.slug}`}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2e7d4f] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-forest-700/25 transition-all hover:bg-[#23633e] hover:-translate-y-0.5 cursor-pointer"
                        >
                          Explore Layout <Icon name="arrowR" className="h-4 w-4 transition-transform duration-500 group-hover/card:translate-x-1" />
                        </Link>
                      </Magnetic>

                      <Magnetic>
                        <a
                          href={CONTACT.whatsapp(
                            `Hello VS Developers! I would like more details about ${p.name}.`
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-600/25 bg-white px-6 py-3.5 text-sm font-bold text-forest-800 transition hover:bg-mint-100 hover:border-forest-600 cursor-pointer shadow-sm"
                        >
                          <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" /> Enquire
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-forest-600/10 bg-mint-50/50 py-6 overflow-hidden">
        <div className="animate-marquee marquee-track flex w-max text-xs font-bold uppercase tracking-widest text-forest-800">
          {[0, 1, 2, 3, 4].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy !== 0}
              className="marquee-group flex shrink-0 items-center gap-6 pr-6"
            >
              {TRUST_TICKER.map((item) => (
                <div key={`${copy}-${item}`} className="flex shrink-0 items-center gap-2">
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <div className="hover-card relative overflow-hidden rounded-[2.5rem] bg-[#175631] p-10 text-center text-white shadow-2xl sm:p-16">
              <div className="paper-grain absolute inset-0 opacity-20" />
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-forest-500/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl" />

              <div className="relative z-10 mx-auto max-w-2xl">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-300">
                  <span className="h-2 w-2 rotate-45 bg-gold-400" />
                  STILL DECIDING?
                </span>

                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl text-white">
                  One site visit is worth a hundred brochures.
                </h3>

                <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                  We'll walk you through the layout, the corner stones and the complete document set — morning or evening, any day of the week.
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <Magnetic>
                    <Cta to="/contact" variant="gold" className="px-8 py-4 text-base">
                      Schedule a Visit <Icon name="arrowR" className="h-4 w-4" />
                    </Cta>
                  </Magnetic>

                  <Magnetic>
                    <Link
                      to="/gallery"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                    >
                      Browse the Gallery
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
