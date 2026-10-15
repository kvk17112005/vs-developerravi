import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  CONTACT,
  HERO_POSTER,
  HERO_VIDEO,
  PROJECTS,
  SERVICES,
  STATS,
  TESTIMONIALS,
  WHY_STEPS,
} from "../data/site";
import HotstarProjectSpotlight from "../components/HotstarProjectSpotlight";
import Coverflow3DProjectShowcase from "../components/Coverflow3DProjectShowcase";
import Perspective3DStackCards from "../components/Perspective3DStackCards";
import { cn } from "../utils/cn";
import {
  CountUp,
  Cta,
  CinematicSection,
  EASE,
  Field,
  Icon,
  inputCls,
  Magnetic,
  Parallax3DLayer,
  Reveal,
  Scroll3D,
  SectionHeading,
  TextReveal,
  TrustBadges,
  usePageTitle,
} from "../components/ui";

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const keepPlaying = (video: HTMLVideoElement) => {
    video.loop = true;
    void video.play().catch(() => {
      // Muted playback is retried when the browser is ready to play the stream.
    });
  };

  return (
    <section ref={heroRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ scale: videoScale, y: videoY }} className="absolute inset-0 h-full w-full">
        <video
          className="h-full w-full object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={(event) => keepPlaying(event.currentTarget)}
          onEnded={(event) => {
            const video = event.currentTarget;
            video.currentTime = 0;
            keepPlaying(video);
          }}
          onPause={(event) => {
            const video = event.currentTarget;
            if (!video.ended && document.visibilityState === "visible") keepPlaying(video);
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/80 via-forest-900/35 to-forest-900/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-900/40 to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-24 sm:px-8 sm:pb-28"
      >

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
          className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-gold-300"
        >
          <span className="h-px w-10 bg-gold-400/80" />
          Plotted Developments · Bengaluru East
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
          className="mt-4 max-w-4xl font-display text-[42px] font-semibold leading-[1.04] tracking-tight text-white drop-shadow-xl sm:text-6xl lg:text-7xl"
        >
          <TextReveal mode="character">
            Own a piece of Bengaluru's
            <span className="text-mint-200"> greenest </span>
            <em className="text-gold-300">future.</em>
          </TextReveal>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          <TextReveal>
            DTCP approved & DC converted gated layouts with wide tree-lined roads, ready
            utilities and bank-ready titles — 1800+ plots across 110+ acres, since 2014.
          </TextReveal>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Cta to="/projects" variant="gold">
              Explore Projects <Icon name="arrowR" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Cta>
          </Magnetic>
          <Magnetic>
            <Cta to="/contact" variant="outlineLight">
              <Icon name="phone" className="h-4 w-4" /> Book a Site Visit
            </Cta>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="mt-10 hidden md:block"
        >
          <TrustBadges />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70">
          Scroll
        </span>
        <span className="relative h-9 w-5 rounded-full border border-white/40">
          <motion.span
            className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold-300"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

/* ------------------------------ stats ------------------------------ */

function Stats() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="relative text-center">
            {i > 0 && (
              <span className="absolute left-0 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold-500/50 to-transparent lg:block" />
            )}
            <p className="font-display text-5xl font-semibold tracking-tight text-forest-700 sm:text-6xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-forest-900/70">
              {s.label}
            </p>
            <p className="mt-1 text-xs text-forest-900/45">{s.sub}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ about snapshot --------------------- */

function AboutSnapshot() {
  return (
    <section className="overflow-hidden bg-mint-50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative">
          <Scroll3D intensity={10} className="relative">
            <div className="hover-card relative overflow-hidden rounded-[2rem] card-shadow">
              <img
                src="https://images.pexels.com/photos/31737842/pexels-photo-31737842.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=1000"
                alt="A green villa inside a VS Developers layout"
                className="h-[420px] w-full object-cover sm:h-[500px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/90 p-4 backdrop-blur">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-600">
                    Since 2014
                  </p>
                  <p className="mt-0.5 font-display text-lg font-semibold text-forest-800">
                    A family-run developer
                  </p>
                </div>
                <Icon name="tree" className="h-8 w-8 text-forest-600" />
              </div>
            </div>
          </Scroll3D>
          <Parallax3DLayer depth={30} className="absolute -right-3 -top-5 z-20 sm:-right-6">
            <div className="rounded-2xl border border-gold-500/30 bg-white px-5 py-4 shadow-2xl">
              <p className="font-display text-3xl font-semibold text-forest-700">10+</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest-900/55">
                Years of Trust
              </p>
            </div>
          </Parallax3DLayer>
        </Reveal>

        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-gold-500/70" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
                About VS Developers
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-900 sm:text-5xl">
              We don't sell land.
              <br />
              We build <em className="text-forest-600">neighbourhoods.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 leading-relaxed text-forest-900/70">
              From our desk in TC Palya, we've spent a decade turning raw Bengaluru
              East acreage into approval-perfect, tree-lined plotted layouts. Every VS
              development is DC converted, DTCP approved and bank-loan
              ready — before a single plot is sold.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-7 space-y-4">
              {[
                "Clean titles, vetted twice by our legal desk",
                "Infrastructure delivered before handover",
                "Same family at the same desk for 10 years",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm font-semibold text-forest-800">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-200 text-forest-700">
                    <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.28} className="mt-9 flex flex-wrap items-center gap-5">
            <Magnetic>
              <Cta to="/about">Our Story <Icon name="arrowR" className="h-4 w-4" /></Cta>
            </Magnetic>
            <TrustBadges className="max-w-sm" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------- featured projects ------------------ */

function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-gold-500/70" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
                Featured Projects
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-900 sm:text-5xl">
              Three layouts.
              <br />
              One standard of <em className="text-forest-600">trust.</em>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-900/65">
              Explore the VS portfolio — DC converted, DTCP approved, green, and ready to build on.
            </p>
          </Reveal>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border border-forest-600/20 text-forest-800 transition",
                canScrollLeft
                  ? "bg-white hover:bg-mint-100 hover:border-forest-600 cursor-pointer shadow-sm"
                  : "opacity-40 cursor-not-allowed bg-forest-50"
              )}
              aria-label="Previous projects"
            >
              <Icon name="chevL" className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border border-forest-600/20 text-forest-800 transition",
                canScrollRight
                  ? "bg-white hover:bg-mint-100 hover:border-forest-600 cursor-pointer shadow-sm"
                  : "opacity-40 cursor-not-allowed bg-forest-50"
              )}
              aria-label="Next projects"
            >
              <Icon name="chevR" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-2"
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.slug}
              className="w-[85vw] shrink-0 snap-start sm:w-[380px] md:w-[420px]"
            >
              <div className="group hover-card relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-forest-800 card-shadow hover:shadow-2xl">
                <div className="relative h-[320px] w-full overflow-hidden sm:h-[360px]">
                  <img
                    src={p.heroImage}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/95 via-forest-900/30 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-gold-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-forest-900 shadow-md">
                    {p.status}
                  </span>
                  <span className="absolute right-5 top-5 rounded-full bg-forest-900/70 px-3.5 py-1.5 text-[10px] font-bold text-white shadow-sm">
                    0{i + 1}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-mint-300">
                      {p.location}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-white transition-colors duration-500 group-hover:text-gold-300 sm:text-3xl">
                      {p.name}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 pt-4 bg-forest-900">
                  <p className="line-clamp-2 text-sm leading-relaxed text-white/70">
                    {p.tagline}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs font-semibold text-mint-200">
                      {p.areaAcres} acres · {p.plotCount} plots
                    </span>
                    <Link
                      to={`/projects/${p.slug}`}
                      className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-forest-900 transition group-hover:bg-gold-400"
                    >
                      Details <Icon name="arrowR" className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Compare All Three End Card */}
          <div className="w-[85vw] shrink-0 snap-start sm:w-[320px]">
            <div className="hover-card flex h-full min-h-[380px] flex-col items-center justify-center rounded-[2rem] border border-gold-500/20 bg-[#faf6ee] p-8 text-center card-shadow">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-900/5 text-forest-800">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
              </span>
              <h3 className="hover-title mt-5 font-display text-2xl font-semibold leading-snug text-forest-900">
                Compare all three,
                <br />
                side by side.
              </h3>
              <div className="mt-6">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c2984f] px-7 py-3.5 text-sm font-bold text-forest-950 shadow-md transition-all hover:bg-[#b08740] hover:-translate-y-0.5"
                >
                  All Projects <Icon name="arrowR" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ services --------------------------- */

function Services() {
  return (
    <section className="bg-mint-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title={
            <>
              Six services. One <em className="text-forest-600">promise.</em>
            </>
          }
          sub="From the first title search to your first concrete pour — everything a plotted-development partner should do, done properly."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.1}>
              <Scroll3D intensity={6} scaleEffect={false} className="h-full">
                <div className="hover-card group h-full rounded-[1.75rem] border border-forest-600/10 bg-white p-7 hover:border-forest-600/25 hover:shadow-[0_30px_60px_-30px_rgba(23,86,49,0.35)]">
                  <div className="hover-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-100 text-forest-600 transition-colors duration-500 group-hover:bg-forest-600 group-hover:text-white">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="hover-title mt-5 font-display text-xl font-semibold text-forest-900">
                    {s.title}
                  </h3>
                  <p className="hover-desc mt-2.5 text-sm leading-relaxed text-forest-900/60">{s.desc}</p>
                  <span className="mt-5 block h-[2px] w-8 rounded-full bg-gold-500 transition-all duration-500 group-hover:w-16" />
                </div>
              </Scroll3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------- why-vs section ---------------------- */

function WhySection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-forest-800 py-20 text-white sm:py-28">
      <div className="paper-grain absolute inset-0 opacity-30" />
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(46,125,79,0.35)_0%,transparent_70%)]" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(201,161,90,0.18)_0%,transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-gold-400/80" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-300">
              The VS Standard
            </span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl text-white">
            Why VS <em className="text-mint-300 font-normal italic">Developers?</em>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Six reasons families keep choosing our plotted communities across Bengaluru East.
          </p>

          <div className="mt-10 min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span className="font-display text-5xl font-semibold text-white/15">
                  0{active + 1}
                </span>
                <h3 className="mt-2 font-display text-3xl font-semibold text-gold-300">
                  {WHY_STEPS[active].title}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-white/70">
                  {WHY_STEPS[active].desc}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex items-center gap-2">
              {WHY_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Step ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    i === active ? "w-10 bg-gold-400" : "w-4 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:content-center">
          {WHY_STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setActive(i)}
              className={cn(
                "flex flex-col items-start gap-3 rounded-3xl border p-6 text-left transition-all duration-300 cursor-pointer sm:p-7",
                i === active
                  ? "border-gold-400/60 bg-white text-forest-900 shadow-2xl scale-[1.02]"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20"
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300",
                  i === active
                    ? "bg-mint-100 text-forest-600"
                    : "bg-white/10 text-mint-200"
                )}
              >
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <span
                className={cn(
                  "font-display text-base font-semibold leading-snug sm:text-lg",
                  i === active ? "text-forest-900" : "text-white/85"
                )}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- testimonials -------------------------- */

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setI((v) => (v + 1) % TESTIMONIALS.length),
      6500,
    );
    return () => window.clearInterval(id);
  }, []);

  const t = TESTIMONIALS[i];

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Word that travels <em className="text-forest-600">tree to tree.</em>
            </>
          }
        />
        <div className="relative mt-14 min-h-[300px] sm:min-h-[260px]">
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-display text-[160px] leading-none text-mint-200 select-none">
            "
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="relative"
            >
              <blockquote className="mx-auto max-w-3xl font-display text-xl font-medium leading-relaxed text-forest-800 sm:text-2xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-600 font-display text-sm font-semibold text-white">
                  {t.initials}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold text-forest-900">{t.name}</span>
                  <span className="block text-xs text-forest-900/55">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                idx === i ? "w-8 bg-forest-600" : "w-2 bg-forest-600/20 hover:bg-forest-600/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- schedule visit ------------------------ */

