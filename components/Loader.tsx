"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { IMAGES, SITE_NAME } from "@/lib/config";

type Phase = "reveal" | "flicker" | "exit" | "hidden";

const EASE = [0.76, 0, 0.24, 1] as const;

const maskStyle: CSSProperties = {
  WebkitMaskImage: `url(${IMAGES.logo})`,
  maskImage: `url(${IMAGES.logo})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

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
            <div className="relative w-[70vw] max-w-md aspect-[1652/591]">
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
          {/* Expanding glow ring — the void opening up */}
          <motion.div
            aria-hidden
            className="absolute h-8 w-8 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(125,252,255,0.55), rgba(185,139,255,0.25) 45%, transparent 70%)",
              filter: "blur(6px)",
            }}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 26, opacity: 0 }}
            transition={{ duration: 1.3, ease: EASE }}
          />

          <motion.div
            className="relative w-[70vw] max-w-md aspect-[1652/591]"
            initial={{ clipPath: "circle(0% at 50% 50%)", filter: "blur(10px)", scale: 0.9 }}
            animate={{ clipPath: "circle(150% at 50% 50%)", filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.3, ease: EASE }}
            onAnimationComplete={() => {
              if (phase === "reveal") setPhase("flicker");
            }}
          >
            <Image src={IMAGES.logo} alt={`${SITE_NAME} logo`} fill className="object-contain" priority />
          </motion.div>

          {phase === "flicker" && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative w-[70vw] max-w-md aspect-[1652/591]">
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: [1, 0.2, 1, 0.35, 1] }}
                  transition={{ duration: 0.55, times: [0, 0.2, 0.45, 0.7, 1] }}
                  onAnimationComplete={() => setPhase("exit")}
                >
                  <Image src={IMAGES.logo} alt="" aria-hidden fill className="object-contain" priority />
                </motion.div>
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ ...maskStyle, background: "#7dfcff", mixBlendMode: "screen" }}
                  animate={{ opacity: [0, 0.9, 0, 0.6, 0], x: [0, -6, 0, -3, 0] }}
                  transition={{ duration: 0.55, times: [0, 0.2, 0.45, 0.7, 1] }}
                />
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ ...maskStyle, background: "#b98bff", mixBlendMode: "screen" }}
                  animate={{ opacity: [0, 0.9, 0, 0.6, 0], x: [0, 6, 0, 3, 0] }}
                  transition={{ duration: 0.55, times: [0, 0.2, 0.45, 0.7, 1] }}
                />
              </div>
            </div>
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
