"use client";

import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";
import { COPY } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function FirstWave() {
  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={container}
        className="mx-auto flex max-w-2xl flex-col items-center gap-10 text-center"
      >
        <motion.div variants={item} className="flex flex-col items-center gap-4">
          <span className="text-xs tracking-[0.4em] text-cyan uppercase">
            {COPY.firstWave.eyebrow}
          </span>
          <h2 className="font-display text-4xl leading-[0.95] tracking-wide text-ghost sm:text-6xl">
            {COPY.firstWave.headline}
          </h2>
          <p className="max-w-md text-base text-ghost-dim sm:text-lg">{COPY.firstWave.body}</p>
        </motion.div>

        <motion.ul variants={item} className="flex flex-col gap-3">
          {COPY.firstWave.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center justify-center gap-3 text-sm text-ghost sm:text-base">
              <span className="glow-cyan text-cyan">✦</span>
              <span>{benefit}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div variants={item} className="w-full">
          <WaitlistForm ctaLabel={COPY.firstWave.cta} />
        </motion.div>
      </motion.div>
    </section>
  );
}
