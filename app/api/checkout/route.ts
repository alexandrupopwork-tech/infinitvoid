import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PRODUCT, SHIPPING, SHIPPING_COUNTRIES, SITE_URL } from "@/lib/config";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const size = (body as { size?: unknown } | null)?.size;

  if (typeof size !== "string" || !PRODUCT.sizes.includes(size as (typeof PRODUCT.sizes)[number])) {
    return NextResponse.json({ error: "Select a valid size." }, { status: 400 });
  }

  try {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: PRODUCT.currency,
            unit_amount: PRODUCT.priceCents,
            product_data: {
              name: `${PRODUCT.name} — Size ${size} (Pre-order)`,
              description: `${PRODUCT.description} Pre-order: you'll be emailed the moment it ships.`,
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: [...SHIPPING_COUNTRIES],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: SHIPPING.amountCents, currency: SHIPPING.currency },
            display_name: SHIPPING.label,
          },
        },
      ],
      metadata: { size },
      success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/checkout/cancel`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout session creation failed", err);
    return NextResponse.json(
      { error: "Something went wrong starting checkout. Try again in a moment." },
      { status: 500 }
    );
  }
}
