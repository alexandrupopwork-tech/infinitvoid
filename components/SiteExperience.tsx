"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";

const RevealContext = createContext(false);

/** True once the intro loader has finished and page content is revealed. */
export function useReveal() {
  return useContext(RevealContext);
}

export default function SiteExperience({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <RevealContext.Provider value={ready}>
      <Loader onComplete={() => setReady(true)} />
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </RevealContext.Provider>
  );
}
