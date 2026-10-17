import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CONTACT } from "../data/site";
import { cn } from "../utils/cn";
import { EASE, Icon, TextReveal, WhatsAppGlyph } from "./ui";

/* ------------------------------------------------------------------ */
/*  Luxury 3D Perspective Coverflow & Master Plan Inspector           */
/* ------------------------------------------------------------------ */

export interface CoverflowCard {
  id: string;
  title: string;
  category: string;
  badge: string;
  image: string;
  location: string;
  shortDesc: string;
  modalDetails: {
    headline: string;
    subheadline: string;
    description: string;
    specs: { label: string; value: string }[];
    amenityPills: string[];
    galleryImages: string[];
  };
}

const COVERFLOW_ITEMS: CoverflowCard[] = [
  {
    id: "masterplan",
    title: "Visualising Future Layout Masterplans",
    category: "Architecture & Planning",
    badge: "Master Layout",
    image: "/projects/rose/rose-1.jpg",
    location: "Vemagal-Kurugal, Karnataka",
    shortDesc: "Complete architectural visualization of 4.7 acres with 71 luxury villa plots, flowering avenues and central parks.",
    modalDetails: {
      headline: "Master Plan Visualization",
      subheadline: "VS Rose Meadows · 4.7 Acres Plotted Development",
      description:
        "Every VS Developers master plan is drafted with precision town planning guidelines — wide 40-ft and 30-ft asphalt avenues, underground utilities, rainwater percolation pits, and dedicated green central parks.",
      specs: [
        { label: "Total Layout Extent", value: "4.7 Acres" },
        { label: "Plot Count", value: "71 Villa Plots" },
        { label: "Plot Sizes", value: "Starts at 30×40 ft" },
        { label: "Approvals", value: "DC Converted & DTCP Approved" },
        { label: "Handover Status", value: "Delivered" },
      ],
      amenityPills: ["40-Ft Avenues", "Underground Drainage", "Ducted Power", "Jogging Track", "24×7 Security"],
      galleryImages: [
        "/projects/rose/rose-1.jpg",
        "/projects/rose/rose-2.jpg",
        "/projects/rose/rose-3.jpg",
      ],
    },
  },
  {
    id: "parks",
    title: "Pristine Green Parks & Central Avenues",
    category: "Landscape & Ecology",
    badge: "Eco Living",
    image: "/projects/heritage/heritage-7.jpg",
    location: "Vemagal-Kurugal, Karnataka",
    shortDesc: "Half-acre landscaped central park with curated walking loops, children play equipment, and shaded gazebos.",
    modalDetails: {
      headline: "Lush Green Parks & Walking Tracks",
      subheadline: "VS Heritage · Half-Acre Central Park",
      description:
        "Living in harmony with nature. Our central parks are fully developed with stone walking tracks, seating pergolas, lush lawns, and vibrant flower beds before community handover.",
      specs: [
        { label: "Park Extent", value: "0.50 Acres (Half Acre)" },
        { label: "Walking Promenade", value: "800m Paved Loop" },
        { label: "Tree Plantation", value: "Tabebuia Rosea & Shade Trees" },
        { label: "Eco Feature", value: "Rainwater Harvesting Pits" },
        { label: "Community Area", value: "Children's Play Zone" },
      ],
      amenityPills: ["Jogging Track", "Pergola Gazebo", "Children's Play Area", "Avenue Lighting", "Perimeter Wall"],
      galleryImages: [
        "/projects/heritage/heritage-7.jpg",
        "/projects/heritage/heritage-8.jpg",
        "/projects/heritage/heritage-3.jpg",
      ],
    },
  },
  {
    id: "growth",
    title: "High Appreciation Growth Corridors",
    category: "Strategic Location",
    badge: "Investment",
    image: "/projects/yogitha/yogitha-1.jpg",
    location: "Vemagal Hosahalli",
    shortDesc: "Strategically located along rapidly growing industrial and IT corridors with direct highway connectivity.",
    modalDetails: {
      headline: "Strategic Vemagal Corridors",
      subheadline: "VS Yogitha Garden · Vemagal Hosahalli",
      description: "Positioned for substantial long-term capital appreciation.",
      specs: [
        { label: "Legal Status", value: "Clear Titles & DC Converted" },
      ],
      amenityPills: ["Fastest Growing Corridor", "Commercial Hubs", "Top Schools"],
      galleryImages: [
        "/projects/yogitha/yogitha-1.jpg",
        "/projects/yogitha/yogitha-2.jpg",
        "/projects/yogitha/yogitha-3.jpg",
      ],
    },
  },
  {
    id: "infrastructure",
    title: "Engineered Heavy-Load Road Networks",
    category: "Civil Infrastructure",
    badge: "Delivered Infrastructure",
    image: "/projects/heritage/heritage-5.jpg",
    location: "Across All Projects",
    shortDesc: "40-ft and 30-ft asphalt roads with concrete kerb stones, storm water drains, and ducted electricity lines.",
    modalDetails: {
      headline: "Heavy-Duty Road & Utility Networks",
      subheadline: "Built to Municipal & Highway Engineering Standards",
      description:
        "Every road in a VS Developers layout is engineered with deep aggregate sub-base, bituminous asphalt macadam surfacing, precast concrete kerb stones, and underground storm water conduits.",
      specs: [
        { label: "Main Avenues", value: "40-Feet Wide Roads" },
        { label: "Internal Roads", value: "30-Feet Wide with Kerbs" },
        { label: "UG Utilities", value: "Power Ducts & UGD Drainage" },
        { label: "Water System", value: "Dual Cauvery & Borewell Line" },
        { label: "Street Lighting", value: "Automated LED Luminaires" },
      ],
      amenityPills: ["40-Ft Asphalt Road", "Precast Kerb Stones", "Storm Water Drains", "Underground UGD", "Street Lights"],
      galleryImages: [
        "/projects/heritage/heritage-5.jpg",
        "/projects/heritage/heritage-6.jpg",
        "/projects/rose/rose-5.jpg",
      ],
    },
  },
  {
    id: "corner-sanctuary",
    title: "Executive Corner Plot Sanctuaries",
    category: "Premium Sites",
    badge: "Dual Aspect",
    image: "/projects/rose/rose-4.jpg",
    location: "Vemagal-Kurugal, Karnataka",
    shortDesc: "Vaastu-aligned dual road access corner plots with maximum natural ventilation and custom villa architecture potential.",
    modalDetails: {
      headline: "Dual-Aspect Corner Villa Sites",
      subheadline: "Premium Vaastu-Aligned Corner Plots",
      description:
        "Corner sites provide double road frontage, expansive daylighting, dedicated parking bays, and the freedom to build luxury independent contemporary duplex villas.",
      specs: [
        { label: "Frontage", value: "Dual Road Frontage (40' + 30')" },
        { label: "Vaastu Alignment", value: "100% East & North Facing" },
        { label: "Plot Dimensions", value: "30×50 ft & 40×60 ft" },
        { label: "Plot Status", value: "Handed Over" },
        { label: "Loan Availability", value: "Pre-approved by Leading Banks" },
      ],
      amenityPills: ["Double Road Access", "Vaastu Compliant", "Corner Landscaping", "Immediate Registration", "Clear Titles"],
      galleryImages: [
        "/projects/rose/rose-4.jpg",
        "/projects/heritage/heritage-4.jpg",
        "/projects/rose/rose-10.jpg",
      ],
    },
  },
];

