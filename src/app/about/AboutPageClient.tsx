"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { TransitionLink } from "@/components/PageTransition";
import BioSection from "@/components/BioSection";

/* ─── Live Clock ─── */
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function fmt() {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const s = now.getSeconds().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(`${h.toString().padStart(2, "0")}:${m}:${s} ${ampm}`);
    }
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}

/* ─── Infinite Marquee ─── */
const PARTNERS = [
  { name: "Copyfy",      src: "/images/partners/copyfy.svg"     },
  { name: "Ship Studio", src: "/images/partners/ship_studio.svg"},
  { name: "Garden",      src: "/images/partners/garden.svg"     },
  { name: "Volumaker",   src: "/images/partners/volumaker.svg"  },
  { name: "Studio 17",   src: "/images/partners/studio_17.svg"  },
  { name: "Para Bellum", src: "/images/partners/para_bellum.svg"},
];

function Marquee() {
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        background: "linear-gradient(90deg, #fff 0%, transparent 10%, transparent 90%, #fff 100%)",
      }} />
      <div style={{ display: "flex", animation: "marquee 22s linear infinite" }}>
        {items.map((p, i) => (
          <div key={i} style={{ flexShrink: 0, display: "flex", alignItems: "center", paddingRight: "63px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.name} style={{ height: 32, width: "auto", objectFit: "contain" }} />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ─── Badge ─── */
function Badge({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4px 8px",
      border: "1px solid #0545E8",
      borderRadius: "31px",
      fontSize: "10px",
      fontWeight: 400,
      color: "#0545E8",
      width: "fit-content",
    }}>
      {label}
    </span>
  );
}

/* ─── Separator line ─── */
function Sep() {
  return <div style={{ flexGrow: 1, height: 1, background: "#000" }} />;
}

/* ─── Recent card ─── */
function RecentCard({ project }: { project: Project }) {
  return (
    <TransitionLink
      href={`/work/${project.slug}`}
      className="block relative overflow-hidden rounded-xl group"
      style={{ aspectRatio: "4 / 3", display: "block" }}
    >
      <Image
        src={project.coverImage}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0" style={{ padding: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: "#fff", lineHeight: 1.2 }}>
          *{project.title}
        </p>
        <p className="truncate" style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.7)", lineHeight: 1.3, marginTop: 2 }}>
          {project.description}
        </p>
      </div>
    </TransitionLink>
  );
}

/* ─── Fade-in section wrapper ─── */
function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function AboutPageClient() {
  const recentProjects = useMemo(() => {
    return projects.sort(() => Math.random() - 0.5).slice(0, 3);
  }, []);

  const EXPERIENCES = [
    {
      company: "Studio ARCT",
      role: "Co-Founder",
      dates: "2020 – Present",
      desc: "I've spent over a decade helping startups, entrepreneurs, and businesses craft unique digital experiences.",
    },
    {
      company: "Beries",
      role: "Art Director",
      dates: "2022 – 2024",
      desc: "I served as the Art Director for Beries, a cutting-edge clothing brand merging fashion with blockchain technology.",
    },
    {
      company: "CINRA",
      role: "Print Production Manager",
      dates: "2017 – 2019",
      desc: "My role involved managing workflows, optimizing processes, and monitoring projects to guarantee results that met client expectations.",
    },
  ];

  const AWARDS = [
    {
      title: 'Public Award – "Jeux divers et variés" Exhibition',
      place: "Former Museum of Grenoble (France)",
      year: "2018",
    },
    {
      title: "EUROMOBIPRO Certificate",
      place: "Lycée André Argouges (France)",
      year: "2016",
    },
  ];

  return (
    <>
      <style>{`
        /* ── About container ── */
        .about-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 129px 74px 0;
        }

        /* ── Recent Work section ── */
        .about-recent {
          margin-top: 80px;
          padding: 0 74px;
        }

        /* ── Bio wrapper ── */
        .about-bio {
          margin-top: 60px;
          padding: 0 74px 48px;
        }

        /* ── Hero top row ── */
        .about-top-row {
          display: flex;
          gap: 91px;
          align-items: center;
        }

        /* ── Stats row ── */
        .stats-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* ── Avatar column ── */
        .avatar-col {
          width: clamp(200px, 30.7vw, 442px);
          height: clamp(200px, 25.3vw, 364px);
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
        }

        /* ── Experience row ── */
        .exp-top-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* ── Award row ── */
        .award-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* ── Section spacer ── */
        .about-spacer-lg { height: 128px; }
        .about-spacer-md { height: 64px; }

        /* ────────────── Tablet (≤ 1024px) ────────────── */
        @media (max-width: 1024px) {
          .about-container {
            padding: 120px 40px 0 !important;
          }
          .about-recent {
            padding: 0 40px !important;
          }
          .about-bio {
            padding: 0 40px 48px !important;
          }
          .about-top-row {
            flex-direction: column-reverse !important;
            gap: 40px !important;
          }
          .avatar-col {
            width: 100% !important;
            height: 260px !important;
          }
          .about-spacer-lg { height: 80px; }
          .about-spacer-md { height: 48px; }
        }

        /* ────────────── Large phone (≤ 768px) ────────────── */
        @media (max-width: 768px) {
          .about-container {
            padding: 100px 24px 0 !important;
          }
          .about-recent {
            padding: 0 24px !important;
            margin-top: 60px !important;
          }
          .about-bio {
            padding: 0 24px 40px !important;
            margin-top: 48px !important;
          }
          .stats-row {
            flex-wrap: wrap;
            gap: 12px !important;
          }
          .exp-top-row {
            flex-wrap: wrap;
            gap: 8px !important;
          }
          .award-row {
            flex-wrap: wrap;
            gap: 8px !important;
          }
          .about-spacer-lg { height: 60px; }
          .about-spacer-md { height: 32px; }
        }

        /* ────────────── Small mobile (≤ 480px) ────────────── */
        @media (max-width: 480px) {
          .about-container {
            padding: 88px 20px 0 !important;
          }
          .about-recent {
            padding: 0 20px !important;
          }
          .about-bio {
            padding: 0 20px 32px !important;
          }
          .stats-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px !important;
          }
          .about-spacer-lg { height: 48px; }
          .about-spacer-md { height: 24px; }
        }
      `}</style>

      <main>
        {/* Global page wrapper */}
        <div className="about-container">

          {/* ════════ SECTION 1 — HERO ════════ */}
          <FadeSection>
            <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>

              {/* Top row: text left + avatar right */}
              <div className="about-top-row">

                {/* Left column */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 34, minHeight: 364 }}>

                  {/* Badge + title */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <Badge label="About Me" />
                    <p style={{
                      fontSize: "clamp(16px, 1.67vw, 24px)",
                      fontWeight: 500,
                      lineHeight: "1.5",
                      letterSpacing: "-0.5px",
                      color: "#000",
                      maxWidth: 671,
                      margin: 0,
                    }}>
                      Hi, I&apos;m Marlay, a brand designer with 7+ years of experience crafting modern, creative brand that help businesses stand out. My passion lies in creating digital experiences that are not only visually stunning but also user-friendly and results-driven.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="stats-row">
                    {[
                      { num: "7+",  label: "Years of Experience" },
                      { num: "20+", label: "Projects Completed"  },
                      { num: "15+", label: "Satisfied Clients"   },
                    ].map((s, i) => (
                      <div key={i} style={{ display: "contents" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                          <span style={{ color: "#0545E8", fontSize: 14, fontWeight: 400 }}>{s.num}</span>
                          <span style={{ fontSize: 14, color: "#000" }}>{s.label}</span>
                        </div>
                        {i < 2 && <Sep />}
                      </div>
                    ))}
                  </div>

                  {/* Infos */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {/* Globe */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6.5" cy="6.5" r="5.5" stroke="#0545E8" strokeWidth="1.2"/>
                        <ellipse cx="6.5" cy="6.5" rx="2.2" ry="5.5" stroke="#0545E8" strokeWidth="1.2"/>
                        <line x1="1" y1="6.5" x2="12" y2="6.5" stroke="#0545E8" strokeWidth="1.2"/>
                      </svg>
                      <span style={{ fontSize: 14, color: "#000" }}>Based on Earth</span>
                      <Sep />
                    </div>
                    {/* Clock */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6.5" cy="6.5" r="5.5" stroke="#0545E8" strokeWidth="1.2"/>
                        <line x1="6.5" y1="3.5" x2="6.5" y2="6.5" stroke="#0545E8" strokeWidth="1.2" strokeLinecap="round"/>
                        <line x1="6.5" y1="6.5" x2="9" y2="8" stroke="#0545E8" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      <span style={{ fontSize: 14, color: "#000", fontWeight: 400 }}><LiveClock /></span>
                      <Sep />
                    </div>
                  </div>

                  {/* CTA */}
                  <div>
                    <a
                      href="https://calendly.com/studioarct/discovery-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 84,
                        height: 28,
                        backgroundColor: "#191D23",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 500,
                        borderRadius: 4,
                        textDecoration: "none",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                      }}
                    >
                      Get in touch
                    </a>
                  </div>
                </div>

                {/* Right — avatar */}
                <div className="avatar-col">
                  <Image src="/images/avatar.png" alt="Marlay" fill style={{ objectFit: "cover" }} />
                </div>
              </div>
            </div>
          </FadeSection>

          <div className="about-spacer-lg" />

          {/* ════════ SECTION 2 — EXPERIENCE ════════ */}
          <FadeSection delay={0.05}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Badge label="Experience" />

              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {EXPERIENCES.map((exp, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {/* top row */}
                    <div className="exp-top-row">
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.8px", color: "#000" }}>
                          {exp.company}
                        </span>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#0545E8", display: "inline-block" }} />
                        <span style={{ fontSize: 14, fontWeight: 400, letterSpacing: "-0.54px", color: "#000" }}>
                          {exp.role}
                        </span>
                      </div>
                      <Sep />
                      <span style={{ fontSize: 14, fontWeight: 400, color: "#000", flexShrink: 0 }}>
                        {exp.dates}
                      </span>
                    </div>
                    {/* description */}
                    <p style={{
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: "21px",
                      color: "#000",
                      maxWidth: 510,
                      margin: 0,
                    }}>
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>

          <div className="about-spacer-lg" />

          {/* ════════ SECTION 3A — PARTNERS ════════ */}
          <FadeSection delay={0.05}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <p style={{ fontSize: 16, fontWeight: 400, color: "#000", margin: 0 }}>
                Teams we&apos;ve partnered with
              </p>
              <Marquee />
            </div>
          </FadeSection>

          <div className="about-spacer-md" />

          {/* ════════ SECTION 3B — AWARDS ════════ */}
          <FadeSection delay={0.05}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Badge label="Awards" />

              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <h2 style={{
                    fontSize: "clamp(24px, 2.78vw, 40px)",
                    fontWeight: 500,
                    letterSpacing: "-2px",
                    color: "#000",
                    margin: 0,
                    flexShrink: 0,
                  }}>
                    My Awards
                  </h2>
                  <Sep />
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <span style={{ color: "#0545E8", fontSize: 14, fontWeight: 400 }}>2</span>
                    <span style={{ fontSize: 14, color: "#000" }}>Awards &amp; Recognitions</span>
                  </div>
                </div>

                {/* Awards list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  {AWARDS.map((award, i) => (
                    <div key={i} className="award-row">
                      <span style={{ fontSize: "clamp(14px, 1.4vw, 20px)", fontWeight: 400, letterSpacing: "-0.8px", color: "#000", flexShrink: 0 }}>
                        {award.title}
                      </span>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#0545E8", display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontSize: "clamp(13px, 1.25vw, 18px)", fontWeight: 500, letterSpacing: "-0.54px", color: "#000", flexShrink: 0 }}>
                        {award.place}
                      </span>
                      <Sep />
                      <span style={{ fontSize: 14, fontWeight: 400, color: "#000", flexShrink: 0 }}>{award.year}</span>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#0545E8", display: "inline-block", flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>

        </div>{/* ── end main padded container ── */}

        {/* ════════ SECTION 4 — RECENT WORK ════════ */}
        <FadeSection delay={0.05}>
          <section className="about-recent">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 30 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <h2 style={{
                  fontSize: "clamp(36px, 6vw, 80px)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  color: "#191D23",
                  lineHeight: 0.85,
                }}>
                  RECENT WORK
                </h2>
                <span style={{ fontSize: 16, fontWeight: 400, color: "#191D23", whiteSpace: "nowrap", paddingTop: "0.1em" }}>
                  ©21 — 26
                </span>
              </div>

              <TransitionLink
                href="/work"
                className="transition-all duration-200 hover:-translate-y-px flex-shrink-0"
                style={{
                  backgroundColor: "#191D23",
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "8px 18px",
                  borderRadius: 4,
                  textDecoration: "none",
                  alignSelf: "flex-start",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(25,29,35,0.18)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                View all works
              </TransitionLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentProjects.map((p) => (
                <RecentCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        </FadeSection>

        {/* BioSection */}
        <div className="about-bio">
          <BioSection />
        </div>
      </main>
    </>
  );
}
