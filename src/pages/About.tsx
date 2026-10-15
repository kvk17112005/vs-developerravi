import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cta,
  EASE,
  Icon,
  Magnetic,
  Reveal,
  SectionHeading,
  TextReveal,
  TrustBadges,
  usePageTitle,
} from "../components/ui";
import { CONTACT, TRUST_BADGES } from "../data/site";

const px = (id: number, w = 1400, h = 950) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const TIMELINE = [
  {
    year: "2014",
    title: "The first acre",
    desc: "VS Developers is founded in Bhattarahalli with a single acre of DC converted land and one promise — approvals before advertising.",
  },
  {
    year: "2017",
    title: "VS Heritage breaks ground",
    desc: "Our flagship 5-acre layout on Old Madras Road begins. Avenue trees are planted before the first plot is sold.",
  },
  {
    year: "2019",
    title: "100th plot registered",
    desc: "We cross 100 registered plots. 40% of that year's buyers came from referrals — the only marketing we've ever needed.",
  },
  {
    year: "2022",
    title: "Expanding East",
    desc: "VS Rosemeadows launches as a DTCP approved & DC converted layout at Sulibele Road, with our largest plots yet.",
  },
  {
    year: "2025",
    title: "VS Yogitha & beyond",
    desc: "1800+ plots delivered across 110+ acres. VS Yogitha opens in the Budigere growth corridor, minutes from Old Madras Road.",
  },
];

const VALUES = [
  {
    icon: "scale",
    title: "Transparency",
    desc: "Every approval, every charge, every clause — on paper and explained line by line, before you commit.",
  },
  {
    icon: "shield",
    title: "Reliability",
    desc: "Roads, trees, power, water. What's in the brochure is on the ground — usually before handover.",
  },
  {
    icon: "heart",
    title: "Customer-first",
    desc: "Ten years of the same family at the same desk. Your call is answered on the second ring.",
  },
];

