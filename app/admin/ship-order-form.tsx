"use client";

import { useActionState } from "react";
import { markOrderShipped, type MarkShippedState } from "@/app/admin/actions";

const initialState: MarkShippedState = { error: null };

export default function ShipOrderForm({ orderId }: { orderId: string }) {
  const [state, formAction, isPending] = useActionState(markOrderShipped.bind(null, orderId), initialState);

  return (
    <form action={formAction} className="flex flex-col items-end gap-1.5">
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          name="trackingNumber"
          required
          placeholder="Tracking #"
          className="w-28 border border-white/15 bg-white/5 px-2 py-1.5 text-xs text-ghost placeholder:text-ghost-dim outline-none transition-colors duration-300 focus:border-cyan/70"
        />
        <input
          type="url"
          name="trackingUrl"
          placeholder="Tracking URL (optional)"
          className="w-36 border border-white/15 bg-white/5 px-2 py-1.5 text-xs text-ghost placeholder:text-ghost-dim outline-none transition-colors duration-300 focus:border-cyan/70"
        />
        <button
          type="submit"
          disabled={isPending}
          className="border border-white/15 px-3 py-1.5 text-xs tracking-[0.1em] text-ghost-dim uppercase transition-colors duration-300 hover:border-cyan hover:text-cyan disabled:opacity-50"
        >
          {isPending ? "…" : "Ship"}
        </button>
      </div>
      {state.error && (
        <p role="alert" className="text-xs text-violet">
          {state.error}
        </p>
      )}
    </form>
  );
}
