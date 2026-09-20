"use client";

import { motion } from "framer-motion";
import { COPY } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FirstDrop() {
  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center"
      >
        <span className="text-xs tracking-[0.4em] text-violet uppercase">
          {COPY.firstDrop.eyebrow}
        </span>

        <h2 className="font-display text-chrome text-4xl leading-[0.95] tracking-wide sm:text-6xl md:text-7xl">
          {COPY.firstDrop.headline}
        </h2>

        <p className="max-w-lg text-base leading-relaxed text-ghost-dim sm:text-lg">
          {COPY.firstDrop.body}
        </p>
      </motion.div>
    </section>
  );
}
