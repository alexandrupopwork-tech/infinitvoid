"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

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

      setStatus("success");
      setMessage(data.message ?? "You're officially on the list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glow-cyan font-display text-lg tracking-wide text-ghost sm:text-xl"
      >
        {message}
      </motion.p>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
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
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="w-full flex-1 border border-white/15 bg-white/5 px-4 py-3 text-sm text-ghost placeholder:text-ghost-dim outline-none transition-colors duration-300 focus:border-cyan/70 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative overflow-hidden border border-ghost/30 bg-ghost px-6 py-3 font-display text-sm tracking-[0.15em] text-void transition-all duration-300 hover:border-cyan disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10">{status === "loading" ? "JOINING…" : "JOIN THE WAITLIST"}</span>
        </button>
      </form>

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