export default function Coverflow3DProjectShowcase() {
  const [selectedCard, setSelectedCard] = useState<CoverflowCard | null>(null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-[#F3EFE6] to-[#E9E4D8] py-20 sm:py-28">
      {/* Subtle background ambient lights */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[450px] w-[750px] rounded-full bg-gold-400/10 blur-[130px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest-600/20 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-forest-600" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-forest-800">
              Interactive 3D Portfolio Deck
            </span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-forest-900 sm:text-5xl">
            <TextReveal>
              Selected and popular aspects in the{" "}
              <em className="text-forest-700">development right now</em>
            </TextReveal>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-forest-900/65 sm:text-base">
            <TextReveal>
              Click any perspective card to inspect full architectural blueprints, infrastructure details, and master plan highlights.
            </TextReveal>
          </p>
        </div>

        {/* Edge-to-edge continuous card loop */}
        <div
          className="coverflow-marquee relative left-1/2 mt-14 flex h-[460px] w-screen -translate-x-1/2 items-center overflow-x-auto overflow-y-hidden [perspective:1400px] sm:h-[500px]"
          role="region"
          aria-label="Continuously scrolling project highlights. Select a card to view details."
        >
          <div className="coverflow-loop-track flex w-max shrink-0 items-center">
            {[0, 1].map((copy) => (
              <div
                key={`coverflow-set-${copy}`}
                className="flex shrink-0 items-center gap-6 pr-6"
                aria-hidden={copy === 1}
              >
                {COVERFLOW_ITEMS.map((item, idx) => (
                  <motion.button
                    key={`${copy}-${item.id}`}
                    type="button"
                    onClick={() => setSelectedCard(item)}
                    tabIndex={copy === 1 ? -1 : 0}
                    aria-label={`${item.title}. ${item.shortDesc} Select to view details.`}
                    className={cn(
                      "group relative h-[380px] w-[260px] shrink-0 cursor-pointer select-none rounded-[2rem] p-1.5 text-left shadow-2xl transition-shadow duration-300 sm:h-[440px] sm:w-[300px]",
                      idx % 2 === 0
                        ? "[transform:rotateY(-5deg)] hover:[transform:rotateY(0deg)_translateY(-8px)]"
                        : "[transform:rotateY(5deg)] hover:[transform:rotateY(0deg)_translateY(-8px)]",
                      "focus-visible:outline focus-visible:outline-4 focus-visible:outline-gold-400",
                    )}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[1.65rem] bg-forest-900 shadow-inner">
                      {/* Card Cover Image */}
                      <img
                        src={item.image}
                        alt=""
                        loading={copy === 0 && idx < 3 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />

                    {/* Dark Vignette Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                      <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-forest-800 shadow-md backdrop-blur">
                        {item.badge}
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-950/70 text-white backdrop-blur">
                        <Icon name="external" className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    {/* Bottom Content Card */}
                    <div className="absolute inset-x-4 bottom-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400 drop-shadow">
                        {item.category}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-bold leading-snug text-white drop-shadow-md transition-colors duration-500 group-hover:text-gold-300 sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs text-white/80">
                        {item.shortDesc}
                      </p>

                      <div className="mt-3.5 flex items-center justify-between border-t border-white/15 pt-2.5">
                        <span className="text-[11px] font-semibold text-mint-200">
                          {item.location}
                        </span>
                        <span className="rounded-full bg-gold-400 px-2.5 py-1 text-[10px] font-bold text-forest-950">
                          Click to View ↗
                        </span>
                      </div>
                    </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive 3D Inspector Modal (Matches 00:28 in video) */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-forest-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-forest-600/20 bg-white p-6 shadow-2xl sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-forest-100 text-forest-800 transition hover:bg-forest-200"
                aria-label="Close modal"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>

              <div className="grid gap-6 md:grid-cols-12 md:gap-8">
                {/* Image Section */}
                <div className="md:col-span-5">
                  <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={selectedCard.image}
                      alt={selectedCard.title}
                      className="h-56 w-full object-cover sm:h-72"
                    />
                  </div>

                  {/* Thumbnail Row */}
                  <div className="mt-3 flex gap-2">
                    {selectedCard.modalDetails.galleryImages.map((src, i) => (
                      <div
                        key={i}
                        className="h-16 flex-1 overflow-hidden rounded-xl border border-forest-600/10 shadow-sm"
                      >
                        <img
                          src={src}
                          alt="Gallery thumbnail"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-mint-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-800">
                    {selectedCard.category} · {selectedCard.badge}
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-bold text-forest-900 sm:text-3xl">
                    {selectedCard.modalDetails.headline}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-gold-600">
                    {selectedCard.modalDetails.subheadline}
                  </p>

                  <p className="mt-3.5 text-xs leading-relaxed text-forest-900/70 sm:text-sm">
                    {selectedCard.modalDetails.description}
                  </p>

                  {/* Amenity Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {selectedCard.modalDetails.amenityPills.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-forest-50 px-2.5 py-1 text-[11px] font-semibold text-forest-800"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>

                  {/* Specifications Table */}
                  <div className="mt-5 rounded-xl border border-forest-600/15 bg-[#FAF8F5] p-3.5">
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      {selectedCard.modalDetails.specs.map((spec) => (
                        <div key={spec.label} className="border-b border-forest-600/10 pb-1.5">
                          <p className="text-[10px] font-bold uppercase text-forest-900/55">
                            {spec.label}
                          </p>
                          <p className="font-semibold text-forest-900">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={CONTACT.whatsapp(
                        `Hello! I'm inspecting "${selectedCard.title}" on your website. Please share upcoming layout brochures and launch details.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs font-bold text-white shadow-md transition hover:brightness-105"
                    >
                      <WhatsAppGlyph className="h-4 w-4" /> Enquire on WhatsApp
                    </a>

                    <a
                      href={CONTACT.phoneHref}
                      className="flex items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-forest-900"
                    >
                      <Icon name="phone" className="h-4 w-4" /> Call Team
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
