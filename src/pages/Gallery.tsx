import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  EASE,
  Icon,
  Lightbox,
  ParallaxImage,
  ScrollText,
  TextReveal,
  usePageTitle,
} from "../components/ui";
import { PROJECTS, type GalleryItem } from "../data/site";
import { cn } from "../utils/cn";

// const px = (id: number, w = 1200, h = 800) =>
//   `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;


// const EXTRA: GalleryItem[] = [
//   { src: px(31228856), caption: "Summer avenue - VS Rosemeadows", type: "photo" },
//   { src: px(37635080), caption: "Park greenery at VS Heritage", type: "photo" },
//   { src: px(12041474), caption: "Tree cover along Plot Row 4", type: "photo" },
//   { src: px(7174115), caption: "Owner-built garden pathway", type: "360" },
//   { src: px(29926504), caption: "The neighbourhood from above", type: "360" },
//   { src: px(7061659), caption: "A completed villa, VS Yogitha", type: "photo" },
//   { src: px(7580648), caption: "Our documentation desk at work", type: "photo" },
//   { src: px(7581119), caption: "Title verification session", type: "photo" },
// ];

const VIDEOS: GalleryItem[] = PROJECTS.map((p) => ({
  src: p.heroImage,
  caption: `${p.name} — drone flyover`,
  type: "video",
  video: p.video,
}));

type Filter = "All" | "VS Heritage" | "VS Rosemeadows" | "VS Yogitha" | "Videos" | "360°";

export default function Gallery() {
  usePageTitle("Gallery | VS Developers | Plotted Developments in Bengaluru");
  const [filter, setFilter] = useState<Filter>("All");
  const [lb, setLb] = useState<number | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  const all = useMemo(() => {
    const photos = PROJECTS.flatMap((p) => p.gallery);
    return [...photos, ...VIDEOS];
  }, []);

  const shown = useMemo(() => {
    if (filter === "All") return all;
    if (filter === "360°") return all.filter((g) => g.type === "360");
    if (filter === "Videos") return all.filter((g) => g.type === "video");
    if (filter === "VS Heritage") return all.filter((g) => g.src.includes("heritage"));
    if (filter === "VS Rosemeadows") return all.filter((g) => g.src.includes("rose"));
    if (filter === "VS Yogitha") return all.filter((g) => g.src.includes("yogitha"));
    return all;
  }, [all, filter]);

  const photoItems = shown
    .filter((g) => g.type !== "video")
    .map((g) => ({ src: g.src, caption: g.caption }));

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
                Gallery
              </span>
              <span className="h-px w-9 bg-gold-500/70" />
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-900 sm:text-6xl">
              <TextReveal mode="character">
                Green, in <em className="text-forest-600">every frame.</em>
              </TextReveal>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-forest-900/65 sm:text-lg">
              <ScrollText>
                Aerial surveys, owner-built villas, avenue trees and drone flyovers —
                the VS portfolio as it stands today.
              </ScrollText>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* filters */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {(["All", "VS Heritage", "VS Rosemeadows", "VS Yogitha", "Videos", "360°"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPlaying(null);
                }}
                className={cn(
                  "rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300",
                  filter === f
                    ? "bg-forest-600 text-white shadow-lg shadow-forest-600/25"
                    : "border border-forest-600/20 bg-white text-forest-700 hover:border-forest-600/50 hover:bg-mint-100/60",
                )}
              >
                {f === "Videos" && <Icon name="video" className="mr-1.5 inline h-3.5 w-3.5" />}
                {f === "360°" && <Icon name="rotate" className="mr-1.5 inline h-3.5 w-3.5" />}
                {f}
              </button>
            ))}
          </div>

          {/* masonry */}
          <motion.div layout className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {shown.map((g, i) => {
                const isVideo = g.type === "video";
                const is360 = g.type === "360";
                const ratio = (i + 2) % 4 === 0 ? "aspect-[3/4]" : (i + 1) % 3 === 0 ? "aspect-square" : "aspect-[4/3]";
                return (
                  <motion.div
                    key={g.src + g.type + i}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="mb-5 break-inside-avoid"
                  >
                    <button
                      onClick={() => {
                        if (isVideo) {
                          setPlaying(playing === g.src ? null : g.src);
                        } else {
                          const idx = photoItems.findIndex((p) => p.src === g.src);
                          setLb(idx);
                        }
                      }}
                      className={cn(
                        "group hover-card relative block w-full overflow-hidden rounded-2xl card-shadow",
                        ratio,
                      )}
                    >
                      {isVideo && playing === g.src ? (
                        <video
                          src={g.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <>
                          <ParallaxImage
                            src={g.src}
                            alt={g.caption}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            depth={12}
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                          <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                            <span className="text-left text-xs font-bold text-white opacity-0 transition duration-500 group-hover:opacity-100">
                              {g.caption}
                            </span>
                          </span>
                          {isVideo && (
                            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition group-hover:scale-110">
                              <Icon name="play" className="h-7 w-7" />
                            </span>
                          )}
                          {is360 && (
                            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-forest-900/80 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur">
                              <Icon name="rotate" className="h-3 w-3" /> 360°
                            </span>
                          )}
                          <span className="absolute right-3 top-3 rounded-full bg-gold-500/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-forest-900">
                            {isVideo ? "Film" : is360 ? "360°" : "Photo"}
                          </span>
                        </>
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <p className="mt-8 text-center text-xs text-forest-900/45">
            Tap any photo to view it full-screen. Videos play inline.
          </p>
        </div>

        <Lightbox
          items={photoItems}
          index={lb}
          onClose={() => setLb(null)}
          onNav={setLb}
        />
      </section>
    </>
  );
}
