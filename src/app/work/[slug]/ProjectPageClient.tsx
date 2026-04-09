"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { projects, type Project, type GalleryRow as GalleryRowType } from "@/lib/projects";
import { TransitionLink } from "@/components/PageTransition";
import BioSection from "@/components/BioSection";

/* ─────────────────────────────── gallery helpers ─────────────────────── */

function MediaBox({
  src,
  media,
  fullWidth,
}: {
  src: string;
  media: "image" | "video";
  fullWidth: boolean;
}) {
  if (media === "video") {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="block w-full h-auto rounded-lg"
        src={src}
      />
    );
  }
  /* Gallery image intrinsic sizes match the design export:
     half items: 1265×1052, full items: 2584×1052.
     Using w-full h-auto + next/image for WebP + responsive variants + lazy loading. */
  const intrinsic = fullWidth ? { w: 2584, h: 1052 } : { w: 1265, h: 1052 };
  const sizes = fullWidth
    ? "(max-width: 768px) 100vw, (max-width: 1440px) 88vw, 1292px"
    : "(max-width: 768px) 100vw, (max-width: 1440px) 44vw, 633px";
  return (
    <Image
      src={src}
      alt=""
      width={intrinsic.w}
      height={intrinsic.h}
      sizes={sizes}
      loading="lazy"
      className="block w-full h-auto rounded-lg"
    />
  );
}

function GalleryRow({ row, rowIndex }: { row: GalleryRowType; rowIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: rowIndex * 0.07 }}
      className="gallery-row"
      style={{
        display: row.type === "two-columns" ? "grid" : "block",
        gridTemplateColumns: row.type === "two-columns" ? "1fr 1fr" : undefined,
        gap: "27px",
        alignItems: "start",
      }}
    >
      {row.type === "two-columns" ? (
        <>
          <MediaBox src={row.images[0]} media="image" fullWidth={false} />
          <MediaBox src={row.images[1]} media="image" fullWidth={false} />
        </>
      ) : (
        <MediaBox src={row.src} media={row.media} fullWidth={true} />
      )}
    </motion.div>
  );
}

/* Recent project card — untouched */
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
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0" style={{ padding: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: "#FFFFFF", lineHeight: 1.2 }}>
          *{project.title}
        </p>
        <p className="truncate" style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.7)", lineHeight: 1.3, marginTop: 2 }}>
          {project.description}
        </p>
      </div>
    </TransitionLink>
  );
}

/* ─────────────────────────────── main component ─────────────────────── */

export default function ProjectPageClient({ project }: { project: Project }) {
  const recentProjects = useMemo(() => {
    return projects
      .filter((p) => p.id !== project.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [project.id]);

  return (
    <>
      <style>{`
        /* ── Hero ── */
        .project-hero {
          display: flex;
          gap: 73px;
          padding: 155px 74px 32px;
          align-items: flex-start;
        }
        .project-hero-left {
          width: min(586px, 45%);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 190px;
        }
        .project-hero-media {
          flex: 1;
          aspect-ratio: 632.5 / 525.63;
          background: #f5f5f5;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          max-width: 100%;
          min-width: 0;
        }

        /* ── Gallery ── */
        .project-gallery {
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding: 0 74px;
          margin-top: 32px;
        }

        /* ── Recent Work ── */
        .project-recent {
          margin-top: 80px;
          padding: 0 74px;
        }

        /* ── Bio ── */
        .project-bio {
          margin-top: 60px;
          padding: 0 74px 48px;
        }

        /* ── Tablet (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .project-hero {
            padding: 120px 40px 32px;
            gap: 40px;
          }
          .project-hero-left {
            width: min(480px, 45%);
            gap: 80px;
          }
          .project-gallery {
            padding: 0 40px;
          }
          .project-recent {
            padding: 0 40px;
          }
          .project-bio {
            padding: 0 40px 48px;
          }
        }

        /* ── Mobile landscape / large phone (≤ 768px) ── */
        @media (max-width: 768px) {
          .project-hero {
            flex-direction: column;
            padding: 100px 24px 24px;
            gap: 32px;
          }
          .project-hero-left {
            width: 100% !important;
            gap: 40px !important;
          }
          .project-hero-media {
            width: 100%;
            flex: none;
          }
          .project-gallery {
            padding: 0 24px;
          }
          .gallery-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .project-recent {
            padding: 0 24px;
          }
          .project-bio {
            padding: 0 24px 40px;
          }
        }

        /* ── Small mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .project-hero {
            padding: 88px 20px 20px;
            gap: 24px;
          }
          .project-gallery {
            padding: 0 20px;
            gap: 20px;
          }
          .project-recent {
            padding: 0 20px;
            margin-top: 56px;
          }
          .project-bio {
            padding: 0 20px 32px;
            margin-top: 40px;
          }
        }
      `}</style>

      <main>

        {/* ── HERO ── */}
        <div className="project-hero">

          {/* Left column */}
          <div className="project-hero-left">

            {/* Group 1: badge + description */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

              {/* Badge */}
              <span style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "6px 12px",
                border: "1px solid #0545E8",
                borderRadius: "31px",
                fontSize: "14px",
                fontWeight: 400,
                color: "#0545E8",
                width: "fit-content",
              }}>
                {project.title}
              </span>

              {/* Description */}
              <p style={{
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "30px",
                color: "#20201F",
                margin: 0,
              }}>
                {project.projectDescription}
              </p>
            </div>

            {/* Group 2: metadata table */}
            <div>
              {[
                { label: "CLIENT",  value: project.client  },
                { label: "DATE",    value: project.date    },
                { label: "SERVICE", value: project.service },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "43px",
                  borderTop: "1px solid rgba(25,29,35,0.12)",
                  borderBottom: i === 2 ? "1px solid rgba(25,29,35,0.12)" : "none",
                }}>
                  <span style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    letterSpacing: "-0.5px",
                    textTransform: "uppercase",
                    color: "#20201F",
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    lineHeight: "23px",
                    letterSpacing: "-0.2px",
                    color: "#20201F",
                    textAlign: "right",
                  }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — hero media */}
          <div className="project-hero-media">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 633px"
              priority
            />
          </div>
        </div>

        {/* ── GALLERY ── */}
        <section className="project-gallery">
          {project.gallery.map((row, rowIndex) => (
            <GalleryRow key={rowIndex} row={row} rowIndex={rowIndex} />
          ))}
        </section>

        {/* ── RECENT WORK ── */}
        <section className="project-recent">
          {/* Header */}
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
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(25,29,35,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              View all works
            </TransitionLink>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((p) => (
              <RecentCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        {/* ── BIO ── */}
        <div className="project-bio">
          <BioSection />
        </div>
      </main>
    </>
  );
}
