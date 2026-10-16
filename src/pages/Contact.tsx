import { motion } from "framer-motion";
import { useState } from "react";
import {
  Cta,
  EASE,
  Field,
  Icon,
  inputCls,
  Magnetic,
  Reveal,
  ScrollText,
  TextReveal,
  TrustBadges,
  usePageMeta,
  WhatsAppGlyph,
} from "../components/ui";
import { CONTACT } from "../data/site";

const CARDS = [
  {
    icon: "mapPin",
    title: "Head Office",
    lines: [CONTACT.address],
    href: CONTACT.mapUrl,
    action: "Get directions",
  },
  {
    icon: "phone",
    title: "Call Us",
    lines: [CONTACT.phone, "Site visits every day"],
    href: CONTACT.phoneHref,
    action: "Call now",
  },
  {
    icon: "mail",
    title: "Email",
    lines: [CONTACT.email, "Replies within business hours"],
    href: `mailto:${CONTACT.email}`,
    action: "Write to us",
  },
  {
    icon: "clock",
    title: "Visiting Hours",
    lines: [CONTACT.hours, "Sundays by appointment"],
    href: CONTACT.whatsapp("I'd like to plan a visit. Please let me know the preferred time."),
    action: "Plan a visit",
  },
];

export default function Contact() {
  usePageMeta(
    "Contact Us | VS Developers | Bhattarahalli, Bengaluru",
    "Visit the VS Developers office at Bhattarahalli, Bengaluru or call +91 9035585849 to book a site visit to our plotted developments at Vemagal.",
  );
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "Plot enquiry",
    message: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      CONTACT.whatsapp(
        `Hello VS Developers!\n\n${form.subject}\n\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`,
      ),
      "_blank",
    );
  };

  return (
    <>
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
                Contact Us
              </span>
              <span className="h-px w-9 bg-gold-500/70" />
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-900 sm:text-6xl">
              <TextReveal mode="character">
                The desk is <em className="text-forest-600">always open.</em>
              </TextReveal>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-forest-900/65 sm:text-lg">
              <ScrollText>
                Drop by our Bhattarahalli office for a coffee and a look at the original
                approval papers — or just call. We answer on the second ring.
              </ScrollText>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
            className="mt-9 flex justify-center"
          >
            <TrustBadges />
          </motion.div>
        </div>
      </section>

      {/* info cards */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="hover-card flex h-full flex-col rounded-[1.75rem] border border-forest-600/10 bg-mint-50 p-7 hover:border-forest-600/25 hover:shadow-[0_24px_50px_-28px_rgba(23,86,49,0.35)]">
                <span className="hover-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-600 text-white">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <h3 className="hover-title mt-4 font-display text-xl font-semibold text-forest-900">
                  {c.title}
                </h3>
                {c.lines.map((l) => (
                  <p key={l} className="mt-2 text-[13px] leading-relaxed text-forest-900/60">
                    {l}
                  </p>
                ))}
                {c.href ? (
                  <a
                    href={c.href}
                    className="hover-arrow mt-auto pt-5 text-xs font-bold uppercase tracking-[0.16em] text-gold-600 transition hover:text-gold-700"
                  >
                    {c.action} →
                  </a>
                ) : (
                  <span className="mt-auto pt-5 text-xs font-bold uppercase tracking-[0.16em] text-forest-900/35">
                    {c.action}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* form + map */}
      <section className="bg-mint-50 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <form
              onSubmit={submit}
              className="rounded-4xl border border-forest-600/10 bg-white p-7 card-shadow sm:p-9"
            >
              <h2 className="font-display text-3xl font-semibold text-forest-900">
                Send a message
              </h2>
              <p className="mt-1.5 text-sm text-forest-900/55">
                Goes straight to our WhatsApp — no forms lost in the mail.
              </p>
              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 ..."
                      className={inputCls}
                    />
                  </Field>
                </div>
                <Field label="Subject">
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputCls}
                  >
                    {["Plot enquiry", "Book a site visit", "Document verification", "Partnership / land owners", "Careers", "Something else"].map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ),
                    )}
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you're looking for…"
                    className={inputCls}
                  />
                </Field>
                <Cta type="submit" className="w-full">
                  <WhatsAppGlyph className="h-4.5 w-4.5" /> Send via WhatsApp
                </Cta>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-4xl border border-forest-600/10 card-shadow">
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-forest-600/20 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-forest-800 shadow-md backdrop-blur transition hover:bg-forest-50 hover:text-forest-900"
              >
                <span>Open in Maps</span>
                <Icon name="external" className="h-3.5 w-3.5 text-forest-600" />
              </a>
              <iframe
                title="VS Developers head office map"
                src={CONTACT.mapEmbed}
                className="min-h-[380px] w-full flex-1"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-col gap-4 bg-forest-800 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-lg font-semibold">Prefer to visit?</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    Behind Royal Enfield Showroom & Green Trends, near T.C. Palya Gate Signal.
                  </p>
                </div>
                <Magnetic>
                  <Cta href={CONTACT.phoneHref} variant="gold" className="shrink-0">
                    <Icon name="phone" className="h-4 w-4" /> {CONTACT.phone}
                  </Cta>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
