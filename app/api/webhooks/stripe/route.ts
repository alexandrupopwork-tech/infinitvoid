import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { recordOrderFromSession } from "@/lib/orders";
import { sendOrderConfirmationEmail } from "@/lib/email";

/**
 * Optional hardening path: the success page already records orders and
 * sends the confirmation email, which works fine for local/manual testing.
 * A webhook is more robust for production because it fires even if a
 * customer closes the tab right after paying, before the success page
 * loads. To enable it: Stripe Dashboard -> Developers -> Webhooks -> add
 * endpoint pointing at <site>/api/webhooks/stripe, listening for
 * checkout.session.completed, then set STRIPE_WEBHOOK_SECRET to the
 * signing secret it gives you. recordOrderFromSession() is duplicate-safe
 * either way (unique stripe_session_id), so running both paths is fine.
 */
export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 400 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("stripe webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      await recordOrderFromSession(session);

      const email = session.customer_details?.email ?? session.customer_email;
      if (email && session.payment_status === "paid") {
        await sendOrderConfirmationEmail(email, {
          size: session.metadata?.size ?? "unknown",
          amountCents: session.amount_total ?? 0,
          currency: session.currency ?? "eur",
          orderId: session.id,
        });
      }
    } catch (err) {
      console.error("stripe webhook processing failed", err);
      return NextResponse.json({ error: "Processing failed." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