function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub: string }) {
  return (
    <section className="relative overflow-hidden bg-mint-50 pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="paper-grain absolute inset-0 opacity-60" />
      <div className="absolute -right-32 -top-24 h-80 w-80 rounded-full bg-mint-300/50 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-300/25 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-gold-500/70" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
              {eyebrow}
            </span>
            <span className="h-px w-9 bg-gold-500/70" />
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-900 sm:text-6xl">
            <TextReveal mode="character">{title}</TextReveal>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-forest-900/65 sm:text-lg">
            <TextReveal>{sub}</TextReveal>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  usePageTitle("About Us | VS Developers | A Trusted Property Partner");

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            A decade of doing land
            <em className="text-forest-600"> right.</em>
          </>
        }
        sub="VS Developers is a family-run plotted-development company from Bengaluru East — built on approvals-first discipline, green layouts and the kind of trust that turns buyers into neighbours."
      />

      {/* story */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-gold-500/70" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
                  The VS Way
                </span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-900 sm:text-5xl">
                Approvals first.
                <br />
                Marketing <em className="text-forest-600">never.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 leading-relaxed text-forest-900/70">
                Most developers sell a dream and chase papers later. We do it backwards.
                Before a single VS plot is offered, the land is DC converted, the layout
                is DTCP approved, and the titles have passed our legal desk
                twice. It takes longer. It costs more. And it's why banks smile at our
                buyers.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 leading-relaxed text-forest-900/70">
                We build modestly too — no marble lobbies, no celebrity hoardings. Our
                budget goes into 40-foot roads, avenue trees, underground drainage and
                honest paperwork. The result: layouts that feel like neighbourhoods the
                day the fences come down.
              </p>
            </Reveal>
            <Reveal delay={0.28} className="mt-8">
              <TrustBadges />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <img
                src={px(17846380)}
                alt="VS Heritage layout from above"
                loading="lazy"
                className="col-span-2 h-56 w-full rounded-[1.75rem] object-cover card-shadow sm:h-64"
              />
              <img
                src={px(7581110)}
                alt="The VS team reviewing site plans"
                loading="lazy"
                className="h-44 w-full rounded-[1.75rem] object-cover card-shadow sm:h-52"
              />
              <img
                src={px(12029158)}
                alt="Avenue plantation"
                loading="lazy"
                className="h-44 w-full rounded-[1.75rem] object-cover card-shadow sm:h-52"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* timeline */}
      <section className="overflow-hidden bg-mint-50 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The Journey"
            title={
              <>
                Ten years, <em className="text-forest-600">tree by tree.</em>
              </>
            }
          />
          <div className="relative mt-16">
            <motion.div
              className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-gold-500/60 via-forest-600/30 to-transparent sm:left-1/2"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.6, ease: EASE }}
              style={{ transformOrigin: "top" }}
            />
            <div className="space-y-10 sm:space-y-0">
              {TIMELINE.map((t, i) => (
                <Reveal
                  key={t.year}
                  delay={i * 0.05}
                  className={`relative flex flex-col gap-3 pl-14 sm:w-1/2 sm:pl-0 ${
                    i % 2 === 0
                      ? "sm:pr-14 sm:text-right"
                      : "sm:ml-auto sm:pl-14"
                  }`}
                >
                  <span
                    className={`absolute left-5 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-gold-500 bg-white sm:top-2 ${
                      i % 2 === 0 ? "sm:left-auto sm:right-0 sm:translate-x-1/2" : "sm:left-0 sm:-translate-x-1/2"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
                  </span>
                  <div className="rounded-[1.5rem] border border-forest-600/10 bg-white p-6 transition hover:border-forest-600/25 hover:shadow-lg">
                    <span className="font-display text-3xl font-semibold text-forest-600">
                      {t.year}
                    </span>
                    <h3 className="mt-1.5 font-display text-xl font-semibold text-forest-900">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-forest-900/60">
                      {t.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title={
              <>
                Three words we <em className="text-forest-600">work by.</em>
              </>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.12}>
                <div className="h-full rounded-[1.75rem] border border-forest-600/10 bg-mint-50 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-forest-600/25 hover:shadow-[0_30px_60px_-30px_rgba(23,86,49,0.35)]">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-600 text-white">
                    <Icon name={v.icon} className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-forest-900">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest-900/60">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* leadership note */}
          <Reveal delay={0.1} className="mt-20">
            <div className="relative overflow-hidden rounded-[2rem] bg-forest-800 px-8 py-12 text-white sm:px-14">
              <div className="paper-grain absolute inset-0 opacity-30" />
              <span className="absolute right-8 top-6 font-display text-7xl text-white/10 select-none">
                "
              </span>
              <div className="relative grid items-center gap-8 sm:grid-cols-[auto_1fr]">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-500 font-display text-2xl font-semibold text-forest-900">
                  VS
                </span>
                <div>
                  <blockquote className="font-display text-xl font-medium leading-relaxed text-white/90 sm:text-2xl">
                    "Anyone can sell a plot. We wanted to sell a promise our own
                    children could sign. Ten years later, that signature still hasn't
                    bounced."
                  </blockquote>
                  <p className="mt-5 text-sm font-bold text-gold-300">V. Srinivas</p>
                  <p className="text-xs text-white/55">Founder & Managing Partner, VS Developers</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* certifications */}
      <section className="bg-mint-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Certifications & Approvals"
            title={
              <>
                Papers you can <em className="text-forest-600">frame.</em>
              </>
            }
            sub="Every VS layout carries the full stack of statutory approvals. Originals are available for inspection at our office — any day, no appointment needed."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {TRUST_BADGES.map((b, i) => (
              <Reveal key={b} delay={i * 0.08}>
                <div className="group h-full rounded-[1.5rem] border border-forest-600/10 bg-white p-6 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-lg">
                  <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint-100 text-forest-600 transition group-hover:bg-forest-600 group-hover:text-white">
                    <span className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-gold-500/60" />
                    <Icon name="seal" className="h-7 w-7" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-forest-900">{b}</p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-forest-900/50">
                    Verified & available for inspection
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-6">
              <p className="max-w-xl text-sm leading-relaxed text-forest-900/60">
                Have questions about approvals, conversions or titles? Our desk is open.
              </p>
              <Magnetic>
                <Cta to="/contact" variant="solid">
                  Talk to our team <Icon name="arrowR" className="h-4 w-4" />
                </Cta>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* quick contact strip */}
      <section className="bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="text-sm text-forest-900/60">
            Prefer a call?{" "}
            <a href={CONTACT.phoneHref} className="font-bold text-forest-600">
              {CONTACT.phone}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${CONTACT.email}`} className="font-bold text-forest-600">
              {CONTACT.email}
            </a>
          </p>
          <Link to="/projects" className="text-xs font-bold uppercase tracking-[0.2em] text-forest-600 hover:text-forest-700">
            Explore our projects →
          </Link>
        </div>
      </section>
    </>
  );
}
