"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import BioSection from "@/components/BioSection";

const Carousel3D = dynamic(() => import("@/components/Carousel3D"), {
  ssr: false,
});

export default function Home() {
  /* Block native scroll — wheel controls the carousel */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <style>{`
        .home-bio-wrapper {
          padding: 0 74px 48px;
        }
        @media (max-width: 1024px) {
          .home-bio-wrapper {
            padding: 0 40px 40px;
          }
        }
        @media (max-width: 640px) {
          .home-bio-wrapper {
            padding: 0 20px 32px;
          }
        }
      `}</style>

      <main
        className="flex flex-col"
        style={{ paddingTop: 64, height: "100vh", overflow: "hidden" }}
      >
        <div className="flex-1 flex items-center justify-center">
          <Carousel3D />
        </div>
        <div className="home-bio-wrapper">
          <BioSection />
        </div>
      </main>
    </>
  );
}