function ScheduleVisit() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    project: PROJECTS[0].slug,
    date: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = PROJECTS.find((x) => x.slug === form.project);
    window.open(
      CONTACT.whatsapp(
        `Hello VS Developers! I'd like to schedule a site visit.\n\nName: ${form.name}\nPhone: ${form.phone}\nProject: ${p?.name ?? "Any"}\nPreferred date: ${form.date || "Flexible"}`,
      ),
      "_blank",
    );
  };

  return (
    <section className="relative overflow-hidden bg-mint-100 py-20 sm:py-28">
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(183,229,188,0.5)_0%,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-gold-500/70" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
                Schedule a Visit
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-900 sm:text-5xl">
              See the land.
              <br />
              Read the papers.
              <br />
              <em className="text-forest-600">Then decide.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-forest-900/70">
              Site visits run every day, 9:30 AM – 7 PM. We'll pick you up from the
              metro if you'd like, walk you through every approval document, and show
              you the exact plot boundaries.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <ul className="mt-7 space-y-3 text-sm font-semibold text-forest-800">
              {[
                "No-pressure walkthrough with our senior team",
                "All approvals & title documents laid out",
                "Tea, yes. Hard sell, never.",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-600 text-white">
                    <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Scroll3D intensity={7} className="w-full">
            <form
              onSubmit={submit}
              className="rounded-[2rem] border border-forest-600/10 bg-white p-7 card-shadow sm:p-9"
            >
              <h3 className="font-display text-2xl font-semibold text-forest-900">
                Book your visit
              </h3>
              <p className="mt-1.5 text-sm text-forest-900/55">
                Takes 20 seconds. We confirm on WhatsApp.
              </p>
              <div className="mt-6 space-y-4">
                <Field label="Full name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone / WhatsApp">
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 ..."
                    className={inputCls}
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Project">
                    <select
                      value={form.project}
                      onChange={(e) => setForm({ ...form, project: e.target.value })}
                      className={inputCls}
                    >
                      {PROJECTS.map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Preferred date">
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className={inputCls}
                    />
                  </Field>
                </div>
                <Cta type="submit" className="w-full">
                  Confirm via WhatsApp
                </Cta>
                <p className="text-center text-[11px] text-forest-900/45">
                  Or call us directly at{" "}
                  <a href={CONTACT.phoneHref} className="font-bold text-forest-600">
                    {CONTACT.phone}
                  </a>
                </p>
              </div>
            </form>
          </Scroll3D>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- locations teaser ---------------------- */

function Locations() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Where We Build"
          title={
            <>
              Bengaluru East's <em className="text-forest-600">green corridor.</em>
            </>
          }
          sub="Three layouts along the fastest-growing arc of the city — close to metro lines, IT corridors and airport roads."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.12}>
              <Link
                to={`/projects/${p.slug}`}
                className="group hover-card block h-full rounded-[1.75rem] border border-forest-600/10 bg-mint-50 p-7 hover:border-forest-600/25 hover:shadow-[0_30px_60px_-30px_rgba(23,86,49,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-600 text-white">
                    <Icon name="mapPin" className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-gold-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-700">
                    {p.status}
                  </span>
                </div>
                <h3 className="hover-title mt-5 font-display text-2xl font-semibold text-forest-900">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-sm font-semibold text-forest-600">{p.location}</p>
                <p className="hover-desc mt-3 line-clamp-2 text-sm leading-relaxed text-forest-900/60">
                  {p.locationAdvantages[0]} · {p.locationAdvantages[1]}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-forest-600">
                  View Layout
                  <Icon
                    name="arrowR"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <div className="flex flex-col items-center justify-between gap-5 rounded-[1.75rem] bg-forest-800 px-8 py-7 text-white sm:flex-row">
            <div>
              <p className="font-display text-xl font-semibold sm:text-2xl">
                Ready to walk a layout this week?
              </p>
              <p className="mt-1 text-sm text-white/65">
                Visits every day · 9:30 AM – 7 PM · Pickup available
              </p>
            </div>
            <Magnetic>
              <Cta href={CONTACT.whatsapp("Hello! I'd like to book a site visit.")} variant="gold">
                <Icon name="phone" className="h-4 w-4" /> Book a Site Visit
              </Cta>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ page ------------------------------- */

export default function Home() {
  usePageTitle("VS Developers | Plotted Developments in Bengaluru | A Trusted Property Partner");
  return (
    <>
      <CinematicSection first>
        <Hero />
      </CinematicSection>
      <CinematicSection>
        <Stats />
      </CinematicSection>
      <CinematicSection>
        <HotstarProjectSpotlight />
      </CinematicSection>
      <CinematicSection>
        <AboutSnapshot />
      </CinematicSection>
      <CinematicSection>
        <Perspective3DStackCards />
      </CinematicSection>
      <CinematicSection>
        <Coverflow3DProjectShowcase />
      </CinematicSection>
      <CinematicSection>
        <FeaturedProjects />
      </CinematicSection>
      <CinematicSection>
        <Services />
      </CinematicSection>
      <CinematicSection>
        <WhySection />
      </CinematicSection>
      <CinematicSection>
        <Testimonials />
      </CinematicSection>
      <CinematicSection>
        <ScheduleVisit />
      </CinematicSection>
      <CinematicSection>
        <Locations />
      </CinematicSection>
    </>
  );
}
