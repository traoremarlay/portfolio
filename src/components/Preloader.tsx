"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const unit = 28;

const blocks = [
  { id: "a", x: 1, y: 0, w: 1, h: 1, delay: 0.3 },
  { id: "b", x: 0, y: 1, w: 1, h: 1, delay: 0.55 },
  { id: "c", x: 2, y: 1, w: 2, h: 1, delay: 0.85 },
  { id: "d", x: 4, y: 0, w: 3, h: 1, delay: 1.15 },
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <div
        className="relative"
        style={{ width: unit * 7, height: unit * 2 }}
      >
        {blocks.map((block) => (
          <motion.div
            key={block.id}
            className="absolute bg-[#191D23]"
            style={{
              left: block.x * unit,
              top: block.y * unit,
              width: block.w * unit,
              height: block.h * unit,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: block.delay,
            }}
          />
        ))}

        {/* ® symbol */}
        <motion.span
          className="absolute"
          style={{
            right: -22,
            top: -18,
            fontSize: 16,
            fontWeight: 400,
            color: "#191D23",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.5 }}
        >
          ®
        </motion.span>
      </div>
    </div>
  );
}
