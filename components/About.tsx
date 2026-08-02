"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-2xl flex-col gap-6 text-center"
      >
        <span className="text-xs tracking-[0.4em] text-violet uppercase">The Brand</span>

        <p className="text-lg leading-relaxed text-ghost sm:text-xl">
          INFINITVOID is cut-and-sew, not print-on-demand. Every piece is patterned, sampled, and
          locked before it ever touches a body — built the way real garments are built, not
          printed onto whatever&apos;s in stock. Nothing here is filler. Every drop is designed
          once, produced in limited numbers, and never restocked.
        </p>

        <p className="text-lg leading-relaxed text-ghost-dim sm:text-xl">
          We make for the hours nobody sees — the last rep, the empty gym, the walk home in the
          dark. Dark, cinematic streetwear built for training and built to last past it. When a
          drop is gone, it&apos;s gone. That&apos;s the point.
        </p>
      </motion.div>
    </section>
  );
}
