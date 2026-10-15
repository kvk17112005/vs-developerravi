import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PROJECTS } from "../data/site";
import { cn } from "../utils/cn";
import { Cta, EASE, Icon, Magnetic } from "./ui";

export function Logo({
  light,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <img
        src="/vs-logo-new.jpg"
        alt="VS Developers"
        className="h-12 w-12 rounded-xl bg-white object-contain p-0.5 drop-shadow-sm"
      />
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-lg font-semibold tracking-tight",
            light ? "text-white" : "text-forest-800",
          )}
        >
          VS <span className={light ? "text-mint-200" : "text-forest-600"}>Developers</span>
        </span>
        <span
          className={cn(
            "mt-1 block text-[8.5px] font-bold uppercase tracking-[0.32em]",
            light ? "text-gold-300" : "text-gold-600",
          )}
        >
          A Trusted Property Partner.
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open;
  const linkCls = solid ? "text-forest-800" : "text-white";
  const linkHover = solid ? "hover:text-forest-600" : "hover:text-mint-200";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMega(false);
    setOpen(false);
  }, [pathname]);

  const navLink = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative px-1 py-2 text-[13.5px] font-bold tracking-wide transition-colors",
      linkCls,
      linkHover,
      isActive &&
        cn(
          "after:absolute after:-bottom-0.5 after:left-0 after:h-[2.5px] after:w-full after:rounded-full",
          solid ? "text-forest-600 after:bg-forest-600" : "text-white after:bg-gold-400",
        ),
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
        solid
          ? "border-b border-forest-600/10 bg-white/90 shadow-[0_10px_40px_-18px_rgba(23,86,49,0.25)] backdrop-blur-xl"
          : "bg-gradient-to-b from-forest-900/45 to-transparent",
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo light={!solid} />

        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" end className={navLink}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLink}>
            About Us
          </NavLink>
          <div
            className="relative"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
          >
            <NavLink to="/projects" className={navLink}>
              Our Projects
              <Icon name="chevL" className={cn("ml-1.5 inline h-3 w-3 -rotate-90 transition-transform", mega && "rotate-90")} />
            </NavLink>
            <AnimatePresence>
              {mega && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 rounded-3xl border border-forest-600/10 bg-white p-6 shadow-[0_40px_90px_-30px_rgba(23,86,49,0.35)]"
                >
                  <div className="grid grid-cols-3 gap-4">
                    {PROJECTS.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/projects/${p.slug}`}
                        className="group overflow-hidden rounded-2xl border border-forest-600/10 bg-mint-50 transition hover:border-forest-600/30 hover:shadow-lg"
                      >
                        <div className="h-28 overflow-hidden">
                          <img
                            src={p.heroImage.replace("w=1600&h=1000", "w=640&h=360")}
                            alt={p.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-3.5">
                          <p className="font-display text-base font-semibold text-forest-800 transition-colors duration-300 group-hover:text-forest-600">
                            {p.name}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-[11px] text-forest-900/55">
                            {p.location}
                          </p>
                          <p className="mt-1.5 text-[11px] font-bold text-gold-600">
                            {p.status} · {p.sizes}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-forest-600/10 pt-4">
                    <p className="text-xs text-forest-900/55">
                      DTCP & DC converted plotted developments in Bengaluru East
                    </p>
                    <Link
                      to="/projects"
                      className="flex items-center gap-1.5 text-xs font-bold text-forest-600 hover:text-forest-700"
                    >
                      View all projects <Icon name="arrowR" className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <NavLink to="/gallery" className={navLink}>
            Gallery
          </NavLink>
          <NavLink to="/careers" className={navLink}>
            Careers
          </NavLink>
          <NavLink to="/contact" className={navLink}>
            Contact
          </NavLink>
        </nav>

        <div className="hidden lg:block">
          <Magnetic strength={0.3}>
            <Cta to="/contact" variant="gold" className="px-6 py-2.5 text-[13px]">
              Book Site Visit
            </Cta>
          </Magnetic>
        </div>

        <button
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
            solid ? "border-forest-600/20 text-forest-800" : "border-white/40 text-white",
          )}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-t border-forest-600/10 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-6 py-5">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/projects", label: "Our Projects" },
                { to: "/gallery", label: "Gallery" },
                { to: "/careers", label: "Careers" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="block rounded-xl px-3 py-3 font-display text-lg text-forest-800 transition hover:bg-mint-100"
                >
                  {l.label}
                </Link>
              ))}
              <div className="grid grid-cols-3 gap-2.5 pt-3">
                {PROJECTS.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projects/${p.slug}`}
                    className="overflow-hidden rounded-xl border border-forest-600/10"
                  >
                    <img
                      src={p.heroImage.replace("w=1600&h=1000", "w=320&h=200")}
                      alt={p.name}
                      loading="lazy"
                      className="h-16 w-full object-cover"
                    />
                    <p className="bg-white px-2 py-1.5 text-[11px] font-bold text-forest-700">
                      {p.shortName}
                    </p>
                  </Link>
                ))}
              </div>
              <Cta to="/contact" className="mt-4 w-full">
                Book Site Visit
              </Cta>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
