import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CONTACT, PROJECTS, TAGLINE, TRUST_BADGES } from "../data/site";
import {
  EASE,
  Icon,
  Reveal,
  StaggerGroup,
  StaggerItem,
  TextReveal,
  WhatsAppGlyph,
} from "./ui";
import { Logo } from "./Navbar";

const popIn = {
  hidden: { opacity: 0, scale: 0.6, y: 18 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function FloatingButtons() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
      }}
      className="fixed bottom-5 right-4 z-[90] flex flex-col gap-3 sm:bottom-6 sm:right-6"
    >
      <motion.a
        variants={popIn}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        href={CONTACT.whatsapp(
          "Hello VS Developers! I'd like to know more about your plotted developments.",
        )}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="pulse-ring group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40"
      >
        <WhatsAppGlyph className="h-7 w-7" />
      </motion.a>
      <motion.a
        variants={popIn}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        href={CONTACT.phoneHref}
        aria-label="Call now"
        className="pulse-ring group flex h-14 w-14 items-center justify-center rounded-full bg-forest-600 text-white shadow-xl shadow-forest-600/40"
        style={{ animationDelay: "0.6s" }}
      >
        <Icon name="phone" className="h-6 w-6" />
      </motion.a>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-800 text-white">
      <div className="paper-grain absolute inset-0 opacity-40" />
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-forest-600/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <StaggerGroup className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <StaggerItem>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              <TextReveal>
                {TAGLINE} Family-run plotted developments in Bengaluru East — approved,
                green and ready to build on, since 2014.
              </TextReveal>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {TRUST_BADGES.slice(0, 4).map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-wide text-mint-200"
                >
                  <Icon name="seal" className="h-3 w-3 text-gold-400" strokeWidth={2.2} />
                  {b}
                </span>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem>
            <h2 className="text-xs font-bold uppercase tracking-[0.26em] text-gold-400">
              <TextReveal>Explore</TextReveal>
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/projects", label: "Our Projects" },
                { to: "/gallery", label: "Gallery" },
                { to: "/careers", label: "Careers" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="link-underline text-white/70 transition hover:text-mint-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h2 className="text-xs font-bold uppercase tracking-[0.26em] text-gold-400">
              <TextReveal>Our Projects</TextReveal>
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              {PROJECTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="group block text-white/70 transition hover:text-mint-200"
                  >
                    <span className="font-display text-[15px] font-semibold text-white/90 group-hover:text-white">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-white/50">
                      {p.location.split(",")[0]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h2 className="text-xs font-bold uppercase tracking-[0.26em] text-gold-400">
              <TextReveal>Head Office</TextReveal>
            </h2>
            <address className="mt-5 space-y-3.5 text-sm not-italic leading-relaxed text-white/70">
              <p className="flex gap-3">
                <Icon name="mapPin" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" />
                {CONTACT.address}
              </p>
              <a
                href={CONTACT.phoneHref}
                className="link-underline flex w-fit items-center gap-3 whitespace-nowrap transition hover:text-mint-200"
              >
                <Icon name="phone" className="h-4.5 w-4.5 shrink-0 text-gold-400" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="link-underline flex w-fit items-center gap-3 break-all transition hover:text-mint-200"
              >
                <Icon name="mail" className="h-4.5 w-4.5 shrink-0 text-gold-400" />
                {CONTACT.email}
              </a>
              <p className="flex items-center gap-3">
                <Icon name="clock" className="h-4.5 w-4.5 shrink-0 text-gold-400" />
                {CONTACT.hours}
              </p>
            </address>
          </StaggerItem>
        </StaggerGroup>

        <Reveal className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/45 sm:flex-row">
          <p>
            <TextReveal>
              © {new Date().getFullYear()} VS Developers, Bengaluru. All rights reserved.
            </TextReveal>
          </p>
          <p className="tracking-[0.22em] uppercase">
            <TextReveal>A Trusted Property Partner.</TextReveal>
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
