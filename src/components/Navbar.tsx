"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LogoM from "./LogoM";
import { TransitionLink } from "./PageTransition";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work", hasArrow: true },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between"
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(25, 29, 35, 0.06)",
        }}
      >
        {/* Left: Logo + Nav links */}
        <div className="flex items-center gap-10">
          <TransitionLink href="/" aria-label="Home" onClick={() => setMenuOpen(false)}>
            <LogoM />
          </TransitionLink>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label, hasArrow }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <TransitionLink
                  key={href}
                  href={href}
                  className="relative flex items-center gap-0.5 transition-colors duration-200 group"
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 400,
                    color: isActive ? "#191D23" : "rgba(25, 29, 35, 0.55)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                  {hasArrow && (
                    <span
                      className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                      style={{ marginLeft: "2px" }}
                    >
                      ›
                    </span>
                  )}
                </TransitionLink>
              );
            })}
          </div>
        </div>

        {/* Right: CTA (desktop) + Burger (mobile) */}
        <div className="flex items-center gap-3">
          <a
            href="https://calendly.com/studioarct/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block transition-all duration-200 hover:-translate-y-px"
            style={{
              backgroundColor: "#191D23",
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: 500,
              padding: "8px 18px",
              borderRadius: "4px",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 16px rgba(25, 29, 35, 0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Get in touch
          </a>

          {/* Burger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, gap: 5 }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                backgroundColor: "#191D23",
                borderRadius: 2,
                transformOrigin: "center",
              }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                backgroundColor: "#191D23",
                borderRadius: 2,
              }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                backgroundColor: "#191D23",
                borderRadius: 2,
                transformOrigin: "center",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              paddingTop: 80,
              paddingLeft: 40,
              paddingRight: 40,
              paddingBottom: 48,
            }}
          >
            {/* Nav links */}
            <nav className="flex flex-col" style={{ gap: 8, flex: 1 }}>
              {navLinks.map(({ href, label, hasArrow }, i) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: i * 0.06, ease: "easeOut" }}
                  >
                    <TransitionLink
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center"
                      style={{
                        fontSize: "clamp(36px, 10vw, 56px)",
                        fontWeight: 600,
                        letterSpacing: "-0.04em",
                        lineHeight: 1.05,
                        color: isActive ? "#191D23" : "rgba(25, 29, 35, 0.28)",
                        textDecoration: "none",
                        padding: "10px 0",
                        gap: 8,
                      }}
                    >
                      {label}
                      {hasArrow && (
                        <span style={{ fontWeight: 300, fontSize: "0.85em" }}>›</span>
                      )}
                    </TransitionLink>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <a
                href="https://calendly.com/studioarct/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  backgroundColor: "#191D23",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "12px 28px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Get in touch
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
