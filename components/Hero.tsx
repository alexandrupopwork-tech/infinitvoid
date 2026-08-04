"use client";

import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import WaitlistForm from "@/components/WaitlistForm";
import CursorGlow from "@/components/CursorGlow";
import { useReveal } from "@/components/SiteExperience";
import { useStarField } from "@/components/StarFieldProvider";
import { COPY } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;

function HeadlineWords({ text, ready }: { text: string; ready: boolean }) {
  const words = text.split(" ");

  return (
    <span className="inline-block overflow-hidden">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={ready ? { y: "0%" } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.09 }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ready = useReveal();
  const { justJoined } = useStarField();
  const headline = justJoined ? COPY.success.headline : COPY.hero.headline;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-7 overflow-hidden px-6 pt-24 pb-16 text-center sm:gap-9">
      <CursorGlow />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: EASE }}
      >
        <Logo
          variant="wide"
          className="w-40 sm:w-52"
          glitch
          priority
          sizes="208px"
        />
      </motion.div>

      <h1 className="font-display text-5xl leading-[0.95] tracking-[0.02em] text-ghost sm:text-7xl md:text-8xl">
        <motion.span
          key={headline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <HeadlineWords text={headline} ready={ready} />
        </motion.span>
      </h1>

      <motion.div
        className="flex max-w-md flex-col gap-1"
        initial={{ opacity: 0, y: 12 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
      >
        {justJoined ? (
          <p className="text-sm text-ghost-dim sm:text-base">{COPY.success.body}</p>
        ) : (
          <>
            <p className="text-sm text-ghost-dim sm:text-base">{COPY.hero.sub}</p>
            <p className="text-sm text-ghost sm:text-base">{COPY.hero.subEmphasis}</p>
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
        className="w-full"
      >
        <WaitlistForm />
      </motion.div>
    </section>
  );
}
