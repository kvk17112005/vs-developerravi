import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Cta,
  EASE,
  Field,
  Icon,
  ImageReveal,
  inputCls,
  Reveal,
  ScrollText,
  SectionHeading,
  StaggerGroup,
  StaggerItem,
  TextReveal,
  usePageMeta,
} from "../components/ui";
import { CONTACT, ROLES } from "../data/site";
import { cn } from "../utils/cn";

const px = (id: number, w = 1000, h = 700) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const CULTURE = [
  { icon: "tree", title: "Build green, always", desc: "Avenue trees at work, not just in our layouts." },
  { icon: "heart", title: "Family-first culture", desc: "Site teams and desk teams celebrate together." },
  { icon: "award", title: "Grow with the layout", desc: "Annual increments tied to delivery, not favours." },
  { icon: "users", title: "Small, senior team", desc: "You work directly with leadership every day." },
];

export default function Careers() {
  usePageMeta(
    "Careers | Join VS Developers | Bengaluru",
    "Open roles at VS Developers, Bengaluru — sales, site engineering, digital marketing, relationship management and documentation.",
  );
  const [openRole, setOpenRole] = useState<number | null>(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: ROLES[0].title,
    note: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Hello VS Developers! I'd like to apply.\n\nRole: ${form.role}\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nAbout me: ${form.note || "—"}`;
    window.open(
      `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Application — ${form.role}`)}&body=${encodeURIComponent(body)}`,
      "_blank",
    );
  };

  return (
    <>
      <section className="relative overflow-hidden bg-mint-50 pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="paper-grain absolute inset-0 opacity-60" />
        <div className="absolute -right-32 -top-24 h-80 w-80 rounded-full bg-mint-300/50 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-9 bg-gold-500/70" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600">
                Careers
              </span>
              <span className="h-px w-9 bg-gold-500/70" />
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-900 sm:text-6xl">
              <TextReveal mode="character">
                Grow roots <em className="text-forest-600">with us.</em>
              </TextReveal>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-forest-900/65 sm:text-lg">
              <ScrollText>
                We're a small, senior team that treats every layout like a family
                project. If you care about land, documents and people — in that order —
                write to us.
              </ScrollText>
            </p>
          </motion.div>
        </div>
      </section>

      {/* culture */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <StaggerGroup className="grid grid-cols-2 gap-4" stagger={0.14}>
              <StaggerItem>
                <ImageReveal
                  src={px(7581110)}
                  alt="Team discussion"
                  className="h-56 w-full rounded-[1.5rem] card-shadow sm:h-64"
                />
              </StaggerItem>
              <StaggerItem className="mt-8">
                <ImageReveal
                  src={px(7580644)}
                  alt="The VS desk"
                  className="h-56 w-full rounded-[1.5rem] card-shadow sm:h-64"
                />
              </StaggerItem>
            </StaggerGroup>
            <div>
              <SectionHeading
                center={false}
                textEffect="scroll"
                eyebrow="Life at VS"
                title={
                  <>
                    A desk with a <em className="text-forest-600">view of trees.</em>
                  </>
                }
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {CULTURE.map((c, i) => (
                  <Reveal key={c.title} delay={i * 0.07}>
                    <div className="hover-card h-full rounded-2xl border border-forest-600/10 bg-mint-50 p-5 hover:border-forest-600/25 hover:shadow-lg">
                      <span className="hover-icon flex h-10 w-10 items-center justify-center rounded-xl bg-forest-600 text-white">
                        <Icon name={c.icon} className="h-5 w-5" />
                      </span>
                      <p className="hover-title mt-3 text-sm font-bold text-forest-900">{c.title}</p>
                      <p className="hover-desc mt-1 text-xs leading-relaxed text-forest-900/60">
                        {c.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* roles + form */}
      <section className="bg-mint-50 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <SectionHeading
              center={false}
              textEffect="scroll"
              eyebrow="Open Roles"
              title={
                <>
                  Five seats, <em className="text-forest-600">zero noise.</em>
                </>
              }
            />
            <div className="mt-9 space-y-4">
              {ROLES.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.05}>
                  <div className="hover-card overflow-hidden rounded-2xl border border-forest-600/10 bg-white hover:border-forest-600/25 hover:shadow-lg">
                    <button
                      onClick={() => setOpenRole(openRole === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <div>
                        <h2 className="hover-title font-display text-lg font-semibold text-forest-900">
                          {r.title}
                        </h2>
                        <p className="mt-1 text-xs font-semibold text-forest-600">
                          {r.type} · {r.location}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint-100 text-forest-700 transition-transform duration-300",
                          openRole === i && "rotate-45 bg-forest-600 text-white",
                        )}
                      >
                        <Icon name="close" className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence>
                      {openRole === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                        >
                          <div className="border-t border-forest-600/10 p-5 pt-4">
                            <p className="text-sm leading-relaxed text-forest-900/65">
                              {r.desc}
                            </p>
                            <p className="mt-2.5 text-xs font-bold text-forest-600">
                              Requirement: {r.exp}
                            </p>
                            <button
                              onClick={() =>
                                setForm((f) => ({ ...f, role: r.title }))
                              }
                              className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-gold-600 transition hover:text-gold-700"
                            >
                              Apply for this role →
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal delay={0.1}>
              <form
                onSubmit={submit}
                className="sticky top-28 rounded-[2rem] border border-forest-600/10 bg-white p-7 card-shadow sm:p-9"
              >
                <h2 className="font-display text-2xl font-semibold text-forest-900">
                  Apply now
                </h2>
                <p className="mt-1.5 text-sm text-forest-900/55">
                  We read every application personally.
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
                  <div className="grid gap-4 sm:grid-cols-2">
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
                    <Field label="Email">
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@email.com"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  <Field label="Role">
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className={inputCls}
                    >
                      {ROLES.map((r) => (
                        <option key={r.title} value={r.title}>
                          {r.title}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Tell us about yourself">
                    <textarea
                      rows={4}
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      placeholder="Experience, projects, why VS…"
                      className={inputCls}
                    />
                  </Field>
                  <Cta type="submit" className="w-full">
                    Send Application <Icon name="mail" className="h-4 w-4" />
                  </Cta>
                  <p className="text-center text-[11px] text-forest-900/45">
                    Opens your email client, addressed to {CONTACT.email}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
