import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

/** Server-only Stripe client. Never import this from a client component. */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return client;
}
