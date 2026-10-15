import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";
import { TRUST_BADGES } from "../data/site";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_LUX = [0.65, 0, 0.35, 1] as const;

export function CinematicSection({
  children,
  first = false,
}: {
  children: ReactNode;
  first?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.24, 1], prefersReducedMotion ? [0, 0, 0] : [36, 0, -8]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.72, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.985, 1, 1, 0.975],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.8, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.82, 1, 1, 0.94],
  );
  const filter = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    prefersReducedMotion
      ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
      : ["blur(1.5px)", "blur(0px)", "blur(0px)", "blur(0.8px)"],
  );

  return (
    <div
      ref={sectionRef}
      className={cn("relative z-10", !first && "-mt-[4vh]")}
    >
      <motion.div
        style={{ y, scale, opacity, filter, transformOrigin: "top center" }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------ icons ------------------------------ */

const PATHS: Record<string, ReactNode> = {
  seal: (
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4.5" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M10 13h5M10 17h5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2.2 5-5 2.2 2.2-5z" />
    </>
  ),
  road: (
    <>
      <path d="M5 21L7 3" />
      <path d="M12 21l2-18" />
      <path d="M19 21l2-18" />
    </>
  ),
  scale: (
    <>
      <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </>
  ),
  heart: (
    <path d="M12 20.5C7.2 16.4 3.5 13 3.5 9.3 3.5 6.9 5.3 5 7.7 5c1.5 0 2.9.8 4.3 2.6C13.4 5.8 14.8 5 16.3 5c2.4 0 4.2 1.9 4.2 4.3 0 3.7-3.7 7.1-8.5 11.2z" />
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14.2L7 21l5-2 5 2-1.5-6.8" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.4 3.4-5 6.5-5s5.7 1.6 6.5 5" />
      <circle cx="17.5" cy="9" r="2.5" />
      <path d="M16 15.3c2.5.5 4.4 2 5.1 4.7" />
    </>
  ),
  tree: (
    <>
      <path d="M12 3l4.5 6H13l3.5 4.5h-9L11 9H7.5z" />
      <path d="M12 13.5V21" />
    </>
  ),
  power: <path d="M13 2L4 14h6l-1 8 9-12h-6z" />,
  water: <path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" />,
  park: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21v-6M19 21v-6M5 15h14" />
      <path d="M10 15v-3M14 15v-3" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />,
  rain: (
    <>
      <path d="M17 15a4 4 0 000-8 5.5 5.5 0 00-10.4 1.6A3.5 3.5 0 006 15" />
      <path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3" />
    </>
  ),
  ruler: (
    <>
      <rect x="2" y="8" width="20" height="8" rx="2" />
      <path d="M7 8v3M12 8v3M17 8v3" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 006 6L16 14l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  play: <path d="M8 5v14l11-7z" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevL: <path d="M14 6l-6 6 6 6" />,
  chevR: <path d="M10 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  home: <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z" />,
  arrowR: <path d="M4 12h16m-6-6l6 6-6 6" />,
  external: (
    <>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  rotate: (
    <>
      <path d="M21 12a9 9 0 11-3-6.7" />
      <path d="M21 3v6h-6" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3z" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 9.4V4M12 20v-5.4M9.4 12H4M20 12h-5.4" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
};

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.7,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const filled = name === "play" || name === "whatsapp";
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name] ?? PATHS.home}
    </svg>
  );
}

export function WhatsAppGlyph({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z" />
    </svg>
  );
}

/* ------------------------------ hooks ------------------------------- */

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export function useIsDesktop() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIs(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIs(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return is;
}

/* ------------------------------ primitives -------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 30,
  x = 0,
  rotate = 0,
  scale = 0.985,
  blur = 7,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  rotate?: number;
  scale?: number;
  blur?: number;
  className?: string;
  once?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1200 }}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y, x, rotateX: rotate, scale, filter: `blur(${blur}px)` }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = true,
  light = false,
  textEffect = "reveal",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
  light?: boolean;
  textEffect?: "reveal" | "scroll";
}) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <div className={cn("flex items-center gap-3", center && "justify-center")}>
        <span className="h-px w-9 bg-gold-500/70" />
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
          {eyebrow}
        </span>
        <span className="h-px w-9 bg-gold-500/70" />
      </div>
      <h2
        className={cn(
          "mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl",
          light ? "text-white" : "text-forest-900",
        )}
      >
        {textEffect === "scroll" ? <ScrollText>{title}</ScrollText> : <TextReveal>{title}</TextReveal>}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            light ? "text-white/75" : "text-forest-900/65",
          )}
        >
          {textEffect === "scroll" ? <ScrollText>{sub}</ScrollText> : <TextReveal>{sub}</TextReveal>}
        </p>
      )}
    </Reveal>
  );
}

function textContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.type === "br") return " ";
    return textContent(node.props.children);
  }
  return "";
}

export function TextReveal({
  children,
  mode = "word",
}: {
  children: ReactNode;
  mode?: "word" | "character";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-72px" });
  const prefersReducedMotion = useReducedMotion();
  let revealIndex = 0;

  const renderText = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
          .split(/(\s+)/)
          .map((part) => {
            if (!part || /^\s+$/.test(part)) return part;

            if (mode === "character") {
              return Array.from(part).map((character) => {
                const index = revealIndex++;
                return (
                  <motion.span
                    key={`char-${index}`}
                    className="inline-block"
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 9, filter: "blur(5px)" }
                    }
                    animate={
                      inView
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : undefined
                    }
                    transition={{
                      duration: 0.48,
                      delay: index * 0.012,
                      ease: EASE,
                    }}
                  >
                    {character}
                  </motion.span>
                );
              });
            }

            const index = revealIndex++;
            return (
              <motion.span
                key={`word-${index}`}
                className="inline-block"
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 12, filter: "blur(5px)" }
                }
                animate={
                  inView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : undefined
                }
                transition={{
                  duration: 0.55,
                  delay: index * 0.055,
                  ease: EASE,
                }}
              >
                {part}
              </motion.span>
            );
          });
      }

      if (isValidElement<{ children?: ReactNode }>(child)) {
        return cloneElement(child, {
          children: renderText(child.props.children),
        });
      }

      return child;
    });

  return (
    <span ref={ref} className="text-reveal">
      <span className="sr-only">{textContent(children)}</span>
      <span aria-hidden="true">{renderText(children)}</span>
    </span>
  );
}

/* Scroll-linked text reveal — each word brightens as the block scrolls up. */

function ScrollWord({
  children,
  progress,
  index,
  total,
  reduced,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduced: boolean;
}) {
  const start = total > 1 ? index / total : 0;
  const end = total > 1 ? Math.min((index + 1.6) / total, 1) : 1;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const filter = useTransform(progress, [start, end], ["blur(6px)", "blur(0px)"]);

  if (reduced) return <span className="scroll-word">{children}</span>;
  return (
    <motion.span className="scroll-word" style={{ opacity, y, filter }}>
      {children}
    </motion.span>
  );
}

export function ScrollText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.55"],
  });

  let wordCount = 0;
  const countWords = (node: ReactNode) => {
    Children.forEach(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        wordCount += String(child).split(/\s+/).filter(Boolean).length;
      } else if (isValidElement<{ children?: ReactNode }>(child)) {
        countWords(child.props.children);
      }
    });
  };
  countWords(children);
  const total = Math.max(wordCount, 1);

  let i = 0;
  const renderText = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
          .split(/(\s+)/)
          .map((part) => {
            if (!part || /^\s+$/.test(part)) return part;
            const idx = i++;
            return (
              <ScrollWord
                key={`sw-${idx}`}
                progress={scrollYProgress}
                index={idx}
                total={total}
                reduced={!!prefersReducedMotion}
              >
                {part}
              </ScrollWord>
            );
          });
      }
      if (isValidElement<{ children?: ReactNode }>(child)) {
        if (child.type === "br") return child;
        return cloneElement(child, {
          children: renderText(child.props.children),
        });
      }
      return child;
    });

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{textContent(children)}</span>
      <span aria-hidden="true">{renderText(children)}</span>
    </span>
  );
}

