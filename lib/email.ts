import "server-only";
import { Resend } from "resend";
import { PRODUCT, SITE_NAME, SITE_URL, SOCIALS } from "@/lib/config";

let client: Resend | null = null;

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

const LOGO_URL = `${SITE_URL}/images/logo.png`;
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

function welcomeEmailHtml(): string {
  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
  </head>
  <body style="margin:0;padding:0;background:#000000;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;">
      <tr>
        <td align="center" style="padding:48px 20px;">
          <table role="presentation" width="100%" style="max-width:480px;" cellpadding="0" cellspacing="0">

            <!-- top accent line -->
            <tr>
              <td style="height:2px;line-height:2px;font-size:2px;background:linear-gradient(90deg,#000,#7dfcff,#b98bff,#000);background-color:#7dfcff;">&nbsp;</td>
            </tr>

            <!-- card -->
            <tr>
              <td style="background:#0b0b0e;border:1px solid #232328;border-top:none;padding:44px 36px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding-bottom:28px;">
                      <img src="${LOGO_URL}" width="132" alt="${SITE_NAME}" style="display:block;width:132px;max-width:60%;height:auto;" />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:18px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:5px;color:#7dfcff;text-transform:uppercase;">
                        ✦ You&rsquo;re on the list ✦
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:20px;">
                      <div style="font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:700;letter-spacing:1px;color:#f2f2f4;line-height:1.2;">
                        Welcome to the void.
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:32px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#9c9ca3;">
                        Your star is in the sky. Limited pieces, no restocks, no permanent collection —
                        you&rsquo;ll hear from us the moment the door opens, before anyone else does.
                      </div>
                    </td>
                  </tr>

                  <!-- divider -->
                  <tr>
                    <td style="padding-bottom:28px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr><td style="height:1px;line-height:1px;font-size:1px;background-color:#232328;">&nbsp;</td></tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding-bottom:8px;">
                      <a href="${SITE_URL}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;color:#000000;background-color:#f2f2f4;text-transform:uppercase;text-decoration:none;padding:14px 28px;display:inline-block;">
                        Enter the void
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td align="center" style="padding:28px 12px 0;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;color:#5c5c62;line-height:1.8;">
                  <a href="${SITE_URL}" style="color:#7dfcff;text-decoration:none;">${SITE_HOST}</a>
                  &nbsp;&middot;&nbsp;
                  <a href="${SOCIALS.instagram}" style="color:#5c5c62;text-decoration:none;">Instagram</a>
                  &nbsp;&middot;&nbsp;
                  <a href="${SOCIALS.tiktok}" style="color:#5c5c62;text-decoration:none;">TikTok</a>
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#3a3a3f;padding-top:14px;">
                  You&rsquo;re receiving this because you joined the ${SITE_NAME} waitlist at ${SITE_HOST}.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();
}

function welcomeEmailText(): string {
  return [
    `${SITE_NAME} — Welcome to the void.`,
    "",
    "Your star is in the sky. Limited pieces, no restocks, no permanent collection —",
    "you'll hear from us the moment the door opens, before anyone else does.",
    "",
    SITE_URL,
  ].join("\n");
}

function money(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: currency.toUpperCase() }).format(
    cents / 100
  );
}

type OrderDetails = {
  size: string;
  amountCents: number;
  currency: string;
  orderId: string;
};

