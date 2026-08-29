import "server-only";
import { Resend } from "resend";
import { SITE_NAME, SITE_URL } from "@/lib/config";

let client: Resend | null = null;

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

function welcomeEmailHtml(): string {
  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#000000;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;">
      <tr>
        <td align="center" style="padding:56px 24px;">
          <table role="presentation" width="100%" style="max-width:480px;" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding-bottom:32px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:6px;color:#7dfcff;text-transform:uppercase;">
                  ${SITE_NAME}
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:30px;font-weight:800;letter-spacing:2px;color:#f2f2f4;text-transform:uppercase;line-height:1.15;">
                  Welcome to the Void.
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:36px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#a5a5ab;">
                  Your star is in the sky. Limited pieces, no restocks — you'll hear from us the moment the door opens.
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:8px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:1px;color:#5c5c62;">
                  <a href="${SITE_URL}" style="color:#7dfcff;text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
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
      subject: "Welcome to the void.",
      html: welcomeEmailHtml(),
    });

    if (error) {
      console.error("resend welcome email failed", error);
    }
  } catch (err) {
    console.error("resend welcome email threw", err);
  }
}
