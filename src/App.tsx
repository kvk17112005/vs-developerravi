import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer, { FloatingButtons } from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import { HERO_VIDEO } from "./data/site";

/* --------------------- scroll restoration -------------------------- */

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

/* -------------------------- loader ---------------------------------- */

function InitialLoader({ onComplete }: { onComplete: () => void }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }
    // Failsafe: force complete after 4s in case animation stalls (e.g. background tab)
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-forest-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: [0.65, 0, 0.35, 1],
      }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/30 to-forest-900/90" />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.img 
           src="/vs-logo-new.jpg" 
           alt="VS Developers"
           className="h-28 w-28 rounded-2xl bg-white object-contain p-2 drop-shadow-2xl"
           initial={{ opacity: 0, scale: 0.8, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{
             duration: prefersReducedMotion ? 0.01 : 0.8,
             ease: [0.22, 1, 0.36, 1],
           }}
        />
        <motion.div
          className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
        >
          <motion.div 
            className="h-full bg-gold-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3,
              ease: "easeInOut",
            }}
            onAnimationComplete={onComplete}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -------------------------- page transition ------------------------- */

function PageShell({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 12, filter: "blur(4px)" }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      exit={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -12, filter: "blur(4px)" }
      }
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ app --------------------------------- */

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageShell><Home /></PageShell>} />
        <Route path="/about" element={<PageShell><About /></PageShell>} />
        <Route path="/projects" element={<PageShell><Projects /></PageShell>} />
        <Route path="/projects/:slug" element={<PageShell><ProjectDetail /></PageShell>} />
        <Route path="/gallery" element={<PageShell><Gallery /></PageShell>} />
        <Route path="/careers" element={<PageShell><Careers /></PageShell>} />
        <Route path="/contact" element={<PageShell><Contact /></PageShell>} />
        <Route path="*" element={<PageShell><Home /></PageShell>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <ScrollToTop />

        <AnimatePresence>
          {loading && <InitialLoader key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
        <FloatingButtons />
      </HashRouter>
    </MotionConfig>
  );
}
