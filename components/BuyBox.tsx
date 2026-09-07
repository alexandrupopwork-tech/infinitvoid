"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCT } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;

function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: currency.toUpperCase() }).format(
    cents / 100
  );
}

export default function BuyBox() {
  const [size, setSize] = useState<(typeof PRODUCT.sizes)[number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    if (!size || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ size }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mx-auto mt-16 flex w-full max-w-md flex-col items-center gap-5"
    >
      <p className="font-display text-chrome text-2xl tracking-wide">
        {formatPrice(PRODUCT.priceCents, PRODUCT.currency)}
      </p>

      <div className="flex items-center gap-2">
        {PRODUCT.sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            aria-pressed={size === s}
            className={`h-11 w-11 border text-sm tracking-[0.05em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void ${
              size === s
                ? "border-cyan bg-cyan/10 text-ghost"
                : "border-white/15 text-ghost-dim hover:border-white/40"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleBuy}
        disabled={!size || loading}
        className="w-full border border-ghost/30 bg-ghost px-7 py-4 font-display text-sm tracking-[0.15em] text-void transition-colors duration-300 hover:border-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "OPENING CHECKOUT…" : size ? "BUY NOW" : "SELECT A SIZE"}
      </button>

      {error && (
        <p role="alert" className="text-sm text-violet">
          {error}
        </p>
      )}

      <p className="text-center text-xs text-ghost-dim/70">
        Secure checkout via Stripe. Ships to the EU.{" "}
        <a href="/size-guide" className="underline decoration-ghost-dim/40 underline-offset-2 hover:text-ghost">
          Size guide
        </a>
      </p>
    </motion.div>
  );
}
