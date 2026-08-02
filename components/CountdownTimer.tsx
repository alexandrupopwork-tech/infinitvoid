"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LAUNCH_DATE } from "@/lib/config";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, new Date(LAUNCH_DATE).getTime() - Date.now());
  const seconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function FlipDigit({ value }: { value: string }) {
  return (
    <span
      className="relative inline-block h-[1em] w-[0.62em] overflow-hidden text-center"
      style={{ perspective: 400 }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotateX: 70, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -70, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function TimeBlock({ label, value }: { label: string; value: number }) {
  const digits = value.toString().padStart(2, "0").split("");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flip-digit glow-cyan flex text-4xl text-ghost sm:text-5xl md:text-6xl">
        {digits.map((d, i) => (
          <FlipDigit key={i} value={d} />
        ))}
      </div>
      <span className="text-[10px] tracking-[0.3em] text-ghost-dim uppercase sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return <div className="h-[52px] sm:h-[64px] md:h-[76px]" aria-hidden />;
  }

  return (
    <div
      className="flex items-start gap-4 sm:gap-8"
      role="timer"
      aria-live="polite"
      aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until launch`}
    >
      <TimeBlock label="Days" value={timeLeft.days} />
      <TimeBlock label="Hours" value={timeLeft.hours} />
      <TimeBlock label="Min" value={timeLeft.minutes} />
      <TimeBlock label="Sec" value={timeLeft.seconds} />
    </div>
  );
}
