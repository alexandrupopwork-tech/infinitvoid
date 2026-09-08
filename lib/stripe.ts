import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

/** Server-only Stripe client. Never import this from a client component. */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!client) {
    // Serverless functions freeze/thaw between invocations, which can leave
    // the SDK's default Node https.Agent holding a stale keep-alive socket
    // — that surfaces as StripeConnectionError. The fetch-based client
    // doesn't reuse a persistent agent across invocations, avoiding it.
    client = new Stripe(process.env.STRIPE_SECRET_KEY, {
      httpClient: Stripe.createFetchHttpClient(),
    });
  }
  return client;
}
