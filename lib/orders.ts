import "server-only";
import type Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Saves a paid Checkout Session as an order. Stripe's own dashboard is
 * always the source of truth for whether payment succeeded — this is a
 * convenience mirror for our own admin dashboard, so a failure here must
 * never be treated as "the payment failed." Safe to call more than once
 * for the same session (stripe_session_id is unique; a duplicate insert
 * is swallowed, not treated as an error).
 *
 * Returns whether this call newly inserted the order (true) versus it
 * already existed or the insert failed (false) — callers use this to
 * decide whether to send the one-time confirmation email, since both the
 * success page and the optional webhook can be triggered more than once
 * for the same session (a revisited link, a Stripe webhook retry, both
 * paths firing for the same order, ...).
 */
export async function recordOrderFromSession(session: Stripe.Checkout.Session): Promise<boolean> {
  if (session.payment_status !== "paid") return false;

  const size = session.metadata?.size ?? "unknown";
  const email = session.customer_details?.email ?? session.customer_email ?? "unknown";

  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("orders").insert({
    stripe_session_id: session.id,
    email,
    size,
    amount_total: session.amount_total ?? 0,
    currency: session.currency ?? "eur",
    status: "paid",
    shipping_address: session.customer_details?.address ?? null,
  });

  if (error) {
    // Postgres unique_violation on stripe_session_id = already recorded, fine.
    if (error.code !== "23505") console.error("failed to record order", error);
    return false;
  }

  return true;
}
