import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "./utils/useReducedMotion";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer, { FloatingButtons } from "./components/Footer";
import Navbar from "./components/Navbar";
import { MOTION_CONFIG } from "./components/ui";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";

/* --------------------- scroll restoration -------------------------- */

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: MOTION_CONFIG.progress.stiffness,
    damping: MOTION_CONFIG.progress.damping,
    restDelta: MOTION_CONFIG.progress.restDelta,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-gradient-to-r from-gold-400 via-mint-300 to-forest-500"
      style={{ scaleX }}
    />
  );
}

/* -------------------------- page transition ------------------------- */

function PageShell({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: MOTION_CONFIG.page.distance }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0 }
      }
      exit={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -MOTION_CONFIG.page.distance }
      }
      transition={{
        duration: prefersReducedMotion ? 0 : MOTION_CONFIG.page.duration,
        ease: MOTION_CONFIG.ease,
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
  return (
    <MotionConfig reducedMotion="never">
      <HashRouter>
        <ScrollToTop />
        <ScrollProgress />
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
