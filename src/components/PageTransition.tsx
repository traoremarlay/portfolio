"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface TransitionContextValue {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

/* ------------------------------------------------------------------ */
/*  TransitionLink                                                     */
/* ------------------------------------------------------------------ */

export function TransitionLink({
  href,
  children,
  className,
  style,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { navigateTo } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href === pathname) return;
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} style={style} {...rest}>
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TRANSITION_DURATION = 0.7;
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

type Phase = "idle" | "covering" | "revealing";
type PreloaderState = "loading" | "transitioning" | "done";

/* ------------------------------------------------------------------ */
/*  PageTransition                                                     */
/* ------------------------------------------------------------------ */

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  /* --- Page transition state --- */
  const [phase, setPhase] = useState<Phase>("idle");
  const targetHref = useRef("");

  /* --- Preloader state --- */
  const [preloader, setPreloader] = useState<PreloaderState>("loading");

  /* Check sessionStorage to skip preloader on repeat visits */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("preloader-seen") === "1") {
        setPreloader("done");
      }
    }
  }, []);

  /* Called when the Preloader logo animation finishes */
  const onPreloaderComplete = useCallback(() => {
    setPreloader("transitioning");
  }, []);

  /* Called when the reveal slide-up finishes after preloader */
  const onPreloaderRevealComplete = useCallback(() => {
    setPreloader("done");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("preloader-seen", "1");
    }
  }, []);

  /* --- Page transition callbacks --- */
  const navigateTo = useCallback(
    (href: string) => {
      if (phase !== "idle") return;
      targetHref.current = href;
      setPhase("covering");
    },
    [phase]
  );

  const onCoverComplete = useCallback(() => {
    router.push(targetHref.current);
    setTimeout(() => {
      setPhase("revealing");
    }, 100);
  }, [router]);

  const onRevealComplete = useCallback(() => {
    setPhase("idle");
  }, []);

  /* Hide navbar + content during preloader loading phase */
  const siteVisible = preloader !== "loading";

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {/* Site content — hidden behind preloader until transition starts */}
      <div
        style={{
          visibility: siteVisible ? "visible" : "hidden",
        }}
      >
        {children}
      </div>

      {/* ---- Preloader ---- */}
      {preloader === "loading" && (
        <Preloader onComplete={onPreloaderComplete} />
      )}

      {/* Preloader → site reveal (white overlay slides up to reveal the site) */}
      <AnimatePresence>
        {preloader === "transitioning" && (
          <motion.div
            key="preloader-reveal"
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: EASE,
            }}
            onAnimationComplete={onPreloaderRevealComplete}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 90, background: "#FFFFFF" }}
          />
        )}
      </AnimatePresence>

      {/* ---- Page transition overlay ---- */}
      <AnimatePresence>
        {phase === "covering" && (
          <motion.div
            key="cover"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: EASE,
            }}
            onAnimationComplete={onCoverComplete}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 40, background: "#FFFFFF" }}
          />
        )}

        {phase === "revealing" && (
          <motion.div
            key="reveal"
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: EASE,
            }}
            onAnimationComplete={onRevealComplete}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 40, background: "#FFFFFF" }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
