"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

type ProductFace = { id: string; label: string; src: string };

type ProductCardProps = {
  front: ProductFace;
  back: ProductFace;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ProductCard({ front, back }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const tiltRangeX = reducedMotion ? [0, 0] : [8, -8];
  const tiltRangeY = reducedMotion ? [0, 0] : [-8, 8];
  const tiltX = useSpring(useTransform(mouseY, [0, 1], tiltRangeX), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [0, 1], tiltRangeY), springConfig);
  const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(125,252,255,0.18), rgba(185,139,255,0.08) 35%, transparent 65%)`
  );

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setFlipped(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="group mx-auto flex w-full max-w-md flex-col items-center gap-5"
    >
      <div className="relative aspect-[4/5] w-full" style={{ perspective: 1600 }}>
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setFlipped(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setFlipped((f) => !f)}
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.02 }}
          transition={{ scale: { duration: 0.4, ease: EASE } }}
          className="relative h-full w-full cursor-pointer"
        >
          <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: reducedMotion ? 0.05 : 0.85, ease: EASE }}
          >
            {[front, back].map((face, i) => (
              <div
                key={face.id}
                className="absolute inset-0"
                style={{ backfaceVisibility: "hidden", transform: i === 1 ? "rotateY(180deg)" : undefined }}
              >
                {/* ambient cursor-follow glow, behind the garment, hover-only */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: glowBackground }}
                />

                {/* thin grounding line under the hoodie, no haze */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-[18%] bottom-[7%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />

                <Image
                  src={face.src}
                  alt={face.label}
                  fill
                  quality={95}
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  priority={i === 0}
                  className="object-contain object-bottom drop-shadow-[0_12px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-ghost-dim uppercase">
        <span>{flipped ? back.label : front.label}</span>
        <span className="text-ghost-dim/40">·</span>
        <span className="normal-case tracking-normal text-ghost-dim/70">Hover or tap to flip</span>
      </div>
    </motion.div>
  );
}
