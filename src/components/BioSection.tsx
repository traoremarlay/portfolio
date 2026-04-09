"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import LogoARCT from "./LogoARCT";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function BioSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col md:flex-row md:justify-between md:items-end gap-10 md:gap-6"
      style={{ paddingBottom: 0 }}
    >
      {/* Left column */}
      <div style={{ maxWidth: 560 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 400,
            lineHeight: 1.65,
            color: "#191D23",
          }}
        >
          Hi, I&apos;m Marlay. I help brands translate strategy into clear,
          impactful digital experiences.
        </p>
        <p
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.65,
            color: "rgba(25, 29, 35, 0.55)",
            marginTop: 8,
          }}
        >
          We craft brands, websites and digital products designed to stand out
          and scale.
        </p>
      </div>

      {/* Right column */}
      <div className="flex flex-col items-start md:items-end gap-2.5">
        {/* Co-founder line */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center"
            style={{
              backgroundColor: "rgba(25, 29, 35, 0.04)",
              borderRadius: 4,
              padding: "4px 6px",
            }}
          >
            <LogoARCT className="block" style={{ width: 32, height: 22 }} />
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "#191D23",
            }}
          >
            Co-founder of{" "}
            <a
              href="https://x.com/studioARCT"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#191D23",
                textDecoration: "underline",
                textDecorationThickness: "1.5px",
                textUnderlineOffset: "3px",
                transition: "text-decoration-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecorationColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecorationColor = "#191D23";
              }}
            >
              Studio ARCT
            </a>
          </span>
        </div>

        {/* Location */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "rgba(25, 29, 35, 0.55)",
          }}
        >
          Bordeaux — FR
        </span>

        {/* Social icons */}
        <div className="flex items-center gap-3.5">
          <a
            href="https://x.com/onzeXBT"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:-translate-y-px"
            style={{ color: "#191D23" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(25, 29, 35, 0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#191D23";
            }}
            aria-label="X (Twitter)"
          >
            <XIcon />
          </a>
          <a
            href="https://www.instagram.com/onze.eth/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:-translate-y-px"
            style={{ color: "#191D23" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(25, 29, 35, 0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#191D23";
            }}
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