export function ParallaxImage({
  src,
  alt,
  className,
  loading,
  decoding = "async",
  depth = 18,
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
  depth?: number;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-depth, depth],
  );

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={cn("will-change-transform", className)}
      style={{ y, scale: prefersReducedMotion ? 1 : 1.08 }}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0.7, clipPath: "inset(0 0 100% 0)" }
      }
      animate={
        inView
          ? { opacity: 1, clipPath: "inset(0 0 0% 0)" }
          : undefined
      }
      whileHover={prefersReducedMotion ? undefined : { scale: 1.13 }}
      transition={{ duration: 0.8, ease: EASE }}
    />
  );
}

export function GoldRule({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/70" />
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 text-gold-500" aria-hidden>
        <path d="M7 0l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/70" />
    </div>
  );
}

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.5 });
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onMouseMove={(e: ReactMouseEvent) => {
        if (prefersReducedMotion) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rx = useSpring(0, { stiffness: 200, damping: 22 });
  const ry = useSpring(0, { stiffness: 200, damping: 22 });
  return (
    <motion.div
      ref={ref}
      className={cn("preserve-3d", className)}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onMouseMove={(e: ReactMouseEvent) => {
        if (prefersReducedMotion) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 2.2,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const decimals = Number.isInteger(to) ? 0 : 1;
  const fmt = (v: number) =>
    `${prefix}${decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN")}${suffix}`;
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (prefersReducedMotion) {
      ref.current.textContent = fmt(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = fmt(v);
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, prefix, suffix, prefersReducedMotion]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {prefersReducedMotion ? to.toLocaleString("en-IN") : 0}
      {suffix}
    </span>
  );
}

export function TrustBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {TRUST_BADGES.map((b, i) => (
        <motion.div
          key={b}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.55, ease: EASE }}
          className="flex items-center gap-2 rounded-full border border-forest-600/15 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-forest-700 shadow-sm"
        >
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-mint-200 text-forest-700">
            <Icon name="seal" className="h-2.5 w-2.5" strokeWidth={2.4} />
          </span>
          {b}
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------ CTA -------------------------------- */

export function Cta({
  children,
  to,
  href,
  onClick,
  variant = "solid",
  className,
  type,
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "gold" | "light" | "outline" | "outlineLight";
  className?: string;
  type?: "submit" | "button";
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer";
  const styles: Record<string, string> = {
    solid:
      "bg-forest-600 text-white shadow-lg shadow-forest-600/25 hover:bg-forest-700 hover:-translate-y-0.5",
    gold: "bg-gold-500 text-forest-900 shadow-lg shadow-gold-500/30 hover:bg-gold-400 hover:-translate-y-0.5",
    light: "bg-white text-forest-700 shadow-lg shadow-forest-900/10 hover:bg-mint-100 hover:-translate-y-0.5",
    outline:
      "border-2 border-forest-600/25 text-forest-700 hover:border-forest-600 hover:bg-mint-100/70",
    outlineLight:
      "border-2 border-white/50 text-white hover:border-white hover:bg-white/10",
  };
  const cls = cn(base, styles[variant], className);
  if (to)
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={cls}
        onClick={onClick}
      >
        {children}
      </a>
    );
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* ------------------------------ 3D scroll effects ------------------ */

export function Scroll3D({
  children,
  className,
  intensity = 8,
  scaleEffect = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  scaleEffect?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? [0, 0, 0] : [intensity, 0, -intensity * 0.7],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion || !scaleEffect ? [1, 1, 1] : [0.94, 1, 0.96],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.8, 1, 1, 0.85],
  );

  return (
    <div ref={ref} style={{ perspective: 1000 }} className={className}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Parallax3DLayer({
  children,
  className,
  depth = 25,
}: {
  children: ReactNode;
  className?: string;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-depth, depth],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------ cursor dot ------------------------- */

export function CursorDot() {
  const fine = useRef(false);
  const [, force] = useState(0);
  const [hover, setHover] = useState(false);
  const x = useSpring(-100, { stiffness: 500, damping: 42, mass: 0.5 });
  const y = useSpring(-100, { stiffness: 500, damping: 42, mass: 0.5 });
  const rx = useSpring(-100, { stiffness: 150, damping: 24, mass: 0.9 });
  const ry = useSpring(-100, { stiffness: 150, damping: 24, mass: 0.9 });

  useEffect(() => {
    fine.current = window.matchMedia("(pointer: fine)").matches;
    force(1);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      rx.set(e.clientX);
      ry.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest?.("a,button,[data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, rx, ry]);

  if (!fine.current) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full bg-forest-600"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hover ? 36 : 10,
          height: hover ? 36 : 10,
          opacity: hover ? 0.35 : 0.85,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[998] rounded-full border border-forest-600/40"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hover ? 54 : 36, height: hover ? 54 : 36 }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}

/* ------------------------------ lightbox --------------------------- */

export function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: { src: string; caption?: string }[];
  index: number | null;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onNav]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-forest-900/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            onClick={onClose}
            aria-label="Close"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
          <button
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              onNav((index - 1 + items.length) % items.length);
            }}
            aria-label="Previous"
          >
            <Icon name="chevL" className="h-5 w-5" />
          </button>
          <motion.img
            key={items[index].src}
            src={items[index].src}
            alt={items[index].caption ?? ""}
            className="max-h-[76vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE_LUX }}
            onClick={(e) => e.stopPropagation()}
          />
          {items[index].caption && (
            <p className="mt-4 text-sm font-medium text-white/85">
              {items[index].caption}
            </p>
          )}
          <span className="mt-1.5 text-xs tracking-[0.2em] text-white/45">
            {index + 1} / {items.length}
          </span>
          <button
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              onNav((index + 1) % items.length);
            }}
            aria-label="Next"
          >
            <Icon name="chevR" className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------ form input ------------------------- */

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-forest-700/80">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-forest-600/15 bg-white px-4 py-3 text-sm text-forest-900 outline-none transition placeholder:text-forest-900/35 focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10";