function orderConfirmationEmailHtml(order: OrderDetails): string {
  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
  </head>
  <body style="margin:0;padding:0;background:#000000;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;">
      <tr>
        <td align="center" style="padding:48px 20px;">
          <table role="presentation" width="100%" style="max-width:480px;" cellpadding="0" cellspacing="0">

            <tr>
              <td style="height:2px;line-height:2px;font-size:2px;background:linear-gradient(90deg,#000,#7dfcff,#b98bff,#000);background-color:#7dfcff;">&nbsp;</td>
            </tr>

            <tr>
              <td style="background:#0b0b0e;border:1px solid #232328;border-top:none;padding:44px 36px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding-bottom:28px;">
                      <img src="${LOGO_URL}" width="132" alt="${SITE_NAME}" style="display:block;width:132px;max-width:60%;height:auto;" />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:18px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:5px;color:#7dfcff;text-transform:uppercase;">
                        ✦ Order confirmed ✦
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:20px;">
                      <div style="font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:700;letter-spacing:1px;color:#f2f2f4;line-height:1.2;">
                        It&rsquo;s yours.
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:28px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#9c9ca3;">
                        Your ${PRODUCT.name} (Size ${order.size}) is confirmed. We&rsquo;ll email you
                        again the moment it ships.
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #232328;">
                        <tr>
                          <td style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#9c9ca3;">Order</td>
                          <td align="right" style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#f2f2f4;">${order.orderId.slice(0, 8).toUpperCase()}</td>
                        </tr>
                        <tr>
                          <td style="padding:0 18px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#9c9ca3;border-top:1px solid #1a1a1e;">Size</td>
                          <td align="right" style="padding:0 18px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#f2f2f4;border-top:1px solid #1a1a1e;">${order.size}</td>
                        </tr>
                        <tr>
                          <td style="padding:0 18px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#9c9ca3;">Total</td>
                          <td align="right" style="padding:0 18px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#f2f2f4;">${money(order.amountCents, order.currency)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding-bottom:8px;">
                      <a href="${SITE_URL}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;color:#000000;background-color:#f2f2f4;text-transform:uppercase;text-decoration:none;padding:14px 28px;display:inline-block;">
                        Back to the void
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:28px 12px 0;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;color:#5c5c62;line-height:1.8;">
                  <a href="${SITE_URL}" style="color:#7dfcff;text-decoration:none;">${SITE_HOST}</a>
                  &nbsp;&middot;&nbsp;
                  <a href="${SOCIALS.instagram}" style="color:#5c5c62;text-decoration:none;">Instagram</a>
                  &nbsp;&middot;&nbsp;
                  <a href="${SOCIALS.tiktok}" style="color:#5c5c62;text-decoration:none;">TikTok</a>
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#3a3a3f;padding-top:14px;">
                  Questions about your order? Reply to this email.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();
}

function orderConfirmationEmailText(order: OrderDetails): string {
  return [
    `${SITE_NAME} — Order confirmed`,
    "",
    `${PRODUCT.name} — Size ${order.size}`,
    `Order ${order.orderId.slice(0, 8).toUpperCase()}`,
    `Total: ${money(order.amountCents, order.currency)}`,
    "",
    "We'll email you again the moment it ships.",
    "",
    SITE_URL,
  ].join("\n");
}

type ShippedOrderDetails = {
  size: string;
  orderId: string;
  trackingNumber: string;
  trackingUrl: string | null;
};

function shippedEmailHtml(order: ShippedOrderDetails): string {
  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
  </head>
  <body style="margin:0;padding:0;background:#000000;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;">
      <tr>
        <td align="center" style="padding:48px 20px;">
          <table role="presentation" width="100%" style="max-width:480px;" cellpadding="0" cellspacing="0">

            <tr>
              <td style="height:2px;line-height:2px;font-size:2px;background:linear-gradient(90deg,#000,#7dfcff,#b98bff,#000);background-color:#7dfcff;">&nbsp;</td>
            </tr>

            <tr>
              <td style="background:#0b0b0e;border:1px solid #232328;border-top:none;padding:44px 36px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding-bottom:28px;">
                      <img src="${LOGO_URL}" width="132" alt="${SITE_NAME}" style="display:block;width:132px;max-width:60%;height:auto;" />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:18px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:5px;color:#7dfcff;text-transform:uppercase;">
                        ✦ On its way ✦
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:20px;">
                      <div style="font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:700;letter-spacing:1px;color:#f2f2f4;line-height:1.2;">
                        It&rsquo;s shipped.
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom:28px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#9c9ca3;">
                        Your ${PRODUCT.name} (Size ${order.size}) has left the void and is headed your way.
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #232328;">
                        <tr>
                          <td style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#9c9ca3;">Order</td>
                          <td align="right" style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#f2f2f4;">${order.orderId.slice(0, 8).toUpperCase()}</td>
                        </tr>
                        <tr>
                          <td style="padding:0 18px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#9c9ca3;border-top:1px solid #1a1a1e;">Tracking number</td>
                          <td align="right" style="padding:0 18px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#f2f2f4;border-top:1px solid #1a1a1e;">${order.trackingNumber}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding-bottom:8px;">
                      <a href="${order.trackingUrl ?? SITE_URL}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;color:#000000;background-color:#f2f2f4;text-transform:uppercase;text-decoration:none;padding:14px 28px;display:inline-block;">
                        Track your order
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:28px 12px 0;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;color:#5c5c62;line-height:1.8;">
                  <a href="${SITE_URL}" style="color:#7dfcff;text-decoration:none;">${SITE_HOST}</a>
                  &nbsp;&middot;&nbsp;
                  <a href="${SOCIALS.instagram}" style="color:#5c5c62;text-decoration:none;">Instagram</a>
                  &nbsp;&middot;&nbsp;
                  <a href="${SOCIALS.tiktok}" style="color:#5c5c62;text-decoration:none;">TikTok</a>
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#3a3a3f;padding-top:14px;">
                  Questions about your order? Reply to this email.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();
}

function shippedEmailText(order: ShippedOrderDetails): string {
  return [
    `${SITE_NAME} — It's shipped`,
    "",
    `${PRODUCT.name} — Size ${order.size}`,
    `Order ${order.orderId.slice(0, 8).toUpperCase()}`,
    `Tracking number: ${order.trackingNumber}`,
    ...(order.trackingUrl ? ["", `Track: ${order.trackingUrl}`] : []),
    "",
    SITE_URL,
  ].join("\n");
}

/**
 * Sends the order confirmation email after a successful Stripe payment.
 * Never throws — a misconfigured or failing email provider must not block
 * the customer from seeing their order confirmation page.
 */
export async function sendOrderConfirmationEmail(email: string, order: OrderDetails): Promise<void> {
  const resend = getClient();

  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping order confirmation email to", email);
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    console.warn("RESEND_FROM_EMAIL not set — skipping order confirmation email to", email);
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from: `${SITE_NAME} <${from}>`,
      to: email,
      replyTo: from,
      subject: "Your INFINITVOID order is confirmed.",
      html: orderConfirmationEmailHtml(order),
      text: orderConfirmationEmailText(order),
    });

    if (error) {
      console.error("resend order confirmation email failed", error);
    }
  } catch (err) {
    console.error("resend order confirmation email threw", err);
  }
}

