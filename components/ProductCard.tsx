"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

type ProductFace = { id: string; label: string; src: string };

type ProductCardProps = {
  front: ProductFace;
  back: ProductFace;
};

const EASE = [0.16, 1, 0.3, 1] as const;

function Face({ face, index, priority }: { face: ProductFace; index: number; priority: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
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
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.12 }}
      className="group flex w-full flex-col items-center gap-5"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[4/5] w-full"
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
          sizes="(min-width: 1024px) 40vw, 90vw"
          priority={priority}
          className="object-contain object-bottom drop-shadow-[0_12px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <span className="text-xs tracking-[0.3em] text-ghost-dim uppercase">{face.label}</span>
    </motion.div>
  );
}

export default function ProductCard({ front, back }: ProductCardProps) {
  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8">
      <Face face={front} index={0} priority />
      <Face face={back} index={1} priority={false} />
    </div>
  );
}
