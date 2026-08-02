"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const ThreeVoid = dynamic(() => import("@/components/ThreeVoid"), { ssr: false });

export default function ThreeVoidBackground() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden>
      <ThreeVoid />
    </div>
  );
}