/**
 * Sends the "it's shipped" email once an order's tracking number is added.
 * Never throws — a misconfigured or failing email provider must not block
 * marking the order as shipped in the admin dashboard.
 */
export async function sendShippedEmail(email: string, order: ShippedOrderDetails): Promise<void> {
  const resend = getClient();

  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping shipped email to", email);
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    console.warn("RESEND_FROM_EMAIL not set — skipping shipped email to", email);
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from: `${SITE_NAME} <${from}>`,
      to: email,
      replyTo: from,
      subject: "Your INFINITVOID order has shipped.",
      html: shippedEmailHtml(order),
      text: shippedEmailText(order),
    });

    if (error) {
      console.error("resend shipped email failed", error);
    }
  } catch (err) {
    console.error("resend shipped email threw", err);
  }
}

/**
 * Sends the waitlist confirmation email. Never throws — a misconfigured or
 * failing email provider must not block a successful waitlist signup.
 */
export async function sendWelcomeEmail(email: string): Promise<void> {
  const resend = getClient();

  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping welcome email to", email);
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    console.warn("RESEND_FROM_EMAIL not set — skipping welcome email to", email);
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from: `${SITE_NAME} <${from}>`,
      to: email,
      replyTo: from,
      subject: "Welcome to the void.",
      html: welcomeEmailHtml(),
      text: welcomeEmailText(),
      headers: {
        "List-Unsubscribe": `<mailto:${from}?subject=unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });

    if (error) {
      console.error("resend welcome email failed", error);
    }
  } catch (err) {
    console.error("resend welcome email threw", err);
  }
}
