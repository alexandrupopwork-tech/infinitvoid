"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { useStarField } from "@/components/StarFieldProvider";
import { COPY } from "@/lib/config";

type Status = "idle" | "loading" | "morphing" | "success" | "error";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WaitlistForm({ ctaLabel }: { ctaLabel?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { launchStar, justJoined } = useStarField();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading" || status === "morphing" || status === "success") return;

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }

      const rect = buttonRef.current?.getBoundingClientRect();
      const origin = {
        x: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
        y: rect ? rect.top + rect.height / 2 : window.innerHeight / 2,
      };

      // Beat 1: the button morphs into a single point of light.
      setStatus("morphing");

      window.setTimeout(() => {
        // Beat 2: the form dissolves and the spark launches into the sky.
        setStatus("success");
        setEmail("");
        launchStar(origin);
      }, 420);
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  const showSuccess = status === "success" || (justJoined && status === "idle");
  const formVisible = !showSuccess;

  return (
    <div className="mx-auto w-full max-w-lg">
      <AnimatePresence mode="wait">
        {formVisible ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            exit={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder={COPY.hero.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status !== "idle" && status !== "error"}
              className="w-full flex-1 border border-white/15 bg-white/5 px-5 py-4 text-base text-ghost placeholder:text-ghost-dim outline-none transition-colors duration-300 focus:border-cyan/70 disabled:opacity-50"
            />
            <MagneticButton
              ref={buttonRef}
              type="submit"
              disabled={status !== "idle" && status !== "error"}
              className="group relative flex min-w-[168px] items-center justify-center overflow-hidden border border-ghost/30 bg-ghost px-7 py-4 font-display text-sm tracking-[0.15em] text-void transition-colors duration-300 hover:border-cyan disabled:cursor-not-allowed"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "morphing" ? (
                  <motion.span
                    key="spark"
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: [0.4, 1.3, 1] }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="glow-cyan block h-2 w-2 rounded-full bg-void"
                  />
                ) : (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    {status === "loading" ? COPY.hero.ctaPending : (ctaLabel ?? COPY.hero.cta)}
                  </motion.span>
                )}
              </AnimatePresence>
            </MagneticButton>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: status === "success" ? 0.9 : 0, ease: EASE }}
            className="flex items-center justify-center gap-2 py-4"
          >
            <span className="glow-cyan text-lg text-cyan">✦</span>
            <span className="font-display text-sm tracking-[0.2em] text-ghost-dim uppercase">
              You&apos;re in
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "error" && message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-sm text-violet"
          role="alert"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
