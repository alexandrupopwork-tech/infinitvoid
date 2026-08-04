"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  if (reducedMotion) return null;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      aria-hidden
    >
      <motion.div
        className="pointer-events-none absolute h-[38vw] w-[38vw] max-h-[420px] max-w-[420px] rounded-full opacity-[0.06]"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(125,252,255,0.9), rgba(185,139,255,0.4) 45%, transparent 72%)",
        }}
      />
    </div>
  );
}
