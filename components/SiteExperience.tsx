"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";

export default function SiteExperience({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Loader onComplete={() => setReady(true)} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
