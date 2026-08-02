"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { IMAGES, SITE_NAME } from "@/lib/config";

type Phase = "reveal" | "flicker" | "exit" | "hidden";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("reveal");

  if (reducedMotion) {
    return (
      <AnimatePresence onExitComplete={onComplete}>
        {phase !== "hidden" && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onAnimationComplete={() => {
              if (phase === "reveal") {
                setTimeout(() => setPhase("hidden"), 250);
              }
            }}
          >
            <div className="relative h-24 w-24">
              <Image src={IMAGES.logo} alt={`${SITE_NAME} logo`} fill className="object-contain" priority />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "hidden" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
        >
          <div className="relative h-28 w-28 sm:h-36 sm:w-36">
            {/* Full-size static reference kept invisible to reserve layout */}
            <Image
              src={IMAGES.logo}
              alt={`${SITE_NAME} logo`}
              fill
              className="object-contain opacity-0"
              priority
            />

            {/* Wipe reveal */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, ease: EASE }}
              onAnimationComplete={() => {
                if (phase === "reveal") setPhase("flicker");
              }}
            >
              <div className="absolute inset-0 h-28 w-28 sm:h-36 sm:w-36">
                <Image
                  src={IMAGES.logo}
                  alt=""
                  aria-hidden
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Glowing leading edge */}
              <motion.div
                className="absolute top-0 right-0 h-full w-[3px]"
                style={{
                  background: "linear-gradient(180deg, #7dfcff, #b98bff)",
                  boxShadow: "0 0 12px 2px rgba(125,252,255,0.8), 0 0 28px 6px rgba(185,139,255,0.5)",
                }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.4, times: [0, 0.1, 0.85, 1] }}
              />
            </motion.div>
          </div>

          {phase === "flicker" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: [1, 0.25, 1, 0.4, 1] }}
              transition={{ duration: 0.5, times: [0, 0.2, 0.45, 0.7, 1] }}
              onAnimationComplete={() => setPhase("exit")}
            >
              <div className="relative h-28 w-28 sm:h-36 sm:w-36">
                <Image src={IMAGES.logo} alt="" aria-hidden fill className="object-contain" priority />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {phase === "exit" && <ExitTrigger onDone={() => setPhase("hidden")} />}
    </AnimatePresence>
  );
}

function ExitTrigger({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 50);
    return () => clearTimeout(id);
  }, [onDone]);
  return null;
}
