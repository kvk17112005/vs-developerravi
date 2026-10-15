import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  CONTACT,
  getProject,
  PROJECTS,
  type GalleryItem,
} from "../data/site";
import {
  CountUp,
  Cta,
  EASE,
  Field,
  Icon,
  inputCls,
  Lightbox,
  Magnetic,
  ParallaxImage,
  Reveal,
  SectionHeading,
  TextReveal,
  TrustBadges,
  usePageTitle,
} from "../components/ui";

const PlotViewer = lazy(() => import("../components/three/PlotViewer"));

function ViewportFallback() {
  return (
    <div className="flex h-[420px] items-center justify-center rounded-3xl border border-forest-600/10 bg-gradient-to-b from-mint-50 to-mint-100 sm:h-[540px]">
      <div className="flex flex-col items-center gap-3 text-forest-600">
        <span className="animate-spin-slow h-10 w-10 rounded-full border-2 border-forest-600/20 border-t-forest-600" />
        <p className="text-xs font-bold uppercase tracking-[0.2em]">
          Loading 3D layout…
        </p>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.12],
  );
  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 64],
  );
  const { slug } = useParams();
  const project = getProject(slug ?? "");
  const [lb, setLb] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", plot: "" });

  usePageTitle(project ? `${project.name} | VS Developers | ${project.location}` : "Project | VS Developers");

  if (!project) return <Navigate to="/projects" replace />;

  const photos: GalleryItem[] = project.gallery.filter(
    (g) => g.type === "photo" || g.type === "360",
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      CONTACT.whatsapp(
        `Hello! I'm interested in a plot at ${project.name}.\n\nName: ${form.name}\nPhone: ${form.phone}\nPlot preference: ${form.plot || "Any available"}`,
      ),
      "_blank",
    );
  };

  const nextProject =
    PROJECTS[(PROJECTS.findIndex((p) => p.slug === project.slug) + 1) % PROJECTS.length];

  return (
    <>
      {/* ---------- hero ---------- */}
      <section ref={heroRef} className="relative h-[72vh] min-h-[480px] overflow-hidden">
        <motion.video
          style={{ scale: heroScale, y: heroY }}
          className="absolute inset-0 h-full w-full object-cover"
          src={project.video}
          poster={project.heroImage}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/75 via-forest-900/30 to-mint-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/50 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 sm:px-8">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            className="absolute left-5 top-24 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 sm:left-8"
          >
            <Link to="/projects" className="transition hover:text-gold-300">
              Projects
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-mint-200">{project.shortName}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
          >
            <span className="inline-block rounded-full bg-gold-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-forest-900">
              {project.status}
            </span>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <TextReveal mode="character">{project.name}</TextReveal>
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-mint-200 sm:text-base">
              <Icon name="mapPin" className="h-4.5 w-4.5 text-gold-300" />
              <TextReveal>{project.location}</TextReveal>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- facts bar ---------- */}
      <section className="relative z-10 -mt-10 px-5 sm:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 rounded-[1.75rem] border border-forest-600/10 bg-white p-6 card-shadow sm:grid-cols-5 sm:p-8">
          {[
            { v: project.areaAcres, suffix: "", label: "Acres" },
            { v: project.plotCount, suffix: "", label: "Plots" },
            { v: 0, suffix: "", label: "Plot Sizes", text: project.sizes },
            { v: 0, suffix: "", label: "Approvals", text: project.approvals },
            { v: 0, suffix: "", label: "Status", text: project.status },
          ].map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              className="text-center"
            >
              <p className="font-display text-2xl font-semibold text-forest-700 sm:text-3xl">
                {f.text ?? <CountUp to={f.v} suffix={f.suffix} />}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-forest-900/50">
                {f.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- about ---------- */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-gold-500/70" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
                  About {project.name}
                </span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-900 sm:text-5xl">
                  <TextReveal mode="character">{project.tagline}</TextReveal>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 leading-relaxed text-forest-900/70">
                <TextReveal>{project.about}</TextReveal>
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <TrustBadges />
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.highlights.map((h, i) => (
              <Reveal key={h} delay={i * 0.08}>
                <div className="flex h-full items-start gap-3.5 rounded-2xl border border-forest-600/10 bg-mint-50 p-5 transition hover:border-forest-600/25 hover:bg-mint-100">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest-600 text-white">
                    <Icon name="check" className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </span>
                  <p className="text-sm font-semibold leading-relaxed text-forest-800">
                    {h}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 3D plot viewer ---------- */}
      <section className="bg-mint-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Interactive Master Plan"
            title={
              <>
                Walk the layout — <em className="text-forest-600">before you visit.</em>
              </>
            }
            sub="Drag to rotate, hover any plot to see its size, and tap to enquire. Corner plots are shown in gold."
          />
          <Reveal className="mt-12">
            <Suspense fallback={<ViewportFallback />}>
              <PlotViewer
                plots={project.layout.plots}
                parks={project.layout.parks}
                name={project.name}
              />
            </Suspense>
          </Reveal>
        </div>
      </section>

      {/* ---------- amenities ---------- */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Amenities & Infrastructure"
            title={
              <>
                Delivered, <em className="text-forest-600">not promised.</em>
              </>
            }
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {project.amenities.map((a, i) => (
              <Reveal key={a.label} delay={(i % 4) * 0.08}>
                <div className="group h-full rounded-[1.5rem] border border-forest-600/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-forest-600/25 hover:shadow-[0_24px_50px_-28px_rgba(23,86,49,0.35)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-100 text-forest-600 transition group-hover:bg-forest-600 group-hover:text-white">
                    <Icon name={a.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">
                    {a.label}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-forest-900/60">
                    {a.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- location ---------- */}
      <section className="bg-mint-50 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-gold-500/70" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
                  Location Advantages
                </span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-900 sm:text-5xl">
                In the middle of
                <em className="text-forest-600"> everything.</em>
              </h2>
              {project.address && (
                <address className="mt-4 not-italic text-sm font-medium text-forest-800/70">
                  {project.address}
                </address>
              )}
            </Reveal>
            <div className="mt-8 space-y-4">
              {project.locationAdvantages.map((l, i) => (
                <Reveal key={l} delay={i * 0.08}>
                  <div className="flex items-center gap-4 rounded-2xl border border-forest-600/10 bg-white p-4.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint-100 text-forest-600">
                      <Icon name="mapPin" className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-semibold text-forest-800">{l}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] border border-forest-600/10 card-shadow">
              {project.mapUrl && (
                <a
                  href={project.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-forest-600/20 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-forest-800 shadow-md backdrop-blur transition hover:bg-forest-50 hover:text-forest-900"
                >
                  <span>View Location</span>
                  <Icon name="external" className="h-3.5 w-3.5 text-forest-600" />
                </a>
              )}
              <iframe
                title={`${project.name} location map`}
                src={project.mapEmbed || CONTACT.mapEmbed}
                className="h-[420px] w-full sm:h-full sm:min-h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {project.directionsUrl && (
                <a
                  href={project.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-forest-800 px-6 py-4 text-sm font-bold text-white transition hover:bg-forest-900"
                >
                  <span>Get Directions</span>
                  <Icon name="external" className="h-4 w-4 text-mint-300" />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- gallery ---------- */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title={
              <>
                {project.shortName} in <em className="text-forest-600">pictures.</em>
              </>
            }
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {photos.slice(0, 4).map((g, i) => (
              <Reveal key={g.src + i} delay={i * 0.07}>
                <button
                  onClick={() => setLb(i)}
                  className={`group relative block w-full overflow-hidden rounded-2xl ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <ParallaxImage
                    src={g.src.replace("w=1600&h=1000", i === 0 ? "w=1600&h=1200" : "w=800&h=600")}
                    alt={g.caption}
                    loading="lazy"
                    className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                      i === 0 ? "h-72 sm:h-[420px]" : "h-40 sm:h-52"
                    }`}
                    depth={12}
                  />
                  {g.type === "360" && (
                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-forest-900/80 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur">
                      <Icon name="rotate" className="h-3 w-3" /> 360°
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/80 to-transparent p-3 pt-8 text-left text-[11px] font-bold text-white opacity-0 transition duration-500 group-hover:opacity-100">
                    {g.caption}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
        <Lightbox
          items={photos.map((g) => ({ src: g.src, caption: g.caption }))}
          index={lb}
          onClose={() => setLb(null)}
          onNav={setLb}
        />
      </section>

      {/* ---------- enquiry form ---------- */}
      <section className="relative overflow-hidden bg-forest-800 py-16 text-white sm:py-24">
        <div className="paper-grain absolute inset-0 opacity-30" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-forest-600/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-gold-400/80" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-300">
                  Enquire Now
                </span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                This layout is filling up{" "}
                <em className="text-mint-300">quickly.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md leading-relaxed text-white/70">
                {project.plotCount} plots. {project.areaAcres} acres. Prices on
                request — because every plot deserves a real conversation, not a
                hoarding.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
              <a
                href={CONTACT.whatsapp(`Hello! I'd like details on plots at ${project.name}.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:brightness-105"
              >
                <Icon name="phone" className="h-4 w-4" /> WhatsApp Us
              </a>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                <Icon name="phone" className="h-4 w-4" /> {CONTACT.phone}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              className="rounded-[2rem] border border-white/10 bg-white/95 p-7 text-forest-900 card-shadow sm:p-9"
            >
              <h3 className="font-display text-2xl font-semibold">
                Get plot details & price
              </h3>
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
                <Field label="Plot preference (optional)">
                  <input
                    value={form.plot}
                    onChange={(e) => setForm({ ...form, plot: e.target.value })}
                    placeholder="e.g. corner plot, 1500 sq.ft, east facing"
                    className={inputCls}
                  />
                </Field>
                <Cta type="submit" className="w-full" variant="solid">
                  Request Details on WhatsApp
                </Cta>
                <p className="text-center text-[11px] text-forest-900/45">
                  We reply within business hours — usually much faster.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ---------- next project ---------- */}
      <section className="bg-mint-100 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 sm:flex-row sm:px-8">
          <p className="font-display text-xl font-semibold text-forest-800 sm:text-2xl">
            Continue exploring
          </p>
          <Magnetic>
            <Cta to={`/projects/${nextProject.slug}`} variant="solid">
              Next: {nextProject.name} <Icon name="arrowR" className="h-4 w-4" />
            </Cta>
          </Magnetic>
        </div>
      </section>
    </>
  );
}
