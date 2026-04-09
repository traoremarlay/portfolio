"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/projects";
import { TransitionLink } from "@/components/PageTransition";
import BioSection from "@/components/BioSection";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: (index % 3) * 0.08,
      }}
    >
      <TransitionLink
        href={`/work/${project.slug}`}
        className="block relative overflow-hidden rounded-xl group"
        style={{ aspectRatio: "4 / 3" }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: 16 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#FFFFFF",
              lineHeight: 1.2,
            }}
          >
            *{project.title}
          </p>
          <p
            className="truncate"
            style={{
              fontSize: 11,
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.3,
              marginTop: 2,
            }}
          >
            {project.description}
          </p>
        </div>
      </TransitionLink>
    </motion.div>
  );
}

export default function WorkPageClient() {
  return (
    <>
      <style>{`
        .work-main {
          padding-top: 64px;
          padding-left: 74px;
          padding-right: 74px;
        }
        .work-header {
          padding: 100px 0 60px;
        }
        .work-bio-wrapper {
          margin-top: 80px;
          padding: 0 0 48px;
        }
        @media (max-width: 1024px) {
          .work-main {
            padding-left: 40px;
            padding-right: 40px;
          }
        }
        @media (max-width: 640px) {
          .work-main {
            padding-left: 20px;
            padding-right: 20px;
          }
          .work-header {
            padding: 60px 0 40px;
          }
          .work-bio-wrapper {
            margin-top: 60px;
          }
        }
      `}</style>

      <main className="work-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="work-header flex justify-center"
        >
          <div className="flex items-start gap-3">
            <h1
              style={{
                fontSize: "clamp(64px, 14vw, 220px)",
                fontWeight: 600,
                color: "#191D23",
                letterSpacing: "-0.04em",
                lineHeight: 0.85,
              }}
            >
              WORKS
            </h1>
            <span
              style={{
                fontSize: "clamp(14px, 2vw, 22px)",
                fontWeight: 400,
                color: "#191D23",
                whiteSpace: "nowrap",
                paddingTop: "0.1em",
              }}
            >
              ©21 — 26
            </span>
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bio section */}
        <div className="work-bio-wrapper">
          <BioSection />
        </div>
      </main>
    </>
  );
}
