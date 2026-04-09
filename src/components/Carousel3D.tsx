"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { usePageTransition } from "./PageTransition";

function useCardSize() {
  const [size, setSize] = useState({ w: 580, h: 380 });

  useEffect(() => {
    function update() {
      const vw = window.innerWidth;
      if (vw < 480) setSize({ w: 320, h: 220 });
      else if (vw < 768) setSize({ w: 440, h: 300 });
      else setSize({ w: 580, h: 380 });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export default function Carousel3D() {
  const { navigateTo } = usePageTransition();
  const cylinderRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetAngle = useRef(0);
  const currentAngle = useRef(0);
  const rafId = useRef<number>(0);
  const dragActive = useRef(false);
  const dragStartX = useRef(0);
  const dragDistance = useRef(0);
  const pressedSlug = useRef<string | null>(null);

  /* ---- Auto-scroll state ---- */
  const lastInteractionTime = useRef(0);
  const lastFrameTime = useRef(0);
  /* 6 deg/sec = 360° / 60s — one full turn every 60 seconds */
  const AUTO_ROTATION_DEG_PER_SEC = 6;
  /* Resume auto-scroll 3 seconds after the user stops interacting */
  const AUTO_RESUME_DELAY_MS = 3000;

  const markUserInteraction = () => {
    lastInteractionTime.current = Date.now();
  };

  /* Custom cursor position (lerped) */
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const [cursorVisible, setCursorVisible] = useState(false);

  const { w: cardWidth, h: cardHeight } = useCardSize();
  const carouselProjects = projects.slice(0, 6);
  const cardCount = carouselProjects.length;
  const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / cardCount)) + 150;

  /* ---- Animation loop (lerp + z-index + cursor + auto-scroll) ---- */
  useEffect(() => {
    const animate = (now: number) => {
      /* Delta-time for frame-rate-independent auto-rotation */
      const dt = lastFrameTime.current ? (now - lastFrameTime.current) / 1000 : 0;
      lastFrameTime.current = now;

      /* Auto-rotate if the user hasn't interacted for a while.
         Adds directly to targetAngle so it stacks with user-driven rotation. */
      const idleMs = Date.now() - lastInteractionTime.current;
      if (idleMs > AUTO_RESUME_DELAY_MS && !dragActive.current) {
        targetAngle.current += AUTO_ROTATION_DEG_PER_SEC * dt;
      }

      currentAngle.current +=
        (targetAngle.current - currentAngle.current) * 0.07;

      if (cylinderRef.current) {
        cylinderRef.current.style.transform = `translateZ(${-radius}px) rotateY(${currentAngle.current}deg)`;

        const cards = cylinderRef.current.children;
        for (let i = 0; i < cards.length; i++) {
          const card = cards[i] as HTMLElement;
          const cardAngle =
            ((i / cardCount) * 360 + currentAngle.current) % 360;
          const normalized = ((cardAngle % 360) + 360) % 360;
          const distFromFront =
            normalized > 180 ? 360 - normalized : normalized;
          const zIndex = Math.round(180 - distFromFront);
          card.style.zIndex = `${zIndex}`;
        }
      }

      /* Smooth cursor follow */
      cursorX.current += (mouseX.current - cursorX.current) * 0.15;
      cursorY.current += (mouseY.current - cursorY.current) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX.current}px, ${cursorY.current}px, 0) translate(-50%, -50%) scale(${cursorVisible ? 1 : 0.8})`;
        cursorRef.current.style.opacity = cursorVisible ? "1" : "0";
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [radius, cardCount, cursorVisible]);

  /* ---- Wheel (vertical scroll → rotation) ---- */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetAngle.current += e.deltaY * 0.3;
      markUserInteraction();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  /* ---- Touch events (mobile swipe) ---- */
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      markUserInteraction();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = touchStartY - e.touches[0].clientY;
      targetAngle.current += deltaY * 0.5;
      touchStartY = e.touches[0].clientY;
      markUserInteraction();
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  /* ---- Horizontal drag ---- */
  const onPointerDown = (e: React.PointerEvent) => {
    dragActive.current = true;
    dragDistance.current = 0;
    dragStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    markUserInteraction();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    /* Always track mouse for custom cursor */
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;

    if (!dragActive.current) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = e.clientX;
    dragDistance.current += Math.abs(dx);
    targetAngle.current -= dx * 0.3;
    markUserInteraction();
  };

  const onPointerUp = () => {
    dragActive.current = false;
    /* If total drag distance was tiny → treat as click */
    if (dragDistance.current < 5 && pressedSlug.current) {
      navigateTo(`/work/${pressedSlug.current}`);
    }
    pressedSlug.current = null;
    markUserInteraction();
  };

  /* ---- Card hover handlers ---- */
  const onCardEnter = (e: React.MouseEvent) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
    cursorX.current = e.clientX;
    cursorY.current = e.clientY;
    setCursorVisible(true);
  };

  const onCardLeave = () => {
    setCursorVisible(false);
  };

  /* ---- Card press — record which card was pressed (navigation happens in onPointerUp) ---- */
  const onCardPress = (slug: string) => {
    pressedSlug.current = slug;
  };

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          opacity: 0,
          willChange: "transform, opacity",
          transition: "opacity 0.2s ease",
          transform: "translate3d(0, 0, 0) translate(-50%, -50%) scale(0.8)",
        }}
      >
        <div
          style={{
            backgroundColor: "#191D23",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 400,
            padding: "5px 16px",
            borderRadius: 4,
            whiteSpace: "nowrap",
          }}
        >
          See the project
        </div>
      </div>

      {/* Carousel */}
      <div
        className="w-full flex items-center justify-center select-none"
        style={{
          perspective: 1800,
          perspectiveOrigin: "center center",
          height: "100%",
          cursor: cursorVisible ? "none" : "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={cylinderRef}
          style={{
            width: cardWidth,
            height: cardHeight,
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `translateZ(${-radius}px) rotateY(0deg)`,
          }}
        >
          {carouselProjects.map((project, index) => {
            const angle = (index / cardCount) * 360;

            return (
              <div
                key={project.id}
                className="absolute inset-0 rounded-lg overflow-hidden"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backgroundColor: "#1a1a1a",
                  cursor: "none",
                }}
                onMouseEnter={onCardEnter}
                onMouseLeave={onCardLeave}
                onPointerDown={() => onCardPress(project.slug)}
              >
                {project.carousel?.type === "video" ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    src={project.carousel.src}
                  />
                ) : project.carousel?.type === "image" ? (
                  <Image
                    src={project.carousel.src}
                    alt={project.title}
                    fill
                    sizes="(max-width: 480px) 320px, (max-width: 768px) 440px, 580px"
                    priority={index < 3}
                    draggable={false}
                    className="object-cover pointer-events-none"
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: "#1a1a1a" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
