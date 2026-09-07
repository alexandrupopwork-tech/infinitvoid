import { after } from "next/server";
import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/Logo";
import { getStripe } from "@/lib/stripe";
import { recordOrderFromSession } from "@/lib/orders";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return <StatusPage headline="Nothing to confirm here." body="No order reference was found." />;
  }

  let paid = false;
  let size = "";
  let orderId = "";
  let amountCents = 0;
  let currency = "eur";
  let email: string | null = null;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    paid = session.payment_status === "paid";
    size = session.metadata?.size ?? "";
    orderId = session.id;
    amountCents = session.amount_total ?? 0;
    currency = session.currency ?? "eur";
    email = session.customer_details?.email ?? session.customer_email ?? null;

    if (paid) {
      after(async () => {
        await recordOrderFromSession(session);
        if (email) {
          await sendOrderConfirmationEmail(email, { size, amountCents, currency, orderId });
        }
      });
    }
  } catch (err) {
    console.error("failed to verify checkout session", err);
  }

  if (!paid) {
    return (
      <StatusPage
        headline="We couldn't confirm that order."
        body="If you were charged, it will show up in your bank statement and we'll follow up by email. Otherwise, nothing was charged."
      />
    );
  }

  return (
    <StatusPage
      headline="It's yours."
      body={`Your ${SITE_NAME} zip hoodie (Size ${size}) is confirmed.${
        email ? ` A confirmation is on its way to ${email}.` : ""
      } We'll email you again the moment it ships.`}
    />
  );
}

function StatusPage({ headline, body }: { headline: string; body: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-void px-6 py-24 text-center">
      <Logo className="h-12 w-12" sizes="48px" />
      <div className="flex max-w-md flex-col gap-4">
        <h1 className="font-display text-chrome text-4xl tracking-wide sm:text-5xl">{headline}</h1>
        <p className="text-sm leading-relaxed text-ghost-dim sm:text-base">{body}</p>
      </div>
      <Link
        href="/"
        className="border border-ghost/30 bg-ghost px-7 py-4 font-display text-sm tracking-[0.15em] text-void transition-colors duration-300 hover:border-cyan"
      >
        Back to the void
      </Link>
    </div>
  );
}
