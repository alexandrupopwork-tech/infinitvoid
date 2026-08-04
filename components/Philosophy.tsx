"use client";

import { motion } from "framer-motion";
import { COPY } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.28 } },
};

const line = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={container}
        className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center"
      >
        <motion.span variants={line} className="text-xs tracking-[0.4em] text-cyan uppercase">
          {COPY.philosophy.eyebrow}
        </motion.span>

        {COPY.philosophy.lines.map((text, i) => (
          <motion.p
            key={i}
            variants={line}
            className={
              i === 0
                ? "font-display text-3xl leading-tight tracking-wide text-ghost sm:text-4xl md:text-5xl"
                : "max-w-xl text-lg leading-relaxed text-ghost-dim sm:text-xl"
            }
          >
            {text}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
}
